"use client";

import { useEffect, useState } from "react";
import type { OutfitCategory } from "../../types/outfit-builder";
import { getAvatarBaseById } from "../../lib/avatar/baseSelector";
import { useOutfitBuilderStore } from "../../lib/outfit-builder-store";
import OutfitLayer from "./OutfitLayer";

/**
 * AvatarCanvas renders a stylized avatar by stacking SVG layers
 * and injecting skin tone / hair color via CSS custom properties.
 *
 * Layer order (back → front):
 *   1. Body silhouette (skin color via CSS var)
 *   2. Hair (hair color via CSS var)
 *   3. Face (head + features)
 *   4. Clothing layers via OutfitLayer (anchor-point positioned)
 *      shoes → bottoms → tops → outerwear → accessories
 *
 * Each OutfitLayer reads its anchor point from anchorPoints.ts,
 * adjusts for bodyType + heightBucket, and animates on item change.
 */

const CLOTHING_Z_ORDER: OutfitCategory[] = [
  "shoes",
  "bottoms",
  "tops",
  "outerwear",
  "accessories",
];

interface AvatarCanvasProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function AvatarCanvas({
  className = "",
  width = 400,
  height = 720,
}: AvatarCanvasProps) {
  const { avatarProfile, slots } = useOutfitBuilderStore();

  const [bodySvg, setBodySvg] = useState<string>("");
  const [hairSvg, setHairSvg] = useState<string>("");
  const [faceSvg, setFaceSvg] = useState<string>("");

  const base = avatarProfile
    ? getAvatarBaseById(avatarProfile.avatarBaseId)
    : null;

  // Fetch and inline the SVG content so CSS variables can style them
  useEffect(() => {
    if (!base) return;

    const load = async (url: string) => {
      try {
        const res = await fetch(url);
        return await res.text();
      } catch {
        return "";
      }
    };

    Promise.all([
      load(base.layers.body),
      load(base.layers.hair),
      load(base.layers.face),
    ]).then(([b, h, f]) => {
      setBodySvg(b);
      setHairSvg(h);
      setFaceSvg(f);
    });
  }, [base]);

  if (!avatarProfile || !base) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 rounded-2xl ${className}`}
        style={{ width, height: height * 0.6 }}
      >
        <p className="text-gray-400 text-sm">Set up your avatar to begin</p>
      </div>
    );
  }

  const { features } = avatarProfile;

  // CSS custom properties injected into the wrapper so every child SVG
  // that uses `fill="var(--avatar-skin)"` / `fill="var(--avatar-hair)"`
  // picks up the extracted colors automatically.
  const cssVars = {
    "--avatar-skin": features.skinToneHex,
    "--avatar-hair": features.hairColorHex,
  } as React.CSSProperties;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, ...cssVars }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl" />

      {/* Avatar + clothing layer stack */}
      <div className="absolute inset-0 flex items-end justify-center pb-6">
        <div
          className="relative"
          style={{ width: width * 0.85, height: height * 0.88 }}
        >
          {/* ── Base avatar SVG layers ────────────────────── */}
          {/* 1. Body */}
          {bodySvg && (
            <div
              className="absolute inset-0"
              style={{ zIndex: 1 }}
              dangerouslySetInnerHTML={{ __html: bodySvg }}
            />
          )}

          {/* 2. Hair (behind face) */}
          {hairSvg && (
            <div
              className="absolute inset-0"
              style={{ zIndex: 2 }}
              dangerouslySetInnerHTML={{ __html: hairSvg }}
            />
          )}

          {/* 3. Face */}
          {faceSvg && (
            <div
              className="absolute inset-0"
              style={{ zIndex: 3 }}
              dangerouslySetInnerHTML={{ __html: faceSvg }}
            />
          )}

          {/* ── Clothing layers (anchor-point positioned) ─── */}
          {CLOTHING_Z_ORDER.map((category) => (
            <OutfitLayer
              key={category}
              item={slots[category]}
              category={category}
              bodyType={avatarProfile.bodyType}
              heightBucket={avatarProfile.heightBucket}
            />
          ))}
        </div>
      </div>

      {/* Slot indicator pills */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 justify-center">
        {CLOTHING_Z_ORDER.map((cat) => {
          const item = slots[cat];
          return (
            <span
              key={cat}
              className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                item
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {cat}
            </span>
          );
        })}
      </div>
    </div>
  );
}
