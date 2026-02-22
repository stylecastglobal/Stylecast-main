import type { BodyType, Occasion, OutfitCategory } from "../../types/outfit-builder";

// ─── Rule Schema ─────────────────────────────────────────────────
//
// A StylingRule is a single, human-readable, editable rule.
// The engine evaluates ALL rules against a candidate item and sums
// the scores. Higher total = better recommendation.
//
// To add/edit rules: just modify the arrays below. No code changes
// needed in the scoring engine.
// ─────────────────────────────────────────────────────────────────

/**
 * Condition operators for matching item attributes.
 *
 *  "eq"          — exact string match
 *  "in"          — value is one of a list
 *  "not_in"      — value is NOT one of a list
 *  "overlaps"    — arrays share at least one element
 *  "any"         — always true (wildcard)
 */
export type ConditionOp = "eq" | "in" | "not_in" | "overlaps" | "any";

/**
 * A single condition that tests one attribute of a candidate item.
 *
 *  field:  dot-path on OutfitItem  (e.g. "category", "attributes.silhouette", "attributes.style")
 *  op:     comparison operator
 *  value:  the value(s) to compare against
 */
export interface RuleCondition {
  field: string;
  op: ConditionOp;
  value: string | string[];
}

/**
 * A StylingRule groups conditions with a score delta.
 *
 *  id:          unique, human-readable key
 *  name:        short description (shown in admin / debug)
 *  conditions:  ALL must pass for the rule to fire (AND logic)
 *  score:       points added to the candidate when the rule fires
 *  priority:    tie-breaker when scores are equal (higher wins)
 */
export interface StylingRule {
  id: string;
  name: string;
  conditions: RuleCondition[];
  score: number;
  priority: number;
}

// ─── Style Compatibility ─────────────────────────────────────────
// Which style tags pair well together.
// Symmetric: if A compat B, then B compat A.

export const STYLE_COMPAT: Record<string, string[]> = {
  casual:      ["streetwear", "minimal", "classic", "sporty"],
  streetwear:  ["casual", "sporty", "statement", "winter"],
  minimal:     ["casual", "classic", "office"],
  classic:     ["casual", "minimal", "office", "date"],
  office:      ["classic", "minimal"],
  sporty:      ["casual", "streetwear"],
  statement:   ["streetwear", "date", "event"],
  date:        ["classic", "statement", "minimal"],
  winter:      ["casual", "streetwear", "statement"],
  event:       ["statement", "date", "classic"],
};

// ─── Color Harmony Groups ────────────────────────────────────────
// Hex prefixes mapped to named color families.
// Used by the color-harmony rule to check if two items' colors work.

export type ColorFamily =
  | "neutral" | "warm" | "cool" | "earth" | "pastel" | "bold";

export function hexToColorFamily(hex: string): ColorFamily {
  const h = hex.replace("#", "").toLowerCase();
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  const brightness = max / 255;

  // Neutrals: very low saturation or very dark/light
  if (sat < 0.15 || brightness < 0.15 || brightness > 0.92) return "neutral";
  // Pastels: high brightness, moderate saturation
  if (brightness > 0.75 && sat < 0.45) return "pastel";
  // Earth tones: warm hue, moderate saturation + brightness
  if (r > g && g > b && sat < 0.6 && brightness < 0.7) return "earth";
  // Bold: high saturation
  if (sat > 0.6) {
    if (r > g && r > b) return "warm";
    if (b > r && b > g) return "cool";
    return "bold";
  }
  // Fallback
  if (r > b) return "warm";
  return "cool";
}

export const COLOR_HARMONY: Record<ColorFamily, ColorFamily[]> = {
  neutral: ["neutral", "warm", "cool", "earth", "pastel", "bold"], // neutrals go with everything
  warm:    ["neutral", "warm", "earth"],
  cool:    ["neutral", "cool", "pastel"],
  earth:   ["neutral", "warm", "earth", "pastel"],
  pastel:  ["neutral", "cool", "earth", "pastel"],
  bold:    ["neutral", "bold"],
};

// ─── Silhouette Balance Rules ────────────────────────────────────
// Maps a top silhouette to the best-matching bottom silhouettes.

export const SILHOUETTE_BALANCE: Record<string, string[]> = {
  "oversized":  ["slim-fit", "straight", "tapered"],
  "slim-fit":   ["wide", "straight", "relaxed", "a-line"],
  "regular":    ["straight", "slim-fit", "wide", "tapered"],
  "cropped":    ["wide", "straight", "a-line"],
  "fitted":     ["wide", "straight", "relaxed"],
};

// ─── Body-Type Silhouette Preferences ────────────────────────────
// Which silhouettes are recommended per body type.

export const BODY_SILHOUETTE_PREFS: Record<BodyType, Record<OutfitCategory, string[]>> = {
  slim: {
    tops:       ["oversized", "regular", "cropped"],
    bottoms:    ["wide", "straight", "relaxed"],
    outerwear:  ["oversized", "regular"],
    shoes:      ["chunky", "platform", "low-top"],
    accessories:["any"],
  },
  regular: {
    tops:       ["regular", "slim-fit", "oversized"],
    bottoms:    ["straight", "slim-fit", "tapered"],
    outerwear:  ["regular", "oversized"],
    shoes:      ["low-top", "sneaker", "boot"],
    accessories:["any"],
  },
  curvy: {
    tops:       ["fitted", "regular", "v-neck"],
    bottoms:    ["straight", "wide", "a-line"],
    outerwear:  ["regular", "fitted"],
    shoes:      ["heeled", "pointed", "low-top"],
    accessories:["any"],
  },
  athletic: {
    tops:       ["regular", "slim-fit", "fitted"],
    bottoms:    ["tapered", "straight", "slim-fit"],
    outerwear:  ["regular", "bomber"],
    shoes:      ["sneaker", "low-top", "boot"],
    accessories:["any"],
  },
  relaxed: {
    tops:       ["oversized", "regular", "relaxed"],
    bottoms:    ["wide", "relaxed", "straight"],
    outerwear:  ["oversized", "relaxed"],
    shoes:      ["chunky", "sneaker", "low-top"],
    accessories:["any"],
  },
};

// ─── Occasion → Style Mapping ────────────────────────────────────
// Which style tags are appropriate for each occasion.

export const OCCASION_STYLES: Record<Occasion, string[]> = {
  daily:  ["casual", "streetwear", "minimal", "sporty"],
  office: ["office", "classic", "minimal"],
  date:   ["date", "classic", "statement", "minimal"],
  travel: ["casual", "sporty", "minimal", "streetwear"],
  event:  ["event", "statement", "date", "classic"],
};

// ─── Category Fill Priority ──────────────────────────────────────
// When recommending items to complete an outfit, which empty slots
// should be filled first.

export const CATEGORY_FILL_PRIORITY: OutfitCategory[] = [
  "tops",
  "bottoms",
  "shoes",
  "outerwear",
  "accessories",
];
