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
  const megaMenuColumns = [
    {
      title: "FEATURED",
      items: [
        { label: "Apparel", href: "/shop" },
        { label: "Beauty", href: "/beauty" },
        { label: "New Arrivals", href: "/new-arrivals" },
        { label: "Best Sellers", href: "/best-sellers" },
      ],
    },
    {
      title: "CLOTHING",
      items: [
        { label: "All Clothing", href: "/clothing/all" },
        { label: "Tops", href: "/clothing/tops" },
        { label: "Pants", href: "/clothing/pants" },
        { label: "Dresses", href: "/clothing/dresses" },
        { label: "Outerwear", href: "/clothing/outerwear" },
      ],
    },
    {
      title: "SHOES",
      items: [
        { label: "Sneakers", href: "/shop" },
        { label: "Boots", href: "/shop" },
        { label: "Loafers", href: "/shop" },
        { label: "Heels", href: "/shop" },
        { label: "Sandals", href: "/shop" },
      ],
    },
    {
      title: "ACCESSORIES",
      items: [
        { label: "Bags", href: "/shop" },
        { label: "Jewelry", href: "/shop" },
        { label: "Hats", href: "/shop" },
        { label: "Sunglasses", href: "/shop" },
        { label: "Belts", href: "/shop" },
      ],
    },
    {
      title: "BEAUTY",
      items: [
        { label: "All Beauty", href: "/beauty" },
        { label: "Makeup", href: "/beauty/makeup" },
        { label: "Skincare", href: "/beauty/skincare" },
        { label: "Hair", href: "/beauty/hair" },
        { label: "Fragrance", href: "/beauty/fragrance" },
      ],
    },
    {
      title: "BRANDS",
      items: [
        { label: "Popular Brands", href: "/brands" },
        { label: "New Brands", href: "/brands" },
        { label: "Designer", href: "/brands" },
        { label: "Street", href: "/brands" },
        { label: "All Brands", href: "/brands" },
      ],
    },
  ];

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
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M11 3a8 8 0 1 0 0 16a8 8 0 0 0 0-16Z" />
                        <path d="M20 20l-3.6-3.6" />
                      </svg>
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
                      <div className="text-xs text-gray-500">
                      </div>
                    </div>
                  </Link>

                  {/* ❤️ WISHLIST (찜 전용) */}
                  <Link href="/wishlist" className="hover:opacity-70 transition -ml-6">
                    <Image
                      src="/heart.png"
                      alt="Wishlist"
                      width={22}
                      height={22}
                    />
                  </Link>

                  {/* 🛍 CART */}
                  <Link href="/cart" className="hover:opacity-70 transition -ml-6">
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
                      <div className="grid grid-cols-6 gap-8 text-sm">
                        {megaMenuColumns.map((column) => (
                          <div key={column.title}>
                            <h4 className="font-semibold mb-3 text-gray-900">
                              {column.title}
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              {column.items.map((item) => (
                                <li key={`${column.title}-${item.label}`}>
                                  <Link
                                    href={item.href}
                                    className="hover:text-black"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* MAIN LINKS */}
                <div className="flex items-center gap-8">
                  <Link href="/lookbook" className="py-4 hover:text-gray-300">
                    Lookbook
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