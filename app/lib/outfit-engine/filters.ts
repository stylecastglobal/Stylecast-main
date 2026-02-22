import type { OutfitItem, OutfitCategory, Occasion } from "../../types/outfit-builder";
import { OCCASION_STYLES } from "./constants";

/**
 * Filter candidates by occasion.
 * Keeps items whose style tags overlap with the occasion's allowed styles.
 * Items with no style tags pass through (permissive).
 */
export function filterByOccasion(
  candidates: OutfitItem[],
  occasion: Occasion | null
): OutfitItem[] {
  if (!occasion) return candidates;

  const allowedStyles = OCCASION_STYLES[occasion];
  if (!allowedStyles) return candidates;

  return candidates.filter((item) => {
    if (item.attributes.style.length === 0) return true;
    return item.attributes.style.some((s) => allowedStyles.includes(s));
  });
}

/**
 * Filter candidates by budget.
 * `budgetMax` is the total remaining budget for the outfit.
 * Items priced above `budgetMax` are excluded.
 */
export function filterByBudget(
  candidates: OutfitItem[],
  budgetMax: number | null
): OutfitItem[] {
  if (budgetMax == null || budgetMax <= 0) return candidates;
  return candidates.filter((item) => item.price <= budgetMax);
}

/**
 * Filter out items that are already in the cart or equipped slots.
 */
export function filterAlreadyUsed(
  candidates: OutfitItem[],
  usedIds: Set<string>
): OutfitItem[] {
  return candidates.filter((item) => !usedIds.has(item.id));
}

/**
 * Filter candidates to a specific category.
 */
export function filterByCategory(
  candidates: OutfitItem[],
  category: OutfitCategory
): OutfitItem[] {
  return candidates.filter((item) => item.category === category);
}

/**
 * Compute remaining budget after accounting for already-selected items.
 */
export function computeRemainingBudget(
  budgetMax: number | null,
  selectedItems: OutfitItem[]
): number | null {
  if (budgetMax == null) return null;
  const spent = selectedItems.reduce((sum, item) => sum + item.price, 0);
  return Math.max(0, budgetMax - spent);
}
