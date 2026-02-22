import type {
  AvatarBaseDef,
  AvatarGender,
  BodyType,
  HeightBucket,
} from "../../types/outfit-builder";
import { toHeightBucket } from "../../types/outfit-builder";
import { AVATAR_BASES } from "./bases";

/**
 * Select the best-matching avatar base for the given user inputs.
 * Exact match on (gender × bodyType × heightBucket).
 * Falls back to same gender+bodyType with "average" height, then first match.
 */
export function selectAvatarBase(
  gender: AvatarGender,
  bodyType: BodyType,
  heightCm: number
): AvatarBaseDef {
  const bucket = toHeightBucket(heightCm);

  // Exact match
  const exact = AVATAR_BASES.find(
    (b) =>
      b.gender === gender &&
      b.bodyType === bodyType &&
      b.heightBucket === bucket
  );
  if (exact) return exact;

  // Fallback: same gender + bodyType, average height
  const fallback = AVATAR_BASES.find(
    (b) =>
      b.gender === gender &&
      b.bodyType === bodyType &&
      b.heightBucket === "average"
  );
  if (fallback) return fallback;

  // Last resort: first base for gender
  const genderFallback = AVATAR_BASES.find((b) => b.gender === gender);
  if (genderFallback) return genderFallback;

  // Absolute fallback
  return AVATAR_BASES[0];
}

/**
 * Look up a base by its ID. Used when loading a saved AvatarProfile.
 */
export function getAvatarBaseById(id: string): AvatarBaseDef | undefined {
  return AVATAR_BASES.find((b) => b.id === id);
}
