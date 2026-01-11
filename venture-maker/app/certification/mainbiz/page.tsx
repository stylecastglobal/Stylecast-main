"use client";

import Footer from "../../components/Footer";

export default function MainbizPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-orange-900">
              메인비즈인증
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              경영혁신형 중소기업 인증으로 우수한 경영 시스템 보유 증명
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">인증 혜택</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span>정책자금 지원 우대</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span>경영 컨설팅 지원</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span>해외 진출 지원</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span>신용보증 우대</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">인증 요건</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">1.</span>
                  <span>우수한 경영시스템 보유</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">2.</span>
                  <span>경영혁신 역량 보유</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">3.</span>
                  <span>지속 성장 가능성</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors">
              상담 신청하기
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}