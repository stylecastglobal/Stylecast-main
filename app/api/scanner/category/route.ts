import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/lib/productScanner/firestore";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category") || "LIPS";
  const products = await getProductsByCategory(category as any, 30);

  return NextResponse.json({
    products: products.map((product) => ({
      id: product.id,
      brand: product.brand,
      product: product.name,
      category: product.category,
      shades: product.shades || [],
    })),
  });
}
