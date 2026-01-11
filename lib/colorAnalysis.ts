// lib/colorAnalysis.ts
import { ToneVector, SeasonToneProfile, PersonalColorResult } from "./types";
import { TONE_PROFILES } from "./toneProfiles";

/**
 * Simulated color analysis function
 * In production, this would use actual image processing (MediaPipe, TensorFlow.js, etc.)
 * For now, it returns a realistic mock result based on the image
 */
export async function analyzePersonalColor(
  images: string[]
): Promise<PersonalColorResult> {
  // Simulate processing time (3-5 seconds as per PRD)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Extract color data from image
  // In production: use face detection, skin segmentation, HSV analysis
  const toneVector = await extractToneVector(images[0]);

  // Find best matching tone profile
  const matchResults = TONE_PROFILES.map((profile) => ({
    profile,
    score: calculateMatchScore(toneVector, profile),
  }));

  // Sort by score (highest first)
  matchResults.sort((a, b) => b.score - a.score);

  const primaryMatch = matchResults[0];
  const confidence = Math.round(primaryMatch.score * 100);

  // Calculate seasonal breakdown
  const seasonalBreakdown = calculateSeasonalBreakdown(matchResults);

  return {
    primaryTone: primaryMatch.profile,
    confidence,
    seasonalBreakdown,
    toneVector,
    uploadedImages: images,
  };
}

/**
 * Extract tone vector from image
 * This is a MOCK implementation
 * In production: Use canvas API + HSV conversion + face detection
 */
async function extractToneVector(imageBase64: string): Promise<ToneVector> {
  // MOCK: Generate somewhat realistic values
  // In production: Actually analyze the image pixels

  // For demo purposes, generate random but coherent values
  const isWarm = Math.random() > 0.5;
  const isLight = Math.random() > 0.4;
  const isBright = Math.random() > 0.5;

  return {
    hueAvg: isWarm ? 20 + Math.random() * 30 : 200 + Math.random() * 40,
    saturationAvg: isBright ? 0.5 + Math.random() * 0.3 : 0.2 + Math.random() * 0.3,
    brightnessAvg: isLight ? 0.6 + Math.random() * 0.25 : 0.3 + Math.random() * 0.3,
    contrastIndex: isBright ? 0.5 + Math.random() * 0.3 : 0.2 + Math.random() * 0.3,
    undertone: isWarm ? "warm" : "cool",
    depthScore: isLight ? 0.2 + Math.random() * 0.3 : 0.6 + Math.random() * 0.3,
    softnessScore: isBright ? 0.1 + Math.random() * 0.3 : 0.5 + Math.random() * 0.4,
  };
}

/**
 * Calculate match score between user's tone vector and a profile
 * Higher score = better match
 */
function calculateMatchScore(
  vector: ToneVector,
  profile: SeasonToneProfile
): number {
  let score = 0;

  // 1. Hue match (30% weight)
  const hueInRange =
    vector.hueAvg >= profile.hueRange[0] &&
    vector.hueAvg <= profile.hueRange[1];
  if (hueInRange) {
    score += 0.3;
  } else {
    // Partial credit for being close
    const hueMidpoint =
      (profile.hueRange[0] + profile.hueRange[1]) / 2;
    const hueDistance = Math.abs(vector.hueAvg - hueMidpoint);
    score += Math.max(0, 0.3 - hueDistance / 360);
  }

  // 2. Saturation match (25% weight)
  const satInRange =
    vector.saturationAvg >= profile.saturationRange[0] &&
    vector.saturationAvg <= profile.saturationRange[1];
  if (satInRange) {
    score += 0.25;
  } else {
    const satMidpoint =
      (profile.saturationRange[0] + profile.saturationRange[1]) / 2;
    const satDistance = Math.abs(vector.saturationAvg - satMidpoint);
    score += Math.max(0, 0.25 - satDistance);
  }

  // 3. Brightness match (25% weight)
  const brightInRange =
    vector.brightnessAvg >= profile.brightnessRange[0] &&
    vector.brightnessAvg <= profile.brightnessRange[1];
  if (brightInRange) {
    score += 0.25;
  } else {
    const brightMidpoint =
      (profile.brightnessRange[0] + profile.brightnessRange[1]) / 2;
    const brightDistance = Math.abs(vector.brightnessAvg - brightMidpoint);
    score += Math.max(0, 0.25 - brightDistance);
  }

  // 4. Undertone match (20% weight)
  if (vector.undertone === profile.attributes.undertone) {
    score += 0.2;
  } else if (vector.undertone === "neutral") {
    score += 0.1; // Neutral can match any undertone partially
  }

  return score;
}

/**
 * Calculate seasonal breakdown (e.g., 70% Summer, 30% Spring)
 */
function calculateSeasonalBreakdown(
  matchResults: Array<{ profile: SeasonToneProfile; score: number }>
): Array<{ season: "Spring" | "Summer" | "Autumn" | "Winter"; percentage: number }> {
  const seasonScores: Record<string, number> = {
    Spring: 0,
    Summer: 0,
    Autumn: 0,
    Winter: 0,
  };

  // Map profile IDs to seasons
  const profileToSeason: Record<string, string> = {
    "bright-spring": "Spring",
    "warm-spring": "Spring",
    "light-spring": "Spring",
    "light-summer": "Summer",
    "cool-summer": "Summer",
    "soft-summer": "Summer",
    "soft-autumn": "Autumn",
    "warm-autumn": "Autumn",
    "deep-autumn": "Autumn",
    "bright-winter": "Winter",
    "cool-winter": "Winter",
    "deep-winter": "Winter",
  };

  // Aggregate scores by season
  matchResults.forEach(({ profile, score }) => {
    const season = profileToSeason[profile.id];
    if (season) {
      seasonScores[season] += score;
    }
  });

  // Convert to percentages
  const total = Object.values(seasonScores).reduce((sum, val) => sum + val, 0);
  const breakdown = Object.entries(seasonScores)
    .map(([season, score]) => ({
      season: season as "Spring" | "Summer" | "Autumn" | "Winter",
      percentage: Math.round((score / total) * 100),
    }))
    .filter((item) => item.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage);

  return breakdown;
}

/**
 * Validate uploaded image
 * Returns error message if invalid, null if valid
 */
export function validateImage(file: File): string | null {
  // Check file type
  if (!file.type.startsWith("image/")) {
    return "Please upload a valid image file (JPG, PNG, etc.)";
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return "Image must be smaller than 10MB";
  }

  // Check dimensions (will be done after loading)
  return null;
}

/**
 * Convert File to base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
