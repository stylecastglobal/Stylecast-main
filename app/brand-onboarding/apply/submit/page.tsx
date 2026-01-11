"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion";
import Link from "next/link";

export default function ApplicationSubmitted() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sweepRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fade + Lift main block
    if (containerRef.current) {
      animate(
        containerRef.current,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 1.1, easing: "ease-out" }
      );
    }

    // Light sweep animation
    if (sweepRef.current) {
      animate(
        sweepRef.current,
        { x: ["-120%", "120%"] },
        { duration: 2.4, easing: "ease-out", delay: 0.4 }
      );
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black text-white flex items-center justify-center px-6 overflow-hidden">

      {/* BACKGROUND SUBTLE GLOW */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

      {/* LIGHT SWEEP */}
      <div
        ref={sweepRef}
        className="absolute top-0 left-0 w-[40%] h-full bg-white/5 blur-[80px] opacity-40 pointer-events-none"
      />

      {/* MAIN CONTENT */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center"
      >
        {/* GLASS PANEL */}
        <div className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.12] rounded-3xl px-10 py-20 shadow-[0_0_120px_rgba(255,255,255,0.06)]">

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
            Application Submitted
          </h1>

          <p className="text-white/70 leading-relaxed text-lg max-w-xl mx-auto mb-12">
            Thank you for applying to StyleCast.
            <br />
            Our team will carefully review your submission and contact you via email.
            <br />
            Please note that not all applications are approved.
          </p>

          {/* CTA BUTTON */}
          <Link
            href="/"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-black font-medium text-lg hover:bg-white/90 transition"
          >
            Return Home →
          </Link>
        </div>
      </div>

      {/* AMBIENT CORNER GLOWS */}
      <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-white/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[-10%] left-[5%] w-[300px] h-[300px] bg-white/3 blur-[120px] rounded-full pointer-events-none" />

    </main>
  );
}
