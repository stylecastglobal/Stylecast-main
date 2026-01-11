"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [showCertDropdown, setShowCertDropdown] = useState(false);

  const certificationCategories = [
    { name: "벤처기업인증", href: "/certification/venture" },
    { name: "이노비즈인증", href: "/certification/innobiz" },
    { name: "메인비즈인증", href: "/certification/mainbiz" },
    { name: "ISO", href: "/certification/iso" },
    { name: "기업부설연구소", href: "/certification/research-center" },
    { name: "소부장전문기업", href: "/certification/materials-parts" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/venture-maker-logo.png"
            alt="Venture Maker Logo"
            className="h-26 lg:h-34 object-contain"
          />
        </Link>

        {/* Navigation + CTA */}
        <div className="flex items-center gap-10">
          <nav className="flex items-center gap-8 text-sm font-semibold text-gray-700">
            <Link href="/about" className="hover:text-gray-900">
              회사소개
            </Link>
            
            {/* 기업인증센터 with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowCertDropdown(true)}
              onMouseLeave={() => setShowCertDropdown(false)}
            >
              <Link href="/certification" className="hover:text-gray-900">
                기업인증센터
              </Link>
              
              {/* Dropdown Menu */}
              {showCertDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  {certificationCategories.map((category, index) => (
                    <Link
                      key={index}
                      href={category.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/insights" className="hover:text-gray-900">
              경영 인사이트
            </Link>
            <Link
              href="/ai"
              className="font-semibold text-orange-500 hover:opacity-80"
            >
              벤처메이커 AI
            </Link>
          </nav>

          {/* 상담 신청 버튼 */}
          <Link
            href="/consult"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            상담 신청
          </Link>
        </div>
      </div>
    </header>
  );
}