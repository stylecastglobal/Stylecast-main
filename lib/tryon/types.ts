export interface Shade {
  name: string;
  hex: string;
}

export interface ProductContext {
  brand: string;
  name: string;
  category: string;
  finish: string;
  texture: string;
  shades: Shade[];
}

export interface FaceZoneMask {
  zone: 'lips' | 'cheeks' | 'eyelids' | 'cheekbones';
  points: { x: number; y: number }[];
}

export type Undertone = 'Warm' | 'Cool' | 'Neutral' | 'Olive';

export interface LABColor {
  L: number;
  a: number;
  b: number;
}

export interface ShadeIndexEntry {
  brand: string;
  productName: string;
  shadeName: string;
  hex: string;
  lab: LABColor;
  category: string;
  finish: string;
  undertone: Undertone;
}

export interface ShadeMatchResult extends ShadeIndexEntry {
  deltaE: number;
  matchPercent: number;
}

export const TRYON_CATEGORIES = ['lipstick', 'lip balm', 'lips', 'blush', 'eyeshadow', 'highlight', 'bronzer'] as const;
export const SHADE_FINDER_CATEGORIES = ['foundation', 'cushion foundation', 'concealer', 'tinted moisturizer', 'bb cream', 'cc cream'] as const;

export function isTryOnCategory(category: string): boolean {
  return TRYON_CATEGORIES.some(c => category.toLowerCase().includes(c.toLowerCase()));
}

export function isShadeFinderCategory(category: string): boolean {
  return SHADE_FINDER_CATEGORIES.some(c => category.toLowerCase().includes(c.toLowerCase()));
}
