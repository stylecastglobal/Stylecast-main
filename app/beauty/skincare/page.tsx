"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SkincarePage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (id: number) => setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const trendingRef = useRef<HTMLDivElement>(null);
  const proPicksRef = useRef<HTMLDivElement>(null);
  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => ref.current?.scrollBy({ left: -320, behavior: "smooth" });
  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => ref.current?.scrollBy({ left: 320, behavior: "smooth" });

  useEffect(() => {
    const refs = [trendingRef, proPicksRef];
    const intervals = refs.map((ref) => setInterval(() => { const el = ref.current; if (!el) return; const max = el.scrollWidth - el.clientWidth; if (el.scrollLeft >= max - 10) el.scrollTo({ left: 0, behavior: "smooth" }); else el.scrollBy({ left: 300, behavior: "smooth" }); }, 4500));
    return () => intervals.forEach(clearInterval);
  }, []);

  const [activeTab, setActiveTab] = useState<"all"|"cleanser"|"toner"|"serum"|"moisturizer"|"suncare">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const cats = [
    { label: "Cleansers", sub: "Foam · Oil · Gel · Micellar", count: "5.1k sold", image: "/skincarebanner-beauty.jpg", color: "from-teal-900/70" },
    { label: "Serums", sub: "Ampoule · Essence · Treatment", count: "4.6k sold", image: "/collection-serum-ampoule.jpg", color: "from-blue-900/70" },
    { label: "Moisturizers", sub: "Cream · Gel · Lotion", count: "3.9k sold", image: "/collection-winter-skincare.jpg", color: "from-emerald-900/70" },
    { label: "Sun Care", sub: "SPF · After-Sun · Mist", count: "3.2k sold", image: "/collection-sun-care.jpg", color: "from-amber-900/70" },
  ];

  const trending = [
    { id: 80001, rank: 1, brand: "ANUA", title: "Heartleaf 77% Soothing Toner 250ml", price: 25, salePrice: 19, discount: 24, sold: 18760, rating: 4.9, image: "/collection-toner-essence.jpg" },
    { id: 80002, rank: 2, brand: "BIODANCE", title: "Bio-Collagen Real Deep Mask 4pcs", price: 28, salePrice: 21, discount: 25, sold: 15432, rating: 4.9, image: "/collection-face-masks.jpg" },
    { id: 80003, rank: 3, brand: "COSRX", title: "Advanced Snail 96 Mucin Power Essence", price: 22, salePrice: 17, discount: 23, sold: 13654, rating: 4.8, image: "/collection-toner-pads.jpg" },
    { id: 80004, rank: 4, brand: "BEAUTY OF JOSEON", title: "Relief Sun: Rice + Probiotics SPF50+", price: 18, salePrice: 14, discount: 22, sold: 12198, rating: 4.8, image: "/collection-sun-care.jpg" },
    { id: 80005, rank: 5, brand: "ROUND LAB", title: "Dokdo Toner 200ml", price: 18, salePrice: 14, discount: 22, sold: 10876, rating: 4.7, image: "/collection-facial-cleanser.jpg" },
    { id: 80006, rank: 6, brand: "NUMBUZIN", title: "No.3 Super Glowing Essence Toner", price: 21, salePrice: 16, discount: 24, sold: 9654, rating: 4.8, image: "/collection-best-sellers.jpg" },
    { id: 80007, rank: 7, brand: "SKIN1004", title: "Madagascar Centella Ampoule 100ml", price: 24, salePrice: 18, discount: 25, sold: 8432, rating: 4.7, image: "/collection-new-arrivals.jpg" },
    { id: 80008, rank: 8, brand: "DR. ALTHEA", title: "345 Relief Cream 50ml", price: 26, salePrice: 20, discount: 23, sold: 7654, rating: 4.7, image: "/collection-winter-skincare.jpg" },
  ];

  const editorSpotlight = { brandImage: "/skincarebanner-beauty.jpg", brandName: "ANUA", brandSubtitle: "Heartleaf Essentials", items: [
    { id: 81001, brand: "ANUA", title: "Heartleaf 77% Soothing Toner 250ml", price: 25, salePrice: 19, discount: 24, image: "/collection-toner-essence.jpg" },
    { id: 81002, brand: "ANUA", title: "Niacinamide 10% + TXA 4% Serum 30ml", price: 32, salePrice: 25, discount: 22, image: "/collection-serum-ampoule.jpg" },
    { id: 81003, brand: "ANUA", title: "Heartleaf Pore Control Cleansing Oil", price: 22, salePrice: 17, discount: 23, image: "/collection-facial-cleanser.jpg" },
    { id: 81004, brand: "ANUA", title: "Heartleaf 80% Cream Moisturizer", price: 28, salePrice: 22, discount: 21, image: "/collection-winter-skincare.jpg" },
    { id: 81005, brand: "ANUA", title: "Peach 70% Niacin Serum 30ml", price: 28, salePrice: 22, discount: 21, image: "/collection-sun-care.jpg" },
    { id: 81006, brand: "ANUA", title: "Heartleaf 77% Clear Pad 70 sheets", price: 20, salePrice: 16, discount: 20, image: "/collection-toner-pads.jpg" },
  ]};

  const guides = [
    { id: "rg1", title: "The Glass Skin Routine", subtitle: "A step-by-step guide to achieving the Korean glass skin look", image: "/anuabanner-beauty1.jpg" },
    { id: "rg2", title: "Winter Barrier Repair", subtitle: "Protect and restore your skin barrier this season", image: "/collection-winter-skincare.jpg" },
  ];

  const dermPicks = [
    { id: 82001, brand: "COSRX", title: "Snail Mucin 96% Power Essence 100ml", price: 22, salePrice: 17, discount: 23, image: "/collection-toner-pads.jpg", proNote: "Dr. Kim's pick" },
    { id: 82002, brand: "SKIN1004", title: "Madagascar Centella Ampoule 100ml", price: 24, salePrice: 18, discount: 25, image: "/collection-new-arrivals.jpg", proNote: "Dr. Lee's pick" },
    { id: 82003, brand: "ROUND LAB", title: "Birch Juice Moisturizing Cream", price: 22, salePrice: 17, discount: 23, image: "/collection-best-sellers.jpg", proNote: "Esthetician Yuna" },
    { id: 82004, brand: "BEAUTY OF JOSEON", title: "Glow Serum: Propolis + Niacinamide", price: 16, salePrice: 13, discount: 19, image: "/collection-facial-cleanser.jpg", proNote: "Dr. Park's pick" },
    { id: 82005, brand: "NUMBUZIN", title: "No.5 Vitamin-Niacinamide Serum", price: 21, salePrice: 16, discount: 24, image: "/collection-sun-care.jpg", proNote: "Facialist Mia" },
    { id: 82006, brand: "ISNTREE", title: "Hyaluronic Acid Toner 400ml", price: 18, salePrice: 14, discount: 22, image: "/collection-serum-ampoule.jpg", proNote: "Dr. Choi's pick" },
    { id: 82007, brand: "DR. ALTHEA", title: "345 Relief Cream 50ml", price: 26, salePrice: 20, discount: 23, image: "/collection-winter-skincare.jpg", proNote: "Dermatologist Jay" },
    { id: 82008, brand: "BIODANCE", title: "Skin-Glow Essence 45ml", price: 28, salePrice: 22, discount: 21, image: "/collection-toner-essence.jpg", proNote: "Dr. Seo's pick" },
  ];

  const allSkincare = [
    { id: 83001, sub: "toner", brand: "ANUA", title: "Heartleaf 77% Soothing Toner 250ml", price: 25, salePrice: 19, discount: 24, reviews: 18760, image: "/collection-toner-essence.jpg" },
    { id: 83002, sub: "serum", brand: "COSRX", title: "Advanced Snail 96 Mucin Essence 100ml", price: 22, salePrice: 17, discount: 23, reviews: 13654, image: "/collection-toner-pads.jpg" },
    { id: 83003, sub: "suncare", brand: "BEAUTY OF JOSEON", title: "Relief Sun SPF50+ 50ml", price: 18, salePrice: 14, discount: 22, reviews: 12198, image: "/collection-sun-care.jpg" },
    { id: 83004, sub: "cleanser", brand: "ROUND LAB", title: "Dokdo Cleanser 200ml", price: 14, salePrice: 11, discount: 21, reviews: 10876, image: "/collection-facial-cleanser.jpg" },
    { id: 83005, sub: "moisturizer", brand: "DR. ALTHEA", title: "345 Relief Cream 50ml", price: 26, salePrice: 20, discount: 23, reviews: 7654, image: "/collection-winter-skincare.jpg" },
    { id: 83006, sub: "toner", brand: "NUMBUZIN", title: "No.3 Super Glowing Essence Toner", price: 21, salePrice: 16, discount: 24, reviews: 9654, image: "/collection-best-sellers.jpg" },
    { id: 83007, sub: "serum", brand: "SKIN1004", title: "Madagascar Centella Ampoule 100ml", price: 24, salePrice: 18, discount: 25, reviews: 8432, image: "/collection-new-arrivals.jpg" },
    { id: 83008, sub: "cleanser", brand: "ANUA", title: "Heartleaf Pore Control Cleansing Oil", price: 22, salePrice: 17, discount: 23, reviews: 6543, image: "/collection-serum-ampoule.jpg" },
    { id: 83009, sub: "moisturizer", brand: "COSRX", title: "Snail 92 All-In-One Cream 100ml", price: 24, salePrice: 19, discount: 21, reviews: 5876, image: "/collection-toner-essence.jpg" },
    { id: 83010, sub: "suncare", brand: "ISNTREE", title: "Hyaluronic Acid Watery Sun Gel SPF50+", price: 16, salePrice: 13, discount: 19, reviews: 5432, image: "/collection-face-masks.jpg" },
    { id: 83011, sub: "serum", brand: "BEAUTY OF JOSEON", title: "Glow Serum: Propolis + Niacinamide", price: 16, salePrice: 13, discount: 19, reviews: 4987, image: "/collection-facial-cleanser.jpg" },
    { id: 83012, sub: "toner", brand: "ISNTREE", title: "Hyaluronic Acid Toner 400ml", price: 18, salePrice: 14, discount: 22, reviews: 4654, image: "/collection-sun-care.jpg" },
    { id: 83013, sub: "cleanser", brand: "COSRX", title: "Low pH Good Morning Gel Cleanser", price: 12, salePrice: 9, discount: 25, reviews: 4321, image: "/collection-toner-pads.jpg" },
    { id: 83014, sub: "moisturizer", brand: "ROUND LAB", title: "Birch Juice Moisturizing Cream", price: 22, salePrice: 17, discount: 23, reviews: 3987, image: "/collection-best-sellers.jpg" },
    { id: 83015, sub: "suncare", brand: "SKIN1004", title: "Hyalu-Cica Water-Fit Sun Serum SPF50+", price: 16, salePrice: 12, discount: 25, reviews: 3654, image: "/collection-new-arrivals.jpg" },
    { id: 83016, sub: "serum", brand: "NUMBUZIN", title: "No.5 Vitamin-Niacinamide Serum", price: 21, salePrice: 16, discount: 24, reviews: 3421, image: "/collection-serum-ampoule.jpg" },
    { id: 83017, sub: "cleanser", brand: "BEAUTY OF JOSEON", title: "Radiance Cleansing Balm 100ml", price: 18, salePrice: 14, discount: 22, reviews: 3198, image: "/collection-winter-skincare.jpg" },
    { id: 83018, sub: "toner", brand: "BIODANCE", title: "Skin-Glow Essence Toner 200ml", price: 24, salePrice: 19, discount: 21, reviews: 2876, image: "/collection-toner-essence.jpg" },
    { id: 83019, sub: "moisturizer", brand: "NUMBUZIN", title: "No.1 Dewy Glow Moisturizer", price: 24, salePrice: 19, discount: 21, reviews: 2654, image: "/collection-face-masks.jpg" },
    { id: 83020, sub: "suncare", brand: "ROUND LAB", title: "Birch Juice Sunscreen SPF50+", price: 16, salePrice: 13, discount: 19, reviews: 2432, image: "/collection-facial-cleanser.jpg" },
  ];

  const filtered = activeTab === "all" ? allSkincare : allSkincare.filter((i) => i.sub === activeTab);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative w-full h-[50vh] min-h-[360px] overflow-hidden bg-black">
        <Image src="/skincarebanner-beauty.jpg" alt="Skincare" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-14 max-w-[1600px] mx-auto">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-emerald-400 mb-3">Beauty Collection</span>
          <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight leading-none mb-3">Skincare</h1>
          <p className="text-sm text-white/50 max-w-md">Build your perfect routine with K-beauty&apos;s best cleansers, serums, moisturizers, and SPF — science-backed and dermatologist-approved.</p>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="py-12 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map((c) => (<Link key={c.label} href="#" className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100"><Image src={c.image} alt={c.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className={`absolute inset-0 bg-gradient-to-t ${c.color} to-transparent`} /><div className="absolute bottom-0 left-0 right-0 p-5"><p className="text-white text-sm font-semibold">{c.label}</p><p className="text-white/60 text-[11px] mt-0.5">{c.sub}</p><p className="text-white/40 text-xs mt-1">{c.count}</p></div></Link>))}
        </div>
      </section>

      {/* ═══ TRENDING ═══ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#F5FAF7]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10"><div><span className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-600 mb-2 block">Ranking</span><h2 className="text-3xl font-light tracking-tight">Trending Skincare</h2><p className="text-sm text-gray-500 mt-1">Most loved this week — updated daily</p></div><Link href="#" className="text-xs text-gray-500 hover:text-black border-b border-gray-300 pb-0.5">Full Rankings →</Link></div>
          <div className="relative group/scroll">
            <div ref={trendingRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none" }}>
              {trending.map((item) => (<Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block"><div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute top-3 left-3 bg-black text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">{item.rank}</span><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-emerald-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p><div className="flex items-center gap-3 pt-0.5"><span className="text-[11px] text-gray-400">★ {item.rating}</span><span className="text-[11px] text-gray-400">{item.sold.toLocaleString()} sold</span></div></div></Link>))}
            </div>
            <button onClick={() => scrollRight(trendingRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">›</span></button>
            <button onClick={() => scrollLeft(trendingRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">‹</span></button>
          </div>
        </div>
      </section>

      {/* ═══ EDITOR'S PICK ═══ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-10"><h2 className="text-3xl font-light tracking-tight">Editor&apos;s Pick</h2><p className="text-sm text-gray-500 mt-1">This week&apos;s featured brand</p></div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-5"><Link href="#" className="group flex flex-col h-full"><div className="relative flex-1 min-h-0 bg-gray-100 overflow-hidden rounded-2xl"><Image src={editorSpotlight.brandImage} alt={editorSpotlight.brandName} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="mt-4 pb-1"><p className="text-xs text-gray-500 font-medium">{editorSpotlight.brandName}</p><p className="text-sm text-gray-700 mt-0.5 italic">{editorSpotlight.brandSubtitle}</p></div></Link></div>
            <div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-4">
              {editorSpotlight.items.map((item) => (<Link key={item.id} href="#" className="group block"><div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-emerald-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p></div></Link>))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ROUTINE GUIDE ═══ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#F5FAF7]">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-10"><h2 className="text-3xl font-light tracking-tight">Routine Guide</h2><p className="text-sm text-gray-500 mt-1">Build the perfect skincare routine</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{guides.map((g) => (<Link key={g.id} href="#" className="group relative block aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100"><Image src={g.image} alt={g.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><div className="absolute bottom-0 left-0 right-0 p-6"><h3 className="text-xl text-white font-light mb-1">{g.title}</h3><p className="text-sm text-white/60">{g.subtitle}</p></div></Link>))}</div>
        </div>
      </section>

      {/* ═══ DERM PICKS ═══ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-10"><h2 className="text-3xl font-light tracking-tight">Dermatologist Picks</h2><p className="text-sm text-gray-500 mt-1">Recommended by skin experts</p></div>
          <div className="relative group/scroll">
            <div ref={proPicksRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none" }}>
              {dermPicks.map((item) => (<Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block"><div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-gray-700 px-2.5 py-1 rounded-full">{item.proNote}</span><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-emerald-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p></div></Link>))}
            </div>
            <button onClick={() => scrollRight(proPicksRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">›</span></button>
            <button onClick={() => scrollLeft(proPicksRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">‹</span></button>
          </div>
        </div>
      </section>

      {/* ═══ BROWSE ALL ═══ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#F5FAF7]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4"><div><h2 className="text-3xl font-light tracking-tight">Browse All Skincare</h2><p className="text-sm text-gray-500 mt-1">{filtered.length} items</p></div>
            <div className="flex border border-gray-300 divide-x divide-gray-300 rounded-lg overflow-hidden">{(["all","cleanser","toner","serum","moisturizer","suncare"] as const).map((tab) => (<button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} className={`px-4 py-2.5 text-xs font-medium transition-colors ${activeTab === tab ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>{tab === "all" ? "All" : tab === "cleanser" ? "Cleansers" : tab === "toner" ? "Toners" : tab === "serum" ? "Serums" : tab === "moisturizer" ? "Moisturizers" : "Sun Care"}</button>))}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{currentItems.map((item) => (<Link key={item.id} href="#" className="group block"><div className="relative aspect-square bg-white overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={`text-sm ${wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}`}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-emerald-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p><p className="text-[11px] text-gray-400 pt-0.5">★ {item.reviews.toLocaleString()} reviews</p></div></Link>))}</div>
          {totalPages > 1 && (<div className="flex flex-col items-center mt-14 mb-4 gap-3"><div className="flex items-center gap-1"><button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}>‹</button>{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (<button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-black"}`}>{page}</button>))}<button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}>›</button></div><p className="text-xs text-gray-400">You&apos;re viewing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filtered.length)} of {filtered.length} results</p></div>)}
        </div>
      </section>
    </div>
  );
}
