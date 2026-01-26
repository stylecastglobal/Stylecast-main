"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { brands } from "@/app/data/brandsData";

type ApiProduct = {
  id: number;
  title: string;
  handle: string;
  image: string | null;
  images: string[];
  price: string | null;
  officialUrl: string;
};

type BrandProduct = ApiProduct & {
  brandSlug: string;
};

export default function Home() {
  const lookbookScrollRef = useRef<HTMLDivElement | null>(null);
  const [newDrops, setNewDrops] = useState<BrandProduct[]>([]);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

  const handleLookbookNext = () => {
    if (!lookbookScrollRef.current) return;
    lookbookScrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
  };
  const handleLookbookPrev = () => {
    if (!lookbookScrollRef.current) return;
    lookbookScrollRef.current.scrollBy({ left: -260, behavior: "smooth" });
  };
  const toggleLike = (id: number) => {
    setLikedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    let isMounted = true;
    const brandSlugs = ["glowny", "aime-leon-dore", "scuffers"];

    const loadNewDrops = async () => {
      const results = await Promise.allSettled(
        brandSlugs.map((slug) =>
          fetch(`/api/brands/${slug}`).then((res) =>
            res.ok ? res.json() : null
          )
        )
      );

      const items: BrandProduct[] = [];
      results.forEach((result, index) => {
        if (result.status !== "fulfilled" || !result.value?.products) return;
        const slug = brandSlugs[index];
        result.value.products.forEach((product: ApiProduct) => {
          items.push({ ...product, brandSlug: slug });
        });
      });

      if (isMounted) {
        setNewDrops(items);
      }
    };

    loadNewDrops();
    return () => {
      isMounted = false;
    };
  }, []);

  const brandBySlug = new Map(brands.map((brand) => [brand.slug, brand]));
  const newDropItems = newDrops.slice(0, 10);
  const newDropLoopItems =
    newDropItems.length > 0 ? [...newDropItems, ...newDropItems] : [];
  const formatPrice = (price?: string | null) => {
    if (!price) return "—";
    const numeric = Number(String(price).replace(/,/g, ""));
    if (Number.isNaN(numeric)) return price;
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(numeric);
  };

  const lookbookCards = [
    { id: 1, title: "Casual", image: "/women-grid-1.jpg", season: "Winter 2025" },
    { id: 2, title: "Airport Outfit", image: "/women-grid-2.jpg", season: "Winter 2025" },
    { id: 3, title: "Office Ready", image: "/women-grid3.jpg", season: "Winter 2025" },
    { id: 4, title: "Weekend Vibes", image: "/women-grid-4.jpg", season: "Winter 2025" },
    { id: 5, title: "Date Night", image: "/women-grid-5.jpg", season: "Winter 2025" },
    { id: 6, title: "Street Style", image: "/women-grid-6.jpg", season: "Winter 2025" },
  ];

  return (
    <main className="min-h-screen bg-white text-[#111111]">

{/* ===== GLOBAL TOP BANNER ===== */}
<section className="w-full bg-white text-black h-[50px] flex items-center justify-center text-sm md:text-base px-4 border-b border-gray-200">
  <div id="bannerText" className="opacity-100 transition-opacity duration-500 font-medium">
    10% Off First Order | 7 Days Only | Code: WLCM2MSS
  </div>

  <script
    dangerouslySetInnerHTML={{
      __html: `
        const bannerMessages = [
          "10% Off First Order | 7 Days Only | Code: WLCM2MSS",
          "Free Shipping on Orders Over $75",
          "New Season Arrivals — Shop the Drop!",
        ];

        let currentIndex = 0;
        const bannerEl = document.getElementById("bannerText");

        function rotateBanner() {
          if (!bannerEl) return;
          bannerEl.style.opacity = 0;

          setTimeout(() => {
            currentIndex = (currentIndex + 1) % bannerMessages.length;
            bannerEl.textContent = bannerMessages[currentIndex];
            bannerEl.style.opacity = 1;
          }, 500);
        }

        setInterval(rotateBanner, 3000);
      `,
    }}
  />
</section>

    
{/* ===== HERO SECTION (Video as full background) ===== */}
<section className="relative w-full h-[55vh] flex items-center justify-center text-center overflow-hidden">
  <video
    className="absolute inset-0 w-full h-full object-cover brightness-75"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/hero.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/40"></div>

  <div className="relative z-10 max-w-5xl px-6">
    <h1 className="text-white font-semibold text-[4.5vw] md:text-[3vw] lg:text-[2.5vw] leading-[1.15] tracking-tight drop-shadow-[0_8px_18px_rgba(0,0,0,0.9)]">
      THE PLACE TO SHOP<br />
      THE STYLES YOU LOVE.<br />
      WELCOME TO STYLECAST.
    </h1>
  </div>
</section>

{/* ===== NEW DROPS SECTION ===== */}
<section className="w-full py-12 bg-gray-50 overflow-hidden">
  
  {/* Header */}
  <div className="flex items-center justify-between px-6 mb-6 max-w-[1600px] mx-auto">
    <h2 className="text-3xl font-semibold tracking-wide text-[#111]">
      New Drops
    </h2>
    <a href="/new-drops" className="text-sm text-[#111] opacity-70 hover:opacity-100 transition">
      View All →
    </a>
  </div>

  {/* Auto-sliding carousel with CSS animation */}
  <div className="relative">
    <div 
      className="flex gap-6 animate-slide"
      style={{
        width: 'fit-content',
      }}
    >
      {newDropLoopItems.length > 0 ? (
        newDropLoopItems.map((item, i) => {
          const brand = brandBySlug.get(item.brandSlug);
          const image = item.image || item.images?.[0] || "/product-1.jpg";

          return (
            <Link 
              key={`${item.id}-${i}`} 
              href={item.officialUrl || (brand ? `/brands/${brand.slug}` : "/brands")}
              className="group relative bg-white overflow-hidden hover:shadow-lg transition-all duration-300 flex-shrink-0 w-[220px]"
            >
              {/* Heart Icon */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleLike(item.id);
              }}
              className="absolute top-3 right-3 z-10 h-10 w-10 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition"
              aria-label="Like product"
              aria-pressed={likedProducts.has(item.id)}
            >
              <svg 
                className="w-5 h-5 text-gray-900" 
                viewBox="0 0 24 24"
                fill={likedProducts.has(item.id) ? "currentColor" : "none"}
                stroke="currentColor" 
                strokeWidth={1.8}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M4.318 6.318a4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </button>

              {/* Product Image */}
              <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                <img 
                  src={image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-3 bg-white">
                <p className="text-[10px] text-gray-500 mb-1 font-medium">
                  {brand?.name ?? "STYLECAST"}
                </p>
                <h3 className="text-xs font-semibold text-[#111] mb-1.5 leading-tight line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="text-sm font-bold text-red-600">NEW</span>
                  <span className="text-sm font-bold text-[#111]">{formatPrice(item.price)}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-red-500">❤️ {brand?.favorites ?? "—"}</span>
                  <span className="text-orange-500">⭐ Just Arrived</span>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`newdrop-skeleton-${i}`}
            className="bg-white border border-gray-100 flex-shrink-0 w-[220px] overflow-hidden"
          >
            <div className="w-full aspect-[3/4] bg-gray-100 animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))
      )}

    </div>
  </div>

  {/* CSS Animation */}
  <style jsx>{`
    @keyframes slide {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .animate-slide {
      animation: slide 40s linear infinite;
    }

    .animate-slide:hover {
      animation-play-state: paused;
    }

    .lookbook-scroll {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .lookbook-scroll::-webkit-scrollbar {
      display: none;
    }
  `}</style>

</section>

{/* ===== LOOKBOOK CARDS SECTION ===== */}
<section className="w-full py-12 bg-gray-50">

  {/* Header */}
  <div className="flex items-center justify-between px-6 mb-6 max-w-[1600px] mx-auto">
    <h2 className="text-3xl font-semibold tracking-wide text-[#111]">
      Lookbook
    </h2>
    <a href="/lookbook" className="text-sm text-[#111] opacity-70 hover:opacity-100 transition">
      View All →
    </a>
  </div>

  <div className="px-6 max-w-[1600px] mx-auto">
    <div className="relative">
      <div
        ref={lookbookScrollRef}
        className="lookbook-scroll flex gap-6 overflow-x-auto scroll-smooth pr-12"
      >
      {lookbookCards.map((item) => (
        <Link
          key={item.id}
          href={`/lookbook/women/${item.id}`}
          className="group flex-shrink-0 w-[260px] cursor-pointer"
        >
          <div className="relative aspect-[3/5] rounded-2xl overflow-hidden bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Text content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white/70 text-xs font-medium tracking-wider uppercase mb-1">
                {item.season}
              </p>
              <h3 className="text-white text-xl font-semibold">
                {item.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
      </div>

      <button
        type="button"
        onClick={handleLookbookNext}
        className="absolute -right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition flex items-center justify-center text-xl text-gray-700"
        aria-label="Next lookbooks"
      >
        ›
      </button>
      <button
        type="button"
        onClick={handleLookbookPrev}
        className="absolute -left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition flex items-center justify-center text-xl text-gray-700"
        aria-label="Previous lookbooks"
      >
        ‹
      </button>
    </div>
  </div>
</section>

{/* ===== PRODUCT GRID SECTION ===== */}
<section id="products" className="w-full py-12 bg-white">

  {/* FILTER BAR */}
  <div className="max-w-[1600px] mx-auto px-6 mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
    <div className="flex items-center gap-6">
      <button className="text-sm font-medium">Product ▾</button>
      <button className="text-sm font-medium">Size ▾</button>
      <button className="text-sm font-medium">Color ▾</button>
    </div>
    <button className="text-sm font-medium">Sort by: Popular ▾</button>
  </div>

  {/* PRODUCT GRID - 6 columns x 6 rows */}
  <div className="max-w-[1600px] mx-auto px-6">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

      {[
        { img: "/product-1.jpg", brand: "ZARA", title: "Cropped Fringe Jacket", discount: "30%", price: "89,900원", likes: "12만", rating: "4.8", reviews: "5.2만+" },
        { img: "/product-2.jpg", brand: "MANGO", title: "Leather Wide Pants", discount: "25%", price: "129,900원", likes: "15만", rating: "4.9", reviews: "6.8만+" },
        { img: "/product-3.jpg", brand: "COS", title: "Wide Tuck Pants", discount: "20%", price: "109,900원", likes: "9.5만", rating: "4.7", reviews: "4.3만+" },
        { img: "/product-4.jpg", brand: "H&M", title: "Fitted Knit Top", discount: "35%", price: "39,900원", likes: "18만", rating: "4.8", reviews: "9.1만+" },
        { img: "/product-5.jpg", brand: "UNIQLO", title: "Cargo Detail Pants", discount: "15%", price: "59,900원", likes: "14만", rating: "4.9", reviews: "7.5만+" },
        { img: "/product-6.jpg", brand: "PULL&BEAR", title: "Half Storm Jumper", discount: "28%", price: "69,900원", likes: "10만", rating: "4.6", reviews: "4.9万+" },
        
        { img: "/product-7.jpg", brand: "MASSIMO DUTTI", title: "Oversized Leather Coat", discount: "32%", price: "249,900원", likes: "16万", rating: "4.9", reviews: "8.3万+" },
        { img: "/product-8.jpg", brand: "BERSHKA", title: "Wind Detail Shirt", discount: "22%", price: "49,900원", likes: "11万", rating: "4.7", reviews: "5.6万+" },
        { img: "/product-9.jpg", brand: "STRADIVARIUS", title: "Cropped Denim Jumper", discount: "26%", price: "79,900원", likes: "13万", rating: "4.8", reviews: "6.2万+" },
        { img: "/product-10.jpg", brand: "ZARA", title: "Destroyed Knit Top", discount: "18%", price: "59,900원", likes: "9.8万", rating: "4.6", reviews: "4.7万+" },
        { img: "/product-1.jpg", brand: "ARKET", title: "Ribbed Cashmere Sweater", discount: "30%", price: "189,900원", likes: "12万", rating: "4.9", reviews: "5.9万+" },
        { img: "/product-2.jpg", brand: "WEEKDAY", title: "High Waist Denim", discount: "24%", price: "89,900원", likes: "15万", rating: "4.8", reviews: "7.3万+" },

        { img: "/product-3.jpg", brand: "& OTHER STORIES", title: "Wool Blend Coat", discount: "35%", price: "219,900원", likes: "14万", rating: "4.9", reviews: "6.8万+" },
        { img: "/product-4.jpg", brand: "MONKI", title: "Oversized Blazer", discount: "28%", price: "99,900원", likes: "11万", rating: "4.7", reviews: "5.4万+" },
        { img: "/product-5.jpg", brand: "COS", title: "Pleated Midi Skirt", discount: "20%", price: "129,900원", likes: "10万", rating: "4.8", reviews: "4.9万+" },
        { img: "/product-6.jpg", brand: "ZARA", title: "Textured Knit Cardigan", discount: "25%", price: "69,900원", likes: "16万", rating: "4.9", reviews: "8.1万+" },
        { img: "/product-7.jpg", brand: "MANGO", title: "Satin Slip Dress", discount: "30%", price: "109,900원", likes: "13万", rating: "4.8", reviews: "6.5万+" },
        { img: "/product-8.jpg", brand: "H&M", title: "Relaxed Fit Jeans", discount: "22%", price: "49,900원", likes: "18万", rating: "4.7", reviews: "9.3万+" },

        { img: "/product-9.jpg", brand: "UNIQLO", title: "Heattech Turtleneck", discount: "15%", price: "29,900원", likes: "20万", rating: "4.9", reviews: "11万+" },
        { img: "/product-10.jpg", brand: "PULL&BEAR", title: "Puffer Vest", discount: "32%", price: "79,900원", likes: "12万", rating: "4.8", reviews: "6.1万+" },
        { img: "/product-1.jpg", brand: "BERSHKA", title: "Cropped Hoodie", discount: "26%", price: "39,900원", likes: "14万", rating: "4.7", reviews: "7.2万+" },
        { img: "/product-2.jpg", brand: "STRADIVARIUS", title: "Wide Leg Trousers", discount: "28%", price: "59,900원", likes: "11万", rating: "4.8", reviews: "5.8万+" },
        { img: "/product-3.jpg", brand: "MASSIMO DUTTI", title: "Silk Blend Shirt", discount: "20%", price: "149,900원", likes: "9.5万", rating: "4.9", reviews: "4.6万+" },
        { img: "/product-4.jpg", brand: "ARKET", title: "Merino Wool Sweater", discount: "35%", price: "169,900원", likes: "13万", rating: "4.9", reviews: "6.4万+" },

        { img: "/product-5.jpg", brand: "WEEKDAY", title: "Straight Denim Jacket", discount: "24%", price: "89,900원", likes: "15万", rating: "4.8", reviews: "7.6万+" },
        { img: "/product-6.jpg", brand: "& OTHER STORIES", title: "Leather Midi Skirt", discount: "30%", price: "199,900원", likes: "10万", rating: "4.9", reviews: "5.1万+" },
        { img: "/product-7.jpg", brand: "MONKI", title: "Oversized Sweatshirt", discount: "18%", price: "49,900원", likes: "17万", rating: "4.7", reviews: "8.9万+" },
        { img: "/product-8.jpg", brand: "COS", title: "Tailored Wool Pants", discount: "25%", price: "139,900원", likes: "12万", rating: "4.8", reviews: "6.3万+" },
        { img: "/product-9.jpg", brand: "ZARA", title: "Quilted Crossbody Bag", discount: "28%", price: "69,900원", likes: "14万", rating: "4.9", reviews: "7.1万+" },
        { img: "/product-10.jpg", brand: "MANGO", title: "Chunky Knit Scarf", discount: "22%", price: "39,900원", likes: "11万", rating: "4.6", reviews: "5.5万+" },

        { img: "/product-1.jpg", brand: "H&M", title: "Ribbed Tank Top", discount: "15%", price: "19,900원", likes: "19万", rating: "4.7", reviews: "10万+" },
        { img: "/product-2.jpg", brand: "UNIQLO", title: "Ultra Light Down Jacket", discount: "32%", price: "119,900원", likes: "16万", rating: "4.9", reviews: "8.7万+" },
        { img: "/product-3.jpg", brand: "PULL&BEAR", title: "Faux Leather Pants", discount: "26%", price: "69,900원", likes: "13万", rating: "4.8", reviews: "6.6万+" },
        { img: "/product-4.jpg", brand: "BERSHKA", title: "Graphic Print Tee", discount: "20%", price: "29,900원", likes: "15万", rating: "4.7", reviews: "7.8万+" },
        { img: "/product-5.jpg", brand: "STRADIVARIUS", title: "Platform Chelsea Boots", discount: "35%", price: "89,900원", likes: "12万", rating: "4.9", reviews: "6.1万+" },
        { img: "/product-6.jpg", brand: "MASSIMO DUTTI", title: "Cashmere Blend Coat", discount: "30%", price: "349,900원", likes: "10万", rating: "4.9", reviews: "4.9万+" },

      ].map((item, i) => (
        <Link 
          key={i} 
          href="/product/sample"
          className="group relative bg-white overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          {/* Heart Icon */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white transition-all"
          >
            <svg 
              className="w-4 h-4 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </button>

          {/* Product Image */}
          <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
            <img 
              src={item.img} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Info */}
          <div className="p-3 bg-white">
            <p className="text-[10px] text-gray-500 mb-1 font-medium">{item.brand}</p>
            <h3 className="text-xs font-semibold text-[#111] mb-1.5 leading-tight line-clamp-2">
              {item.title}
            </h3>
            <div className="flex items-baseline gap-1.5 mb-1.5">
              <span className="text-sm font-bold text-red-600">{item.discount}</span>
              <span className="text-sm font-bold text-[#111]">{item.price}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-red-500">❤️ {item.likes}</span>
              <span className="text-orange-500">⭐ {item.rating}({item.reviews})</span>
            </div>
          </div>
        </Link>
      ))}

    </div>
  </div>
</section>


{/* ===== TOP 50 HAUL SECTION ===== */}
<section className="w-full py-20 bg-gray-50 border-t border-gray-200 overflow-hidden">
  <div className="max-w-[1600px] mx-auto px-6">
    
    {/* Header */}
    <h2 className="text-3xl font-semibold mb-10 text-[#111]">
      Top 50 for Your First StyleCast Haul
    </h2>

    {/* Auto-sliding carousel with CSS animation */}
    <div className="relative">
      <div 
        className="flex gap-6 animate-slide-top50"
        style={{
          width: 'fit-content',
        }}
      >
        {/* First set of products */}
        {[
          { 
            img: "/product-1.jpg", 
            brand: "LIKE THE MOST", 
            title: "Two tuck long side over pants_charcoal",
            originalPrice: "$51",
            discount: "49%",
            price: "$26"
          },
          { 
            img: "/product-2.jpg", 
            brand: "GAKKAI UNIONS", 
            title: "Pocket gamer pigment short sleeve t-shirt khaki m...",
            originalPrice: "$35",
            discount: "31%",
            price: "$24"
          },
          { 
            img: "/product-3.jpg", 
            brand: "NODU", 
            title: "Soft henley neck round long sleeve knit [4 colors]",
            originalPrice: "$39",
            discount: "28%",
            price: "$28"
          },
          { 
            img: "/product-4.jpg", 
            brand: "DRIX", 
            title: "Special overfit short sleeve t-shirt_5 colors",
            originalPrice: "$28",
            discount: "32%",
            price: "$19"
          },
          { 
            img: "/product-5.jpg", 
            brand: "MINIMALWORK", 
            title: "Wide fit cargo pants [4 colors]",
            originalPrice: "$45",
            discount: "35%",
            price: "$29"
          },
          { 
            img: "/product-6.jpg", 
            brand: "BASIC COTTON", 
            title: "Premium heavyweight crew neck sweatshirt",
            originalPrice: "$42",
            discount: "40%",
            price: "$25"
          },
          { 
            img: "/product-1.jpg", 
            brand: "LIKE THE MOST", 
            title: "Two tuck long side over pants_charcoal",
            originalPrice: "$51",
            discount: "49%",
            price: "$26"
          },
          { 
            img: "/product-2.jpg", 
            brand: "GAKKAI UNIONS", 
            title: "Pocket gamer pigment short sleeve t-shirt khaki m...",
            originalPrice: "$35",
            discount: "31%",
            price: "$24"
          },
        ].map((item, i) => (
          <div 
            key={i}
            className="flex-shrink-0 w-[220px] group"
          >
            <Link href="/product/sample" className="block">
              {/* Product Image */}
              <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Heart Icon */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white transition-all"
                >
                  <svg 
                    className="w-5 h-5 text-gray-700" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </button>

                {/* Color Dots (for 4th item) */}
                {i === 3 && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-300 border border-gray-400"></div>
                    <div className="w-4 h-4 rounded-full bg-green-800 border border-gray-400"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-600 border border-gray-400"></div>
                    <div className="w-4 h-4 rounded-full bg-black border border-gray-400"></div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <p className="text-xs font-bold text-[#111] mb-1 uppercase">{item.brand}</p>
                <h3 className="text-sm text-[#111] mb-2 leading-tight line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                  <span className="text-sm font-bold text-red-600">{item.discount}</span>
                </div>
                <p className="text-lg font-bold text-red-600 mt-1">{item.price}</p>
              </div>
            </Link>
          </div>
        ))}

        {/* Duplicate set for seamless infinite loop */}
        {[
          { 
            img: "/product-1.jpg", 
            brand: "LIKE THE MOST", 
            title: "Two tuck long side over pants_charcoal",
            originalPrice: "$51",
            discount: "49%",
            price: "$26"
          },
          { 
            img: "/product-2.jpg", 
            brand: "GAKKAI UNIONS", 
            title: "Pocket gamer pigment short sleeve t-shirt khaki m...",
            originalPrice: "$35",
            discount: "31%",
            price: "$24"
          },
          { 
            img: "/product-3.jpg", 
            brand: "NODU", 
            title: "Soft henley neck round long sleeve knit [4 colors]",
            originalPrice: "$39",
            discount: "28%",
            price: "$28"
          },
          { 
            img: "/product-4.jpg", 
            brand: "DRIX", 
            title: "Special overfit short sleeve t-shirt_5 colors",
            originalPrice: "$28",
            discount: "32%",
            price: "$19"
          },
          { 
            img: "/product-5.jpg", 
            brand: "MINIMALWORK", 
            title: "Wide fit cargo pants [4 colors]",
            originalPrice: "$45",
            discount: "35%",
            price: "$29"
          },
          { 
            img: "/product-6.jpg", 
            brand: "BASIC COTTON", 
            title: "Premium heavyweight crew neck sweatshirt",
            originalPrice: "$42",
            discount: "40%",
            price: "$25"
          },
          { 
            img: "/product-1.jpg", 
            brand: "LIKE THE MOST", 
            title: "Two tuck long side over pants_charcoal",
            originalPrice: "$51",
            discount: "49%",
            price: "$26"
          },
          { 
            img: "/product-2.jpg", 
            brand: "GAKKAI UNIONS", 
            title: "Pocket gamer pigment short sleeve t-shirt khaki m...",
            originalPrice: "$35",
            discount: "31%",
            price: "$24"
          },
        ].map((item, i) => (
          <div 
            key={`dup-${i}`}
            className="flex-shrink-0 w-[220px] group"
          >
            <Link href="/product/sample" className="block">
              {/* Product Image */}
              <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Heart Icon */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white transition-all"
                >
                  <svg 
                    className="w-5 h-5 text-gray-700" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </button>

                {/* Color Dots (for 4th item) */}
                {i === 3 && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-300 border border-gray-400"></div>
                    <div className="w-4 h-4 rounded-full bg-green-800 border border-gray-400"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-600 border border-gray-400"></div>
                    <div className="w-4 h-4 rounded-full bg-black border border-gray-400"></div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <p className="text-xs font-bold text-[#111] mb-1 uppercase">{item.brand}</p>
                <h3 className="text-sm text-[#111] mb-2 leading-tight line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                  <span className="text-sm font-bold text-red-600">{item.discount}</span>
                </div>
                <p className="text-lg font-bold text-red-600 mt-1">{item.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* CSS Animation */}
  <style jsx>{`
    @keyframes slide-top50 {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .animate-slide-top50 {
      animation: slide-top50 40s linear infinite;
    }

    .animate-slide-top50:hover {
      animation-play-state: paused;
    }
  `}</style>
</section>



{/* ===== AI FEATURES BANNERS (BENTO GRID) ===== */}
<section className="w-full border-t border-gray-200 bg-white py-20 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* LEFT: SCAN & TRY BANNER */}
    <div className="flex flex-row items-center justify-between gap-8 p-8 bg-white border border-gray-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-all h-[280px]">
      
      {/* Barcode Graphic */}
      <div className="flex-shrink-0">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="20" width="4" height="80" fill="#111111"/>
          <rect x="12" y="20" width="2" height="80" fill="#111111"/>
          <rect x="18" y="20" width="6" height="80" fill="#111111"/>
          <rect x="28" y="20" width="2" height="80" fill="#111111"/>
          <rect x="34" y="20" width="4" height="80" fill="#111111"/>
          <rect x="42" y="20" width="2" height="80" fill="#111111"/>
          <rect x="48" y="20" width="6" height="80" fill="#111111"/>
          <rect x="58" y="20" width="4" height="80" fill="#111111"/>
          <rect x="66" y="20" width="2" height="80" fill="#111111"/>
          <rect x="72" y="20" width="6" height="80" fill="#111111"/>
          <rect x="82" y="20" width="2" height="80" fill="#111111"/>
          <rect x="88" y="20" width="4" height="80" fill="#111111"/>
        </svg>
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <p className="inline-flex items-center rounded-full bg-black text-white px-3 py-1 text-xs font-medium uppercase tracking-wide mb-3">
          Scan & Try
        </p>

        <h2 className="text-2xl font-semibold text-[#111111] leading-tight mb-3">
          Scan Any Beauty Product,<br />Try It Instantly
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          See reviews, get instant AI insights, check ingredients, and try it on virtually.
        </p>

        <Link
          href="/product-scanner"
          className="inline-flex items-center text-sm font-medium text-black hover:underline"
        >
          Start Scanning →
        </Link>
      </div>
    </div>

    {/* RIGHT: PERSONAL COLOR BANNER */}
    <div className="flex flex-col justify-between gap-4 p-8 bg-white border border-gray-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-all h-[280px]">

      <div>
        <p className="inline-flex items-center rounded-full bg-black text-white px-3 py-1 text-xs font-medium uppercase tracking-wide mb-3">
          AI Personal Color
        </p>

        <h2 className="text-2xl font-semibold text-[#111111] leading-tight mb-3">
          Discover Your True<br />Personal Color
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          AI analyzes your skin tone to determine your exact{" "}
          <span className="font-semibold text-[#111111]">12-tone color type</span>.
        </p>

        {/* CHIPS */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#111111]">
          <span className="rounded-full border border-gray-300 px-2.5 py-1">Spring</span>
          <span className="rounded-full border border-gray-300 px-2.5 py-1">Summer</span>
          <span className="rounded-full border border-gray-300 px-2.5 py-1">Autumn</span>
          <span className="rounded-full border border-gray-300 px-2.5 py-1">Winter</span>
        </div>
      </div>

      <Link
        href="/personal-color"
        className="inline-flex items-center text-sm font-medium text-black hover:underline w-fit"
      >
        Start Free Test →
      </Link>
    </div>

  </div>
</section>


{/* ===== PEOPLE FEED SECTION ===== */}
<section id="people-feed" className="w-full py-24 bg-white border-t border-gray-200">

  {/* HEADER */}
  <div className="flex items-center justify-between px-6 mb-12 max-w-[1600px] mx-auto">
    <h2 className="text-3xl font-semibold tracking-wide text-[#111]">
      Feed
    </h2>

    <a href="/feed" className="text-sm text-[#111] opacity-70 hover:opacity-100 transition">
      View All →
    </a>
  </div>

  {/* GRID FEED */}
  <div className="px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">

    {[
      "/feed-1.jpg",
      "/feed-2.jpg",
      "/feed-3.jpg",
      "/feed-4.jpg",
      "/feed-5.jpg",
      "/feed-6.jpg",
      "/feed-7.jpg",
      "/feed-8.jpg",
    ].map((src, i) => (
      <div
        key={i}
        className="relative w-full h-[260px] md:h-[300px] rounded-2xl overflow-hidden bg-gray-100 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group"
      >
        <img
          src={src}
          alt={`Feed post ${i + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

        {/* Username overlay */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
          @user{i + 1}
        </div>
      </div>
    ))}

  </div>
</section>



    </main>
  );
}