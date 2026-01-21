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
    <h1 className="text-white font-semibold text-[4.5vw] md:text-[3vw] lg:text-[2.5vw] leading-[1.15] tracking-tight drop-shadow-[0_8px_18px_rgba(0,0,0,0.9)]">
      THE PLACE TO SHOP<br />
      THE STYLES YOU LOVE.<br />
      WELCOME TO STYLECAST.
    </h1>
  </div>
</section>


{/* ===== PRODUCT GRID SECTION ===== */}
<section id="products" className="w-full py-20 bg-white">
  
  {/* Filter Bar */}
  <div className="max-w-[1600px] mx-auto px-6 mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
    <div className="flex items-center gap-6">
      <button className="text-sm font-medium text-[#111] hover:opacity-70 transition">
        Product ▾
      </button>
      <button className="text-sm font-medium text-[#111] hover:opacity-70 transition">
        Size ▾
      </button>
      <button className="text-sm font-medium text-[#111] hover:opacity-70 transition">
        Color ▾
      </button>
    </div>
    
    <button className="text-sm font-medium text-[#111] hover:opacity-70 transition">
      Sort by: Popular ▾
    </button>
  </div>

  <div className="max-w-[1600px] mx-auto px-6">
    
    {/* TOP ROW - 2 LARGE FEATURED CARDS (SHORTER HEIGHT) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      
      {/* Large Card 1 */}
      <Link 
        href="/product/cropped-fringe-jacket"
        className="group relative bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Heart Icon */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white transition-all"
        >
          <svg 
            className="w-5 h-5 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>

        {/* Large Product Image - SHORTER */}
        <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
          <img 
            src="/producthp-1.jpg" 
            alt="CROPPED FRINGE JACKET"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-5 bg-white">
          <p className="text-xs text-gray-500 mb-1 font-medium">ZARA</p>
          <h3 className="text-base font-semibold text-[#111] mb-2 leading-tight">
            베이직 퍼플러스 집업_SPFZF4TC01
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl font-bold text-red-600">35%</span>
            <span className="text-xl font-bold text-[#111]">129,900원</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-500">❤️ 10만</span>
            <span className="text-orange-500">⭐ 4.8(4만+)</span>
          </div>
        </div>
      </Link>

      {/* Large Card 2 */}
      <Link 
        href="/product/leather-pants"
        className="group relative bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Heart Icon */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white transition-all"
        >
          <svg 
            className="w-5 h-5 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>

        {/* Large Product Image - SHORTER */}
        <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
          <img 
            src="/product-2.jpg" 
            alt="LEATHER PANTS"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-5 bg-white">
          <p className="text-xs text-gray-500 mb-1 font-medium">MANGO</p>
          <h3 className="text-base font-semibold text-[#111] mb-2 leading-tight">
            Premium Leather Wide Pants
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl font-bold text-red-600">40%</span>
            <span className="text-xl font-bold text-[#111]">179,900원</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-500">❤️ 8.5만</span>
            <span className="text-orange-500">⭐ 4.9(3.2만+)</span>
          </div>
        </div>
      </Link>

    </div>

    {/* REGULAR GRID - 5 CARDS PER ROW */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-6">
      
      {[
        { 
          img: "/product-3.jpg", 
          brand: "UNIQLO",
          title: "카고 플랩 디테일 팬츠", 
          discount: "25%",
          price: "49,900원",
          likes: "5.2만",
          rating: "4.7",
          reviews: "2.1만+",
          link: "/product/cargo-flap-detail-pants"
        },
        { 
          img: "/product-4.jpg", 
          brand: "H&M",
          title: "피티드 니트 탑", 
          discount: "30%",
          price: "29,900원",
          likes: "6.8만",
          rating: "4.6",
          reviews: "1.8만+",
          link: "/product/fitted-knit-top"
        },
        { 
          img: "/product-5.jpg", 
          brand: "COS",
          title: "와이드 턱 팬츠", 
          discount: "20%",
          price: "45,900원",
          likes: "4.3만",
          rating: "4.8",
          reviews: "1.5만+",
          link: "/product/wide-tucked-pants"
        },
        { 
          img: "/product-6.jpg", 
          brand: "PULL&BEAR",
          title: "인슐레이티드 하프 스톰 점퍼", 
          discount: "35%",
          price: "129,900원",
          likes: "7.1만",
          rating: "4.9",
          reviews: "3.8万+",
          link: "/product/insulated-half-storm-jumper"
        },
        { 
          img: "/product-7.jpg", 
          brand: "MASSIMO DUTTI",
          title: "오버사이즈 레더 코트", 
          discount: "45%",
          price: "299,900원",
          likes: "12만",
          rating: "4.9",
          reviews: "5.2만+",
          link: "/product/oversized-leather-coat"
        },
        { 
          img: "/product-8.jpg", 
          brand: "BERSHKA",
          title: "시킨드 윈드디테일 셔츠", 
          discount: "28%",
          price: "59,900원",
          likes: "3.9만",
          rating: "4.5",
          reviews: "1.2만+",
          link: "/product/thickened-winddetail-shirt"
        },
        { 
          img: "/product-9.jpg", 
          brand: "STRADIVARIUS",
          title: "라운디드 크롭 데님 점퍼", 
          discount: "32%",
          price: "79,900원",
          likes: "5.8만",
          rating: "4.7",
          reviews: "2.4만+",
          link: "/product/rounded-cropped-denim-jumper"
        },
        { 
          img: "/product-10.jpg", 
          brand: "ZARA",
          title: "디스트로이드 니트 탑", 
          discount: "22%",
          price: "39,900원",
          likes: "4.6만",
          rating: "4.6",
          reviews: "1.9만+",
          link: "/product/destroyed-knit-top"
        },
        { 
          img: "/product-11.jpg", 
          brand: "MANGO",
          title: "퍼 트리밍 레더 봄버", 
          discount: "38%",
          price: "249,900원",
          likes: "9.4만",
          rating: "4.8",
          reviews: "4.1만+",
          link: "/product/fur-trimmed-leather-bomber"
        },
        { 
          img: "/product-12.jpg", 
          brand: "COS",
          title: "오버사이즈 시어링 재킷", 
          discount: "42%",
          price: "199,900원",
          likes: "8.2만",
          rating: "4.9",
          reviews: "3.6만+",
          link: "/product/oversized-shearling-jacket"
        },
        { 
          img: "/product-13.jpg", 
          brand: "UNIQLO",
          title: "울 블렌드 트렌치 코트", 
          discount: "33%",
          price: "189,900원",
          likes: "11만",
          rating: "4.8",
          reviews: "6.3만+",
          link: "/product/wool-blend-trench-coat"
        },
        { 
          img: "/product-14.jpg", 
          brand: "H&M",
          title: "디스트레스드 데님 재킷", 
          discount: "26%",
          price: "89,900원",
          likes: "6.5만",
          rating: "4.7",
          reviews: "2.8만+",
          link: "/product/distressed-denim-jacket"
        },
        { 
          img: "/product-15.jpg", 
          brand: "PULL&BEAR",
          title: "오버핏 후드 집업", 
          discount: "29%",
          price: "69,900원",
          likes: "7.3만",
          rating: "4.8",
          reviews: "3.1만+",
          link: "/product/overfit-hood-zipup"
        },
        { 
          img: "/product-16.jpg", 
          brand: "BERSHKA",
          title: "크롭 패딩 베스트", 
          discount: "31%",
          price: "79,900원",
          likes: "5.7만",
          rating: "4.6",
          reviews: "2.2万+",
          link: "/product/crop-padding-vest"
        },
        { 
          img: "/product-17.jpg", 
          brand: "ZARA",
          title: "플리츠 미디 스커트", 
          discount: "24%",
          price: "55,900원",
          likes: "4.9만",
          rating: "4.7",
          reviews: "1.7만+",
          link: "/product/pleats-midi-skirt"
        },
      ].map((item, i) => (
        <Link 
          key={i} 
          href={item.link}
          className="group relative bg-white overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          {/* Heart Icon */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white transition-all"
          >
            <svg 
              className="w-4 h-4 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </button>

          {/* Product Image */}
          <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
            <img 
              src={item.img} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Info */}
          <div className="p-3 bg-white">
            <p className="text-[10px] text-gray-500 mb-1 font-medium">{item.brand}</p>
            <h3 className="text-xs font-semibold text-[#111] mb-1.5 leading-tight line-clamp-2">
              {item.title}
            </h3>
            <div className="flex items-baseline gap-1.5 mb-1.5">
              <span className="text-sm font-bold text-red-600">{item.discount}</span>
              <span className="text-sm font-bold text-[#111]">{item.price}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-red-500">❤️ {item.likes}</span>
              <span className="text-orange-500">⭐ {item.rating}({item.reviews})</span>
            </div>
          </div>
        </Link>
      ))}

    </div>

    {/* BOTTOM ROW - 2 LARGE FEATURED CARDS (SHORTER HEIGHT) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Large Card 3 */}
      <Link 
        href="/product/wool-overcoat"
        className="group relative bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Heart Icon */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white transition-all"
        >
          <svg 
            className="w-5 h-5 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>

        {/* Large Product Image - SHORTER */}
        <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
          <img 
            src="/product-18.jpg" 
            alt="WOOL OVERCOAT"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-5 bg-white">
          <p className="text-xs text-gray-500 mb-1 font-medium">MASSIMO DUTTI</p>
          <h3 className="text-base font-semibold text-[#111] mb-2 leading-tight">
            울 블렌드 더블 오버코트
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl font-bold text-red-600">48%</span>
            <span className="text-xl font-bold text-[#111]">359,900원</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-500">❤️ 15만</span>
            <span className="text-orange-500">⭐ 4.9(6.8만+)</span>
          </div>
        </div>
      </Link>

      {/* Large Card 4 */}
      <Link 
        href="/product/cashmere-knit"
        className="group relative bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Heart Icon */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white transition-all"
        >
          <svg 
            className="w-5 h-5 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>

        {/* Large Product Image - SHORTER */}
        <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
          <img 
            src="/product-19.jpg" 
            alt="CASHMERE KNIT"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-5 bg-white">
          <p className="text-xs text-gray-500 mb-1 font-medium">COS</p>
          <h3 className="text-base font-semibold text-[#111] mb-2 leading-tight">
            캐시미어 블렌드 터틀넥 니트
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl font-bold text-red-600">36%</span>
            <span className="text-xl font-bold text-[#111]">159,900원</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-500">❤️ 9.7만</span>
            <span className="text-orange-500">⭐ 4.8(4.5만+)</span>
          </div>
        </div>
      </Link>

    </div>

  </div>

