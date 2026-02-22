"use client";

import { useState } from "react";
import Link from "next/link";
import { celebOutfits, type CelebOutfit, type CelebCategory } from "./celebData";

export default function CelebPage() {
  const [activeCategory, setActiveCategory] = useState<
    "All" | CelebCategory | "New" | "Trending"
  >("All");
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(celebOutfits.map((o) => [o.id, 0]))
  );
  const [likedById, setLikedById] = useState<Record<number, boolean>>(
    Object.fromEntries(celebOutfits.map((o) => [o.id, false]))
  );
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>(
    Object.fromEntries(celebOutfits.map((o) => [o.id, 0]))
  );

  const filtered = celebOutfits.filter((outfit) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "New" || activeCategory === "Trending")
      return true;
    return outfit.category === activeCategory;
  });

  return (
    <main className="min-h-screen bg-white text-[#111]">
      {/* Filter bar + Add button */}
      <section className="px-6 sm:px-10 lg:px-14 pt-10 pb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
            {["All", "Women", "Men", "New", "Trending"].map((label) => (
              <button
                key={label}
                onClick={() =>
                  setActiveCategory(
                    label as "All" | CelebCategory | "New" | "Trending"
                  )
                }
                className={`pb-1 border-b-2 transition-colors ${
                  activeCategory === label
                    ? "border-black text-black"
                    : "border-transparent hover:border-black"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="h-11 w-11 rounded-md bg-black text-white text-2xl leading-none flex items-center justify-center hover:bg-gray-900 transition-colors"
            aria-label="Add post"
          >
            +
          </button>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="px-6 sm:px-10 lg:px-14 pb-20">
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2 [column-fill:_balance]">
          {filtered.map((outfit) => (
            <CelebCard
              key={outfit.id}
              outfit={outfit}
              likeCount={likeCounts[outfit.id] ?? 0}
              commentCount={commentCounts[outfit.id] ?? 0}
              isLiked={likedById[outfit.id] ?? false}
              onLike={() => {
                const next = !likedById[outfit.id];
                setLikedById((p) => ({ ...p, [outfit.id]: next }));
                setLikeCounts((c) => ({
                  ...c,
                  [outfit.id]: Math.max(0, (c[outfit.id] ?? 0) + (next ? 1 : -1)),
                }));
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function CelebCard({
  outfit,
  likeCount,
  commentCount,
  isLiked,
  onLike,
}: {
  outfit: CelebOutfit;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  onLike: () => void;
}) {
  return (
    <article className="group relative break-inside-avoid bg-white p-1">
      <div className="relative w-full overflow-hidden">
        <img
          src={outfit.image}
          alt={outfit.celebrity}
          width={outfit.width ?? 320}
          height={outfit.height ?? 400}
          loading="lazy"
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Celeb + brands list on hover */}
        <div className="absolute left-3 right-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-xs font-semibold text-white mb-2">
            {outfit.celebrity}
            {outfit.context && <span className="font-normal text-white/90"> · {outfit.context}</span>}
          </p>
          {outfit.brands.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {outfit.brands.map((brand) => (
                <li key={brand.slug}>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="text-[11px] text-white/95 hover:text-white hover:underline border border-white/40 px-2 py-0.5 rounded-sm transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Source pill - bottom left */}
        <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
          {outfit.source ?? `@${outfit.celebrity.toLowerCase().replace(/\s/g, "")}`}
        </div>
        {/* Like & comment - bottom right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-3 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-gray-900 shadow-sm">
          <button
            type="button"
            onClick={onLike}
            className="flex items-center gap-1.5 hover:text-black"
            aria-label="Like"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z" />
            </svg>
            <span>{likeCount}</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 hover:text-black"
            aria-label="Comments"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 15a3 3 0 0 1-3 3H8l-5 3V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z" />
            </svg>
            <span>{commentCount}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
