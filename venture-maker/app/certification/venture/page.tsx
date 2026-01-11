"use client";

import { useState } from "react";
import Footer from "../../components/Footer";

export default function VenturePage() {
  const [activeTab, setActiveTab] = useState("세제");

  const benefitsTabs = {
    "세제": [
      "법인세 및 소득세 50% 감면 (*창업벤처중소기업에 한함)",
      "취득세 75% 감면 (*창업벤처중소기업에 한함)",
      "재산세 3년간 면제와 이후 2년간 50% 감면 (*창업벤처중소기업에 한함)",
      "취득세 및 재산세 37.5% 경감 (벤처기업육성을 촉진하기 위한 출진지구 내 벤처기업)",
      "취득세, 등록면허세, 재산세 중과 면제 (수도권과밀억제권 내의 벤처기업집적시설이나 산업기술단지에 입주)"
    ],
    "금융": [
      "기술보증기금의 보증한도의 확대",
      "코스닥 상장 심사기준 완화 및 우대",
      "각종 정책자금 및 지원사업 우대 가점 부여"
    ],
    "인력": [
      "기업부설연구소의 연구전담요원 조건이 최소 2인으로 완화",
      "기업부설창작연구소의 연구전담요원 조건이 최소 3인으로 완화",
      "스톡옵션을 부여하기 위한 대상의 확대",
      "스톡옵션의 부여 한도를 50%으로 확대(일반법인 10%, 상장법인 15%)"
    ],
    "기타": [
      "대기업이 벤처기업을 인수합병하는 경우 상호출자제한기업집단 편입을 7년간 유예",
      "TV, 라디오 광고비 3년간 최대 70% 할인"
    ]
  };

  const processSteps = [
    {
      number: "01",
      title: "벤처신청",
      icon: "💻",
      subtitle: "온라인 신청",
      items: ["유형별 벤처기업 신청"]
    },
    {
      number: "02",
      title: "신청접수",
      icon: "📋",
      subtitle: "제출 및 수수료",
      items: [
        "벤처투자유형 15만원",
        "연구개발유형 35만원",
        "혁신성장유형 45만원"
      ]
    },
    {
      number: "03",
      title: "현장심사",
      icon: "👥",
      subtitle: "방문평가",
      items: [
        "벤처투자유형 30일",
        "연구개발유형 45일",
        "혁신성장유형 45일"
      ]
    },
    {
      number: "04",
      title: "최종심의 및 발급",
      icon: "✅",
      subtitle: "최종 심의 및 발급",
      items: [
        "현장 평가 결과에 따라 벤처기업 최종 심의",
        "통과 후 벤처기업인증서 온라인 출력"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
              벤처기업인증
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              기술성과 성장성을 인정받아 정부 지원 혜택을 받을 수 있는 벤처기업 인증
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Detailed Information with Image */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Left: Image */}
            <div className="md:col-span-2">
              <div className="sticky top-24">
                <img 
                  src="/venture-detail-image.jpg" 
                  alt="벤처기업 인증"
                  className="w-full h-auto rounded-2xl shadow-xl object-cover"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="md:col-span-3 space-y-8">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  벤처기업 인증이란 새로운 기술과 아이디어를 개발하여 신사업을 창출시키는 기업에게 내수를 넘어 글로벌확산과 경제성장 및 일자리 창출의 역할을 수행할 수 있도록 발굴하여 성장시키기 위한 인증제도입니다.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  벤처기업의 경쟁력을 확보하여 기업가치를 높이고 혁신 역량을 강화시키는 등의 환경을 조성하고 이에 따른 정책적인 지원을 제공하고 있습니다.
                </p>
              </div>

              <div className="bg-blue-50 p-8 rounded-2xl border-l-4 border-blue-600">
                <p className="text-lg text-gray-700 leading-relaxed">
                  법인세 및 소득세 <span className="font-bold text-blue-600">50% 감면</span>, 취득세 <span className="font-bold text-blue-600">75% 감면</span>, 재산세 면제 및 감면 등의 다양한 세제혜택과 금융, M&A 등의 혜택을 받을 수 있습니다.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  벤처기업육성에 관한 특별조치법 제2조제1항에 따른 벤처기업
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    창업 후 3년 이내에 같은 법 제25조에 따라 2024년 12월 31일까지 벤처기업으로 확인받은 기업 <span className="font-semibold">&lt;종료&gt;</span> 확인받은 날 이후 최초로 소득이 발생한 과세연도와 그 다음 과세연도의 개시일부터 4년 이내에 끝나는 과세연도까지 해당 사업에서 발생한 소득에 대한 <span className="font-bold text-blue-600">소득세 또는 법인세의 100분의 50에 상당하는 세액을 감면</span>한다.
                  </p>
                  <p className="leading-relaxed">
                    평가기관은 사단법인 벤처기업협회가 벤처기업확인기관으로 벤처기업확인위원회의 심의를 통하여 사업 성장성과 기술 혁신성이 우수한 기업을 벤처기업으로 인증합니다.
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-bold text-blue-600">벤처기업 인증 유효기간은 3년</span>이며 유효기간 만료 2개월전에서 만료 후 1개월 이내에 재인증을 받아 기간을 연장할 수 있습니다.
                  </p>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Benefits Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">벤처기업 인증 혜택</h2>

          {/* Two Column Layout: Text Left, Image Right */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left: Text Content */}
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                <span className="font-bold text-blue-600">벤처기업</span> 인증을 받은 중소기업은 일반 기업에서 벤처기업으로 전환되는 것과 같습니다.
              </p>
              <p className="text-lg leading-relaxed">
                가장 <span className="font-bold text-blue-600">강력한 혜택인 세제혜택</span>을 살펴보세요.
              </p>
              <p className="text-lg leading-relaxed">
                창업벤처중소기업은 <span className="font-bold text-blue-600">창업 이후 3년 이내에 벤처기업 인증을 취득한 기업</span>을 말합니다.
              </p>
              <p className="text-lg leading-relaxed">
                창업벤처중소기업에게는 <span className="font-bold text-blue-600">법인세 및 소득세 50% 감면</span>과 <span className="font-bold text-blue-600">취득세 75% 감면</span>, <span className="font-bold text-blue-600">재산세에 대하여벤처확인 시점부터 3년간 면제</span>되고 이후 <span className="font-bold text-blue-600">2년간 50%가 감면</span>됩니다.
              </p>
              <p className="text-lg leading-relaxed">
                또한 기업부설연구소와 연구개발전담부서의 <span className="font-bold text-blue-600">연구전담요원 조건이 2명으로 완화</span>됩니다.
              </p>
              <p className="text-lg leading-relaxed">
                기업부설창작연구소는 기존 5명에서 3명으로 완화됩니다.
              </p>
              <p className="text-lg leading-relaxed">
                그 외 <span className="font-bold text-blue-600">다양한 혜택</span>은 요약표를 참고하여 주시기 바랍니다.
              </p>
            </div>

            {/* Right: Image */}
            <div>
              <img 
                src="/venture-benefits-image.jpg" 
                alt="벤처기업 인증 혜택"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Benefits Table with Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Table Header Tabs */}
            <div className="grid grid-cols-4">
              {["세제 혜택", "금융 혜택", "인력 관련 혜택", "기타 혜택"].map((tab, index) => {
                const tabKey = ["세제", "금융", "인력", "기타"][index];
                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`px-6 py-4 font-bold text-center transition-colors ${
                      activeTab === tabKey
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    } ${index > 0 ? "border-l" : ""}`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Table Content */}
            <div className="p-8">
              <ul className="space-y-4 text-gray-700">
                {benefitsTabs[activeTab].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                    <span className="font-bold text-blue-600 flex-shrink-0">{index + 1}.</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


{/* Section 3: Application Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">벤처기업 인증 절차</h2>
          
          <div className="mb-12 space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">
              벤처기업 인증은 창업 3년 이내에 받아야 가장 큰 효과를 볼 수 있습니다.
            </p>
            <p className="text-lg leading-relaxed">
              이전에 기술보증기금의 보증이나 중소기업진흥공단의 대출로 벤처기업을 인증받는 유형은 삭제되었으며, 혁신성장유형이 신규로 추가되었습니다.
            </p>
            <p className="text-lg leading-relaxed">
              혁신성장유형은 기술의 혁신과 사업의 성장에 대한 평가를 진행하게 됩니다.
            </p>
            <p className="text-lg leading-relaxed">
              업종별로 평가지표가 달리 적용되며 현재 상황에 따라 평가 유형을 선택할 수 있습니다.
            </p>
          </div>

          {/* Process Steps with Arrow Design - White/Grey Pattern */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
              {/* Step 1 - White */}
              <div className="relative bg-white text-gray-900 p-8 group border-2 border-gray-200">
                <div className="absolute top-4 right-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h3 className="text-2xl font-bold mb-3 mt-8">벤처신청</h3>
                <p className="text-blue-600 font-semibold mb-4 text-sm">온라인 신청</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 유형별 벤처기업 신청</li>
                </ul>
                {/* Arrow */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[20px] border-l-white z-10"></div>
              </div>

              {/* Step 2 - Grey */}
              <div className="relative bg-gray-100 text-gray-900 p-8 group border-2 border-gray-300">
                <div className="absolute top-4 right-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h3 className="text-2xl font-bold mb-3 mt-8">신청접수</h3>
                <p className="text-blue-600 font-semibold mb-4 text-sm">제출 및 수수료</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 벤처투자유형 15만원</li>
                  <li>• 연구개발유형 35만원</li>
                  <li>• 혁신성장유형 45만원</li>
                </ul>
                {/* Arrow */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[20px] border-l-gray-100 z-10"></div>
              </div>

              {/* Step 3 - White */}
              <div className="relative bg-white text-gray-900 p-8 group border-2 border-gray-200">
                <div className="absolute top-4 right-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h3 className="text-2xl font-bold mb-3 mt-8">현장심사</h3>
                <p className="text-blue-600 font-semibold mb-4 text-sm">방문평가</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 벤처투자유형 30일</li>
                  <li>• 연구개발유형 45일</li>
                  <li>• 혁신성장유형 45일</li>
                </ul>
                {/* Arrow */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[20px] border-l-white z-10"></div>
              </div>

              {/* Step 4 - Grey */}
              <div className="relative bg-gray-100 text-gray-900 p-8 group border-2 border-gray-300">
                <div className="absolute top-4 right-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  04
                </div>
                <h3 className="text-2xl font-bold mb-3 mt-8">최종심의 및 발급</h3>
                <p className="text-blue-600 font-semibold mb-4 text-sm">최종 심의 및 발급</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 현장 평가 결과에 따라 벤처기업 최종 심의</li>
                  <li>• 통과 후 벤처기업인증서 온라인 출력</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Section 4: Consultation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">벤처기업 인증 컨설팅</h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-10 border-l-4 border-blue-600">
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                적격투자기관에서 투자금액 5,000만원 이상을 투자받아 벤처투자유형으로 벤처기업 인증을 취득하거나 연구조직을 보유하고 총 매출액의 5% 이상을 연구개발비로 투자하여 연구개발유형으로 벤처기업 인증을 취득하는 것은 쉬운 방법은 아닙니다.
              </p>
              
              <p>
                대부분의 중소기업은 혁신성장유형으로 접근하여 벤처기업 인증을 취득해야 하며, 이는 보유 기술의 혁신성과 사업의 성장성이 요구됩니다.
              </p>
              
              <p>
                많은 고객사가 이를 입증하는 것에 대한 어려움을 겪고 있습니다.
              </p>
              
              <p>
                네스트경영연구원과 함께라면 벤처기업 인증을 빠르고 확실하게 벤처기업을 취득할 수 있습니다.
              </p>
              
              <p className="font-semibold text-gray-900">
                벤처기업 인증에 대하여 어려움이 있으시면 언제든지 상담 신청해주시기 바랍니다.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="px-12 py-5 bg-blue-600 text-white rounded-lg font-bold text-xl hover:bg-blue-700 transition-colors shadow-xl">
            상담 신청하기
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}