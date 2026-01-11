"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const certificationLinks = [
    { title: "벤처기업인증", href: "/certification/venture" },
    { title: "이노비즈인증", href: "/certification/innobiz" },
    { title: "메인비즈인증", href: "/certification/mainbiz" },
    { title: "ISO 인증", href: "/certification/iso" },
    { title: "기업부설연구소", href: "/certification/research-center" },
    { title: "소부장전문기업", href: "/certification/materials-parts" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">venture.</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              회사소개
            </Link>

            {/* 기업인증센터 with Dropdown - FIXED VERSION */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("certification")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/certification"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors block py-2"
              >
                기업인증센터
              </Link>

              {/* Dropdown Menu - NO GAP, stays open on hover */}
              <div
                className={`absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-200 ${
                  activeDropdown === "certification"
                    ? "opacity-100 visible translate-y-0 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="py-2">
                  {certificationLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/insights"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              경영 인사이트
            </Link>

            <Link
              href="/ai"
              className="text-orange-500 hover:text-orange-600 font-bold transition-colors"
            >
              벤처메이커 AI
            </Link>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              상담 신청
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}