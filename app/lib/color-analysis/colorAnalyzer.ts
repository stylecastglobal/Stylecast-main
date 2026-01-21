// Highly Accurate Color Analysis Algorithm
// Based on actual visual references of 12 seasonal color types

import {
  analyzeSkinTone,
  analyzeHairColor,
  SkinAnalysisResult,
} from './skinToneDetection';
import {
  RGBColor,
  rgbToLab,
  rgbToHex,
  rgbToHsl,
} from './colorScience';
import {
  SeasonType,
  getSeasonalProfile,
  SeasonalProfile,
} from './seasonalProfiles';

export interface ColorAnalysisResult {
  season: SeasonType;
  profile: SeasonalProfile;
  confidence: number;

  characteristics: {
    undertone: 'warm' | 'cool' | 'neutral';
    brightness: 'light' | 'medium' | 'deep';
    saturation: 'muted' | 'moderate' | 'vibrant';
    contrast: 'low' | 'medium' | 'high';
  };

  measurements: {
    skinColor: RGBColor;
    skinColorHex: string;
    hairColor: RGBColor;
    hairColorHex: string;
    skinTone: number;
    undertoneValue: number;
    saturationValue: number;
    contrastValue: number;
  };

  imageQuality: {
    faceDetected: boolean;
    confidence: number;
    suggestions: string[];
  };
}

/**
 * Main analysis function - Ultra accurate version
 */
