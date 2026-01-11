"use client";

import { useState } from "react";
import EditorTopBar from "./components/EditorTopBar";
import Sidebar from "./components/Sidebar";
import SectionEditor from "./components/SectionEditor";
import Preview from "./components/Preview";
import type { BrandPageConfig, EditorSection } from "./types";

export default function StorefrontPage() {
  const [activeSection, setActiveSection] = useState<EditorSection>("Template");

  const [config, setConfig] = useState<BrandPageConfig>({
    templateId: "editorial",
    brand: {
      name: "Studio Archive",
      handle: "studio-archive",
    },
    hero: {
      headline: "Modern essentials, crafted with precision.",
      subheadline: "Minimal silhouettes, premium materials, and quiet confidence.",
      image: "/hero-editorial.jpg",
    },
    about: {
      title: "Our Story",
      description: "We believe in timeless design and sustainable practices. Every piece is crafted with intention, combining traditional craftsmanship with modern aesthetics.",
      image: "/about.jpg",
    },
    products: [
      { id: "1", name: "Minimal Wool Coat", price: "$420", image: "/product-1.jpg" },
      { id: "2", name: "Leather Bag", price: "$310", image: "/product-2.jpg" },
      { id: "3", name: "Tailored Trousers", price: "$260", image: "/product-3.jpg" },
      { id: "4", name: "Cashmere Sweater", price: "$380", image: "/product-4.jpg" },
      { id: "5", name: "Silk Shirt", price: "$290", image: "/product-5.jpg" },
      { id: "6", name: "Leather Boots", price: "$520", image: "/product-6.jpg" },
      { id: "7", name: "Wool Scarf", price: "$180", image: "/product-7.jpg" },
      { id: "8", name: "Canvas Tote", price: "$220", image: "/product-8.jpg" },
      { id: "9", name: "Merino Cardigan", price: "$340", image: "/product-9.jpg" },
    ],
    editorial: {
      section1Image: "/editorial-1.jpg",
      section2Image: "/editorial-2.jpg",
    },
  });

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* TOP BAR */}
      <EditorTopBar />

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: EDITOR */}
        <aside className="w-[360px] bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <Sidebar active={activeSection} onSelect={setActiveSection} />
          <div className="flex-1 overflow-y-auto">
            <SectionEditor
              section={activeSection}
              config={config}
              onChange={setConfig}
            />
          </div>
        </aside>

        {/* RIGHT: PREVIEW */}
        <main className="flex-1 bg-white overflow-y-auto">
          <Preview config={config} />
        </main>
      </div>
    </div>
  );
}