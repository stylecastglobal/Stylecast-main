// Color Science Utilities for Personal Color Analysis
// Handles RGB to LAB conversion and color calculations

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface LABColor {
  l: number;
  a: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

/**
 * Convert RGB to XYZ color space (intermediate step for LAB)
 */
function rgbToXyz(rgb: RGBColor): { x: number; y: number; z: number } {
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  // Apply gamma correction
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  r *= 100;
  g *= 100;
  b *= 100;

  // Observer = 2°, Illuminant = D65
  const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
  const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;

  return { x, y, z };
}

/**
 * Convert XYZ to LAB color space
 */
function xyzToLab(xyz: { x: number; y: number; z: number }): LABColor {
  // Reference white point D65
  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;

  let x = xyz.x / refX;
  let y = xyz.y / refY;
  let z = xyz.z / refZ;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);

  return { l, a, b };
}

/**
 * Convert RGB to LAB color space
 * LAB is better for skin tone analysis than RGB
 */
export function rgbToLab(rgb: RGBColor): LABColor {
  const xyz = rgbToXyz(rgb);
  return xyzToLab(xyz);
}

/**
 * Convert RGB to HSL color space
 */
export function rgbToHsl(rgb: RGBColor): HSLColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / diff + 2) / 6;
        break;
      case b:
        h = ((r - g) / diff + 4) / 6;
        break;
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

/**
 * Calculate color temperature (warm vs cool)
 * Returns value between -1 (cool) and 1 (warm)
 */
export function calculateTemperature(rgb: RGBColor): number {
  const lab = rgbToLab(rgb);
  // 'b' value in LAB: negative = cool (blue), positive = warm (yellow)
  // Normalize to -1 to 1 range
  return Math.max(-1, Math.min(1, lab.b / 50));
}

/**
 * Calculate undertone from skin color
 * Returns: 'warm', 'cool', or 'neutral'
 */
export function detectUndertone(rgb: RGBColor): 'warm' | 'cool' | 'neutral' {
  const lab = rgbToLab(rgb);
  const hsl = rgbToHsl(rgb);

  // 'b' value in LAB indicates blue (negative) vs yellow (positive)
  const yellowBlueBalance = lab.b;
  
  // 'a' value in LAB indicates green (negative) vs red (positive)
  const redGreenBalance = lab.a;

  // Hue helps determine undertone
  const hue = hsl.h;

  // Complex undertone detection
  if (yellowBlueBalance > 15 && redGreenBalance > 10) {
    return 'warm'; // Yellow/golden undertones
  } else if (yellowBlueBalance < -5 || (hue > 300 || hue < 30)) {
    return 'cool'; // Pink/blue undertones
  } else {
    return 'neutral'; // Balanced undertones
  }
}

/**
 * Calculate brightness/lightness level
 * Returns: 'light', 'medium', or 'deep'
 */
export function detectBrightness(rgb: RGBColor): 'light' | 'medium' | 'deep' {
  const lab = rgbToLab(rgb);
  const l = lab.l;

  if (l > 70) return 'light';
  if (l > 45) return 'medium';
  return 'deep';
}

/**
 * Calculate color saturation level
 * Returns value between 0 (muted) and 1 (vibrant)
 */
export function calculateSaturation(rgb: RGBColor): number {
  const hsl = rgbToHsl(rgb);
  return hsl.s / 100;
}

/**
 * Calculate contrast between two colors
 * Used for determining contrast level between skin, hair, eyes
 */
export function calculateContrast(color1: RGBColor, color2: RGBColor): number {
  const lab1 = rgbToLab(color1);
  const lab2 = rgbToLab(color2);

  // Calculate Delta E (color difference)
  const deltaL = lab1.l - lab2.l;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;

  const deltaE = Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);

  // Normalize to 0-1 range (typical skin-to-hair contrast is 0-100)
  return Math.min(1, deltaE / 100);
}

/**
 * Determine contrast level category
 */
export function detectContrastLevel(contrast: number): 'low' | 'medium' | 'high' {
  if (contrast < 0.3) return 'low';
  if (contrast < 0.6) return 'medium';
  return 'high';
}

/**
 * Calculate average color from an array of RGB values
 */
export function averageColor(colors: RGBColor[]): RGBColor {
  if (colors.length === 0) {
    return { r: 0, g: 0, b: 0 };
  }

  const sum = colors.reduce(
    (acc, color) => ({
      r: acc.r + color.r,
      g: acc.g + color.g,
      b: acc.b + color.b,
    }),
    { r: 0, g: 0, b: 0 }
  );

  return {
    r: Math.round(sum.r / colors.length),
    g: Math.round(sum.g / colors.length),
    b: Math.round(sum.b / colors.length),
  };
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(rgb: RGBColor): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * Check if a color is likely skin tone
 * Uses ranges based on research of human skin tone RGB values
 */
export function isSkinTone(rgb: RGBColor): boolean {
  const { r, g, b } = rgb;

  // Basic skin tone detection
  // Skin typically has: R > G > B, and specific ranges
  if (r < g || g < b) return false;

  // Check if within typical skin tone ranges
  const rInRange = r >= 95 && r <= 255;
  const gInRange = g >= 40 && g <= 220;
  const bInRange = b >= 20 && b <= 200;

  if (!rInRange || !gInRange || !bInRange) return false;

  // Additional check: RGB differences
  const rgDiff = r - g;
  const rbDiff = r - b;

  return rgDiff >= 15 && rbDiff >= 15;
}