'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Check, ChevronDown, Search, Sparkles } from 'lucide-react';
import { ProductContext, Undertone, ShadeMatchResult, LABColor } from '@/lib/tryon/types';
import { rgbToLAB, sampleCanvasColor, rgbToHex, classifyUndertone } from '@/lib/tryon/color-lab';
import { findMatchingShades } from '@/lib/tryon/shade-index';
import { detectFace, getCheekCenter } from '@/lib/tryon/facemesh-loader';
import SelfieInput from './SelfieInput';

interface ShadeFinderProps {
  product: ProductContext;
  onTryOn: (shade: { name: string; hex: string }) => void;
  onClose: () => void;
}

type Step = 'selfie' | 'picker' | 'results';

export default function ShadeFinder({ product, onTryOn, onClose }: ShadeFinderProps) {
  const [step, setStep] = useState<Step>('selfie');
  const [selfieUrl, setSelfieUrl] = useState<string | null>(null);

  // Color picker state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reticlePos, setReticlePos] = useState<{ x: number; y: number } | null>(null);
  const [sampledColor, setSampledColor] = useState<string | null>(null);
  const [sampledPoints, setSampledPoints] = useState<[number, number, number][]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const scaleRef = useRef({ sx: 1, sy: 1 });

  // Undertone state
  const [autoUndertone, setAutoUndertone] = useState<Undertone>('Neutral');
  const [selectedUndertone, setSelectedUndertone] = useState<Undertone | null>(null);
  const [showUndertoneDropdown, setShowUndertoneDropdown] = useState(false);

  // Previous shade input
  const [previousShade, setPreviousShade] = useState('');

  // Results state
  const [results, setResults] = useState<ShadeMatchResult[]>([]);
  const [betterMatches, setBetterMatches] = useState<ShadeMatchResult[]>([]);
  const [filterBrand, setFilterBrand] = useState('');
  const [filterFinish, setFilterFinish] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveUndertone = selectedUndertone ?? autoUndertone;

  // Load selfie onto canvas
  const loadSelfieToCanvas = useCallback(async (url: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      imgRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const scale = Math.min(window.innerWidth * 0.9 / img.width, (window.innerHeight * 0.55) / img.height, 1);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);

      // Try to position reticle on cheek via FaceMesh
      try {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = w;
        tempCanvas.height = h;
        const tempCtx = tempCanvas.getContext('2d')!;
        tempCtx.drawImage(img, 0, 0, w, h);

        const landmarks = await detectFace(tempCanvas);
        if (landmarks) {
          const scaledLandmarks = { ...landmarks, width: w, height: h };
          const cheek = getCheekCenter(scaledLandmarks);
          setReticlePos({ x: cheek.x, y: cheek.y });
          updateSampledColor(cheek.x, cheek.y);
          return;
        }
      } catch {
        // Fall through to center
      }

      // Default: center of image
      setReticlePos({ x: w / 2, y: h / 2 });
      updateSampledColor(w / 2, h / 2);
    };
    img.src = url;
  }, []);

  useEffect(() => {
    if (step === 'picker' && selfieUrl) {
      loadSelfieToCanvas(selfieUrl);
    }
  }, [step, selfieUrl, loadSelfieToCanvas]);

  const updateSampledColor = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const [r, g, b] = sampleCanvasColor(ctx, x, y, 10);
    setSampledColor(rgbToHex(r, g, b));
  };

  // Pointer handlers for reticle dragging
  const getCanvasPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    scaleRef.current = {
      sx: canvasRef.current!.width / rect.width,
      sy: canvasRef.current!.height / rect.height,
    };
    return {
      x: (e.clientX - rect.left) * scaleRef.current.sx,
      y: (e.clientY - rect.top) * scaleRef.current.sy,
    };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const pos = getCanvasPos(e);
    setReticlePos(pos);
    updateSampledColor(pos.x, pos.y);
    setIsDragging(true);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const pos = getCanvasPos(e);
    setReticlePos(pos);
    updateSampledColor(pos.x, pos.y);
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  // Confirm a sample point (up to 3)
  const addSamplePoint = () => {
    if (!sampledColor || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const pos = reticlePos ?? { x: canvas.width / 2, y: canvas.height / 2 };
    const [r, g, b] = sampleCanvasColor(ctx, pos.x, pos.y, 10);
    const newPoints = [...sampledPoints, [r, g, b] as [number, number, number]];
    if (newPoints.length > 3) newPoints.shift();
    setSampledPoints(newPoints);
  };

  // Confirm and run KNN
  const confirmAndMatch = () => {
    if (!sampledColor && sampledPoints.length === 0) return;
    setLoading(true);
    setError(null);

    // Average all sampled points, or use current reticle color
    let avgR: number, avgG: number, avgB: number;
    if (sampledPoints.length > 0) {
      avgR = Math.round(sampledPoints.reduce((s, p) => s + p[0], 0) / sampledPoints.length);
      avgG = Math.round(sampledPoints.reduce((s, p) => s + p[1], 0) / sampledPoints.length);
      avgB = Math.round(sampledPoints.reduce((s, p) => s + p[2], 0) / sampledPoints.length);
    } else {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      const pos = reticlePos ?? { x: canvas.width / 2, y: canvas.height / 2 };
      [avgR, avgG, avgB] = sampleCanvasColor(ctx, pos.x, pos.y, 10);
    }

    const skinLAB = rgbToLAB(avgR, avgG, avgB);
    const undertone = classifyUndertone(skinLAB);
    setAutoUndertone(undertone);

    // Run KNN
    const matches = findMatchingShades(skinLAB, {
      topK: 5,
      maxTotal: 15,
      categories: ['Foundation', 'Concealer', 'Cushion Foundation'],
      boostShadeName: previousShade || undefined,
    });

    if (matches.length === 0) {
      setError('No shades matched in our database. Try adjusting your sampled tone.');
      setLoading(false);
      return;
    }

    setResults(matches);

    // Find "better matches" — shades from other brands scoring 5+ points higher than scanned product's best
    const scannedBrandBest = matches
      .filter(m => m.brand.toLowerCase() === product.brand.toLowerCase())
      .sort((a, b) => b.matchPercent - a.matchPercent)[0];

    if (scannedBrandBest) {
      const better = matches
        .filter(m =>
          m.brand.toLowerCase() !== product.brand.toLowerCase() &&
          m.matchPercent >= scannedBrandBest.matchPercent + 5
        )
        .slice(0, 3);
      setBetterMatches(better);
    }

    setStep('results');
    setLoading(false);
  };

  // Filter results (no re-run of KNN)
  const filteredResults = results.filter(r => {
    if (filterBrand && r.brand.toLowerCase() !== filterBrand.toLowerCase()) return false;
    if (filterFinish && r.finish.toLowerCase() !== filterFinish.toLowerCase()) return false;
    return true;
  });

  const uniqueBrands = [...new Set(results.map(r => r.brand))];
  const uniqueFinishes = [...new Set(results.map(r => r.finish))];

  // ---- RENDER ----

  // Selfie step
  if (step === 'selfie') {
    return (
      <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full relative overflow-hidden">
          <SelfieInput
            prompt="Upload a selfie in natural light. No flash, no filters."
            onSelfieReady={(url) => {
              setSelfieUrl(url);
              setStep('picker');
            }}
            onClose={onClose}
          />
        </div>
      </div>
    );
  }

  // Color picker step
  if (step === 'picker') {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold">Pick Your Skin Tone</h2>
          <div className="w-10" />
        </div>

        <p className="text-xs text-gray-400 text-center px-4 pt-2">
          Drag the circle to your cheek area. Tap "Add Point" up to 3 times for accuracy.
        </p>

        {/* Canvas with reticle */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 overflow-hidden relative px-4 py-2">
          <div className="relative inline-block">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[50vh] object-contain touch-none rounded-xl"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            />
            {/* Reticle overlay */}
            {reticlePos && canvasRef.current && (
              <>
                {/* Reticle circle */}
                <div
                  className="absolute w-10 h-10 rounded-full border-2 border-white shadow-lg pointer-events-none"
                  style={{
                    left: `${(reticlePos.x / canvasRef.current.width) * 100}%`,
                    top: `${(reticlePos.y / canvasRef.current.height) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)',
                  }}
                />
                {/* Live color preview */}
                {sampledColor && (
                  <div
                    className="absolute w-10 h-10 rounded-full pointer-events-none"
                    style={{
                      left: `${(reticlePos.x / canvasRef.current.width) * 100 + 8}%`,
                      top: `${(reticlePos.y / canvasRef.current.height) * 100 - 8}%`,
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: sampledColor,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Sample points indicator */}
        {sampledPoints.length > 0 && (
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="text-[10px] text-gray-400">{sampledPoints.length}/3 points sampled</span>
            {sampledPoints.map((p, i) => (
              <div key={i} className="w-5 h-5 rounded-full border border-white shadow" style={{ backgroundColor: rgbToHex(p[0], p[1], p[2]) }} />
            ))}
          </div>
        )}

        {/* Bottom controls */}
        <div className="shrink-0 border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex gap-2">
            <button
              onClick={addSamplePoint}
              disabled={sampledPoints.length >= 3}
              className="flex-1 py-3 rounded-xl text-sm font-bold border border-gray-300 hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
              Add Point ({sampledPoints.length}/3)
            </button>
            <button
              onClick={confirmAndMatch}
              disabled={loading}
              className="flex-1 py-3 rounded-xl text-sm font-bold bg-black text-white hover:bg-gray-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Confirm
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results step
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white/90 backdrop-blur-md shrink-0">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-bold">Your Shade Matches</h2>
        <div className="w-10" />
      </div>

      <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Undertone badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500">Detected undertone:</span>
          <div className="relative">
            <button
              onClick={() => setShowUndertoneDropdown(!showUndertoneDropdown)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black text-white text-xs font-semibold"
            >
              {effectiveUndertone}
              <ChevronDown className="w-3 h-3" />
            </button>
            {showUndertoneDropdown && (
              <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 min-w-[120px]">
                {(['Warm', 'Cool', 'Neutral', 'Olive'] as Undertone[]).map(u => (
                  <button
                    key={u}
                    onClick={() => { setSelectedUndertone(u); setShowUndertoneDropdown(false); }}
                    className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 ${effectiveUndertone === u ? 'font-bold' : ''}`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Previous shade input */}
        <div>
          <label className="text-xs text-gray-500 block mb-1">What shade do you currently use? (optional)</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={previousShade}
              onChange={(e) => setPreviousShade(e.target.value)}
              placeholder="e.g., NW25, 230, Custard..."
              className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:border-black focus:outline-none"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white"
          >
            <option value="">All Brands</option>
            {uniqueBrands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select
            value={filterFinish}
            onChange={(e) => setFilterFinish(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white"
          >
            <option value="">All Finishes</option>
            {uniqueFinishes.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-sm text-red-700 font-medium">{error}</p>
            <button
              onClick={() => { setError(null); setStep('picker'); }}
              className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Result cards */}
        <div className="space-y-3">
          {filteredResults.map((shade, i) => (
            <ShadeResultCard key={`${shade.brand}-${shade.shadeName}-${i}`} shade={shade} onTryOn={onTryOn} />
          ))}
        </div>

        {/* Better Match section */}
        {betterMatches.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-[#111]">
                These shades may match your skin tone better than what you scanned
              </h3>
            </div>
            <div className="space-y-3">
              {betterMatches.map((shade, i) => (
                <ShadeResultCard key={`better-${shade.brand}-${shade.shadeName}-${i}`} shade={shade} onTryOn={onTryOn} />
              ))}
            </div>
          </div>
        )}

        {filteredResults.length === 0 && !error && (
          <div className="text-center py-8 text-gray-400 text-sm">
            No results match your filters. Try adjusting them.
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Shade Result Card sub-component ----
function ShadeResultCard({
  shade,
  onTryOn,
}: {
  shade: ShadeMatchResult;
  onTryOn: (s: { name: string; hex: string }) => void;
}) {
  const matchColor =
    shade.matchPercent >= 90 ? 'bg-green-100 text-green-700' :
    shade.matchPercent >= 75 ? 'bg-yellow-100 text-yellow-700' :
    'bg-red-100 text-red-700';

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
      {/* Swatch */}
      <div
        className="w-10 h-10 rounded-full shrink-0 border border-gray-200"
        style={{ backgroundColor: shade.hex }}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-[#111] truncate">{shade.brand} <span className="font-normal text-gray-600">{shade.productName}</span></p>
        <p className="text-[11px] italic text-gray-500 truncate">{shade.shadeName}</p>
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${matchColor}`}>
            {shade.matchPercent}% match
          </span>
          <span className="px-1.5 py-0.5 rounded bg-gray-100 text-[9px] text-gray-500">{shade.undertone}</span>
          <span className="px-1.5 py-0.5 rounded bg-gray-100 text-[9px] text-gray-500">{shade.finish}</span>
        </div>
      </div>

      {/* Try On CTA */}
      <button
        onClick={() => onTryOn({ name: shade.shadeName, hex: shade.hex })}
        className="shrink-0 px-3 py-1.5 bg-black text-white rounded-lg text-[10px] font-bold hover:bg-gray-800 transition-all"
      >
        Try On
      </button>
    </div>
  );
}
