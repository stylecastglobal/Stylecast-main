import fs from "node:fs/promises";
import path from "node:path";

function parseCsv(text) {
  const [headerLine, ...rows] = text.split(/\r?\n/).filter(Boolean);
  const headers = headerLine.split(",").map((h) => h.trim());
  return rows.map((row) => {
    const values = row.split(",").map((v) => v.trim());
    return headers.reduce((acc, key, idx) => {
      acc[key] = values[idx] ?? "";
      return acc;
    }, {});
  });
}

function normalizeKeywords(brand, name, category) {
  return `${brand} ${name} ${category}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

function hexToRgb(hex) {
  if (!hex) return null;
  const cleaned = hex.replace("#", "");
  if (cleaned.length !== 6) return null;
  const num = parseInt(cleaned, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToLab(rgb) {
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  r *= 100;
  g *= 100;
  b *= 100;
  const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
  const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;
  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;
  let xr = x / refX;
  let yr = y / refY;
  let zr = z / refZ;
  xr = xr > 0.008856 ? Math.pow(xr, 1 / 3) : 7.787 * xr + 16 / 116;
  yr = yr > 0.008856 ? Math.pow(yr, 1 / 3) : 7.787 * yr + 16 / 116;
  zr = zr > 0.008856 ? Math.pow(zr, 1 / 3) : 7.787 * zr + 16 / 116;
  return {
    l: 116 * yr - 16,
    a: 500 * (xr - yr),
    b: 200 * (yr - zr),
  };
}

function enrichShades(shades = []) {
  return shades.map((shade) => {
    const hex = shade.hex || shade.shade_hex;
    const rgb = hexToRgb(hex);
    return {
      shade_name: shade.shade_name || shade.name,
      hex: hex || "#000000",
      undertone: shade.undertone || "unknown",
      popularity: shade.popularity || 0,
      lab: rgb ? rgbToLab(rgb) : undefined,
    };
  });
}

async function main() {
  const inputFile = process.argv[2];
  const outFile = process.argv[3] || "dataset-products.json";
  if (!inputFile) {
    console.error("Usage: node scripts/ingest/import-dataset.mjs <input.json|csv> [outFile]");
    process.exit(1);
  }

  const raw = await fs.readFile(path.resolve(process.cwd(), inputFile), "utf-8");
  const isCsv = inputFile.toLowerCase().endsWith(".csv");
  const records = isCsv ? parseCsv(raw) : JSON.parse(raw);

  const products = records.map((item) => {
    const brand = item.brand || item.vendor || "Unknown";
    const name = item.name || item.product || item.title || "Unnamed";
    const category = item.category || "OTHER";
    const price = item.price ? String(item.price) : "";
    const images = item.images ? (Array.isArray(item.images) ? item.images : [item.images]) : [];
    const stores = item.stores || (item.link ? [{ name: "Source", link: item.link, price }] : []);
    const shades = enrichShades(item.shades || []);

    return {
      id: item.id || name.toLowerCase().replace(/\s+/g, "-"),
      brand,
      name,
      category,
      price,
      stores,
      images,
      shades,
      ingredients: item.ingredients || "",
      safety_flags: item.safety_flags || [],
      claims: item.claims || [],
      reviews_summary: item.reviews_summary || {},
      wear_time_rating: item.wear_time_rating || "",
      dupes: item.dupes || [],
      popularity_score: item.popularity_score || 0,
      keywords: normalizeKeywords(brand, name, category),
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
