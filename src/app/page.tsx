"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">

{/* ===== GLOBAL TOP BANNER ===== */}
<section className="w-full bg-white text-black h-[50px] flex items-center justify-center text-sm md:text-base px-4 border-b border-gray-200">
  <div id="bannerText" className="opacity-100 transition-opacity duration-500 font-medium">
    10% Off First Order | 7 Days Only | Code: WLCM2MSS
  </div>

  <script
    dangerouslySetInnerHTML={{
      __html: `
        const bannerMessages = [
          "10% Off First Order | 7 Days Only | Code: WLCM2MSS",
          "Free Shipping on Orders Over $75",
          "New Season Arrivals — Shop the Drop!",
        ];

        let currentIndex = 0;
        const bannerEl = document.getElementById("bannerText");

        function rotateBanner() {
          if (!bannerEl) return;
          bannerEl.style.opacity = 0;

          setTimeout(() => {
            currentIndex = (currentIndex + 1) % bannerMessages.length;
            bannerEl.textContent = bannerMessages[currentIndex];
            bannerEl.style.opacity = 1;
          }, 500);
        }

        setInterval(rotateBanner, 3000);
      `,
    }}
  />
</section>




    
      {/* ===== HERO SECTION (Video as full background) ===== */}
<section className="relative w-full h-[55vh] flex items-center justify-center text-center overflow-hidden">
  <video
    className="absolute inset-0 w-full h-full object-cover brightness-75"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/hero.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/40"></div>

  <div className="relative z-10 max-w-5xl px-6">
    <h1 className="text-white font-semibold text-[4.5vw] md:text-[3vw] lg:text-[2.5vw] leading-[1.15] tracking-tight drop-shadow-[0_8px_18px_rgba(0,0,0,0.9)] mb-8">
  THE PLACE TO SHOP<br />
  THE STYLES YOU LOVE.<br />
  WELCOME TO STYLECAST.
</h1>


    <a
      href="#board"
      className="inline-block px-10 py-4 text-lg md:text-xl text-white border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
    >
      See What We Prepared For You
    </a>
  </div>
</section>



