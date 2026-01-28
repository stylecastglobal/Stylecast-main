"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      {/* ================= TOP BAR ================= */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-stylecast.png"
              alt="Style Cast Logo"
              width={140}
              height={40}
              priority
            />
          </Link>

          {/* SEARCH */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                placeholder="Search"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full text-sm focus:outline-none"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">

            {/* SIGN IN */}
            <Link
              href="/login"
              className="flex items-center gap-3 hover:text-[#8B6A43]"
            >
              {/* ICON BOX (FIXED SIZE) */}
              <div className="flex items-center justify-center w-8 h-8">
                <svg
  className="w-5 h-5 block translate-y-[1px]"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  strokeLinecap="round"
  strokeLinejoin="round"
>

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <div className="leading-tight text-sm">
                <div className="font-semibold">Sign In</div>
<<<<<<< HEAD
                <div className="text-xs">for FREE Shipping</div>
=======
>>>>>>> b1bf4f0 (변경사항)
              </div>
            </Link>

            {/* WISHLIST */}
            <button className="flex items-center justify-center w-8 h-8 hover:text-[#8B6A43]">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682"
                />
              </svg>
            </button>

            {/* CART */}
            <Link
              href="/cart"
              className="flex items-center justify-center w-8 h-8 hover:text-[#8B6A43]"
            >
              <svg
  className="w-6 h-6 block translate-y-[1px]"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  strokeLinecap="round"
  strokeLinejoin="round"
>

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= NAV BAR ================= */}
      <div className="bg-black">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 text-white">

          {/* CATEGORY */}
          <div
            className="relative py-4"
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <button className="flex items-center gap-2 text-sm font-medium">
              ☰ CATEGORY
            </button>

            {isCategoryOpen && (
              <div className="absolute top-full left-0 w-[1200px] bg-white text-black p-8 shadow-2xl">
                <div className="grid grid-cols-6 gap-8 text-sm">
                  <div>
                    <h4 className="font-semibold mb-3">CLOTHING</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li><Link href="/clothing/all">All Clothing</Link></li>
                      <li><Link href="/clothing/tops">Tops</Link></li>
                      <li><Link href="/clothing/pants">Pants</Link></li>
                    </ul>
                  </div>
                  {/* 나머지 카테고리는 동일 패턴 */}
                </div>
              </div>
            )}
          </div>

          {/* MAIN NAV */}
          <div className="flex gap-8 text-sm">
            <Link href="/shop">Apparel</Link>
            <Link href="/beauty">Beauty</Link>
            <Link href="/lookbook">Lookbook</Link>
            <Link href="/wishes">Wishes</Link>
            <Link href="/feed">Feed</Link>
            <Link href="/brands" className="text-sm font-medium text-black hover:opacity-60">
              Brands
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
