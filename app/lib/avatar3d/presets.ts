import type { OutfitCategory } from "../../types/outfit-builder";

// ─── 3D Outfit Asset Mapping ─────────────────────────────────────
//
// Each preset maps outfit categories to 3D asset URLs (GLB/GLTF).
// For now these use ReadyPlayerMe's built-in outfit parameters.
// In the future, each catalog OutfitItem can carry an `asset3dUrl`
// field that plugs directly into this structure.
//
// Architecture note:
//   OutfitItem.asset3dUrl → OutfitPreset3D.assets[category] → loaded in viewer
//   This indirection lets us swap between preset bundles and per-item assets.

export interface OutfitAsset3D {
  /** URL to the GLB/GLTF model for this clothing piece */
  url: string;
  /** Category this asset belongs to */
  category: OutfitCategory;
  /** Display name */
  name: string;
  /** Optional catalog item ID this asset maps to */
  catalogItemId?: string;
}

export interface OutfitPreset3D {
  id: string;
  name: string;
  description: string;
  /** RPM outfit parameter string (used to modify the avatar GLB URL) */
  rpmOutfitParam?: string;
  /** Per-category 3D assets — for future per-item loading */
  assets: Partial<Record<OutfitCategory, OutfitAsset3D>>;
}

/**
 * ReadyPlayerMe supports outfit morphs via URL parameters.
 * These presets modify the avatar GLB URL to show different outfits.
 *
 * When we have real 3D clothing assets, each OutfitItem in the catalog
 * will carry an `asset3dUrl` field, and we'll build the preset dynamically
 * from the selected slots instead of using these hardcoded presets.
 */
export const OUTFIT_PRESETS_3D: OutfitPreset3D[] = [
  {
    id: "default",
    name: "Default",
    description: "Avatar's default outfit",
    rpmOutfitParam: undefined,
    assets: {},
  },
  {
    id: "casual-streetwear",
    name: "Casual Streetwear",
    description: "Relaxed tee, jeans, and sneakers",
    rpmOutfitParam: "?meshLod=1&textureAtlas=512",
    assets: {
      tops: { url: "", category: "tops", name: "Oversized Tee", catalogItemId: "top-1" },
      bottoms: { url: "", category: "bottoms", name: "Straight Jeans", catalogItemId: "bot-1" },
      shoes: { url: "", category: "shoes", name: "Low Sneakers", catalogItemId: "shoe-1" },
    },
  },
  {
    id: "minimal-chic",
    name: "Minimal Chic",
    description: "Clean lines, neutral palette",
    rpmOutfitParam: "?meshLod=1&textureAtlas=1024",
    assets: {
      tops: { url: "", category: "tops", name: "Halter Tank", catalogItemId: "top-2" },
      bottoms: { url: "", category: "bottoms", name: "Wide Cargo", catalogItemId: "bot-2" },
    },
  },
  {
    id: "winter-layered",
    name: "Winter Layered",
    description: "Warm layers for cold weather",
    rpmOutfitParam: "?meshLod=1&quality=high",
    assets: {
      tops: { url: "", category: "tops", name: "Mock-Neck", catalogItemId: "top-3" },
      outerwear: { url: "", category: "outerwear", name: "Fur Jacket", catalogItemId: "out-1" },
      accessories: { url: "", category: "accessories", name: "Beanie", catalogItemId: "acc-1" },
    },
  },
];

/**
 * Build a ReadyPlayerMe GLB URL with optional outfit parameters.
 * The base URL comes from the RPM iframe callback.
 */
export function buildRpmGlbUrl(
  baseGlbUrl: string,
  preset?: OutfitPreset3D
): string {
  // RPM GLB URLs already end with .glb — append quality params
  const separator = baseGlbUrl.includes("?") ? "&" : "?";
  const qualityParams = "meshLod=0&textureAtlas=1024&textureSizeLimit=1024&morphTargets=ARKit&quality=high";

  if (preset?.rpmOutfitParam) {
    // Strip leading ? from preset param since we handle separator
    const presetParams = preset.rpmOutfitParam.replace(/^\?/, "");
    return `${baseGlbUrl}${separator}${qualityParams}&${presetParams}`;
  }

  return `${baseGlbUrl}${separator}${qualityParams}`;
}
