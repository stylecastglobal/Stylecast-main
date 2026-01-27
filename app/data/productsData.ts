// app/data/productsData.ts
import { Product } from './types';

export const products: Product[] = [
  // ==================== GLOWNY Products ====================
  {
    id: 'glowny-001',
    brandId: 'glowny',
    title: 'Radiance Serum',
    description: 'Brightening serum with vitamin C and niacinamide for glowing skin.',
    price: 68000,
    images: [
      'https://en.glowny.co.kr/cdn/shop/files/serum-1.jpg',
      'https://en.glowny.co.kr/cdn/shop/files/serum-2.jpg',
    ],
    category: 'Skincare',
    inStock: true,
    officialUrl: 'https://en.glowny.co.kr/products/radiance-serum',
  },
  {
    id: 'glowny-002',
    brandId: 'glowny',
    title: 'Hydrating Face Mask',
    description: 'Deep hydration sheet mask with hyaluronic acid.',
    price: 42000,
    images: [
      'https://en.glowny.co.kr/cdn/shop/files/mask-1.jpg',
    ],
    category: 'Skincare',
    inStock: true,
    officialUrl: 'https://en.glowny.co.kr/products/face-mask',
  },
  {
    id: 'glowny-003',
    brandId: 'glowny',
    title: 'Urban Suede Jumper',
    description: 'Premium suede jumper available in brown and black.',
    price: 266000,
    images: [
      'https://en.glowny.co.kr/cdn/shop/files/urban-suede-1.jpg',
      'https://en.glowny.co.kr/cdn/shop/files/urban-suede-2.jpg',
    ],
    category: 'Apparel',
    inStock: true,
    officialUrl: 'https://en.glowny.co.kr/products/urban-suede-jumper',
  },
  {
    id: 'glowny-004',
    brandId: 'glowny',
    title: 'Vitamin C Toner',
    description: 'Refreshing toner with vitamin C to brighten and balance skin.',
    price: 35000,
    images: [
      'https://en.glowny.co.kr/cdn/shop/files/toner-1.jpg',
    ],
    category: 'Skincare',
    inStock: true,
  },
  {
    id: 'glowny-005',
    brandId: 'glowny',
    title: 'Night Repair Cream',
    description: 'Rich night cream with retinol and peptides for overnight repair.',
    price: 85000,
    images: [
      'https://en.glowny.co.kr/cdn/shop/files/night-cream-1.jpg',
    ],
    category: 'Skincare',
    inStock: true,
  },
  {
    id: 'glowny-006',
    brandId: 'glowny',
    title: 'Essence Water',
    description: 'Lightweight essence water for hydration and glow.',
    price: 45000,
    images: [
      'https://en.glowny.co.kr/cdn/shop/files/essence-1.jpg',
    ],
    category: 'Skincare',
    inStock: true,
  },

  // ==================== Aimé Leon Dore Products ====================
  {
    id: 'ald-001',
    brandId: 'aime-leon-dore',
    title: 'Classic Logo Hoodie',
    description: 'Premium cotton hoodie with embroidered logo.',
    price: 195000,
    images: [
      '/products/ald-hoodie.jpg',
    ],
    category: 'Apparel',
    inStock: true,
  },
  {
    id: 'ald-002',
    brandId: 'aime-leon-dore',
    title: 'Wool Baseball Cap',
    description: 'Classic wool baseball cap with adjustable strap.',
    price: 85000,
    images: [
      '/products/ald-cap.jpg',
    ],
    category: 'Accessories',
    inStock: true,
  },
  {
    id: 'ald-003',
    brandId: 'aime-leon-dore',
    title: 'Uniform Crewneck',
    description: 'Essential crewneck sweatshirt in premium cotton.',
    price: 165000,
    images: [
      '/products/ald-crewneck.jpg',
    ],
    category: 'Apparel',
    inStock: false,
  },
  {
    id: 'ald-004',
    brandId: 'aime-leon-dore',
    title: 'Cotton Oxford Shirt',
    description: 'Classic button-down oxford shirt in premium cotton.',
    price: 225000,
    images: [
      '/products/ald-shirt.jpg',
    ],
    category: 'Apparel',
    inStock: true,
  },
  {
    id: 'ald-005',
    brandId: 'aime-leon-dore',
    title: 'Suede Bomber Jacket',
    description: 'Luxurious suede bomber jacket with ribbed cuffs.',
    price: 895000,
    images: [
      '/products/ald-jacket.jpg',
    ],
    category: 'Outerwear',
    inStock: true,
  },
  {
    id: 'ald-006',
    brandId: 'aime-leon-dore',
    title: 'Penny Loafers',
    description: 'Hand-crafted leather penny loafers.',
    price: 475000,
    images: [
      '/products/ald-loafers.jpg',
    ],
    category: 'Footwear',
    inStock: true,
  },

  // ==================== Scuffers Products ====================
  {
    id: 'scuffers-001',
    brandId: 'scuffers',
    title: 'Classic Leather Sneakers',
    description: 'Timeless leather sneakers with cushioned sole.',
    price: 120000,
    images: [
      '/products/scuffers-sneakers.jpg',
    ],
    category: 'Footwear',
    inStock: true,
  },
  {
    id: 'scuffers-002',
    brandId: 'scuffers',
    title: 'Canvas High-Tops',
    description: 'Durable canvas high-top sneakers.',
    price: 95000,
    images: [
      '/products/scuffers-hightops.jpg',
    ],
    category: 'Footwear',
    inStock: true,
  },
  {
    id: 'scuffers-003',
    brandId: 'scuffers',
    title: 'Slip-On Loafers',
    description: 'Comfortable slip-on loafers for everyday wear.',
    price: 135000,
    images: [
      '/products/scuffers-loafers.jpg',
    ],
    category: 'Footwear',
    inStock: true,
  },
  {
    id: 'scuffers-004',
    brandId: 'scuffers',
    title: 'Suede Desert Boots',
    description: 'Classic desert boots in premium suede.',
    price: 165000,
    images: [
      '/products/scuffers-boots.jpg',
    ],
    category: 'Footwear',
    inStock: false,
  },
];

// ==================== Helper Functions ====================

/**
 * Get a single product by ID
 */
export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

/**
 * Get all products for a specific brand
 */
export const getProductsByBrand = (brandId: string): Product[] => {
  return products.filter(p => p.brandId === brandId);
};

/**
 * Get products by category
 */
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

/**
 * Get trending products (first N products, optionally filtered by brand)
 */
export const getTrendingProducts = (brandId?: string, limit: number = 6): Product[] => {
  let filtered = products;
  
  if (brandId) {
    filtered = products.filter(p => p.brandId === brandId);
  }
  
  return filtered.slice(0, limit);
};

/**
 * Get all products with stock availability
 */
export const getInStockProducts = (): Product[] => {
  return products.filter(p => p.inStock);
};

/**
 * Search products by title
 */
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
};