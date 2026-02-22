"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutfitBuilderStore } from "../../lib/outfit-builder-store";
import { extractFeaturesFromSelfie } from "../../lib/avatar/featureExtractor";
import BodyTypeSelector from "./BodyTypeSelector";
import type { AvatarGender } from "../../types/outfit-builder";

const STEP_TITLES: Record<string, string> = {
  selfie: "Upload a Selfie",
  height: "Your Height",
  bodyType: "Select Body Type",
};

const STEP_SUBTITLES: Record<string, string> = {
  selfie: "We'll extract your skin tone and hair color — nothing else.",
  height: "Used to set avatar proportions.",
  bodyType: "Choose the silhouette that best represents you.",
};

export default function AvatarSetupFlow() {
  const {
    setupStep,
    setSetupStep,
    selfieFile,
    setSelfieFile,
    gender,
    setGender,
    height,
    setHeight,
    bodyType,
    setBodyType,
    setFeatures,
    isExtracting,
    setIsExtracting,
    finalizeAvatar,
  } = useOutfitBuilderStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Selfie handling ────────────────────────────────────────────
  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image (JPG, PNG).");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Image must be under 10 MB.");
        return;
      }

      setError(null);
      setSelfieFile(file);

      // Preview
      const url = URL.createObjectURL(file);
      setSelfiePreview(url);

      // Extract features
      setIsExtracting(true);
      try {
        const features = await extractFeaturesFromSelfie(file);
        setFeatures(features);
      } catch {
        setError("Could not analyze the photo. Try a clearer selfie.");
      } finally {
        setIsExtracting(false);
      }
    },
    [setSelfieFile, setFeatures, setIsExtracting]
  );

  const handleNext = () => {
    if (setupStep === "selfie") setSetupStep("height");
    else if (setupStep === "height") setSetupStep("bodyType");
    else if (setupStep === "bodyType") {
      finalizeAvatar();
    }
  };

  const handleBack = () => {
    if (setupStep === "height") setSetupStep("selfie");
    else if (setupStep === "bodyType") setSetupStep("height");
  };

  const canProceed =
    (setupStep === "selfie" && selfieFile && !isExtracting) ||
    setupStep === "height" ||
    setupStep === "bodyType";

  if (setupStep === "done") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          {/* Step indicator */}
          <div className="flex gap-2 mb-6">
            {["selfie", "height", "bodyType"].map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  ["selfie", "height", "bodyType"].indexOf(setupStep) >= i
                    ? "bg-black"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <h2 className="text-2xl font-semibold">{STEP_TITLES[setupStep]}</h2>
          <p className="text-sm text-gray-500 mt-1">{STEP_SUBTITLES[setupStep]}</p>
        </div>

        {/* Body */}
        <div className="px-8 pb-6 min-h-[280px]">
          <AnimatePresence mode="wait">
            {/* ── Step 1: Selfie ─────────────────────────────── */}
            {setupStep === "selfie" && (
              <motion.div
                key="selfie"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* Gender toggle */}
                <div className="flex gap-2">
                  {(["female", "male"] as AvatarGender[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                        gender === g
                          ? "border-black bg-black text-white"
                          : "border-gray-200 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Upload area */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {selfiePreview ? (
                  <div className="relative w-full aspect-[3/4] max-h-[260px] rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={selfiePreview}
                      alt="Selfie preview"
                      fill
                      className="object-cover"
                    />
                    {isExtracting && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs text-gray-600">Analyzing colors…</span>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-3 right-3 bg-white/90 text-xs px-3 py-1.5 rounded-full hover:bg-white transition"
                    >
                      Retake
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-[3/4] max-h-[260px] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 hover:border-gray-400 transition"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-500">
                      Tap to upload a front-facing selfie
                    </span>
                  </button>
                )}

                {error && (
                  <p className="text-xs text-red-500">{error}</p>
                )}

                <p className="text-[11px] text-gray-400 text-center">
                  Your photo is used only to create a stylized avatar and is never shared.
                </p>
              </motion.div>
            )}

            {/* ── Step 2: Height ─────────────────────────────── */}
            {setupStep === "height" && (
              <motion.div
                key="height"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 pt-4"
              >
                <div className="flex items-end justify-center gap-4">
                  <span className="text-6xl font-light tabular-nums">{height}</span>
                  <span className="text-lg text-gray-400 mb-2">cm</span>
                </div>

                <input
                  type="range"
                  min={140}
                  max={200}
                  step={1}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-black"
                />

                <div className="flex justify-between text-xs text-gray-400">
                  <span>140 cm</span>
                  <span>200 cm</span>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Body Type ──────────────────────────── */}
            {setupStep === "bodyType" && (
              <motion.div
                key="bodyType"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="pt-4"
              >
                <BodyTypeSelector value={bodyType} onChange={setBodyType} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex gap-3">
          {setupStep !== "selfie" && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${
              canProceed
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {setupStep === "bodyType" ? "Create Avatar" : "Next"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
