"use client";

import { useState } from "react";

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Graduation",
  "Christmas",
  "Wedding",
  "House-warming",
  "Appreciation",
  "Travel Packing List",
  "Fall Style Wishlist",
  "Trip Outfits",
  "Custom",
];

const STORAGE_KEY = "stylecast:wishlists";

type StoredWishlist = {
  id: string;
  title: string;
  items: unknown[];
};

const readWishlists = (): StoredWishlist[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to read wishlists", error);
    return [];
  }
};

const writeWishlists = (data: StoredWishlist[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default function NewWishlistPage() {
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [name, setName] = useState("");

  const isCustom = selectedOccasion === "Custom";

  const handleSelect = (value: string) => {
    setSelectedOccasion(value);
    setName(value === "Custom" ? "" : value);
  };

  const handleCreate = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const id = crypto.randomUUID();
    const wishlists = readWishlists();

    const payload: StoredWishlist = {
      id,
      title: trimmedName,
      items: [],
    };

    writeWishlists([...wishlists, payload]);
    window.location.href = `/Wishes/${id}?title=${encodeURIComponent(
      trimmedName
    )}`;
  };

  const canCreate = Boolean(name.trim());

  return (
    <section className="min-h-screen w-full bg-white pt-32 px-6 md:px-12 lg:px-20 text-[#111]">
      <div className="max-w-4xl">
        {/* HEADER */}
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
          New wishlist
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
          Create a wishlist
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-8 max-w-2xl">
          Choose an occasion or create your own. You&apos;ll be able to add
          products, images, prices, and purchase links on the next screen.
        </p>

        {/* OCCASION SELECTOR */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {OCCASIONS.map((occasion) => {
            const isActive = selectedOccasion === occasion;
            return (
              <button
                key={occasion}
                type="button"
                onClick={() => handleSelect(occasion)}
                className={`rounded-2xl border px-4 py-3 text-sm text-left transition-all ${
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white hover:border-black/60"
                }`}
              >
                {occasion === "Custom" ? "Custom name" : occasion}
              </button>
            );
          })}
        </div>

        {/* NAME INPUT + CREATE BUTTON */}
        {selectedOccasion && (
          <div className="border-t border-gray-100 pt-8 mt-4 max-w-xl">
            <label className="flex flex-col text-sm font-medium text-gray-700">
              Wishlist name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={
                  isCustom
                    ? "e.g., Summer in Paris, Office Capsule Wardrobe"
                    : selectedOccasion
                }
                className="mt-2 rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </label>
            <p className="text-xs text-gray-400 mt-2">
              You can rename this later. This title will appear at the top of
              your wishlist when you start adding items.
            </p>

            <button
              type="button"
              onClick={handleCreate}
              disabled={!canCreate}
              className={`mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium border transition-all ${
                canCreate
                  ? "border-black bg-black text-white hover:opacity-90"
                  : "border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
            >
              Create Wishlist
            </button>
          </div>
        )}
      </div>

      <div className="h-16" />
    </section>
  );
}
