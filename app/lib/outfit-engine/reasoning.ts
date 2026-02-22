import Anthropic from "@anthropic-ai/sdk";
import { createHash } from "crypto";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import type { OutfitItem, OutfitCategory, BodyType, Occasion } from "../../types/outfit-builder";
import { FALLBACK_REASONING } from "./constants-reasoning";

// ─── Types ───────────────────────────────────────────────────────

export interface ReasoningInput {
  height: number;
  bodyType: BodyType;
  items: Partial<Record<OutfitCategory, Pick<OutfitItem, "category" | "name">>>;
  occasion: Occasion | null;
}

export interface ReasoningResult {
  reasoning: string;
  cacheKey: string;
  cached: boolean;
}

// ─── Cache Key ───────────────────────────────────────────────────

/**
 * Deterministic hash of the reasoning inputs.
 * Same outfit + profile + occasion → same key → cache hit.
 */
export function buildCacheKey(input: ReasoningInput): string {
  const itemIds = Object.entries(input.items)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cat, item]) => `${cat}:${item.name}`)
    .join("|");

  const raw = [
    `h=${input.height}`,
    `bt=${input.bodyType}`,
    `items=${itemIds}`,
    `occ=${input.occasion ?? "none"}`,
  ].join("&");

  return createHash("sha256").update(raw).digest("hex").slice(0, 24);
}

// ─── Firestore Cache ─────────────────────────────────────────────

const CACHE_COLLECTION = "outfitReasoningCache";

async function getCachedReasoning(cacheKey: string): Promise<string | null> {
  try {
    const ref = doc(db, CACHE_COLLECTION, cacheKey);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data().reasoning as string;
    }
  } catch {
    // Cache miss or Firestore unavailable — not fatal
  }
  return null;
}

async function setCachedReasoning(cacheKey: string, reasoning: string): Promise<void> {
  try {
    const ref = doc(db, CACHE_COLLECTION, cacheKey);
    await setDoc(ref, {
      reasoning,
      createdAt: Date.now(),
    });
  } catch {
    // Write failure is non-fatal
  }
}

// ─── Prompt Builder ──────────────────────────────────────────────

function buildPrompt(input: ReasoningInput): string {
  const itemList = Object.entries(input.items)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cat, item]) => `- ${cat}: ${item.name}`)
    .join("\n");

  const occasion = input.occasion ?? "general / everyday";

  return `You are a professional fashion stylist.

Explain in 1–2 concise sentences why the following outfit works well for the user.

User profile:
- Height: ${input.height}cm
- Body type: ${input.bodyType}

Outfit items:
${itemList}

Occasion:
${occasion}

Guidelines:
- Focus on silhouette, proportion, and color balance
- Keep the explanation practical and realistic
- Do not sound promotional
- Do not mention AI or technology
- Do not repeat the item names verbatim`;
}

// ─── Main Function ───────────────────────────────────────────────

/**
 * Generate a 1–2 sentence explanation of why the selected outfit works.
 *
 * 1. Build a deterministic cache key from the inputs.
 * 2. Check Firestore cache — return immediately on hit.
 * 3. On miss, call Claude API with the structured prompt.
 * 4. Cache the result in Firestore.
 * 5. On any failure, return a neutral fallback.
 *
 * This function is server-side only (uses ANTHROPIC_API_KEY env var).
 */
export async function generateOutfitReasoning(
  input: ReasoningInput
): Promise<ReasoningResult> {
  const cacheKey = buildCacheKey(input);

  // ── Feature flag ─────────────────────────────────────────────
  if (process.env.NEXT_PUBLIC_ENABLE_REASONING === "false") {
    return { reasoning: FALLBACK_REASONING, cacheKey, cached: false };
  }

  // ── Cache check ────────────────────────────────────────────────
  const cached = await getCachedReasoning(cacheKey);
  if (cached) {
    return { reasoning: cached, cacheKey, cached: true };
  }

  // ── Claude API call ────────────────────────────────────────────
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("[reasoning] ANTHROPIC_API_KEY not set — returning fallback");
    return { reasoning: FALLBACK_REASONING, cacheKey, cached: false };
  }

  try {
    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 150,
      messages: [
        {
          role: "user",
          content: buildPrompt(input),
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    const reasoning = textBlock?.text?.trim() || FALLBACK_REASONING;

    // ── Cache write ──────────────────────────────────────────────
    await setCachedReasoning(cacheKey, reasoning);

    return { reasoning, cacheKey, cached: false };
  } catch (err) {
    console.error("[reasoning] Claude API error:", err);
    return { reasoning: FALLBACK_REASONING, cacheKey, cached: false };
  }
}
