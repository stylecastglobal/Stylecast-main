// app/api/beauty/products/route.ts
import { NextResponse } from "next/server";

// K-Beauty Shopify stores to fetch from
const BEAUTY_STORES: Record<
  string,
  { domain: string; displayName: string; defaultCategory: "skincare" | "makeup" }
> = {
  cosrx: {
    domain: "https://www.cosrx.com",
    displayName: "COSRX",
    defaultCategory: "skincare",
  },
  tirtir: {
    domain: "https://tirtir.us",
    displayName: "TIRTIR",
    defaultCategory: "makeup",
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
  mixsoon: {
    domain: "https://mixsoon.us",
    displayName: "mixsoon",
    defaultCategory: "skincare",
  },
  medicube: {
    domain: "https://medicube.us",
    displayName: "Medicube",
    defaultCategory: "skincare",
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

  try {
    const res = await fetch(`${store.domain}/products.json?limit=50`, {
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
      console.warn(`[beauty-api] ${slug}: HTTP ${res.status}`);
      return [];
    }

    const json = await res.json();

    if (!json.products || !Array.isArray(json.products)) {
      return [];
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
    clearTimeout(timeoutId);
    if (err?.name === "AbortError") {
      console.warn(`[beauty-api] ${slug}: Timeout`);
    } else {
      console.warn(`[beauty-api] ${slug}: Error -`, err?.message || err);
    }
    return [];
  }
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
