"use client";

import Footer from "../../components/Footer";

export default function ISOPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-900">
              ISO 인증
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              국제 표준 품질경영시스템 인증으로 글로벌 신뢰도 확보
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">인증 혜택</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold">✓</span>
                  <span>글로벌 시장 진출 용이</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold">✓</span>
                  <span>거래처 신뢰도 향상</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold">✓</span>
                  <span>입찰 가점 부여</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold">✓</span>
                  <span>내부 프로세스 개선</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">주요 인증 종류</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>ISO 9001 (품질경영시스템)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>ISO 14001 (환경경영시스템)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>ISO 45001 (안전보건경영시스템)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-cyan-600 text-white rounded-lg font-semibold text-lg hover:bg-cyan-700 transition-colors">
              상담 신청하기
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}