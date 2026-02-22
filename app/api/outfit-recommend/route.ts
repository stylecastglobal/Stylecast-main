import { NextRequest, NextResponse } from "next/server";
import { recommend, EXAMPLE_RULES } from "../../lib/outfit-engine/recommend";
import type {
  OutfitItem,
  BodyType,
  Occasion,
} from "../../types/outfit-builder";

/**
 * POST /api/outfit-recommend
 *
 * Body:
 *   cartItems:      OutfitItem[]
 *   catalog:        OutfitItem[]
 *   bodyType:       BodyType
 *   occasion?:      Occasion | null
 *   budgetMax?:     number | null
 *   equippedItems?: OutfitItem[]
 *
 * Returns ranked recommendations grouped by category.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      cartItems = [],
      catalog = [],
      bodyType = "regular",
      occasion = null,
      budgetMax = null,
      equippedItems = [],
    } = body as {
      cartItems: OutfitItem[];
      catalog: OutfitItem[];
      bodyType: BodyType;
      occasion?: Occasion | null;
      budgetMax?: number | null;
      equippedItems?: OutfitItem[];
    };

    if (!Array.isArray(catalog) || catalog.length === 0) {
      return NextResponse.json(
        { error: "catalog is required and must be a non-empty array" },
        { status: 400 }
      );
    }

    const result = recommend({
      cartItems,
      catalog,
      bodyType,
      occasion,
      budgetMax,
      equippedItems,
      customRules: EXAMPLE_RULES,
      maxPerCategory: 5,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[outfit-recommend] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
