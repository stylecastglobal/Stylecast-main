// Improved Skin Tone Detection from Image
// More accurate extraction with better sampling

import {
  RGBColor,
  isSkinTone,
  averageColor,
  rgbToHex,
} from './colorScience';

export interface SkinAnalysisResult {
  dominantSkinColor: RGBColor;
  dominantSkinHex: string;
  skinPixels: number;
  totalPixels: number;
  faceDetected: boolean;
  confidence: number; // 0-1
}

/**
 * Extract skin tone from uploaded image - IMPROVED VERSION
 * Uses multiple sampling regions and better filtering
 */
export async function analyzeSkinTone(
  imageFile: File
): Promise<SkinAnalysisResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      try {
        // Set canvas size - limit max size for performance
        const maxSize = 800;
        let width = img.width;
        let height = img.height;

        if (width > maxSize || height > maxSize) {
          const scale = maxSize / Math.max(width, height);
          width = Math.floor(width * scale);
          height = Math.floor(height * scale);
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image
        ctx.drawImage(img, 0, 0, width, height);

        // Sample multiple face regions for better accuracy
        const regions = getFaceRegions(width, height);
        const allSkinColors: RGBColor[] = [];
        let totalSampled = 0;

        // Sample each region
        regions.forEach((region) => {
          const imageData = ctx.getImageData(
            region.x,
            region.y,
            region.width,
            region.height
          );

          const skinColors = extractSkinColors(imageData);
          allSkinColors.push(...skinColors);
          totalSampled += Math.floor((region.width * region.height) / 16); // Account for sampling rate
        });

        // Calculate dominant skin color with outlier removal
        const dominantSkinColor = allSkinColors.length > 0
          ? calculateDominantColor(allSkinColors)
          : { r: 200, g: 150, b: 120 }; // Default medium skin tone

        const skinPixels = allSkinColors.length;
        const skinPercentage = totalSampled > 0 ? skinPixels / totalSampled : 0;

        // More lenient face detection - at least 10% skin pixels
        const faceDetected = skinPercentage > 0.1 && skinPixels > 50;
        const confidence = Math.min(1, skinPercentage * 2.5);

        resolve({
          dominantSkinColor,
          dominantSkinHex: rgbToHex(dominantSkinColor),
          skinPixels,
          totalPixels: totalSampled,
          faceDetected,
          confidence,
        });
      } catch (error) {
        reject(error);
      } finally {
        // Clean up
        URL.revokeObjectURL(img.src);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(imageFile);
  });
}

/**
 * Get multiple regions to sample for better accuracy
 * Samples center, cheeks, and forehead areas
 */
function getFaceRegions(
  width: number,
  height: number
): Array<{ x: number; y: number; width: number; height: number }> {
  const regions = [];

  // Main center region (larger)
  const centerWidth = Math.floor(width * 0.5);
  const centerHeight = Math.floor(height * 0.5);
  const centerX = Math.floor((width - centerWidth) / 2);
  const centerY = Math.floor(height * 0.3);
  
  regions.push({
    x: centerX,
    y: centerY,
    width: centerWidth,
    height: centerHeight,
  });

  // Left cheek region
  const cheekSize = Math.floor(width * 0.15);
  regions.push({
    x: Math.floor(width * 0.25),
    y: Math.floor(height * 0.45),
    width: cheekSize,
    height: cheekSize,
  });

  // Right cheek region
  regions.push({
    x: Math.floor(width * 0.6),
    y: Math.floor(height * 0.45),
    width: cheekSize,
    height: cheekSize,
  });

  // Forehead region
  regions.push({
    x: Math.floor(width * 0.35),
    y: Math.floor(height * 0.25),
    width: Math.floor(width * 0.3),
    height: Math.floor(height * 0.15),
  });

  return regions;
}

/**
 * Extract skin colors from image data with improved filtering
 */
function extractSkinColors(imageData: ImageData): RGBColor[] {
  const data = imageData.data;
  const skinColors: RGBColor[] = [];

  // Sample every 4th pixel for performance
  const step = 4;

  for (let i = 0; i < data.length; i += 4 * step) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Skip transparent pixels
    if (a < 200) continue;

    const rgb: RGBColor = { r, g, b };

    // More sophisticated skin tone detection
    if (isLikelySkinTone(rgb)) {
      skinColors.push(rgb);
    }
  }

  return skinColors;
}

/**
 * Improved skin tone detection
 * Based on multiple research papers on skin tone detection
 */
