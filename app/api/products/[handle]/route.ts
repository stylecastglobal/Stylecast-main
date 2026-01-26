// app/api/products/[handle]/route.ts
import { NextResponse } from "next/server";

const BRAND_CONFIG: Record<string, { shopifyDomain: string }> = {
  glowny: {
    shopifyDomain: "https://en.glowny.co.kr",
  },
  "aime-leon-dore": {
    shopifyDomain: "https://www.aimeleondore.com",
  },
  scuffers: {
    shopifyDomain: "https://scuffers.com",
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

    const formattedProduct = {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.body_html || "",
      price: product.variants[0]?.price || "0",
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
        price: v.price,
        sku: v.sku,
        option1: v.option1,
        option2: v.option2,
        available: v.inventory_management === "shopify",
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