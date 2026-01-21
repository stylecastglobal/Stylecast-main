"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export type LookItem = {
  id: number;
  image: string;
  price: string;
  tags: string[];
  coat: string;
  top: string;
  bottom: string;
  shoes: string;
  jewelry: string;
};

export default function LookCarousel({ items }: { items: LookItem[] }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [
      Autoplay({
        delay: 3500, // 3.5초마다 자동 이동
        stopOnInteraction: false,
      }),
    ]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="min-w-[260px] md:min-w-[300px] border rounded-2xl p-4 bg-white"
          >
            {/* 이미지 */}
            <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-3">
              <Image
                src={item.image}
                alt="look"
                fill
                className="object-cover"
              />
            </div>

            {/* 태그 */}
            <div className="text-xs text-gray-700 leading-relaxed mb-2">
              {item.tags.map((t, i) => (
                <span key={i}>#{t} </span>
              ))}
            </div>

            {/* 디테일 */}
            <div className="text-sm leading-relaxed">
              <p>Coat: {item.coat}</p>
              <p>Top: {item.top}</p>
              <p>Bottom: {item.bottom}</p>
              <p>Shoes: {item.shoes}</p>
              <p>Jewelry: {item.jewelry}</p>
            </div>

            {/* 가격 */}
            <p className="mt-3 text-lg font-semibold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}