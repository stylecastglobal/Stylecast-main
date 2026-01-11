"use client";

import { useEffect, useMemo, useState } from "react";

export type GiftItem = {
  id: number;
  image: string;
  brand: string;
  name: string;
  price: number;
  url: string;
};

type Props = {
  title: string;
  subtitle: string;
  items: GiftItem[];
};

export default function GiftGrid({ title, subtitle, items }: Props) {
  const [sortOrder, setSortOrder] = useState<"lowest" | "highest">("lowest");
  const [maxPrice, setMaxPrice] = useState<number>(9999999);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 가격 슬라이더의 최대값 = 아이템 중 가장 비싼 가격 기준
  const sliderMax = useMemo(() => {
    if (!items.length) return 500000;
    const max = Math.max(...items.map((i) => i.price));
    return Math.ceil(max / 50000) * 50000; // 5만원 단위 올림
  }, [items]);

  useEffect(() => {
    setMaxPrice(sliderMax);
  }, [sliderMax]);

  // 정렬 + 필터 적용된 리스트
  const processedItems = useMemo(() => {
    return [...items]
      .filter((item) => item.price <= maxPrice)
      .sort((a, b) =>
        sortOrder === "lowest" ? a.price - b.price : b.price - a.price
      )
      .slice(0, visibleCount);
  }, [items, maxPrice, sortOrder, visibleCount]);

  // 스크롤 시 더 로드
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 300
      ) {
        setVisibleCount((prev) => prev + 12);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="min-h-screen w-full bg-white pt-32 px-6 md:px-12 lg:px-20 text-[#111]">
      {/* HEADER ROW */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111]">
            {title}
          </h1>
          <p className="text-gray-600 text-sm md:text-base mt-2">
            {subtitle}
          </p>
        </div>

        {/* SORT / FILTER PILL BUTTONS */}
        <div className="flex items-center gap-3 relative">
          {/* SORT BY */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsSortOpen((prev) => !prev);
                setIsFilterOpen(false);
              }}
              className="rounded-full border border-gray-300 px-5 py-2 text-sm bg-white hover:border-black transition-all"
            >
              Sort by
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-gray-200 bg-white shadow-lg text-sm z-20">
                <button
                  type="button"
                  onClick={() => {
                    setSortOrder("lowest");
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-t-2xl hover:bg-gray-50 ${
                    sortOrder === "lowest" ? "font-semibold text-[#111]" : ""
                  }`}
                >
                  Lowest price
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSortOrder("highest");
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-b-2xl hover:bg-gray-50 ${
                    sortOrder === "highest" ? "font-semibold text-[#111]" : ""
                  }`}
                >
                  Highest price
                </button>
              </div>
            )}
          </div>

          {/* FILTER (PRICE BAR) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsFilterOpen((prev) => !prev);
                setIsSortOpen(false);
              }}
              className="rounded-full border border-gray-300 px-5 py-2 text-sm bg-white hover:border-black transition-all"
            >
              Filter
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-200 bg-white shadow-lg p-4 text-sm z-20">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-400 mb-2">
                  Price
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={sliderMax}
                    step={1000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-600 whitespace-nowrap">
                    ≤ ₩{maxPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {processedItems.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all"
          >
            <div className="w-full aspect-[4/5] overflow-hidden bg-gray-50">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-all group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">
                {item.brand}
              </p>
              <p className="text-sm font-medium text-[#111] mt-1 line-clamp-2">
                {item.name}
              </p>
              <p className="text-base font-semibold mt-2 text-[#111]">
                ₩{item.price.toLocaleString()}
              </p>

              <p className="text-sm mt-3 underline text-gray-600 group-hover:text-[#111]">
                View Product →
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="h-20" />
    </section>
  );
}