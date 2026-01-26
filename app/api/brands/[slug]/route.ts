// app/api/brands/[slug]/route.ts
import { NextResponse } from "next/server";

const BRAND_CONFIG: Record<string, { shopifyDomain: string }> = {
  glowny: {
    shopifyDomain: "https://en.glowny.co.kr",
  },
  "aime-leon-dore": {
    shopifyDomain: "https://www.aimeleondore.com", // ← ALD Shopify 도메인 추가
  },
  scuffers: {
    shopifyDomain: "https://scuffers.com",
  },
  cheap: {
    shopifyDomain: "https://stylecastglobal.com",
  },
};
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
    const res = await fetch(
      `${brand.shopifyDomain}/products.json?limit=250`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Shopify fetch failed");
    }

    const json = await res.json();

    const products = json.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      handle: p.handle,
      image: p.images?.[0]?.src ?? null,
      images: p.images.map((i: any) => i.src),
      price: p.variants?.[0]?.price ?? null,
      officialUrl: `${brand.shopifyDomain}/products/${p.handle}`,
      product_type: p.product_type || '', // ← 카테고리 필터링용 추가!
    }));

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