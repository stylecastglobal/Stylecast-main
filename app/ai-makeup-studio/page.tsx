"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ImageUpload from "../components/ImageUpload";
import BrushCanvas, { BrushCanvasRef } from "../components/BrushCanvas";
import BrushControls from "../components/BrushControls";
import ProductSelector from "../components/ProductSelector";
import SaveLook from "../components/SaveLook";
import { useMakeupStore } from "../lib/store";
import AutoTryOnCanvas from "../components/AutoTryOnCanvas";

export default function AIMakeupStudioPage() {
  const searchParams = useSearchParams();
  const {
    originalImage,
    currentStep,
    viewMode,
    setViewMode,
    applyMode,
    setApplyMode,
    setPreferredProductId,
  } = useMakeupStore();

  const canvasRef = useRef<BrushCanvasRef>(null);

  useEffect(() => {
    const productId = searchParams.get("productId");
    if (productId) {
      setPreferredProductId(productId);
    }
  }, [searchParams, setPreferredProductId]);

  const showBefore = () => setViewMode("before");
  const showAfter = () => setViewMode("after");

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-black">AI Makeup Studio</h1>
          <p className="text-black/60 mt-1">
            Paint makeup directly on your photo with precision.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {!originalImage ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-black mb-4">
                Try On Makeup Virtually
              </h2>
              <p className="text-xl text-black/60 max-w-2xl mx-auto">
                Upload your selfie and try makeup using real brand colors.
                Smooth, precise, and realistic.
              </p>
            </div>
            <ImageUpload />
          </div>
        ) : (
          <div className="grid lg:grid-cols-[2fr_380px] gap-6">
            <div className="space-y-6">
              <div className="relative">
                <button
                  className="absolute top-4 right-4 px-4 py-2 rounded-lg font-medium border bg-white/80 backdrop-blur border-black/20 z-20"
                  onMouseDown={showBefore}
                  onMouseUp={showAfter}
                  onMouseLeave={showAfter}
                  onTouchStart={showBefore}
                  onTouchEnd={showAfter}
                  onTouchCancel={showAfter}
                >
                  Hold to Preview Before
                </button>

                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-white border border-black/10">
                  {viewMode === "before" && (
                    <div className="absolute top-4 left-4 z-30 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
                      Viewing original photo. Release to return to editing.
                    </div>
                  )}

                  {viewMode === "before" && (
                    <img
                      src={originalImage}
                      alt="Before"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {viewMode === "after" &&
                    (applyMode === "auto" ? (
                      <AutoTryOnCanvas />
                    ) : (
                      <BrushCanvas ref={canvasRef} />
                    ))}
                </div>
              </div>

              {currentStep === "save" && <SaveLook />}
            </div>

            <div className="h-[80vh] overflow-y-auto pr-2 space-y-6">
              <div className="bg-white border border-black/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">Apply Mode</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setApplyMode("auto")}
                    className={`flex-1 py-3 rounded-lg font-semibold ${
                      applyMode === "auto"
                        ? "bg-black text-white"
                        : "border border-gray-300 text-gray-700"
                    }`}
                  >
                    Auto
                  </button>
                  <button
                    onClick={() => setApplyMode("manual")}
                    className={`flex-1 py-3 rounded-lg font-semibold ${
                      applyMode === "manual"
                        ? "bg-black text-white"
                        : "border border-gray-300 text-gray-700"
                    }`}
                  >
                    Manual
                  </button>
                </div>
              </div>

              <div className="bg-white border border-black/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">
                  Brush Tools
                </h3>
                <BrushControls />
              </div>

              <div className="bg-white border border-black/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">
                  Select Color
                </h3>
                <ProductSelector />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
