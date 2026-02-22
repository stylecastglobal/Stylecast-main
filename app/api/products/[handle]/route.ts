// app/api/products/[handle]/route.ts
import { NextResponse } from "next/server";

const KRW_TO_USD = 0.00072;

const BRAND_CONFIG: Record<string, { shopifyDomain: string; currency?: string }> = {
  glowny: {
    shopifyDomain: "https://en.glowny.co.kr",
  },
  "aime-leon-dore": {
    shopifyDomain: "https://www.aimeleondore.com",
  },
  scuffers: {
    shopifyDomain: "https://scuffers.com",
  },
  cosrx: {
    shopifyDomain: "https://www.cosrx.com",
  },
  tirtir: {
    shopifyDomain: "https://tirtir.us",
  },
  anua: {
    shopifyDomain: "https://anua.us",
  },
  skin1004: {
    shopifyDomain: "https://skin1004.com",
  },
  mixsoon: {
    shopifyDomain: "https://mixsoon.us",
  },
  medicube: {
    shopifyDomain: "https://medicube.us",
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
};

export async function GET(
  req: Request,
  context: { params: Promise<{ handle: string }> }
) {
  const { handle } = await context.params;

  if (!handle) {
    return NextResponse.json({ error: "Missing handle param" }, { status: 400 });
  }

  const url = new URL(req.url);
  const brandKey = (url.searchParams.get("brand") || "glowny").toLowerCase();
  const brand = BRAND_CONFIG[brandKey];
  if (!brand) {
    return NextResponse.json(
      { error: "Unsupported brand", brand: brandKey },
      { status: 404 }
    );
  }

  try {
    const res = await fetch(`${brand.shopifyDomain}/products/${handle}.json`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Shopify product fetch failed");
    }

    const json = await res.json();
    const product = json.product;

    const isKRW = brand.currency === "KRW";
    const convertPrice = (p: string) => isKRW ? (parseFloat(p) * KRW_TO_USD).toFixed(2) : p;

    const formattedProduct = {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.body_html || "",
      price: convertPrice(product.variants[0]?.price || "0"),
      vendor: product.vendor,
      product_type: product.product_type,
      images: product.images.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
      })),
      options: product.options.map((opt: any) => ({
        name: opt.name,
        values: opt.values,
      })),
      variants: product.variants.map((v: any) => ({
        id: v.id,
        title: v.title,
        price: convertPrice(v.price),
        sku: v.sku,
        option1: v.option1,
        option2: v.option2,
        available: v.available !== false,
        image_id: v.image_id,
      })),
      officialUrl: `${brand.shopifyDomain}/products/${handle}`,
    };

    return NextResponse.json({ product: formattedProduct });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load product details" }, { status: 500 });
  }
}