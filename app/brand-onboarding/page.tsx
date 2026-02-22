"use client";

import { useEffect, useRef, useState } from "react";
import { animate, inView } from "motion";

/* ============================================================
   MOTION ONE — UTILITY ANIMATORS
============================================================ */

function fadeLift(el: HTMLElement, delay = 0) {
  animate(
    el,
    { opacity: [0, 1], y: [20, 0] },
    { duration: 0.9, delay, easing: "ease-out" }
  );
}

function depthLift(el: HTMLElement) {
  animate(
    el,
    {
      opacity: [0, 1],
      y: [24, 0],
      scale: [0.94, 1],
      filter: ["blur(14px)", "blur(0px)"],
    },
    { duration: 1.2, easing: "ease-out" }
  );
}

function blobDrift(el: HTMLElement, duration = 20) {
  animate(
    el,
    {
      x: ["-12px", "14px", "-12px"],
      y: ["-12px", "12px", "-12px"],
      scale: [1, 1.04, 1],
    },
    { duration, easing: "ease-in-out", repeat: Infinity }
  );
}

function progressFill(el: HTMLElement) {
  animate(el, { width: ["0%", "100%"] }, { duration: 2.4, easing: "ease-out" });
}

/* ============================================================
   PAGE COMPONENT
============================================================ */

export default function BrandOnboardingPage() {
  /* MODAL */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const openModal = (title: string) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  /* HERO refs */
  const heroTitle = useRef<HTMLHeadingElement | null>(null);
  const heroText = useRef<HTMLParagraphElement | null>(null);
  const heroBtn = useRef<HTMLAnchorElement | null>(null);

  /* BLOBS */
  const b1 = useRef<HTMLDivElement | null>(null);
  const b2 = useRef<HTMLDivElement | null>(null);
  const b3 = useRef<HTMLDivElement | null>(null);
  const b4 = useRef<HTMLDivElement | null>(null);
  const b5 = useRef<HTMLDivElement | null>(null);

  /* CAMERA FLASH — alternating left/right */
  const flashLeft = useRef<HTMLDivElement | null>(null);
  const flashRight = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /* Hero reveals */
    heroTitle.current && depthLift(heroTitle.current);
    heroText.current && fadeLift(heroText.current, 0.15);
    heroBtn.current && fadeLift(heroBtn.current, 0.25);

    /* Blob drifts */
    b1.current && blobDrift(b1.current, 22);
    b2.current && blobDrift(b2.current, 24);
    b3.current && blobDrift(b3.current, 28);
    b4.current && blobDrift(b4.current, 18);
    b5.current && blobDrift(b5.current, 32);

    /* Scroll reveal for all sections */
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      inView(el, () => fadeLift(el as HTMLElement), { margin: "-10% 0px" });
    });

    /* Progress bar */
    const pb = document.getElementById("progress-bar");
    if (pb) {
      inView(pb, () => progressFill(pb), { margin: "-10% 0px" });
    }

    /* Camera flashes */
    const loopFlash = () => {
      if (flashLeft.current) {
        animate(
          flashLeft.current,
          { opacity: [0, 0.4, 0] },
          { duration: 1.8, easing: "ease-out" }
        );
      }
      setTimeout(() => {
        if (flashRight.current) {
          animate(
            flashRight.current,
            { opacity: [0, 0.4, 0] },
            { duration: 1.8, easing: "ease-out" }
          );
        }
      }, 900);
    };

    loopFlash();
    const interval = setInterval(loopFlash, 1800);

    return () => clearInterval(interval);
  }, []);

  /* ============================================================
     RETURN — ★ THE FULL PAGE ★
  ============================================================ */

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* ============================================================
            BACKGROUND BLOBS
      ============================================================ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div
          ref={b1}
          className="absolute top-[8%] left-[12%] w-[600px] h-[600px] rounded-full 
                     bg-white/10 blur-[140px]"
        />
        <div
          ref={b2}
          className="absolute top-[40%] left-[65%] w-[380px] h-[380px] rounded-full 
                     bg-white/8 blur-[120px]"
        />
        <div
          ref={b3}
          className="absolute top-[58%] left-[30%] w-[720px] h-[260px] rounded-[50%] 
                     bg-white/7 blur-[150px]"
        />
        <div
          ref={b4}
          className="absolute top-[25%] left-[78%] w-[180px] h-[180px] rounded-full 
                     bg-white/10 blur-[90px]"
        />
        <div
          ref={b5}
          className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 
                     w-[90vw] h-[50vw] rounded-full bg-white/5 blur-[200px]"
        />
      </div>

      {/* ============================================================
            CAMERA FLASH LEFT / RIGHT
      ============================================================ */}
      <div
        ref={flashLeft}
        className="pointer-events-none fixed top-1/2 left-0 w-[80px] h-[200px] 
                   bg-white/40 blur-[40px] opacity-0"
      />
      <div
        ref={flashRight}
        className="pointer-events-none fixed top-1/2 right-0 w-[80px] h-[200px] 
                   bg-white/40 blur-[40px] opacity-0"
      />

      {/* ============================================================
      HERO — UPGRADED VISIONOS CINEMATIC
============================================================ */}
<section className="relative flex flex-col items-center justify-center 
                    min-h-[90vh] text-center px-6 pt-32">

  {/* Soft radial spotlight behind hero */}
  <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-[900px] h-[900px] rounded-full 
               bg-white/5 blur-[200px] opacity-70 pointer-events-none"
  />

  {/* Thin chromatic ring for Apple-style depth */}
  <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-[780px] h-[780px] rounded-full 
               bg-gradient-to-r from-white/40 via-white/10 to-white/40
               blur-[90px] opacity-40 pointer-events-none"
  />

  {/* HERO CONTENT */}
  <div
    ref={heroTitle}
    className="relative flex flex-col items-center"
    style={{ willChange: "transform, opacity" }}
  >
    <p className="uppercase tracking-[0.30em] text-white/70 text-xs mb-5">
      BRAND PARTNERSHIPS
    </p>

    <h1
      className="text-6xl md:text-[70px] font-semibold leading-[1.05]
                 bg-gradient-to-b from-white to-neutral-300 
                 bg-clip-text text-transparent max-w-[960px] mx-auto"
    >
      StyleCast Brand Partners
    </h1>

    <p
      ref={heroText}
      className="text-white/75 mt-7 text-xl max-w-[700px] mx-auto leading-relaxed"
    >
      A premium discovery environment where emerging brands are presented through
      editorial-level storytelling, immersive design, and intentional curation.
    </p>

    <a
  href="/brand-onboarding/apply"
  className="inline-flex items-center mt-10 px-10 py-4 rounded-full 
             bg-white text-black font-medium border border-white/20 
             hover:bg-white/90 transition"
