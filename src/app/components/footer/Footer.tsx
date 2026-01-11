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
              <a href="#" className="text-neutral-700 hover:text-black">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </a>

              <a href="#" className="text-neutral-700 hover:text-black">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3v12a3 3 0 11-3-3h3" />
                  <path d="M12 6a4 4 0 004 4h2" />
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
              <li><Link href="/shop/new">New Arrivals</Link></li>
              <li><Link href="/shop/apparel">Apparel</Link></li>
              <li><Link href="/shop/beauty">Beauty</Link></li>
              <li><Link href="/shop/wellness">Wellness</Link></li>
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