</section>

{/* ===== NEW DROPS SECTION ===== */}
<section className="w-full py-20 bg-gray-50 overflow-hidden">
  
  {/* Header */}
  <div className="flex items-center justify-between px-6 mb-10 max-w-[1600px] mx-auto">
    <h2 className="text-3xl font-semibold tracking-wide text-[#111]">
      New Drops
    </h2>
    <a href="/new-drops" className="text-sm text-[#111] opacity-70 hover:opacity-100 transition">
      View All →
    </a>
  </div>

  {/* Auto-sliding carousel */}
  <div 
    id="newdrops-carousel"
    className="flex gap-6 whitespace-nowrap animate-scroll"
  >
    {/* First set of products */}
    {[
      { 
        img: "/newdrop-1.jpg", 
        brand: "ACNE STUDIOS",
        title: "오버사이즈 울 블렌드 코트", 
        discount: "30%",
        price: "489,900원",
        likes: "18만",
        rating: "4.9",
        reviews: "8.2만+",
        link: "/product/oversized-wool-coat"
      },
      { 
        img: "/newdrop-2.jpg", 
        brand: "AMI PARIS",
        title: "로고 크루넥 스웨터", 
        discount: "25%",
        price: "229,900원",
        likes: "12만",
        rating: "4.8",
        reviews: "5.6만+",
        link: "/product/logo-crewneck-sweater"
      },
      { 
        img: "/newdrop-3.jpg", 
        brand: "GANNI",
        title: "체크 울 미니 스커트", 
        discount: "28%",
        price: "189,900원",
        likes: "9.4만",
        rating: "4.7",
        reviews: "3.8만+",
        link: "/product/check-wool-mini-skirt"
      },
      { 
        img: "/newdrop-4.jpg", 
        brand: "STUSSY",
        title: "시그니처 후드 집업", 
        discount: "22%",
        price: "149,900원",
        likes: "14만",
        rating: "4.9",
        reviews: "7.1万+",
        link: "/product/signature-hood-zipup"
      },
      { 
        img: "/newdrop-5.jpg", 
        brand: "CARHARTT WIP",
        title: "더블니 팬츠", 
        discount: "20%",
        price: "129,900원",
        likes: "11만",
        rating: "4.8",
        reviews: "6.3만+",
        link: "/product/double-knee-pants"
      },
      { 
        img: "/newdrop-6.jpg", 
        brand: "MAISON KITSUNE",
        title: "폭스 패치 티셔츠", 
        discount: "18%",
        price: "89,900원",
        likes: "8.7만",
        rating: "4.7",
        reviews: "4.2만+",
        link: "/product/fox-patch-tshirt"
      },
      { 
        img: "/newdrop-7.jpg", 
        brand: "APC",
        title: "하프문 크로스백", 
        discount: "35%",
        price: "319,900원",
        likes: "13만",
        rating: "4.9",
        reviews: "5.9만+",
        link: "/product/halfmoon-crossbag"
      },
      { 
        img: "/newdrop-8.jpg", 
        brand: "LEMAIRE",
        title: "크롭 와이드 데님", 
        discount: "32%",
        price: "259,900원",
        likes: "10만",
        rating: "4.8",
        reviews: "4.7만+",
        link: "/product/crop-wide-denim"
      },
    ].map((item, i) => (
      <Link 
        key={i} 
        href={item.link}
        className="group relative bg-white overflow-hidden hover:shadow-lg transition-all duration-300 flex-shrink-0 w-[220px]"
      >
        {/* Heart Icon */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white transition-all"
        >
          <svg 
            className="w-4 h-4 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>

        {/* Product Image */}
        <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
          <img 
            src={item.img} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-3 bg-white">
          <p className="text-[10px] text-gray-500 mb-1 font-medium">{item.brand}</p>
          <h3 className="text-xs font-semibold text-[#111] mb-1.5 leading-tight line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className="text-sm font-bold text-red-600">{item.discount}</span>
            <span className="text-sm font-bold text-[#111]">{item.price}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-red-500">❤️ {item.likes}</span>
            <span className="text-orange-500">⭐ {item.rating}({item.reviews})</span>
          </div>
        </div>
      </Link>
    ))}

    {/* Duplicate set for infinite loop */}
    {[
      { 
        img: "/newdrop-1.jpg", 
        brand: "ACNE STUDIOS",
        title: "오버사이즈 울 블렌드 코트", 
        discount: "30%",
        price: "489,900원",
        likes: "18만",
        rating: "4.9",
        reviews: "8.2만+",
        link: "/product/oversized-wool-coat"
      },
      { 
        img: "/newdrop-2.jpg", 
        brand: "AMI PARIS",
        title: "로고 크루넥 스웨터", 
        discount: "25%",
        price: "229,900원",
        likes: "12만",
        rating: "4.8",
        reviews: "5.6만+",
        link: "/product/logo-crewneck-sweater"
      },
      { 
        img: "/newdrop-3.jpg", 
        brand: "GANNI",
        title: "체크 울 미니 스커트", 
        discount: "28%",
        price: "189,900원",
        likes: "9.4만",
        rating: "4.7",
        reviews: "3.8만+",
        link: "/product/check-wool-mini-skirt"
      },
      { 
        img: "/newdrop-4.jpg", 
        brand: "STUSSY",
        title: "시그니처 후드 집업", 
        discount: "22%",
        price: "149,900원",
        likes: "14만",
        rating: "4.9",
        reviews: "7.1万+",
        link: "/product/signature-hood-zipup"
      },
      { 
        img: "/newdrop-5.jpg", 
        brand: "CARHARTT WIP",
        title: "더블니 팬츠", 
        discount: "20%",
        price: "129,900원",
        likes: "11만",
        rating: "4.8",
        reviews: "6.3만+",
        link: "/product/double-knee-pants"
      },
      { 
        img: "/newdrop-6.jpg", 
        brand: "MAISON KITSUNE",
        title: "폭스 패치 티셔츠", 
        discount: "18%",
        price: "89,900원",
        likes: "8.7만",
        rating: "4.7",
        reviews: "4.2만+",
        link: "/product/fox-patch-tshirt"
      },
      { 
        img: "/newdrop-7.jpg", 
        brand: "APC",
        title: "하프문 크로스백", 
        discount: "35%",
        price: "319,900원",
        likes: "13만",
        rating: "4.9",
        reviews: "5.9만+",
        link: "/product/halfmoon-crossbag"
      },
      { 
        img: "/newdrop-8.jpg", 
        brand: "LEMAIRE",
        title: "크롭 와이드 데님", 
        discount: "32%",
        price: "259,900원",
        likes: "10만",
        rating: "4.8",
        reviews: "4.7만+",
        link: "/product/crop-wide-denim"
      },
    ].map((item, i) => (
      <Link 
        key={`dup-${i}`} 
        href={item.link}
        className="group relative bg-white overflow-hidden hover:shadow-lg transition-all duration-300 flex-shrink-0 w-[220px]"
      >
        {/* Heart Icon */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white transition-all"
        >
          <svg 
            className="w-4 h-4 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>

        {/* Product Image */}
        <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
          <img 
            src={item.img} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-3 bg-white">
          <p className="text-[10px] text-gray-500 mb-1 font-medium">{item.brand}</p>
          <h3 className="text-xs font-semibold text-[#111] mb-1.5 leading-tight line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className="text-sm font-bold text-red-600">{item.discount}</span>
            <span className="text-sm font-bold text-[#111]">{item.price}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-red-500">❤️ {item.likes}</span>
            <span className="text-orange-500">⭐ {item.rating}({item.reviews})</span>
          </div>
        </div>
      </Link>
    ))}

  </div>

  {/* Auto-scroll script */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        const carousel = document.getElementById("newdrops-carousel");
        let scrollPos = 0;
        const speed = 0.8;

        function autoScroll() {
          if (!carousel) return;
          scrollPos += speed;
          
          if (scrollPos >= carousel.scrollWidth / 2) {
            scrollPos = 0;
          }
          
          carousel.scrollLeft = scrollPos;
          requestAnimationFrame(autoScroll);
        }

        requestAnimationFrame(autoScroll);
      `,
    }}
  />

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


{/* ===== PEOPLE FEED SECTION ===== */}
<section id="people-feed" className="w-full py-24 bg-white border-t border-gray-200">

  {/* HEADER */}
  <div className="flex items-center justify-between px-6 mb-12 max-w-[1600px] mx-auto">
    <h2 className="text-3xl font-semibold tracking-wide text-[#111]">
      Feed
    </h2>

    <a href="/feed" className="text-sm text-[#111] opacity-70 hover:opacity-100 transition">
      View All →
    </a>
  </div>

  {/* GRID FEED */}
  <div className="px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">

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
        className="relative w-full h-[260px] md:h-[300px] rounded-2xl overflow-hidden bg-gray-100 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group"
      >
        <img
          src={src}
          alt={`Feed post ${i + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

        {/* Username overlay */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
          @user{i + 1}
        </div>
      </div>
    ))}

  </div>
</section>



    </main>
  );
}