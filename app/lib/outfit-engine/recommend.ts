import type {
  OutfitItem,
  OutfitCategory,
  BodyType,
  Occasion,
} from "../../types/outfit-builder";
import type { StylingRule } from "./constants";
import { CATEGORY_FILL_PRIORITY } from "./constants";
import {
  scoreCandidate,
  rankCandidates,
  type ScoredItem,
} from "./scoring";
import {
  filterByOccasion,
  filterByBudget,
  filterAlreadyUsed,
  filterByCategory,
  computeRemainingBudget,
} from "./filters";

// ─── Input / Output Types ────────────────────────────────────────

export interface RecommendInput {
  /** Items currently in the user's cart */
  cartItems: OutfitItem[];
  /** Full catalog of available items to recommend from */
  catalog: OutfitItem[];
  /** User's body type */
  bodyType: BodyType;
  /** Optional occasion filter */
  occasion?: Occasion | null;
  /** Optional total budget cap (USD) */
  budgetMax?: number | null;
  /** Items already equipped in outfit slots (excluded from results) */
  equippedItems?: OutfitItem[];
  /** Optional explicit rules to layer on top of built-in scoring */
  customRules?: StylingRule[];
  /** Max results per category (default 5) */
  maxPerCategory?: number;
}

export interface RecommendOutput {
  /** Recommendations grouped by category, ranked best-first */
  byCategory: Record<OutfitCategory, ScoredItem[]>;
  /** Flat ranked list across all categories */
  ranked: ScoredItem[];
  /** Which categories are missing from the current outfit */
  missingCategories: OutfitCategory[];
  /** Budget remaining after equipped items */
  remainingBudget: number | null;
}

// ─── Main Recommendation Function ────────────────────────────────

/**
 * Generate ranked outfit recommendations.
 *
 * Pipeline:
 *   1. Determine which categories need filling
 *   2. For each missing category:
 *      a. Filter catalog → category → occasion → budget → not-already-used
 *      b. Score each candidate against cart items + body type + custom rules
 *      c. Rank by score
 *   3. Return grouped + flat results
 *
 * All logic is rule-based. No ML.
 */
export function recommend(input: RecommendInput): RecommendOutput {
  const {
    cartItems,
    catalog,
    bodyType,
    occasion = null,
    budgetMax = null,
    equippedItems = [],
    customRules = [],
    maxPerCategory = 5,
  } = input;

  // IDs already in use (cart + equipped)
  const usedIds = new Set([
    ...cartItems.map((i) => i.id),
    ...equippedItems.map((i) => i.id),
  ]);

  // Categories already covered by cart + equipped
  const coveredCategories = new Set<OutfitCategory>([
    ...cartItems.map((i) => i.category),
    ...equippedItems.map((i) => i.category),
  ]);

  // Missing categories in priority order
  const missingCategories = CATEGORY_FILL_PRIORITY.filter(
    (cat) => !coveredCategories.has(cat)
  );

  // Remaining budget
  const remainingBudget = computeRemainingBudget(budgetMax, [
    ...cartItems,
    ...equippedItems,
  ]);

  // Context items for scoring (what the user already has)
  const contextItems = [...cartItems, ...equippedItems];

  // Score + rank per category
  const byCategory: Record<OutfitCategory, ScoredItem[]> = {
    tops: [],
    bottoms: [],
    outerwear: [],
    shoes: [],
    accessories: [],
  };

  const allScored: ScoredItem[] = [];

  for (const category of CATEGORY_FILL_PRIORITY) {
    // Step 1: Filter
    let candidates = filterByCategory(catalog, category);
    candidates = filterAlreadyUsed(candidates, usedIds);
    candidates = filterByOccasion(candidates, occasion);
    candidates = filterByBudget(candidates, remainingBudget);

    // Step 2: Score
    const scored = candidates.map((item) =>
      scoreCandidate(item, contextItems, bodyType, customRules)
    );

    // Step 3: Rank + limit
    const ranked = rankCandidates(scored).slice(0, maxPerCategory);

    byCategory[category] = ranked;
    allScored.push(...ranked);
  }

  // Global ranking across all categories
  const ranked = rankCandidates(allScored);

  return {
    byCategory,
    ranked,
    missingCategories,
    remainingBudget,
  };
}

// ─── Example Custom Rules ────────────────────────────────────────
// These demonstrate the rule schema. Import and pass to `recommend()`
// via `customRules` to layer them on top of built-in scoring.

export const EXAMPLE_RULES: StylingRule[] = [
  {
    id: "boost-neutral-tops",
    name: "Boost neutral-colored tops (versatile pairing)",
    conditions: [
      { field: "category", op: "eq", value: "tops" },
      { field: "attributes.color", op: "in", value: ["#FFFFFF", "#F5F5F0", "#1A1A1A", "#000000", "#F0E6D3", "#C8C8C8"] },
    ],
    score: 8,
    priority: 5,
  },
  {
    id: "penalize-same-silhouette",
    name: "Penalize when top+bottom have same oversized silhouette",
    conditions: [
      { field: "category", op: "in", value: ["tops", "bottoms"] },
      { field: "attributes.silhouette", op: "eq", value: "oversized" },
    ],
    score: -10,
    priority: 3,
  },
  {
    id: "boost-streetwear-sneakers",
    name: "Boost sneakers when outfit is streetwear-leaning",
    conditions: [
      { field: "category", op: "eq", value: "shoes" },
      { field: "attributes.style", op: "overlaps", value: ["streetwear", "casual"] },
      { field: "attributes.silhouette", op: "in", value: ["low-top", "high-top", "chunky"] },
    ],
    score: 12,
    priority: 7,
  },
  {
    id: "boost-classic-office-bottoms",
    name: "Boost tailored bottoms for office occasions",
    conditions: [
      { field: "category", op: "eq", value: "bottoms" },
      { field: "attributes.style", op: "overlaps", value: ["office", "classic"] },
      { field: "attributes.silhouette", op: "in", value: ["straight", "tapered", "slim-fit"] },
    ],
    score: 10,
    priority: 6,
  },
  {
    id: "boost-statement-outerwear",
    name: "Boost statement outerwear for events/dates",
    conditions: [
      { field: "category", op: "eq", value: "outerwear" },
      { field: "attributes.style", op: "overlaps", value: ["statement", "date", "event"] },
    ],
    score: 8,
    priority: 4,
  },
];
