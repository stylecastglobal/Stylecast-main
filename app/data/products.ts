import { Product } from "../types/makeup";

export const SAMPLE_PRODUCTS: Product[] = [
  // LIPS
  {
    id: "rb-lip-1",
    brand: "Rare Beauty",
    product: "Soft Pinch Liquid Blush",
    category: "LIPS",
    shades: [
      { name: "Joy", hex: "#F59AA8" },
      { name: "Happy", hex: "#FF6B7A" },
      { name: "Bliss", hex: "#E85D75" },
      { name: "Grace", hex: "#D45865" },
    ],
  },
  {
    id: "romand-lip-1",
    brand: "rom&nd",
    product: "Juicy Lasting Tint",
    category: "LIPS",
    shades: [
      { name: "#07 Jujube", hex: "#A2524E" },
      { name: "#08 Apple Brown", hex: "#8B4842" },
      { name: "#13 Eat Dotori", hex: "#C97564" },
      { name: "#23 Nucadamia", hex: "#B86F5F" },
    ],
  },
  {
    id: "fenty-lip-1",
    brand: "Fenty Beauty",
    product: "Gloss Bomb",
    category: "LIPS",
    shades: [
      { name: "Fussy", hex: "#FF9999" },
      { name: "Hot Chocolit", hex: "#8B5A4E" },
      { name: "Fu$$y", hex: "#FFB3BA" },
      { name: "Mauve Wive$", hex: "#B88B9D" },
    ],
  },
  {
    id: "mac-lip-1",
    brand: "MAC",
    product: "Lipstick",
    category: "LIPS",
    shades: [
      { name: "Ruby Woo", hex: "#CC0000" },
      { name: "Velvet Teddy", hex: "#9F6355" },
      { name: "Mehr", hex: "#A0524D" },
      { name: "Chili", hex: "#A8443D" },
    ],
  },

  // CHEEKS (Blush)
  {
    id: "rb-blush-1",
    brand: "Rare Beauty",
    product: "Soft Pinch Liquid Blush",
    category: "CHEEKS",
    shades: [
      { name: "Hope", hex: "#FF8FA3" },
      { name: "Bliss", hex: "#E85D75" },
      { name: "Love", hex: "#FF5C7A" },
      { name: "Grateful", hex: "#FFB3BA" },
    ],
  },
  {
    id: "nars-blush-1",
    brand: "NARS",
    product: "Blush",
    category: "CHEEKS",
    shades: [
      { name: "Orgasm", hex: "#FF8B94" },
      { name: "Deep Throat", hex: "#FF9999" },
      { name: "Dolce Vita", hex: "#C27B7F" },
      { name: "Torrid", hex: "#E57373" },
    ],
  },
  {
    id: "benefit-blush-1",
    brand: "Benefit",
    product: "Benetint",
    category: "CHEEKS",
    shades: [
      { name: "Rose", hex: "#FF6B7A" },
      { name: "Posietint", hex: "#FFB3BA" },
      { name: "Cha Cha Tint", hex: "#FF8FA3" },
      { name: "Gogotint", hex: "#FF5C7A" },
    ],
  },

  // EYESHADOW
  {
    id: "ud-shadow-1",
    brand: "Urban Decay",
    product: "Naked Palette",
    category: "EYESHADOW",
    shades: [
      { name: "Toasted", hex: "#9B6B47" },
      { name: "Hustle", hex: "#B08968" },
      { name: "Temptation", hex: "#8B6F47" },
      { name: "Factory", hex: "#D4A373" },
    ],
  },
  {
    id: "abh-shadow-1",
    brand: "Anastasia Beverly Hills",
    product: "Modern Renaissance",
    category: "EYESHADOW",
    shades: [
      { name: "Warm Taupe", hex: "#9B8579" },
      { name: "Red Ochre", hex: "#B85C50" },
      { name: "Venetian Red", hex: "#A0463D" },
      { name: "Love Letter", hex: "#D8A3A3" },
    ],
  },
  {
    id: "pat-shadow-1",
    brand: "Pat McGrath Labs",
    product: "Mothership Palette",
    category: "EYESHADOW",
    shades: [
      { name: "Bronze Blaze", hex: "#C49A6C" },
      { name: "Astral Luna Gold", hex: "#D4AF37" },
      { name: "VR Sextraterrestrial", hex: "#B87333" },
      { name: "Copper Charge", hex: "#B87333" },
    ],
  },
];

export const getProductsByCategory = (category: string) => {
  return SAMPLE_PRODUCTS.filter((p) => p.category === category);
};

export const getProductById = (id: string) => {
  return SAMPLE_PRODUCTS.find((p) => p.id === id);
};