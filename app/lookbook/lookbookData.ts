export type LookbookProduct = {
  name: string;
  price: string;
  brand: string;
  officialUrl: string;
};

export type LookbookItem = {
  id: number;
  title: string;
  image: string;
  season: string;
  brand: string;
  creator: string;
  products: LookbookProduct[];
  gender?: "women" | "men" | "unisex";
};

const defaultProducts: LookbookProduct[] = [
  {
    name: "Signature Knit",
    price: "$128",
    brand: "Aimé Leon Dore",
    officialUrl: "https://example.com/products/signature-knit",
  },
  {
    name: "Tailored Trousers",
    price: "$98",
    brand: "COS",
    officialUrl: "https://example.com/products/tailored-trousers",
  },
  {
    name: "Leather Bag",
    price: "$220",
    brand: "Acne Studios",
    officialUrl: "https://example.com/products/leather-bag",
  },
  {
    name: "Everyday Loafer",
    price: "$150",
    brand: "Jil Sander",
    officialUrl: "https://example.com/products/everyday-loafer",
  },
];

export const gridLookbooks: Record<"women" | "men", LookbookItem[]> = {
  women: [
    { id: 1, title: "Casual", image: "/women-grid-1.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 2, title: "Airport Outfit", image: "/women-grid-2.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 3, title: "Office Ready", image: "/women-grid3.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 4, title: "Weekend Vibes", image: "/women-grid-4.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 5, title: "Date Night", image: "/women-grid-5.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 6, title: "Street Style", image: "/women-grid-6.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 7, title: "Cozy Layers", image: "/women-grid-7.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 8, title: "Athletic Edge", image: "/women-grid-8.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 9, title: "Classic Elegance", image: "/women-grid-9.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
  ].map((item) => ({ ...item, products: defaultProducts })),
  men: [
    { id: 1, title: "Sharp Tailored", image: "/men-grid-1.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 2, title: "Casual Friday", image: "/men-grid-2.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 3, title: "Business Pro", image: "/men-grid-3.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 4, title: "Weekend Relaxed", image: "/men-grid-4.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 5, title: "Evening Sophisticated", image: "/men-grid-5.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 6, title: "Urban Street", image: "/men-grid-6.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 7, title: "Warm Layers", image: "/men-grid-7.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 8, title: "Sport Luxe", image: "/men-grid-8.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
    { id: 9, title: "Timeless Classic", image: "/men-grid-9.jpg", season: "Stylecast Lookbook", brand: "Stylecast", creator: "@stylecast" },
  ].map((item) => ({ ...item, products: defaultProducts })),
};
