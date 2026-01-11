"use client";

import Footer from "../../components/Footer";

export default function MaterialsPartsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-900">
              소부장전문기업
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              소재·부품·장비 분야 전문기업 지정으로 특별 지원 수혜
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">인증 혜택</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>R&D 자금 지원 확대</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>세액 감면 혜택</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>수출 지원</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>공공구매 우선 구매 대상</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">지정 요건</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">1.</span>
                  <span>소재·부품·장비 분야 사업</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">2.</span>
                  <span>기술 경쟁력 보유</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">3.</span>
                  <span>사업화 능력 및 성장 가능성</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors">
              상담 신청하기
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}