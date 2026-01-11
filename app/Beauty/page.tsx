"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* =====================================================
    MAIN PAGE COMPONENT
===================================================== */

export default function BeautyPage() {
  /* ---------------------------------------------
      GENDER FILTER
  --------------------------------------------- */
  const [gender, setGender] = useState<"women" | "men">("women");

  /* ---------------------------------------------
      WOMEN BESTSELLERS
  --------------------------------------------- */
  const womenBestseller = [
    { brand: "Rhode", title: "Peptide Lip Treatment", price: "$24", reviews: "4.9 (3200)", likes: 18000, img: "/beauty-item-1.jpg" },
    { brand: "Glossier", title: "Cloud Paint Gel Cream Blush", price: "$33.00", reviews: "4.7 (5400)", likes: 23000, img: "/beauty-item-2.jpg" },
    { brand: "Rare Beauty", title: "Soft Pinch Liquid Blush", price: "$23", reviews: "4.9 (6200)", likes: 27000, img: "/beauty-item-3.jpg" },
    { brand: "Dior", title: "Lip Glow Oil", price: "$40", reviews: "4.8 (8000)", likes: 35000, img: "/beauty-item-4.jpg" },
    { brand: "Charlotte Tilbury", title: "Hollywood Flawless Filter", price: "$53", reviews: "4.8 (9000)", likes: 41000, img: "/beauty-item-5.jpg" },

    { brand: "Fenty Beauty", title: "Gloss Bomb Universal Lip Luminizer", price: "$30.00", reviews: "4.8 (11000)", likes: 32000, img: "/beauty-item-6.jpg" },
    { brand: "Laneige", title: "Lip Sleeping Mask", price: "$33", reviews: "4.9 (15000)", likes: 45000, img: "/beauty-item-7.jpg" },
    { brand: "Hourglass", title: "Veil™ Translucent Setting Powder", price: "$55", reviews: "4.6 (2400)", likes: 17000, img: "/beauty-item-8.jpg" },
    { brand: "Milk Makeup", title: "Hydro Grip Hydrating Makeup Primer with Hyaluronic Acid + Niacinamide", price: "$47", reviews: "4.8 (6000)", likes: 28000, img: "/beauty-item-9.jpg" },
    { brand: "Dior", title: "Dior Addict Lip Glow Balm", price: "$54.00", reviews: "4.6 (1400)", likes: 12000, img: "/beauty-item-10.jpg" },
  ];

  /* ---------------------------------------------
      WOMEN TRENDING
  --------------------------------------------- */
  const womenTrending = [
    { brand: "Glossier", title: "Glossier You Eau de Parfum", price: "$111.00", reviews: "4.9 (7000)", likes: 29000, img: "/wtrending1.jpg" },
    { brand: "Summer Fridays", title: "Lip Butter Balm", price: "$32.50", reviews: "4.9 (8200)", likes: 39000, img: "/wtrending2.jpg" },
    { brand: "PATRICK TA", title: "Double-Take Crème & Powder Blush", price: "$53.00", reviews: "4.8 (5000)", likes: 25000, img: "/wtrending3.jpg" },
    { brand: "rom&nd", title: "THE JUICY LASTING TINT", price: "$15.00", reviews: "4.8 (4300)", likes: 19000, img: "/wtrending4.jpg" },
    { brand: "Amuse", title: "Dew Tint", price: "$23.83", reviews: "4.7 (7600)", likes: 26000, img: "/wtrending5.jpg" },

    { brand: "rhode", title: "Pocket Blush Buildable Hydrating Cream Blush", price: "$42", reviews: "4.9 (3400)", likes: 18000, img: "/wtrending6.jpg" },
    { brand: "Benefit", title: "24-HR Brow Setter", price: "$37.00", reviews: "4.8 (5400)", likes: 23000, img: "/wtrending7.jpg" },
    { brand: "MAC", title: "Fixing and Multitasking Setting Spray", price: "$46.00", reviews: "4.7 (7600)", likes: 12000, img: "/wtrending8.jpg" },
    { brand: "DIOR", title: "Forever Skin Perfect 24H Multi-Use Foundation Stick", price: "$45", reviews: "4.8 (4800)", likes: 21000, img: "/wtrending9.jpg" },
    { brand: "Tatcha ", title: "The Dewy Skin Cream", price: "$52", reviews: "4.9 (2200)", likes: 9000, img: "/wtrending10.jpg" },
  ];

  /* ---------------------------------------------
      MEN BESTSELLERS
  --------------------------------------------- */
  const menBestseller = [
    { brand: "Kiehl's", title: "Facial Fuel", price: "$45", reviews: "4.8 (5200)", likes: 12000, img: "/men-1.jpg" },
    { brand: "Le Labo", title: "Santal 33", price: "$230", reviews: "4.9 (8400)", likes: 29000, img: "/men-2.jpg" },
    { brand: "Aesop", title: "Parsley Cleanser", price: "$49", reviews: "4.7 (2100)", likes: 9000, img: "/men-3.jpg" },
    { brand: "CeraVe", title: "Men's Moisturizer", price: "$21", reviews: "4.8 (4200)", likes: 7000, img: "/men-4.jpg" },
    { brand: "Dior Homme", title: "Intense EDP", price: "$150", reviews: "4.9 (3000)", likes: 15000, img: "/men-5.jpg" },

    { brand: "Clinique", title: "For Men Lotion", price: "$38", reviews: "4.7 (3800)", likes: 11000, img: "/men-6.jpg" },
    { brand: "Malin+Goetz", title: "Vitamin E Face Moisturizer", price: "$65", reviews: "4.8 (2900)", likes: 13000, img: "/men-7.jpg" },
    { brand: "Lab Series", title: "Daily Rescue Water Lotion", price: "$52", reviews: "4.6 (2200)", likes: 8000, img: "/men-8.jpg" },
    { brand: "Baxter", title: "Clay Effect Style Spray", price: "$32", reviews: "4.8 (4100)", likes: 10000, img: "/men-9.jpg" },
    { brand: "Creed", title: "Aventus", price: "$435", reviews: "4.9 (7500)", likes: 32000, img: "/men-10.jpg" },
  ];

  /* ---------------------------------------------
      MEN TRENDING
  --------------------------------------------- */
  const menTrending = [
    { brand: "Byredo", title: "Gypsy Water", price: "$205", reviews: "4.9 (6000)", likes: 21000, img: "/men-t1.jpg" },
    { brand: "Jack Black", title: "Face Buff Scrub", price: "$35", reviews: "4.8 (3100)", likes: 8000, img: "/men-t2.jpg" },
    { brand: "Tom Ford", title: "Oud Wood", price: "$275", reviews: "4.8 (5200)", likes: 25000, img: "/men-t3.jpg" },
    { brand: "Aesop", title: "Marrakech Intense", price: "$190", reviews: "4.7 (1500)", likes: 7000, img: "/men-t4.jpg" },
    { brand: "Kiehl's", title: "Ultra Facial Cream", price: "$48", reviews: "4.9 (5000)", likes: 13000, img: "/men-t5.jpg" },

    { brand: "Shiseido Men", title: "Moisturizing Recovery Cream", price: "$65", reviews: "4.7 (2800)", likes: 9500, img: "/men-t6.jpg" },
    { brand: "Hermès", title: "Terre d'Hermès", price: "$155", reviews: "4.8 (4200)", likes: 19000, img: "/men-t7.jpg" },
    { brand: "Bulldog", title: "Original Moisturizer", price: "$18", reviews: "4.6 (6100)", likes: 11000, img: "/men-t8.jpg" },
    { brand: "L'Homme", title: "Yves Saint Laurent", price: "$125", reviews: "4.8 (5800)", likes: 22000, img: "/men-t9.jpg" },
    { brand: "Anthony", title: "Glycolic Facial Cleanser", price: "$38", reviews: "4.7 (3400)", likes: 12000, img: "/men-t10.jpg" },
  ];

  /* ---------------------------------------------
      CAROUSEL LOGIC
  --------------------------------------------- */
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setCarouselIndex(prev => (prev + 5) % 10);
    }, 5200);
    return () => clearInterval(i);
  }, []);

  /* ---------------------------------------------
      SELECT DATA BY GENDER
  --------------------------------------------- */
  const BEST = gender === "women" ? womenBestseller : menBestseller;
  const TREND = gender === "women" ? womenTrending : menTrending;

  const visibleBest = BEST.slice(carouselIndex, carouselIndex + 5);
  const visibleTrend = TREND.slice(carouselIndex, carouselIndex + 5);

  return (
    <section className="pt-32 px-6 md:px-12 lg:px-20 bg-white text-[#111] min-h-screen">

      {/* BEAUTY TITLE */}
      <h1 className="text-6xl md:text-7xl font-bold mb-8">Beauty</h1>

      {/* GENDER FILTER */}
      <div className="flex gap-4">
        <button
          onClick={() => setGender("women")}
          className={`px-8 py-3 rounded-full border text-sm transition ${
            gender === "women"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-gray-300"
          }`}
        >
          Women
        </button>

        <button
          onClick={() => setGender("men")}
          className={`px-8 py-3 rounded-full border text-sm transition ${
            gender === "men"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-gray-300"
          }`}
        >
          Men
        </button>
      </div>

      {/* HERO SECTION — Video Left + Feature Cards Right (3 CARDS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        
        {/* LEFT: VIDEO HERO */}
        <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/beauty-hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* RIGHT: 3 FEATURE CARDS STACKED */}
        <div className="flex flex-col gap-4">
          
          {/* CARD 1: Personal Color Test */}
          <div className="relative rounded-2xl px-8 py-6 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white shadow-xl border border-gray-200/50 h-[calc(23.33vh-5.33px)] group hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-500">
            
            {/* Animated White Glow Orbs */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/60 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-gray-100/40 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-black mb-1.5 tracking-tight">Personal Color Test</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Discover your seasonal color palette and find makeup that complements your natural tones.
                </p>
              </div>

              <Link
                href="/beauty/personal-color-test"
                className="w-full block bg-black text-white py-3 rounded-xl text-center text-sm font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Take the Test
              </Link>
            </div>
          </div>

          {/* CARD 2: Celebrity Makeup Finder */}
          <div className="relative rounded-2xl px-8 py-6 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white shadow-xl border border-gray-200/50 h-[calc(23.33vh-5.33px)] group hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-500">

            {/* Animated White Glow Orbs */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/60 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-gray-100/40 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-black mb-1.5 tracking-tight">Celebrity Makeup Finder</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Get the exact products used by your favorite celebrities and recreate their iconic looks.
                </p>
              </div>

              <Link
                href="/beauty/celebrity-makeup"
                className="w-full block bg-black text-white py-3 rounded-xl text-center text-sm font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Find Products
              </Link>
            </div>
          </div>

          {/* CARD 3: EMPTY - Reserved for Future Feature */}
          <div className="relative rounded-2xl px-8 py-6 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white shadow-xl border border-gray-200/50 h-[calc(23.33vh-5.33px)] group hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-500">

            {/* Animated White Glow Orbs */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/60 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-gray-100/40 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-black mb-1.5 tracking-tight">Coming Soon</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  A new exciting feature is on the way. Stay tuned for updates.
                </p>
              </div>

              <button
                disabled
                className="w-full block bg-gray-300 text-gray-500 py-3 rounded-xl text-center text-sm font-semibold cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* VIEW ALL PRODUCTS BUTTON + BESTSELLERS */}
      <div className="mt-28">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Bestsellers</h2>
          
          <Link
            href="/beauty/all-products"
            className="text-sm font-medium hover:opacity-70 transition underline decoration-1 underline-offset-4"
          >
            View All Beauty Products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 transition-opacity duration-700">
          {visibleBest.map((item: any, i: number) => (
            <BeautyCard key={i} {...item} />
          ))}
        </div>
      </div>

      {/* TRENDING NOW */}
      <CarouselSection title="Trending Now" items={visibleTrend} />

      {/* SHOP BY COLLECTION */}
      <CollectionCarousel gender={gender} />

      {/* ALL PRODUCTS GRID */}
      <BeautyGrid gender={gender} />

    </section>
  );
}

/* =====================================================
    SUB COMPONENTS
===================================================== */

/* =====================================================
    CAROUSEL SECTION
===================================================== */

function CarouselSection({ title, items }: any) {
  return (
    <div className="mt-28">
      <h2 className="text-3xl font-semibold mb-8">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 transition-opacity duration-700">
        {items.map((item: any, i: number) => (
          <BeautyCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

/* =====================================================
    BEAUTY CARD — with SVG Icons
===================================================== */

function BeautyCard({ img, brand, title, price, reviews, likes }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer">
      <div className="relative h-56 w-full">
        <img src={img} alt={title} className="w-full h-full object-cover object-top" />
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400">{brand}</p>
        <h3 className="font-semibold text-sm mt-1">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{price}</p>

        <div className="flex justify-between items-center text-xs text-gray-500 mt-3">

          {/* REVIEWS (Star Icon) */}
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
              <path d="m12 2 3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7z"/>
            </svg>
            {reviews}
          </span>

          {/* LIKES (Heart Icon) */}
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
              <path d="M12 21s-6-4.35-9-8.35C-1 6 3.5 2 7.5 4.5 9 5.4 10 7 12 9c2-2 3-3.6 4.5-4.5C20.5 2 25 6 21 12.65 18 16.65 12 21 12 21z"/>
            </svg>
            {likes}
          </span>

        </div>
      </div>
    </div>
  );
}

/* =====================================================
    SHOP BY COLLECTION
===================================================== */

function CollectionCarousel({ gender }: { gender: "women" | "men" }) {
  const womenCollections = [
    { title: "New Arrivals", img: "/col-1.jpg" },
    { title: "Winter-Ready Skincare", img: "/col-2.jpg" },
    { title: "K-beauty", img: "/col-3.jpg" },
    { title: "J-Beauty", img: "/col-4.jpg" },
    { title: "Facial Cleanser", img: "/col-5.jpg" },
    { title: "Makeup Remover", img: "/col-6.jpg" },
    { title: "Lip Care", img: "/col-7.jpg" },
    { title: "Glow Essentials", img: "/col-8.jpg" },
  ];

  const menCollections = [
    { title: "New Arrivals", img: "/col-men-1.jpg" },
    { title: "Grooming Essentials", img: "/col-men-2.jpg" },
    { title: "Beard Care", img: "/col-men-3.jpg" },
    { title: "Shaving", img: "/col-men-4.jpg" },
    { title: "Face Wash", img: "/col-men-5.jpg" },
    { title: "Moisturizers", img: "/col-men-6.jpg" },
    { title: "Fragrances", img: "/col-men-7.jpg" },
    { title: "Hair Styling", img: "/col-men-8.jpg" },
  ];

  const collections = gender === "women" ? womenCollections : menCollections;

  return (
    <div className="mt-28 w-full overflow-hidden">
      <h2 className="text-3xl font-semibold mb-10">Shop By Collection</h2>

      <div className="flex justify-center gap-10 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory scroll-smooth">
        {collections.map((item, i) => (
          <div key={i} className="flex flex-col items-center snap-start cursor-pointer">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 shadow-sm ring-1 ring-gray-200">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-center text-lg font-medium mt-4">{item.title}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <div className="w-2 h-2 rounded-full bg-black"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}

/* =====================================================
    BEAUTY GRID — ALL PRODUCTS BY CATEGORY
===================================================== */

function BeautyGrid({ gender }: { gender: "women" | "men" }) {
  // WOMEN'S CATEGORIES
  const womenSkincare = [
    { img: "/sk1.jpg", brand: "Biodance", title: "Bio-Collagen Mask Pink", price: "$6.99", reviews: "4.9 (2200)", likes: 15000 },
    { img: "/sk2.jpg", brand: "Anua", title: "Niacinamide 10% Serum", price: "$31.49", reviews: "4.8 (5100)", likes: 22000 },
    { img: "/sk3.jpg", brand: "Dr. Althea", title: "345 Relief Cream", price: "$34.99", reviews: "4.7 (4300)", likes: 18500 },
    { img: "/sk4.jpg", brand: "COSRX", title: "Snail 96 Mucin Essence", price: "$20.99", reviews: "4.9 (9000)", likes: 35000 },
    { img: "/sk5.jpg", brand: "Beauty of Joseon", title: "Dynasty Cream", price: "$18.99", reviews: "4.8 (6200)", likes: 28000 },
    { img: "/sk6.jpg", brand: "Ongredients", title: "Skin Barrier Calming Lotion", price: "$36.99", reviews: "4.9 (3400)", likes: 19000 },
    { img: "/sk7.jpg", brand: "Innisfree", title: "Green Tea Hyaluronic Acid Serum", price: "$40.50", reviews: "4.7 (7100)", likes: 24000 },
    
  ];

  const womenMakeup = [
    { img: "/mu1.jpg", brand: "NARS", title: "Radiant Creamy Concealer", price: "$39.00", reviews: "4.8 (7800)", likes: 33000 },
    { img: "/mu2.jpg", brand: "dasique", title: "Eyeshadow Palette 24 Muted Nuts", price: "$29.00", reviews: "4.9 (10300)", likes: 45000 },
    { img: "/mu3.jpg", brand: "Rare Beauty", title: "Soft Pinch Liquid Blush", price: "$32.00", reviews: "4.9 (6200)", likes: 41000 },
    { img: "/mu4.jpg", brand: "Dior Beauty", title: "Backstage Glow Maximizer Face Palette", price: "$65.00", reviews: "4.8 (8000)", likes: 35000 },
    { img: "/mu5.jpg", brand: "BANILA CO", title: "Covericious Ultimate Cover Cushion", price: "$38.00", reviews: "4.7 (9200)", likes: 29000 },
    { img: "/mu6.jpg", brand: "Charlotte Tilbury", title: "Airbrush Flawless Setting Spray", price: "$51.50", reviews: "4.8 (11000)", likes: 38000 },
    { img: "/mu7.jpg", brand: "Anastasia", title: "Brow Wiz® Eyebrow Pencil", price: "$35.50", reviews: "4.9 (8600)", likes: 32000 },
    { img: "/mu8.jpg", brand: "rom&nd", title: "THE JUICY LASTING TINT", price: "$15.00", reviews: "4.8 (5400)", likes: 27000 },
  ];

  const womenFragrance = [
    { img: "/fr1.jpg", brand: "Le Labo", title: "Santal 33", price: "$250.00", reviews: "4.9 (8400)", likes: 29000 },
    { img: "/fr2.jpg", brand: "YSL", title: "Libre EDP", price: "$155.00", reviews: "4.8 (6200)", likes: 21000 },
    { img: "/fr3.jpg", brand: "Gucci", title: "Bloom", price: "$165.00", reviews: "4.7 (5200)", likes: 18000 },
    { img: "/fr4.jpg", brand: "Maison Francis", title: "Baccarat Rouge 540", price: "$400.00", reviews: "4.9 (9000)", likes: 35000 },
    { img: "/fr5.jpg", brand: "Jo Malone", title: "English Pear & Freesia", price: "$165.00", reviews: "4.8 (7300)", likes: 26000 },
    { img: "/fr6.jpg", brand: "Chanel", title: "Coco Mademoiselle", price: "$195.00", reviews: "4.9 (10500)", likes: 42000 },
    { img: "/fr7.jpg", brand: "Lancôme", title: "La Vie Est Belle", price: "$148.00", reviews: "4.8 (8700)", likes: 31000 },
    { img: "/fr8.jpg", brand: "Viktor&Rolf", title: "Flowerbomb", price: "$175.00", reviews: "4.8 (6900)", likes: 28000 },
  ];

  // MEN'S CATEGORIES
  const menSkincare = [
    { img: "/men-sk1.jpg", brand: "Kiehl's", title: "Facial Fuel Energizing Moisture", price: "$45.00", reviews: "4.8 (5200)", likes: 12000 },
    { img: "/men-sk2.jpg", brand: "Lab Series", title: "Daily Rescue Water Lotion", price: "$52.00", reviews: "4.7 (3100)", likes: 9500 },
    { img: "/men-sk3.jpg", brand: "Clinique", title: "For Men Anti-Age Moisturizer", price: "$55.00", reviews: "4.6 (2800)", likes: 8200 },
    { img: "/men-sk4.jpg", brand: "Bulldog", title: "Original Face Moisturizer", price: "$18.00", reviews: "4.8 (6400)", likes: 11000 },
    { img: "/men-sk5.jpg", brand: "Neutrogena", title: "Men Triple Protect Face Lotion", price: "$16.99", reviews: "4.7 (5800)", likes: 10500 },
    { img: "/men-sk6.jpg", brand: "Shiseido Men", title: "Total Revitalizer Cream", price: "$75.00", reviews: "4.8 (2900)", likes: 9000 },
    { img: "/men-sk7.jpg", brand: "L'Oréal Men", title: "Hydra Energetic", price: "$19.99", reviews: "4.6 (7200)", likes: 12500 },
    { img: "/men-sk8.jpg", brand: "Nivea Men", title: "Sensitive Face Moisturizer", price: "$14.99", reviews: "4.7 (8100)", likes: 13500 },
  ];

  const menGrooming = [
    { img: "/men-gr1.jpg", brand: "Jack Black", title: "Beard Oil", price: "$32.00", reviews: "4.9 (4100)", likes: 15000 },
    { img: "/men-gr2.jpg", brand: "Baxter", title: "Clay Effect Style Spray", price: "$32.00", reviews: "4.8 (3200)", likes: 10000 },
    { img: "/men-gr3.jpg", brand: "Art of Shaving", title: "Sandalwood Shaving Cream", price: "$35.00", reviews: "4.7 (5800)", likes: 17000 },
    { img: "/men-gr4.jpg", brand: "Anthony", title: "Glycolic Facial Cleanser", price: "$38.00", reviews: "4.8 (4500)", likes: 12500 },
    { img: "/men-gr5.jpg", brand: "Uppercut", title: "Deluxe Pomade", price: "$24.99", reviews: "4.8 (6700)", likes: 19000 },
    { img: "/men-gr6.jpg", brand: "Billy Jealousy", title: "Beard Control", price: "$28.00", reviews: "4.7 (3900)", likes: 11000 },
    { img: "/men-gr7.jpg", brand: "American Crew", title: "Forming Cream", price: "$22.00", reviews: "4.8 (8200)", likes: 21000 },
    { img: "/men-gr8.jpg", brand: "Suavecito", title: "Original Hold Pomade", price: "$19.99", reviews: "4.7 (7500)", likes: 18000 },
  ];

  const menFragrance = [
    { img: "/men-fr1.jpg", brand: "Creed", title: "Aventus", price: "$435.00", reviews: "4.9 (7500)", likes: 32000 },
    { img: "/men-fr2.jpg", brand: "Tom Ford", title: "Oud Wood", price: "$275.00", reviews: "4.8 (5200)", likes: 25000 },
    { img: "/men-fr3.jpg", brand: "Dior Homme", title: "Intense EDP", price: "$150.00", reviews: "4.9 (6800)", likes: 28000 },
    { img: "/men-fr4.jpg", brand: "Hermès", title: "Terre d'Hermès", price: "$155.00", reviews: "4.8 (4200)", likes: 19000 },
    { img: "/men-fr5.jpg", brand: "Bleu de Chanel", title: "Eau de Parfum", price: "$165.00", reviews: "4.9 (9200)", likes: 35000 },
    { img: "/men-fr6.jpg", brand: "Paco Rabanne", title: "1 Million", price: "$98.00", reviews: "4.7 (6500)", likes: 24000 },
    { img: "/men-fr7.jpg", brand: "Giorgio Armani", title: "Acqua di Giò", price: "$135.00", reviews: "4.8 (8100)", likes: 31000 },
    { img: "/men-fr8.jpg", brand: "Versace", title: "Eros", price: "$115.00", reviews: "4.8 (7800)", likes: 27000 },
  ];

  // Select data based on gender
  const categorySkincare = gender === "women" ? womenSkincare : menSkincare;
  const categorySecond = gender === "women" ? womenMakeup : menGrooming;
  const categoryFragrance = gender === "women" ? womenFragrance : menFragrance;

  const secondCategoryTitle = gender === "women" ? "Makeup" : "Grooming";
  const secondCategoryLink = gender === "women" ? "/beauty/makeup" : "/beauty/grooming";
  const secondCategoryImage = gender === "women" ? "/makeup-banner.jpg" : "/grooming-banner.jpg";

  return (
    <div className="mt-28 mb-20">
      <h2 className="text-3xl font-semibold mb-12">Shop by Category</h2>

      {/* SKINCARE CATEGORY */}
      <CategoryRow
        title="All Skincare"
        categoryLink="/beauty/skincare"
        categoryImage="/beauty-skincare1.jpg"
        products={categorySkincare}
      />

      {/* MAKEUP / GROOMING CATEGORY */}
      <CategoryRow
        title={`All ${secondCategoryTitle}`}
        categoryLink={secondCategoryLink}
        categoryImage={secondCategoryImage}
        products={categorySecond}
      />

      {/* FRAGRANCE CATEGORY */}
      <CategoryRow
        title="All Fragrance"
        categoryLink="/beauty/fragrance"
        categoryImage="/fragrance-banner1.jpg"
        products={categoryFragrance}
      />
    </div>
  );
}

/* =====================================================
    CATEGORY ROW — Left Card + Horizontal Product Scroll
===================================================== */

function CategoryRow({ title, categoryLink, categoryImage, products }: any) {
  return (
    <div className="mb-16 flex gap-4">
      
      {/* LEFT CATEGORY CARD - FIXED */}
      <Link
        href={categoryLink}
        className="min-w-[280px] w-[280px] h-[420px] bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-2xl flex flex-col justify-between p-8 relative overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition flex-shrink-0"
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src={categoryImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-3xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/90 text-sm">Shop all</p>
        </div>

        {/* Arrow Button */}
        <div className="relative z-10 flex justify-start">
          <div className="w-14 h-14 rounded-full border-2 border-white/50 flex items-center justify-center group-hover:bg-white/20 transition">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </Link>

      {/* PRODUCT CARDS - SCROLLABLE */}
      <div className="flex gap-4 overflow-x-auto scrollbar-none pb-4 flex-1">
        {products.map((item: any, i: number) => (
          <div key={i} className="min-w-[280px] flex-shrink-0">
            <CategoryProductCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================
    CATEGORY PRODUCT CARD — Simplified (no stock/cart)
===================================================== */

function CategoryProductCard({ img, brand, title, price, reviews, likes }: any) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer h-full">
      
      {/* Product Image */}
      <div className="relative h-64 w-full">
        <img src={img} alt={title} className="w-full h-full object-cover" />
        
        {/* Heart Icon (Top Right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition"
        >
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill={liked ? "#ef4444" : "none"} 
            stroke={liked ? "#ef4444" : "#111"} 
            strokeWidth="2"
          >
            <path d="M12 21s-6-4.35-9-8.35C-1 6 3.5 2 7.5 4.5 9 5.4 10 7 12 9c2-2 3-3.6 4.5-4.5C20.5 2 25 6 21 12.65 18 16.65 12 21 12 21z"/>
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wide">{brand}</p>
        <h3 className="font-semibold text-base mt-2 leading-tight">{title}</h3>
        <p className="text-gray-900 font-semibold text-lg mt-2">{price}</p>

        <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
          {/* REVIEWS (Star Icon) */}
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="gold" stroke="gold" strokeWidth="1.5">
              <path d="m12 2 3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7z"/>
            </svg>
            {reviews}
          </span>

          {/* LIKES COUNT */}
          <span className="flex items-center gap-1 text-gray-400">
            {likes.toLocaleString()} likes
          </span>
        </div>
      </div>
    </div>
  );
}