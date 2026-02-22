"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import NewsletterModal from "../NewsletterModal";

export default function Footer() {
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">

        {/* TOP ROW: LOGO + SOCIAL + BACK */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <Link href="/" className="mb-8 md:mb-0">
            <Image
              src="/logo-stylecast.png"
              alt="StyleCast Logo"
              width={160}
              height={60}
              className="object-contain opacity-90 hover:opacity-100 transition"
            />
          </Link>

          <div className="flex items-center gap-8">
            {/* Social Icons */}
            <div className="flex items-center gap-6">
              {/* Instagram */}
              <a href="https://www.instagram.com/stylecast_global?igsh=MTE4YWlveHpqMWxzcA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-black transition" aria-label="Instagram">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@stylecast_global?_r=1&_t=ZS-93th0iOxKbP" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-black transition" aria-label="TikTok">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.17V12a4.83 4.83 0 01-3.77-1.54V6.69h3.77z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/stylecast-global/" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-black transition" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="text-sm text-neutral-600 hover:text-black transition"
            >
              Back to top ↑
            </button>
          </div>
        </div>

        {/* GRID LINKS SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">

          {/* StyleCast */}
          <div>
            <h4 className="uppercase tracking-widest text-xs mb-4 text-neutral-400">
              StyleCast
            </h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/vision">Editorial Vision</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/press">Press & Media</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="uppercase tracking-widest text-xs mb-4 text-neutral-400">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li><Link href="/new-arrivals">New Arrivals</Link></li>
              <li><Link href="/shop/apparel">Apparel</Link></li>
              <li><Link href="/shop/beauty">Beauty</Link></li>
              <li><Link href="/lookbook">Lookbook</Link></li>
              <li><Link href="/scan">Scan</Link></li>
              <li><Link href="/brands">Brand Directory</Link></li>
            </ul>
          </div>

          {/* Support + Brands IN SAME COLUMN */}
          <div>
            <h4 className="uppercase tracking-widest text-xs mb-4 text-neutral-400">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/shipping">Shipping</Link></li>
              <li><Link href="/returns">Returns</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>

            <h4 className="uppercase tracking-widest text-xs mt-8 mb-4 text-neutral-400">
              For Brands
            </h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>
                <Link href="/brand-onboarding" className="hover:underline">
                  Brand Onboarding
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal + Newsletter Button */}
          <div>
            <h4 className="uppercase tracking-widest text-xs mb-4 text-neutral-400">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/cookies">Cookie Settings</Link></li>
            </ul>

            {/* Newsletter Popup Trigger */}
            <button
              onClick={() => setNewsletterOpen(true)}
              className="mt-8 text-sm text-neutral-700 hover:underline"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-200 mt-16 pt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} Style Cast. All rights reserved.
        </div>
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={newsletterOpen}
        onClose={() => setNewsletterOpen(false)}
      />
    </footer>
  );
}
