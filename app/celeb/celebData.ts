export type CelebOutfitBrand = {
  name: string;
  slug: string;
};

export type CelebCategory = "Women" | "Men";

export type CelebOutfit = {
  id: number;
  image: string;
  celebrity: string;
  source?: string; // e.g. "@pinterest", "@vogue"
  context?: string;
  brands: CelebOutfitBrand[];
  category: CelebCategory;
  width?: number;
  height?: number;
};

export const celebOutfits: CelebOutfit[] = [
  { id: 1, image: "/women-grid-1.jpg", celebrity: "Hailey Bieber", source: "@stylecast", context: "Off-duty NYC", brands: [{ name: "The Row", slug: "the-row" }, { name: "Khaite", slug: "khaite" }], category: "Women", height: 420 },
  { id: 2, image: "/women-grid-2.jpg", celebrity: "Kendall Jenner", source: "@stylecast", context: "Paris FW", brands: [{ name: "Bottega Veneta", slug: "bottega-veneta" }], category: "Women", height: 380 },
  { id: 3, image: "/women-grid3.jpg", celebrity: "Zendaya", source: "@stylecast", context: "Press tour", brands: [{ name: "Loewe", slug: "loewe" }], category: "Women", height: 360 },
  { id: 4, image: "/men-grid-1.jpg", celebrity: "Timothée Chalamet", source: "@stylecast", context: "Venice FF", brands: [{ name: "Haider Ackermann", slug: "haider-ackermann" }], category: "Men", height: 440 },
  { id: 5, image: "/women-grid-4.jpg", celebrity: "Jennifer Aniston", source: "@stylecast", context: "LA", brands: [{ name: "Loro Piana", slug: "loro-piana" }], category: "Women", height: 400 },
  { id: 6, image: "/men-grid-2.jpg", celebrity: "Bad Bunny", source: "@stylecast", context: "Met Gala", brands: [{ name: "Givenchy", slug: "givenchy" }], category: "Men", height: 340 },
  { id: 7, image: "/pinterest4.jpg", celebrity: "Bella Hadid", source: "@stylecast", context: "Milan", brands: [{ name: "Chanel", slug: "chanel" }], category: "Women", height: 460 },
  { id: 8, image: "/women-grid-5.jpg", celebrity: "Margot Robbie", source: "@stylecast", context: "Premiere", brands: [{ name: "Versace", slug: "versace" }], category: "Women", height: 390 },
  { id: 9, image: "/pinterest5.jpg", celebrity: "Rihanna", source: "@stylecast", context: "Fenty launch", brands: [{ name: "Fenty", slug: "fenty" }], category: "Women", height: 320 },
  { id: 10, image: "/men-grid-3.jpg", celebrity: "Harry Styles", source: "@stylecast", context: "Grammys", brands: [{ name: "Gucci", slug: "gucci" }], category: "Men", height: 410 },
  { id: 11, image: "/women-grid-6.jpg", celebrity: "Emma Stone", source: "@stylecast", context: "LA casual", brands: [{ name: "Totême", slug: "toteme" }], category: "Women", height: 370 },
  { id: 12, image: "/pinterest6.jpg", celebrity: "Rosalía", source: "@stylecast", context: "Coachella", brands: [{ name: "Mugler", slug: "mugler" }], category: "Women", height: 430 },
];
