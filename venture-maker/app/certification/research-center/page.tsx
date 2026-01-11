"use client";

import Footer from "../../components/Footer";

export default function ResearchCenterPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">
              기업부설연구소
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              연구개발 전담 조직 설립으로 기술 개발 및 세제 혜택 확보
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">인증 혜택</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span>연구개발비 세액공제</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span>연구전담요원 병역특례</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span>국가연구개발사업 참여 자격</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span>우수인력 채용 지원</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">설립 요건</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">1.</span>
                  <span>연구전담요원 확보</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">2.</span>
                  <span>연구시설 및 장비 보유</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">3.</span>
                  <span>독립된 연구공간 확보</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors">
              상담 신청하기
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}