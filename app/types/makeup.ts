export type MakeupCategory = "LIPS" | "CHEEKS" | "EYESHADOW" | "EYEBROW";

export interface Shade {
  name: string;
  hex: string;
  opacity?: number;
}

export interface Product {
  id: string;
  brand: string;
  product: string;
  category: MakeupCategory;
  shades: Shade[];
}

export interface BrushStroke {
  category: MakeupCategory;
  color: string;
  opacity: number;
  brushSize: number;
  points: { x: number; y: number }[];
}

export interface SelectedMakeup {
  category: MakeupCategory;
  product: Product;
  shade: Shade;
}

export interface SavedLook {
  id: string;
  imageUrl: string;
  products: SelectedMakeup[];
  strokes: BrushStroke[];
  createdAt: Date;
}