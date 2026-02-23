// app/api/beauty/products/route.ts
import { NextResponse } from "next/server";

// K-Beauty Shopify stores to fetch from
const BEAUTY_STORES: Record<
  string,
  { domain: string; displayName: string; defaultCategory: "skincare" | "makeup"; productPaths?: string[] }
> = {
  kundal: {
    domain: "https://kundal.us",
    displayName: "Kundal",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  mixsoon: {
    domain: "https://mixsoon.us",
    displayName: "MIXSOON",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/mixsoon-all/products.json?limit=50"],
  },
  cosrx: {
    domain: "https://www.cosrx.com",
    displayName: "COSRX",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  numbuzin: {
    domain: "https://us.numbuzin.com",
    displayName: "Numbuzin",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all-products-1/products.json?limit=50"],
  },
  peripera: {
    domain: "https://clubclio.shop",
    displayName: "Peripera",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/peripera/products.json?limit=50"],
  },
  clio: {
    domain: "https://clubclio.shop",
    displayName: "Clio",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/clio/products.json?limit=50"],
  },
  romand: {
    domain: "https://romand.us",
    displayName: "Rom&nd",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all-products/products.json?limit=50"],
  },
  tirtir: {
    domain: "https://tirtir.global",
    displayName: "TIRTIR",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/shop-all/products.json?limit=50"],
  },
  innisfree: {
    domain: "https://us.innisfree.com",
    displayName: "Innisfree",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/shop-all/products.json?limit=50"],
  },
  "muzigae-mansion": {
    domain: "https://muzigae-mansion.us",
    displayName: "Muzigae Mansion",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/shop/products.json?limit=50"],
  },
  dasique: {
    domain: "https://dasique.com",
    displayName: "Dasique",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  amuse: {
    domain: "https://amuseseoulmakeup.com",
    displayName: "Amuse",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  aprilskin: {
    domain: "https://aprilskin.us",
    displayName: "APRILSKIN",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all-product/products.json?limit=50"],
  },
  arencia: {
    domain: "https://arencia.us",
    displayName: "Arencia",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/shop-all/products.json?limit=50"],
  },
  biodance: {
    domain: "https://biodance.com",
    displayName: "BIODANCE",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all-products/products.json?limit=50"],
  },
  celimax: {
    domain: "https://celimax.us",
    displayName: "Celimax",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  morphe: {
    domain: "https://morphe.com",
    displayName: "Morphe",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  "anastasia-beverly-hills": {
    domain: "https://anastasiabeverlyhills.com",
    displayName: "Anastasia Beverly Hills",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  "milk-makeup": {
    domain: "https://milkmakeup.com",
    displayName: "Milk Makeup",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  tower28: {
    domain: "https://tower28beauty.com",
    displayName: "Tower 28",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  kosas: {
    domain: "https://kosas.com",
    displayName: "Kosas",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  saie: {
    domain: "https://saiebeauty.com",
    displayName: "Saie",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  "jones-road": {
    domain: "https://jonesroadbeauty.com",
    displayName: "Jones Road",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  "drunk-elephant": {
    domain: "https://drunkelephant.com",
    displayName: "Drunk Elephant",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  tatcha: {
    domain: "https://tatcha.com",
    displayName: "Tatcha",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  "glow-recipe": {
    domain: "https://glowrecipe.com",
    displayName: "Glow Recipe",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  "the-ordinary": {
    domain: "https://theordinary.com",
    displayName: "The Ordinary",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  "first-aid-beauty": {
    domain: "https://firstaidbeauty.com",
    displayName: "First Aid Beauty",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  "youth-to-the-people": {
    domain: "https://youthtothepeople.com",
    displayName: "Youth to the People",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  "judy-doll": {
    domain: "https://judydoll.com",
    displayName: "Judy Doll",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  canmake: {
    domain: "https://canmakeusa.com",
    displayName: "Canmake",
    defaultCategory: "makeup",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
  anua: {
    domain: "https://anua.us",
    displayName: "Anua",
    defaultCategory: "skincare",
  },
  skin1004: {
    domain: "https://skin1004.com",
    displayName: "SKIN1004",
    defaultCategory: "skincare",
  },
  medicube: {
    domain: "https://medicube.us",
    displayName: "Medicube",
    defaultCategory: "skincare",
    productPaths: ["/products.json?limit=50", "/collections/all/products.json?limit=50"],
  },
};

export interface BeautyProduct {
  id: string | number;
  brand: string;
  brandSlug: string;
  name: string;
  handle: string;
  price: string;
  compareAtPrice?: string | null;
  image: string | null;
  images: string[];
  productType: string;
  category: string;
  inStock: boolean;
  isNew: boolean;
  url: string;
}

// Detect category from product title, product_type, and tags
function detectCategory(
  title: string,
  productType: string,
  tags: string,
  defaultCategory: string
): string {
  const combined = `${title} ${productType} ${tags}`.toLowerCase();

  // Makeup keywords
  const makeupKeywords = [
    "cushion", "foundation", "concealer", "mascara", "eyeliner",
    "eyeshadow", "palette", "lip", "lipstick", "tint", "blush",
    "highlighter", "contour", "bronzer", "primer", "makeup",
    "powder", "brow", "lash", "bb cream", "cc cream",
  ];

  // Skincare keywords
  const skincareKeywords = [
    "serum", "cream", "toner", "cleanser", "moistur", "mask",
    "sunscreen", "spf", "essence", "ampoule", "lotion", "emulsion",
    "exfoli", "peel", "oil", "balm", "mist", "skincare", "skin care",
    "acne", "wrinkle", "collagen", "retinol", "niacinamide",
    "hyaluronic", "vitamin c", "peptide", "cica", "centella",
    "snail", "mucin", "aha", "bha", "pha",
  ];

  for (const kw of makeupKeywords) {
    if (combined.includes(kw)) return "makeup";
  }

  for (const kw of skincareKeywords) {
    if (combined.includes(kw)) return "skincare";
  }

  return defaultCategory;
}

async function fetchFromShopify(
  slug: string,
  store: (typeof BEAUTY_STORES)[string]
): Promise<BeautyProduct[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

  const paths = store.productPaths || ["/products.json?limit=50"];
  let lastError: unknown = null;

  for (const path of paths) {
    try {
      const res = await fetch(`${store.domain}${path}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      lastError = new Error(`HTTP ${res.status}`);
      continue;
    }

    const json = await res.json();

    if (!json.products || !Array.isArray(json.products)) {
      lastError = new Error("No products array");
      continue;
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return json.products
      .filter((p: any) => {
        // Filter out gift items, bundles that cost $0
        const price = parseFloat(p.variants?.[0]?.price || "0");
        const title = (p.title || "").toLowerCase();
        if (price <= 0) return false;
        if (title.includes("gift") && title.includes("100% off")) return false;
        if (title.includes("🎁") && title.includes("100% off")) return false;
        return true;
      })
      .map((p: any) => {
        const createdAt = new Date(p.created_at);
        const variant = p.variants?.[0];
        const price = variant?.price ?? "0";
        const compareAtPrice = variant?.compare_at_price ?? null;
        const pType = p.product_type || "";
        const tags = p.tags || "";

        const category = detectCategory(
          p.title || "",
          pType,
          tags,
          store.defaultCategory
        );

        return {
          id: p.id,
          brand: store.displayName,
          brandSlug: slug,
          name: p.title?.replace(/🎁\s*/g, "").trim() || "Untitled",
          handle: p.handle,
          price: `$${parseFloat(price).toFixed(2)}`,
          compareAtPrice: compareAtPrice
            ? `$${parseFloat(compareAtPrice).toFixed(2)}`
            : null,
          image: p.images?.[0]?.src ?? null,
          images: (p.images || []).map((i: any) => i.src),
          productType: pType,
          category,
          inStock: p.variants?.some((v: any) => v.available !== false) ?? true,
          isNew: createdAt > thirtyDaysAgo,
          url: `${store.domain}/products/${p.handle}`,
        };
      });
    } catch (err: any) {
      lastError = err;
    }
  }

  if (lastError) {
    if ((lastError as any)?.name === "AbortError") {
      console.warn(`[beauty-api] ${slug}: Timeout`);
    } else {
      console.warn(`[beauty-api] ${slug}: Error -`, (lastError as any)?.message || lastError);
    }
  }
  return [];
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const categoryFilter = url.searchParams.get("category"); // skincare, makeup, or null for all
  const brandFilter = url.searchParams.get("brand"); // specific brand slug or null for all
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 50;

  // Determine which stores to fetch from
  let storesToFetch = Object.entries(BEAUTY_STORES);

  if (brandFilter) {
    storesToFetch = storesToFetch.filter(([slug]) => slug === brandFilter);
  }

  // Fetch from all stores in parallel
  const results = await Promise.all(
    storesToFetch.map(([slug, store]) => fetchFromShopify(slug, store))
  );

  // Flatten and merge all products
  let allProducts = results.flat();

  // Apply category filter
  if (categoryFilter) {
    allProducts = allProducts.filter(
      (p) => p.category === categoryFilter.toLowerCase()
    );
  }

  // Sort: new items first, then by brand
  allProducts.sort((a, b) => {
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    return a.brand.localeCompare(b.brand);
  });

  // Apply limit
  allProducts = allProducts.slice(0, limit);

  // Group by category for convenience
  const grouped: Record<string, BeautyProduct[]> = {};
  for (const p of allProducts) {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  }

  return NextResponse.json({
    total: allProducts.length,
    products: allProducts,
    grouped,
    stores: Object.keys(BEAUTY_STORES),
  });
}
