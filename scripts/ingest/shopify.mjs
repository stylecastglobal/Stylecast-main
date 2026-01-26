import fs from "node:fs/promises";
import path from "node:path";

const CATEGORY_MAP = [
  { key: "foundation", value: "FOUNDATION" },
  { key: "concealer", value: "CONCEALER" },
  { key: "cushion", value: "CUSHION" },
  { key: "lip", value: "LIPS" },
  { key: "blush", value: "CHEEKS" },
  { key: "cheek", value: "CHEEKS" },
  { key: "eye", value: "EYESHADOW" },
  { key: "highlight", value: "HIGHLIGHT" },
  { key: "bronzer", value: "BRONZER" },
  { key: "skincare", value: "SKINCARE" },
];

function normalizeCategory(productType = "", tags = []) {
  const haystack = `${productType} ${tags.join(" ")}`.toLowerCase();
  const hit = CATEGORY_MAP.find((entry) => haystack.includes(entry.key));
  return hit ? hit.value : "OTHER";
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeKeywords(brand, name, productType, tags = []) {
  const parts = [brand, name, productType, ...tags]
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
  return Array.from(new Set(parts));
}

function extractShades(product) {
  const shadeOption = product.options?.find((opt) =>
    ["color", "colour", "shade"].includes(opt.name?.toLowerCase())
  );
  if (!shadeOption) return [];
  return shadeOption.values.map((shade) => ({
    shade_name: shade,
    hex: "#000000",
    undertone: "unknown",
    popularity: 0,
  }));
}

async function main() {
  const domain = process.argv[2];
  const outFile = process.argv[3] || "shopify-products.json";
  if (!domain) {
    console.error("Usage: node scripts/ingest/shopify.mjs <domain> [outFile]");
    process.exit(1);
  }

  const url = `${domain.replace(/\/$/, "")}/products.json?limit=250`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  const data = await res.json();
  const products = (data.products || []).map((product) => {
    const brand = product.vendor || "Unknown";
    const name = product.title || product.handle || "Unnamed";
    const productType = product.product_type || "";
    const tags = product.tags || [];
    return {
      id: String(product.id),
      brand,
      name,
      category: normalizeCategory(productType, tags),
      price: product.variants?.[0]?.price || "",
      stores: [
        {
          name: "Shopify",
          link: `${domain.replace(/\/$/, "")}/products/${product.handle}`,
        },
      ],
      images: product.images?.map((img) => img.src) || [],
      shades: extractShades(product),
      ingredients: stripHtml(product.body_html || ""),
      safety_flags: [],
      claims: [],
      reviews_summary: {},
      wear_time_rating: "",
      dupes: [],
      popularity_score: 0,
      keywords: normalizeKeywords(brand, name, productType, tags),
      updated_at: new Date().toISOString(),
    };
  });

  const outputPath = path.resolve(process.cwd(), outFile);
  await fs.writeFile(outputPath, JSON.stringify(products, null, 2), "utf-8");
  console.log(`Wrote ${products.length} products to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
