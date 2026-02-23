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
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
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
  kundal: {
    shopifyDomain: "https://kundal.us",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  mixsoon: {
    shopifyDomain: "https://mixsoon.us",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/mixsoon-all/products.json?limit=250",
    ],
  },
  cosrx: {
    shopifyDomain: "https://www.cosrx.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  numbuzin: {
    shopifyDomain: "https://us.numbuzin.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all-products-1/products.json?limit=250",
    ],
  },
  peripera: {
    shopifyDomain: "https://clubclio.shop",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/peripera/products.json?limit=250",
    ],
  },
  clio: {
    shopifyDomain: "https://clubclio.shop",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/clio/products.json?limit=250",
    ],
  },
  "romand": {
    shopifyDomain: "https://romand.us",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all-products/products.json?limit=250",
    ],
  },
  tirtir: {
    shopifyDomain: "https://tirtir.global",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/shop-all/products.json?limit=250",
    ],
  },
  innisfree: {
    shopifyDomain: "https://us.innisfree.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/shop-all/products.json?limit=250",
    ],
  },
  anua: {
    shopifyDomain: "https://anua.us",
  },
  skin1004: {
    shopifyDomain: "https://www.skin1004.com",
  },
  medicube: {
    shopifyDomain: "https://medicube.us",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  "muzigae-mansion": {
    shopifyDomain: "https://muzigae-mansion.us",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/shop/products.json?limit=250",
    ],
  },
  dasique: {
    shopifyDomain: "https://dasique.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  amuse: {
    shopifyDomain: "https://amuseseoulmakeup.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  aprilskin: {
    shopifyDomain: "https://aprilskin.us",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all-product/products.json?limit=250",
    ],
  },
  arencia: {
    shopifyDomain: "https://arencia.us",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/shop-all/products.json?limit=250",
    ],
  },
  biodance: {
    shopifyDomain: "https://biodance.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all-products/products.json?limit=250",
    ],
  },
  celimax: {
    shopifyDomain: "https://celimax.us",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  morphe: {
    shopifyDomain: "https://morphe.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  "anastasia-beverly-hills": {
    shopifyDomain: "https://anastasiabeverlyhills.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  "milk-makeup": {
    shopifyDomain: "https://milkmakeup.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  tower28: {
    shopifyDomain: "https://tower28beauty.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  kosas: {
    shopifyDomain: "https://kosas.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  saie: {
    shopifyDomain: "https://saiebeauty.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  "jones-road": {
    shopifyDomain: "https://jonesroadbeauty.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  "drunk-elephant": {
    shopifyDomain: "https://drunkelephant.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  tatcha: {
    shopifyDomain: "https://tatcha.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  "glow-recipe": {
    shopifyDomain: "https://glowrecipe.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  "the-ordinary": {
    shopifyDomain: "https://theordinary.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  "first-aid-beauty": {
    shopifyDomain: "https://firstaidbeauty.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  "youth-to-the-people": {
    shopifyDomain: "https://youthtothepeople.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  "judy-doll": {
    shopifyDomain: "https://judydoll.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
  },
  canmake: {
    shopifyDomain: "https://canmakeusa.com",
    productJsonPaths: [
      "/products.json?limit=250",
      "/collections/all/products.json?limit=250",
    ],
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