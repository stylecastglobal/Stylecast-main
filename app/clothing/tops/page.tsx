"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function TopsPage() {
  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Scroll refs
  const trendingRef = useRef<HTMLDivElement>(null);
  const staffPickRef = useRef<HTMLDivElement>(null);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  // Auto-scroll
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

  // Tab for sub-categories
  const [activeTab, setActiveTab] = useState<"all" | "tshirts" | "knits" | "shirts" | "hoodies" | "blouses">("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ─── DATA ───

  // Section 1: Top Selling Categories (like best-sellers reference)
  const topCategories = [
    { label: "T-Shirts", count: "3.2k sold", image: "/apparel-hero1.jpg" },
    { label: "Knit & Sweaters", count: "2.8k sold", image: "/apparel-knitsection-hero.jpg" },
    { label: "Shirts & Blouses", count: "2.1k sold", image: "/apparel-hero5.jpg" },
    { label: "Hoodies & Sweats", count: "1.9k sold", image: "/apparel-hero3.jpg" },
  ];

  // Section 2: Trending Tops (horizontal scroll)
  const trendingTops = [
    { id: 30001, rank: 1, brand: "MUAHMUAH", title: "Henley neck stitch long sleeve tee [ivory]", price: 36, salePrice: 23, discount: 36, sold: 4865, rating: 4.8, image: "/wtrending1.jpg" },
    { id: 30002, rank: 2, brand: "SCULPTOR", title: "Logo embroidered hoodie [black]", price: 98, salePrice: 78, discount: 20, sold: 4216, rating: 4.7, image: "/wtrending2.jpg" },
    { id: 30003, rank: 3, brand: "PLACE STUDIO", title: "Essential soft muffler set knit [cream]", price: 38, salePrice: 25, discount: 34, sold: 3956, rating: 4.6, image: "/wtrending3.jpg" },
    { id: 30004, rank: 4, brand: "ESCAPEFROM", title: "Strawberry dot logo hoodie [pink]", price: 71, salePrice: 39, discount: 45, sold: 3842, rating: 4.7, image: "/wtrending4.jpg" },
    { id: 30005, rank: 5, brand: "KIRSH", title: "Cherry logo sweatshirt [cream]", price: 65, salePrice: 52, discount: 20, sold: 3654, rating: 4.5, image: "/wtrending5.jpg" },
    { id: 30006, rank: 6, brand: "GROVE", title: "Textured knit polo [olive]", price: 89, salePrice: 71, discount: 20, sold: 3421, rating: 4.6, image: "/wtrending6.jpg" },
    { id: 30007, rank: 7, brand: "ANDERSSON BELL", title: "Asymmetric knit vest [cream]", price: 195, salePrice: 156, discount: 20, sold: 3198, rating: 4.9, image: "/wtrending7.jpg" },
    { id: 30008, rank: 8, brand: "BADBLOOD", title: "Signature logo hoodie [ash gray]", price: 89, salePrice: 71, discount: 20, sold: 2987, rating: 4.5, image: "/pinterest1.jpg" },
  ];

  // Section 3: Editor's Pick (brand spotlight left + 3x2 grid)
  const editorSpotlight = {
    brandImage: "/brandsyouwilllove-1.jpg",
    brandName: "SATUR",
    brandSubtitle: "Everyday Essentials",
    items: [
      { id: 31001, brand: "SATUR", title: "Ribbed cotton turtleneck [oatmeal]", price: 68, salePrice: 54, discount: 20, image: "/look5.jpg" },
      { id: 31002, brand: "SATUR", title: "Oversized stripe rugby shirt [navy]", price: 78, salePrice: 62, discount: 20, image: "/street-1.jpg" },
      { id: 31003, brand: "SATUR", title: "Waffle knit henley [cream]", price: 58, salePrice: 46, discount: 21, image: "/look1.jpg" },
      { id: 31004, brand: "SATUR", title: "Logo embroidered polo [white]", price: 52, salePrice: 42, discount: 19, image: "/look2.jpg" },
      { id: 31005, brand: "SATUR", title: "Boxy crop sweatshirt [gray]", price: 62, salePrice: 50, discount: 19, image: "/look3.jpg" },
      { id: 31006, brand: "SATUR", title: "Color block rugby shirt [green]", price: 72, salePrice: 58, discount: 19, image: "/look4.jpg" },
    ],
  };

  // Section 4: Style Guide (editorial 2-column feature)
  const styleGuides = [
    { id: "sg1", title: "Layer It Up", subtitle: "How to style knit vests for spring", image: "/apparel-cozyknitcollection.jpg" },
    { id: "sg2", title: "The Perfect Tee", subtitle: "Our guide to finding your ideal fit", image: "/apparel-winteressentials-hero.jpg" },
  ];

  // Section 5: Staff Picks (horizontal scroll)
  const staffPicks = [
    { id: 32001, brand: "MUSINSA STANDARD", title: "Premium cotton crew neck tee [white]", price: 28, salePrice: 22, discount: 21, image: "/drop-1.jpg", staffNote: "Emily's pick" },
    { id: 32002, brand: "ANDERSSON BELL", title: "Layered crop knit top [ivory]", price: 68, salePrice: 54, discount: 20, image: "/drop-2.jpg", staffNote: "Jay's pick" },
    { id: 32003, brand: "MUAHMUAH", title: "Flower combo hoodie [ivory]", price: 54, salePrice: 24, discount: 55, image: "/drop-3.jpg", staffNote: "Sora's pick" },
    { id: 32004, brand: "GROVE", title: "Oversized pocket shirt [sage]", price: 82, salePrice: 66, discount: 20, image: "/drop-6.jpg", staffNote: "Minho's pick" },
    { id: 32005, brand: "ESCAPEFROM", title: "Ribbon detail cropped cardigan [cream]", price: 58, salePrice: 35, discount: 40, image: "/drop-7.jpg", staffNote: "Yuna's pick" },
    { id: 32006, brand: "PLACE STUDIO", title: "Oversized cable knit vest [ivory]", price: 45, salePrice: 29, discount: 36, image: "/drop-8.jpg", staffNote: "Hana's pick" },
    { id: 32007, brand: "SCULPTOR", title: "Destroyed knit vest [gray]", price: 78, salePrice: 62, discount: 20, image: "/women-printer-1.jpg", staffNote: "Joon's pick" },
    { id: 32008, brand: "KIRSH", title: "Cherry pattern knit sweater [navy]", price: 82, salePrice: 66, discount: 20, image: "/women-grid-2.jpg", staffNote: "Mia's pick" },
  ];

  // Section 6: Browse All Tops (grid with tabs + pagination)
  const allTops = [
    { id: 33001, sub: "tshirts", brand: "MUAHMUAH", title: "Henley neck stitch tee [ivory]", price: 36, salePrice: 23, discount: 36, reviews: 4865, image: "/pinterest4.jpg" },
    { id: 33002, sub: "knits", brand: "ANDERSSON BELL", title: "Asymmetric knit vest [cream]", price: 195, salePrice: 156, discount: 20, reviews: 3956, image: "/pinterest5.jpg" },
    { id: 33003, sub: "hoodies", brand: "SCULPTOR", title: "Logo embroidered hoodie [black]", price: 98, salePrice: 78, discount: 20, reviews: 4216, image: "/pinterest6.jpg" },
    { id: 33004, sub: "shirts", brand: "GROVE", title: "Textured knit polo [olive]", price: 89, salePrice: 71, discount: 20, reviews: 2654, image: "/pinterest7.jpg" },
    { id: 33005, sub: "tshirts", brand: "ESCAPEFROM", title: "Collage print oversized tee [black]", price: 42, salePrice: 34, discount: 19, reviews: 876, image: "/pinterest10.jpg" },
    { id: 33006, sub: "knits", brand: "PLACE STUDIO", title: "Essential soft knit [cream]", price: 38, salePrice: 25, discount: 34, reviews: 2098, image: "/pinterest12.jpg" },
    { id: 33007, sub: "hoodies", brand: "ESCAPEFROM", title: "Strawberry dot logo hoodie [pink]", price: 71, salePrice: 39, discount: 45, reviews: 2876, image: "/pinterest13.jpg" },
    { id: 33008, sub: "shirts", brand: "MUSINSA STANDARD", title: "Oxford button-down shirt [white]", price: 48, salePrice: 38, discount: 21, reviews: 1876, image: "/fall-4.jpg" },
    { id: 33009, sub: "blouses", brand: "PLACE STUDIO", title: "Balloon sleeve blouse [white]", price: 48, salePrice: 34, discount: 29, reviews: 1432, image: "/fall-5.jpg" },
    { id: 33010, sub: "tshirts", brand: "BADBLOOD", title: "Graphic print oversized tee [black]", price: 52, salePrice: 39, discount: 25, reviews: 1987, image: "/feed-8.jpg" },
    { id: 33011, sub: "knits", brand: "KIRSH", title: "Cherry pattern knit sweater [navy]", price: 82, salePrice: 66, discount: 20, reviews: 1654, image: "/product-8.jpg" },
    { id: 33012, sub: "hoodies", brand: "MUAHMUAH", title: "Flower combo hoodie [ivory]", price: 54, salePrice: 24, discount: 55, reviews: 3842, image: "/product-9.jpg" },
    { id: 33013, sub: "shirts", brand: "GROVE", title: "Oversized pocket shirt [sage]", price: 82, salePrice: 66, discount: 20, reviews: 1654, image: "/trend-9.jpg" },
    { id: 33014, sub: "blouses", brand: "CHINDOWN", title: "Silk blend tie-neck blouse [ivory]", price: 98, salePrice: 78, discount: 20, reviews: 987, image: "/apparel6.jpg" },
    { id: 33015, sub: "tshirts", brand: "MUSINSA STANDARD", title: "Premium cotton crew neck [white]", price: 28, salePrice: 22, discount: 21, reviews: 3456, image: "/look1.jpg" },
    { id: 33016, sub: "knits", brand: "LEATHERY", title: "Cashmere blend v-neck sweater [gray]", price: 186, salePrice: 149, discount: 20, reviews: 1589, image: "/look2.jpg" },
    { id: 33017, sub: "hoodies", brand: "BADBLOOD", title: "Signature logo hoodie [ash gray]", price: 89, salePrice: 71, discount: 20, reviews: 1987, image: "/look3.jpg" },
    { id: 33018, sub: "shirts", brand: "CHINDOWN", title: "Stripe poplin shirt [blue/white]", price: 78, salePrice: 62, discount: 20, reviews: 1234, image: "/look4.jpg" },
    { id: 33019, sub: "blouses", brand: "ESCAPEFROM", title: "Ruffle collar blouse [cream]", price: 58, salePrice: 41, discount: 29, reviews: 876, image: "/look5.jpg" },
    { id: 33020, sub: "tshirts", brand: "SCULPTOR", title: "Pigment dyed pocket tee [olive]", price: 38, salePrice: 30, discount: 21, reviews: 1456, image: "/street-1.jpg" },
    { id: 33021, sub: "knits", brand: "GROVE", title: "Waffle knit henley [cream]", price: 58, salePrice: 46, discount: 21, reviews: 1345, image: "/wtrending1.jpg" },
    { id: 33022, sub: "hoodies", brand: "KIRSH", title: "Cherry logo zip-up hoodie [black]", price: 78, salePrice: 62, discount: 21, reviews: 1198, image: "/wtrending2.jpg" },
    { id: 33023, sub: "shirts", brand: "PARTIMENTO", title: "Linen camp collar shirt [sand]", price: 72, salePrice: 58, discount: 19, reviews: 1098, image: "/wtrending3.jpg" },
    { id: 33024, sub: "blouses", brand: "MUAHMUAH", title: "Puff sleeve crop top [white]", price: 38, salePrice: 25, discount: 34, reviews: 876, image: "/wtrending4.jpg" },
    { id: 33025, sub: "tshirts", brand: "ANDERSSON BELL", title: "Scarf fur frill t-shirt [gray]", price: 53, salePrice: 43, discount: 18, reviews: 756, image: "/wtrending5.jpg" },
    { id: 33026, sub: "knits", brand: "MUSINSA STANDARD", title: "Wool knit half zip-up [oatmeal]", price: 89, salePrice: 67, discount: 25, reviews: 1256, image: "/wtrending6.jpg" },
    { id: 33027, sub: "hoodies", brand: "ESCAPEFROM", title: "Logo print cropped hoodie [white]", price: 58, salePrice: 41, discount: 29, reviews: 576, image: "/wtrending7.jpg" },
    { id: 33028, sub: "shirts", brand: "BADBLOOD", title: "Oversized flannel shirt [red check]", price: 68, salePrice: 54, discount: 21, reviews: 945, image: "/pinterest1.jpg" },
    { id: 33029, sub: "blouses", brand: "PLACE STUDIO", title: "Pleated front blouse [lavender]", price: 52, salePrice: 36, discount: 31, reviews: 654, image: "/pinterest2.jpg" },
    { id: 33030, sub: "tshirts", brand: "LEATHERY", title: "Heavyweight cotton tee [black]", price: 42, salePrice: 34, discount: 19, reviews: 987, image: "/pinterest3.jpg" },
  ];

  const getFilteredTops = () => {
    if (activeTab === "all") return allTops;
    return allTops.filter((item) => item.sub === activeTab);
  };

  const filteredTops = getFilteredTops();
  const totalPages = Math.ceil(filteredTops.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredTops.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════ SECTION 1: TOP CATEGORIES ═══════════════ */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-light tracking-tight">Tops</h1>
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

      {/* ═══════════════ SECTION 2: TRENDING TOPS ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-600 mb-2 block">Ranking</span>
              <h2 className="text-3xl font-light tracking-tight">Trending Tops</h2>
              <p className="text-sm text-gray-500 mt-1">Most popular this week — updated daily</p>
            </div>
            <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors border-b border-gray-300 pb-0.5">
              Full Rankings →
            </Link>
          </div>

          <div className="relative group/scroll">
            <div
              ref={trendingRef}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {trendingTops.map((item) => (
                <Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block">
                  <div className="relative aspect-[3/4] bg-white overflow-hidden mb-3">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">
                      {item.rank}
                    </span>
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

      {/* ═══════════════ SECTION 3: EDITOR'S PICK (Brand Spotlight) ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-light tracking-tight">Editor&apos;s Pick</h2>
              <p className="text-sm text-gray-500 mt-1">This week&apos;s featured brand for tops</p>
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

      {/* ═══════════════ SECTION 4: STYLE GUIDE ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-light tracking-tight">Style Guide</h2>
            <p className="text-sm text-gray-500 mt-1">Styling inspiration for your favorite tops</p>
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
            <div
              ref={staffPickRef}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {staffPicks.map((item) => (
                <Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block">
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    {/* Staff note badge */}
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-gray-700 px-2.5 py-1 rounded-full">
                      {item.staffNote}
                    </span>
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

            <button onClick={() => scrollRight(staffPickRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button onClick={() => scrollLeft(staffPickRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 6: BROWSE ALL TOPS ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-light tracking-tight">Browse All Tops</h2>
              <p className="text-sm text-gray-500 mt-1">{filteredTops.length} items</p>
            </div>

            <div className="flex border border-gray-300 divide-x divide-gray-300">
              {(["all", "tshirts", "knits", "shirts", "hoodies", "blouses"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                  className={`px-4 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab === "all" ? "All" : tab === "tshirts" ? "T-Shirts" : tab === "knits" ? "Knits" : tab === "shirts" ? "Shirts" : tab === "hoodies" ? "Hoodies" : "Blouses"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentItems.map((item) => (
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
                  <p className="text-[11px] text-gray-400 pt-0.5">★ {item.reviews.toLocaleString()} reviews</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center mt-14 mb-4 gap-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${
                    currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"
                  }`}
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "text-black border-b-2 border-black"
                        : "text-gray-400 hover:text-black"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${
                    currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"
                  }`}
                >
                  ›
                </button>
              </div>

              <p className="text-xs text-gray-400">
                You&apos;re viewing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filteredTops.length)} of {filteredTops.length} results
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
