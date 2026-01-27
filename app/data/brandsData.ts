// app/data/brandsData.ts
import { Brand } from "./types";

export const brands: Brand[] = [
  {
    id: "glowny",
    slug: "glowny",
    name: "GLOWNY",
    description:
      "Premium Korean skincare brand focused on natural glow and radiance.",
    heroImage: "/glowny-brandcardpicture.jpg",
    category: ["Beauty", "Skincare"],
  },
  {
    id: "aime-leon-dore",
    slug: "aime-leon-dore",
    name: "Aimé Leon Dore",
    description:
      "New York-based lifestyle brand blending streetwear with classic menswear.",
    heroImage: "/aimeleondore-brandcardpicture.jpg",
    category: ["Apparel", "Streetwear"],
    trending: true,
  },
  {
    id: "scuffers",
    slug: "scuffers",
    name: "Scuffers",
    description: "Comfortable, durable footwear combining style with functionality.",
    heroImage: "/scuffers-brandcardpicture.jpg",
    category: ["Footwear"],
  },
];

export const getBrandById = (id: string): Brand | undefined => {
  return brands.find((b) => b.id === id || b.slug === id);
};

export const getBrandsByCategory = (category: string): Brand[] => {
  if (category === "All") return brands;
  return brands.filter((b) => b.category.includes(category));
};