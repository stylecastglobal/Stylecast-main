"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DressesPage() {
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

  const [activeTab, setActiveTab] = useState<"all" | "mini" | "midi" | "maxi" | "casual" | "formal">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ─── DATA ───

  const topCategories = [
    { label: "Mini Dresses", count: "2.9k sold", image: "/apparel-hero1.jpg" },
    { label: "Midi Dresses", count: "3.4k sold", image: "/apparel-hero5.jpg" },
    { label: "Maxi Dresses", count: "1.8k sold", image: "/apparel-knitsection-hero.jpg" },
    { label: "Formal", count: "1.5k sold", image: "/apparel-hero3.jpg" },
  ];

  const trendingDresses = [
    { id: 50001, rank: 1, brand: "PLACE STUDIO", title: "Pleated midi wrap dress [black]", price: 128, salePrice: 89, discount: 30, sold: 4532, rating: 4.9, image: "/wtrending1.jpg" },
    { id: 50002, rank: 2, brand: "MUAHMUAH", title: "Ribbon bow mini dress [cream]", price: 72, salePrice: 43, discount: 40, sold: 4210, rating: 4.8, image: "/wtrending2.jpg" },
    { id: 50003, rank: 3, brand: "ANDERSSON BELL", title: "Asymmetric layered dress [gray]", price: 285, salePrice: 228, discount: 20, sold: 3876, rating: 4.9, image: "/wtrending3.jpg" },
    { id: 50004, rank: 4, brand: "CHINDOWN", title: "Silk blend slip dress [champagne]", price: 148, salePrice: 104, discount: 30, sold: 3654, rating: 4.7, image: "/wtrending4.jpg" },
    { id: 50005, rank: 5, brand: "GROVE", title: "Cotton shirt dress [white]", price: 89, salePrice: 71, discount: 20, sold: 3421, rating: 4.6, image: "/wtrending5.jpg" },
    { id: 50006, rank: 6, brand: "ESCAPEFROM", title: "Smocked floral mini dress [blue]", price: 68, salePrice: 41, discount: 40, sold: 3198, rating: 4.5, image: "/wtrending6.jpg" },
    { id: 50007, rank: 7, brand: "SCULPTOR", title: "Logo strap knit dress [black]", price: 108, salePrice: 86, discount: 20, sold: 2987, rating: 4.7, image: "/wtrending7.jpg" },
    { id: 50008, rank: 8, brand: "KIRSH", title: "Cherry print puff sleeve dress [pink]", price: 82, salePrice: 66, discount: 20, sold: 2876, rating: 4.6, image: "/pinterest1.jpg" },
  ];

  const editorSpotlight = {
    brandImage: "/brandsyouwilllove-3.jpg",
    brandName: "PLACE STUDIO",
    brandSubtitle: "Effortless Elegance",
    items: [
      { id: 51001, brand: "PLACE STUDIO", title: "Gathered waist midi dress [black]", price: 128, salePrice: 102, discount: 20, image: "/look1.jpg" },
      { id: 51002, brand: "PLACE STUDIO", title: "Linen blend shirt dress [ivory]", price: 108, salePrice: 86, discount: 20, image: "/look2.jpg" },
      { id: 51003, brand: "PLACE STUDIO", title: "Pleated wrap mini dress [olive]", price: 98, salePrice: 69, discount: 30, image: "/look3.jpg" },
      { id: 51004, brand: "PLACE STUDIO", title: "Balloon sleeve A-line dress [cream]", price: 118, salePrice: 94, discount: 20, image: "/look4.jpg" },
      { id: 51005, brand: "PLACE STUDIO", title: "Tiered maxi dress [sage]", price: 138, salePrice: 110, discount: 20, image: "/look5.jpg" },
      { id: 51006, brand: "PLACE STUDIO", title: "Button front midi dress [navy]", price: 108, salePrice: 86, discount: 20, image: "/street-1.jpg" },
    ],
  };

  const styleGuides = [
    { id: "sg1", title: "Day to Night", subtitle: "How to transition your dress from office to dinner", image: "/apparel-cozyknitcollection.jpg" },
    { id: "sg2", title: "The Art of Layering", subtitle: "Pair dresses with knits for an effortless winter look", image: "/apparel-winteressentials-hero.jpg" },
  ];

  const staffPicks = [
    { id: 52001, brand: "CHINDOWN", title: "Silk blend cami midi dress [champagne]", price: 148, salePrice: 104, discount: 30, image: "/drop-1.jpg", staffNote: "Emily's pick" },
    { id: 52002, brand: "ANDERSSON BELL", title: "Deconstructed shirt dress [white]", price: 265, salePrice: 212, discount: 20, image: "/drop-2.jpg", staffNote: "Jay's pick" },
    { id: 52003, brand: "MUAHMUAH", title: "Smocked puff sleeve dress [pink]", price: 62, salePrice: 37, discount: 40, image: "/drop-3.jpg", staffNote: "Sora's pick" },
    { id: 52004, brand: "GROVE", title: "Cotton wrap midi dress [olive]", price: 98, salePrice: 78, discount: 20, image: "/drop-6.jpg", staffNote: "Minho's pick" },
    { id: 52005, brand: "ESCAPEFROM", title: "Ribbon tie mini dress [cream]", price: 72, salePrice: 43, discount: 40, image: "/drop-7.jpg", staffNote: "Yuna's pick" },
    { id: 52006, brand: "PLACE STUDIO", title: "Pleated midi skirt dress [black]", price: 118, salePrice: 94, discount: 20, image: "/drop-8.jpg", staffNote: "Hana's pick" },
    { id: 52007, brand: "SCULPTOR", title: "Logo print sweat dress [gray]", price: 82, salePrice: 66, discount: 20, image: "/women-printer-1.jpg", staffNote: "Joon's pick" },
    { id: 52008, brand: "KIRSH", title: "Cherry collar knit dress [navy]", price: 92, salePrice: 74, discount: 20, image: "/women-grid-2.jpg", staffNote: "Mia's pick" },
  ];

  const allDresses = [
    { id: 53001, sub: "midi", brand: "PLACE STUDIO", title: "Pleated midi wrap dress [black]", price: 128, salePrice: 89, discount: 30, reviews: 4532, image: "/pinterest1.jpg" },
    { id: 53002, sub: "mini", brand: "MUAHMUAH", title: "Ribbon bow mini dress [cream]", price: 72, salePrice: 43, discount: 40, reviews: 4210, image: "/pinterest2.jpg" },
    { id: 53003, sub: "formal", brand: "ANDERSSON BELL", title: "Asymmetric layered dress [gray]", price: 285, salePrice: 228, discount: 20, reviews: 3876, image: "/pinterest3.jpg" },
    { id: 53004, sub: "maxi", brand: "CHINDOWN", title: "Silk blend maxi slip dress [champagne]", price: 168, salePrice: 118, discount: 30, reviews: 3654, image: "/pinterest4.jpg" },
    { id: 53005, sub: "casual", brand: "GROVE", title: "Cotton shirt dress [white]", price: 89, salePrice: 71, discount: 20, reviews: 3421, image: "/pinterest5.jpg" },
    { id: 53006, sub: "mini", brand: "ESCAPEFROM", title: "Smocked floral mini dress [blue]", price: 68, salePrice: 41, discount: 40, reviews: 3198, image: "/pinterest6.jpg" },
    { id: 53007, sub: "midi", brand: "SCULPTOR", title: "Logo strap knit dress [black]", price: 108, salePrice: 86, discount: 20, reviews: 2987, image: "/pinterest7.jpg" },
    { id: 53008, sub: "mini", brand: "KIRSH", title: "Cherry print puff sleeve dress [pink]", price: 82, salePrice: 66, discount: 20, reviews: 2876, image: "/pinterest10.jpg" },
    { id: 53009, sub: "formal", brand: "LEATHERY", title: "Faux leather midi dress [black]", price: 178, salePrice: 142, discount: 20, reviews: 1432, image: "/pinterest12.jpg" },
    { id: 53010, sub: "maxi", brand: "PLACE STUDIO", title: "Tiered cotton maxi dress [sage]", price: 138, salePrice: 110, discount: 20, reviews: 1876, image: "/pinterest13.jpg" },
    { id: 53011, sub: "casual", brand: "MUSINSA STANDARD", title: "Jersey t-shirt dress [charcoal]", price: 42, salePrice: 34, discount: 19, reviews: 2654, image: "/fall-4.jpg" },
    { id: 53012, sub: "midi", brand: "CHINDOWN", title: "Satin wrap midi dress [olive]", price: 138, salePrice: 97, discount: 30, reviews: 1987, image: "/fall-5.jpg" },
    { id: 53013, sub: "mini", brand: "BADBLOOD", title: "Denim mini dress [light blue]", price: 82, salePrice: 66, discount: 20, reviews: 1654, image: "/feed-8.jpg" },
    { id: 53014, sub: "formal", brand: "CHINDOWN", title: "Pleated chiffon gown [blush]", price: 298, salePrice: 238, discount: 20, reviews: 876, image: "/product-8.jpg" },
    { id: 53015, sub: "casual", brand: "MUAHMUAH", title: "Smocked waist sundress [yellow]", price: 58, salePrice: 38, discount: 34, reviews: 1567, image: "/product-9.jpg" },
    { id: 53016, sub: "maxi", brand: "GROVE", title: "Linen button-front maxi [ivory]", price: 118, salePrice: 94, discount: 20, reviews: 1345, image: "/trend-9.jpg" },
    { id: 53017, sub: "midi", brand: "ESCAPEFROM", title: "Ruched body-con midi dress [black]", price: 78, salePrice: 47, discount: 40, reviews: 1789, image: "/apparel6.jpg" },
    { id: 53018, sub: "mini", brand: "SCULPTOR", title: "Track-style zip mini dress [navy]", price: 92, salePrice: 74, discount: 20, reviews: 1234, image: "/wtrending1.jpg" },
    { id: 53019, sub: "formal", brand: "PLACE STUDIO", title: "Structured blazer dress [black]", price: 168, salePrice: 134, discount: 20, reviews: 987, image: "/wtrending2.jpg" },
    { id: 53020, sub: "casual", brand: "KIRSH", title: "Cherry print jersey dress [cream]", price: 62, salePrice: 50, discount: 19, reviews: 1456, image: "/wtrending3.jpg" },
    { id: 53021, sub: "maxi", brand: "ANDERSSON BELL", title: "Layered tulle maxi dress [gray]", price: 325, salePrice: 260, discount: 20, reviews: 765, image: "/wtrending4.jpg" },
    { id: 53022, sub: "midi", brand: "MUSINSA STANDARD", title: "Rib knit midi dress [oatmeal]", price: 52, salePrice: 42, discount: 19, reviews: 2198, image: "/wtrending5.jpg" },
    { id: 53023, sub: "mini", brand: "GROVE", title: "Tweed bouclé mini dress [pink]", price: 108, salePrice: 86, discount: 20, reviews: 876, image: "/wtrending6.jpg" },
    { id: 53024, sub: "casual", brand: "BADBLOOD", title: "Oversized hoodie dress [gray]", price: 72, salePrice: 58, discount: 19, reviews: 1345, image: "/wtrending7.jpg" },
    { id: 53025, sub: "formal", brand: "LEATHERY", title: "Structured leather mini dress [burgundy]", price: 228, salePrice: 182, discount: 20, reviews: 654, image: "/look1.jpg" },
    { id: 53026, sub: "maxi", brand: "ESCAPEFROM", title: "Floral print maxi dress [blue]", price: 88, salePrice: 53, discount: 40, reviews: 1654, image: "/look2.jpg" },
    { id: 53027, sub: "midi", brand: "PARTIMENTO", title: "Utility midi shirt dress [khaki]", price: 98, salePrice: 78, discount: 20, reviews: 1234, image: "/look3.jpg" },
    { id: 53028, sub: "casual", brand: "PLACE STUDIO", title: "Cotton poplin day dress [white]", price: 78, salePrice: 62, discount: 21, reviews: 1876, image: "/look4.jpg" },
    { id: 53029, sub: "mini", brand: "CHINDOWN", title: "Sequin cocktail mini dress [silver]", price: 198, salePrice: 139, discount: 30, reviews: 987, image: "/look5.jpg" },
    { id: 53030, sub: "formal", brand: "ANDERSSON BELL", title: "Draped satin evening dress [black]", price: 345, salePrice: 276, discount: 20, reviews: 543, image: "/street-1.jpg" },
  ];

  const getFilteredDresses = () => {
    if (activeTab === "all") return allDresses;
    return allDresses.filter((item) => item.sub === activeTab);
  };

  const filteredDresses = getFilteredDresses();
  const totalPages = Math.ceil(filteredDresses.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredDresses.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════ SECTION 1: TOP CATEGORIES ═══════════════ */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-light tracking-tight">Dresses</h1>
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

      {/* ═══════════════ SECTION 2: TRENDING DRESSES ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-600 mb-2 block">Ranking</span>
              <h2 className="text-3xl font-light tracking-tight">Trending Dresses</h2>
              <p className="text-sm text-gray-500 mt-1">Most popular this week — updated daily</p>
            </div>
            <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors border-b border-gray-300 pb-0.5">
              Full Rankings →
            </Link>
          </div>

          <div className="relative group/scroll">
            <div ref={trendingRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {trendingDresses.map((item) => (
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
              <p className="text-sm text-gray-500 mt-1">This week&apos;s featured brand for dresses</p>
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
            <p className="text-sm text-gray-500 mt-1">Dress inspiration for every mood</p>
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

      {/* ═══════════════ SECTION 6: BROWSE ALL DRESSES ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-light tracking-tight">Browse All Dresses</h2>
              <p className="text-sm text-gray-500 mt-1">{filteredDresses.length} items</p>
            </div>
            <div className="flex border border-gray-300 divide-x divide-gray-300">
              {(["all", "mini", "midi", "maxi", "casual", "formal"] as const).map((tab) => (
                <button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} className={`px-4 py-2.5 text-xs font-medium transition-colors ${activeTab === tab ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                  {tab === "all" ? "All" : tab === "mini" ? "Mini" : tab === "midi" ? "Midi" : tab === "maxi" ? "Maxi" : tab === "casual" ? "Casual" : "Formal"}
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
              <p className="text-xs text-gray-400">You&apos;re viewing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filteredDresses.length)} of {filteredDresses.length} results</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
