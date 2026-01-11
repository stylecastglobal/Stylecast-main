"use client";

import { useState, useEffect } from "react";
import Footer from "./components/Footer";  // 이 줄 추가

const items = [
  {
    title: "Fund Optimization",
    category: "FINANCE & TAX",
    description: "정책자금 100% 승인을 위한 로드맵.\n재무제표 개선을 통한 신용등급 상향 전략.",
    image: "/slide1.jpg",
    link: "https://blog.naver.com/YOUR_LINK_1",
  },
  {
    title: "R&D Certification",
    category: "GOVERNMENT",
    description: "벤처·이노비즈 인증을 통한\n세제 혜택 및 정부 지원 극대화.",
    image: "/slide2.jpg",
    link: "https://blog.naver.com/YOUR_LINK_2",
  },
  {
    title: "Space & Brand",
    category: "BRANDING",
    description: "공간 기획을 통한 브랜드 가치 상승.\n투자 유치에 최적화된 구조 설계.",
    image: "/slide3.jpg",
    link: "https://blog.naver.com/YOUR_LINK_3",
  },
  {
    title: "HR Structure",
    category: "ORGANIZATION",
    description: "조직 구조 개선을 통한\n지속 가능한 성장 기반 구축.",
    image: "/slide4.jpg",
    link: "https://blog.naver.com/YOUR_LINK_4",
  },
  {
    title: "IP Strategy",
    category: "LEGAL",
    description: "지식재산 보호 및 활용 전략으로\n기업가치 극대화.",
    image: "/slide5.jpg",
    link: "https://blog.naver.com/YOUR_LINK_5",
  },
  {
    title: "Global Expansion",
    category: "GLOBAL",
    description: "해외 진출을 위한\n시장 분석 및 실행 전략.",
    image: "/slide6.jpg",
    link: "https://blog.naver.com/YOUR_LINK_6",
  },
  {
    title: "Digital Transformation",
    category: "TECHNOLOGY",
    description: "디지털 전환을 통한\n비즈니스 혁신 전략.",
    image: "/slide7.jpg",
    link: "https://blog.naver.com/YOUR_LINK_7",
  },
  {
    title: "ESG Management",
    category: "SUSTAINABILITY",
    description: "지속가능경영을 위한\nESG 전략 수립 및 실행.",
    image: "/slide8.jpg",
    link: "https://blog.naver.com/YOUR_LINK_8",
  },
  {
    title: "Market Entry",
    category: "STRATEGY",
    description: "신규 시장 진입을 위한\n전략적 접근 방법.",
    image: "/slide9.jpg",
    link: "https://blog.naver.com/YOUR_LINK_9",
  },
  {
    title: "Investment Ready",
    category: "FUNDING",
    description: "투자 유치 성공을 위한\n완벽한 준비 전략.",
    image: "/slide10.jpg",
    link: "https://blog.naver.com/YOUR_LINK_10",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"strategy" | "rnd" | "swot">("swot");
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
  const interval = setInterval(nextSlide, 5000);
  return () => clearInterval(interval);
}, []);

