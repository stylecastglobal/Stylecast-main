"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NewArrivalsPage() {
  // Ticker animation
  const tickerRef = useRef<HTMLDivElement>(null);

  // Tab state for "This Week / Last Week / This Month"
  const [activeTab, setActiveTab] = useState<"this-week" | "last-week" | "this-month">("this-week");

  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Countdown for limited drop
  const [countdown, setCountdown] = useState({ hours: 11, minutes: 42, seconds: 18 });
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) { seconds = 59; minutes -= 1; }
        if (minutes < 0) { minutes = 59; hours -= 1; }
        if (hours < 0) return { hours: 0, minutes: 0, seconds: 0 };
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll refs
  const justDroppedRef = useRef<HTMLDivElement>(null);
  const editorialRef = useRef<HTMLDivElement>(null);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  // ─── DATA ───

  const heroSlides = [
    {
      id: 1,
      tag: "JUST IN",
      title: "Spring 2026\nCollection",
      subtitle: "Fresh drops from the season's most anticipated brands",
      image: "/newarrivals-hero1.jpg",
      cta: "Explore Now",
    },
  ];

  const justDropped = [
    { id: 2001, brand: "MUSINSA STANDARD", title: "Oversized linen blend blazer [sand]", price: 129, salePrice: 103, discount: 20, image: "/drop-1.jpg", isNew: true, droppedAgo: "2h ago" },
    { id: 2002, brand: "SCULPTOR", title: "Washed denim cargo pants [light blue]", price: 148, salePrice: 118, discount: 20, image: "/drop-2.jpg", isNew: true, droppedAgo: "3h ago" },
    { id: 2003, brand: "ANDERSSON BELL", title: "Asymmetric knit vest [cream]", price: 195, salePrice: 156, discount: 20, image: "/drop-3.jpg", isNew: true, droppedAgo: "5h ago" },
    { id: 2004, brand: "MUAHMUAH", title: "Ribbon detail cropped cardigan [pink]", price: 68, salePrice: 47, discount: 30, image: "/drop-6.jpg", isNew: true, droppedAgo: "6h ago" },
    { id: 2005, brand: "PLACE STUDIO", title: "Wide pleated trousers [charcoal]", price: 89, salePrice: 62, discount: 30, image: "/drop-7.jpg", isNew: true, droppedAgo: "8h ago" },
    { id: 2006, brand: "BADBLOOD", title: "Vintage wash hoodie [ash gray]", price: 78, salePrice: 62, discount: 20, image: "/drop-8.jpg", isNew: true, droppedAgo: "10h ago" },
    { id: 2007, brand: "KIRSH", title: "Cherry logo sweatshirt [ivory]", price: 65, salePrice: 52, discount: 20, image: "/women-printer-1.jpg", isNew: true, droppedAgo: "12h ago" },
    { id: 2008, brand: "ESCAPEFROM", title: "Collage print oversized tee [black]", price: 42, salePrice: 34, discount: 19, image: "/women-grid-2.jpg", isNew: true, droppedAgo: "14h ago" },
  ];

  const editorialPicks = [
    { id: 3001, brand: "LEATHERY", title: "Butter-soft leather jacket [cognac]", price: 348, salePrice: 278, discount: 20, image: "/look4.jpg" },
    { id: 3002, brand: "GROVE", title: "Textured knit polo [olive]", price: 89, salePrice: 71, discount: 20, image: "/look5.jpg" },
    { id: 3003, brand: "CHINDOWN", title: "Oversized trench coat [beige]", price: 268, salePrice: 201, discount: 25, image: "/street-1.jpg" },
    { id: 3004, brand: "PARTIMENTO", title: "Washed cotton chino pants [khaki]", price: 95, salePrice: 76, discount: 20, image: "/look1.jpg" },
    { id: 3005, brand: "VIKINI VENDER", title: "Mesh layered tank top [white]", price: 52, salePrice: 42, discount: 19, image: "/look2.jpg" },
    { id: 3006, brand: "STANDARD ERROR", title: "Structured mini bag [black]", price: 128, salePrice: 102, discount: 20, image: "/look3.jpg" },
  ];

  const limitedDrop = {
    brand: "UGLYSHADOW",
    title: "Exclusive Capsule Collection",
    subtitle: "Limited to 200 pieces worldwide",
    items: [
      { id: 4001, title: "Deconstructed hoodie [storm gray]", price: 142, salePrice: 99, discount: 30, image: "/pinterest4.jpg" },
      { id: 4002, title: "Oversized cargo vest [olive]", price: 118, salePrice: 83, discount: 30, image: "/pinterest5.jpg" },
      { id: 4003, title: "Distressed knit sweater [cream]", price: 98, salePrice: 69, discount: 30, image: "/pinterest6.jpg" },
      { id: 4004, title: "Wide-leg utility pants [black]", price: 108, salePrice: 76, discount: 30, image: "/pinterest7.jpg" },
    ],
  };

  const thisWeekDrops = [
    { id: 5001, day: "MON", brand: "SATUR", title: "Ribbed cotton turtleneck [oatmeal]", price: 68, salePrice: 54, discount: 20, image: "/wtrending1.jpg" },
    { id: 5002, day: "MON", brand: "COLD CULTURE", title: "Structured bomber jacket [navy]", price: 198, salePrice: 158, discount: 20, image: "/wtrending2.jpg" },
    { id: 5003, day: "TUE", brand: "ERA", title: "Relaxed fit linen shirt [white]", price: 75, salePrice: 56, discount: 25, image: "/wtrending3.jpg" },
    { id: 5004, day: "TUE", brand: "HUG YOUR SKIN", title: "Fleece half-zip pullover [pink gray]", price: 112, salePrice: 90, discount: 20, image: "/wtrending4.jpg" },
    { id: 5005, day: "WED", brand: "DOFFJASON", title: "Washed canvas work jacket [tan]", price: 158, salePrice: 126, discount: 20, image: "/wtrending5.jpg" },
    { id: 5006, day: "WED", brand: "KIIMUIR", title: "Cashmere blend v-neck sweater [gray]", price: 186, salePrice: 149, discount: 20, image: "/wtrending6.jpg" },
    { id: 5007, day: "THU", brand: "NINEZ", title: "Soft mock neck long sleeve [cream]", price: 42, salePrice: 34, discount: 19, image: "/wtrending7.jpg" },
    { id: 5008, day: "THU", brand: "MUSINSA STANDARD", title: "Cotton twill wide pants [charcoal]", price: 78, salePrice: 62, discount: 20, image: "/pinterest1.jpg" },
    { id: 5009, day: "FRI", brand: "SCULPTOR", title: "Logo embroidered cap [black]", price: 38, salePrice: 30, discount: 21, image: "/pinterest2.jpg" },
    { id: 5010, day: "FRI", brand: "LEATHERY", title: "Belted leather midi skirt [brown]", price: 218, salePrice: 174, discount: 20, image: "/pinterest3.jpg" },
    { id: 5011, day: "SAT", brand: "GROVE", title: "Oversized pocket shirt [sage]", price: 82, salePrice: 66, discount: 20, image: "/pinterest13.jpg" },
    { id: 5012, day: "SAT", brand: "BADBLOOD", title: "Destroyed straight jeans [mid blue]", price: 128, salePrice: 102, discount: 20, image: "/fall-4.jpg" },
  ];

  const lastWeekDrops = [
    { id: 6001, day: "MON", brand: "MUAHMUAH", title: "Logo patch ball cap [cream]", price: 39, salePrice: 23, discount: 41, image: "/fall-5.jpg" },
    { id: 6002, day: "TUE", brand: "PLACE STUDIO", title: "Soft muffler set knit [ivory]", price: 38, salePrice: 25, discount: 34, image: "/feed-8.jpg" },
    { id: 6003, day: "WED", brand: "ESCAPEFROM", title: "Strawberry print hoodie [pink]", price: 71, salePrice: 39, discount: 45, image: "/product-8.jpg" },
    { id: 6004, day: "THU", brand: "CHINDOWN", title: "Wool blend coat [charcoal]", price: 248, salePrice: 186, discount: 25, image: "/product-9.jpg" },
    { id: 6005, day: "FRI", brand: "KIRSH", title: "Cherry knit beanie [pink]", price: 38, salePrice: 30, discount: 21, image: "/trend-9.jpg" },
    { id: 6006, day: "SAT", brand: "VIKINI VENDER", title: "Structured tote bag [tan]", price: 118, salePrice: 94, discount: 20, image: "/apparel6.jpg" },
  ];

  const thisMonthDrops = [
    ...thisWeekDrops.slice(0, 4).map((item, i) => ({ ...item, id: 7000 + i, day: "WEEK 1" })),
    ...lastWeekDrops.slice(0, 4).map((item, i) => ({ ...item, id: 7010 + i, day: "WEEK 2" })),
    { id: 7020, day: "WEEK 3", brand: "RAWROW", title: "Cordura clip messenger [olive]", price: 84, salePrice: 67, discount: 20, image: "/women-grid-1.jpg" },
    { id: 7021, day: "WEEK 3", brand: "ATIL STUDIO", title: "Velour suede mini bag [black]", price: 73, salePrice: 58, discount: 21, image: "/women-grid-4.jpg" },
    { id: 7022, day: "WEEK 4", brand: "SIYAZU", title: "Flow bag [brown]", price: 137, salePrice: 110, discount: 20, image: "/women-grid-5.jpg" },
    { id: 7023, day: "WEEK 4", brand: "BLACK PURPLE", title: "Wide boots [black]", price: 197, salePrice: 158, discount: 20, image: "/women-grid-3.jpg" },
  ];

  const getActiveDrops = () => {
    switch (activeTab) {
      case "this-week": return thisWeekDrops;
      case "last-week": return lastWeekDrops;
      case "this-month": return thisMonthDrops;
    }
  };

  // Group drops by day
  const groupByDay = (items: typeof thisWeekDrops) => {
    const groups: Record<string, typeof thisWeekDrops> = {};
    items.forEach((item) => {
      if (!groups[item.day]) groups[item.day] = [];
      groups[item.day].push(item);
    });
    return groups;
  };

  const trendingCategories = [
    { label: "Oversized Blazers", image: "/brandsyouwilllove-1.jpg" },
    { label: "Cargo Pants", image: "/brandsyouwilllove-23.jpg" },
    { label: "Knit Vests", image: "/brandsyouwilllove-3.jpg" },
    { label: "Leather Goods", image: "/brandsyouwilllove-2.jpg" },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative w-full h-[75vh] min-h-[520px] overflow-hidden bg-black">
        <Image
          src={heroSlides[0].image}
          alt={heroSlides[0].title}
          fill
          sizes="100vw"
          quality={100}
          className="object-cover opacity-60"
          priority
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-end pb-16">
          <span className="inline-block w-fit px-3 py-1 mb-4 text-[11px] font-bold tracking-[0.2em] uppercase text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-full">
            {heroSlides[0].tag}
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-[1.1] mb-4 whitespace-pre-line">
            {heroSlides[0].title}
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-lg mb-8">
            {heroSlides[0].subtitle}
          </p>
          <Link
            href="#just-dropped"
            className="inline-flex items-center w-fit px-8 py-3.5 bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            {heroSlides[0].cta}
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* ═══════════════ TICKER MARQUEE ═══════════════ */}
      <div className="bg-black text-white overflow-hidden py-3 border-b border-white/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="mx-8 text-xs tracking-[0.15em] uppercase font-medium">
              NEW DROPS EVERY DAY &nbsp;•&nbsp; FREE SHIPPING ON FIRST ORDER &nbsp;•&nbsp; SPRING 2026 COLLECTION IS HERE &nbsp;•&nbsp; UP TO 30% OFF NEW ARRIVALS &nbsp;•&nbsp; EXCLUSIVE ONLINE FIRST &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════ TRENDING CATEGORIES ═══════════════ */}
      <section className="py-12 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold tracking-tight">Trending Categories</h2>
            <Link href="/shop" className="text-xs text-gray-500 hover:text-black transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingCategories.map((cat) => (
              <Link key={cat.label} href="#" className="group relative block aspect-[4/5] overflow-hidden bg-gray-100">
                <Image src={cat.image} alt={cat.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white text-sm font-semibold">{cat.label}</p>
                  <p className="text-white/60 text-xs mt-1">Shop now →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ JUST DROPPED ═══════════════ */}
      <section id="just-dropped" className="py-14 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-red-600 mb-2 block">Live</span>
              <h2 className="text-3xl font-light tracking-tight">Just Dropped</h2>
              <p className="text-sm text-gray-500 mt-1">The freshest arrivals — updated every hour</p>
            </div>
            <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors border-b border-gray-300 pb-0.5">
              See All New →
            </Link>
          </div>

          <div className="relative group/scroll">
            <div
              ref={justDroppedRef}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {justDropped.map((item) => (
                <Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block">
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    {/* NEW badge */}
                    <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2.5 py-1 tracking-wider">
                      NEW
                    </span>
                    {/* Time badge */}
                    <span className="absolute top-3 right-12 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-gray-600 px-2 py-1 rounded-full">
                      {item.droppedAgo}
                    </span>
                    {/* Wishlist */}
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">{item.discount}%</span>
                      <span className="text-sm font-bold">${item.salePrice}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">${item.price}</p>
                  </div>
                </Link>
              ))}
            </div>

            <button onClick={() => scrollRight(justDroppedRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button onClick={() => scrollLeft(justDroppedRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ LIMITED DROP ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#111]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400 mb-2 block">Exclusive Drop</span>
              <h2 className="text-3xl font-light text-white tracking-tight">
                {limitedDrop.brand}: {limitedDrop.title}
              </h2>
              <p className="text-sm text-white/50 mt-1">{limitedDrop.subtitle}</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 border border-white/10">
              <span className="text-xs text-white/60 uppercase tracking-wider">Ends in</span>
              <div className="flex gap-1">
                <span className="bg-white text-black text-sm font-bold px-2.5 py-1.5 min-w-[36px] text-center">
                  {String(countdown.hours).padStart(2, "0")}
                </span>
                <span className="text-white/60 self-center">:</span>
                <span className="bg-white text-black text-sm font-bold px-2.5 py-1.5 min-w-[36px] text-center">
                  {String(countdown.minutes).padStart(2, "0")}
                </span>
                <span className="text-white/60 self-center">:</span>
                <span className="bg-white text-black text-sm font-bold px-2.5 py-1.5 min-w-[36px] text-center">
                  {String(countdown.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {limitedDrop.items.map((item) => (
              <Link key={item.id} href="#" className="group block">
                <div className="relative aspect-[3/4] bg-gray-900 overflow-hidden mb-3">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                  <span className="absolute top-3 left-3 bg-amber-400 text-black text-[10px] font-bold px-2.5 py-1 tracking-wider">
                    LIMITED
                  </span>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <span className={wishlist.includes(item.id) ? "text-red-500" : "text-white/70"}>
                      {wishlist.includes(item.id) ? "♥" : "♡"}
                    </span>
                  </button>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/50 font-medium">{limitedDrop.brand}</p>
                  <h3 className="text-sm text-white font-normal line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-amber-400">{item.discount}%</span>
                    <span className="text-sm font-bold text-white">${item.salePrice}</span>
                  </div>
                  <p className="text-xs text-white/40 line-through">${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ EDITORIAL PICKS ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-light tracking-tight">Editor&apos;s New Picks</h2>
              <p className="text-sm text-gray-500 mt-1">Curated by our style team — the best of what&apos;s new</p>
            </div>
          </div>

          {/* Brand spotlight + product grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* Left — Brand image + info, stretches to match right side */}
            <div className="col-span-12 md:col-span-5">
              <Link href="#" className="group flex flex-col h-full">
                <div className="relative flex-1 min-h-0 bg-gray-100 overflow-hidden">
                  <Image src={editorialPicks[0].image} alt={editorialPicks[0].brand} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-4 pb-1">
                  <p className="text-xs text-gray-500 font-medium">{editorialPicks[0].brand}</p>
                  <p className="text-sm text-gray-700 mt-0.5 italic">Everyday Essentials</p>
                </div>
              </Link>
            </div>

            {/* Right — 3×2 product grid */}
            <div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-4">
              {editorialPicks.slice(0, 6).map((item) => (
                <Link key={item.id} href="#" className="group block">
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">{item.discount}%</span>
                      <span className="text-sm font-bold">${item.salePrice}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">${item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ DROP CALENDAR ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-light tracking-tight">Drop Calendar</h2>
              <p className="text-sm text-gray-500 mt-1">Browse new arrivals by when they dropped</p>
            </div>

            {/* Tabs */}
            <div className="flex border border-gray-300 divide-x divide-gray-300">
              {(["this-week", "last-week", "this-month"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab === "this-week" ? "This Week" : tab === "last-week" ? "Last Week" : "This Month"}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline grid */}
          <div className="space-y-10">
            {Object.entries(groupByDay(getActiveDrops())).map(([day, items]) => (
              <div key={day}>
                {/* Day label */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 min-w-[60px]">
                    {day}
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Products for that day */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {items.map((item) => (
                    <Link key={item.id} href="#" className="group block">
                      <div className="relative aspect-[3/4] bg-white overflow-hidden mb-3">
                        <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <button
                          onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }}
                          className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                        >
                          <span className={`text-sm ${wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}`}>
                            {wishlist.includes(item.id) ? "♥" : "♡"}
                          </span>
                        </button>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                        <h3 className="text-sm font-normal line-clamp-1">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-red-600">{item.discount}%</span>
                          <span className="text-sm font-bold">${item.salePrice}</span>
                        </div>
                        <p className="text-xs text-gray-400 line-through">${item.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ NEWSLETTER / NOTIFY ═══════════════ */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-black text-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
            Never Miss a Drop
          </h2>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">
            Get notified when new arrivals hit the store. Early access for subscribers.
          </p>
          <div className="flex items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 text-white text-sm px-5 py-3.5 placeholder-white/40 focus:outline-none focus:border-white/50"
            />
            <button className="bg-white text-black text-sm font-semibold px-6 py-3.5 hover:bg-gray-100 transition-colors whitespace-nowrap">
              Notify Me
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ MARQUEE ANIMATION STYLE ═══════════════ */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
