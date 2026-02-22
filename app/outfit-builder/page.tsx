"use client";

import Image from "next/image";
import { useOutfitBuilderStore } from "../lib/outfit-builder-store";
import AvatarSetupFlow from "./components/AvatarSetupFlow";
import AvatarCanvas from "./components/AvatarCanvas";
import ReasoningPanel from "./components/ReasoningPanel";
import Avatar3DSection from "./components/Avatar3DSection";
import type { OutfitItem, OutfitCategory } from "../types/outfit-builder";

// ─── Demo sample items (replace with real data / API later) ──────
const SAMPLE_ITEMS: OutfitItem[] = [
  // Tops
  { id: "top-1", brand: "CPGN STUDIO", name: "Oversized Cotton Tee – White", price: 32, image: "/apparel-hero1.jpg", category: "tops", attributes: { color: "#F5F5F0", silhouette: "oversized", style: ["casual", "streetwear"] } },
  { id: "top-2", brand: "GLOWNY", name: "Air Halter Neck Tank – Black", price: 28, image: "/airhalternecktank-black-glowny1.jpg", category: "tops", attributes: { color: "#1A1A1A", silhouette: "slim-fit", style: ["minimal", "casual"] } },
  { id: "top-3", brand: "MEEM", name: "Ribbed Mock-Neck – Cream", price: 36, image: "/apparel-hero6.jpg", category: "tops", attributes: { color: "#F0E6D3", silhouette: "regular", style: ["classic", "office"] } },
  // Bottoms
  { id: "bot-1", brand: "GLOWNY", name: "The Jane Jeans – Indigo", price: 58, image: "/thejanejeans-glowny.jpg", category: "bottoms", attributes: { color: "#2C3E6B", silhouette: "straight", style: ["casual", "classic"] } },
  { id: "bot-2", brand: "SCULPTOR", name: "Wide Cargo Pants – Khaki", price: 52, image: "/maintrending-khakipoint.jpg", category: "bottoms", attributes: { color: "#8B7D5E", silhouette: "wide", style: ["streetwear", "casual"] } },
  // Outerwear
  { id: "out-1", brand: "GLOWNY", name: "Moor Reversible Fur Jacket – Brown", price: 120, image: "/moorreversiblefurjacket-brown-glowny1.jpg", category: "outerwear", attributes: { color: "#6B4226", silhouette: "oversized", style: ["winter", "statement"] } },
  { id: "out-2", brand: "GLOWNY", name: "Urban Suede Jumper – Black", price: 95, image: "/urbansuedejumper-black-glowny1.jpg", category: "outerwear", attributes: { color: "#1C1C1C", silhouette: "regular", style: ["casual", "minimal"] } },
  // Shoes
  { id: "shoe-1", brand: "SCUFFERS", name: "Classic Low Sneaker – White", price: 68, image: "/maintrending-scuffers.jpg", category: "shoes", attributes: { color: "#FFFFFF", silhouette: "low-top", style: ["casual", "streetwear"] } },
  // Accessories
  { id: "acc-1", brand: "COLD CULTURE", name: "Beanie – Charcoal", price: 22, image: "/coldculture-brandcard.jpg", category: "accessories", attributes: { color: "#3A3A3A", silhouette: "fitted", style: ["streetwear", "winter"] } },
];

const CATEGORIES: OutfitCategory[] = ["tops", "bottoms", "outerwear", "shoes", "accessories"];

export default function OutfitBuilderPage() {
  const {
    avatarProfile,
    setupStep,
    slots,
    setSlot,
    clearSlot,
    clearAllSlots,
    reset,
    viewMode,
    setViewMode,
  } = useOutfitBuilderStore();

  const handleToggleItem = (item: OutfitItem) => {
    if (slots[item.category]?.id === item.id) {
      clearSlot(item.category);
    } else {
      setSlot(item.category, item);
    }
  };

  const equippedCount = Object.keys(slots).length;

  return (
    <section className="max-w-7xl mx-auto px-8 py-12">
      {/* Setup modal (shown until avatar is created) */}
      {setupStep !== "done" && <AvatarSetupFlow />}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Outfit Builder</h1>
        {avatarProfile && equippedCount > 0 && (
          <button
            onClick={clearAllSlots}
            className="text-sm text-gray-500 hover:text-black border border-gray-300 px-4 py-2 rounded-lg transition"
          >
            Clear outfit
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10">
        {/* ═══════ Left: Avatar ═══════ */}
        <div className="flex flex-col items-center gap-4">
          {/* 2D / 3D toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("2d")}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition ${
                viewMode === "2d"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              2D
            </button>
            <button
              onClick={() => setViewMode("3d")}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition ${
                viewMode === "3d"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              3D
            </button>
          </div>

          {/* Avatar viewer */}
          {viewMode === "2d" ? (
            <AvatarCanvas width={380} height={680} className="rounded-2xl shadow-lg" />
          ) : (
            <div className="w-[380px]">
              <Avatar3DSection />
            </div>
          )}

          {/* Avatar summary */}
          {avatarProfile && (
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div
                className="w-5 h-5 rounded-full border"
                style={{ backgroundColor: avatarProfile.features.skinToneHex }}
              />
              <div
                className="w-5 h-5 rounded-full border"
                style={{ backgroundColor: avatarProfile.features.hairColorHex }}
              />
              <span>
                {avatarProfile.height}cm · {avatarProfile.bodyType} · {avatarProfile.gender}
              </span>
              <button onClick={reset} className="ml-2 underline hover:text-black transition">
                Reset
              </button>
            </div>
          )}

          {/* Style Reasoning — below outfit preview */}
          <ReasoningPanel />
        </div>

        {/* ═══════ Right: Outfit Panel ═══════ */}
        <div className="space-y-6">
          {avatarProfile ? (
            <>
              {CATEGORIES.map((category) => {
                const categoryItems = SAMPLE_ITEMS.filter((i) => i.category === category);
                const equipped = slots[category];

                return (
                  <div key={category} className="border rounded-xl p-5">
                    {/* Category header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm uppercase tracking-wide">
                        {category}
                      </h3>
                      {equipped && (
                        <button
                          onClick={() => clearSlot(category)}
                          className="text-[11px] text-gray-400 hover:text-red-500 transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Item grid */}
                    <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
                      {categoryItems.map((item) => {
                        const isEquipped = equipped?.id === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleToggleItem(item)}
                            className={`flex-shrink-0 w-[120px] rounded-xl border-2 transition-all ${
                              isEquipped
                                ? "border-black shadow-md scale-[1.02]"
                                : "border-transparent hover:border-gray-300"
                            }`}
                          >
                            <div className="relative w-[120px] h-[140px] bg-gray-100 rounded-t-xl overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="120px"
                              />
                              {isEquipped && (
                                <div className="absolute top-2 right-2 w-5 h-5 bg-black rounded-full flex items-center justify-center">
                                  <span className="text-white text-[10px]">✓</span>
                                </div>
                              )}
                            </div>
                            <div className="p-2 text-left">
                              <p className="text-[10px] text-gray-400">{item.brand}</p>
                              <p className="text-[11px] font-medium leading-tight line-clamp-2">
                                {item.name}
                              </p>
                              <p className="text-xs font-semibold mt-1">${item.price}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Equipped indicator */}
                    {equipped && (
                      <div className="mt-3 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <div
                          className="w-4 h-4 rounded-sm border"
                          style={{ backgroundColor: equipped.attributes.color }}
                        />
                        <span className="text-xs text-gray-600 truncate">
                          {equipped.brand} — {equipped.name}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
              Complete avatar setup to start building outfits
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
