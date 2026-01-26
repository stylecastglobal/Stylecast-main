export type ProductCategory =
  | "FOUNDATION"
  | "CONCEALER"
  | "CUSHION"
  | "LIPS"
  | "CHEEKS"
  | "EYESHADOW"
  | "HIGHLIGHT"
  | "BRONZER"
  | "SKINCARE"
  | "OTHER";

export type Undertone = "warm" | "cool" | "neutral" | "olive" | "unknown";

export type StoreLink = {
  name: string;
  link: string;
  price?: string;
};

export type ReviewSummary = {
  oily?: string;
  dry?: string;
  acne_prone?: string;
  sensitive?: string;
  overall?: string;
};

export type ShadeDoc = {
  shade_name: string;
  hex: string;
  undertone?: Undertone;
  popularity?: number;
  lab?: { l: number; a: number; b: number };
};

export type ProductDoc = {
  id: string;
  brand: string;
  name: string;
  category: ProductCategory;
  price?: string;
  stores: StoreLink[];
  images: string[];
  shades?: ShadeDoc[];
  ingredients?: string;
  safety_flags?: string[];
  claims?: string[];
  reviews_summary?: ReviewSummary;
  wear_time_rating?: string;
  dupes?: string[];
  popularity_score?: number;
  keywords?: string[];
  updated_at?: string;
};

export type ScanCandidate = {
  id: string;
  brand: string;
  name: string;
  category: ProductCategory;
  image: string | null;
  image_set: string[];
};
