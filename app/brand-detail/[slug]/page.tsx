"use client";

import { useState } from "react";
import Link from "next/link";

// Sample product data - replace with your actual data
const trendingProducts = [
  {
    id: 1,
    name: "Urban Suede Jumper",
    originalPrice: 266,
    discountPercent: 0,
    currentPrice: 266,
    image: "/urbansuedejumper-glowny.jpg",
    favorites: 888,
    rating: 5.0,
    reviews: 3,
  },
  {
    id: 2,
    name: "Air Halter Neck Tank",
    originalPrice: 62,
    discountPercent: 0,
    currentPrice: 62,
    image: "/airhalternecktank-glowny.jpg",
    favorites: 0,
    rating: 0,
    reviews: 0,
  },
  {
    id: 3,
    name: "Moor Reversible Fur Jacket",
    originalPrice: 219,
    discountPercent: 0,
    currentPrice: 219,
    image: "/moorreversiblefurjacket-glowny.jpg",
    favorites: 396,
    rating: 4.0,
    reviews: 1,
  },
  {
    id: 4,
    name: "Demi Cutout Long Sleeve",
    originalPrice: 96,
    discountPercent: 0,
    currentPrice: 96,
    image: "/demicutoutlongsleeve-glowny.jpg",
    favorites: 514,
    rating: 0,
    reviews: 0,
  },
  {
    id: 5,
    name: "The Jane Jeans",
    originalPrice: 140,
    discountPercent: 0,
    currentPrice: 140,
    image: "/thejanejeans-glowny.jpg",
    favorites: 186,
    rating: 0,
    reviews: 0,
  },
  {
    id: 6,
    name: "Cozy Critter Hooded Knit",
    originalPrice: 123,
    discountPercent: 0,
    currentPrice: 123,
    image: "/cozycritterhoodedknit-glowny.jpg",
    favorites: 741,
    rating: 4.3,
    reviews: 6,
  },
];

// Generate 30 products (5 rows x 6 columns) by repeating the above
const allProducts = Array.from({ length: 30 }, (_, i) => ({
  ...trendingProducts[i % 6],
  id: i + 1,
}));

// Brand data - replace with API call in production
const brandData: Record<string, {
  name: string;
  description: string;
  heroImage: string;
}> = {
  glowny: {
    name: "GLOWNY",
    description: "You Glow Differently. Glowny is a brand that values individuality, beauty & glow. Designed and created with love and delicacy, we take inspiration from people and their individual glow. You Glow Differently, Glowny.",
    heroImage: "/glowny-hero.jpg",
  },
  // Add more brands here as needed
  aimeleondore: {
    name: "Aimé Leon Dore",
    description: "Aimé Leon Dore is a lifestyle brand founded in New York City...",
    heroImage: "/aimeleondore-hero.jpg",
  },
  crank: {
    name: "CRANK",
    description: 'CRANK is a brand for people who are free to express themselves without an age restriction under the slogan "We are still young."',
    heroImage: "/crank-hero.jpg",
  },
};

export default function BrandDetailPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState("Real-Time");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilters, setSelectedFilters] = useState({
    gender: "Women",
    color: "",
    price: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Get brand info based on slug
  const brand = brandData[params.slug] || brandData.glowny; // Default to GLOWNY if not found
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Reduced height */}
      <section className="relative w-full h-[45vh] overflow-hidden mt-28">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={brand.heroImage}
            alt={brand.name}
            className="w-full h-full object-cover object-[center_30%]"
          />
        </div>

        {/* Favorite Button - Top Right */}
        <button className="absolute top-8 right-8 z-10 group">
          <svg
            className="w-10 h-10 text-white transition-all duration-300 group-hover:scale-110 group-hover:fill-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
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
        </button>

        {/* Text Content - Bottom Right */}
        <div className="absolute bottom-0 right-0 p-8 max-w-2xl">
          <h1 className="text-white text-6xl font-bold mb-4 tracking-tight leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            {brand.name}
          </h1>
          <p className="text-white text-base leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {brand.description}
          </p>
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-4xl font-bold text-black">Trending Now</h2>
          <Link
            href="#"
            className="text-sm font-semibold text-black hover:opacity-60 transition-opacity"
          >
            View More
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-6 gap-6">
          {trendingProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative"
            >
              {/* Ranking Badge */}
              <div className="absolute top-3 left-3 z-10 bg-white text-black font-bold text-xs px-2 py-1 rounded shadow-md">
                {index + 1}
              </div>

              {/* Product Image */}
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Favorite Button */}
                <button className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors"
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
                </button>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-sm text-black mb-2 line-clamp-2 group-hover:underline">
                  {product.name}
                </h3>

                {/* Pricing */}
                <div className="flex items-center gap-2 mb-2">
                  {product.discountPercent > 0 && (
                    <>
                      <span className="text-gray-400 line-through text-xs">
                        ${product.originalPrice}
                      </span>
                      <span className="text-red-500 font-bold text-xs">
                        {product.discountPercent}%
                      </span>
                    </>
                  )}
                </div>
                <div className="text-black font-bold text-base mb-2">
                  ${product.currentPrice}
                </div>

                {/* Rating & Favorites */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {product.favorites > 0 && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      {product.favorites}
                    </span>
                  )}
                  {product.rating > 0 && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {product.rating} ({product.reviews})
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Products Section */}
      <section className="max-w-7xl mx-auto px-8 py-16 border-t border-gray-200">
        {/* Category Tabs */}
        <div className="flex items-center gap-6 mb-6 border-b border-gray-200">
          {["All", "Tops", "Outerwear", "Pants", "Dresses & Skirts", "Accessories", "Bags", "Active", "Underwear"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`py-3 px-1 whitespace-nowrap text-sm transition-colors relative ${
                selectedCategory === category
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {category}
              {selectedCategory === category && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Filter Icon */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm hover:border-black transition-colors text-black">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>

            {/* Gender Filter */}
            {["Women", "Men"].map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedFilters({ ...selectedFilters, gender })}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedFilters.gender === gender
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {gender}
              </button>
            ))}

            {/* Color Dropdown */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm hover:border-black transition-colors text-black">
              Color
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Price Dropdown */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm hover:border-black transition-colors text-black">
              Price
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-black font-medium">Total 290</span>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm hover:border-black transition-colors text-black">
              Most popular
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-6 gap-6">
          {allProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Favorite Button */}
                <button className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors"
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
                </button>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-sm text-black mb-2 line-clamp-2 group-hover:underline">
                  {product.name}
                </h3>

                {/* Pricing */}
                <div className="flex items-center gap-2 mb-1">
                  {product.discountPercent > 0 && (
                    <>
                      <span className="text-gray-400 line-through text-xs">
                        ${product.originalPrice}
                      </span>
                      <span className="text-red-500 font-bold text-xs">
                        {product.discountPercent}%
                      </span>
                    </>
                  )}
                </div>
                <div className="text-black font-bold text-base mb-2">
                  ${product.currentPrice}
                </div>

                {/* Rating & Favorites */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {product.favorites > 0 && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      {product.favorites}
                    </span>
                  )}
                  {product.rating > 0 && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {product.rating} ({product.reviews})
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers */}
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${
                currentPage === page
                  ? "bg-black text-white font-bold"
                  : "text-gray-400 hover:text-black hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
            disabled={currentPage === 4}
            className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}