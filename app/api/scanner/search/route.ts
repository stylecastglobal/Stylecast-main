import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/productScanner/firestore";
import { normalizeQuery, scoreTextMatch } from "@/lib/productScanner/search";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const queryText = url.searchParams.get("q") || "";
  const tokens = normalizeQuery(queryText);

  if (!tokens.length) {
    return NextResponse.json({ results: [] });
  }

  const products = await searchProducts(queryText, 50);
  const scored = products
    .map((product) => ({
      id: product.id,
      brand: product.brand,
      name: product.name,
      category: product.category,
      image: product.images?.[0] ?? null,
      image_set: product.images ?? [],
      score: scoreTextMatch(tokens, `${product.brand} ${product.name}`),
      popularity: product.popularity_score || 0,
    }))
    .sort((a, b) => b.score - a.score || b.popularity - a.popularity)
    .slice(0, 25);

  return NextResponse.json({ results: scored });
}
