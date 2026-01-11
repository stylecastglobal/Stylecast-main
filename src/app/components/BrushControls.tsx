"use client";

import { useMakeupStore } from "../lib/store";

export default function BrushControls() {
  const {
    currentBrushSize,
    isErasing,
    brushStrokes,
    selectedMakeups,
    currentCategory,
    setBrushSize,
    setIsErasing,
    undoLastStroke,
    clearAllStrokes,
    clearStrokesByCategory,
  } = useMakeupStore();

  const currentMakeup = selectedMakeups.find((m) => m.category === currentCategory);

  return (
    <div className="space-y-4">
      {/* Brush Size Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-slate-700">
            Brush Size
          </label>
          <span className="text-sm font-bold text-slate-900 bg-white px-3 py-1 rounded-full border border-slate-200">
            {currentBrushSize}px
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          value={currentBrushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #64748b 0%, #64748b ${currentBrushSize}%, #e2e8f0 ${currentBrushSize}%, #e2e8f0 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>

      {/* Brush/Eraser Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setIsErasing(false)}
          className={`
            flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2
            ${
              !isErasing
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Brush
        </button>
        <button
          onClick={() => setIsErasing(true)}
          className={`
            flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2
            ${
              isErasing
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eraser
        </button>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={undoLastStroke}
          disabled={brushStrokes.length === 0}
          className="w-full px-4 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          Undo Last Stroke
        </button>

        {currentMakeup && (
          <button
            onClick={() => clearStrokesByCategory(currentMakeup.category)}
            disabled={brushStrokes.filter(s => s.category === currentMakeup.category).length === 0}
            className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear Current Layer
          </button>
        )}

        <button
          onClick={clearAllStrokes}
          disabled={brushStrokes.length === 0}
          className="w-full px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear All
        </button>
      </div>

      {/* Info */}
      {!currentMakeup && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>💡 Tip:</strong> Select a makeup product and shade below to start painting!
          </p>
        </div>
      )}

      {currentMakeup && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-sm text-emerald-900 mb-2">
            <strong>Current Color:</strong>
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg border-2 border-white shadow-sm"
              style={{ backgroundColor: currentMakeup.shade.hex }}
            />
            <div>
              <p className="font-semibold text-emerald-900">{currentMakeup.product.brand}</p>
              <p className="text-sm text-emerald-700">{currentMakeup.shade.name}</p>
              <p className="text-xs font-mono text-emerald-600">{currentMakeup.shade.hex}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stroke Count */}
      {brushStrokes.length > 0 && (
        <div className="text-center text-sm text-slate-600">
          Total strokes: <strong>{brushStrokes.length}</strong>
        </div>
      )}
    </div>
  );
}