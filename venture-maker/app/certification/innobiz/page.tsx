"use client";

import Footer from "../../components/Footer";

export default function InnobizPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-900">
              이노비즈인증
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              기술혁신형 중소기업 인증으로 경쟁력 있는 기업임을 증명
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">인증 혜택</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>R&D 자금 지원 우대</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>기술개발 자금 융자</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>해외 마케팅 지원</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>신용보증 우대</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">인증 요건</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">1.</span>
                  <span>기술 혁신 역량 보유</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">2.</span>
                  <span>사업화 능력 보유</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">3.</span>
                  <span>기술 경쟁력 우위</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors">
              상담 신청하기
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}