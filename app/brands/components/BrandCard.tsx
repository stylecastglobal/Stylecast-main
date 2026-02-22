import Image from 'next/image';
import Link from 'next/link';
import { Brand } from '@/app/data/types'; // ← 이 줄 수정!

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand.slug}`} className="block">
      <div className="relative group cursor-pointer">
        <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
          <Image
            src={brand.cardImage || brand.heroImage}
            alt={brand.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            {brand.badge && (
              <div className="text-white text-xs mb-1 font-semibold">
                {brand.badge}
              </div>
            )}
            <h3 className="text-white font-bold text-3xl mb-1">{brand.name}</h3>
            <span className="text-white text-sm underline hover:no-underline">
              Go to Brand Shop
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}