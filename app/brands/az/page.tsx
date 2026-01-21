"use client";

import { useState } from "react";
import Link from "next/link";

// Sample brand data - you'll replace with your actual brands
const allBrands = [
  "A BIT MOR", "A BY A", "A COLD WALL", "A FEW COMMENTS", "A NOTHING", "A-MARKET",
  "A.P.C.", "A.R.U", "A.THER", "AAKAM", "AAMBITION", "AARAN", "ABEEHUMS",
  "ABON", "ACCEPTANCELETTERSTUDIO", "ACCINE", "ACEI", "ACEUMDU", "ACHA",
  "ACHIC", "ACLEON", "ACMER", "acmé de la vie", "ACNE STUDIOS", "ACOC",
  "ACOVER", "ACSHI", "ACUD", "ACWELL", "AD HOC", "ADAUL", "ADDIBLE",
  "ADDOFF", "ADDSLOW", "ADLIELOS", "ADOREBELLE", "AEAE", "AECA WHITE",
  "AEDITEM", "AEGO FREEDOM LAB", "AEIAEIAE", "AEXEA", "AFIFI", "AFLAF",
  "AFOYE", "AFRESH", "AFRISOLUTION"
];

export default function AZBrandsPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("A");

  const categories = ["ALL", "FASHION", "BEAUTY"];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("");

  // Filter brands by search and letter
  const filteredBrands = allBrands.filter((brand) => {
    const matchesSearch = brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLetter = selectedLetter === "ALL" || brand.startsWith(selectedLetter);
    return matchesSearch && matchesLetter;
  });

  // Group brands by first letter
  const groupedBrands: Record<string, string[]> = {};
  filteredBrands.forEach((brand) => {
    const firstLetter = brand[0].toUpperCase();
    if (!groupedBrands[firstLetter]) {
      groupedBrands[firstLetter] = [];
    }
    groupedBrands[firstLetter].push(brand);
  });

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-8 overflow-x-auto">
            {[
              "New-In",
              "HIGHLIGHT",
              "TRENDING",
              "RISING",
              "BEAUTY",
              "A-Z",
            ].map((tab) => (
              <Link
                key={tab}
                href={tab === "A-Z" ? "/brands/az" : "/brands"}
                className={`py-4 px-1 whitespace-nowrap text-sm transition-colors relative ${
                  tab === "A-Z"
                    ? "text-black font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
                {tab === "A-Z" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-12">
          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-black">ALL</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors text-black ${
                      selectedCategory === cat
                        ? "bg-gray-100 font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Brands"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black text-black placeholder:text-gray-400"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Alphabet Filter */}
            <div className="grid grid-cols-5 gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                    selectedLetter === letter
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-black"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Brand List */}
          <div className="flex-1">
            {Object.keys(groupedBrands)
              .sort()
              .map((letter) => (
                <div key={letter} className="mb-12">
                  <h2 className="text-4xl font-bold mb-6 text-black">{letter}</h2>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    {groupedBrands[letter].map((brand) => (
                      <Link
                        key={brand}
                        href={`/brand/${brand.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center gap-3 group"
                      >
                        <button className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black transition-colors">
                          <svg
                            className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                        <span className="text-base hover:underline text-black font-medium">{brand}</span>
                        {brand === "ADDSLOW" && (
                          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-black font-semibold">
                            New
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}