>
  Apply to StyleCast →
</a>

  </div>
</section>

      {/* ============================================================
            WHAT IS STYLECAST
      ============================================================ */}
      <section data-reveal className="py-32 text-center max-w-[880px] mx-auto px-6">
        <p className="uppercase tracking-[0.26em] text-white/60 text-xs mb-4">
          What is StyleCast
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          StyleCast is not a mass marketplace.
        </h2>

        <p className="text-white/70 max-w-[620px] mx-auto">
          Every brand is intentionally selected and presented with premium visual
          design — never algorithmic clutter.
        </p>
      </section>

      {/* ============================================================
            WHO WE WORK WITH
      ============================================================ */}
      <section data-reveal className="py-32 text-center max-w-[880px] mx-auto px-6">
        <p className="uppercase tracking-[0.26em] text-white/60 text-xs mb-4">
          Who we work with
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mb-10">
          StyleCast works best with brands that:
        </h2>

        <ul className="space-y-4 text-white/80 max-w-[620px] mx-auto text-left">
          {[
            "Independently owned micro brands",
            "Clear aesthetic or design language",
            "Products that can be styled or curated",
            "Long-term brand vision",
          ].map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-2 h-2 bg-white rounded-full mt-1.5" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* ============================================================
      SECTION: BENEFITS — 2×2 GRID (VisionOS Glass)
============================================================ */}
<section
  data-reveal
  className="py-32 px-6 text-center max-w-[1000px] mx-auto"
