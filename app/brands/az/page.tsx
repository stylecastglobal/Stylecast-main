"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { brands } from "../brandsData";

const LETTERS = [
  "A","B","C","D","E","F","G",
  "H","I","J","K","L","M","N",
  "O","P","Q","R","S","T","U",
  "V","W","X","Y","Z","#",
];

export default function BrandsAZPage() {
  const [activeCategory, setActiveCategory] = useState<
    "ALL" | "FASHION" | "BEAUTY" | "FEATURED"
  >("ALL");

  const grouped = useMemo(() => {
    const map: Record<string, typeof brands> = {};
    brands.forEach((brand) => {
      const firstChar = brand.name[0].toUpperCase();
      const letter = /[A-Z]/.test(firstChar) ? firstChar : "#";
      if (!map[letter]) map[letter] = [];
      map[letter].push(brand);
    });

    Object.keys(map).forEach((k) =>
      map[k].sort((a, b) => a.name.localeCompare(b.name))
    );

    return map;
  }, []);

  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-[240px_1fr] gap-16">

        {/* LEFT SIDEBAR */}
        <aside className="space-y-10">
          {/* CATEGORY */}
          <div className="space-y-4 text-sm">
            {["ALL", "FASHION", "BEAUTY", "FEATURED"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`block text-left ${
                  activeCategory === cat
                    ? "font-semibold text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div>
            <input
              placeholder="Search Brands"
              className="w-full border px-4 py-2 text-sm rounded-md"
            />
          </div>

          {/* LETTER INDEX */}
          <div className="grid grid-cols-7 gap-y-3 text-sm text-gray-700">
            {LETTERS.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="hover:text-black"
              >
                {l}
              </a>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="space-y-20">
          {LETTERS.map((letter) =>
            grouped[letter] ? (
              <section key={letter} id={`letter-${letter}`}>
                <h2 className="text-xl font-semibold mb-6">
                  {letter}
                </h2>

                <div className="grid grid-cols-2 gap-x-20 gap-y-3">
                  {grouped[letter].map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/brand-detail/${brand.slug}`}
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-black"
                    >
                      <span className="text-gray-400">♡</span>
                      <span>{brand.name}</span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null
          )}
        </main>
      </div>
    </div>
  );
}
