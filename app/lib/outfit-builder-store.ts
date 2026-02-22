import { create } from "zustand";
import type {
  AvatarProfile,
  AvatarGender,
  BodyType,
  ExtractedFeatures,
  OutfitItem,
  OutfitCategory,
  Occasion,
} from "../types/outfit-builder";
import { toHeightBucket } from "../types/outfit-builder";
import { selectAvatarBase } from "./avatar/baseSelector";
import { trackReasoningRequested } from "./analytics/reasoning";
import { FALLBACK_REASONING } from "./outfit-engine/constants-reasoning";

// ─── Setup step flow ─────────────────────────────────────────────
export type SetupStep = "selfie" | "height" | "bodyType" | "done";

// ─── Store shape ─────────────────────────────────────────────────
interface OutfitBuilderState {
  // Avatar setup
  setupStep: SetupStep;
  selfieFile: File | null;
  gender: AvatarGender;
  height: number;
  bodyType: BodyType;
  features: ExtractedFeatures | null;
  avatarProfile: AvatarProfile | null;
  isExtracting: boolean;

  // Outfit slots
  slots: Partial<Record<OutfitCategory, OutfitItem>>;
  occasion: Occasion | null;
  budgetMax: number | null;

  // AI reasoning
  reasoning: string | null;
  reasoningCacheKey: string | null;
  isReasoningLoading: boolean;

  // 3D avatar
  rpmGlbUrl: string | null;
  activePreset3DId: string;
  viewMode: "2d" | "3d";

  // Actions — setup
  setSetupStep: (step: SetupStep) => void;
  setSelfieFile: (file: File) => void;
  setGender: (gender: AvatarGender) => void;
  setHeight: (cm: number) => void;
  setBodyType: (bt: BodyType) => void;
  setFeatures: (f: ExtractedFeatures) => void;
  setIsExtracting: (v: boolean) => void;
  finalizeAvatar: () => void;

  // Actions — outfit
  setSlot: (category: OutfitCategory, item: OutfitItem) => void;
  clearSlot: (category: OutfitCategory) => void;
  clearAllSlots: () => void;
  setOccasion: (o: Occasion | null) => void;
  setBudgetMax: (n: number | null) => void;

  // Actions — reasoning
  fetchReasoning: () => Promise<void>;

  // Actions — 3D avatar
  setRpmGlbUrl: (url: string) => void;
  setActivePreset3D: (presetId: string) => void;
  setViewMode: (mode: "2d" | "3d") => void;

  // Reset
  reset: () => void;
}

const initialState = {
  setupStep: "selfie" as SetupStep,
  selfieFile: null,
  gender: "female" as AvatarGender,
  height: 165,
  bodyType: "regular" as BodyType,
  features: null,
  avatarProfile: null,
  isExtracting: false,
  slots: {},
  occasion: null,
  budgetMax: null,
  reasoning: null,
  reasoningCacheKey: null,
  isReasoningLoading: false,
  rpmGlbUrl: null,
  activePreset3DId: "default",
  viewMode: "2d" as "2d" | "3d",
};

export const useOutfitBuilderStore = create<OutfitBuilderState>((set, get) => ({
  ...initialState,

  // ── Setup actions ──────────────────────────────────────────────
  setSetupStep: (step) => set({ setupStep: step }),
  setSelfieFile: (file) => set({ selfieFile: file }),
  setGender: (gender) => set({ gender }),
  setHeight: (cm) => set({ height: cm }),
  setBodyType: (bt) => set({ bodyType: bt }),
  setFeatures: (f) => set({ features: f }),
  setIsExtracting: (v) => set({ isExtracting: v }),

  finalizeAvatar: () => {
    const { gender, bodyType, height, features } = get();
    if (!features) return;

    const base = selectAvatarBase(gender, bodyType, height);

    const profile: AvatarProfile = {
      id: `avatar-${Date.now()}`,
      userId: "anonymous",
      height,
      bodyType,
      heightBucket: toHeightBucket(height),
      gender,
      features,
      avatarBaseId: base.id,
      createdAt: Date.now(),
    };

    set({ avatarProfile: profile, setupStep: "done" });
  },

  // ── Outfit actions ─────────────────────────────────────────────
  setSlot: (category, item) =>
    set((s) => ({ slots: { ...s.slots, [category]: item } })),

  clearSlot: (category) =>
    set((s) => {
      const next = { ...s.slots };
      delete next[category];
      return { slots: next, reasoning: null, reasoningCacheKey: null };
    }),

  clearAllSlots: () => set({ slots: {}, reasoning: null, reasoningCacheKey: null }),
  setOccasion: (o) => set({ occasion: o }),
  setBudgetMax: (n) => set({ budgetMax: n }),

  // ── Reasoning ──────────────────────────────────────────────────
  fetchReasoning: async () => {
    // Feature flag — set NEXT_PUBLIC_ENABLE_REASONING=false to disable
    if (process.env.NEXT_PUBLIC_ENABLE_REASONING === "false") return;

    const { avatarProfile, slots, occasion, reasoningCacheKey } = get();
    if (!avatarProfile) return;

    const filledItems = Object.entries(slots) as [OutfitCategory, OutfitItem][];
    if (filledItems.length === 0) {
      set({ reasoning: null, reasoningCacheKey: null });
      return;
    }

    // Build structured input for the API
    const items = Object.fromEntries(
      filledItems.map(([cat, item]) => [cat, { category: item.category, name: item.name }])
    );

    const input = {
      height: avatarProfile.height,
      bodyType: avatarProfile.bodyType,
      items,
      occasion: occasion ?? null,
    };

    // Simple client-side fingerprint to avoid duplicate calls
    const fingerprint = filledItems
      .map(([cat, item]) => `${cat}:${item.name}`)
      .sort()
      .join("|") + `|${avatarProfile.height}|${avatarProfile.bodyType}|${occasion ?? "none"}`;

    // Skip if outfit hasn't changed
    if (fingerprint === reasoningCacheKey) return;

    set({ isReasoningLoading: true });

    try {
      const res = await fetch("/api/generateOutfits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) throw new Error(`API ${res.status}`);

      const data = await res.json();
      set({
        reasoning: data.reasoning,
        reasoningCacheKey: data.cacheKey,
        isReasoningLoading: false,
      });

      trackReasoningRequested({
        bodyType: avatarProfile.bodyType,
        height: avatarProfile.height,
        occasion: occasion ?? null,
        items: slots,
        cached: data.cached ?? false,
      });
    } catch (err) {
      console.error("[fetchReasoning]", err);
      set({
        reasoning: FALLBACK_REASONING,
        reasoningCacheKey: fingerprint,
        isReasoningLoading: false,
      });
    }
  },

  // ── 3D Avatar ────────────────────────────────────────────────
  setRpmGlbUrl: (url) => set({ rpmGlbUrl: url, viewMode: "3d" }),
  setActivePreset3D: (presetId) => set({ activePreset3DId: presetId }),
  setViewMode: (mode) => set({ viewMode: mode }),

  // ── Reset ──────────────────────────────────────────────────────
  reset: () => set(initialState),
}));
