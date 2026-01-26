// app/brands/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getBrandById } from '@/app/data/brandsData';
import BrandPageClient from './brand-page-client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  image: string | null;
  images: string[];
  price: string | null;
  officialUrl: string;
};

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  
  // 1. brandsData에서 브랜드 정보 가져오기
  const brand = getBrandById(slug);
  if (!brand) {
    notFound();
  }
  
  // 2. API에서 제품 데이터 가져오기
  let products: ShopifyProduct[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/brands/${slug}`,
      { cache: 'no-store' }
    );
    
    if (res.ok) {
      const data = await res.json();
      products = data.products || [];
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <BrandPageClient
      brand={brand}
      products={products}
    />
  );
}