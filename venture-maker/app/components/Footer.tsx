import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Navigation */}
        <div className="flex justify-center gap-16 mb-8 text-sm text-gray-700">
          <Link href="/terms" className="hover:text-gray-900 transition">
            서비스 이용약관
          </Link>
          <Link href="/privacy" className="hover:text-gray-900 transition">
            개인정보처리방침
          </Link>
          <Link href="/recruitment" className="hover:text-gray-900 transition">
            채용안내
          </Link>
          <Link href="/notice" className="hover:text-gray-900 transition">
            공지사항
          </Link>
          <Link href="/contact" className="hover:text-gray-900 transition">
            고객센터
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mb-8"></div>

        {/* Company Info */}
        <div className="text-center space-y-3 text-sm text-gray-600">
          <p>
            중소벤처 경영지원단 | 서울특별시 강서구 마곡중앙6로 11, 3층 314-39호 (마곡동, 보타닉파크타워3) | 사업자등록번호: 107-88-38052 | 대표자: 엄현철
          </p>
          <p>
            Venture Maker | TEL : 010-4324-2683 | E Mail : eumhc63@gmail.com
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-xs text-gray-500">
          Copyright 2025, 중소벤처 경영지원단. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}