"use client";

import { useState } from "react";
import Link from "next/link";

interface BrandCardProps {
  brand: {
    id: number;
    name: string;
    discount: string;
    badge: string | null;
    favorites: string;
    image: string;
    slug: string;
  };
}

export default function BrandCard({ brand }: BrandCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/brand-detail/${brand.slug}`}
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card Container */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        {/* Main Brand Image */}
        <div className="absolute inset-0">
          <img
            src={brand.image}
            alt={brand.name}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
        </div>

        {/* Dark Gradient Overlay - More visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Info Bar */}
        <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between">
          {/* Left: Discount & Badge */}
          <div className="text-white text-xs font-semibold tracking-wide">
            {brand.discount}
            {brand.badge && (
              <>
                <span className="mx-2 text-white/60">|</span>
                <span className="font-bold">{brand.badge}</span>
              </>
            )}
          </div>

          {/* Right: Favorite Button */}
          <button 
            className="group/fav relative z-10"
            onClick={(e) => {
              e.preventDefault();
              // Add favorite logic here
            }}
          >
            <div className="flex flex-col items-center gap-0.5">
              <svg
                className="w-6 h-6 text-white transition-all duration-300 group-hover/fav:scale-110 group-hover/fav:fill-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-white text-[10px] font-semibold">
                {brand.favorites}
              </span>
            </div>
          </button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
          {/* Brand Name */}
          <h3 className="text-white text-2xl font-bold mb-2 tracking-tight leading-tight">
            {brand.name}
          </h3>

          {/* CTA Link */}
          <div>
            <span className="text-white text-sm font-medium underline underline-offset-4 decoration-1 hover:no-underline transition-all">
              Go to Brand Shop
            </span>
          </div>
        </div>

        {/* Hover Overlay - Subtle darkening */}
        <div
          className={`absolute inset-0 bg-black/10 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </Link>
  );
}