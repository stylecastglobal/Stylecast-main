// app/api/brands/[slug]/route.ts
import { NextResponse } from "next/server";

type BrandConfig = {
  shopifyDomain: string;
  currency?: string;
  productJsonPaths?: string[];
};

const BRAND_CONFIG: Record<string, BrandConfig> = {
  glowny: {
    shopifyDomain: "https://en.glowny.co.kr",
  },
  "aime-leon-dore": {
    shopifyDomain: "https://www.aimeleondore.com",
  },
  scuffers: {
    shopifyDomain: "https://scuffers.com",
  },
  glossier: {
    shopifyDomain: "https://www.glossier.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  fentybeauty: {
    shopifyDomain: "https://fentybeauty.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  iliabeauty: {
    shopifyDomain: "https://iliabeauty.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  laneige: {
    shopifyDomain: "https://us.laneige.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all-products/products.json?limit=250",
    ],
  },
  rarebeauty: {
    shopifyDomain: "https://www.rarebeauty.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  // K-Beauty brands
  cosrx: {
    shopifyDomain: "https://www.cosrx.com",
  },
  tirtir: {
    shopifyDomain: "https://tirtir.us",
  },
  anua: {
    shopifyDomain: "https://anua.us",
  },
  numbuzin: {
    shopifyDomain: "https://numbuzin.com",
  },
  skin1004: {
    shopifyDomain: "https://www.skin1004.com",
  },
  mixsoon: {
    shopifyDomain: "https://mixsoon.us",
  },
  medicube: {
    shopifyDomain: "https://medicube.us",
  },
  biodance: {
    shopifyDomain: "https://biodance.us",
  },
  sculptor: {
    shopifyDomain: "https://sculptor-worldwide.com",
    currency: "KRW",
  },
  "huni-design": {
    shopifyDomain: "https://hunidesign.com",
  },
  "saalt-studio": {
    shopifyDomain: "https://saaltstudio.com",
  },
  "matin-kim": {
    shopifyDomain: "https://matinkim.shop",
  },
  "akimbo-club": {
    shopifyDomain: "https://akimboclub.com",
  },
  "beauty-of-joseon": {
    shopifyDomain: "https://beautyofjoseon.com",
  },
  torriden: {
    shopifyDomain: "https://torriden.us",
  },
  "round-lab": {
    shopifyDomain: "https://roundlab.com",
  },
  klairs: {
    shopifyDomain: "https://www.klairs.com",
  },
  "manyo-factory": {
    shopifyDomain: "https://manyo.us",
  },
};

const KRW_TO_USD = 0.00072;

async function fetchProductsJson(brand: BrandConfig): Promise<any> {
  const paths =
    brand.productJsonPaths && brand.productJsonPaths.length > 0
      ? brand.productJsonPaths
      : ["/products.json?limit=250"];

  let lastError: unknown = null;

  for (const path of paths) {
    const url = `${brand.shopifyDomain}${path}`;
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        lastError = new Error(`Shopify fetch failed: ${res.status} ${res.statusText}`);
        continue;
      }

      const json = await res.json();
      if (json?.products && Array.isArray(json.products)) {
        return json;
      }

      lastError = new Error("Shopify response missing products array");
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError ?? new Error("Shopify fetch failed");
}

function detectProductType(title: string, tags: string[]): string {
  const combined = `${title} ${tags.join(' ')}`.toLowerCase();
  const topKeywords = ['shirt', 'tee', 'top', 'hoodie', 'sweater', 'knit', 'polo', 'henley', 'cardigan', 'sweatshirt', 'blouse', 'crop'];
  const bottomKeywords = ['pant', 'jean', 'trouser', 'short', 'skirt', 'denim pants', 'jogger', 'legging'];
  const outerwearKeywords = ['jacket', 'coat', 'outerwear', 'windbreaker', 'parka', 'vest', 'blazer', 'zip-up'];
  const accessoryKeywords = ['bag', 'hat', 'cap', 'belt', 'sock', 'scarf', 'wallet', 'keychain', 'beanie', 'glove', 'muffler'];

  for (const kw of outerwearKeywords) { if (combined.includes(kw)) return 'outerwear'; }
  for (const kw of topKeywords) { if (combined.includes(kw)) return 'top'; }
  for (const kw of bottomKeywords) { if (combined.includes(kw)) return 'bottom'; }
  for (const kw of accessoryKeywords) { if (combined.includes(kw)) return 'accessories'; }
  return '';
}
export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug param" },
      { status: 400 }
    );
  }

  const normalizedSlug = slug.toLowerCase();
  const brand = BRAND_CONFIG[normalizedSlug];

  if (!brand) {
    return NextResponse.json(
      { error: "Unsupported brand slug", slug },
      { status: 404 }
    );
  }

  try {
    const json = await fetchProductsJson(brand);

    const products = json.products.map((p: any) => {
      let price = p.variants?.[0]?.price ?? null;
      if (price && brand.currency === "KRW") {
        price = (parseFloat(price) * KRW_TO_USD).toFixed(2);
      }
      const tags: string[] = Array.isArray(p.tags) ? p.tags : (p.tags || '').split(',').map((t: string) => t.trim());
      const pType = p.product_type || detectProductType(p.title || '', tags);
      return {
        id: p.id,
        title: p.title,
        handle: p.handle,
        image: p.images?.[0]?.src ?? null,
        images: p.images.map((i: any) => i.src),
        price,
        officialUrl: `${brand.shopifyDomain}/products/${p.handle}`,
        product_type: pType,
      };
    });

    return NextResponse.json({
      brand: slug,
      count: products.length,
      products,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to load brand products" },
      { status: 500 }
    );
  }
}