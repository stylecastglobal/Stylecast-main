"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [feedItems] = useState([
    { id: 1, src: "/moods/minimal-1.jpg", alt: "Minimal look" },
    { id: 2, src: "/moods/street-1.jpg", alt: "Street look" },
    { id: 3, src: "/moods/soft-1.jpg", alt: "Soft look" },
    { id: 4, src: "/moods/romantic-1.jpg", alt: "Romantic look" },
    { id: 5, src: "/moods/date-1.jpg", alt: "Date look" },
    { id: 6, src: "/moods/vacation-1.jpg", alt: "Vacation look" },
  ]);

  return (
    <main className="min-h-screen bg-[#F9F9F9] text-[#111111]">
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="StyleCast Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-bold tracking-wide text-lg">STYLECAST</span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#feed" className="hover:text-[#8B6A43] transition">Feed</a>
            <a href="#shop" className="hover:text-[#8B6A43] transition">Shop</a>
            <a href="#style-share" className="hover:text-[#8B6A43] transition">Style Share</a>
            <a href="#mood-looks" className="hover:text-[#8B6A43] transition">Mood Looks</a>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative w-full h-[90vh] flex items-center justify-center text-center">
        <Image
  src="/hero1.jpg"
  alt="Hero"
  fill
  priority
  className="object-cover object-center md:object-[center_20%] brightness-75"
/>

        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6">
            Curate Your World in Style. 
          </h1>
          <p className="text-white/80 mb-8">
            Every look tells a story — make yours unforgettable.
          </p>
          <a
            href="#feed"
            className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-[#e9e9e9] transition"
          >
            Explore Feed
          </a>
        </div>
      </section>

      {/* ===== FEED PREVIEW ===== */}
      <section id="feed" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">Explore the Feed</h2>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {feedItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={500}
                height={700}
                className="w-full h-auto object-cover hover:scale-[1.02] transition"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-gray-200 py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Style Cast. All rights reserved.
      </footer>
    </main>
  );
}
