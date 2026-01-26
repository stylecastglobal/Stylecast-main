// app/brands/components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  image: string | null;
  images: string[];
  price: string | null;
  officialUrl: string;
};

interface ProductCardProps {
  product: ShopifyProduct;
  brandSlug: string;
}

export default function ProductCard({ product, brandSlug }: ProductCardProps) {
  const imageUrl =
    product.image ||
    product.images[0] ||
    "https://placehold.co/400x500/EEE/333?text=No+Image";

  return (
    <Link
      href={`/products/${product.handle}?brand=${brandSlug}`}
      className="block group"
    >
      {/* 이미지 */}
      <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          unoptimized
        />
      </div>

      {/* 제품 정보 */}
      <div className="space-y-1">
        {/* 제품명 */}
        <h3 className="text-sm font-medium line-clamp-2 leading-tight group-hover:underline">
          {product.title}
        </h3>

        {/* 가격 */}
        {product.price && (
          <p className="text-base font-bold">
            ${parseFloat(product.price).toFixed(0)}
          </p>
        )}
      </div>
    </Link>
  );
}