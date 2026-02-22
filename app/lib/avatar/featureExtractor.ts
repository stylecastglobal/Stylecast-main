import type { ExtractedFeatures } from "../../types/outfit-builder";
import { rgbToHex } from "../color-analysis/colorScience";
import {
  analyzeSkinTone,
  analyzeHairColor,
} from "../color-analysis/skinToneDetection";

/**
 * Extract skin tone and hair color from a selfie File.
 * Reuses the existing color-analysis pipeline — no AI involved.
 */
export async function extractFeaturesFromSelfie(
  selfieFile: File
): Promise<ExtractedFeatures> {
  const [skinResult, hairColor] = await Promise.all([
    analyzeSkinTone(selfieFile),
    analyzeHairColor(selfieFile),
  ]);

  return {
    skinTone: skinResult.dominantSkinColor,
    skinToneHex: skinResult.dominantSkinHex,
    hairColor,
    hairColorHex: rgbToHex(hairColor),
  };
}
