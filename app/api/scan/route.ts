import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const query = formData.get("query") as string | null;

    if (!query?.trim()) {
      return NextResponse.json(
        { success: false, error: "No product query provided." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "AI service not configured." },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      messages: [
        {
          role: "user",
          content: `You are a beauty product analysis expert. Analyze the following beauty/skincare product and return ONLY valid JSON (no markdown, no code fences).

Product query: "${query.trim()}"

Return this exact JSON structure:
{
  "success": true,
  "confidence": <number between 0.5 and 0.95>,
  "brand": "<brand name>",
  "name": "<product name>",
  "category": "<e.g. Moisturizer, Cleanser, Foundation, Serum, Sunscreen, Lip, etc.>",
  "skin_types": ["<e.g. Oily, Dry, Combination, Sensitive, Normal>"],
  "texture": "<e.g. Cream, Gel, Liquid, Balm, Powder>",
  "finish": "<e.g. Matte, Dewy, Satin, Natural>",
  "key_ingredients": ["<top 5 key ingredients>"],
  "pros": ["<3 pros>"],
  "cons": ["<2 cons or cautions>"],
  "reviews": [
    {"author": "<name>", "rating": <1-5>, "text": "<short review>", "days_ago": <number>}
  ],
  "alternatives": [
    {"brand": "<brand>", "name": "<product>", "category": "<category>", "texture": "<texture>", "skin_types": ["<types>"], "key_ingredients": ["<ingredients>"]}
  ]
}

Include 2-3 realistic reviews and 2-3 alternative products. Be accurate about the product's actual ingredients and properties. If you don't recognize the product, still provide your best analysis based on the brand and product name.`,
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    const raw = textBlock?.text?.trim() || "";

    // Parse the JSON response
    let data;
    try {
      // Strip markdown code fences if present
      const cleaned = raw.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "");
      data = JSON.parse(cleaned);
    } catch {
      console.error("[scan] Failed to parse Claude response:", raw);
      return NextResponse.json({
        success: false,
        error: "Failed to analyze product. Please try again.",
      });
    }

    // Ensure success flag
    data.success = true;

    return NextResponse.json(data);
  } catch (err) {
    console.error("[scan] Error:", err);
    return NextResponse.json(
      { success: false, error: "Scan failed. Please try again." },
      { status: 500 }
    );
  }
}
