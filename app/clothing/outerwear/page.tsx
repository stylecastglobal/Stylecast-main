"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OuterwearPage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const trendingRef = useRef<HTMLDivElement>(null);
  const staffPickRef = useRef<HTMLDivElement>(null);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  useEffect(() => {
    const refs = [trendingRef, staffPickRef];
    const intervals = refs.map((ref) =>
      setInterval(() => {
        const el = ref.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 10) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: 300, behavior: "smooth" });
        }
      }, 4500)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  const [activeTab, setActiveTab] = useState<"all" | "jackets" | "coats" | "puffers" | "blazers" | "vests">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ─── DATA ───

  const topCategories = [
    { label: "Jackets", count: "3.5k sold", image: "/apparel-hero3.jpg" },
    { label: "Coats", count: "2.9k sold", image: "/apparel-hero1.jpg" },
    { label: "Puffer & Down", count: "2.4k sold", image: "/apparel-winteressentials-hero.jpg" },
    { label: "Blazers", count: "1.8k sold", image: "/apparel-hero5.jpg" },
  ];

  const trendingOuterwear = [
    { id: 60001, rank: 1, brand: "ANDERSSON BELL", title: "Oversized wool blend coat [camel]", price: 385, salePrice: 308, discount: 20, sold: 4876, rating: 4.9, image: "/pinterest1.jpg" },
    { id: 60002, rank: 2, brand: "SCULPTOR", title: "Cropped puffer jacket [black]", price: 198, salePrice: 158, discount: 20, sold: 4532, rating: 4.8, image: "/pinterest2.jpg" },
    { id: 60003, rank: 3, brand: "MUSINSA STANDARD", title: "Classic trench coat [beige]", price: 148, salePrice: 104, discount: 30, sold: 4210, rating: 4.8, image: "/pinterest3.jpg" },
    { id: 60004, rank: 4, brand: "BADBLOOD", title: "Leather biker jacket [black]", price: 265, salePrice: 212, discount: 20, sold: 3876, rating: 4.9, image: "/pinterest4.jpg" },
    { id: 60005, rank: 5, brand: "GROVE", title: "Quilted liner jacket [olive]", price: 118, salePrice: 82, discount: 30, sold: 3654, rating: 4.7, image: "/pinterest5.jpg" },
    { id: 60006, rank: 6, brand: "MUAHMUAH", title: "Cropped faux fur jacket [cream]", price: 128, salePrice: 77, discount: 40, sold: 3421, rating: 4.6, image: "/pinterest6.jpg" },
    { id: 60007, rank: 7, brand: "PARTIMENTO", title: "Waxed cotton field jacket [navy]", price: 168, salePrice: 134, discount: 20, sold: 3198, rating: 4.7, image: "/pinterest7.jpg" },
    { id: 60008, rank: 8, brand: "ESCAPEFROM", title: "Oversized varsity jacket [green/cream]", price: 148, salePrice: 89, discount: 40, sold: 2987, rating: 4.6, image: "/pinterest10.jpg" },
  ];

  const editorSpotlight = {
    brandImage: "/brandsyouwilllove-23.jpg",
    brandName: "ANDERSSON BELL",
    brandSubtitle: "Architectural Outerwear",
    items: [
      { id: 61001, brand: "ANDERSSON BELL", title: "Deconstructed trench coat [beige]", price: 425, salePrice: 340, discount: 20, image: "/look1.jpg" },
      { id: 61002, brand: "ANDERSSON BELL", title: "Asymmetric wool coat [black]", price: 385, salePrice: 308, discount: 20, image: "/look2.jpg" },
      { id: 61003, brand: "ANDERSSON BELL", title: "Patchwork denim jacket [blue]", price: 295, salePrice: 236, discount: 20, image: "/look3.jpg" },
      { id: 61004, brand: "ANDERSSON BELL", title: "Oversized shearling coat [brown]", price: 465, salePrice: 372, discount: 20, image: "/look4.jpg" },
      { id: 61005, brand: "ANDERSSON BELL", title: "Structured blazer coat [charcoal]", price: 345, salePrice: 276, discount: 20, image: "/look5.jpg" },
      { id: 61006, brand: "ANDERSSON BELL", title: "Quilted collarless jacket [olive]", price: 265, salePrice: 212, discount: 20, image: "/street-1.jpg" },
    ],
  };

  const styleGuides = [
    { id: "sg1", title: "The Coat Edit", subtitle: "Our definitive guide to finding your perfect winter coat", image: "/apparel-finalwinterpicks1.jpg" },
    { id: "sg2", title: "Layering 101", subtitle: "Master the art of outerwear layering this season", image: "/apparel-cozyknitcollection.jpg" },
  ];

  const staffPicks = [
    { id: 62001, brand: "MUSINSA STANDARD", title: "Wool blend single coat [charcoal]", price: 168, salePrice: 118, discount: 30, image: "/drop-1.jpg", staffNote: "Emily's pick" },
    { id: 62002, brand: "ANDERSSON BELL", title: "Oversized leather jacket [black]", price: 385, salePrice: 308, discount: 20, image: "/drop-2.jpg", staffNote: "Jay's pick" },
    { id: 62003, brand: "MUAHMUAH", title: "Faux shearling cropped jacket [cream]", price: 118, salePrice: 71, discount: 40, image: "/drop-3.jpg", staffNote: "Sora's pick" },
    { id: 62004, brand: "GROVE", title: "Cotton twill work jacket [khaki]", price: 108, salePrice: 86, discount: 20, image: "/drop-6.jpg", staffNote: "Minho's pick" },
    { id: 62005, brand: "ESCAPEFROM", title: "Oversized denim trucker jacket [blue]", price: 98, salePrice: 59, discount: 40, image: "/drop-7.jpg", staffNote: "Yuna's pick" },
    { id: 62006, brand: "SCULPTOR", title: "Nylon bomber jacket [black]", price: 148, salePrice: 118, discount: 20, image: "/drop-8.jpg", staffNote: "Hana's pick" },
    { id: 62007, brand: "PARTIMENTO", title: "Vintage wash field jacket [olive]", price: 178, salePrice: 142, discount: 20, image: "/women-printer-1.jpg", staffNote: "Joon's pick" },
    { id: 62008, brand: "LEATHERY", title: "Genuine leather moto jacket [brown]", price: 425, salePrice: 340, discount: 20, image: "/women-grid-2.jpg", staffNote: "Mia's pick" },
  ];

  const allOuterwear = [
    { id: 63001, sub: "coats", brand: "ANDERSSON BELL", title: "Oversized wool blend coat [camel]", price: 385, salePrice: 308, discount: 20, reviews: 4876, image: "/pinterest1.jpg" },
    { id: 63002, sub: "puffers", brand: "SCULPTOR", title: "Cropped puffer jacket [black]", price: 198, salePrice: 158, discount: 20, reviews: 4532, image: "/pinterest2.jpg" },
    { id: 63003, sub: "coats", brand: "MUSINSA STANDARD", title: "Classic trench coat [beige]", price: 148, salePrice: 104, discount: 30, reviews: 4210, image: "/pinterest3.jpg" },
    { id: 63004, sub: "jackets", brand: "BADBLOOD", title: "Leather biker jacket [black]", price: 265, salePrice: 212, discount: 20, reviews: 3876, image: "/pinterest4.jpg" },
    { id: 63005, sub: "jackets", brand: "GROVE", title: "Quilted liner jacket [olive]", price: 118, salePrice: 82, discount: 30, reviews: 3654, image: "/pinterest5.jpg" },
    { id: 63006, sub: "jackets", brand: "MUAHMUAH", title: "Cropped faux fur jacket [cream]", price: 128, salePrice: 77, discount: 40, reviews: 3421, image: "/pinterest6.jpg" },
    { id: 63007, sub: "jackets", brand: "PARTIMENTO", title: "Waxed cotton field jacket [navy]", price: 168, salePrice: 134, discount: 20, reviews: 3198, image: "/pinterest7.jpg" },
    { id: 63008, sub: "jackets", brand: "ESCAPEFROM", title: "Oversized varsity jacket [green/cream]", price: 148, salePrice: 89, discount: 40, reviews: 2987, image: "/pinterest10.jpg" },
    { id: 63009, sub: "blazers", brand: "CHINDOWN", title: "Structured wool blazer [charcoal]", price: 198, salePrice: 158, discount: 20, reviews: 1654, image: "/pinterest12.jpg" },
    { id: 63010, sub: "vests", brand: "PLACE STUDIO", title: "Quilted down vest [black]", price: 108, salePrice: 86, discount: 20, reviews: 1432, image: "/pinterest13.jpg" },
    { id: 63011, sub: "coats", brand: "LEATHERY", title: "Genuine leather trench coat [black]", price: 585, salePrice: 468, discount: 20, reviews: 987, image: "/fall-4.jpg" },
    { id: 63012, sub: "puffers", brand: "MUSINSA STANDARD", title: "Long puffer coat [ivory]", price: 178, salePrice: 125, discount: 30, reviews: 2654, image: "/fall-5.jpg" },
    { id: 63013, sub: "blazers", brand: "ANDERSSON BELL", title: "Deconstructed oversized blazer [navy]", price: 285, salePrice: 228, discount: 20, reviews: 1876, image: "/feed-8.jpg" },
    { id: 63014, sub: "vests", brand: "GROVE", title: "Fleece zip-up vest [sage]", price: 72, salePrice: 58, discount: 19, reviews: 1567, image: "/product-8.jpg" },
    { id: 63015, sub: "jackets", brand: "KIRSH", title: "Cherry patch bomber jacket [navy]", price: 128, salePrice: 102, discount: 20, reviews: 1345, image: "/product-9.jpg" },
    { id: 63016, sub: "coats", brand: "PARTIMENTO", title: "Wool herringbone coat [gray]", price: 248, salePrice: 198, discount: 20, reviews: 1789, image: "/trend-9.jpg" },
    { id: 63017, sub: "puffers", brand: "ESCAPEFROM", title: "Cropped puffer vest [pink]", price: 82, salePrice: 49, discount: 40, reviews: 2198, image: "/apparel6.jpg" },
    { id: 63018, sub: "blazers", brand: "SCULPTOR", title: "Oversized double-breasted blazer [black]", price: 178, salePrice: 142, discount: 20, reviews: 1234, image: "/wtrending1.jpg" },
    { id: 63019, sub: "vests", brand: "BADBLOOD", title: "Padded utility vest [olive]", price: 98, salePrice: 78, discount: 20, reviews: 987, image: "/wtrending2.jpg" },
    { id: 63020, sub: "jackets", brand: "MUSINSA STANDARD", title: "Cotton harrington jacket [navy]", price: 88, salePrice: 70, discount: 20, reviews: 1654, image: "/wtrending3.jpg" },
    { id: 63021, sub: "coats", brand: "CHINDOWN", title: "Cashmere blend wrap coat [camel]", price: 345, salePrice: 276, discount: 20, reviews: 876, image: "/wtrending4.jpg" },
    { id: 63022, sub: "puffers", brand: "MUAHMUAH", title: "Oversized long puffer [cream]", price: 168, salePrice: 101, discount: 40, reviews: 1987, image: "/wtrending5.jpg" },
    { id: 63023, sub: "blazers", brand: "LEATHERY", title: "Leather blazer jacket [black]", price: 345, salePrice: 276, discount: 20, reviews: 765, image: "/wtrending6.jpg" },
    { id: 63024, sub: "vests", brand: "KIRSH", title: "Fleece zip vest [cherry red]", price: 68, salePrice: 54, discount: 21, reviews: 876, image: "/wtrending7.jpg" },
    { id: 63025, sub: "jackets", brand: "ANDERSSON BELL", title: "Patchwork suede jacket [brown]", price: 365, salePrice: 292, discount: 20, reviews: 654, image: "/look1.jpg" },
    { id: 63026, sub: "coats", brand: "GROVE", title: "Bouclé cocoon coat [ivory]", price: 198, salePrice: 158, discount: 20, reviews: 1456, image: "/look2.jpg" },
    { id: 63027, sub: "puffers", brand: "BADBLOOD", title: "Matte nylon puffer jacket [charcoal]", price: 188, salePrice: 150, discount: 20, reviews: 1345, image: "/look3.jpg" },
    { id: 63028, sub: "blazers", brand: "PLACE STUDIO", title: "Cropped tweed blazer [pink]", price: 158, salePrice: 126, discount: 20, reviews: 1098, image: "/look4.jpg" },
    { id: 63029, sub: "vests", brand: "PARTIMENTO", title: "Waxed cotton gilet [brown]", price: 118, salePrice: 94, discount: 20, reviews: 765, image: "/look5.jpg" },
    { id: 63030, sub: "jackets", brand: "SCULPTOR", title: "Destroyed denim jacket [light blue]", price: 128, salePrice: 102, discount: 20, reviews: 1567, image: "/street-1.jpg" },
  ];

  const getFilteredOuterwear = () => {
    if (activeTab === "all") return allOuterwear;
    return allOuterwear.filter((item) => item.sub === activeTab);
  };

  const filteredOuterwear = getFilteredOuterwear();
  const totalPages = Math.ceil(filteredOuterwear.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredOuterwear.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════ SECTION 1: TOP CATEGORIES ═══════════════ */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-light tracking-tight">Outerwear</h1>
              <p className="text-sm text-gray-500 mt-1">Shop by category</p>
            </div>
            <Link href="/clothing/all" className="text-xs text-gray-500 hover:text-black transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topCategories.map((cat) => (
              <Link key={cat.label} href="#" className="group relative block aspect-[4/5] overflow-hidden bg-gray-100">
                <Image src={cat.image} alt={cat.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white text-sm font-semibold">{cat.label}</p>
                  <p className="text-white/60 text-xs mt-1">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 2: TRENDING OUTERWEAR ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-600 mb-2 block">Ranking</span>
              <h2 className="text-3xl font-light tracking-tight">Trending Outerwear</h2>
              <p className="text-sm text-gray-500 mt-1">Most popular this week — updated daily</p>
            </div>
            <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors border-b border-gray-300 pb-0.5">
              Full Rankings →
            </Link>
          </div>

          <div className="relative group/scroll">
            <div ref={trendingRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {trendingOuterwear.map((item) => (
                <Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block">
                  <div className="relative aspect-[3/4] bg-white overflow-hidden mb-3">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">{item.rank}</span>
                    <button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span>
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
                    <div className="flex items-center gap-3 pt-0.5">
                      <span className="text-[11px] text-gray-400">★ {item.rating}</span>
                      <span className="text-[11px] text-gray-400">{item.sold.toLocaleString()} sold</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <button onClick={() => scrollRight(trendingRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button onClick={() => scrollLeft(trendingRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3: EDITOR'S PICK ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-light tracking-tight">Editor&apos;s Pick</h2>
              <p className="text-sm text-gray-500 mt-1">This week&apos;s featured brand for outerwear</p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-5">
              <Link href="#" className="group flex flex-col h-full">
                <div className="relative flex-1 min-h-0 bg-gray-100 overflow-hidden">
                  <Image src={editorSpotlight.brandImage} alt={editorSpotlight.brandName} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-4 pb-1">
                  <p className="text-xs text-gray-500 font-medium">{editorSpotlight.brandName}</p>
                  <p className="text-sm text-gray-700 mt-0.5 italic">{editorSpotlight.brandSubtitle}</p>
                </div>
              </Link>
            </div>
            <div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-4">
              {editorSpotlight.items.map((item) => (
                <Link key={item.id} href="#" className="group block">
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span>
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

      {/* ═══════════════ SECTION 4: STYLE GUIDE ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-light tracking-tight">Style Guide</h2>
            <p className="text-sm text-gray-500 mt-1">Outerwear inspiration for every season</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {styleGuides.map((guide) => (
              <Link key={guide.id} href="#" className="group relative block aspect-[16/9] overflow-hidden bg-gray-100">
                <Image src={guide.image} alt={guide.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl text-white font-light mb-1">{guide.title}</h3>
                  <p className="text-sm text-white/60">{guide.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 5: STAFF PICKS ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-light tracking-tight">Staff Picks</h2>
              <p className="text-sm text-gray-500 mt-1">Hand-picked by our stylists</p>
            </div>
          </div>
          <div className="relative group/scroll">
            <div ref={staffPickRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {staffPicks.map((item) => (
                <Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block">
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-gray-700 px-2.5 py-1 rounded-full">{item.staffNote}</span>
                    <button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span>
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
            <button onClick={() => scrollRight(staffPickRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button onClick={() => scrollLeft(staffPickRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 6: BROWSE ALL OUTERWEAR ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-light tracking-tight">Browse All Outerwear</h2>
              <p className="text-sm text-gray-500 mt-1">{filteredOuterwear.length} items</p>
            </div>
            <div className="flex border border-gray-300 divide-x divide-gray-300">
              {(["all", "jackets", "coats", "puffers", "blazers", "vests"] as const).map((tab) => (
                <button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} className={`px-4 py-2.5 text-xs font-medium transition-colors ${activeTab === tab ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                  {tab === "all" ? "All" : tab === "jackets" ? "Jackets" : tab === "coats" ? "Coats" : tab === "puffers" ? "Puffers" : tab === "blazers" ? "Blazers" : "Vests"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentItems.map((item) => (
              <Link key={item.id} href="#" className="group block">
                <div className="relative aspect-[3/4] bg-white overflow-hidden mb-3">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                    <span className={`text-sm ${wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}`}>{wishlist.includes(item.id) ? "♥" : "♡"}</span>
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
                  <p className="text-[11px] text-gray-400 pt-0.5">★ {item.reviews.toLocaleString()} reviews</p>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col items-center mt-14 mb-4 gap-3">
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-black"}`}>{page}</button>
                ))}
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}>›</button>
              </div>
              <p className="text-xs text-gray-400">You&apos;re viewing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filteredOuterwear.length)} of {filteredOuterwear.length} results</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
