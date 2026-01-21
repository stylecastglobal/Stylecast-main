"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandCard from "@/app/brands/components/BrandCard";
import FilterBar from "@/app/brands/components/FilterBar";

// Brand data
const brands = [
  {
    id: 1,
    name: "Aimé Leon Dore",
    discount: "",
    badge: "TOP RATED",
    favorites: "111K",
    image: "/aimeleondore-brandcard.jpg",
    slug: "aimeleondore",
  },
  {
    id: 2,
    name: "GLOWNY",
    discount: "",
    badge: null,
    favorites: "9K",
    image: "/glowny-brandcard.jpg",
    slug: "glowny",
  },
  {
    id: 3,
    name: "ME+EM",
    discount: "",
    badge: null,
    favorites: "13K",
    image: "/meem-brandcard.jpg",
    slug: "eessay",
  },
  {
    id: 4,
    name: "Scuffers",
    discount: "",
    badge: "9,999+ REVIEWS",
    favorites: "133K",
    image: "/scuffers-brandcard.jpg",
    slug: "wooalong",
  },
  {
    id: 5,
    name: "WOOALONG",
    discount: "",
    badge: "TOP RATED",
    favorites: "96K",
    image: "/wooalong-brandcard.jpg",
    slug: "ourdayz",
  },
  {
    id: 6,
    name: "SCULPTOR",
    discount: "",
    badge: "TOP RATED",
    favorites: "134K",
    image: "/sculptor-brandcard.jpg",
    slug: "ason",
  },
  {
    id: 7,
    name: "CRANK",
    discount: "",
    badge: "TRENDING",
    favorites: "245K",
    image: "/crank-brandcard.jpg",
    slug: "adererror",
  },
  {
    id: 8,
    name: "cold culture",
    discount: "",
    badge: "TOP RATED",
    favorites: "189K",
    image: "/coldculture-brandcard.jpg",
    slug: "thisisneverthat",
  },
  {
    id: 9,
    name: "Matin Kim",
    discount: "",
    badge: null,
    favorites: "78K",
    image: "/matinkim-brandcard.jpg",
    slug: "margesherwood",
  },
  {
    id: 10,
    name: "INSILENCE",
    discount: "",
    badge: "HOT",
    favorites: "267K",
    image: "/insilence-brandcard.jpg",
    slug: "anderssonbell",
  },
  {
    id: 11,
    name: "MAHAGRID",
    discount: "",
    badge: "RISING",
    favorites: "92K",
    image: "/mahagrid-brandcard.jpg",
    slug: "mahagrid",
  },
  {
    id: 12,
    name: "ANDERSSON BELL",
    discount: "",
    badge: null,
    favorites: "54K",
    image: "/andersonbell-brandcard.jpg",
    slug: "liful",
  },
];


export default function BrandsPage() {
  const [selectedTab, setSelectedTab] = useState("New Drops");
  const [isExclusiveChecked, setIsExclusiveChecked] = useState(false);

  const tabs = [
    "New-In",
    "HIGHLIGHT",
    "TRENDING",
    "RISING",
    "BEAUTY",
    "A-Z",
  ];

  return (
    <div className="min-h-screen bg-white pt-28">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              tab === "A-Z" ? (
                <Link
                  key={tab}
                  href="/brands/az"
                  className="py-4 px-1 whitespace-nowrap text-sm transition-colors relative text-gray-500 hover:text-gray-800"
                >
                  {tab}
                </Link>
              ) : (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 px-1 whitespace-nowrap text-sm transition-colors relative ${
                    selectedTab === tab
                      ? "text-black font-semibold"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                  {selectedTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                  )}
                </button>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        isExclusiveChecked={isExclusiveChecked}
        setIsExclusiveChecked={setIsExclusiveChecked}
      />

      {/* Brand Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}