import type { ProductDoc, ShadeDoc } from "./types";

export type ShadeMatchResult = {
  productId: string;
  brand: string;
  productName: string;
  shade: ShadeDoc;
  distance: number;
  accuracy: number;
};

function labDistance(a: { l: number; a: number; b: number }, b: { l: number; a: number; b: number }) {
  const dl = a.l - b.l;
  const da = a.a - b.a;
  const db = a.b - b.b;
  return Math.sqrt(dl * dl + da * da + db * db);
}

export function findBestShadeMatches(
  products: ProductDoc[],
  target: { l: number; a: number; b: number },
  limit = 5
): ShadeMatchResult[] {
  const results: ShadeMatchResult[] = [];

  for (const product of products) {
    for (const shade of product.shades || []) {
      if (!shade.lab) continue;
      const distance = labDistance(shade.lab, target);
      results.push({
        productId: product.id,
        brand: product.brand,
        productName: product.name,
        shade,
        distance,
        accuracy: Math.max(0, 100 - Math.round(distance)),
      });
    }
  }

  return results.sort((a, b) => a.distance - b.distance).slice(0, limit);
}
