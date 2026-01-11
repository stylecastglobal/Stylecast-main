"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type WishlistSummary = {
  id: string;
  title: string;
  count: number;
};

const STORAGE_KEY = "stylecast:wishlists";

const readWishlistsFromStorage = (): WishlistSummary[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map(
      (wishlist: { id: string; title: string; items?: unknown[] }) => ({
        id: wishlist.id,
        title: wishlist.title ?? "Wishlist",
        count: Array.isArray(wishlist.items) ? wishlist.items.length : 0,
      })
    );
  } catch (error) {
    console.error("Failed to read wishlists from storage", error);
    return [];
  }
};

export default function WishesPage() {
  const [wishlists, setWishlists] = useState<WishlistSummary[]>([]);

  useEffect(() => {
    const load = () => setWishlists(readWishlistsFromStorage());

    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  return (
    <section className="min-h-screen w-full bg-white pt-32 px-6 md:px-12 lg:px-20 text-[#111]">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Wishes
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Curate, organize, and share your style inspiration.
          </p>
        </div>

        {/* TOP–RIGHT ACTION BUTTON */}
        <Link
          href="/Wishes/new"
          className="border border-black px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-all"
        >
          Make a Wishlist
        </Link>
      </div>

      {/* WISHLISTS */}
      {wishlists.length === 0 ? (
        <div className="w-full py-16 text-center mb-16">
          <p className="text-lg text-gray-500">
            You don&apos;t have any wishlists yet.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Start saving your favorite looks and ideas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          {wishlists.map((list) => (
            <Link
              href={`/Wishes/${list.id}`}
              key={list.id}
              className="group border border-gray-200 rounded-2xl p-6 transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-medium mb-2">{list.title}</h3>
              <p className="text-gray-500 text-sm">{list.count} items</p>
              <div className="mt-6 text-sm text-black opacity-70 group-hover:underline">
                View →
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* GIFT RECOMMENDATIONS */}
      <div className="mt-4 mb-6 flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-medium">Gift Recommendations</h2>
        <Link
          href="#"
          className="text-sm text-gray-600 hover:text-black transition"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {/* MEN */}
        <Link
          href="/Wishes/men"
          className="group rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer"
        >
          <div className="relative w-full h-72 bg-gray-100 overflow-hidden">
            <img
              src="/gift-men.jpg"
              alt="Men Gift"
              className="w-full h-full object-cover transition-all group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <h3 className="font-medium text-lg tracking-tight">Men</h3>
            <p className="text-gray-500 text-sm mt-1">
              Gift ideas curated for him.
            </p>
          </div>
        </Link>

        {/* WOMEN */}
        <Link
          href="/Wishes/women"
          className="group rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer"
        >
          <div className="relative w-full h-72 bg-gray-100 overflow-hidden">
            <img
              src="/gift-women.jpg"
              alt="Women Gift"
              className="w-full h-full object-cover transition-all group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <h3 className="font-medium text-lg tracking-tight">Women</h3>
            <p className="text-gray-500 text-sm mt-1">
              Beautiful picks curated for her.
            </p>
          </div>
        </Link>

        {/* KIDS */}
        <Link
          href="/Wishes/kids"
          className="group rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer"
        >
          <div className="relative w-full h-72 bg-gray-100 overflow-hidden">
            <img
              src="/gift-kids.jpg"
              alt="Kids Gift"
              className="w-full h-full object-cover transition-all group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <h3 className="font-medium text-lg tracking-tight">Kids</h3>
            <p className="text-gray-500 text-sm mt-1">
              Fun, playful gifts for little ones.
            </p>
          </div>
        </Link>

        {/* ELDERS */}
        <Link
          href="/Wishes/elders"
          className="group rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer"
        >
          <div className="relative w-full h-72 bg-gray-100 overflow-hidden">
            <img
              src="/gift-elder.jpg"
              alt="Elders Gift"
              className="w-full h-full object-cover transition-all group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <h3 className="font-medium text-lg tracking-tight">Elders</h3>
            <p className="text-gray-500 text-sm mt-1">
              Thoughtful items for older adults.
            </p>
          </div>
        </Link>
      </div>

      {/* GIFT CATEGORIES */}
      <div className="mt-6 mb-8">
        <h2 className="text-xl md:text-2xl font-medium mb-4">
          Gift Categories
        </h2>
        <p className="text-gray-500 text-sm md:text-base mb-10">
          Curated recommendations for every interest and personality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
        {[
          [
            "Electronics / Tech Gadgets",
            "Headphones, smart watches, gaming consoles, tablets.",
            "Best Buy",
          ],
          [
            "Clothing & Fashion Accessories",
            "Apparel, outerwear, hoodies, shoes, bags.",
            "",
          ],
          [
            "Jewellery & Watches",
            "Fine jewellery, fashion jewellery, luxury watches.",
            "Oprah Daily",
          ],
          [
            "Luxury / Premium Brands",
            "Designer bags, premium shoes, luxury skincare, iconic accessories.",
            "Vogue",
          ],
          [
            "Home & Lifestyle / Home Décor",
            "Home décor, kitchen appliances, cozy essentials, modern furnishings.",
            "Good Housekeeping",
          ],
          [
            "Beauty & Personal Care",
            "Skincare, fragrances, wellness tools, cosmetic sets.",
            "Oprah Daily",
          ],
          [
            "Sports, Fitness & Outdoor Gear",
            "Workout essentials, outdoor gear, sports equipment.",
            "Best Products",
          ],
          [
            "Books, Media & Hobby Items",
            "Books, music, board games, hobby kits, DIY supplies.",
            "Amazon",
          ],
          [
            "Kids & Baby / Family Gifts",
            "Toys, baby gear, games for kids, family activity gifts.",
            "",
          ],
          [
            "Experience & Sentimental Gifts",
            "Travel vouchers, workshops, personalized items, memberships.",
            "",
          ],
        ].map(([title, desc, source]) => (
          <div
            key={title}
            className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{desc}</p>
            {source && <p className="text-xs text-gray-400 mt-3">{source}</p>}
          </div>
        ))}
      </div>

      <div className="h-12" />
    </section>
  );
}