>
  <p className="uppercase tracking-[0.24em] text-white/60 text-xs mb-3">
    FOR SELECTED PARTNERS
  </p>

  <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-16">
    What selected brands receive
  </h2>

  {/* 2×2 GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* CARD 1 */}
    <button
      data-reveal
      className="group bg-white/5 border border-white/10 backdrop-blur-xl 
                 rounded-2xl p-8 text-left transition-all duration-300
                 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
    >
      <h4 className="text-lg font-semibold mb-2">Dedicated brand space</h4>
      <p className="text-white/70 text-sm leading-relaxed mb-3">
        Designed to feel immersive, focused, and narrative-driven.
      </p>
      <span className="text-white/60 text-sm group-hover:text-white/80 transition">
        Preview inside StyleCast →
      </span>
    </button>

    {/* CARD 2 */}
    <button
      data-reveal
      className="group bg-white/5 border border-white/10 backdrop-blur-xl 
                 rounded-2xl p-8 text-left transition-all duration-300
                 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
    >
      <h4 className="text-lg font-semibold mb-2">Editorial presentation</h4>
      <p className="text-white/70 text-sm leading-relaxed mb-3">
        Layouts inspired by premium magazines and modern digital design.
      </p>
      <span className="text-white/60 text-sm group-hover:text-white/80 transition">
        Preview inside StyleCast →
      </span>
    </button>

    {/* CARD 3 */}
    <button
      data-reveal
      className="group bg-white/5 border border-white/10 backdrop-blur-xl 
                 rounded-2xl p-8 text-left transition-all duration-300
                 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
    >
      <h4 className="text-lg font-semibold mb-2">Curation assistance</h4>
      <p className="text-white/70 text-sm leading-relaxed mb-3">
        Manual or smart automated curation as your brand grows.
      </p>
      <span className="text-white/60 text-sm group-hover:text-white/80 transition">
        Preview inside StyleCast →
      </span>
    </button>

    {/* CARD 4 */}
    <button
      data-reveal
      className="group bg-white/5 border border-white/10 backdrop-blur-xl 
                 rounded-2xl p-8 text-left transition-all duration-300
                 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
    >
      <h4 className="text-lg font-semibold mb-2">Discovery-driven audience</h4>
      <p className="text-white/70 text-sm leading-relaxed mb-3">
        Users browse with intention — not lowest-price filters.
      </p>
      <span className="text-white/60 text-sm group-hover:text-white/80 transition">
        Preview inside StyleCast →
      </span>
    </button>
  </div>
</section>


      {/* ============================================================
            TIMELINE
      ============================================================ */}
      <section data-reveal className="py-32 text-center max-w-[880px] mx-auto px-6">
        <p className="uppercase tracking-[0.26em] text-white/60 text-xs mb-3">
          Onboarding Process
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          How brand onboarding works
        </h2>

        <p className="text-white/70 max-w-[620px] mx-auto mb-16">
          All applications are manually reviewed by our team.
        </p>

        <div className="relative max-w-[880px] mx-auto mt-10">
          <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-white/20" />

          <div
            id="progress-bar"
            className="absolute top-[22px] left-0 h-[2px] bg-white w-[0%]"
          />

          <div className="grid grid-cols-6 text-center mt-10">
            {[
              "Application Submission",
              "Internal Review",
              "Interview",
              "Final Approval",
              "Contract",
              "Brand Dashboard Access",
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 blur-xl rounded-full opacity-60" />
                  <div className="relative w-10 h-10 rounded-full border border-white/40 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <p className="text-white/70 text-xs w-[90px]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      COMMISSION STRUCTURE
============================================================ */}
<section
  data-reveal
  className="py-32 px-6 text-center max-w-[880px] mx-auto"
>
  <p className="uppercase tracking-[0.26em] text-white/60 text-xs mb-3">
    Commission Structure
  </p>

  <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
    There is no entrance or listing fee.
  </h2>

  <p className="text-white/80 text-base max-w-[620px] mx-auto leading-relaxed mb-3">
    StyleCast operates on a performance-based commission model.
  </p>

  <p className="text-white/60 text-base max-w-[620px] mx-auto leading-relaxed">
    Commission details are shared transparently with approved brand partners.
  </p>
</section>


     

      {/* ============================================================
            VISIONOS MODAL — PURE GLASS (Option A)
      ============================================================ */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-white/5 backdrop-blur-2xl flex items-center justify-center 
                     z-[200] p-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative bg-white/10 rounded-3xl border border-white/20 
                       backdrop-blur-3xl p-10 max-w-[900px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold mb-6">{modalTitle}</h3>

            {/* 16:9 Placeholder */}
            <div className="w-full aspect-video rounded-2xl bg-white/10 border border-white/20 
                            backdrop-blur-xl flex items-center justify-center text-white/60">
              16:9 Preview Area
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
