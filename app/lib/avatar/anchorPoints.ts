import type { OutfitCategory, BodyType, HeightBucket } from "../../types/outfit-builder";

/**
 * Anchor point defines WHERE a clothing layer sits on the avatar.
 * All values are percentages (0–100) relative to the avatar viewBox (400×800).
 *
 * - top/left: position of the layer's top-left corner
 * - width/height: size of the layer bounding box
 * - zIndex: stacking order (higher = in front)
 */
export interface AnchorPoint {
  top: number;     // % from top
  left: number;    // % from left
  width: number;   // % of viewBox width
  height: number;  // % of viewBox height
  zIndex: number;
}

/**
 * Default anchor points for each clothing category.
 * These are tuned for the 400×800 viewBox used by all avatar bases.
 *
 * Coordinate reference (from body SVG):
 *   Head center:  ~(200, 72)
 *   Shoulders:    ~y=148, x=140–260
 *   Waist:        ~y=340
 *   Hips:         ~y=355–432
 *   Knees:        ~y=540
 *   Feet:         ~y=660–680
 */
const DEFAULT_ANCHORS: Record<OutfitCategory, AnchorPoint> = {
  tops: {
    top: 18,      // starts at shoulder line (~153/800)
    left: 28,     // aligned with torso
    width: 44,    // shoulder-to-shoulder (narrower, elegant)
    height: 26,   // shoulder to waist (~153–350)
    zIndex: 10,
  },
  bottoms: {
    top: 43,      // starts at waist (~350/800)
    left: 30,
    width: 40,
    height: 32,   // waist to below knee (~350–600)
    zIndex: 8,
  },
  outerwear: {
    top: 16,      // slightly above shoulders (collar)
    left: 24,     // wider than tops (sleeves)
    width: 52,
    height: 32,   // shoulder to hip (~128–380)
    zIndex: 12,   // on top of tops
  },
  shoes: {
    top: 82,      // ankle area (~660/800)
    left: 30,
    width: 40,
    height: 8,
    zIndex: 6,
  },
  accessories: {
    top: 4,       // head area for hats, scarves
    left: 32,
    width: 36,
    height: 14,
    zIndex: 14,   // always on top
  },
};

/**
 * Body-type adjustments — shifts anchors to account for different silhouettes.
 * Values are additive deltas applied on top of DEFAULT_ANCHORS.
 */
const BODY_TYPE_DELTAS: Partial<Record<BodyType, Partial<Record<OutfitCategory, Partial<AnchorPoint>>>>> = {
  slim: {
    tops:     { left: 30, width: 40 },
    bottoms:  { left: 32, width: 36 },
  },
  curvy: {
    tops:     { left: 26, width: 48 },
    bottoms:  { left: 27, width: 46, top: 42 },
  },
  athletic: {
    tops:     { left: 25, width: 50 },
    outerwear:{ left: 22, width: 56 },
  },
  relaxed: {
    tops:     { left: 26, width: 48 },
    bottoms:  { left: 28, width: 44 },
    outerwear:{ left: 22, width: 56 },
  },
};

/**
 * Height-bucket adjustments — shifts vertical positions.
 */
const HEIGHT_DELTAS: Partial<Record<HeightBucket, Partial<Record<OutfitCategory, Partial<AnchorPoint>>>>> = {
  petite: {
    tops:     { top: 20, height: 24 },
    bottoms:  { top: 44, height: 30 },
    shoes:    { top: 80 },
  },
  tall: {
    tops:     { top: 17, height: 28 },
    bottoms:  { top: 42, height: 34 },
    shoes:    { top: 84 },
  },
};

/**
 * Get the resolved anchor point for a given category + body configuration.
 */
export function getAnchorPoint(
  category: OutfitCategory,
  bodyType: BodyType = "regular",
  heightBucket: HeightBucket = "average"
): AnchorPoint {
  // Start with defaults
  const base = { ...DEFAULT_ANCHORS[category] };

  // Apply body-type deltas
  const btDelta = BODY_TYPE_DELTAS[bodyType]?.[category];
  if (btDelta) {
    Object.assign(base, btDelta);
  }

  // Apply height deltas
  const htDelta = HEIGHT_DELTAS[heightBucket]?.[category];
  if (htDelta) {
    Object.assign(base, htDelta);
  }

  return base;
}

/**
 * Convert an AnchorPoint to inline CSS styles (absolute positioning).
 */
export function anchorToStyle(anchor: AnchorPoint): React.CSSProperties {
  return {
    position: "absolute",
    top: `${anchor.top}%`,
    left: `${anchor.left}%`,
    width: `${anchor.width}%`,
    height: `${anchor.height}%`,
    zIndex: anchor.zIndex,
  };
}
