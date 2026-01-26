import fs from "node:fs/promises";
import path from "node:path";
import cheerio from "cheerio";

function normalizeKeywords(brand, name, category) {
  return `${brand} ${name} ${category}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

function mapCategory(text = "") {
  const lower = text.toLowerCase();
  if (lower.includes("foundation")) return "FOUNDATION";
  if (lower.includes("concealer")) return "CONCEALER";
  if (lower.includes("cushion")) return "CUSHION";
  if (lower.includes("lip")) return "LIPS";
  if (lower.includes("blush")) return "CHEEKS";
  if (lower.includes("cheek")) return "CHEEKS";
  if (lower.includes("eye")) return "EYESHADOW";
  if (lower.includes("highlight")) return "HIGHLIGHT";
  if (lower.includes("bronzer")) return "BRONZER";
  if (lower.includes("skincare")) return "SKINCARE";
  return "OTHER";
}

function extractJsonLd(html) {
  const $ = cheerio.load(html);
  const scripts = $('script[type="application/ld+json"]');
  const payloads = [];
  scripts.each((_, el) => {
    try {
      const text = $(el).text();
      if (!text) return;
      const parsed = JSON.parse(text);
      payloads.push(parsed);
    } catch {
      // ignore
    }
  });
  return payloads.flat();
}

function extractProduct(ld) {
  if (!ld) return null;
  if (Array.isArray(ld)) {
    return ld.find((item) => item["@type"] === "Product") || null;
  }
  if (ld["@type"] === "Product") return ld;
  if (ld["@graph"]) {
    return ld["@graph"].find((item) => item["@type"] === "Product") || null;
  }
  return null;
}

async function fetchHtml(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return await res.text();
}

async function main() {
  const listFile = process.argv[2];
  const outFile = process.argv[3] || "retailer-products.json";
  if (!listFile) {
    console.error("Usage: node scripts/ingest/retailer-jsonld.mjs <urls.txt> [outFile]");
    process.exit(1);
  }
  const raw = await fs.readFile(path.resolve(process.cwd(), listFile), "utf-8");
  const urls = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const products = [];

  for (const url of urls) {
    try {
      const html = await fetchHtml(url);
      const jsonLdBlocks = extractJsonLd(html);
      const product = extractProduct(jsonLdBlocks);
      if (!product) {
        console.warn(`No Product JSON-LD found for ${url}`);
        continue;
      }

      const brand = product.brand?.name || product.brand || "Unknown";
      const name = product.name || product.sku || "Unnamed";
      const category = mapCategory(product.category || "");
      const images = Array.isArray(product.image) ? product.image : product.image ? [product.image] : [];
      const price = product.offers?.price ? String(product.offers.price) : "";

      products.push({
        id: product.sku || product.gtin13 || product.gtin || name.toLowerCase().replace(/\s+/g, "-"),
        brand,
        name,
        category,
        price,
        stores: [{ name: "Retailer", link: url, price }],
        images,
        shades: [],
        ingredients: "",
        safety_flags: [],
        claims: [],
        reviews_summary: {},
        wear_time_rating: "",
        dupes: [],
        popularity_score: 0,
        keywords: normalizeKeywords(brand, name, product.category || category),
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error(`Failed to process ${url}`, err);
    }
  }

  const outputPath = path.resolve(process.cwd(), outFile);
  await fs.writeFile(outputPath, JSON.stringify(products, null, 2), "utf-8");
  console.log(`Wrote ${products.length} products to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
