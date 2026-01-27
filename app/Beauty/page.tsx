"use client";

import { useState } from "react";

// ========== Hero Banner Section ==========
function HeroBannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      id: 1,
      title: "New Nude Palette",
      bgColor: "bg-gray-100",
    },
    {
      id: 2,
      title: "6-In-1 Real Glass Glow Device",
      subtitle: "medicube®",
      description: "Enjoy enhanced absorption, radiance, elasticity, pore care, and customized LED care.",
      cta: "SHOP NOW",
      bgColor: "bg-gray-50",
    },
  ];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full">
              <div className={`relative aspect-[16/7] ${banner.bgColor}`}>
                <div className="absolute inset-0 flex items-center justify-between px-8 sm:px-16">
                  <div className="max-w-md space-y-3 sm:space-y-4">
                    {banner.subtitle && (
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        {banner.subtitle}
                      </p>
                    )}
                    <h2 className="text-2xl sm:text-4xl font-bold text-black">
                      {banner.title}
                    </h2>
                    {banner.description && (
                      <p className="text-sm sm:text-lg text-gray-700">
                        {banner.description}
                      </p>
                    )}
                    {banner.cta && (
                      <button className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base">
                        {banner.cta}
                      </button>
                    )}
                  </div>
                  <div className="hidden md:flex w-64 lg:w-96 h-64 lg:h-96 bg-white border-2 border-gray-200 rounded-full items-center justify-center">
                    <div className="w-40 lg:w-64 h-40 lg:h-64 bg-gray-100 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          aria-label="Previous"
        >
          <svg className="w-4 sm:w-6 h-4 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          aria-label="Next"
        >
          <svg className="w-4 sm:w-6 h-4 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-black" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== Shop By Collection Section ==========