function isLikelySkinTone(rgb: RGBColor): boolean {
  const { r, g, b } = rgb;

  // Rule 1: Basic RGB hierarchy (skin typically has R > G > B)
  if (!(r > g && g > b)) {
    // Allow some tolerance
    if (!(r > g && g >= b - 10)) {
      return false;
    }
  }

  // Rule 2: R-G and R-B differences
  const rgDiff = r - g;
  const rbDiff = r - b;
  
  if (rgDiff < 10 || rbDiff < 10) {
    return false;
  }

  // Rule 3: Expanded skin tone ranges for diversity
  // Covers very light to very deep skin tones
  const rInRange = r >= 70 && r <= 255;
  const gInRange = g >= 30 && g <= 230;
  const bInRange = b >= 15 && b <= 220;

  if (!rInRange || !gInRange || !bInRange) {
    return false;
  }

  // Rule 4: Avoid very saturated colors (likely clothing/background)
  const maxChannel = Math.max(r, g, b);
  const minChannel = Math.min(r, g, b);
  const saturation = maxChannel - minChannel;
  
  if (saturation > 120) {
    return false;
  }

  // Rule 5: Normalized RGB check
  const sum = r + g + b;
  if (sum === 0) return false;
  
  const rNorm = r / sum;
  const gNorm = g / sum;
  
  // Skin tones typically have these normalized values
  if (rNorm < 0.35 || rNorm > 0.55) {
    return false;
  }
  
  if (gNorm < 0.25 || gNorm > 0.45) {
    return false;
  }

  return true;
}

/**
 * Calculate dominant color with outlier removal
 * Uses median-based approach to remove extreme values
 */
function calculateDominantColor(colors: RGBColor[]): RGBColor {
  if (colors.length === 0) {
    return { r: 200, g: 150, b: 120 };
  }

  // Sort each channel
  const reds = colors.map((c) => c.r).sort((a, b) => a - b);
  const greens = colors.map((c) => c.g).sort((a, b) => a - b);
  const blues = colors.map((c) => c.b).sort((a, b) => a - b);

  // Remove outliers (top and bottom 10%)
  const trimPercent = 0.1;
  const trimAmount = Math.floor(colors.length * trimPercent);
  
  const trimmedReds = reds.slice(trimAmount, -trimAmount || undefined);
  const trimmedGreens = greens.slice(trimAmount, -trimAmount || undefined);
  const trimmedBlues = blues.slice(trimAmount, -trimAmount || undefined);

  // Calculate median of trimmed values
  const medianR = trimmedReds[Math.floor(trimmedReds.length / 2)];
  const medianG = trimmedGreens[Math.floor(trimmedGreens.length / 2)];
  const medianB = trimmedBlues[Math.floor(trimmedBlues.length / 2)];

  return {
    r: Math.round(medianR),
    g: Math.round(medianG),
    b: Math.round(medianB),
  };
}

/**
 * Analyze hair color from image - IMPROVED
 */
export async function analyzeHairColor(imageFile: File): Promise<RGBColor> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      try {
        // Resize for performance
        const maxSize = 600;
        let width = img.width;
        let height = img.height;

        if (width > maxSize || height > maxSize) {
          const scale = maxSize / Math.max(width, height);
          width = Math.floor(width * scale);
          height = Math.floor(height * scale);
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Sample top region (hair area)
        const hairHeight = Math.floor(height * 0.25);
        const hairRegion = ctx.getImageData(
          Math.floor(width * 0.25),
          Math.floor(height * 0.1),
          Math.floor(width * 0.5),
          hairHeight
        );

        const hairColor = extractHairColor(hairRegion);
        resolve(hairColor);
      } catch (error) {
        reject(error);
      } finally {
        URL.revokeObjectURL(img.src);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(imageFile);
  });
}

/**
 * Extract hair color - looks for darker, non-skin pixels
 */
function extractHairColor(imageData: ImageData): RGBColor {
  const data = imageData.data;
  const darkColors: RGBColor[] = [];

  for (let i = 0; i < data.length; i += 12) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a < 200) continue;

    const rgb: RGBColor = { r, g, b };
    const brightness = (r + g + b) / 3;

    // Look for darker pixels that aren't skin tone
    if (brightness < 130 && !isLikelySkinTone(rgb)) {
      darkColors.push(rgb);
    }
  }

  if (darkColors.length > 20) {
    return calculateDominantColor(darkColors);
  }

  // Default to dark brown if no hair detected
  return { r: 60, g: 40, b: 30 };
}

/**
 * Provide feedback on image quality
 */
export function assessImageQuality(result: SkinAnalysisResult): {
  isGoodQuality: boolean;
  suggestions: string[];
} {
  const suggestions: string[] = [];

  if (!result.faceDetected) {
    suggestions.push('Make sure your face is clearly visible in the photo');
    suggestions.push('Use good lighting - natural light works best');
  }

  if (result.confidence < 0.3) {
    suggestions.push('Try taking the photo in better lighting');
    suggestions.push('Ensure your face fills more of the frame');
  }

  if (result.skinPixels < 50) {
    suggestions.push('Move closer to the camera');
    suggestions.push('Make sure your face is centered');
  }

  const isGoodQuality = result.faceDetected && result.confidence > 0.25;

  return { isGoodQuality, suggestions };
}