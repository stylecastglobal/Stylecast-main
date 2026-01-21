"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./globals.css";

import Providers from "./providers";
import Footer from "./components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-[#111111]`}
      >
        {/* 🔥 GLOBAL PROVIDERS */}
        <Providers>
          {/* ================= HEADER ================= */}
          <header className="fixed top-0 left-0 w-full z-50 bg-white">
            {/* ---------- TOP BAR ---------- */}
            <div className="border-b border-gray-200">
              <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
                {/* LOGO */}
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo-stylecast.png"
                    alt="StyleCast Logo"
                    width={140}
                    height={40}
                    priority
                  />
                </Link>

                {/* SEARCH */}
                <div className="flex-1 max-w-xl mx-10">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full rounded-full border border-gray-300 px-4 py-2 pl-10 text-sm focus:outline-none focus:border-gray-400"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      🔍
                    </span>
                  </div>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex items-center gap-8">
                  {/* SIGN IN */}
                  <Link
                    href="/login"
                    className="flex items-center gap-3 hover:text-[#8B6A43]"
                  >
                    <Image
                      src="/user.png"
                      alt="User"
                      width={22}
                      height={22}
                    />
                    <div className="leading-tight">
                      <div className="text-sm font-semibold">Sign In</div>
                      <div className="text-xs text-gray-500">
                        for FREE Shipping
                      </div>
                    </div>
                  </Link>

                  {/* ❤️ WISHLIST (찜 전용) */}
                  <Link href="/wishlist" className="hover:opacity-70 transition">
                    <Image
                      src="/heart.png"
                      alt="Wishlist"
                      width={22}
                      height={22}
                    />
                  </Link>

                  {/* 🛍 CART */}
                  <Link href="/cart" className="hover:opacity-70 transition">
                    <Image
                      src="/shopping-bag.png"
                      alt="Cart"
                      width={22}
                      height={22}
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* ---------- NAV BAR ---------- */}
            <div className="bg-black">
              <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 text-sm text-white">
                {/* CATEGORY */}
                <div
                  className="relative py-4"
                  onMouseEnter={() => setIsCategoryOpen(true)}
                  onMouseLeave={() => setIsCategoryOpen(false)}
                >
                  <button className="flex items-center gap-2 font-medium hover:text-gray-300">
                    ☰ CATEGORY
                  </button>

                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 w-[1200px] bg-white text-black p-8 shadow-xl border border-gray-200">
                      <div className="text-sm text-gray-500">
                        Mega menu content here
                      </div>
                    </div>
                  )}
                </div>

                {/* MAIN LINKS */}
                <div className="flex items-center gap-8">
                  <Link href="/stylist" className="py-4 hover:text-gray-300">
                    Stylist
                  </Link>
                  <Link href="/scan" className="py-4 hover:text-gray-300">
                    Scan
                  </Link>
                  <Link href="/lookbook" className="py-4 hover:text-gray-300">
                    Lookbook
                  </Link>
                  <Link href="/shop" className="py-4 hover:text-gray-300">
                    Apparel
                  </Link>
                  <Link href="/beauty" className="py-4 hover:text-gray-300">
                    Beauty
                  </Link>
                  <Link href="/wellness" className="py-4 hover:text-gray-300">
                    Wellness
                  </Link>

                  {/* ⚠️ Wishes는 기존 기능 (찜 아님) */}
                  <Link href="/wishes" className="py-4 hover:text-gray-300">
                    Wishes
                  </Link>

                  <Link href="/feed" className="py-4 hover:text-gray-300">
                    Feed
                  </Link>
                  <Link href="/brands" className="py-4 hover:text-gray-300">
                    Brands
                  </Link>
                </div>
              </nav>
            </div>
          </header>

          {/* ================= MAIN ================= */}
          <main className="pt-[180px]">{children}</main>

          {/* ================= FOOTER ================= */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
