import type { OutfitItem, OutfitCategory, BodyType } from "../../types/outfit-builder";
import {
  type StylingRule,
  type RuleCondition,
  type ConditionOp,
  STYLE_COMPAT,
  COLOR_HARMONY,
  SILHOUETTE_BALANCE,
  BODY_SILHOUETTE_PREFS,
  hexToColorFamily,
} from "./constants";

// ─── Condition Evaluator ─────────────────────────────────────────

/**
 * Resolve a dot-path field on an OutfitItem.
 * e.g. "attributes.color" → item.attributes.color
 */
function resolveField(item: OutfitItem, field: string): unknown {
  const parts = field.split(".");
  let current: unknown = item;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/**
 * Evaluate a single RuleCondition against a candidate item.
 */
function evaluateCondition(item: OutfitItem, cond: RuleCondition): boolean {
  const actual = resolveField(item, cond.field);

  switch (cond.op) {
    case "any":
      return true;

    case "eq":
      return actual === cond.value;

    case "in":
      return Array.isArray(cond.value) && cond.value.includes(actual as string);

    case "not_in":
      return Array.isArray(cond.value) && !cond.value.includes(actual as string);

    case "overlaps": {
      if (!Array.isArray(actual) || !Array.isArray(cond.value)) return false;
      return actual.some((v) => (cond.value as string[]).includes(v));
    }

    default:
      return false;
  }
}

/**
 * Evaluate a full StylingRule (all conditions must pass).
 * Returns the rule's score if it fires, 0 otherwise.
 */
export function evaluateRule(item: OutfitItem, rule: StylingRule): number {
  const allPass = rule.conditions.every((c) => evaluateCondition(item, c));
  return allPass ? rule.score : 0;
}

// ─── Built-in Scoring Functions ──────────────────────────────────
// These compute scores from structured data (maps in constants.ts)
// rather than from StylingRule objects. They're combined with
// explicit rules in the final ranking.

/**
 * Style compatibility score.
 * How well the candidate's style tags overlap with the cart items' styles.
 * Returns 0–30.
 */
export function scoreStyleCompat(
  candidate: OutfitItem,
  cartItems: OutfitItem[]
): number {
  if (cartItems.length === 0) return 15; // neutral if cart is empty

  const cartStyles = new Set(cartItems.flatMap((i) => i.attributes.style));
  let matches = 0;
  let checks = 0;

  for (const style of candidate.attributes.style) {
    for (const cartStyle of cartStyles) {
      checks++;
      if (style === cartStyle) {
        matches += 2; // exact match
      } else if (STYLE_COMPAT[style]?.includes(cartStyle)) {
        matches += 1; // compatible
      }
    }
  }

  if (checks === 0) return 10;
  return Math.min(30, Math.round((matches / checks) * 30));
}

/**
 * Color harmony score.
 * Checks if the candidate's color family harmonizes with cart items.
 * Returns 0–20.
 */
export function scoreColorHarmony(
  candidate: OutfitItem,
  cartItems: OutfitItem[]
): number {
  if (cartItems.length === 0) return 10;

  const candidateFamily = hexToColorFamily(candidate.attributes.color);
  let harmonious = 0;

  for (const cartItem of cartItems) {
    const cartFamily = hexToColorFamily(cartItem.attributes.color);
    if (COLOR_HARMONY[candidateFamily]?.includes(cartFamily)) {
      harmonious++;
    }
  }

  return Math.round((harmonious / cartItems.length) * 20);
}

/**
 * Silhouette balance score.
 * Checks if the candidate's silhouette balances the cart items' silhouettes.
 * Returns 0–20.
 */
export function scoreSilhouetteBalance(
  candidate: OutfitItem,
  cartItems: OutfitItem[]
): number {
  // Only relevant when comparing tops ↔ bottoms
  const relevantCart = cartItems.filter((i) => {
    if (candidate.category === "tops") return i.category === "bottoms";
    if (candidate.category === "bottoms") return i.category === "tops";
    return false;
  });

  if (relevantCart.length === 0) return 10; // neutral

  let balanced = 0;
  for (const cartItem of relevantCart) {
    const pairKey =
      candidate.category === "tops"
        ? candidate.attributes.silhouette
        : cartItem.attributes.silhouette;
    const pairTarget =
      candidate.category === "tops"
        ? cartItem.attributes.silhouette
        : candidate.attributes.silhouette;

    if (SILHOUETTE_BALANCE[pairKey]?.includes(pairTarget)) {
      balanced++;
    }
  }

  return Math.round((balanced / relevantCart.length) * 20);
}

/**
 * Body-type fit score.
 * How well the candidate's silhouette suits the user's body type.
 * Returns 0–15.
 */
export function scoreBodyTypeFit(
  candidate: OutfitItem,
  bodyType: BodyType
): number {
  const prefs = BODY_SILHOUETTE_PREFS[bodyType]?.[candidate.category];
  if (!prefs || prefs.includes("any")) return 10;

  const idx = prefs.indexOf(candidate.attributes.silhouette);
  if (idx === -1) return 3; // not recommended but not penalized hard
  // First in list = best match
  return Math.max(5, 15 - idx * 3);
}

/**
 * Cross-brand bonus.
 * Encourages mixing brands (StyleCast's differentiator).
 * Returns 0–10.
 */
export function scoreCrossBrand(
  candidate: OutfitItem,
  cartItems: OutfitItem[]
): number {
  if (cartItems.length === 0) return 5;
  const cartBrands = new Set(cartItems.map((i) => i.brand));
  // Bonus if the candidate introduces a new brand
  return cartBrands.has(candidate.brand) ? 2 : 10;
}

// ─── Combined Scorer ─────────────────────────────────────────────

export interface ScoredItem {
  item: OutfitItem;
  totalScore: number;
  breakdown: {
    styleCompat: number;
    colorHarmony: number;
    silhouetteBalance: number;
    bodyTypeFit: number;
    crossBrand: number;
    explicitRules: number;
  };
}

/**
 * Score a single candidate item against the current context.
 *
 * Max theoretical score: 30 + 20 + 20 + 15 + 10 + rules = 95 + rules
 */
export function scoreCandidate(
  candidate: OutfitItem,
  cartItems: OutfitItem[],
  bodyType: BodyType,
  explicitRules: StylingRule[] = []
): ScoredItem {
  const styleCompat = scoreStyleCompat(candidate, cartItems);
  const colorHarmony = scoreColorHarmony(candidate, cartItems);
  const silhouetteBalance = scoreSilhouetteBalance(candidate, cartItems);
  const bodyTypeFit = scoreBodyTypeFit(candidate, bodyType);
  const crossBrand = scoreCrossBrand(candidate, cartItems);

  // Evaluate explicit rules
  let explicitRulesScore = 0;
  for (const rule of explicitRules) {
    explicitRulesScore += evaluateRule(candidate, rule);
  }

  const totalScore =
    styleCompat +
    colorHarmony +
    silhouetteBalance +
    bodyTypeFit +
    crossBrand +
    explicitRulesScore;

  return {
    item: candidate,
    totalScore,
    breakdown: {
      styleCompat,
      colorHarmony,
      silhouetteBalance,
      bodyTypeFit,
      crossBrand,
      explicitRules: explicitRulesScore,
    },
  };
}

/**
 * Rank a list of candidates. Highest score first.
 * Ties broken by explicit rule priority (if any rules fired).
 */
export function rankCandidates(scored: ScoredItem[]): ScoredItem[] {
  return [...scored].sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    // Secondary: prefer items with higher explicit rule scores
    return b.breakdown.explicitRules - a.breakdown.explicitRules;
  });
}
