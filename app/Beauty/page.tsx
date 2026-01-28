"use client";

import { useState, useEffect } from "react";

// ========== Hero Banner Section ==========
function HeroBannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      id: 1,
      title: "6-In-1",
      subtitle: "Real Glass Glow Device",
      description: "Enjoy enhanced absorption, radiance, elasticity, pore care, and customized LED care.",
      cta: "SHOP NOW",
      image: "/medicubebanner-beauty.jpg", // Replace with actual image path
    },
    {
      id: 2,
      title: "Dasique",
      subtitle: "Eyeshadow Palette",
      cta: "SHOP NOW",
      image: "/dasiquebanner-beauty.jpg", // Replace with actual image path
    },
    // Add 3 more banner objects here when you have them ready
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full">
              <div className="relative aspect-[21/9] sm:aspect-[16/6] overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url('${banner.image}')`,
                    backgroundColor: '#f5e9e2' // Fallback color
                  }}
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
                    {/* Conditional positioning based on banner id */}
                    {banner.id === 1 ? (
                      // Medicube banner - Text on the right aligned with logo
                      <div className="ml-auto max-w-xl space-y-3 sm:space-y-5 text-right pr-0 sm:pr-8 lg:pr-20 pt-8 sm:pt-12">
                        {/* Main Title */}
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-none">
                          {banner.title}
                        </h2>
                        
                        {/* Subtitle */}
                        {banner.subtitle && (
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">
                            {banner.subtitle}
                          </h3>
                        )}
                        
                        {/* Description */}
                        {banner.description && (
                          <p className="text-base sm:text-lg lg:text-xl text-black max-w-lg ml-auto leading-relaxed">
                            {banner.description}
                          </p>
                        )}
                        
                        {/* CTA Button */}
                        {banner.cta && (
                          <div className="pt-4 sm:pt-6">
                            <button className="bg-black text-white px-12 sm:px-16 lg:px-20 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:bg-gray-800 transition-colors uppercase tracking-wider">
                              {banner.cta}
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Dasique banner - Text on the left with white color and shadow
                      <div className="max-w-xl space-y-4 sm:space-y-6 text-left pl-0 sm:pl-8 lg:pl-12">
                        {/* Main Title */}
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.4)' }}>
                          {banner.title}
                        </h2>
                        
                        {/* Subtitle */}
                        {banner.subtitle && (
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.4)' }}>
                            {banner.subtitle}
                          </h3>
                        )}
                        
                        {/* Description */}
                        {banner.description && (
                          <p className="text-base sm:text-lg lg:text-xl text-white max-w-md leading-relaxed" style={{ textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)' }}>
                            {banner.description}
                          </p>
                        )}
                        
                        {/* CTA Button */}
                        {banner.cta && (
                          <div className="pt-4 sm:pt-6">
                            <button className="bg-black text-white px-12 sm:px-16 lg:px-20 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:bg-gray-800 transition-colors uppercase tracking-wider shadow-lg">
                              {banner.cta}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 sm:w-14 h-12 sm:h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all z-10"
          aria-label="Previous"
        >
          <svg className="w-6 sm:w-7 h-6 sm:h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 sm:w-14 h-12 sm:h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all z-10"
          aria-label="Next"
        >
          <svg className="w-6 sm:w-7 h-6 sm:h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? "bg-black w-8" : "bg-gray-400"
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
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const collections = [
    { id: 1, title: "Winter-Ready Skincare", image: "/collection-winter-skincare.jpg" },
    { id: 2, title: "Best Sellers", image: "/collection-best-sellers.jpg" },
    { id: 3, title: "New Arrivals", image: "/collection-new-arrivals.jpg" },
    { id: 4, title: "Sun Care", image: "/collection-sun-care.jpg" },
    { id: 5, title: "Facial Cleanser", image: "/collection-facial-cleanser.jpg" },
    { id: 6, title: "Makeup Remover", image: "/collection-makeup-remover.jpg" },
    { id: 7, title: "Toner Pads", image: "/collection-toner-pads.jpg" },
    { id: 8, title: "Serum & Ampoule", image: "/collection-serum-ampoule.jpg" },
    { id: 9, title: "Toner & Essence", image: "/collection-toner-essence.jpg" },
    { id: 10, title: "Face Masks", image: "/collection-face-masks.jpg" },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(collections.length / itemsPerPage);
  
  const currentCollections = collections.slice(
    collectionIndex * itemsPerPage,
    (collectionIndex + 1) * itemsPerPage
  );

  const goToPreviousCollection = () => {
    setCollectionIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToNextCollection = () => {
    setCollectionIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Shop By Collection
        </h2>
        
        {/* Dot Indicators */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCollectionIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === collectionIndex ? "bg-black w-2.5" : "bg-gray-300"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Navigation Arrows - Show on hover */}
        {isHovered && collectionIndex > 0 && (
          <button
            onClick={goToPreviousCollection}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white border-2 border-gray-300 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all z-10"
            aria-label="Previous collections"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        {isHovered && collectionIndex < totalPages - 1 && (
          <button
            onClick={goToNextCollection}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border-2 border-gray-300 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all z-10"
            aria-label="Next collections"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Collection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {currentCollections.map((collection) => (
            <button
              key={collection.id}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Circle Image Container */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 mb-4 transition-transform group-hover:scale-105">
                <div 
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url('${collection.image}')`,
                    backgroundColor: '#f5f5f5'
                  }}
                />
              </div>
              
              {/* Title */}
              <p className="text-sm sm:text-base text-center font-medium text-gray-700 max-w-[140px] leading-snug">
                {collection.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== Trending Section ==========
function TrendingSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const trendingProducts = [
    {
      id: 1,
      label: "All",
      title: "Skincare",
      subtitle: "Shop all",
      isDark: true,
      mainImage: "/trending-korean-devices.jpg",
      hoverImage: "",
      disableHover: true,
    },
    {
      id: 2,
      label: "Ultimate 6-In-1",
      title: "Booster Pro",
      ctaText: "SHOP NOW",
      isDark: false,
      mainImage: "/trending-booster-pro.jpg",
      hoverImage: "/trending-booster-pro-hover.jpg",
      disableHover: false,
    },
    {
      id: 3,
      label: "High-Tech Dual Energy",
      title: "Ultra Tune 40.68",
      ctaText: "SHOP NOW",
      isDark: false,
      mainImage: "/trending-ultra-tune.jpg",
      hoverImage: "/trending-ultra-tune-hover.jpg",
      disableHover: false,
    },
    {
      id: 4,
      label: "Portable And Easy To Use",
      title: "Mini Booster Pro",
      ctaText: "SHOP NOW",
      isDark: false,
      mainImage: "/trending-mini-booster.jpg",
      hoverImage: "/trending-mini-booster-hover.jpg",
      disableHover: false,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {trendingProducts.map((product) => {
          const isFirst = product.id === 1;

          return (
            <div
              key={product.id}
              className={`relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer transition-all
                ${isFirst ? "shadow-2xl" : "border-2 border-gray-300 hover:shadow-xl"}
              `}
              onMouseEnter={() =>
                !product.disableHover && setHoveredCard(product.id)
              }
              onMouseLeave={() =>
                !product.disableHover && setHoveredCard(null)
              }
            >
              {/* Background Image */}
              <div
                className={`absolute inset-0 bg-cover bg-center ${
                  product.disableHover
                    ? ""
                    : `transition-opacity duration-500 ${
                        hoveredCard === product.id
                          ? "opacity-0"
                          : "opacity-100"
                      }`
                }`}
                style={{
                  backgroundImage: `url('${product.mainImage}')`,
                }}
              />

              {/* Hover Image (non-first cards) */}
              {!product.disableHover && (
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                    hoveredCard === product.id
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  style={{
                    backgroundImage: `url('${product.hoverImage}')`,
                  }}
                />
              )}

              {/* Readability overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-transparent" />

              {/* Content */}
              <div className="relative z-10 h-full px-6 pt-8 pb-6 flex flex-col justify-between">
                {/* Text */}
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-gray-200">
                    {product.label}
                  </p>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {product.title}
                  </h3>

                  {product.subtitle && (
                    <p className="text-sm sm:text-base text-gray-200">
                      {product.subtitle}
                    </p>
                  )}
                </div>

                {/* CTA */}
                {isFirst ? (
                  // ✅ First card: circular arrow button
                  <button
                    aria-label="View all"
                    className="self-end w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 transition"
                  >
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ) : (
                  // Other cards: SHOP NOW
                  <button
                    className={`w-full py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-semibold transition-all ${
                      product.isDark
                        ? "bg-black text-white hover:bg-gray-900"
                        : "bg-pink-200 text-black hover:bg-pink-300"
                    }`}
                  >
                    {product.ctaText}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}



// ========== Product Grid Section ==========
function ProductGridSection({
  title,
  products,
}: {
  title: string;
  products: any[];
}) {
  const [productIndex, setProductIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    productIndex * itemsPerPage,
    (productIndex + 1) * itemsPerPage
  );

  const goToPrevious = () => {
    setProductIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToNext = () => {
    setProductIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // ✅ Banner image mapping
  const bannerImage =
    title.toLowerCase() === "skincare"
      ? "/skincarebanner-beauty.jpg"
      : title.toLowerCase() === "makeup"
      ? "/makeupbanner-beauty.jpg"
      : `/${title.toLowerCase()}-banner.jpg`;

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-black">
          {title}
        </h2>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setProductIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === productIndex ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left Banner */}
        <div className="lg:col-span-1 relative rounded-2xl overflow-hidden aspect-[3/4]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${bannerImage}')`,
            }}
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative h-full p-6 flex flex-col justify-between">
            <div className="text-white">
              <p className="text-xs mb-1">All</p>
              <h3 className="text-3xl font-bold">{title}</h3>
              <p className="text-sm mt-1">Shop all</p>
            </div>

            <button className="self-end w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-4 relative">
          {/* Arrows */}
          {isHovered && productIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow z-10"
            >
              ‹
            </button>
          )}

          {isHovered && productIndex < totalPages - 1 && (
            <button
              onClick={goToNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow z-10"
            >
              ›
            </button>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {currentProducts.map((product) => (
              <div key={product.id} className="cursor-pointer">
                {/* Image Card */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3 group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* New badge */}
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                      New
                    </div>
                  )}

                  {/* Heart */}
                  <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center">
                    ♡
                  </button>

                  {/* ADD TO CART (hover) */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="w-full bg-white text-black text-sm font-medium py-2.5 rounded-lg shadow hover:bg-gray-100">
                      ADD TO CART
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">
                    {product.brand}
                  </p>
                  <p className="text-sm font-medium text-black line-clamp-2">
                    {product.name}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-base font-bold text-black">
                      {product.price}
                    </p>
                    {product.stock && (
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                        In stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
    </main>
  );
}