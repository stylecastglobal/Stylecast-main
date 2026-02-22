import type { RGBColor } from "../lib/color-analysis/colorScience";

// ─── Body & Height ───────────────────────────────────────────────
export type BodyType = "slim" | "regular" | "curvy" | "athletic" | "relaxed";

export type HeightBucket = "petite" | "average" | "tall";

export function toHeightBucket(cm: number): HeightBucket {
  if (cm < 162) return "petite";
  if (cm <= 175) return "average";
  return "tall";
}

// ─── Avatar Base ─────────────────────────────────────────────────
export type AvatarGender = "female" | "male" | "neutral";

export interface AvatarBaseDef {
  id: string;
  gender: AvatarGender;
  bodyType: BodyType;
  heightBucket: HeightBucket;
  /** Proportions used to scale SVG layers */
  proportions: {
    headScale: number;       // 0.9–1.1 relative to default
    torsoLength: number;     // px
    legLength: number;       // px
    shoulderWidth: number;   // px
    hipWidth: number;        // px
  };
  /** Paths to the SVG layer files (relative to /public/avatar/) */
  layers: {
    body: string;            // full body silhouette with skin fill
    hair: string;            // hair shape (filled with extracted hair color)
    face: string;            // minimal face features (eyes, brows, lips)
  };
}

// ─── Extracted Features ──────────────────────────────────────────
export interface ExtractedFeatures {
  skinTone: RGBColor;
  skinToneHex: string;
  hairColor: RGBColor;
  hairColorHex: string;
}

// ─── Avatar Profile (persisted) ──────────────────────────────────
export interface AvatarProfile {
  id: string;
  userId: string;
  height: number;            // cm
  bodyType: BodyType;
  heightBucket: HeightBucket;
  gender: AvatarGender;
  features: ExtractedFeatures;
  avatarBaseId: string;      // references AvatarBaseDef.id
  createdAt: number;
}

// ─── Outfit Types ────────────────────────────────────────────────
export type OutfitCategory =
  | "tops"
  | "bottoms"
  | "outerwear"
  | "shoes"
  | "accessories";

export interface OutfitItem {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  category: OutfitCategory;
  attributes: {
    color: string;           // primary color hex
    silhouette: string;      // e.g. "oversized", "slim-fit"
    style: string[];         // e.g. ["casual", "streetwear"]
  };
  /** Path to the clothing overlay PNG (transparent, positioned for avatar) */
  overlayImage?: string;
}

export type Occasion = "daily" | "office" | "date" | "travel" | "event";

export interface OutfitCombo {
  id: string;
  avatarProfileId: string;
  items: Partial<Record<OutfitCategory, OutfitItem>>;
  occasion: Occasion | null;
  budgetMax: number | null;
  reasoning: string | null;
  reasoningCacheKey: string;
  createdAt: number;
  savedAt: number | null;
}
