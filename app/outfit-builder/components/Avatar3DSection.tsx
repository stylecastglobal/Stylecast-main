"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Pencil } from "lucide-react";
import { useOutfitBuilderStore } from "../../lib/outfit-builder-store";
import ReadyPlayerMeCreator from "./ReadyPlayerMeCreator";
import type { OutfitCategory, OutfitItem } from "../../types/outfit-builder";

// Dynamic import to avoid SSR issues with Three.js
const Avatar3DViewer = dynamic(() => import("./Avatar3DViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-2xl bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Loading 3D viewer…</span>
      </div>
    </div>
  ),
});

/**
 * Quality params appended to the GLB URL returned by the RPM creator.
 * meshLod=0 = highest detail, 1024 textures, morphTargets for expressions.
 */
const RPM_QUALITY_SUFFIX = "meshLod=0&textureAtlas=1024&textureSizeLimit=1024&morphTargets=ARKit&quality=high";

/**
 * Build a color map from the currently equipped outfit slots.
 * This is passed to the 3D viewer to tint avatar materials.
 */
function buildOutfitColors(
  slots: Partial<Record<OutfitCategory, OutfitItem>>
): Record<string, string> {
  const colors: Record<string, string> = {};
  for (const [category, item] of Object.entries(slots)) {
    if (item?.attributes?.color) {
      colors[category] = item.attributes.color;
    }
  }
  return colors;
}

/**
 * Avatar3DSection shows the 3D viewer immediately with a default avatar.
 * The RPM creator is only shown when the user explicitly clicks "Customize".
 * Outfit slot selections from the right panel are reflected as color tints.
 */
export default function Avatar3DSection() {
  const {
    rpmGlbUrl,
    setRpmGlbUrl,
    slots,
  } = useOutfitBuilderStore();

  const [showCreator, setShowCreator] = useState(false);

  const glbUrl = rpmGlbUrl
    ? `${rpmGlbUrl}${rpmGlbUrl.includes("?") ? "&" : "?"}${RPM_QUALITY_SUFFIX}`
    : null;

  const outfitColors = useMemo(() => buildOutfitColors(slots), [slots]);

  const equippedCount = Object.keys(slots).length;

  // ── RPM Creator (only on explicit action) ────────────────────
  if (showCreator) {
    return (
      <ReadyPlayerMeCreator
        onAvatarCreated={(url) => {
          setRpmGlbUrl(url);
          setShowCreator(false);
        }}
        onClose={() => setShowCreator(false)}
        className="h-[640px]"
      />
    );
  }

  // ── No avatar yet — prompt to create ──────────────────────────
  if (!glbUrl) {
    return (
      <div className="w-full h-[560px] rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-5">
        <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
            <path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
            <path d="M20 21c0-3.87-3.58-7-8-7s-8 3.13-8 7" />
          </svg>
        </div>
        <div className="text-center px-6">
          <p className="text-sm font-medium text-gray-700">Create your 3D avatar</p>
          <p className="text-xs text-gray-400 mt-1">Design a personalized avatar with Ready Player Me</p>
        </div>
        <button
          onClick={() => setShowCreator(true)}
          className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
        >
          Get Started
        </button>
      </div>
    );
  }

  // ── 3D Viewer ────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Avatar3DViewer
          glbUrl={glbUrl}
          outfitColors={outfitColors}
          className="h-[560px]"
        />

        {/* Customize avatar button */}
        <button
          onClick={() => setShowCreator(true)}
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-xs font-medium rounded-lg shadow-sm transition"
        >
          <Pencil className="w-3 h-3" />
          Customize
        </button>
      </div>

      {/* Equipped items indicator */}
      {equippedCount > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(slots) as [OutfitCategory, OutfitItem][]).map(
            ([cat, item]) => (
              <div
                key={cat}
                className="flex items-center gap-1.5 bg-gray-50 rounded-md px-2 py-1"
              >
                <div
                  className="w-3 h-3 rounded-sm border"
                  style={{ backgroundColor: item.attributes.color }}
                />
                <span className="text-[10px] text-gray-500 capitalize">{cat}</span>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
