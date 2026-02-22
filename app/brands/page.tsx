"use client";

import { useState } from "react";
import { brands } from '@/app/data/brandsData';
import BrandCard from './components/BrandCard';

const TABS = ["All", "Apparel", "Beauty", "Trending", "A-Z"] as const;

export default function BrandsPage() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredBrands = (() => {
    if (activeTab === "All") return brands;
    if (activeTab === "Trending") return brands.filter(b => b.trending);
    if (activeTab === "A-Z") return [...brands].sort((a, b) => a.name.localeCompare(b.name));
    return brands.filter(b => b.category.includes(activeTab));
  })();

  return (
    <div className="w-full">
      {/* FILTER BAR */}
      <section className="max-w-[1400px] mx-auto px-6 pt-8 pb-4">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-8">
            {TABS.map((label) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`text-sm transition-colors ${
                  activeTab === label
                    ? "text-black font-semibold border-b-2 border-black pb-[15px] -mb-[17px]"
                    : "text-neutral-400 hover:text-black"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-neutral-500 hover:text-black transition-colors">
              All ▾
            </button>
            <button className="text-sm text-neutral-500 hover:text-black transition-colors">
              Style ▾
            </button>
          </div>
        </div>
      </section>

      {/* BRAND GRID */}
      <section className="max-w-[1400px] mx-auto px-6 pb-12 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>
    </div>
  );
}