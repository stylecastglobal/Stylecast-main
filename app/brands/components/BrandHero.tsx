// app/brands/components/BrandHero.tsx
import Image from "next/image";
import { Brand } from "@/app/data/types";

interface BrandHeroProps {
  brand: Brand;
}

export default function BrandHero({ brand }: BrandHeroProps) {
  // glowny는 로컬 이미지 사용
  const heroImageSrc = brand.id === 'glowny' 
    ? '/glowny-hero.jpg' 
    : brand.heroImage;

  return (
    <section className="relative h-[460px] w-full overflow-hidden">
      {/* Hero 이미지 */}
      <Image
        src={heroImageSrc}
        alt={brand.name}
        fill
        priority
        className="object-cover object-center" // ← object-center 추가!
        sizes="100vw"
        style={{ objectPosition: 'center 35%' }} // ← 위쪽 35% 위치에 중심
      />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />

      {/* 텍스트 컨텐츠 */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 w-full">
          <div className="max-w-2xl text-white">
            {brand.badge && (
              <div className="text-xs font-semibold mb-3 tracking-wide">
                {brand.badge}
              </div>
            )}
            <h1 className="text-6xl font-bold mb-4 tracking-tight">
              {brand.name}
            </h1>
            <p className="text-lg leading-relaxed opacity-95 mb-4">
              {brand.description}
            </p>
            {brand.favorites && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-xl">♡</span>
                <span className="font-medium">{brand.favorites} favorites</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}