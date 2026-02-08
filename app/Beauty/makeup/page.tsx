"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MakeupPage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const trendingRef = useRef<HTMLDivElement>(null);
  const proPicksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refs = [trendingRef, proPicksRef];
    const intervals = refs.map((ref) =>
      setInterval(() => {
        const el = ref.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 10) el.scrollTo({ left: 0, behavior: "smooth" });
        else el.scrollBy({ left: 300, behavior: "smooth" });
      }, 4500)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => ref.current?.scrollBy({ left: -320, behavior: "smooth" });
  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => ref.current?.scrollBy({ left: 320, behavior: "smooth" });

  const [activeTab, setActiveTab] = useState<"all" | "face" | "lips" | "eyes" | "cheeks" | "tools">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ─── DATA ───
  const heroCollections = [
    { label: "Face", subtitle: "Foundation · Primer · Concealer", image: "/makeupbanner-beauty.jpg" },
    { label: "Lips", subtitle: "Tint · Gloss · Lipstick", image: "/dasiquebanner-beauty1.jpg" },
    { label: "Eyes", subtitle: "Palette · Mascara · Liner", image: "/rhodebanner-beauty.jpg" },
    { label: "Cheeks", subtitle: "Blush · Highlight · Contour", image: "/anuabanner-beauty1.jpg" },
  ];

  const trendingMakeup = [
    { id: 70001, rank: 1, brand: "TIRTIR", title: "Mask Fit Red Cushion Foundation SPF40", price: 38, salePrice: 28, discount: 26, sold: 12450, rating: 4.9, image: "/trending-booster-pro.jpg" },
    { id: 70002, rank: 2, brand: "ROM&ND", title: "Juicy Lasting Tint #09 Litchi Coral", price: 14, salePrice: 11, discount: 21, sold: 9876, rating: 4.8, image: "/trending-ultra-tune.jpg" },
    { id: 70003, rank: 3, brand: "DASIQUE", title: "Shadow Palette #07 Milk Latte", price: 34, salePrice: 27, discount: 21, sold: 8654, rating: 4.8, image: "/trending-mini-booster.jpg" },
    { id: 70004, rank: 4, brand: "MILKTOUCH", title: "Black Peel Off Lip Tattoo [Rose Petal]", price: 24, salePrice: 19, discount: 21, sold: 7432, rating: 4.7, image: "/trending-korean-devices.jpg" },
    { id: 70005, rank: 5, brand: "PERIPERA", title: "Ink Mood Glowy Tint #04 Cozy Beige", price: 12, salePrice: 9, discount: 25, sold: 6789, rating: 4.6, image: "/collection-best-sellers.jpg" },
    { id: 70006, rank: 6, brand: "JUDYDOLL", title: "2-in-1 Highlighter Contour Palette", price: 23, salePrice: 18, discount: 22, sold: 5432, rating: 4.7, image: "/collection-new-arrivals.jpg" },
    { id: 70007, rank: 7, brand: "CLIO", title: "Kill Cover Fixer Cushion SPF50+", price: 32, salePrice: 25, discount: 22, sold: 4987, rating: 4.8, image: "/collection-facial-cleanser.jpg" },
    { id: 70008, rank: 8, brand: "ETUDE", title: "Drawing Eye Brow Pencil [Gray Brown]", price: 6, salePrice: 5, discount: 17, sold: 4567, rating: 4.5, image: "/collection-sun-care.jpg" },
  ];

  const editorSpotlight = {
    brandImage: "/makeupbanner-beauty.jpg",
    brandName: "ROM&ND",
    brandSubtitle: "K-Beauty Lip Essentials",
    items: [
      { id: 71001, brand: "ROM&ND", title: "Glasting Melting Balm #01 Coco Nutmeg", price: 16, salePrice: 13, discount: 19, image: "/collection-winter-skincare.jpg" },
      { id: 71002, brand: "ROM&ND", title: "Better Than Cheek #04 Fig Chip", price: 12, salePrice: 10, discount: 17, image: "/collection-best-sellers.jpg" },
      { id: 71003, brand: "ROM&ND", title: "Han All Fix Mascara #01 Long Black", price: 14, salePrice: 11, discount: 21, image: "/collection-new-arrivals.jpg" },
      { id: 71004, brand: "ROM&ND", title: "Juicy Lasting Tint #22 Pomelo Skin", price: 14, salePrice: 11, discount: 21, image: "/collection-facial-cleanser.jpg" },
      { id: 71005, brand: "ROM&ND", title: "Blur Fudge Tint #10 Fudge Rose", price: 16, salePrice: 13, discount: 19, image: "/collection-sun-care.jpg" },
      { id: 71006, brand: "ROM&ND", title: "Better Than Palette #03 Rosebud Garden", price: 28, salePrice: 22, discount: 21, image: "/collection-toner-pads.jpg" },
    ],
  };

  const lookbooks = [
    { id: "lb1", title: "Clean Girl Glow", subtitle: "Achieve the viral no-makeup makeup look", image: "/rhodebanner-beauty.jpg" },
    { id: "lb2", title: "Bold Lip Edit", subtitle: "Statement lips for every skin tone", image: "/dasiquebanner-beauty1.jpg" },
  ];

  const proPicks = [
    { id: 72001, brand: "CLIO", title: "Kill Cover Fixer Cushion SPF50+", price: 32, salePrice: 25, discount: 22, image: "/collection-winter-skincare.jpg", proNote: "MUA Sarah's pick" },
    { id: 72002, brand: "PERIPERA", title: "Ink V Shading [Natural Brown]", price: 14, salePrice: 11, discount: 21, image: "/collection-best-sellers.jpg", proNote: "Artist Jini's pick" },
    { id: 72003, brand: "ETUDE", title: "Play Color Eyes Palette [Wine Party]", price: 22, salePrice: 18, discount: 18, image: "/collection-new-arrivals.jpg", proNote: "YT Mia's pick" },
    { id: 72004, brand: "DASIQUE", title: "Blending Mood Cheek #03 Mellow Coral", price: 18, salePrice: 14, discount: 22, image: "/collection-facial-cleanser.jpg", proNote: "Editor Hana's pick" },
    { id: 72005, brand: "TIRTIR", title: "My Glow Cream Blush [Peach Coral]", price: 16, salePrice: 13, discount: 19, image: "/collection-sun-care.jpg", proNote: "Pro Yuna's pick" },
    { id: 72006, brand: "ROM&ND", title: "See-Through Veiled Lip Tint #01", price: 14, salePrice: 11, discount: 21, image: "/collection-toner-pads.jpg", proNote: "MUA Jay's pick" },
    { id: 72007, brand: "MILKTOUCH", title: "Marshmallow Powder Pact", price: 18, salePrice: 14, discount: 22, image: "/collection-serum-ampoule.jpg", proNote: "Pro Sora's pick" },
    { id: 72008, brand: "JUDYDOLL", title: "Single Shadow #M216 Cinnamon", price: 8, salePrice: 6, discount: 25, image: "/collection-toner-essence.jpg", proNote: "MUA Joon's pick" },
  ];

  const allMakeup = [
    { id: 73001, sub: "face", brand: "TIRTIR", title: "Mask Fit Red Cushion Foundation SPF40", price: 38, salePrice: 28, discount: 26, reviews: 12450, image: "/trending-booster-pro.jpg" },
    { id: 73002, sub: "lips", brand: "ROM&ND", title: "Juicy Lasting Tint #09 Litchi Coral", price: 14, salePrice: 11, discount: 21, reviews: 9876, image: "/trending-ultra-tune.jpg" },
    { id: 73003, sub: "eyes", brand: "DASIQUE", title: "Shadow Palette #07 Milk Latte", price: 34, salePrice: 27, discount: 21, reviews: 8654, image: "/trending-mini-booster.jpg" },
    { id: 73004, sub: "lips", brand: "MILKTOUCH", title: "Black Peel Off Lip Tattoo [Rose]", price: 24, salePrice: 19, discount: 21, reviews: 7432, image: "/trending-korean-devices.jpg" },
    { id: 73005, sub: "cheeks", brand: "PERIPERA", title: "Pure Blushed Sunshine Cheek #01", price: 12, salePrice: 9, discount: 25, reviews: 6789, image: "/collection-best-sellers.jpg" },
    { id: 73006, sub: "face", brand: "JUDYDOLL", title: "2-in-1 Highlighter Contour Palette", price: 23, salePrice: 18, discount: 22, reviews: 5432, image: "/collection-new-arrivals.jpg" },
    { id: 73007, sub: "face", brand: "CLIO", title: "Kill Cover Fixer Cushion SPF50+", price: 32, salePrice: 25, discount: 22, reviews: 4987, image: "/collection-facial-cleanser.jpg" },
    { id: 73008, sub: "eyes", brand: "ETUDE", title: "Drawing Eye Brow Pencil [Gray Brown]", price: 6, salePrice: 5, discount: 17, reviews: 4567, image: "/collection-sun-care.jpg" },
    { id: 73009, sub: "tools", brand: "FILLIMILLI", title: "Soft Velvet Makeup Sponge Set", price: 12, salePrice: 9, discount: 25, reviews: 3876, image: "/collection-toner-pads.jpg" },
    { id: 73010, sub: "cheeks", brand: "TIRTIR", title: "My Glow Cream Blush [Peach Coral]", price: 16, salePrice: 13, discount: 19, reviews: 3654, image: "/collection-serum-ampoule.jpg" },
    { id: 73011, sub: "lips", brand: "ROM&ND", title: "Blur Fudge Tint #10 Fudge Rose", price: 16, salePrice: 13, discount: 19, reviews: 3421, image: "/collection-toner-essence.jpg" },
    { id: 73012, sub: "eyes", brand: "CLIO", title: "Sharp So Simple Waterproof Liner", price: 14, salePrice: 11, discount: 21, reviews: 3198, image: "/collection-face-masks.jpg" },
    { id: 73013, sub: "face", brand: "INNISFREE", title: "No-Sebum Mineral Pact 8.5g", price: 10, salePrice: 8, discount: 20, reviews: 2987, image: "/collection-winter-skincare.jpg" },
    { id: 73014, sub: "tools", brand: "FILLIMILLI", title: "Dual Ended Contour Brush", price: 14, salePrice: 11, discount: 21, reviews: 2654, image: "/collection-best-sellers.jpg" },
    { id: 73015, sub: "cheeks", brand: "DASIQUE", title: "Blending Mood Cheek #05 Berry Syrup", price: 18, salePrice: 14, discount: 22, reviews: 2432, image: "/collection-new-arrivals.jpg" },
    { id: 73016, sub: "lips", brand: "PERIPERA", title: "Ink Mood Glowy Tint #04 Cozy Beige", price: 12, salePrice: 9, discount: 25, reviews: 2198, image: "/collection-facial-cleanser.jpg" },
    { id: 73017, sub: "eyes", brand: "ETUDE", title: "Play Color Eyes #Wine Party", price: 22, salePrice: 18, discount: 18, reviews: 1987, image: "/collection-sun-care.jpg" },
    { id: 73018, sub: "face", brand: "LANEIGE", title: "Neo Cushion Matte SPF42 [21N]", price: 36, salePrice: 29, discount: 19, reviews: 1876, image: "/collection-toner-pads.jpg" },
    { id: 73019, sub: "tools", brand: "PICCASSO", title: "Pro Foundation Brush #FB17", price: 28, salePrice: 22, discount: 21, reviews: 1654, image: "/collection-serum-ampoule.jpg" },
    { id: 73020, sub: "cheeks", brand: "ROM&ND", title: "Better Than Cheek #06 Plum Chip", price: 12, salePrice: 10, discount: 17, reviews: 1432, image: "/collection-toner-essence.jpg" },
  ];

  const filtered = activeTab === "all" ? allMakeup : allMakeup.filter((i) => i.sub === activeTab);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">

      {/* ═══ CATEGORY CARDS ═══ */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-light tracking-tight">Makeup</h1>
              <p className="text-sm text-gray-500 mt-1">Shop by category</p>
            </div>
            <Link href="/beauty" className="text-xs text-gray-500 hover:text-black transition-colors">All Beauty →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroCollections.map((cat) => (
              <Link key={cat.label} href="#" className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                <Image src={cat.image} alt={cat.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white text-sm font-semibold">{cat.label}</p>
                  <p className="text-white/60 text-[11px] mt-0.5">{cat.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRENDING ═══ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FFF9F9]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-rose-500 mb-2 block">Ranking</span>
              <h2 className="text-3xl font-light tracking-tight">Trending Makeup</h2>
              <p className="text-sm text-gray-500 mt-1">Most loved this week — updated daily</p>
            </div>
            <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors border-b border-gray-300 pb-0.5">Full Rankings →</Link>
          </div>
          <div className="relative group/scroll">
            <div ref={trendingRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none" }}>
              {trendingMakeup.map((item) => (
                <Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">{item.rank}</span>
                    <button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-2"><span className="text-sm font-semibold text-rose-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div>
                    <p className="text-xs text-gray-400 line-through">${item.price}</p>
                    <div className="flex items-center gap-3 pt-0.5"><span className="text-[11px] text-gray-400">★ {item.rating}</span><span className="text-[11px] text-gray-400">{item.sold.toLocaleString()} sold</span></div>
                  </div>
                </Link>
              ))}
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
            <div className="col-span-12 md:col-span-5">
              <Link href="#" className="group flex flex-col h-full">
                <div className="relative flex-1 min-h-0 bg-gray-100 overflow-hidden rounded-2xl"><Image src={editorSpotlight.brandImage} alt={editorSpotlight.brandName} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <div className="mt-4 pb-1"><p className="text-xs text-gray-500 font-medium">{editorSpotlight.brandName}</p><p className="text-sm text-gray-700 mt-0.5 italic">{editorSpotlight.brandSubtitle}</p></div>
              </Link>
            </div>
            <div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-4">
              {editorSpotlight.items.map((item) => (
                <Link key={item.id} href="#" className="group block">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div>
                  <div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-rose-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LOOKBOOK ═══ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FFF9F9]">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-10"><h2 className="text-3xl font-light tracking-tight">Favorite Makeup Brands</h2><p className="text-sm text-gray-500 mt-1">Makeup inspiration & tutorials</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lookbooks.map((look) => (
              <Link key={look.id} href="#" className="group relative block aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100"><Image src={look.image} alt={look.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><div className="absolute bottom-0 left-0 right-0 p-6"><h3 className="text-xl text-white font-light mb-1">{look.title}</h3><p className="text-sm text-white/60">{look.subtitle}</p></div></Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRO PICKS ═══ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-10"><h2 className="text-3xl font-light tracking-tight">Pro Picks</h2><p className="text-sm text-gray-500 mt-1">Hand-picked by makeup artists</p></div>
          <div className="relative group/scroll">
            <div ref={proPicksRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none" }}>
              {proPicks.map((item) => (
                <Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-gray-700 px-2.5 py-1 rounded-full">{item.proNote}</span><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div>
                  <div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-rose-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p></div>
                </Link>
              ))}
            </div>
            <button onClick={() => scrollRight(proPicksRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">›</span></button>
            <button onClick={() => scrollLeft(proPicksRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">‹</span></button>
          </div>
        </div>
      </section>

      {/* ═══ BROWSE ALL ═══ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FFF9F9]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div><h2 className="text-3xl font-light tracking-tight">Browse All Makeup</h2><p className="text-sm text-gray-500 mt-1">{filtered.length} items</p></div>
            <div className="flex border border-gray-300 divide-x divide-gray-300 rounded-lg overflow-hidden">
              {(["all","face","lips","eyes","cheeks","tools"] as const).map((tab) => (
                <button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} className={`px-4 py-2.5 text-xs font-medium transition-colors ${activeTab === tab ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                  {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentItems.map((item) => (
              <Link key={item.id} href="#" className="group block">
                <div className="relative aspect-square bg-white overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={`text-sm ${wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}`}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div>
                <div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-rose-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p><p className="text-[11px] text-gray-400 pt-0.5">★ {item.reviews.toLocaleString()} reviews</p></div>
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex flex-col items-center mt-14 mb-4 gap-3">
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (<button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-black"}`}>{page}</button>))}
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}>›</button>
              </div>
              <p className="text-xs text-gray-400">You&apos;re viewing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filtered.length)} of {filtered.length} results</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
