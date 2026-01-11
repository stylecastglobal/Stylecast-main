"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFFFFF] text-[#111111]`}
      >

        {/* ================= HEADER ================= */}
        <header className="fixed top-0 left-0 w-full z-50 bg-white">
          {/* ---------- TOP BAR ---------- */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

              {/* LOGO */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-stylecast.png"
                  alt="Style Cast Logo"
                  width={140}
                  height={40}
                  priority
                  className="object-contain"
                />
              </Link>

              {/* SEARCH BAR */}
              <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:border-gray-400 placeholder:text-gray-400 text-black"
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
              <div className="flex items-center gap-6">

                {/* Sign In */}
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-sm hover:text-[#8B6A43] text-black"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="font-semibold text-black">Sign In</div>
                    <div className="text-xs text-black">for FREE Shipping</div>
                  </div>
                </Link>

                {/* Wishlist */}
                <button className="hover:text-[#8B6A43] text-black">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                {/* Cart */}
                <button className="hover:text-[#8B6A43] text-black">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>

              </div>
            </div>
          </div>

          {/* ----------- NAV BAR ----------- */}
          <div className="bg-black">
            <div className="max-w-7xl mx-auto">
              <nav className="flex items-center justify-between px-8 text-white">

                {/* CATEGORY DROPDOWN */}
                <div
                  className="relative py-4"
                  onMouseEnter={() => setIsCategoryOpen(true)}
                  onMouseLeave={() => setIsCategoryOpen(false)}
                >
                  <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition">
                    <svg className="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    CATEGORY
                  </button>

                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 w-[1200px] bg-white text-black p-8 border border-gray-200 shadow-2xl">
                      {/* Your full mega menu here (unchanged) */}
                      <div className="grid grid-cols-6 gap-8">
                        <div className="absolute top-full left-0 w-[1200px] bg-white text-black p-8 border border-gray-200 shadow-2xl">
  <div className="grid grid-cols-6 gap-8">

    {/* CLOTHING */}
    <div>
      <h3 className="font-bold text-sm mb-4 text-black">CLOTHING</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        <li><Link href="/clothing/all">ALL CLOTHING</Link></li>
        <li><Link href="/clothing/tops">Tops</Link></li>
        <li><Link href="/clothing/outerwear">Outerwear</Link></li>
        <li><Link href="/clothing/pants">Pants</Link></li>
        <li><Link href="/clothing/dresses">Dresses & Skirts</Link></li>
        <li><Link href="/clothing/short-sleeves">Short Sleeves</Link></li>
        <li><Link href="/clothing/long-sleeves">Long Sleeves</Link></li>
        <li><Link href="/clothing/sweatshirts">Sweatshirts</Link></li>
        <li><Link href="/clothing/hooded-jackets">Hooded Jackets</Link></li>
        <li><Link href="/clothing/jeans">Jeans</Link></li>
        <li><Link href="/clothing/shirts-blouses">Shirts & Blouses</Link></li>
        <li><Link href="/clothing/track-pants">Track Pants & Joggers</Link></li>
      </ul>
    </div>

    {/* BAGS */}
    <div>
      <h3 className="font-bold text-sm mb-4 text-black">BAGS</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        <li><Link href="/bags/all">ALL BAGS</Link></li>
        <li><Link href="/bags/shoulder">Shoulder Bags</Link></li>
        <li><Link href="/bags/messenger">Messenger & Crossbody Bags</Link></li>
        <li><Link href="/bags/backpacks">Backpacks</Link></li>
        <li><Link href="/bags/totes">Totes</Link></li>
        <li><Link href="/bags/canvas">Canvas Bags</Link></li>
        <li><Link href="/bags/travel">Travel Bags</Link></li>
        <li><Link href="/bags/belt">Belt Bags</Link></li>
        <li><Link href="/bags/wallets">Wallets & Cases</Link></li>
        <li><Link href="/bags/pouches">Pouches</Link></li>
        <li><Link href="/bags/sports">Sports Bags</Link></li>
        <li><Link href="/bags/clutches">Clutches</Link></li>
        <li><Link href="/bags/accessories">Bag Accessories</Link></li>
      </ul>
    </div>

    {/* ACCESSORIES */}
    <div>
      <h3 className="font-bold text-sm mb-4 text-black">ACCESSORIES</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        <li><Link href="/accessories/all">ALL ACCESSORIES</Link></li>
        <li><Link href="/accessories/caps-hats">Caps & Hats</Link></li>
        <li><Link href="/accessories/belts">Belts</Link></li>
        <li><Link href="/accessories/key-rings">Key Rings & Key Cases</Link></li>
        <li><Link href="/accessories/fashion">Fashion Accessories</Link></li>
        <li><Link href="/accessories/necklace">Necklace & Pendants</Link></li>
        <li><Link href="/accessories/earrings">Earrings</Link></li>
        <li><Link href="/accessories/bracelets">Bracelets</Link></li>
        <li><Link href="/accessories/rings">Rings</Link></li>
        <li><Link href="/accessories/sunglasses">Sunglasses</Link></li>
        <li><Link href="/accessories/glasses">Glasses</Link></li>
        <li><Link href="/accessories/tech">Tech & Life</Link></li>
        <li><Link href="/accessories/pets">Pets</Link></li>
      </ul>
    </div>

    {/* SHOES */}
    <div>
      <h3 className="font-bold text-sm mb-4 text-black">SHOES</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        <li><Link href="/shoes/all">ALL SHOES</Link></li>
        <li><Link href="/shoes/sneakers">Sneakers</Link></li>
        <li><Link href="/shoes/oxfords">Oxfords & Brogues</Link></li>
        <li><Link href="/shoes/loafers">Loafers</Link></li>
        <li><Link href="/shoes/boots">Boots</Link></li>
        <li><Link href="/shoes/heels">Heels & Pumps</Link></li>
        <li><Link href="/shoes/flats">Flats</Link></li>
        <li><Link href="/shoes/sandals">Sandals & Slippers</Link></li>
        <li><Link href="/shoes/flip-flops">Flip-flops</Link></li>
        <li><Link href="/shoes/mules">Mules</Link></li>
        <li><Link href="/shoes/sports">Sports Shoes</Link></li>
      </ul>
    </div>

    {/* ACTIVE */}
    <div>
      <h3 className="font-bold text-sm mb-4 text-black">ACTIVE</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        <li><Link href="/active/all">ALL ACTIVEWEAR</Link></li>
        <li><Link href="/active/swimwear">Swimwear & Beachwear</Link></li>
        <li><Link href="/active/tops">Sports Tops</Link></li>
        <li><Link href="/active/pants">Sports Pants</Link></li>
        <li><Link href="/active/outerwear">Sports Outerwear</Link></li>
        <li><Link href="/active/skirts">Sports Skirts</Link></li>
        <li><Link href="/active/bags">Sports Bags</Link></li>
        <li><Link href="/active/hats">Sports Hats</Link></li>
        <li><Link href="/active/gear">Sports Gear</Link></li>
        <li><Link href="/active/goods">Sporting Goods</Link></li>
        <li><Link href="/active/shoes">Sports Shoes</Link></li>
        <li><Link href="/active/dresses">Sports Dresses</Link></li>
      </ul>
    </div>

    {/* BEAUTY */}
    <div>
      <h3 className="font-bold text-sm mb-4 text-black">BEAUTY</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        <li><Link href="/beauty/all">ALL BEAUTY</Link></li>
        <li><Link href="/beauty/skincare">Skincare</Link></li>
        <li><Link href="/beauty/facial-masks">Facial Masks</Link></li>
        <li><Link href="/beauty/base-makeup">Base Makeup</Link></li>
        <li><Link href="/beauty/lip-makeup">Lip Makeup</Link></li>
        <li><Link href="/beauty/eye-makeup">Eye Makeup</Link></li>
        <li><Link href="/beauty/hair-care">Hair Care</Link></li>
        <li><Link href="/beauty/sunscreens">Sunscreens</Link></li>
        <li><Link href="/beauty/cleansers">Cleansers</Link></li>
        <li><Link href="/beauty/body-care">Body Care</Link></li>
        <li>
          <Link href="/beauty/devices">
            Beauty Devices & Tools <span className="text-red-500 text-xs">NEW</span>
          </Link>
        </li>
      </ul>
    </div>

  </div>
</div>

                      </div>
                    </div>
                  )}
                </div>

                {/* MAIN NAV LINKS */}
                <div className="flex items-center gap-8 text-sm">
                  <Link href="/stylist" className="py-4 hover:text-gray-300">Stylist</Link>
                  <Link href="/scan" className="py-4 hover:text-gray-300">Scan</Link>
                  <Link href="/lookbook" className="py-4 hover:text-gray-300">Lookbook</Link>
                  <Link href="/shop" className="py-4 hover:text-gray-300">Apparel</Link>
                  <Link href="/Beauty" className="py-4 hover:text-gray-300">Beauty</Link>
                  <Link href="/wellness" className="py-4 hover:text-gray-300">Wellness</Link>
                  <Link href="/Wishes" className="py-4 hover:text-gray-300">Wishes</Link>
                  <Link href="/feed" className="py-4 hover:text-gray-300">Feed</Link>
                  <Link href="/brands" className="py-4 hover:text-gray-300">Brands</Link>
                </div>

              </nav>
            </div>
          </div>
        </header>

        {/* ------------ MAIN CONTENT ------------ */}
        <main className="pt-[200px]">
          {children}
        </main>

        {/* ------------ FOOTER (includes Newsletter modal) ------------ */}
        <Footer />

      </body>
    </html>
  );
}
