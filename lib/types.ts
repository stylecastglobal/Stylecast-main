// lib/types.ts

/**
 * Represents the extracted color data from a user's face image
 */
export type ToneVector = {
  hueAvg: number; // Average hue (0-360)
  saturationAvg: number; // Average saturation (0-1)
  brightnessAvg: number; // Average brightness/lightness (0-1)
  contrastIndex: number; // Contrast between highlights and shadows (0-1)
  undertone: "warm" | "cool" | "neutral";
  depthScore: number; // 0 = light, 1 = deep
  softnessScore: number; // 0 = bright, 1 = soft
};

/**
 * Defines one of the 12 seasonal tone profiles
 */
export type SeasonToneProfile = {
  id: string;
  label: string;
  description: string;
  attributes: {
    undertone: "warm" | "cool" | "neutral";
    depth: "light" | "deep" | "medium";
    brightness: "bright" | "soft" | "medium";
  };
  // Acceptable ranges for matching
  hueRange: [number, number];
  saturationRange: [number, number];
  brightnessRange: [number, number];
  contrastRange: [number, number];
  // Color recommendations
  palette: {
    makeup: {
      lips: Array<{ hex: string; label: string }>;
      blush: Array<{ hex: string; label: string }>;
      contour: Array<{ hex: string; label: string }>;
      highlight: Array<{ hex: string; label: string }>;
      eyeshadow: Array<{ hex: string; label: string }>;
    };
    clothing: {
      tops: Array<{ hex: string; label: string }>;
      bottoms: Array<{ hex: string; label: string }>;
      outerwear: Array<{ hex: string; label: string }>;
    };
    avoid: Array<{ hex: string; label: string }>;
  };
  celebritiesWomen: string[];
  celebritiesMen: string[];
};

/**
 * The final analysis result shown to the user
 */
export type PersonalColorResult = {
  primaryTone: SeasonToneProfile;
  confidence: number; // 0-100
  seasonalBreakdown: Array<{
    season: "Spring" | "Summer" | "Autumn" | "Winter";
    percentage: number;
  }>;
  toneVector: ToneVector;
  uploadedImages: string[]; // Base64 or URLs
};

/**
 * Analysis step state
 */
export type AnalysisStep = "upload" | "processing" | "result";
