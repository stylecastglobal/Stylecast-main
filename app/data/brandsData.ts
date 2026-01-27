// app/data/brandsData.ts
import { Brand } from "./types";

export const brands: Brand[] = [
  {
    id: "glowny",
    slug: "glowny",
    name: "GLOWNY",
    description:
      "Premium Korean skincare brand focused on natural glow and radiance.",
    heroImage: "https://en.glowny.co.kr/cdn/shop/files/hero.jpg",
    category: ["Beauty", "Skincare"],
    favorites: "9K",
  },
  {
    id: "aime-leon-dore",
    slug: "aime-leon-dore",
    name: "Aimé Leon Dore",
    description:
      "New York-based lifestyle brand blending streetwear with classic menswear.",
    heroImage: "/brands/ald-hero.jpg",
    category: ["Apparel", "Streetwear"],
    badge: "TOP RATED",
    favorites: "15K",
    trending: true,
  },
  {
    id: "scuffers",
    slug: "scuffers",
    name: "Scuffers",
    description: "Comfortable, durable footwear combining style with functionality.",
    heroImage: "/brands/scuffers-hero.jpg",
    category: ["Footwear"],
    badge: "9,999+ REVIEWS",
    favorites: "133K",
  },
];

export const getBrandById = (id: string): Brand | undefined => {
  return brands.find((b) => b.id === id || b.slug === id);
};

export const getBrandsByCategory = (category: string): Brand[] => {
  if (category === "All") return brands;
  return brands.filter((b) => b.category.includes(category));
};