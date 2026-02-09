"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FragrancePage() {
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

  const [activeTab, setActiveTab] = useState<"all"|"perfume"|"edp"|"edt"|"body"|"diffuser">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const cats = [
    { label: "Eau de Parfum", sub: "Long-lasting · Signature scents", count: "3.6k sold", image: "/collection-best-sellers.jpg", color: "from-amber-900/70" },
    { label: "Eau de Toilette", sub: "Light · Fresh · Everyday", count: "2.8k sold", image: "/collection-new-arrivals.jpg", color: "from-yellow-900/70" },
    { label: "Body & Home", sub: "Mist · Lotion · Candle", count: "2.2k sold", image: "/collection-winter-skincare.jpg", color: "from-orange-900/70" },
    { label: "Diffusers", sub: "Reed · Room Spray · Car", count: "1.6k sold", image: "/collection-serum-ampoule.jpg", color: "from-rose-900/70" },
  ];

  const trending = [
    { id: 100001, rank: 1, brand: "TAMBURINS", title: "Perfume #Berga Sandal 50ml", price: 68, salePrice: 54, discount: 21, sold: 8760, rating: 4.9, image: "/collection-best-sellers.jpg" },
    { id: 100002, rank: 2, brand: "GRANHAND", title: "Multi Perfume #Lim Blonde 100ml", price: 42, salePrice: 34, discount: 19, sold: 7432, rating: 4.8, image: "/collection-new-arrivals.jpg" },
    { id: 100003, rank: 3, brand: "FORMENT", title: "Signature Perfume #Inner Garden 50ml", price: 48, salePrice: 38, discount: 21, sold: 6876, rating: 4.8, image: "/collection-winter-skincare.jpg" },
    { id: 100004, rank: 4, brand: "NONFICTION", title: "Santal Cream EDP 100ml", price: 125, salePrice: 100, discount: 20, sold: 5654, rating: 4.9, image: "/collection-serum-ampoule.jpg" },
    { id: 100005, rank: 5, brand: "AESOP", title: "Hwyl Eau de Parfum 50ml", price: 145, salePrice: 116, discount: 20, sold: 4987, rating: 4.9, image: "/collection-toner-essence.jpg" },
    { id: 100006, rank: 6, brand: "TAMBURINS", title: "Perfume #Pumkini 11ml", price: 32, salePrice: 25, discount: 22, sold: 4432, rating: 4.7, image: "/collection-facial-cleanser.jpg" },
    { id: 100007, rank: 7, brand: "GRANHAND", title: "Hand Cream #Lim Blonde 50ml", price: 18, salePrice: 14, discount: 22, sold: 3987, rating: 4.6, image: "/collection-toner-pads.jpg" },
    { id: 100008, rank: 8, brand: "FORMENT", title: "Hair & Body Mist #Inner Garden 150ml", price: 28, salePrice: 22, discount: 21, sold: 3654, rating: 4.7, image: "/collection-sun-care.jpg" },
  ];

  const editorSpotlight = { brandImage: "/collection-best-sellers.jpg", brandName: "TAMBURINS", brandSubtitle: "Artistic Fragrances", items: [
    { id: 101001, brand: "TAMBURINS", title: "Perfume #Berga Sandal 50ml", price: 68, salePrice: 54, discount: 21, image: "/collection-new-arrivals.jpg" },
    { id: 101002, brand: "TAMBURINS", title: "Perfume #Pumkini 50ml", price: 68, salePrice: 54, discount: 21, image: "/collection-facial-cleanser.jpg" },
    { id: 101003, brand: "TAMBURINS", title: "Hand Cream #Berga Sandal 30ml", price: 22, salePrice: 17, discount: 23, image: "/collection-toner-pads.jpg" },
    { id: 101004, brand: "TAMBURINS", title: "Perfume Balm #Lale 6.5g", price: 28, salePrice: 22, discount: 21, image: "/collection-sun-care.jpg" },
    { id: 101005, brand: "TAMBURINS", title: "Egg Perfume #Berga Sandal 13ml", price: 38, salePrice: 30, discount: 21, image: "/collection-serum-ampoule.jpg" },
    { id: 101006, brand: "TAMBURINS", title: "Reed Diffuser #Cotton 400ml", price: 52, salePrice: 42, discount: 19, image: "/collection-winter-skincare.jpg" },
  ]};

  const guides = [
    { id: "fg1", title: "Find Your Signature", subtitle: "A guide to discovering the fragrance family that suits you", image: "/collection-best-sellers.jpg" },
    { id: "fg2", title: "Layering Scents", subtitle: "Combine body mist, lotion and perfume for long-lasting scent", image: "/collection-new-arrivals.jpg" },
  ];

  const expertPicks = [
    { id: 102001, brand: "NONFICTION", title: "Santal Cream EDP 100ml", price: 125, salePrice: 100, discount: 20, image: "/collection-serum-ampoule.jpg", proNote: "Perfumer Kim's pick" },
    { id: 102002, brand: "AESOP", title: "Hwyl EDP 50ml", price: 145, salePrice: 116, discount: 20, image: "/collection-toner-essence.jpg", proNote: "Nose Jay's pick" },
    { id: 102003, brand: "TAMBURINS", title: "Perfume #Berga Sandal 50ml", price: 68, salePrice: 54, discount: 21, image: "/collection-best-sellers.jpg", proNote: "Editor Hana's pick" },
    { id: 102004, brand: "GRANHAND", title: "Multi Perfume #Lim Blonde 100ml", price: 42, salePrice: 34, discount: 19, image: "/collection-new-arrivals.jpg", proNote: "Blogger Mia's pick" },
    { id: 102005, brand: "FORMENT", title: "Signature Perfume #Inner Garden", price: 48, salePrice: 38, discount: 21, image: "/collection-winter-skincare.jpg", proNote: "Nose Yuna's pick" },
    { id: 102006, brand: "NONFICTION", title: "Forget Me Not EDP 100ml", price: 125, salePrice: 100, discount: 20, image: "/collection-facial-cleanser.jpg", proNote: "Perfumer Sora" },
    { id: 102007, brand: "AESOP", title: "Marrakech Intense EDP 50ml", price: 155, salePrice: 124, discount: 20, image: "/collection-toner-pads.jpg", proNote: "Nose Joon's pick" },
    { id: 102008, brand: "TAMBURINS", title: "Perfume #Pumkini 50ml", price: 68, salePrice: 54, discount: 21, image: "/collection-sun-care.jpg", proNote: "Expert Emily" },
  ];

  const allFragrance = [
    { id: 103001, sub: "edp", brand: "TAMBURINS", title: "Perfume #Berga Sandal 50ml", price: 68, salePrice: 54, discount: 21, reviews: 8760, image: "/collection-best-sellers.jpg" },
    { id: 103002, sub: "perfume", brand: "GRANHAND", title: "Multi Perfume #Lim Blonde 100ml", price: 42, salePrice: 34, discount: 19, reviews: 7432, image: "/collection-new-arrivals.jpg" },
    { id: 103003, sub: "edp", brand: "FORMENT", title: "Signature Perfume #Inner Garden 50ml", price: 48, salePrice: 38, discount: 21, reviews: 6876, image: "/collection-winter-skincare.jpg" },
    { id: 103004, sub: "edp", brand: "NONFICTION", title: "Santal Cream EDP 100ml", price: 125, salePrice: 100, discount: 20, reviews: 5654, image: "/collection-serum-ampoule.jpg" },
    { id: 103005, sub: "edp", brand: "AESOP", title: "Hwyl Eau de Parfum 50ml", price: 145, salePrice: 116, discount: 20, reviews: 4987, image: "/collection-toner-essence.jpg" },
    { id: 103006, sub: "perfume", brand: "TAMBURINS", title: "Egg Perfume #Pumkini 13ml", price: 38, salePrice: 30, discount: 21, reviews: 4432, image: "/collection-facial-cleanser.jpg" },
    { id: 103007, sub: "body", brand: "GRANHAND", title: "Hand Cream #Lim Blonde 50ml", price: 18, salePrice: 14, discount: 22, reviews: 3987, image: "/collection-toner-pads.jpg" },
    { id: 103008, sub: "body", brand: "FORMENT", title: "Hair & Body Mist #Inner Garden 150ml", price: 28, salePrice: 22, discount: 21, reviews: 3654, image: "/collection-sun-care.jpg" },
    { id: 103009, sub: "diffuser", brand: "TAMBURINS", title: "Reed Diffuser #Cotton 400ml", price: 52, salePrice: 42, discount: 19, reviews: 3198, image: "/collection-winter-skincare.jpg" },
    { id: 103010, sub: "edt", brand: "FORMENT", title: "Daily Eau de Toilette #Blue 100ml", price: 32, salePrice: 25, discount: 22, reviews: 2987, image: "/collection-best-sellers.jpg" },
    { id: 103011, sub: "edp", brand: "NONFICTION", title: "Forget Me Not EDP 100ml", price: 125, salePrice: 100, discount: 20, reviews: 2654, image: "/collection-facial-cleanser.jpg" },
    { id: 103012, sub: "edt", brand: "GRANHAND", title: "Eau de Toilette #Samuel Close 50ml", price: 38, salePrice: 30, discount: 21, reviews: 2432, image: "/collection-new-arrivals.jpg" },
    { id: 103013, sub: "body", brand: "TAMBURINS", title: "Hand Cream #Berga Sandal 30ml", price: 22, salePrice: 17, discount: 23, reviews: 2198, image: "/collection-toner-pads.jpg" },
    { id: 103014, sub: "diffuser", brand: "GRANHAND", title: "Premium Diffuser #Lim Blonde 200ml", price: 48, salePrice: 38, discount: 21, reviews: 1987, image: "/collection-serum-ampoule.jpg" },
    { id: 103015, sub: "perfume", brand: "TAMBURINS", title: "Perfume Balm #Lale 6.5g", price: 28, salePrice: 22, discount: 21, reviews: 1876, image: "/collection-sun-care.jpg" },
    { id: 103016, sub: "edt", brand: "FORMENT", title: "Eau de Toilette #Vetiver 50ml", price: 36, salePrice: 29, discount: 19, reviews: 1654, image: "/collection-winter-skincare.jpg" },
    { id: 103017, sub: "body", brand: "NONFICTION", title: "Body Wash #Santal Cream 300ml", price: 38, salePrice: 30, discount: 21, reviews: 1432, image: "/collection-toner-essence.jpg" },
    { id: 103018, sub: "diffuser", brand: "NONFICTION", title: "Room Spray #Santal Cream 100ml", price: 32, salePrice: 25, discount: 22, reviews: 1234, image: "/collection-best-sellers.jpg" },
    { id: 103019, sub: "edp", brand: "AESOP", title: "Marrakech Intense EDP 50ml", price: 155, salePrice: 124, discount: 20, reviews: 987, image: "/collection-toner-pads.jpg" },
    { id: 103020, sub: "diffuser", brand: "TAMBURINS", title: "Car Diffuser #Berga Sandal", price: 28, salePrice: 22, discount: 21, reviews: 876, image: "/collection-facial-cleanser.jpg" },
  ];

  const filtered = activeTab === "all" ? allFragrance : allFragrance.filter((i) => i.sub === activeTab);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative w-full h-[50vh] min-h-[360px] overflow-hidden bg-black">
        <Image src="/collection-best-sellers.jpg" alt="Fragrance" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-14 max-w-[1600px] mx-auto">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-400 mb-3">Beauty Collection</span>
          <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight leading-none mb-3">Fragrance</h1>
          <p className="text-sm text-white/50 max-w-md">From niche Korean perfume houses to luxury scents — find your signature fragrance, body care, and home diffusers.</p>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 lg:px-20 bg-white"><div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">{cats.map((c) => (<Link key={c.label} href="#" className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100"><Image src={c.image} alt={c.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className={`absolute inset-0 bg-gradient-to-t ${c.color} to-transparent`} /><div className="absolute bottom-0 left-0 right-0 p-5"><p className="text-white text-sm font-semibold">{c.label}</p><p className="text-white/60 text-[11px] mt-0.5">{c.sub}</p><p className="text-white/40 text-xs mt-1">{c.count}</p></div></Link>))}</div></section>

      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FDF8F0]"><div className="max-w-[1600px] mx-auto"><div className="flex items-end justify-between mb-10"><div><span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-600 mb-2 block">Ranking</span><h2 className="text-3xl font-light tracking-tight">Trending Fragrances</h2><p className="text-sm text-gray-500 mt-1">Most loved this week — updated daily</p></div><Link href="#" className="text-xs text-gray-500 hover:text-black border-b border-gray-300 pb-0.5">Full Rankings →</Link></div><div className="relative group/scroll"><div ref={trendingRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none" }}>{trending.map((item) => (<Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block"><div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute top-3 left-3 bg-black text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">{item.rank}</span><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-amber-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p><div className="flex items-center gap-3 pt-0.5"><span className="text-[11px] text-gray-400">★ {item.rating}</span><span className="text-[11px] text-gray-400">{item.sold.toLocaleString()} sold</span></div></div></Link>))}</div><button onClick={() => scrollRight(trendingRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">›</span></button><button onClick={() => scrollLeft(trendingRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">‹</span></button></div></div></section>

      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white"><div className="max-w-[1600px] mx-auto"><div className="mb-10"><h2 className="text-3xl font-light tracking-tight">Editor&apos;s Pick</h2><p className="text-sm text-gray-500 mt-1">This week&apos;s featured house</p></div><div className="grid grid-cols-12 gap-4"><div className="col-span-12 md:col-span-5"><Link href="#" className="group flex flex-col h-full"><div className="relative flex-1 min-h-0 bg-gray-100 overflow-hidden rounded-2xl"><Image src={editorSpotlight.brandImage} alt={editorSpotlight.brandName} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="mt-4 pb-1"><p className="text-xs text-gray-500 font-medium">{editorSpotlight.brandName}</p><p className="text-sm text-gray-700 mt-0.5 italic">{editorSpotlight.brandSubtitle}</p></div></Link></div><div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-4">{editorSpotlight.items.map((item) => (<Link key={item.id} href="#" className="group block"><div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-amber-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p></div></Link>))}</div></div></div></section>

      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FDF8F0]"><div className="max-w-[1600px] mx-auto"><div className="mb-10"><h2 className="text-3xl font-light tracking-tight">Scent Guide</h2><p className="text-sm text-gray-500 mt-1">Discover your perfect fragrance</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{guides.map((g) => (<Link key={g.id} href="#" className="group relative block aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100"><Image src={g.image} alt={g.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><div className="absolute bottom-0 left-0 right-0 p-6"><h3 className="text-xl text-white font-light mb-1">{g.title}</h3><p className="text-sm text-white/60">{g.subtitle}</p></div></Link>))}</div></div></section>

      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white"><div className="max-w-[1600px] mx-auto"><div className="mb-10"><h2 className="text-3xl font-light tracking-tight">Expert Picks</h2><p className="text-sm text-gray-500 mt-1">Recommended by perfumers & fragrance experts</p></div><div className="relative group/scroll"><div ref={proPicksRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none" }}>{expertPicks.map((item) => (<Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block"><div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-gray-700 px-2.5 py-1 rounded-full">{item.proNote}</span><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-amber-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p></div></Link>))}</div><button onClick={() => scrollRight(proPicksRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">›</span></button><button onClick={() => scrollLeft(proPicksRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">‹</span></button></div></div></section>

      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FDF8F0]"><div className="max-w-[1600px] mx-auto"><div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4"><div><h2 className="text-3xl font-light tracking-tight">Browse All Fragrances</h2><p className="text-sm text-gray-500 mt-1">{filtered.length} items</p></div><div className="flex border border-gray-300 divide-x divide-gray-300 rounded-lg overflow-hidden">{(["all","perfume","edp","edt","body","diffuser"] as const).map((tab) => (<button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} className={`px-4 py-2.5 text-xs font-medium transition-colors ${activeTab === tab ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>{tab === "all" ? "All" : tab === "perfume" ? "Perfume" : tab === "edp" ? "EDP" : tab === "edt" ? "EDT" : tab === "body" ? "Body" : "Diffusers"}</button>))}</div></div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{currentItems.map((item) => (<Link key={item.id} href="#" className="group block"><div className="relative aspect-square bg-white overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={`text-sm ${wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}`}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-amber-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p><p className="text-[11px] text-gray-400 pt-0.5">★ {item.reviews.toLocaleString()} reviews</p></div></Link>))}</div>{totalPages > 1 && (<div className="flex flex-col items-center mt-14 mb-4 gap-3"><div className="flex items-center gap-1"><button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}>‹</button>{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (<button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-black"}`}>{page}</button>))}<button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}>›</button></div><p className="text-xs text-gray-400">You&apos;re viewing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filtered.length)} of {filtered.length} results</p></div>)}</div></section>
    </div>
  );
}
