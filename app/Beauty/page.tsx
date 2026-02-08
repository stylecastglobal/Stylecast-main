"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
      image: "/anuabanner-beauty1.jpg", // Replace with actual image path
    },
    {
      id: 2,
      title: "Dasique",
      subtitle: "Eyeshadow Palette",
      cta: "SHOP NOW",
      image: "/rhodebanner-beauty.jpg", // Replace with actual image path
    },
    {
      id: 3,
      title: "Cream De Rose Lip Tint",
      description:
        "Inspired by the beautiful colors of roses, this lip tint is a celebration of romance and elegance. Each shade is carefully crafted to mimic the delicate hues found in roses, from soft pinks to deep, velvety reds.",
      cta: "SHOP NOW",
      image: "/dasiquebanner-beauty1.jpg",
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
                <div className="absolute inset-0">
                  {banner.cta && (
                    <>
                      {banner.id === 2 ? (
                        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-10 flex flex-col items-end gap-4 max-w-xs sm:max-w-sm">
                          <button className="bg-white text-black px-12 sm:px-16 lg:px-20 py-3 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-wider shadow-lg transition-colors hover:bg-gray-100">
                            {banner.cta}
                          </button>
                          <p className="text-xs sm:text-sm text-white/95 text-right leading-relaxed drop-shadow max-w-[360px] sm:max-w-[420px] text-balance">
                            Rhode is a line of curated skincare essentials. Formulated for a variety of
                            skin types and needs with high performance ingredients, it’s a daily routine
                            that nourishes your skin barrier over time.
                          </p>
                        </div>
                      ) : banner.id === 3 ? (
                        <div className="absolute top-8 left-14 sm:top-10 sm:left-20 lg:top-12 lg:left-24 max-w-sm sm:max-w-md text-left space-y-4">
                          <div className="space-y-2">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-tight">
                              {banner.title}
                            </h2>
                            {banner.description && (
                              <p className="text-xs sm:text-sm text-white/95 leading-relaxed">
                                {banner.description}
                              </p>
                            )}
                          </div>
                          <button className="bg-[#f7b6c2] text-white px-10 sm:px-12 lg:px-14 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg transition-colors hover:bg-[#efa2b1]">
                            {banner.cta}
                          </button>
                        </div>
                      ) : banner.id === 1 ? (
                        <button className="absolute left-[40%] top-[58%] -translate-x-1/2 bg-black text-white px-12 sm:px-16 lg:px-20 py-3 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-wider shadow-lg transition-colors hover:bg-gray-900">
                          {banner.cta}
                        </button>
                      ) : (
                        <button className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 bg-[#3f6f3a] text-white px-12 sm:px-16 lg:px-20 py-3 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-wider shadow-lg transition-colors hover:bg-[#345f31]">
                          {banner.cta}
                        </button>
                      )}
                    </>
                  )}
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
    {
      id: 1,
      title: "Winter-Ready Skincare",
      image: "/collection-winter-skincare.jpg",
      slug: "winter-ready-skincare",
    },
    {
      id: 2,
      title: "Best Sellers",
      image: "/collection-best-sellers.jpg",
      slug: "best-sellers",
    },
    {
      id: 3,
      title: "New Arrivals",
      image: "/collection-new-arrivals.jpg",
      slug: "new-arrivals",
    },
    { id: 4, title: "Sun Care", image: "/collection-sun-care.jpg", slug: "sun-care" },
    {
      id: 5,
      title: "Facial Cleanser",
      image: "/collection-facial-cleanser.jpg",
      slug: "facial-cleanser",
    },
    {
      id: 6,
      title: "Makeup Remover",
      image: "/collection-makeup-remover.jpg",
      slug: "makeup-remover",
    },
    { id: 7, title: "Toner Pads", image: "/collection-toner-pads.jpg", slug: "toner-pads" },
    {
      id: 8,
      title: "Serum & Ampoule",
      image: "/collection-serum-ampoule.jpg",
      slug: "serum-ampoule",
    },
    {
      id: 9,
      title: "Toner & Essence",
      image: "/collection-toner-essence.jpg",
      slug: "toner-essence",
    },
    { id: 10, title: "Face Masks", image: "/collection-face-masks.jpg", slug: "face-masks" },
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
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
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
            </Link>
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
      youtuber: "Beauty Lab",
      title: "Korean Autumn Mute Makeup",
      description: "#메이크업 #가을뮤트 #갈뮤메이크업 #makeup #Autumnmute #Autumnmutemakeup.",
      badge: "TRENDING",
      videoId: "RlftNO6Atf0",
      url: "https://youtu.be/RlftNO6Atf0?si=AcZF5LDnBCvV7M09",
    },
    {
      id: 2,
      youtuber: "Skin Notes",
      title: "Hailey Bieber’s Quick Everyday Morning Routine | Beauty Secrets | Vogue",
      description: "Hailey Bieber spends some time with Vogue to go over her streamlined, everyday morning beauty routine.",
      videoId: "9wdisivSWYU",
      url: "https://youtu.be/9wdisivSWYU?si=0eYCj1uai49Qrm0X",
    },
    {
      id: 3,
      youtuber: "Glow Guide",
      title: "Chic Soft Glam Everyday Makeup",
      description: "Get ready with me! Today's look is this chic soft glam that's been my everyday go-to makeup lately ♡ ",
      videoId: "g6geutlCWjM",
      url: "https://youtu.be/g6geutlCWjM?si=iFtygn2gdR6q1l39",
    },
    {
      id: 4,
      youtuber: "Beauty Reset",
      title: "NO MAKEUP MAKEUP ♡ Natural Everyday Makeup for Beginners",
      description: "This is my go-to (I'm not wearing any makeup) naturally pretty, effortless no makeup makeup look!",
      videoId: "vNpafKvDbzk",
      url: "https://youtu.be/vNpafKvDbzk?si=PcW59VDhQOolWtYa",
    },
    {
      id: 5,
      youtuber: "The Daily Edit",
      title: "clean girl makeup (no foundation)",
      description: "#cleangirl #cleangirlmakeup #nofoundation",
      videoId: "P3UJj3Dm7ao",
      url: "https://youtu.be/P3UJj3Dm7ao?si=8_KG7bRpSpZIWRLN",
    },
    {
      id: 6,
      youtuber: "Glow Room",
      title: "Madison Beer’s Guide to Soap Brows and Easy Blush | Beauty Secrets | Vogue",
      description: "Pop star Madison Beer gets real about her skin struggles over the years, and shares her perfected everyday beauty routine.",
      videoId: "9K_CZizKdVs",
      url: "https://youtu.be/9K_CZizKdVs?si=oY7Y3QYCov1RkWg7",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-black">
        RECOMMENDED BY BEAUTY EXPERTS
      </h2>

      <div className="relative">
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 scroll-smooth">
          {recommendations.map((rec) => (
            <a
              key={rec.id}
              href={rec.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group bg-white flex-shrink-0 w-[280px] sm:w-[320px]"
            >
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={`https://img.youtube.com/vi/${rec.videoId}/hqdefault.jpg`}
                  alt={rec.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 sm:w-8 h-6 sm:h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {rec.badge && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                    {rec.badge}
                  </div>
                )}

              </div>

              <div className="p-3 sm:p-4">
                <h3 className="text-xs sm:text-sm font-semibold text-black mb-2 line-clamp-2">
                  {rec.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {rec.description}
                </p>
              </div>
            </a>
          ))}
        </div>
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