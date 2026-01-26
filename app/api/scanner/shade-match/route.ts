import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/lib/productScanner/firestore";
import { findBestShadeMatches } from "@/lib/productScanner/shadeMatch";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.lab || !body?.category) {
    return NextResponse.json({ error: "Missing lab or category" }, { status: 400 });
  }

  const products = await getProductsByCategory(body.category, 200);
  const matches = findBestShadeMatches(products, body.lab, 5);
  return NextResponse.json({ matches });
}
