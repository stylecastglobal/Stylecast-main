"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HairPage() {
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

  const [activeTab, setActiveTab] = useState<"all"|"shampoo"|"treatment"|"styling"|"scalp"|"tools">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const cats = [
    { label: "Shampoo & Conditioner", sub: "Moisturizing · Volumizing · Anti-Dandruff", count: "4.8k sold", image: "/collection-winter-skincare.jpg", color: "from-violet-900/70" },
    { label: "Treatments", sub: "Masks · Oils · Leave-In", count: "3.5k sold", image: "/collection-serum-ampoule.jpg", color: "from-indigo-900/70" },
    { label: "Styling", sub: "Wax · Spray · Mousse · Gel", count: "2.8k sold", image: "/collection-best-sellers.jpg", color: "from-fuchsia-900/70" },
    { label: "Scalp Care", sub: "Scalp Tonic · Scrub · Serum", count: "2.1k sold", image: "/collection-toner-pads.jpg", color: "from-slate-900/70" },
  ];

  const trending = [
    { id: 90001, rank: 1, brand: "MISE EN SCÈNE", title: "Perfect Serum Original 80ml", price: 14, salePrice: 11, discount: 21, sold: 24560, rating: 4.8, image: "/collection-serum-ampoule.jpg" },
    { id: 90002, rank: 2, brand: "MOREMO", title: "Water Treatment Miracle 10 200ml", price: 22, salePrice: 17, discount: 23, sold: 18432, rating: 4.9, image: "/collection-toner-essence.jpg" },
    { id: 90003, rank: 3, brand: "LADOR", title: "Perfect Hair Fill-Up 150ml", price: 16, salePrice: 12, discount: 25, sold: 15678, rating: 4.8, image: "/collection-toner-pads.jpg" },
    { id: 90004, rank: 4, brand: "KUNDALINI", title: "Honey & Macadamia Shampoo 500ml", price: 18, salePrice: 14, discount: 22, sold: 12987, rating: 4.7, image: "/collection-facial-cleanser.jpg" },
    { id: 90005, rank: 5, brand: "DAENG GI MEO RI", title: "Ki Gold Premium Shampoo 500ml", price: 28, salePrice: 22, discount: 21, sold: 10876, rating: 4.7, image: "/collection-winter-skincare.jpg" },
    { id: 90006, rank: 6, brand: "RYO", title: "Jayangyunmo Hair Loss Shampoo 400ml", price: 22, salePrice: 17, discount: 23, sold: 9654, rating: 4.6, image: "/collection-best-sellers.jpg" },
    { id: 90007, rank: 7, brand: "MOREMO", title: "Hair Essence Delightful Oil 70ml", price: 18, salePrice: 14, discount: 22, sold: 8432, rating: 4.7, image: "/collection-new-arrivals.jpg" },
    { id: 90008, rank: 8, brand: "MISE EN SCÈNE", title: "Damage Care Hair Mask 180ml", price: 12, salePrice: 9, discount: 25, sold: 7654, rating: 4.6, image: "/collection-sun-care.jpg" },
  ];

  const editorSpotlight = { brandImage: "/collection-serum-ampoule.jpg", brandName: "MOREMO", brandSubtitle: "Salon-Grade Hair Care", items: [
    { id: 91001, brand: "MOREMO", title: "Water Treatment Miracle 10 200ml", price: 22, salePrice: 17, discount: 23, image: "/collection-toner-essence.jpg" },
    { id: 91002, brand: "MOREMO", title: "Hair Essence Delightful Oil 70ml", price: 18, salePrice: 14, discount: 22, image: "/collection-new-arrivals.jpg" },
    { id: 91003, brand: "MOREMO", title: "Repair Shampoo R 300ml", price: 18, salePrice: 14, discount: 22, image: "/collection-facial-cleanser.jpg" },
    { id: 91004, brand: "MOREMO", title: "Hair Treatment Miracle 2x 180ml", price: 20, salePrice: 16, discount: 20, image: "/collection-best-sellers.jpg" },
    { id: 91005, brand: "MOREMO", title: "Scalp Treatment Clear 2x 100ml", price: 22, salePrice: 17, discount: 23, image: "/collection-toner-pads.jpg" },
    { id: 91006, brand: "MOREMO", title: "Volume Ampoule Treatment 30ml", price: 16, salePrice: 13, discount: 19, image: "/collection-sun-care.jpg" },
  ]};

  const guides = [
    { id: "hg1", title: "Damage Repair 101", subtitle: "Restore over-processed hair with these expert-approved steps", image: "/collection-winter-skincare.jpg" },
    { id: "hg2", title: "Volume & Texture", subtitle: "Get salon-worthy volume at home with the right products", image: "/collection-best-sellers.jpg" },
  ];

  const stylistPicks = [
    { id: 92001, brand: "MISE EN SCÈNE", title: "Perfect Serum Rose Edition 80ml", price: 14, salePrice: 11, discount: 21, image: "/collection-serum-ampoule.jpg", proNote: "Stylist Mia's pick" },
    { id: 92002, brand: "LADOR", title: "Keratin LPP Shampoo 530ml", price: 16, salePrice: 12, discount: 25, image: "/collection-toner-essence.jpg", proNote: "Stylist Jay's pick" },
    { id: 92003, brand: "MOREMO", title: "Scalp Treatment Clear 2x 100ml", price: 22, salePrice: 17, discount: 23, image: "/collection-toner-pads.jpg", proNote: "Salon Owner Hana" },
    { id: 92004, brand: "KUNDALINI", title: "Pink Salt Clean Scalp Shampoo 500ml", price: 18, salePrice: 14, discount: 22, image: "/collection-facial-cleanser.jpg", proNote: "Trichologist Dr. Park" },
    { id: 92005, brand: "RYO", title: "Damage Care & Nourishing Shampoo", price: 22, salePrice: 17, discount: 23, image: "/collection-best-sellers.jpg", proNote: "Stylist Yuna's pick" },
    { id: 92006, brand: "DAENG GI MEO RI", title: "Anti-Hair Loss Treatment 300ml", price: 32, salePrice: 25, discount: 22, image: "/collection-new-arrivals.jpg", proNote: "Stylist Joon's pick" },
    { id: 92007, brand: "LADOR", title: "Perfect Hair Fill-Up Duo Set", price: 22, salePrice: 17, discount: 23, image: "/collection-winter-skincare.jpg", proNote: "Colorist Sora" },
    { id: 92008, brand: "MISE EN SCÈNE", title: "Styling Curling Essence 150ml", price: 12, salePrice: 9, discount: 25, image: "/collection-sun-care.jpg", proNote: "Stylist Emily" },
  ];

  const allHair = [
    { id: 93001, sub: "shampoo", brand: "MISE EN SCÈNE", title: "Perfect Serum Shampoo 680ml", price: 14, salePrice: 11, discount: 21, reviews: 12450, image: "/collection-serum-ampoule.jpg" },
    { id: 93002, sub: "treatment", brand: "MOREMO", title: "Water Treatment Miracle 10 200ml", price: 22, salePrice: 17, discount: 23, reviews: 18432, image: "/collection-toner-essence.jpg" },
    { id: 93003, sub: "treatment", brand: "LADOR", title: "Perfect Hair Fill-Up 150ml", price: 16, salePrice: 12, discount: 25, reviews: 15678, image: "/collection-toner-pads.jpg" },
    { id: 93004, sub: "shampoo", brand: "KUNDALINI", title: "Honey & Macadamia Shampoo 500ml", price: 18, salePrice: 14, discount: 22, reviews: 12987, image: "/collection-facial-cleanser.jpg" },
    { id: 93005, sub: "scalp", brand: "RYO", title: "Jayangyunmo Hair Loss Shampoo 400ml", price: 22, salePrice: 17, discount: 23, reviews: 9654, image: "/collection-best-sellers.jpg" },
    { id: 93006, sub: "styling", brand: "MISE EN SCÈNE", title: "Perfect Serum Original 80ml", price: 14, salePrice: 11, discount: 21, reviews: 24560, image: "/collection-new-arrivals.jpg" },
    { id: 93007, sub: "shampoo", brand: "DAENG GI MEO RI", title: "Ki Gold Premium Shampoo 500ml", price: 28, salePrice: 22, discount: 21, reviews: 10876, image: "/collection-winter-skincare.jpg" },
    { id: 93008, sub: "styling", brand: "MOREMO", title: "Hair Essence Delightful Oil 70ml", price: 18, salePrice: 14, discount: 22, reviews: 8432, image: "/collection-sun-care.jpg" },
    { id: 93009, sub: "treatment", brand: "MISE EN SCÈNE", title: "Damage Care Hair Mask 180ml", price: 12, salePrice: 9, discount: 25, reviews: 7654, image: "/collection-face-masks.jpg" },
    { id: 93010, sub: "scalp", brand: "MOREMO", title: "Scalp Treatment Clear 2x 100ml", price: 22, salePrice: 17, discount: 23, reviews: 5432, image: "/collection-toner-pads.jpg" },
    { id: 93011, sub: "shampoo", brand: "KUNDALINI", title: "Pink Salt Scalp Shampoo 500ml", price: 18, salePrice: 14, discount: 22, reviews: 4876, image: "/collection-facial-cleanser.jpg" },
    { id: 93012, sub: "tools", brand: "VODANA", title: "Glam Wave Iron 36mm", price: 68, salePrice: 54, discount: 21, reviews: 3654, image: "/collection-serum-ampoule.jpg" },
    { id: 93013, sub: "styling", brand: "LADOR", title: "Wonder Hair Oil 100ml", price: 14, salePrice: 11, discount: 21, reviews: 3432, image: "/collection-best-sellers.jpg" },
    { id: 93014, sub: "scalp", brand: "DAENG GI MEO RI", title: "Anti-Hair Loss Scalp Tonic 100ml", price: 22, salePrice: 17, discount: 23, reviews: 2987, image: "/collection-new-arrivals.jpg" },
    { id: 93015, sub: "tools", brand: "VODANA", title: "Mini Hair Dryer 1200W", price: 48, salePrice: 38, discount: 21, reviews: 2654, image: "/collection-winter-skincare.jpg" },
    { id: 93016, sub: "treatment", brand: "MOREMO", title: "Volume Ampoule Treatment 30ml", price: 16, salePrice: 13, discount: 19, reviews: 2432, image: "/collection-sun-care.jpg" },
    { id: 93017, sub: "shampoo", brand: "RYO", title: "Damage Care Nourishing Shampoo 480ml", price: 22, salePrice: 17, discount: 23, reviews: 2198, image: "/collection-toner-essence.jpg" },
    { id: 93018, sub: "styling", brand: "MISE EN SCÈNE", title: "Styling Curling Essence 150ml", price: 12, salePrice: 9, discount: 25, reviews: 1987, image: "/collection-toner-pads.jpg" },
    { id: 93019, sub: "scalp", brand: "LADOR", title: "Scalp Scaling Spa Ampoule 15ml x 4", price: 18, salePrice: 14, discount: 22, reviews: 1654, image: "/collection-facial-cleanser.jpg" },
    { id: 93020, sub: "tools", brand: "CREATE", title: "Automatic Curling Iron 28mm", price: 58, salePrice: 46, discount: 21, reviews: 1432, image: "/collection-best-sellers.jpg" },
  ];

  const filtered = activeTab === "all" ? allHair : allHair.filter((i) => i.sub === activeTab);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative w-full h-[50vh] min-h-[360px] overflow-hidden bg-black">
        <Image src="/collection-serum-ampoule.jpg" alt="Hair" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-14 max-w-[1600px] mx-auto">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-violet-400 mb-3">Beauty Collection</span>
          <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight leading-none mb-3">Hair</h1>
          <p className="text-sm text-white/50 max-w-md">Salon-grade shampoos, treatments, and styling essentials from Korea&apos;s top hair care brands.</p>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 lg:px-20 bg-white"><div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">{cats.map((c) => (<Link key={c.label} href="#" className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100"><Image src={c.image} alt={c.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className={`absolute inset-0 bg-gradient-to-t ${c.color} to-transparent`} /><div className="absolute bottom-0 left-0 right-0 p-5"><p className="text-white text-sm font-semibold">{c.label}</p><p className="text-white/60 text-[11px] mt-0.5">{c.sub}</p><p className="text-white/40 text-xs mt-1">{c.count}</p></div></Link>))}</div></section>

      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#F8F5FF]"><div className="max-w-[1600px] mx-auto"><div className="flex items-end justify-between mb-10"><div><span className="text-[11px] font-bold tracking-[0.2em] uppercase text-violet-600 mb-2 block">Ranking</span><h2 className="text-3xl font-light tracking-tight">Trending Hair Care</h2><p className="text-sm text-gray-500 mt-1">Most loved this week — updated daily</p></div><Link href="#" className="text-xs text-gray-500 hover:text-black border-b border-gray-300 pb-0.5">Full Rankings →</Link></div><div className="relative group/scroll"><div ref={trendingRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none" }}>{trending.map((item) => (<Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block"><div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute top-3 left-3 bg-black text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">{item.rank}</span><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-violet-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p><div className="flex items-center gap-3 pt-0.5"><span className="text-[11px] text-gray-400">★ {item.rating}</span><span className="text-[11px] text-gray-400">{item.sold.toLocaleString()} sold</span></div></div></Link>))}</div><button onClick={() => scrollRight(trendingRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">›</span></button><button onClick={() => scrollLeft(trendingRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">‹</span></button></div></div></section>

      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white"><div className="max-w-[1600px] mx-auto"><div className="mb-10"><h2 className="text-3xl font-light tracking-tight">Editor&apos;s Pick</h2><p className="text-sm text-gray-500 mt-1">This week&apos;s featured brand</p></div><div className="grid grid-cols-12 gap-4"><div className="col-span-12 md:col-span-5"><Link href="#" className="group flex flex-col h-full"><div className="relative flex-1 min-h-0 bg-gray-100 overflow-hidden rounded-2xl"><Image src={editorSpotlight.brandImage} alt={editorSpotlight.brandName} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="mt-4 pb-1"><p className="text-xs text-gray-500 font-medium">{editorSpotlight.brandName}</p><p className="text-sm text-gray-700 mt-0.5 italic">{editorSpotlight.brandSubtitle}</p></div></Link></div><div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-4">{editorSpotlight.items.map((item) => (<Link key={item.id} href="#" className="group block"><div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-violet-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p></div></Link>))}</div></div></div></section>

      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#F8F5FF]"><div className="max-w-[1600px] mx-auto"><div className="mb-10"><h2 className="text-3xl font-light tracking-tight">Hair Guide</h2><p className="text-sm text-gray-500 mt-1">Tips & tutorials for healthy hair</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{guides.map((g) => (<Link key={g.id} href="#" className="group relative block aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100"><Image src={g.image} alt={g.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><div className="absolute bottom-0 left-0 right-0 p-6"><h3 className="text-xl text-white font-light mb-1">{g.title}</h3><p className="text-sm text-white/60">{g.subtitle}</p></div></Link>))}</div></div></section>

      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white"><div className="max-w-[1600px] mx-auto"><div className="mb-10"><h2 className="text-3xl font-light tracking-tight">Stylist Picks</h2><p className="text-sm text-gray-500 mt-1">Recommended by professional hairstylists</p></div><div className="relative group/scroll"><div ref={proPicksRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none" }}>{stylistPicks.map((item) => (<Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block"><div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-gray-700 px-2.5 py-1 rounded-full">{item.proNote}</span><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-violet-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p></div></Link>))}</div><button onClick={() => scrollRight(proPicksRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">›</span></button><button onClick={() => scrollLeft(proPicksRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"><span className="text-gray-600 text-lg">‹</span></button></div></div></section>

      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#F8F5FF]"><div className="max-w-[1600px] mx-auto"><div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4"><div><h2 className="text-3xl font-light tracking-tight">Browse All Hair</h2><p className="text-sm text-gray-500 mt-1">{filtered.length} items</p></div><div className="flex border border-gray-300 divide-x divide-gray-300 rounded-lg overflow-hidden">{(["all","shampoo","treatment","styling","scalp","tools"] as const).map((tab) => (<button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} className={`px-4 py-2.5 text-xs font-medium transition-colors ${activeTab === tab ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>{tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}</button>))}</div></div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{currentItems.map((item) => (<Link key={item.id} href="#" className="group block"><div className="relative aspect-square bg-white overflow-hidden rounded-2xl mb-3"><Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /><button onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }} className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><span className={`text-sm ${wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}`}>{wishlist.includes(item.id) ? "♥" : "♡"}</span></button></div><div className="space-y-1"><p className="text-xs text-gray-500 font-medium">{item.brand}</p><h3 className="text-sm font-normal line-clamp-2">{item.title}</h3><div className="flex items-center gap-2"><span className="text-sm font-semibold text-violet-600">{item.discount}%</span><span className="text-sm font-bold">${item.salePrice}</span></div><p className="text-xs text-gray-400 line-through">${item.price}</p><p className="text-[11px] text-gray-400 pt-0.5">★ {item.reviews.toLocaleString()} reviews</p></div></Link>))}</div>{totalPages > 1 && (<div className="flex flex-col items-center mt-14 mb-4 gap-3"><div className="flex items-center gap-1"><button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}>‹</button>{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (<button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-black"}`}>{page}</button>))}<button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}>›</button></div><p className="text-xs text-gray-400">You&apos;re viewing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filtered.length)} of {filtered.length} results</p></div>)}</div></section>
    </div>
  );
}
