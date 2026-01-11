"use client";

import { useRef } from "react";
import ImageUpload from "../components/ImageUpload";
import BrushCanvas, { BrushCanvasRef } from "../components/BrushCanvas";
import BrushControls from "../components/BrushControls";
import ProductSelector from "../components/ProductSelector";
import SaveLook from "../components/SaveLook";
import { useMakeupStore } from "../lib/store";

export default function AIMakeupStudioPage() {
  const { originalImage, currentStep, viewMode, setViewMode } = useMakeupStore();
  const canvasRef = useRef<BrushCanvasRef>(null);

  // Long-press handlers
  const showBefore = () => setViewMode("before");
  const showAfter = () => setViewMode("after");

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Header */}
      <header className="border-b border-black/10 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-black">AI Makeup Studio</h1>
          <p className="text-black/60 mt-1">
            Paint makeup directly on your photo with precision.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* No image uploaded yet */}
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

            {/* LEFT — Canvas + Long Press Preview */}
            <div className="space-y-6">
              <div className="relative">

                {/* Long-press button (Before Preview) */}
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

                {/* IMAGE AREA */}
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-white border border-black/10">

                  {/* Instruction — visible only in Before mode */}
                  {viewMode === "before" && (
                    <div className="absolute top-4 left-4 z-30 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
                      Viewing original photo.  
                      Release to return to editing.
                    </div>
                  )}

                  {/* BEFORE MODE */}
                  {viewMode === "before" && (
                    <img
                      src={originalImage}
                      alt="Before"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {/* AFTER MODE (Canvas) */}
                  {viewMode === "after" && (
                    <BrushCanvas ref={canvasRef} />
                  )}
                </div>
              </div>

              {currentStep === "save" && <SaveLook />}
            </div>

            {/* RIGHT PANEL */}
            <div className="h-[80vh] overflow-y-auto pr-2 space-y-6">

              {/* Brush Tools */}
              <div className="bg-white border border-black/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">Brush Tools</h3>
                <BrushControls />
              </div>

              {/* Product Selector */}
              <div className="bg-white border border-black/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">Select Color</h3>
                <ProductSelector />
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
