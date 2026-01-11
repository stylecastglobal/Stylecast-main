"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { PersonalColorResult } from "../../lib/types";

interface ResultStepProps {
  result: PersonalColorResult;
  onReset: () => void;
}

export default function ResultStep({ result, onReset }: ResultStepProps) {
  const { primaryTone, confidence, seasonalBreakdown } = result;

  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = "stylecast-personal-color.png";
      link.href = dataUrl;
      link.click();
    } catch (e) {
      alert("Download failed");
      console.error(e);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Personal Color",
          text: `My personal color is ${primaryTone.label}`,
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied");
    }
  };

  const makeupKeys: (keyof typeof primaryTone.palette.makeup)[] = [
    "lips",
    "blush",
    "contour",
    "highlight",
    "eyeshadow",
  ];

  const clothingKeys: (keyof typeof primaryTone.palette.clothing)[] = [
    "tops",
    "bottoms",
    "outerwear",
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ⬇️ ENTIRE RESULT PAGE CAPTURE TARGET */}
      <div ref={cardRef} className="max-w-5xl mx-auto px-4 py-12">

        {/* MAIN RESULT */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
              <span className="text-4xl">✨</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-light mb-4">
            {primaryTone.label}
          </h1>

          <p className="text-xl mb-2">
            {confidence}% match
          </p>

          <p className="max-w-2xl mx-auto">
            {primaryTone.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="px-6 py-2 bg-gray-100 rounded-full text-sm font-medium">
              {primaryTone.attributes.undertone === "warm" ? "Warm" : "Cool"}
            </span>
            <span className="px-6 py-2 bg-gray-100 rounded-full text-sm font-medium">
              {primaryTone.attributes.depth === "light"
                ? "Light"
                : primaryTone.attributes.depth === "deep"
                ? "Deep"
                : "Medium"}
            </span>
            <span className="px-6 py-2 bg-gray-100 rounded-full text-sm font-medium">
              {primaryTone.attributes.brightness === "bright"
                ? "Bright"
                : primaryTone.attributes.brightness === "soft"
                ? "Soft"
                : "Medium"}
            </span>
          </div>
        </div>

        {/* SEASONAL BREAKDOWN */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6 text-center">
            Your Seasonal Breakdown
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {seasonalBreakdown.map((item) => (
              <div key={item.season} className="flex items-center gap-4">
                <span className="w-24 text-sm text-right">
                  {item.season}
                </span>

                <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full flex items-center justify-end pr-4 text-white"
                    style={{ width: `${item.percentage}%` }}
                  >
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* MAKEUP PALETTE */}
        <h2 className="text-2xl font-light mb-6">
          Your Makeup Palette
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {makeupKeys.map((key) => (
            <div key={key}>
              <h3 className="text-lg font-medium mb-4 capitalize">
                {key}
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {primaryTone.palette.makeup[key].map((color, idx) => (
                  <div key={idx} className="text-center">
                    <div
                      className="w-16 h-16 mx-auto rounded-xl shadow-sm border border-gray-200 mb-2"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs">{color.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CLOTHING PALETTE */}
        <h2 className="text-2xl font-light text-center mb-10">
          Your Clothing Colors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {clothingKeys.map((key) => (
            <div key={key}>
              <h3 className="text-lg font-medium mb-4 capitalize">
                {key}
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {primaryTone.palette.clothing[key].map((color, idx) => (
                  <div key={idx} className="text-center">
                    <div
                      className="w-16 h-16 mx-auto rounded-xl shadow-sm border border-gray-200 mb-2"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs">{color.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AVOID COLORS */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-light mb-6">
            Colors to Avoid
          </h2>

          <p className="mb-6 max-w-2xl mx-auto">
            These colors may wash you out or clash with your natural tones.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {primaryTone.palette.avoid.map((color, idx) => (
              <div key={idx} className="flex flex-col items-center relative">
                <div
                  className="w-16 h-16 rounded-2xl shadow-md mb-2 border-2 border-gray-100"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-red-500 opacity-80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <span className="text-xs">{color.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CELEBRITY MATCHES */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-light mb-6">
            Celebrity Matches
          </h2>

          <p className="mb-8">
            These celebrities share your color season.
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Women</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {primaryTone.celebritiesWomen.map((name, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Men</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {primaryTone.celebritiesMen.map((name, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* ACTION BUTTONS (included in download by design) */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <button
            onClick={handleDownload}
            className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800"
          >
            Download My Color Card
          </button>

          <button
            onClick={handleShare}
            className="px-8 py-4 border-2 border-gray-300 rounded-full font-medium hover:bg-gray-50"
          >
            Share Results
          </button>

          <button
            onClick={onReset}
            className="px-8 py-4 border-2 border-gray-300 rounded-full font-medium hover:bg-gray-50"
          >
            Try Again
          </button>
        </div>

      </div>
    </div>
  );
}
