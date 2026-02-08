"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PantsPage() {
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

  const [activeTab, setActiveTab] = useState<"all" | "jeans" | "trousers" | "cargos" | "shorts" | "skirts">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ─── DATA ───

  const topCategories = [
    { label: "Jeans", count: "3.8k sold", image: "/apparel-hero1.jpg" },
    { label: "Trousers", count: "2.5k sold", image: "/apparel-hero5.jpg" },
    { label: "Cargo Pants", count: "2.1k sold", image: "/apparel-hero3.jpg" },
    { label: "Shorts & Skirts", count: "1.7k sold", image: "/apparel-knitsection-hero.jpg" },
  ];

  const trendingPants = [
    { id: 40001, rank: 1, brand: "MUSINSA STANDARD", title: "Relaxed wide leg denim [mid blue]", price: 68, salePrice: 49, discount: 28, sold: 5234, rating: 4.8, image: "/pinterest1.jpg" },
    { id: 40002, rank: 2, brand: "SCULPTOR", title: "Logo track pants [black]", price: 89, salePrice: 71, discount: 20, sold: 4532, rating: 4.7, image: "/pinterest2.jpg" },
    { id: 40003, rank: 3, brand: "ANDERSSON BELL", title: "Asymmetric panel denim [charcoal]", price: 245, salePrice: 196, discount: 20, sold: 3890, rating: 4.9, image: "/pinterest3.jpg" },
    { id: 40004, rank: 4, brand: "GROVE", title: "Cotton twill wide chinos [beige]", price: 72, salePrice: 52, discount: 28, sold: 3654, rating: 4.6, image: "/pinterest4.jpg" },
    { id: 40005, rank: 5, brand: "ESCAPEFROM", title: "Ribbon cargo joggers [olive]", price: 65, salePrice: 39, discount: 40, sold: 3421, rating: 4.5, image: "/pinterest5.jpg" },
    { id: 40006, rank: 6, brand: "BADBLOOD", title: "Straight fit raw denim [indigo]", price: 98, salePrice: 78, discount: 20, sold: 3198, rating: 4.7, image: "/pinterest6.jpg" },
    { id: 40007, rank: 7, brand: "PARTIMENTO", title: "Washed utility cargo pants [gray]", price: 82, salePrice: 66, discount: 20, sold: 2987, rating: 4.6, image: "/pinterest7.jpg" },
    { id: 40008, rank: 8, brand: "MUAHMUAH", title: "Ribbon pleated wide pants [cream]", price: 54, salePrice: 35, discount: 35, sold: 2876, rating: 4.5, image: "/pinterest10.jpg" },
  ];

  const editorSpotlight = {
    brandImage: "/brandsyouwilllove-2.jpg",
    brandName: "PARTIMENTO",
    brandSubtitle: "Modern Workwear",
    items: [
      { id: 41001, brand: "PARTIMENTO", title: "Vintage wash straight denim [light blue]", price: 89, salePrice: 71, discount: 20, image: "/look1.jpg" },
      { id: 41002, brand: "PARTIMENTO", title: "Pleated wide trouser [charcoal]", price: 98, salePrice: 78, discount: 20, image: "/look2.jpg" },
      { id: 41003, brand: "PARTIMENTO", title: "Washed cargo pocket pants [olive]", price: 82, salePrice: 58, discount: 29, image: "/look3.jpg" },
      { id: 41004, brand: "PARTIMENTO", title: "Cotton twill chinos [sand]", price: 72, salePrice: 58, discount: 19, image: "/look4.jpg" },
      { id: 41005, brand: "PARTIMENTO", title: "Relaxed taper joggers [black]", price: 65, salePrice: 52, discount: 20, image: "/look5.jpg" },
      { id: 41006, brand: "PARTIMENTO", title: "Corduroy wide pants [brown]", price: 78, salePrice: 62, discount: 21, image: "/street-1.jpg" },
    ],
  };

  const styleGuides = [
    { id: "sg1", title: "Wide vs Straight", subtitle: "Find the denim silhouette that suits you best", image: "/apparel-winteressentials-hero.jpg" },
    { id: "sg2", title: "Cargo Done Right", subtitle: "How to style utility pants without looking bulky", image: "/apparel-cozyknitcollection.jpg" },
  ];

  const staffPicks = [
    { id: 42001, brand: "MUSINSA STANDARD", title: "Straight fit cotton chinos [ivory]", price: 52, salePrice: 42, discount: 19, image: "/drop-1.jpg", staffNote: "Emily's pick" },
    { id: 42002, brand: "ANDERSSON BELL", title: "Deconstructed wide denim [black]", price: 265, salePrice: 212, discount: 20, image: "/drop-2.jpg", staffNote: "Jay's pick" },
    { id: 42003, brand: "MUAHMUAH", title: "Ribbon detail joggers [cream]", price: 48, salePrice: 29, discount: 40, image: "/drop-3.jpg", staffNote: "Sora's pick" },
    { id: 42004, brand: "GROVE", title: "Linen blend trouser [oatmeal]", price: 82, salePrice: 66, discount: 20, image: "/drop-6.jpg", staffNote: "Minho's pick" },
    { id: 42005, brand: "ESCAPEFROM", title: "Cargo pocket wide pants [black]", price: 72, salePrice: 43, discount: 40, image: "/drop-7.jpg", staffNote: "Yuna's pick" },
    { id: 42006, brand: "SCULPTOR", title: "Velvet track pants [navy]", price: 78, salePrice: 62, discount: 21, image: "/drop-8.jpg", staffNote: "Hana's pick" },
    { id: 42007, brand: "KIRSH", title: "Cherry patch denim [light blue]", price: 89, salePrice: 71, discount: 20, image: "/women-printer-1.jpg", staffNote: "Joon's pick" },
    { id: 42008, brand: "BADBLOOD", title: "Raw selvedge slim denim [indigo]", price: 118, salePrice: 94, discount: 20, image: "/women-grid-2.jpg", staffNote: "Mia's pick" },
  ];

  const allPants = [
    { id: 43001, sub: "jeans", brand: "MUSINSA STANDARD", title: "Relaxed wide leg denim [mid blue]", price: 68, salePrice: 49, discount: 28, reviews: 5234, image: "/pinterest1.jpg" },
    { id: 43002, sub: "trousers", brand: "ANDERSSON BELL", title: "Asymmetric panel trouser [charcoal]", price: 245, salePrice: 196, discount: 20, reviews: 3890, image: "/pinterest2.jpg" },
    { id: 43003, sub: "cargos", brand: "PARTIMENTO", title: "Washed utility cargo pants [gray]", price: 82, salePrice: 66, discount: 20, reviews: 2987, image: "/pinterest3.jpg" },
    { id: 43004, sub: "jeans", brand: "BADBLOOD", title: "Straight fit raw denim [indigo]", price: 98, salePrice: 78, discount: 20, reviews: 3198, image: "/pinterest4.jpg" },
    { id: 43005, sub: "shorts", brand: "GROVE", title: "Cotton twill bermuda shorts [beige]", price: 48, salePrice: 36, discount: 25, reviews: 1876, image: "/pinterest5.jpg" },
    { id: 43006, sub: "trousers", brand: "SCULPTOR", title: "Pleated wide trouser [black]", price: 89, salePrice: 71, discount: 20, reviews: 2654, image: "/pinterest6.jpg" },
    { id: 43007, sub: "cargos", brand: "ESCAPEFROM", title: "Ribbon cargo joggers [olive]", price: 65, salePrice: 39, discount: 40, reviews: 3421, image: "/pinterest7.jpg" },
    { id: 43008, sub: "jeans", brand: "KIRSH", title: "Cherry patch wide denim [light blue]", price: 89, salePrice: 71, discount: 20, reviews: 1654, image: "/pinterest10.jpg" },
    { id: 43009, sub: "skirts", brand: "MUAHMUAH", title: "Pleated midi skirt [cream]", price: 52, salePrice: 34, discount: 35, reviews: 1432, image: "/pinterest12.jpg" },
    { id: 43010, sub: "trousers", brand: "LEATHERY", title: "Faux leather straight pants [black]", price: 128, salePrice: 102, discount: 20, reviews: 987, image: "/pinterest13.jpg" },
    { id: 43011, sub: "jeans", brand: "GROVE", title: "Vintage wash bootcut denim [mid blue]", price: 78, salePrice: 62, discount: 21, reviews: 2345, image: "/fall-4.jpg" },
    { id: 43012, sub: "cargos", brand: "BADBLOOD", title: "Nylon pocket cargo pants [black]", price: 92, salePrice: 74, discount: 20, reviews: 1789, image: "/fall-5.jpg" },
    { id: 43013, sub: "shorts", brand: "MUSINSA STANDARD", title: "Cotton chino shorts [navy]", price: 38, salePrice: 30, discount: 21, reviews: 2198, image: "/feed-8.jpg" },
    { id: 43014, sub: "skirts", brand: "PLACE STUDIO", title: "Wrap midi skirt [black]", price: 62, salePrice: 50, discount: 19, reviews: 876, image: "/product-8.jpg" },
    { id: 43015, sub: "trousers", brand: "CHINDOWN", title: "High-waist tailored trouser [gray]", price: 98, salePrice: 78, discount: 20, reviews: 1567, image: "/product-9.jpg" },
    { id: 43016, sub: "jeans", brand: "SCULPTOR", title: "Washed balloon denim [black]", price: 108, salePrice: 86, discount: 20, reviews: 2456, image: "/trend-9.jpg" },
    { id: 43017, sub: "cargos", brand: "GROVE", title: "Multi-pocket utility pants [khaki]", price: 75, salePrice: 56, discount: 25, reviews: 1654, image: "/apparel6.jpg" },
    { id: 43018, sub: "shorts", brand: "KIRSH", title: "Cherry logo sweat shorts [gray]", price: 42, salePrice: 34, discount: 19, reviews: 1234, image: "/wtrending1.jpg" },
    { id: 43019, sub: "skirts", brand: "ESCAPEFROM", title: "Denim A-line mini skirt [blue]", price: 48, salePrice: 34, discount: 29, reviews: 987, image: "/wtrending2.jpg" },
    { id: 43020, sub: "trousers", brand: "PARTIMENTO", title: "Corduroy wide pants [brown]", price: 78, salePrice: 62, discount: 21, reviews: 1345, image: "/wtrending3.jpg" },
    { id: 43021, sub: "jeans", brand: "ANDERSSON BELL", title: "Distressed straight denim [light]", price: 225, salePrice: 180, discount: 20, reviews: 1987, image: "/wtrending4.jpg" },
    { id: 43022, sub: "cargos", brand: "MUAHMUAH", title: "Mini cargo pocket pants [cream]", price: 58, salePrice: 38, discount: 34, reviews: 1456, image: "/wtrending5.jpg" },
    { id: 43023, sub: "shorts", brand: "BADBLOOD", title: "Raw hem denim shorts [indigo]", price: 58, salePrice: 46, discount: 21, reviews: 876, image: "/wtrending6.jpg" },
    { id: 43024, sub: "skirts", brand: "CHINDOWN", title: "Satin midi skirt [olive]", price: 68, salePrice: 48, discount: 29, reviews: 765, image: "/wtrending7.jpg" },
    { id: 43025, sub: "jeans", brand: "MUAHMUAH", title: "Ribbon wide leg denim [white]", price: 62, salePrice: 40, discount: 35, reviews: 2345, image: "/look1.jpg" },
    { id: 43026, sub: "trousers", brand: "MUSINSA STANDARD", title: "Wool blend tapered trouser [charcoal]", price: 88, salePrice: 70, discount: 20, reviews: 1654, image: "/look2.jpg" },
    { id: 43027, sub: "cargos", brand: "SCULPTOR", title: "Oversized cargo joggers [black]", price: 78, salePrice: 62, discount: 21, reviews: 1345, image: "/look3.jpg" },
    { id: 43028, sub: "shorts", brand: "GROVE", title: "Linen blend shorts [sand]", price: 48, salePrice: 38, discount: 21, reviews: 987, image: "/look4.jpg" },
    { id: 43029, sub: "skirts", brand: "LEATHERY", title: "Faux leather midi skirt [black]", price: 98, salePrice: 78, discount: 20, reviews: 876, image: "/look5.jpg" },
    { id: 43030, sub: "jeans", brand: "PLACE STUDIO", title: "Cropped straight denim [light wash]", price: 58, salePrice: 42, discount: 28, reviews: 1567, image: "/street-1.jpg" },
  ];

  const getFilteredPants = () => {
    if (activeTab === "all") return allPants;
    return allPants.filter((item) => item.sub === activeTab);
  };

  const filteredPants = getFilteredPants();
  const totalPages = Math.ceil(filteredPants.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPants.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════ SECTION 1: TOP CATEGORIES ═══════════════ */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-light tracking-tight">Pants</h1>
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

      {/* ═══════════════ SECTION 2: TRENDING PANTS ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-600 mb-2 block">Ranking</span>
              <h2 className="text-3xl font-light tracking-tight">Trending Pants</h2>
              <p className="text-sm text-gray-500 mt-1">Most popular this week — updated daily</p>
            </div>
            <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors border-b border-gray-300 pb-0.5">
              Full Rankings →
            </Link>
          </div>

          <div className="relative group/scroll">
            <div ref={trendingRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {trendingPants.map((item) => (
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
              <p className="text-sm text-gray-500 mt-1">This week&apos;s featured brand for pants</p>
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
            <p className="text-sm text-gray-500 mt-1">Find the perfect pair for every occasion</p>
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

      {/* ═══════════════ SECTION 6: BROWSE ALL PANTS ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-light tracking-tight">Browse All Pants</h2>
              <p className="text-sm text-gray-500 mt-1">{filteredPants.length} items</p>
            </div>
            <div className="flex border border-gray-300 divide-x divide-gray-300">
              {(["all", "jeans", "trousers", "cargos", "shorts", "skirts"] as const).map((tab) => (
                <button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} className={`px-4 py-2.5 text-xs font-medium transition-colors ${activeTab === tab ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                  {tab === "all" ? "All" : tab === "jeans" ? "Jeans" : tab === "trousers" ? "Trousers" : tab === "cargos" ? "Cargos" : tab === "shorts" ? "Shorts" : "Skirts"}
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
              <p className="text-xs text-gray-400">You&apos;re viewing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filteredPants.length)} of {filteredPants.length} results</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
