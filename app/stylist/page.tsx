"use client";

import { useState, useEffect } from "react";

export default function StylistPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const beforeAfterExamples = [
    {
      name: "Seoungmin",
      age: "20s · Student",
      service: "Hair balance improvement",
      beforeColor: "bg-pink-500",
      afterColor: "bg-cyan-400"
    },
    {
      name: "Seolin",
      age: "20s · Actor",
      service: "Facial proportion alignment",
      beforeColor: "bg-purple-500",
      afterColor: "bg-blue-400"
    },
    {
      name: "Minjee",
      age: "30s · Office",
      service: "Makeup harmony refinement",
      beforeColor: "bg-orange-500",
      afterColor: "bg-teal-400"
    }
  ];

  const consultingServices = [
    {
      title: "Makeup Guidance",
      description:
        "Learn which makeup techniques and product directions enhance your facial balance.",
      features: [
        "Face structure interpretation",
        "Color direction guidance",
        "Product type suggestions",
        "Application logic"
      ],
      price: "Included"
    },
    {
      title: "Fashion Guidance",
      description:
        "Understand silhouettes and proportions that work best for your body structure.",
      features: [
        "Body proportion understanding",
        "Silhouette recommendations",
        "Wardrobe direction",
        "Smarter shopping decisions"
      ],
      price: "Included"
    },
    {
      title: "Hair Guidance",
      description:
        "Discover haircut lengths, volume, and color directions that suit your face.",
      features: [
        "Face shape interpretation",
        "Hairstyle direction",
        "Color tone guidance",
        "Styling balance tips"
      ],
      price: "Included"
    }
  ];

  const tiktokPosts = [
    { id: 1, thumbnail: "/tiktok-1.jpg", title: "Style Balance Tips", views: "1.2M" },
    { id: 2, thumbnail: "/tiktok-2.jpg", title: "Makeup Logic Explained", views: "890K" },
    { id: 3, thumbnail: "/tiktok-3.jpg", title: "Hair Proportion Fix", views: "2.1M" },
    { id: 4, thumbnail: "/tiktok-4.jpg", title: "Outfit Structure Guide", views: "750K" }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Set your context",
      description: "Tell Stylist your goals, situation, or everyday needs."
    },
    {
      number: "02",
      title: "Structural understanding",
      description: "Stylist interprets proportions, balance, and overall impression."
    },
    {
      number: "03",
      title: "Reasoned guidance",
      description: "Recommendations are paired with clear explanations."
    },
    {
      number: "04",
      title: "Confident decisions",
      description: "You shop knowing exactly why something works for you."
    }
  ];

  const faqs = [
    {
      question: "Is Stylist a paid consulting service?",
      answer:
        "No. Stylist is a built-in StyleCast feature designed to guide better shopping decisions."
    },
    {
      question: "Do I need to upload photos?",
      answer:
        "Photos are optional. Stylist can also work from preferences and context."
    },
    {
      question: "Does Stylist follow trends?",
      answer:
        "Stylist focuses on suitability and balance, not short-term trends."
    }
  ];

  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % beforeAfterExamples.length);

  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + beforeAfterExamples.length) % beforeAfterExamples.length);

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ================= HERO ================= */}
      <section
        id="overview"
        className="max-w-7xl mx-auto px-8 pt-28 pb-20"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="uppercase tracking-widest text-sm mb-4">
              StyleCast Stylist
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Built-in style guidance
              <br />
              for confident shopping
            </h1>
            <p className="text-lg text-neutral-800 mb-8">
              Stylist helps you understand what suits you and why —
              so every choice feels intentional, not random.
            </p>
            <button className="px-8 py-4 bg-black text-white rounded-full hover:scale-105 transition-transform">
              Start with Stylist
            </button>
          </div>

          <img
            src="/stylist-hero.jpg"
            alt="Stylist hero"
            className="w-full rounded-3xl object-cover hover:scale-[1.02] transition-transform duration-700"
          />
        </div>
      </section>

      {/* ================= TIKTOK ================= */}
<section id="tiktok" className="max-w-7xl mx-auto px-8 py-24">
  {/* Section header */}
  <div className="text-center mb-16">
    <h2 className="text-4xl font-bold mb-4">
      See Stylist thinking in action
    </h2>
    <p className="text-lg text-neutral-800">
      Real explanations, real improvements
    </p>
  </div>

  {/* Cards */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {tiktokPosts.map((post, index) => (
      <div
        key={post.id}
        className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
        style={{
          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
        }}
      >
        {/* Card */}
        <div className="bg-white border border-black rounded-2xl p-3">
          {/* Video frame */}
          <div className="relative aspect-[9/16] border border-dashed border-black rounded-xl flex items-center justify-center">
            {/* Play indicator */}
            <div className="opacity-70 group-hover:opacity-100 transition text-sm font-medium">
              Play
            </div>
          </div>
        </div>

        {/* Meta */}
        <p className="mt-4 font-semibold">{post.title}</p>
        <p className="text-sm text-neutral-700">{post.views} views</p>
      </div>
    ))}
  </div>
</section>


      {/* ================= RESULTS ================= */}
      <section id="results" className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-8 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Alignment over transformation
          </h2>
          <p className="text-gray-300">
            Small changes, clearer balance
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-8">
          <div className="flex justify-between mb-8">
            <button onClick={prevSlide}>‹</button>
            <button onClick={nextSlide}>›</button>
          </div>

          <div className="text-center">
            <p className="text-2xl font-semibold">
              {beforeAfterExamples[activeSlide].name}
            </p>
            <p className="text-gray-400">
              {beforeAfterExamples[activeSlide].age} ·{" "}
              {beforeAfterExamples[activeSlide].service}
            </p>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            What Stylist helps with
          </h2>
          <p className="text-lg text-neutral-800">
            Guidance across beauty, fashion, and hair
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {consultingServices.map((service, index) => (
            <div
              key={index}
              className="p-8 border border-neutral-300 rounded-3xl hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-bold mb-4">
                {service.title}
              </h3>
              <p className="text-neutral-800 mb-6">
                {service.description}
              </p>
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2">
                    ✓ <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="font-semibold">{service.price}</p>
            </div>
          ))}
        </div>
      </section>
기본 정보 제출, 제품 정보 검수, 입점 승인 절차 운영
      {/* ================= PROCESS ================= */}
      <section id="process" className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-8 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How Stylist works
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white text-black flex items-center justify-center font-bold">
                {step.number}
              </div>
              <h3 className="font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="max-w-4xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Questions about Stylist
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-neutral-300 rounded-2xl">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-6 text-left flex justify-between"
              >
                <span className="font-semibold">{faq.question}</span>
                <span>{openFaq === index ? "−" : "+"}</span>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-neutral-800">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Shop with clarity, not guesswork
        </h2>
        <p className="text-gray-300 mb-8">
          Stylist is always there when you need guidance.
        </p>
        <button className="px-10 py-4 bg-white text-black rounded-full hover:scale-105 transition-transform">
          Use Stylist
        </button>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