function ShopByCollectionSection() {
  const collections = [
    { title: "Winter-Ready Skincare" },
    { title: "Best Sellers" },
    { title: "New Arrivals" },
    { title: "Sun Care" },
    { title: "Facial Cleanser" },
    { title: "Makeup Remover" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center text-black">
        Shop By Collection
      </h2>

      <div className="flex justify-center gap-6 sm:gap-8 lg:gap-12 flex-wrap">
        {collections.map((c) => (
          <div
            key={c.title}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 rounded-full bg-gray-100 border-2 border-gray-200 mb-3 transition-transform group-hover:scale-105 flex items-center justify-center">
              <div className="w-14 sm:w-16 lg:w-20 h-14 sm:h-16 lg:h-20 bg-gray-200 rounded-full" />
            </div>
            <p className="text-xs sm:text-sm text-center max-w-[100px] sm:max-w-[120px] leading-snug text-gray-700">
              {c.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ========== Trending Section ==========
function TrendingSection() {
  const trendingProducts = [
    {
      id: 1,
      label: "Now trending:",
      title: "Korean skincare devices",
      ctaText: "VIEW ALL",
      isDark: true,
    },
    {
      id: 2,
      label: "Ultimate 6-in-1",
      title: "Booster Pro",
      ctaText: "SHOP NOW",
      isDark: false,
    },
    {
      id: 3,
      label: "High-Tech Dual Energy",
      title: "Ultra Tune 40.6B",
      ctaText: "SHOP NOW",
      isDark: false,
    },
    {
      id: 4,
      label: "Eyelash And Easy To Use",
      title: "Mini Booster Pro",
      ctaText: "SHOP NOW",
      isDark: false,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {trendingProducts.map((product) => (
          <div
            key={product.id}
            className={`relative rounded-2xl overflow-hidden border-2 aspect-[3/4] ${
              product.isDark 
                ? "bg-black border-black" 
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
              <div>
                <p className={`text-xs sm:text-sm mb-1 sm:mb-2 ${
                  product.isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {product.label}
                </p>
                <h3 className={`text-lg sm:text-xl font-bold ${
                  product.isDark ? "text-white" : "text-black"
                }`}>
                  {product.title}
                </h3>
              </div>

              <div className="flex-1 flex items-center justify-center my-4">
                <div className={`w-24 sm:w-32 h-24 sm:h-32 rounded-full border-2 ${
                  product.isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
                }`} />
              </div>

              <button
                className={`w-full py-2 sm:py-3 rounded-lg text-sm font-medium transition-colors ${
                  product.isDark
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-black text-white hover:bg-gray-800 border border-gray-300"
                }`}
              >
                {product.ctaText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ========== Product Grid Section ==========
function ProductGridSection({ title, products }: { title: string; products: any[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-black">{title}</h2>
        <button className="text-sm underline hover:text-gray-600">Shop all</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Left Big Banner */}
        <div className="lg:col-span-1 bg-black rounded-2xl overflow-hidden relative min-h-[300px] sm:min-h-[400px] flex items-center justify-center border-2 border-black">
          <div className="text-center p-6">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">All {title}</h3>
            <p className="text-gray-300 text-sm mb-6">Shop all</p>
            <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto bg-gray-800 rounded-full border-2 border-gray-700" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden mb-3 aspect-square">
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="w-20 sm:w-32 h-20 sm:h-32 bg-white border border-gray-200 rounded-full" />
                </div>

                <button className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 sm:w-8 h-7 sm:h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {product.isNew && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black text-white text-xs px-2 py-1 rounded">
                    NEW
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-full bg-white border border-gray-300 text-gray-900 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 mb-1 sm:mb-2">
                    ADD TO CART
                  </button>
                  <button className="w-full bg-black text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800">
                    CHOOSE OPTIONS
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                <h4 className="text-xs sm:text-sm font-medium text-black mb-1 line-clamp-2">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm font-semibold text-black">{product.price}</p>
                  {product.stock && (
                    <p className="text-xs text-gray-600">● In stock</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== Recommended Section ==========
function RecommendedSection() {
  const recommendations = [
    {
      id: 1,
      youtuber: "TATI",
      title: "Gamechanging device that literally does it all.",
      description: "Discover Tati's favorite beauty secret-the tool Gamechanging...",
      badge: "TOP SECRET",
    },
    {
      id: 2,
      youtuber: "Michelle Phan",
      title: "New/Jeans Inspired Makeup and Dewy...",
      description: "6,718 Trackbak Michelle's skincare hack! How to use ha...",
    },
    {
      id: 3,
      youtuber: "Michelle Phan",
      title: "How To Get a Jawline and Reduce Double Chin Wit...",
      description: "Michelle will show you how to use her favorite Medicube...",
    },
    {
      id: 4,
      youtuber: "TATI",
      title: "GAMECHANGERS ... New Products Tested 🔥",
      description: "TATI WESTBROOK'S ESSENTIALS Get Gamechanging...",
      badge: "NEW",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-black">
        RECOMMENDED BY BEAUTY EXPERTS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="border-2 border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group bg-white"
          >
            <div className="relative aspect-video bg-gray-100">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {rec.badge && (
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                  {rec.badge}
                </div>
              )}

              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-2 bg-white border border-gray-200 rounded-full px-2 sm:px-3 py-1">
                <div className="w-5 sm:w-6 h-5 sm:h-6 bg-gray-300 rounded-full" />
                <span className="text-xs font-medium text-black">{rec.youtuber}</span>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm font-semibold text-black mb-2 line-clamp-2">
                {rec.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {rec.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ========== CTA Section ==========
function CTASection() {
  return (
    <section className="bg-black text-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          GET MATCHED, STAY RADIANT
        </h2>
        <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">
          Skincare that works—before you buy.
        </p>
        <button className="bg-white text-black px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-white">
          Try the Color Match
        </button>
      </div>
    </section>
  );
}

// ========== Main Beauty Page ==========
export default function BeautyPage() {
  const skincareProducts = [
    {
      id: 1,
      brand: "Equalberry",
      name: "EQUALBERRY NAD+ Peptide Boosting Serum",
      price: "$33.99 CAD",
      stock: true,
      isNew: true,
    },
    {
      id: 2,
      brand: "Biodance",
      name: "Biodance Bio-Collagen Real Deep Mask (Pink)",
      price: "from $6.99",
      stock: true,
    },
    {
      id: 3,
      brand: "Anua",
      name: "Anua Niacinamide 10% + TXA 4% Serum 30ml",
      price: "$31.69 CAD",
      stock: true,
    },
    {
      id: 4,
      brand: "Dr. Althea",
      name: "Dr. Althea 345 Relief Cream 50ml",
      price: "$25.99 CAD",
      stock: true,
    },
  ];

  const makeupProducts = [
    {
      id: 1,
      brand: "Milktouch",
      name: "Milktouch Black Peel Off Lip Tattoo (5 Colors)",
      price: "$23.99 CAD",
      stock: true,
      isNew: true,
    },
    {
      id: 2,
      brand: "TIRTIR",
      name: "TIRTIR Mask Fit Red Cushion Foundation",
      price: "$33.99 CAD",
      stock: true,
      isNew: true,
    },
    {
      id: 3,
      brand: "2&N",
      name: "2&N Dual Cheek Jig (8 Colors)",
      price: "$33.99 CAD",
      stock: true,
    },
    {
      id: 4,
      brand: "Judydoll",
      name: "Judydoll 2 in 1 Highlighter Contour Palette",
      price: "$22.99 CAD",
      stock: true,
    },
  ];

  return (
    <main className="bg-white text-black min-h-screen">
      <HeroBannerSection />
      <ShopByCollectionSection />
      <TrendingSection />
      <ProductGridSection title="Skincare" products={skincareProducts} />
      <ProductGridSection title="Makeup" products={makeupProducts} />
      <RecommendedSection />
      <CTASection />
    </main>
  );
}