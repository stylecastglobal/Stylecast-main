"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { brands } from "@/app/data/brandsData";
import { feedItems } from "@/app/feed/feedData";

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
  const top50Items = newDrops.slice(0, 8);
  const top50LoopItems =
    top50Items.length > 0 ? [...top50Items, ...top50Items] : [];
  const productGridItems: Array<BrandProduct | null> =
    newDrops.length > 0
      ? newDrops.slice(0, 18)
      : Array.from({ length: 18 }).map(() => null);
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
                  <span className="text-sm font-bold text-[#111]">{formatPrice(item.price)}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]" />
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

  {/* PRODUCT GRID - 6 columns x 3 rows */}
  <div className="max-w-[1600px] mx-auto px-6">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {productGridItems.map((item, i) =>
        item ? (
            <Link
              key={`${item.id}-${i}`}
              href={`/products/${item.handle}?brand=${item.brandSlug}`}
              className="group relative bg-white overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                <img
                  src={item.image || item.images?.[0] || "/product-1.jpg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-3 bg-white">
                <p className="text-[10px] text-gray-500 mb-1 font-medium">
                  {brandBySlug.get(item.brandSlug)?.name ?? "STYLECAST"}
                </p>
                <h3 className="text-xs font-semibold text-[#111] mb-1.5 leading-tight line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="text-sm font-bold text-[#111]">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div
              key={`product-skeleton-${i}`}
              className="bg-white border border-gray-100 overflow-hidden"
            >
              <div className="w-full aspect-[3/4] bg-gray-100 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          )
      )}
    </div>
  </div>
</section>

{/* ===== LOOKBOOK CARDS SECTION ===== */}
<section className="w-full py-12 bg-gray-50 overflow-hidden">

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
          className="group relative bg-white overflow-hidden hover:shadow-lg transition-all duration-300 flex-shrink-0 w-[220px]"
        >
          <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden p-2">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute left-3 right-3 bottom-3 translate-y-3 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-[10px] text-white/70 mb-1">{item.season}</p>
              <h3 className="text-xs font-semibold text-white line-clamp-2">
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


{/* ===== TOP 50 HAUL SECTION ===== */}
<section className="w-full py-20 bg-gray-50 overflow-hidden">
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
          width: "fit-content",
        }}
      >
        {top50LoopItems.length > 0
          ? top50LoopItems.map((item, i) => {
              const brand = brandBySlug.get(item.brandSlug);
              const image = item.image || item.images?.[0] || "/product-1.jpg";

              return (
                <Link
                  key={`${item.id}-${i}`}
                  href={`/products/${item.handle}?brand=${item.brandSlug}`}
                  className="flex-shrink-0 w-[220px] group"
                >
                  <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                    <img
                      src={image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#111] mb-1 uppercase">
                      {brand?.name ?? "STYLECAST"}
                    </p>
                    <h3 className="text-sm text-[#111] mb-2 leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-lg font-bold text-[#111] mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </Link>
              );
            })
          : Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`top50-skeleton-${i}`}
                className="flex-shrink-0 w-[220px] group"
              >
                <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden mb-3 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                </div>
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
<section className="w-full bg-white py-20 px-6">
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
<section id="people-feed" className="w-full py-24 bg-white">

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
  <div className="px-6 max-w-[1600px] mx-auto">
    <div className="columns-2 md:columns-3 lg:columns-4 gap-2 [column-fill:_balance]">
      {feedItems.slice(0, 12).map((item) => (
        <div
          key={item.id}
          className="group relative break-inside-avoid bg-white p-1"
        >
          <div className="relative w-full overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute left-3 right-3 bottom-3 translate-y-3 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {item.title}
            </div>
            <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white transition-opacity duration-200 group-hover:opacity-0">
              {item.username}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



    </main>
  );
}