{/* ===== AI FEATURES BANNERS (BENTO GRID) ===== */}
<section className="w-full border-t border-gray-200 bg-white py-20 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* LEFT: SCAN & TRY BANNER */}
    <div className="flex flex-row items-center justify-between gap-8 p-8 bg-white border border-gray-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-all h-[280px]">
      
      {/* Barcode Graphic */}
      <div className="flex-shrink-0">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="20" width="4" height="80" fill="#111111"/>
          <rect x="12" y="20" width="2" height="80" fill="#111111"/>
          <rect x="18" y="20" width="6" height="80" fill="#111111"/>
          <rect x="28" y="20" width="2" height="80" fill="#111111"/>
          <rect x="34" y="20" width="4" height="80" fill="#111111"/>
          <rect x="42" y="20" width="2" height="80" fill="#111111"/>
          <rect x="48" y="20" width="6" height="80" fill="#111111"/>
          <rect x="58" y="20" width="4" height="80" fill="#111111"/>
          <rect x="66" y="20" width="2" height="80" fill="#111111"/>
          <rect x="72" y="20" width="6" height="80" fill="#111111"/>
          <rect x="82" y="20" width="2" height="80" fill="#111111"/>
          <rect x="88" y="20" width="4" height="80" fill="#111111"/>
        </svg>
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <p className="inline-flex items-center rounded-full bg-black text-white px-3 py-1 text-xs font-medium uppercase tracking-wide mb-3">
          Scan & Try
        </p>

        <h2 className="text-2xl font-semibold text-[#111111] leading-tight mb-3">
          Scan Any Beauty Product,<br />Try It Instantly
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">
        See reviews, get instant AI insights, check ingredients, and try it on virtually.
        </p>

        <Link
          href="/product-scanner"
          className="inline-flex items-center text-sm font-medium text-black hover:underline"
        >
          Start Scanning →
        </Link>
      </div>
    </div>

    {/* RIGHT: PERSONAL COLOR BANNER */}
    <div className="flex flex-col justify-between gap-4 p-8 bg-white border border-gray-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-all h-[280px]">

      <div>
        <p className="inline-flex items-center rounded-full bg-black text-white px-3 py-1 text-xs font-medium uppercase tracking-wide mb-3">
          AI Personal Color
        </p>

        <h2 className="text-2xl font-semibold text-[#111111] leading-tight mb-3">
          Discover Your True<br />Personal Color
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          AI analyzes your skin tone to determine your exact{" "}
          <span className="font-semibold text-[#111111]">12-tone color type</span>.
        </p>

        {/* CHIPS */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#111111]">
          <span className="rounded-full border border-gray-300 px-2.5 py-1">Spring</span>
          <span className="rounded-full border border-gray-300 px-2.5 py-1">Summer</span>
          <span className="rounded-full border border-gray-300 px-2.5 py-1">Autumn</span>
          <span className="rounded-full border border-gray-300 px-2.5 py-1">Winter</span>
        </div>
      </div>

      <Link
        href="/personal-color"
        className="inline-flex items-center text-sm font-medium text-black hover:underline w-fit"
      >
        Start Free Test →
      </Link>
    </div>

  </div>
</section>




{/* ===== BEST SELLERS SECTION (POSTERS NO BOX) ===== */}
<section id="bestsellers" className="w-full py-28 bg-white">

  <style>{`
    .poster-fade { transition: opacity 0.6s ease; }
  `}</style>

  {/* TWO POSTERS — NO EXTRA BOXES */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mb-16">

    {/* Poster A */}
    <a id="posterA-link" href="#" className="block w-full">
      <img
        id="posterA-image"
        src="/poster-1.jpg"
        alt="Poster A"
        className="w-full h-auto poster-fade rounded-2xl object-contain"
      />
    </a>

    {/* Poster B */}
    <a id="posterB-link" href="#" className="block w-full">
      <img
        id="posterB-image"
        src="/poster-2.jpg"
        alt="Poster B"
        className="w-full h-auto poster-fade rounded-2xl object-contain"
      />
    </a>

  </div>

  {/* POSTER ROTATION SCRIPT — FIXED & REDUCED TO 4 POSTERS */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        document.addEventListener("DOMContentLoaded", function () {

          // Only 4 posters total (2 for each)
          const postersA = [
            { img: "/poster-1.jpg", link: "/brand/rhode" },
            { img: "/poster-3.jpg", link: "/brand/dior" }
          ];

          const postersB = [
            { img: "/poster-2.jpg", link: "/brand/charlotte-tilbury" },
            { img: "/poster-4.jpg", link: "/brand/kosas" }
          ];

          let iA = 0, iB = 0;

          const posterAImg = document.getElementById("posterA-image");
          const posterALink = document.getElementById("posterA-link");
          const posterBImg = document.getElementById("posterB-image");
          const posterBLink = document.getElementById("posterB-link");

          if (!posterAImg || !posterBImg) return;

          function rotatePosterA() {
            posterAImg.style.opacity = 0;
            setTimeout(() => {
              iA = (iA + 1) % postersA.length;
              posterAImg.src = postersA[iA].img;
              posterALink.href = postersA[iA].link;
              posterAImg.style.opacity = 1;
            }, 600);
          }

          function rotatePosterB() {
            posterBImg.style.opacity = 0;
            setTimeout(() => {
              iB = (iB + 1) % postersB.length;
              posterBImg.src = postersB[iB].img;
              posterBLink.href = postersB[iB].link;
              posterBImg.style.opacity = 1;
            }, 600);
          }

          // Rotate every 3 seconds
          setInterval(rotatePosterA, 3000);
          setInterval(rotatePosterB, 3000);

        });
      `,
    }}
  />

  {/* HEADER */}
  <div className="flex items-center justify-between px-6 mb-12">
    <h2 className="text-3xl font-semi tracking-wide text-[#111]">Best Sellers</h2>
    <a href="/bestsellers" className="text-sm text-[#111] opacity-70 hover:opacity-100 transition">
      View more →
    </a>
  </div>







{/* ======= BEST SELLERS CAROUSEL ======= */}
<div
  id="bestseller-carousel"
  className="flex gap-8 whitespace-nowrap overflow-x-hidden overflow-y-visible [scrollbar-width:none] [-ms-overflow-style:none] px-6"
>
  {[
    { img: "/bestseller1.jpg", brand: "KHAKIPOINT", title: "Damage Punching Knit", price: "$62.99", rating: "4.9", reviews: "2200", likes: "15000" },
    { img: "/bestseller2.jpg", brand: "Rhode", title: "Essential Crew Sweatshirt", price: "$75.00", rating: "4.9", reviews: "3200", likes: "18000" },
    { img: "/bestseller3.jpg", brand: "Aritzia", title: "Generation Blazer - Crepette™", price: "$248.00", rating: "4.7", reviews: "5400", likes: "23000" },
    { img: "/bestseller4.jpg", brand: "Lululemon", title: "Manteau bouffant en duvet Always Down", price: "$368.00", rating: "4.9", reviews: "6200", likes: "27000" },
    { img: "/bestseller5.jpg", brand: "Polo Ralph Lauren", title: "Polo Bear Hooded Sweater", price: "$528.00", rating: "4.8", reviews: "4100", likes: "19000" },
    { img: "/bestseller6.jpg", brand: "Avie muah", title: "Buckle Detail Fake Fur Coat", price: "$321.00", rating: "4.9", reviews: "8900", likes: "35000" },
    { img: "/bestseller7.jpg", brand: "UNIQLO", title: "LAMBSWOOL CREW NECK SWEATER", price: "$49.90", rating: "4.7", reviews: "7400", likes: "31000" },
    { img: "/bestseller8.jpg", brand: "SKIMS", title: "OVERSIZED CABLEKNIT CREWNECK PULLOVER", price: "$220.00", rating: "4.8", reviews: "2500", likes: "14000" },
    { img: "/bestseller9.jpg", brand: "GYMSHARK", title: "GSRC HOODIE", price: "$78.00", rating: "4.8", reviews: "3600", likes: "15000" },
  ].map((item, i) => (
    <div
      key={i}
      className="relative flex-shrink-0 w-[260px] rounded-2xl bg-white hover:scale-[1.02] transition-transform duration-300 border border-gray-100"
    >

      {/* UPDATED: TALL RECTANGLE IMAGE BOX WITH LINK */}
      <Link
        href={`/product/${item.img.replace(".jpg", "").replace("/", "")}`}
      >
        <div className="relative w-full h-[380px] rounded-t-2xl overflow-hidden bg-gray-50 cursor-pointer">
          <img src={item.img} className="w-full h-full object-cover" />
          <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full border border-gray-200">♡</button>
        </div>
      </Link>

      {/* TEXT CONTENT */}
      <div className="p-4">
        <p className="text-xs text-gray-500 tracking-wide mb-1">{item.brand.toUpperCase()}</p>
        <h3 className="text-[17px] font-semibold text-[#111] leading-snug mb-1">{item.title}</h3>
        <p className="text-lg font-semibold mb-2">{item.price}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>⭐ {item.rating} ({item.reviews})</span>
          <span>{Number(item.likes).toLocaleString()} likes</span>
        </div>
      </div>
    </div>
  ))}
</div>

<script
  dangerouslySetInnerHTML={{
    __html: `
      const bestSlider = document.getElementById("bestseller-carousel");
      let scrollPos = 0;
      const speed = 1;
      function moveSlider() {
        if (!bestSlider) return;
        scrollPos += speed;
        if (scrollPos >= bestSlider.scrollWidth / 2) scrollPos = 0;
        bestSlider.scrollLeft = scrollPos;
        requestAnimationFrame(moveSlider);
      }
      requestAnimationFrame(moveSlider);
    `,
  }}
/>
</section>

{/* ===== TREND ITEMS SECTION ===== */}
<section id="trends" className="w-full py-28 bg-white overflow-hidden">
  <h2 className="text-3xl font-semi mb-16 text-right px-6 tracking-wide text-[#111111]">

    Trending Now
  </h2>

  <style>{`
    .flip-card {
      perspective: 1000px;
      cursor: pointer;
    }
    .flip-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.7s;
      transform-style: preserve-3d;
    }
    .flip-card.flipped .flip-inner {
      transform: rotateY(180deg);
    }
    .flip-front, .flip-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 16px;
      overflow: hidden;
    }
    .flip-back {
      transform: rotateY(180deg);
      background: #111111;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      text-align: center;
      font-size: 1rem;
      border-radius: 16px;
    }
  `}</style>

  <div
    id="trend-carousel"
    className="flex gap-6 overflow-x-hidden whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none]"
  >
    {[
      "/trend-1.jpg",
      "/trend-2.jpg",
      "/trend-3.jpg",
      "/trend-4.jpg",
      "/trend-5.jpg",
      "/trend-6.jpg",
      "/trend-7.jpg",
      "/trend-8.jpg",
      "/trend-9.jpg",
      "/trend-10.jpg",
      "/trend-11.jpg",
    ].map((src, i) => (
      <div
        key={i}
        className="flip-card relative flex-shrink-0 w-[260px] h-[360px] rounded-2xl"
        onClick={(e) => e.currentTarget.classList.toggle("flipped")}
      >
        <div className="flip-inner">
          {/* FRONT */}
          <div className="flip-front">
            <img
              src={src}
              alt={`Trend item ${i + 1}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* BACK */}
          <div className="flip-back">
            <p>⭐ Style Tip #{i + 1}:  
              <br/>Stay cozy & chic this season.</p>
          </div>
        </div>
      </div>
    ))}

    {/* Duplicate for infinite loop */}
    {[
      "/trend-1.jpg",
      "/trend-2.jpg",
      "/trend-3.jpg",
      "/trend-4.jpg",
      "/trend-5.jpg",
      "/trend-6.jpg",
      "/trend-7.jpg",
      "/trend-8.jpg",
      "/trend-9.jpg",
      "/trend-10.jpg",
      "/trend-11.jpg",
    ].map((src, i) => (
      <div
        key={`dup-${i}`}
        className="flip-card relative flex-shrink-0 w-[260px] h-[360px] rounded-2xl"
        onClick={(e) => e.currentTarget.classList.toggle("flipped")}
      >
        <div className="flip-inner">
          {/* FRONT */}
          <div className="flip-front">
            <img
              src={src}
              alt={`Trend duplicate ${i + 1}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* BACK */}
          <div className="flip-back">
            <p>✨ Discover a new vibe today!</p>
          </div>
        </div>
      </div>
    ))}
  </div>

  <script
    dangerouslySetInnerHTML={{
      __html: `
        const carousel = document.getElementById("trend-carousel");
        let scrollAmount = carousel?.scrollWidth / 2 || 0;
        const scrollStep = 0.7;

        function autoScroll() {
          if (!carousel) return;
          scrollAmount -= scrollStep;

          if (scrollAmount <= 0) {
            scrollAmount = carousel.scrollWidth / 2;
          }

          carousel.scrollLeft = scrollAmount;
          requestAnimationFrame(autoScroll);
        }

        requestAnimationFrame(autoScroll);
      `,
    }}
  />
</section>


{/* ===== NEW DROPS SECTION (MATCH BEST SELLERS) ===== */}
<section id="newdrops" className="w-full py-28 bg-white">

  <div className="flex items-center justify-between px-6 mb-16">
    <h2 className="text-3xl font-semi tracking-wide text-[#111]">New Drops</h2>

    <a href="/newdrops" className="text-sm text-[#111] opacity-70 hover:opacity-100 transition">
      View more →
    </a>
  </div>

  <div
    id="newdrops-carousel"
    className="flex gap-8 whitespace-nowrap overflow-x-hidden overflow-y-visible [scrollbar-width:none] [-ms-overflow-style:none] px-6"
  >
    {[
      { img: "/bestseller1.jpg", brand: "KHAKIPOINT", title: "Damage Punching Knit", price: "$62.99", rating: "4.9", reviews: "2200", likes: "15000" },
      { img: "/bestseller2.jpg", brand: "Rhode", title: "Essential Crew Sweatshirt", price: "$75.00", rating: "4.9", reviews: "3200", likes: "18000" },
      { img: "/bestseller3.jpg", brand: "Aritzia", title: "Generation Blazer - Crepette™", price: "$248.00", rating: "4.7", reviews: "5400", likes: "23000" },
      { img: "/bestseller4.jpg", brand: "Lululemon", title: "Manteau bouffant en duvet Always Down", price: "$368.00", rating: "4.9", reviews: "6200", likes: "27000" },
      { img: "/bestseller5.jpg", brand: "Polo Ralph Lauren", title: "Polo Bear Hooded Sweater", price: "$528.00", rating: "4.8", reviews: "4100", likes: "19000" },
      { img: "/bestseller6.jpg", brand: "Avie muah", title: "Buckle Detail Fake Fur Coat", price: "$321.00", rating: "4.9", reviews: "8900", likes: "35000" },
      { img: "/bestseller7.jpg", brand: "UNIQLO", title: "LAMBSWOOL CREW NECK SWEATER", price: "$49.90", rating: "4.7", reviews: "7400", likes: "31000" },
      { img: "/bestseller8.jpg", brand: "SKIMS", title: "OVERSIZED CABLEKNIT CREWNECK PULLOVER", price: "$220.00", rating: "4.8", reviews: "2500", likes: "14000" },
      { img: "/bestseller9.jpg", brand: "GYMSHARK", title: "GSRC HOODIE", price: "$78.00", rating: "4.8", reviews: "3600", likes: "15000" },
    ].map((item, i) => (
      <div
        key={i}
        className="relative flex-shrink-0 w-[260px] rounded-2xl bg-white hover:scale-[1.02] transition-transform duration-300 border border-gray-100"
      >
        {/* MATCH BEST SELLERS: VERTICAL IMAGE BOX WITH LINK */}
        <Link
          href={`/product/${item.img.replace(".jpg", "").replace("/", "")}`}
        >
          <div className="relative w-full h-[380px] rounded-t-2xl overflow-hidden bg-gray-50 cursor-pointer">
            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full border border-gray-200">♡</button>
          </div>
        </Link>

        <div className="p-4">
          <p className="text-xs text-gray-500 tracking-wide mb-1">{item.brand.toUpperCase()}</p>
          <h3 className="text-[17px] font-semibold text-[#111] leading-snug mb-1">{item.title}</h3>
          <p className="text-lg font-semibold mb-2">{item.price}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>⭐ {item.rating} ({item.reviews})</span>
            <span>{Number(item.likes).toLocaleString()} likes</span>
          </div>
        </div>
      </div>
    ))}

    {/* DUPLICATE SET FOR INFINITE LOOP */}
    {[
      { img: "/bestseller1.jpg", brand: "KHAKIPOINT", title: "Damage Punching Knit", price: "$62.99", rating: "4.9", reviews: "2200", likes: "15000" },
      { img: "/bestseller2.jpg", brand: "Rhode", title: "Essential Crew Sweatshirt", price: "$75.00", rating: "4.9", reviews: "3200", likes: "18000" },
      { img: "/bestseller3.jpg", brand: "Aritzia", title: "Generation Blazer - Crepette™", price: "$248.00", rating: "4.7", reviews: "5400", likes: "23000" },
    ].map((item, i) => (
      <div
        key={`dup-${i}`}
        className="relative flex-shrink-0 w-[260px] rounded-2xl bg-white border border-gray-100"
      >
        <div className="relative w-full h-[380px] rounded-t-2xl overflow-hidden bg-gray-50">
          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 tracking-wide mb-1">{item.brand.toUpperCase()}</p>
          <h3 className="text-[17px] font-semibold text-[#111] leading-snug mb-1">{item.title}</h3>
          <p className="text-lg font-semibold mb-2">{item.price}</p>
        </div>
      </div>
    ))}
  </div>

  {/* SLIDER SCRIPT */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        const ndSlider = document.getElementById("newdrops-carousel");
        let ndPos = 0;
        const ndSpeed = 1;
        function slideND() {
          if (!ndSlider) return;
          ndPos += ndSpeed;
          if (ndPos >= ndSlider.scrollWidth / 2) ndPos = 0;
          ndSlider.scrollLeft = ndPos;
          requestAnimationFrame(slideND);
        }
        requestAnimationFrame(slideND);
      `,
    }}
  />
</section>

{/* ===== PEOPLE FEED SECTION ===== */}
<section id="people-feed" className="w-full py-24 bg-white">

  {/* HEADER */}
  <div className="flex items-center justify-between px-6 mb-12">
    <h2 className="text-3xl font-semi tracking-wide text-[#111]">
      Feed
    </h2>

    <a href="/feed" className="text-sm text-[#111] opacity-70 hover:opacity-100 transition">
      View All →
    </a>
  </div>

  {/* GRID FEED */}
  <div className="px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

    {[
      "/feed-1.jpg",
      "/feed-2.jpg",
      "/feed-3.jpg",
      "/feed-4.jpg",
      "/feed-5.jpg",
      "/feed-6.jpg",
      "/feed-7.jpg",
      "/feed-8.jpg",
    ].map((src, i) => (
      <div
        key={i}
        className="relative w-full h-[260px] md:h-[300px] rounded-2xl overflow-hidden bg-gray-100 hover:scale-[1.01] transition-transform duration-300 cursor-pointer"
      >
        <img
          src={src}
          alt={`Feed post ${i + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Optional: small overlay username */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
          @username{i + 1}
        </div>
      </div>
    ))}

  </div>
</section>



 
 

    </main>
  );
}

