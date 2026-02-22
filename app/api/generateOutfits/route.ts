import { NextRequest, NextResponse } from "next/server";
import {
  generateOutfitReasoning,
  type ReasoningInput,
} from "../../lib/outfit-engine/reasoning";
import type { BodyType, Occasion, OutfitCategory } from "../../types/outfit-builder";

/**
 * POST /api/generateOutfits
 *
 * Body (ReasoningInput):
 *   height:    number
 *   bodyType:  BodyType
 *   items:     Record<OutfitCategory, { category, name }>
 *   occasion:  Occasion | null
 *
 * Returns:
 *   { reasoning: string, cacheKey: string, cached: boolean }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { height, bodyType, items, occasion } = body as {
      height: number;
      bodyType: BodyType;
      items: ReasoningInput["items"];
      occasion?: Occasion | null;
    };

    if (!height || !bodyType || !items || Object.keys(items).length === 0) {
      return NextResponse.json(
        { error: "height, bodyType, and at least one item are required" },
        { status: 400 }
      );
    }

    const result = await generateOutfitReasoning({
      height,
      bodyType,
      items,
      occasion: occasion ?? null,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[generateOutfits] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
