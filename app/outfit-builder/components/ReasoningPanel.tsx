"use client";

import { useEffect, useRef } from "react";
import { useOutfitBuilderStore } from "../../lib/outfit-builder-store";
import { trackReasoningDisplayed } from "../../lib/analytics/reasoning";

const REASONING_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_REASONING !== "false";

/**
 * ReasoningPanel displays the AI-generated outfit explanation.
 *
 * Feature flag: controlled by NEXT_PUBLIC_ENABLE_REASONING.
 * When "false", this component renders nothing and never triggers
 * a fetch — the entire reasoning section is hidden.
 */
export default function ReasoningPanel() {
  const {
    reasoning,
    isReasoningLoading,
    fetchReasoning,
    slots,
    occasion,
    avatarProfile,
  } = useOutfitBuilderStore();

  const slotCount = Object.keys(slots).length;

  // Auto-fetch reasoning when outfit changes (only if enabled)
  useEffect(() => {
    if (!REASONING_ENABLED) return;
    if (!avatarProfile || slotCount === 0) return;
    fetchReasoning();
  }, [slots, occasion, avatarProfile, slotCount, fetchReasoning]);

  // Track when reasoning is displayed to the user
  const lastTrackedReasoning = useRef<string | null>(null);
  useEffect(() => {
    if (!reasoning || isReasoningLoading) return;
    if (reasoning === lastTrackedReasoning.current) return;
    lastTrackedReasoning.current = reasoning;

    if (!avatarProfile) return;
    trackReasoningDisplayed({
      bodyType: avatarProfile.bodyType,
      occasion: occasion ?? null,
      itemCount: slotCount,
      reasoningLength: reasoning.length,
      cached: false,
    });
  }, [reasoning, isReasoningLoading, avatarProfile, slotCount, occasion]);

  // ── Hidden when flag is off ────────────────────────────────────
  if (!REASONING_ENABLED) return null;

  // ── Hidden when no items equipped ──────────────────────────────
  if (!avatarProfile || slotCount === 0) return null;

  return (
    <div className="border rounded-xl p-5 space-y-3">
      <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
        Why this outfit works
      </h3>

      {isReasoningLoading ? (
        <div className="flex items-center gap-2 py-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          <span className="text-sm text-gray-400">Analyzing your outfit…</span>
        </div>
      ) : reasoning ? (
        <p className="text-sm text-gray-700 leading-relaxed">{reasoning}</p>
      ) : null}
    </div>
  );
}