export async function analyzePersonalColor(
  imageFile: File
): Promise<ColorAnalysisResult> {
  try {
    const skinAnalysis = await analyzeSkinTone(imageFile);

    if (!skinAnalysis.faceDetected) {
      throw new Error(
        'Could not detect a face in the image. Please upload a clear selfie with your face visible.'
      );
    }

    const hairColor = await analyzeHairColor(imageFile);
    const skinColor = skinAnalysis.dominantSkinColor;

    // Get color measurements
    const skinLab = rgbToLab(skinColor);
    const skinHsl = rgbToHsl(skinColor);
    const hairLab = rgbToLab(hairColor);
    const hairHsl = rgbToHsl(hairColor);

    // Analyze characteristics
    const undertone = analyzeUndertone(skinColor, skinLab, skinHsl);
    const brightness = analyzeBrightness(skinLab, hairLab);
    const saturation = analyzeSaturation(skinHsl, skinLab);
    const contrast = analyzeContrast(skinLab, hairLab, skinHsl, hairHsl);

    // Find best season
    const season = findSeasonMatch(
      undertone,
      brightness,
      saturation,
      contrast,
      skinLab,
      hairLab,
      skinHsl,
      hairHsl
    );

    const profile = getSeasonalProfile(season);
    const confidence = calculateConfidence(skinAnalysis, undertone);

    return {
      season,
      profile,
      confidence,
      characteristics: {
        undertone,
        brightness,
        saturation,
        contrast,
      },
      measurements: {
        skinColor,
        skinColorHex: skinAnalysis.dominantSkinHex,
        hairColor,
        hairColorHex: rgbToHex(hairColor),
        skinTone: skinLab.l,
        undertoneValue: skinLab.b,
        saturationValue: skinHsl.s / 100,
        contrastValue: Math.abs(skinLab.l - hairLab.l) / 100,
      },
      imageQuality: {
        faceDetected: skinAnalysis.faceDetected,
        confidence: skinAnalysis.confidence,
        suggestions: [],
      },
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Analyze undertone - warm/cool/neutral
 */
function analyzeUndertone(
  rgb: RGBColor,
  lab: { l: number; a: number; b: number },
  hsl: { h: number; s: number; l: number }
): 'warm' | 'cool' | 'neutral' {
  // LAB b value is the key indicator
  // Positive = yellow (warm), Negative = blue (cool)
  const yellowBlue = lab.b;
  
  // Additional hue check
  const hue = hsl.h;
  
  // Warm: yellow undertones (b > 12)
  if (yellowBlue > 12) {
    // Extra warm if hue is in yellow-orange range
    if (hue >= 30 && hue <= 60) {
      return 'warm';
    }
    return 'warm';
  }
  
  // Cool: pink/blue undertones (b < 8)
  if (yellowBlue < 8) {
    // Extra cool if hue is in pink-red range
    if (hue < 20 || hue > 330) {
      return 'cool';
    }
    return 'cool';
  }
  
  // Neutral: in between
  return 'neutral';
}

/**
 * Analyze brightness level
 */
function analyzeBrightness(
  skinLab: { l: number; a: number; b: number },
  hairLab: { l: number; a: number; b: number }
): 'light' | 'medium' | 'deep' {
  const skinL = skinLab.l;
  const hairL = hairLab.l;
  
  // Light: very light skin (L > 70)
  // Light Summer, Light Spring have L > 70
  if (skinL > 70) {
    return 'light';
  }
  
  // Deep: darker skin OR very dark hair creating depth
  // Deep Winter, Deep Autumn have L < 55 or very dark hair
  if (skinL < 55 || hairL < 25) {
    return 'deep';
  }
  
  // Medium: everything else
  return 'medium';
}

/**
 * Analyze saturation/clarity
 */
function analyzeSaturation(
  skinHsl: { h: number; s: number; l: number },
  skinLab: { l: number; a: number; b: number }
): 'muted' | 'moderate' | 'vibrant' {
  const s = skinHsl.s;
  
  // Calculate chroma (color intensity) from LAB
  const chroma = Math.sqrt(skinLab.a * skinLab.a + skinLab.b * skinLab.b);
  
  // Muted/Soft: low saturation, soft colors
  // Soft Summer, Soft Autumn
  if (s < 20 || chroma < 25) {
    return 'muted';
  }
  
  // Vibrant/Clear/Bright: high saturation, vivid colors
  // Clear/Bright Winter, Clear Spring, Warm Spring
  if (s > 35 || chroma > 40) {
    return 'vibrant';
  }
  
  // Moderate: in between
  return 'moderate';
}

/**
 * Analyze contrast between skin and hair
 */
function analyzeContrast(
  skinLab: { l: number; a: number; b: number },
  hairLab: { l: number; a: number; b: number },
  skinHsl: { h: number; s: number; l: number },
  hairHsl: { h: number; s: number; l: number }
): 'low' | 'medium' | 'high' {
  // Lightness difference is main factor
  const lightnessDiff = Math.abs(skinLab.l - hairLab.l);
  
  // High contrast: big difference (>45)
  // Deep Winter (light skin, dark hair), Clear Winter, Bright Winter
  if (lightnessDiff > 45) {
    return 'high';
  }
  
  // Low contrast: small difference (<25)
  // Soft Summer, Soft Autumn, Light Summer
  if (lightnessDiff < 25) {
    return 'low';
  }
  
  // Medium: in between
  return 'medium';
}

/**
 * Find best season match using comprehensive scoring
 */
function findSeasonMatch(
  undertone: 'warm' | 'cool' | 'neutral',
  brightness: 'light' | 'medium' | 'deep',
  saturation: 'muted' | 'moderate' | 'vibrant',
  contrast: 'low' | 'medium' | 'high',
  skinLab: { l: number; a: number; b: number },
  hairLab: { l: number; a: number; b: number },
  skinHsl: { h: number; s: number; l: number },
  hairHsl: { h: number; s: number; l: number }
): SeasonType {
  const scores: Partial<Record<SeasonType, number>> = {};
  
  const skinL = skinLab.l;
  const hairL = hairLab.l;
  const yellowBlue = skinLab.b;
  const contrastValue = Math.abs(skinL - hairL);
  
  // SPRING SEASONS (Warm undertone)
  if (undertone === 'warm' || undertone === 'neutral') {
    // Light Spring: light, warm, moderate saturation, low-medium contrast
    scores['Light Spring'] = 0;
    if (brightness === 'light') scores['Light Spring'] += 4;
    if (skinL > 68) scores['Light Spring'] += 3;
    if (yellowBlue > 15) scores['Light Spring'] += 2;
    if (saturation === 'moderate') scores['Light Spring'] += 2;
    if (contrast === 'low' || contrast === 'medium') scores['Light Spring'] += 2;
    
    // Warm Spring: warm, bright/vibrant, medium brightness
    scores['Warm Spring'] = 0;
    if (yellowBlue > 18) scores['Warm Spring'] += 5; // Very warm
    if (saturation === 'vibrant') scores['Warm Spring'] += 3;
    if (brightness === 'medium' || brightness === 'light') scores['Warm Spring'] += 2;
    if (contrast === 'medium') scores['Warm Spring'] += 2;
    
    // Clear Spring: warm, high contrast, vibrant
    scores['Clear Spring'] = 0;
    if (contrast === 'high') scores['Clear Spring'] += 4;
    if (saturation === 'vibrant') scores['Clear Spring'] += 3;
    if (yellowBlue > 12) scores['Clear Spring'] += 2;
    if (brightness === 'medium') scores['Clear Spring'] += 2;
  }
  
  // SUMMER SEASONS (Cool undertone)
  if (undertone === 'cool' || undertone === 'neutral') {
    // Light Summer: light, cool, muted/soft, low contrast
    scores['Light Summer'] = 0;
    if (brightness === 'light') scores['Light Summer'] += 4;
    if (skinL > 72) scores['Light Summer'] += 3;
    if (yellowBlue < 10) scores['Light Summer'] += 3; // Cool
    if (saturation === 'muted') scores['Light Summer'] += 3;
    if (contrast === 'low') scores['Light Summer'] += 3;
    if (hairL > 40) scores['Light Summer'] += 2; // Light hair
    
    // Cool Summer: cool, muted, medium brightness, low contrast
    scores['Cool Summer'] = 0;
    if (yellowBlue < 5) scores['Cool Summer'] += 5; // Very cool
    if (saturation === 'muted') scores['Cool Summer'] += 3;
    if (brightness === 'medium') scores['Cool Summer'] += 2;
    if (contrast === 'low' || contrast === 'medium') scores['Cool Summer'] += 2;
    
    // Soft Summer: cool-neutral, muted, low contrast
    scores['Soft Summer'] = 0;
    if (saturation === 'muted') scores['Soft Summer'] += 4;
    if (contrast === 'low') scores['Soft Summer'] += 4;
    if (yellowBlue >= 8 && yellowBlue <= 12) scores['Soft Summer'] += 2; // Neutral
    if (brightness === 'medium') scores['Soft Summer'] += 2;
  }
  
  // AUTUMN SEASONS (Warm undertone)
  if (undertone === 'warm' || undertone === 'neutral') {
    // Soft Autumn: warm-neutral, muted, low contrast
    scores['Soft Autumn'] = 0;
    if (saturation === 'muted') scores['Soft Autumn'] += 4;
    if (contrast === 'low') scores['Soft Autumn'] += 4;
    if (yellowBlue >= 10 && yellowBlue <= 16) scores['Soft Autumn'] += 3;
    if (brightness === 'medium') scores['Soft Autumn'] += 2;
    
    // Warm Autumn: warm, rich, medium-deep
    scores['Warm Autumn'] = 0;
    if (yellowBlue > 16) scores['Warm Autumn'] += 5; // Warm
    if (brightness === 'medium' || brightness === 'deep') scores['Warm Autumn'] += 3;
    if (saturation === 'moderate' || saturation === 'vibrant') scores['Warm Autumn'] += 2;
    if (contrast === 'medium') scores['Warm Autumn'] += 2;
    
    // Deep Autumn: warm, deep, high contrast
    scores['Deep Autumn'] = 0;
    if (brightness === 'deep') scores['Deep Autumn'] += 4;
    if (skinL < 58) scores['Deep Autumn'] += 3;
    if (yellowBlue > 12) scores['Deep Autumn'] += 3;
    if (contrast === 'high' || contrast === 'medium') scores['Deep Autumn'] += 3;
    if (hairL < 30) scores['Deep Autumn'] += 2; // Dark hair
  }
  
  // WINTER SEASONS (Cool undertone)
  if (undertone === 'cool' || undertone === 'neutral') {
    // Deep Winter: cool, deep, high contrast, dark hair
    scores['Deep Winter'] = 0;
    if (contrast === 'high') scores['Deep Winter'] += 5;
    if (contrastValue > 50) scores['Deep Winter'] += 3;
    if (yellowBlue < 10) scores['Deep Winter'] += 3;
    if (brightness === 'deep' || brightness === 'medium') scores['Deep Winter'] += 3;
    if (hairL < 25) scores['Deep Winter'] += 3; // Very dark hair
    
    // Cool Winter: cool, vivid, high contrast
    scores['Cool Winter'] = 0;
    if (yellowBlue < 5) scores['Cool Winter'] += 5; // Very cool
    if (saturation === 'vibrant') scores['Cool Winter'] += 3;
    if (contrast === 'high' || contrast === 'medium') scores['Cool Winter'] += 3;
    if (brightness === 'medium') scores['Cool Winter'] += 2;
    
    // Clear/Bright Winter: cool, very high contrast, vivid
    scores['Clear Winter'] = 0;
    if (contrast === 'high') scores['Clear Winter'] += 5;
    if (contrastValue > 55) scores['Clear Winter'] += 3;
    if (saturation === 'vibrant') scores['Clear Winter'] += 3;
    if (yellowBlue < 8) scores['Clear Winter'] += 2;
    if (hairL < 20) scores['Clear Winter'] += 2; // Very dark hair
  }
  
  // Find highest score
  let bestSeason: SeasonType = 'Soft Autumn';
  let highestScore = 0;
  
  for (const [season, score] of Object.entries(scores)) {
    if (score && score > highestScore) {
      highestScore = score;
      bestSeason = season as SeasonType;
    }
  }
  
  return bestSeason;
}

function calculateConfidence(
  skinAnalysis: SkinAnalysisResult,
  undertone: string
): number {
  let confidence = skinAnalysis.confidence;
  if (undertone !== 'neutral') confidence += 0.15;
  return Math.min(1.0, confidence);
}

export async function analyzeBatchImages(
  images: File[]
): Promise<ColorAnalysisResult> {
  if (images.length === 0) throw new Error('No images provided');
  if (images.length === 1) return analyzePersonalColor(images[0]);
  
  const results = await Promise.all(images.map((img) => analyzePersonalColor(img)));
  const goodResults = results.filter((r) => r.confidence > 0.3);
  
  if (goodResults.length === 0) {
    throw new Error('Could not get reliable results from any image');
  }
  
  return goodResults.reduce((best, current) =>
    current.confidence > best.confidence ? current : best
  );
}

export function getSimilarSeasons(result: ColorAnalysisResult): SeasonType[] {
  const { undertone, brightness, saturation, contrast } = result.characteristics;
  const similar: SeasonType[] = [];
  
  const allSeasons: SeasonType[] = [
    'Light Spring', 'Warm Spring', 'Clear Spring',
    'Light Summer', 'Cool Summer', 'Soft Summer',
    'Soft Autumn', 'Warm Autumn', 'Deep Autumn',
    'Deep Winter', 'Cool Winter', 'Clear Winter',
  ];
  
  for (const season of allSeasons) {
    if (season === result.season) continue;
    const profile = getSeasonalProfile(season);
    const chars = profile.characteristics;
    
    let matches = 0;
    if (chars.undertone === undertone) matches++;
    if (chars.brightness === brightness) matches++;
    if (chars.saturation === saturation) matches++;
    if (chars.contrast === contrast) matches++;
    
    if (matches >= 2) similar.push(season);
  }
  
  return similar;
}

export function generateRecommendations(result: ColorAnalysisResult): {
  clothing: string[];
  makeup: string[];
  styling: string[];
  shopping: string[];
} {
  const profile = result.profile;
  
  return {
    clothing: [
      `Stick to ${profile.clothingColors.neutrals.join(', ')} for your base wardrobe`,
      `Add pops of color with ${profile.clothingColors.accents.slice(0, 3).join(', ')}`,
      `Wear ${profile.metals} jewelry and accessories`,
      profile.characteristics.contrast === 'high'
        ? 'Try bold color combinations and patterns'
        : 'Opt for tonal dressing and subtle patterns',
    ],
    makeup: [
      `Lipstick: ${profile.makeupRecommendations.lipstick.slice(0, 3).join(', ')}`,
      `Blush: ${profile.makeupRecommendations.blush.slice(0, 2).join(' or ')}`,
      `Eyeshadow: ${profile.makeupRecommendations.eyeshadow.slice(0, 3).join(', ')}`,
      `Eyeliner: ${profile.makeupRecommendations.eyeliner.slice(0, 2).join(' or ')}`,
    ],
    styling: [
      profile.characteristics.undertone === 'warm'
        ? 'Choose warm-toned accessories and avoid cool silver'
        : 'Choose cool-toned accessories and avoid warm gold',
      profile.characteristics.brightness === 'light'
        ? 'Avoid colors that are too dark or heavy'
        : profile.characteristics.brightness === 'deep'
        ? 'Go for rich, deep colors - you can handle intensity'
        : 'You have flexibility with medium-depth colors',
      profile.characteristics.saturation === 'muted'
        ? 'Choose soft, muted tones over bright, saturated colors'
        : 'You can wear vibrant, saturated colors beautifully',
    ],
    shopping: [
      `Look for ${profile.season.toLowerCase()} color palettes when shopping`,
      `When in doubt, choose ${profile.clothingColors.neutrals[0].toLowerCase()}`,
      `Avoid ${profile.avoidColors.slice(0, 2).join(' and ')}`,
      `Your best bet for a statement piece: ${profile.clothingColors.accents[0].toLowerCase()}`,
    ],
  };
}