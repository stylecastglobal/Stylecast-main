"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LookCarousel, { LookItem } from "../components/LookCarousel";

export default function ShopPage() {
  // ======= PAGE STATE ======= //
  const [gender, setGender] = useState<"men" | "women">("men");
  const [budget, setBudget] = useState(500);

  // ======= CURATED LOOKS (MEN) ======= //
  const menLooks: LookItem[] = [
    {
      id: 1,
      image: "/women-printer-1.jpg",
      price: "$688.99",
      tags: ["Casual", "CollegeLook", "WinterOutfit"],
      coat: "Zara",
      top: "Aritzia",
      bottom: "Zara",
      shoes: "Adidas",
      jewelry: "Swarovski",
    },
    {
      id: 2,
      image: "/women-grid-1.jpg",
      price: "$688.99",
      tags: ["Casual", "CollegeLook"],
      coat: "Zara",
      top: "Aritzia",
      bottom: "Zara",
      shoes: "Adidas",
      jewelry: "Swarovski",
    },
    {
      id: 3,
      image: "/women-grid-4.jpg",
      price: "$688.99",
      tags: ["WinterStyle", "SoftMinimal"],
      coat: "Zara",
      top: "Aritzia",
      bottom: "Zara",
      shoes: "Adidas",
      jewelry: "Swarovski",
    },
    {
      id: 4,
      image: "/women-grid-5.jpg",
      price: "$688.99",
      tags: ["StreetWear", "CollegeLook"],
      coat: "Zara",
      top: "Aritzia",
      bottom: "Zara",
      shoes: "Adidas",
      jewelry: "Swarovski",
    },
    {
      id: 5,
      image: "/women-grid-3.jpg",
      price: "$688.99",
      tags: ["Minimal", "LayeredLook"],
      coat: "Zara",
      top: "Aritzia",
      bottom: "Zara",
      shoes: "Adidas",
      jewelry: "Swarovski",
    },
    {
      id: 6,
      image: "/apparel6.jpg",
      price: "$688.99",
      tags: ["KoreanLook", "DailyOutfit"],
      coat: "Zara",
      top: "Aritzia",
      bottom: "Zara",
      shoes: "Adidas",
      jewelry: "Swarovski",
    },
  ];

  // ======= CURATED LOOKS (WOMEN) ======= //
  const womenLooks: LookItem[] = [
    {
      id: 7,
      image: "/look-w1.png",
      price: "$512.00",
      tags: ["SoftGirl", "StreetStyle"],
      coat: "Aritzia",
      top: "Brandy",
      bottom: "Zara",
      shoes: "New Balance",
      jewelry: "Tiffany",
    },
    {
      id: 8,
      image: "/look-w2.png",
      price: "$498.00",
      tags: ["Minimal", "KoreanLook"],
      coat: "Musinsa",
      top: "Aritzia",
      bottom: "Uniqlo",
      shoes: "Adidas",
      jewelry: "Noon Jewelry",
    },
    {
      id: 9,
      image: "/look-w1.png",
      price: "$512.00",
      tags: ["ChicLook", "Monochrome"],
      coat: "Aritzia",
      top: "Brandy",
      bottom: "Zara",
      shoes: "New Balance",
      jewelry: "Tiffany",
    },
    {
      id: 10,
      image: "/look-w2.png",
      price: "$498.00",
      tags: ["WinterDateLook", "MinimalFit"],
      coat: "Musinsa",
      top: "Aritzia",
      bottom: "Uniqlo",
      shoes: "Adidas",
      jewelry: "Noon Jewelry",
    },
    {
      id: 11,
      image: "/look-w1.png",
      price: "$512.00",
      tags: ["K-Fashion", "SoftMinimal"],
      coat: "Aritzia",
      top: "Brandy",
      bottom: "Zara",
      shoes: "New Balance",
      jewelry: "Tiffany",
    },
    {
      id: 12,
      image: "/look-w2.png",
      price: "$498.00",
      tags: ["CleanLook", "WarmStyle"],
      coat: "Musinsa",
      top: "Aritzia",
      bottom: "Uniqlo",
      shoes: "Adidas",
      jewelry: "Noon Jewelry",
    },
  ];

  const curatedLooks = gender === "men" ? menLooks : womenLooks;

  // ======= DUMMY "AI" LOOKS 생성 (지금은 프론트에서만) ======= //
  const makeAiLooks = (baseLooks: LookItem[], budgetValue: number): LookItem[] => {
    const clamped = Math.max(50, Math.min(budgetValue, 99999));
    return Array.from({ length: 5 }).map((_, idx) => {
      const base = baseLooks[idx % baseLooks.length];
      const priceStr = `$${clamped.toLocaleString()}`;
      return {
        ...base,
        id: 1000 + idx, // AI룩은 id대역 따로
        price: priceStr,
        tags: ["AIStyled", ...base.tags],
      };
    });
  };

  // 지금은 AI 대신 더미 데이터 사용
  // 나중에 실제 AI API 붙일 때는 여기서 fetch 호출로 교체하면 됨.
  // ex) const aiLooks = await fetch("/api/generateOutfits", { ... })
  const aiLooks = makeAiLooks(curatedLooks, budget);

  // 캐러셀에 보여줄 전체 룩 (curated + "AI")
  const allLooks = [...curatedLooks, ...aiLooks];

  // ======= NEW DROPS DATA ======= //
  const newDropsMen = [
    {
      id: 1,
      title: "Wool Blend Coat",
      img: "/drop-1.jpg",
      price: 89900,
      sale: 20,
      likes: 728,
      reviews: 1240,
      rating: 5.0,
    },
    {
      id: 2,
      title: "Minimal Grey Coat",
      img: "/drop-2.jpg",
      price: 120000,
      sale: 28,
      likes: 512,
      reviews: 890,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Classic Wool Coat",
      img: "/drop-3.jpg",
      price: 159900,
      sale: 20,
      likes: 319,
      reviews: 620,
      rating: 4.8,
    },
  ];

  const newDropsWomen = [
    {
      id: 6,
      title: "Soft Beige Coat",
      img: "/drop-6.jpg",
      price: 129000,
      sale: 30,
      likes: 980,
      reviews: 2200,
      rating: 5.0,
    },
    {
      id: 7,
      title: "Premium Long Coat",
      img: "/drop-7.jpg",
      price: 168000,
      sale: 25,
      likes: 600,
      reviews: 1300,
      rating: 4.9,
    },
    {
      id: 8,
      title: "Winter Warm Coat",
      img: "/drop-8.jpg",
      price: 149000,
      sale: 18,
      likes: 441,
      reviews: 860,
      rating: 4.7,
    },
  ];

  const activeDrops = gender === "men" ? newDropsMen : newDropsWomen;

  // New Drops 위시리스트 상태
  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section className="min-h-screen w-full bg-white pt-32 px-6 md:px-12 lg:px-20 text-[#111]">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-10">
        Apparel
      </h1>

      {/* Style by Occasion */}
      <h2 className="text-xl font-semibold mb-4">Style by Occasion</h2>

      <div className="flex flex-wrap gap-4 mb-10">
        {[
          "Office Outfits",
          "College Look",
          "Date Look",
          "Night-Out Look",
          "Vacation Look",
        ].map((label) => (
          <button
            key={label}
            className="px-6 py-2 border rounded-full text-sm hover:bg-black hover:text-white transition"
          >
            #{label}
          </button>
        ))}

        {/* Gender Filter */}
        <div className="flex ml-auto gap-3">
          <button
            onClick={() => setGender("men")}
            className={`px-5 py-2 border rounded-full transition ${
              gender === "men" ? "bg-black text-white" : ""
            }`}
          >
            Men
          </button>

          <button
            onClick={() => setGender("women")}
            className={`px-5 py-2 border rounded-full transition ${
              gender === "women" ? "bg-black text-white" : ""
            }`}
          >
            Women
          </button>
        </div>
      </div>

      {/* Build Your Look */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Build Your Look</h2>
        <Link href="#" className="text-sm underline">
          Explore More &gt;
        </Link>
      </div>

      <p className="text-gray-500 text-sm mb-4">
        Select your budget and discover a curated outfit made for you.
      </p>

      {/* Budget Slider */}
      <input
        type="range"
        min="50"
        max="99999"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        className="w-full accent-black mb-3"
      />

      <p className="text-right text-sm text-gray-600 mb-6 font-medium">
        Selected Budget:{" "}
        <span className="font-semibold">${budget.toLocaleString()}</span>
      </p>

      {/* Carousel (curated + dummy AI looks) */}
      <LookCarousel items={allLooks} />

      {/* New Drops */}
      <div className="flex items-center justify-between mt-16 mb-6">
        <h2 className="text-xl font-semibold">New Drops</h2>
        <Link href="#" className="text-sm underline">
          Explore More &gt;
        </Link>
      </div>

      {/* New Drops Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {activeDrops.map((item) => (
          <div key={item.id} className="cursor-pointer">
            <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover"
              />

              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(item.id)}
                className="absolute top-2 right-2 text-xl"
              >
                {wishlist.includes(item.id) ? "❤️" : "♡"}
              </button>
            </div>

            <p className="text-sm mt-3 font-medium">{item.title}</p>

            <p className="text-[13px] text-black font-semibold mt-1">
              ₩{item.price.toLocaleString()}
            </p>

            <p className="text-[12px] text-red-600 mt-0.5">
              {item.sale}% off
            </p>

            <div className="flex items-center gap-3 mt-1">
              <span className="text-[12px] text-gray-600">❤️ {item.likes}</span>
              <span className="text-[12px] text-gray-600">
                ⭐ {item.reviews.toLocaleString()} ({item.rating})
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