// Reset position when reaching end
useEffect(() => {
  if (currentIndex >= items.length * 2) {
    setTimeout(() => {
      setCurrentIndex(items.length);
    }, 600);
  } else if (currentIndex < 0) {
    setTimeout(() => {
      setCurrentIndex(items.length - 1);
    }, 600);
  }
}, [currentIndex]);

  return (
    <main>
      {/* ================= SECTION 1 : HERO ================= */}
      <section className="w-full bg-white pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold tracking-widest text-orange-500 mb-6">
            TOTAL BUSINESS GROWTH STRATEGY
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-blue-900 mb-8">
            가능성을 <span className="text-orange-500">확신</span>으로,
            <br />
            스타트업을 <span className="text-orange-500">유니콘</span>으로.
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            벤처인증부터 정책자금 100% 확보 전략까지.
            <br />
            당신의 비즈니스가 멈추지 않도록,
            벤처메이커가 가장 확실한 길을 설계합니다.
          </p>
        </div>
      </section>

      

     {/* ================= SECTION 2 : 3D CAROUSEL ================= */}
<section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    {/* Carousel Container */}
    <div className="relative h-[600px] flex items-center justify-center">
      {/* Cards */}
      <div className="relative w-full flex items-center justify-center">
        {[...items, ...items, ...items].map((item, index) => {
          const position = index - currentIndex - items.length;
          
          let translateX = 0;
          let width = 220;
          let height = 340;
          let zIndex = 0;
          let opacity = 0.3;

          // Center card - Biggest
          if (position === 0) {
            translateX = 0;
            width = 520;
            height = 560;
            zIndex = 20;
            opacity = 1;
          }
          // Immediate sides - Medium
          else if (position === -1) {
            translateX = -450;
            width = 340;
            height = 480;
            zIndex = 15;
            opacity = 0.85;
          }
          else if (position === 1) {
            translateX = 450;
            width = 340;
            height = 480;
            zIndex = 15;
            opacity = 0.85;
          }
          // Second sides - Small
          else if (position === -2) {
            translateX = -720;
            width = 280;
            height = 420;
            zIndex = 10;
            opacity = 0.6;
          }
          else if (position === 2) {
            translateX = 720;
            width = 280;
            height = 420;
            zIndex = 10;
            opacity = 0.6;
          }
          // Third sides - Very small
          else if (position === -3) {
            translateX = -940;
            width = 220;
            height = 360;
            zIndex = 5;
            opacity = 0.4;
          }
          else if (position === 3) {
            translateX = 940;
            width = 220;
            height = 360;
            zIndex = 5;
            opacity = 0.4;
          }
          // Far cards
          else {
            translateX = position > 0 ? 1200 : -1200;
            width = 180;
            height = 300;
            zIndex = 1;
            opacity = 0.2;
          }

          return (
  <a
    key={index}
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="absolute cursor-pointer"
    style={{
      transform: `translateX(${translateX}px)`,
      width: `${width}px`,
      height: `${height}px`,
      zIndex,
      opacity,
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    }}
    onClick={() => setCurrentIndex(index - items.length)}
  >

              <div className="relative h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <p className="text-xs font-bold tracking-wider text-orange-400 mb-3">
                    {item.category}
                  </p>

                  <h3 className="text-2xl font-extrabold mb-4">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed whitespace-pre-line opacity-90 mb-6">
                    {item.description}
                  </p>

                  <span className="inline-flex items-center text-sm font-semibold text-white group">
                    Read Case Study
                    <svg
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 z-30 w-12 h-12 rounded-full border-2 border-blue-900 text-blue-900 bg-white flex items-center justify-center hover:bg-blue-900 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 z-30 w-12 h-12 rounded-full border-2 border-blue-900 text-blue-900 bg-white flex items-center justify-center hover:bg-blue-900 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    {/* Dots Indicator */}
    <div className="flex justify-center gap-2 mt-12">
      {items.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full transition-all ${
            currentIndex === index
              ? "bg-blue-900 w-8"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
</section>


 {/* ================= SECTION 3 : KNOWLEDGE HUB ================= */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="flex items-end justify-between mb-12">
      <div>
        <p className="text-sm font-semibold tracking-widest text-orange-500 mb-2">
          KNOWLEDGE HUB
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900">
          Management Insights
        </h2>
      </div>

      <div className="flex gap-6 text-sm font-semibold text-gray-500">
        <button className="text-blue-900 border-b-2 border-blue-900 pb-1">All</button>
        <button>벤처/이노비즈</button>
        <button>기업부설연구소</button>
        <button>정책자금</button>
        <button>성공사례</button>
      </div>
    </div>

    {/* ================= ROW 1 : 4 SAME CARDS ================= */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {[
        { 
          tag: "BEST", 
          color: "bg-yellow-400", 
          date: "2025. 06. 23", 
          title: "디지털 전환 컨설팅으로 AI 벤처 인증까지 이끈 실전 사례", 
          desc: "인증 통과로 이어진 디지털 전략",
          url: "https://blog.naver.com/eum63/223598143019",
          image: "/blog-card-1.jpg"
        },
        { 
          tag: "R&D", 
          color: "bg-blue-500 text-white", 
          date: "2024. 12. 01", 
          title: "혁신성장 벤처인증 기술 스타트업 성공 사례", 
          desc: "인증을 통과한 핵심 전략과 실행 포인트",
          url: "https://blog.naver.com/eum63/223905700120",
          image: "/blog-card-2.jpg"
        },
        { 
          tag: "MAINBIZ", 
          color: "bg-purple-500 text-white", 
          date: "2025. 04. 07", 
          title: "외식 프랜차이즈, 혁신성장 벤처인증에 성공하다", 
          desc: "사업성과 시스템으로 인증을 통과한 전략",
          url: "https://blog.naver.com/eum63/223573977275",
          image: "/blog-card-3.jpg"
        },
        { 
          tag: "INSIGHT", 
          color: "bg-gray-800 text-white", 
          date: "2025. 03. 11", 
          title: "벤처기업이 반드시 준비해야 할 핵심 서류", 
          desc: "심사 기준에서 가장 많이 보는 항목",
          url: "https://blog.naver.com/eum63/223812866952",
          image: "/blog-card-4.jpg"
        },
      ].map((item, i) => (
        <a
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border bg-white overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-56 bg-gray-100 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded ${item.color}`}>
              {item.tag}
            </span>
          </div>

          <div className="p-6 flex flex-col min-h-[170px]">
            <p className="text-sm text-gray-400 mb-2">{item.date}</p>
            <h3 className="font-bold text-blue-900 mb-3 leading-snug">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 mt-auto">
              {item.desc}
            </p>
          </div>
        </a>
      ))}
    </div>

    {/* ================= ROW 2 : 2 SAME + BIG ================= */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">

      {/* Small card 1 */}
      <a
        href="https://blog.naver.com/eum63/223908474692"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl border bg-white overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative h-56 bg-gray-100 overflow-hidden">
          <img 
            src="/blog-card-5.jpg" 
            alt="[혁신성장형] 의류 쇼핑몰 벤처 인증 성공 사례"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 text-xs font-bold bg-red-500 text-white px-3 py-1 rounded">
            SUCCESS
          </span>
        </div>

        <div className="p-6 flex flex-col min-h-[170px]">
          <p className="text-sm text-gray-400 mb-2">2024. 08. 19</p>
          <h3 className="font-bold text-blue-900 mb-3 leading-snug">
            [혁신성장형] 의류 쇼핑몰 벤처 인증 성공 사례
          </h3>
          <p className="text-sm text-gray-500 mt-auto">
            강남 의류 브랜드의 실제 인증 스토리
          </p>
        </div>
      </a>

      {/* Small card 2 */}
      <a
        href="https://blog.naver.com/eum63/223678577702"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl border bg-white overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
      >
        <div className="h-56 bg-gray-100 overflow-hidden">
          <img 
            src="/blog-card-6.jpg" 
            alt="벤처 인증 후 실제 혜택 정리"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex flex-col min-h-[170px]">
          <p className="text-sm text-gray-400 mb-2">2024. 09. 02</p>
          <h3 className="font-bold text-blue-900 mb-3 leading-snug">
            벤처 인증 후 실제 혜택 정리
          </h3>
          <p className="text-sm text-gray-500 mt-auto">
            기업 운영에 바로 적용되는 혜택
          </p>
        </div>
      </a>

      {/* BIG CARD */}
      <a
        href="https://blog.naver.com/eum63/223821907774"
        target="_blank"
        rel="noopener noreferrer"
        className="md:col-span-2 relative rounded-2xl overflow-hidden text-white p-12 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
        style={{ background: "linear-gradient(135deg, #1E2A8A 0%, #1B1E6D 100%)" }}
      >
        <div className="absolute top-10 right-10 text-white/20 text-[120px] font-extrabold">"</div>

        <div>
          <p className="text-sm font-semibold tracking-widest text-blue-200 mb-6">
            EXPERT COLUMN
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-6">
            벤처기업 인증심사 평가지표,
            <br />
            <span className="text-blue-300 underline underline-offset-4">
              100% 승인
            </span>{" "}
            받는 법
          </h3>
          <p className="text-sm leading-relaxed text-blue-100">
            심사위원이 보는 핵심 포인트는 따로 있습니다.
            <br />
            수석 컨설턴트가 직접 공개합니다.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
            엄
          </div>
          <div>
            <p className="text-sm font-semibold">엄현철 수석</p>
            <p className="text-xs text-blue-200">벤처메이커 전략기획팀</p>
          </div>
        </div>

        <div className="text-sm font-semibold mt-6">Read Column →</div>
      </a>
    </div>

    {/* ================= ROW 3 : 4 SAME CARDS ================= */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
      {[
        {
          date: "2024. 10. 10",
          title: "기업부설연구소 설립 요건 한 번에 정리",
          desc: "실무 기준으로 정리한 핵심 포인트",
          url: "https://blog.naver.com/eum63/223547687068",
          image: "/blog-card-7.jpg"
        },
        {
          date: "2024. 10. 11",
          title: "정책자금 심사에서 탈락하는 5가지 이유",
          desc: "실무 기준으로 정리한 핵심 포인트",
          url: "https://blog.naver.com/eum63/223618110844",
          image: "/blog-card-8.jpg"
        },
        {
          date: "2024. 10. 12",
          title: "스타트업 재무제표, 이것만은 꼭 보세요",
          desc: "실무 기준으로 정리한 핵심 포인트",
          url: "https://blog.naver.com/eum63/223571498802",
          image: "/blog-card-9.jpg"
        },
        {
          date: "2024. 10. 13",
          title: "벤처 인증 후 유지 관리 체크리스트",
          desc: "실무 기준으로 정리한 핵심 포인트",
          url: "https://blog.naver.com/eum63/223630048870",
          image: "/blog-card-10.jpg"
        },
      ].map((item, i) => (
        <a
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border bg-white overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
        >
          <div className="h-56 bg-gray-100 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col min-h-[170px]">
            <p className="text-sm text-gray-400 mb-2">{item.date}</p>
            <h3 className="font-bold text-blue-900 mb-3 leading-snug">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 mt-auto">
              {item.desc}
            </p>
          </div>
        </a>
      ))}
    </div>

    {/* CTA */}
    <div className="mt-16 text-center">
      <a
        href="/insights"
        className="inline-block px-10 py-4 border rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-300"
      >
        View All Insights
      </a>
    </div>
  </div>
</section>



      {/* ================= SECTION 4 : AI CONSULTING ================= */}
<section
  id="ai-consulting"
  className="py-24 bg-[#180D8A] relative overflow-hidden"
>
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start relative z-10">
    {/* LEFT COPY */}
    <div className="pt-10">
      <p className="text-blue-300 text-xs font-bold tracking-widest mb-4">
        POWERED BY VENTUREMAKER AI
      </p>
      <h2 className="text-4xl font-extrabold text-white mb-6">
        AI-Driven <br />
        <span className="text-blue-400">Growth Strategy</span>
      </h2>
      <p className="text-slate-300 mb-8 leading-relaxed">
        내 기업은 어떤 인증이 유리할까?
        <br />
        사업계획서 SWOT 분석은 어떻게 써야 할까?
        <br />
        <strong className="text-white">벤처메이커 AI</strong>가 즉시 해결합니다.
      </p>
      <ul className="space-y-3 text-slate-300">
        <li>• 기업 맞춤형 자금·인증 전략</li>
        <li>• R&D 연구 과제명 자동 생성</li>
        <li>• 전문 컨설턴트급 SWOT 분석</li>
      </ul>
    </div>

    {/* RIGHT CARD */}
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Tabs */}
      <div className="grid grid-cols-3 text-sm font-bold border-b">
        <button
          onClick={() => setActiveTab("strategy")}
          className={`py-4 ${
            activeTab === "strategy"
              ? "bg-orange-50 text-orange-600 border-b-2 border-orange-500"
              : "text-gray-400"
          }`}
        >
          종합 진단
        </button>
        <button
          onClick={() => setActiveTab("rnd")}
          className={`py-4 ${
            activeTab === "rnd"
              ? "bg-orange-50 text-orange-600 border-b-2 border-orange-500"
              : "text-gray-400"
          }`}
        >
          R&D 테마
        </button>
        <button
          onClick={() => setActiveTab("swot")}
          className={`py-4 ${
            activeTab === "swot"
              ? "bg-orange-50 text-orange-600 border-b-2 border-orange-500"
              : "text-gray-400"
          }`}
        >
          SWOT 분석
        </button>
      </div>

      {/* Content */}
      <div className="p-8 space-y-4">
        {/* 공통 기본 정보 */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="w-full border rounded px-4 py-3 text-gray-900 placeholder:text-gray-400"
            placeholder="신청자 성명"
          />
          <input
            className="w-full border rounded px-4 py-3 text-gray-900 placeholder:text-gray-400"
            placeholder="회사명"
          />
        </div>

        {activeTab === "swot" && (
          <>
            <div className="flex justify-between items-center pt-2">
              <h3 className="font-bold text-lg text-blue-900">
                AI SWOT 분석 생성기
              </h3>
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded font-bold">
                NEW
              </span>
            </div>

            <input
              className="w-full border rounded px-4 py-3 text-gray-900 placeholder:text-gray-400"
              placeholder="업종 / 아이템"
            />
            <input
              className="w-full border rounded px-4 py-3 text-gray-900 placeholder:text-gray-400"
              placeholder="우리만의 강점 (핵심 경쟁력)"
            />
            <input
              className="w-full border rounded px-4 py-3 text-gray-900 placeholder:text-gray-400"
              placeholder="전화번호 (예: 010-0000-0000)"
            />

            <button className="w-full bg-purple-600 text-white py-4 rounded font-bold mt-2">
              SWOT 분석표 생성하기
            </button>
          </>
        )}

        {activeTab === "rnd" && (
          <>
            <div className="flex justify-between items-center pt-2">
              <h3 className="font-bold text-lg text-blue-900">
                AI R&D 연구 과제 생성기
              </h3>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold">
                R&D
              </span>
            </div>

            <input
              className="w-full border rounded px-4 py-3 text-gray-900 placeholder:text-gray-400"
              placeholder="주력 제품 / 서비스"
            />
            <input
              className="w-full border rounded px-4 py-3 text-gray-900 placeholder:text-gray-400"
              placeholder="기술적 특징 (선택)"
            />
            <input
              className="w-full border rounded px-4 py-3 text-gray-900 placeholder:text-gray-400"
              placeholder="전화번호"
            />

            <button className="w-full bg-blue-600 text-white py-4 rounded font-bold mt-2">
              연구 과제명 생성하기
            </button>
          </>
        )}

        {activeTab === "strategy" && (
          <>
            <div className="flex justify-between items-center pt-2">
              <h3 className="font-bold text-lg text-blue-900">
                기업 성장 종합 진단
              </h3>
              <span className="border border-orange-500 text-orange-500 text-xs px-2 py-1 rounded font-bold">
                POPULAR
              </span>
            </div>

            <input
              className="w-full border rounded px-4 py-3 text-gray-900 placeholder:text-gray-400"
              placeholder="업종 / 아이템"
            />

            <div className="grid grid-cols-2 gap-4">
              <select className="border rounded px-4 py-3 text-gray-900">
                <option>기업 단계 선택</option>
                <option>예비창업</option>
                <option>초기기업</option>
                <option>성장기업</option>
              </select>
              <select className="border rounded px-4 py-3 text-gray-900">
                <option>연 매출 규모</option>
                <option>1억 미만</option>
                <option>1억 ~ 10억</option>
                <option>10억 이상</option>
              </select>
            </div>

            <input
              className="w-full border rounded px-4 py-3 text-gray-900 placeholder:text-gray-400"
              placeholder="현재 가장 큰 고민"
            />

            <button className="w-full bg-blue-900 text-white py-4 rounded font-bold mt-2">
              무료 전략 리포트 생성
            </button>
          </>
        )}
      </div>
    </div>
  </div>
</section>


      {/* ================= SECTION 5 : TRUSTED BY ================= */}
<section className="py-24 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Header */}
    <div className="text-center mb-14">
      <p className="text-sm font-semibold tracking-widest text-orange-500 mb-3">
        TRUSTED PARTNERS
      </p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
        벤처메이커와 함께한 기업
      </h2>
      <p className="text-gray-500 text-sm">
        다양한 산업의 중소·벤처 기업이 벤처메이커와 함께 성장하고 있습니다.
      </p>
    </div>

    {/* Logo Slider */}
    <div className="relative">
      {/* Left / Right Fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Sliding Track */}
      <div className="flex gap-16 animate-logo-slide whitespace-nowrap">
        {[...Array(2)].map((_, loopIndex) => (
          <div key={loopIndex} className="flex gap-16">
            {[...Array(10)].map((_, i) => (
              <div
                key={`${loopIndex}-${i}`}
                className="flex items-center justify-center min-w-[160px] h-20 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition"
              >
                <img
                  src={`/client-${i + 1}.png`}
                  alt={`Partner ${i + 1}`}
                  className="max-h-12 object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="mt-16 text-center">
      <a
        href="/partners"
        className="inline-flex items-center gap-2 px-10 py-4 border rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
      >
        전체 파트너 보기 →
      </a>
    </div>
  </div>

  {/* Animation */}
  <style jsx>{`
    @keyframes logo-slide {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .animate-logo-slide {
      animation: logo-slide 30s linear infinite;
    }
  `}</style>
</section>

{/* Footer */}
      <Footer />

    </main>
  );
}
   
