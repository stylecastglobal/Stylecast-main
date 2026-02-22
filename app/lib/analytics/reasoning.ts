import type { OutfitItem, OutfitCategory, BodyType, Occasion } from "../../types/outfit-builder";

// ─── Event Types ─────────────────────────────────────────────────

interface ReasoningRequestedEvent {
  event: "reasoning_requested";
  bodyType: BodyType;
  height: number;
  occasion: Occasion | null;
  itemCount: number;
  categories: OutfitCategory[];
  cached: boolean;
}

interface ReasoningDisplayedEvent {
  event: "reasoning_displayed";
  bodyType: BodyType;
  occasion: Occasion | null;
  itemCount: number;
  reasoningLength: number;
  cached: boolean;
}

interface PurchaseAfterReasoningEvent {
  event: "purchase_after_reasoning";
  reasoningWasDisplayed: boolean;
  itemCount: number;
  totalAmount: number;
}

type ReasoningAnalyticsEvent =
  | ReasoningRequestedEvent
  | ReasoningDisplayedEvent
  | PurchaseAfterReasoningEvent;

// ─── Dispatch ────────────────────────────────────────────────────

/**
 * Central dispatch for reasoning analytics events.
 *
 * Currently logs to console + pushes to window.dataLayer (GTM-compatible).
 * Replace the body of this function to route to any analytics provider
 * (Mixpanel, PostHog, Segment, etc.) without changing call sites.
 */
function dispatch(payload: ReasoningAnalyticsEvent): void {
  if (typeof window === "undefined") return;

  // Console (dev)
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics:reasoning]", payload.event, payload);
  }

  // GTM dataLayer (production-ready)
  const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ ...payload });
}

// ─── Public Track Functions ──────────────────────────────────────

/**
 * Track when reasoning is requested (API call initiated).
 */
export function trackReasoningRequested(params: {
  bodyType: BodyType;
  height: number;
  occasion: Occasion | null;
  items: Partial<Record<OutfitCategory, OutfitItem>>;
  cached: boolean;
}): void {
  const categories = Object.keys(params.items) as OutfitCategory[];
  dispatch({
    event: "reasoning_requested",
    bodyType: params.bodyType,
    height: params.height,
    occasion: params.occasion,
    itemCount: categories.length,
    categories,
    cached: params.cached,
  });
}

/**
 * Track when reasoning text is displayed to the user.
 */
export function trackReasoningDisplayed(params: {
  bodyType: BodyType;
  occasion: Occasion | null;
  itemCount: number;
  reasoningLength: number;
  cached: boolean;
}): void {
  dispatch({
    event: "reasoning_displayed",
    bodyType: params.bodyType,
    occasion: params.occasion,
    itemCount: params.itemCount,
    reasoningLength: params.reasoningLength,
    cached: params.cached,
  });
}

/**
 * Track when a purchase occurs and whether reasoning was shown.
 */
export function trackPurchaseAfterReasoning(params: {
  reasoningWasDisplayed: boolean;
  itemCount: number;
  totalAmount: number;
}): void {
  dispatch({
    event: "purchase_after_reasoning",
    reasoningWasDisplayed: params.reasoningWasDisplayed,
    itemCount: params.itemCount,
    totalAmount: params.totalAmount,
  });
}
