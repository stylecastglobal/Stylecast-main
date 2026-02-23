"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const PersonalColorPage = dynamic(
  () => import("@/app/personal-color/page").then((m) => m.default),
  { ssr: false }
);

const ProductScannerPage = dynamic(
  () => import("@/app/product-scanner/page").then((m) => m.default),
  { ssr: false }
);

const MENU_ITEMS = [
  { id: "personal-color", label: "AI Personal Color Analysis" },
  { id: "product-scanner", label: "Product Scanner" },
];

export default function SmartcastPage() {
  const [activeMenu, setActiveMenu] = useState(MENU_ITEMS[0].id);

  return (
    <div className="min-h-screen bg-white">
      {/* MENU BAR */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center h-14">
            <nav className="flex items-center gap-1">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeMenu === item.id
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <main>
        {activeMenu === "personal-color" && <PersonalColorPage />}
        {activeMenu === "product-scanner" && <ProductScannerPage />}
      </main>
    </div>
  );
}
