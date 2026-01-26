// app/data/brandsData.ts
import { Brand } from './types';

export const brands: Brand[] = [
  {
    id: 'glowny',
    slug: 'glowny',
    name: 'GLOWNY',
    description: 'Premium Korean skincare brand focused on natural glow and radiance.',
    heroImage: 'https://en.glowny.co.kr/cdn/shop/files/hero.jpg', // 실제 CDN URL
    category: ['Beauty', 'Skincare'],
    favorites: '9K',
  },
  {
    id: 'aime-leon-dore',
    slug: 'aime-leon-dore',
    name: 'Aimé Leon Dore',
    description: 'New York-based lifestyle brand blending streetwear with classic menswear.',
    heroImage: '/brands/ald-hero.jpg',
    category: ['Apparel', 'Streetwear'],
    badge: 'TOP RATED',
    favorites: '15K',
    trending: true,
  },
  {
    id: 'meem',
    slug: 'meem',
    name: 'ME+EM',
    description: 'Contemporary British womenswear brand for the modern woman.',
    heroImage: '/brands/meem-hero.jpg',
    category: ['Apparel', 'Womenswear'],
    favorites: '13K',
  },
  {
    id: 'scuffers',
    slug: 'scuffers',
    name: 'Scuffers',
    description: 'Comfortable, durable footwear combining style with functionality.',
    heroImage: '/brands/scuffers-hero.jpg',
    category: ['Footwear'],
    badge: '9,999+ REVIEWS',
    favorites: '133K',
  },
  {
    id: 'cheap',
    slug: 'cheap',
    name: 'cheap',
    description: 'Affordable fashion essentials and everyday styles.',
    heroImage: 'https://placehold.co/1200x1600?text=cheap',
    category: ['Apparel'],
  },
];

export const getBrandById = (id: string): Brand | undefined => {
  return brands.find(b => b.id === id || b.slug === id);
};

export const getBrandsByCategory = (category: string): Brand[] => {
  if (category === 'All') return brands;
  return brands.filter(b => b.category.includes(category));
};