'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Undo2, RotateCcw, Eye, Columns2, Minus, Plus } from 'lucide-react';
import { Shade, ProductContext, FaceZoneMask } from '@/lib/tryon/types';
import { hexToLAB, hexToRGB, rgbToLAB, deltaE, warmCoolPull, sampleCanvasColor } from '@/lib/tryon/color-lab';
import { detectFace, extractZoneMasks, categoryToZone, FaceLandmarks } from '@/lib/tryon/facemesh-loader';
import SelfieInput from './SelfieInput';

interface VirtualTryOnProps {
  product: ProductContext;
  preSelectedShade?: Shade;
  onClose: () => void;
}

interface BrushStroke {
  points: { x: number; y: number }[];
  color: string;
  radius: number;
  opacity: number;
}

type ViewMode = 'tryon' | 'before' | 'compare';

export default function VirtualTryOn({ product, preSelectedShade, onClose }: VirtualTryOnProps) {
  const [step, setStep] = useState<'selfie' | 'canvas'>('selfie');
  const [selfieUrl, setSelfieUrl] = useState<string | null>(null);
  const [activeShade, setActiveShade] = useState<Shade | null>(preSelectedShade ?? product.shades[0] ?? null);
  const [intensity, setIntensity] = useState(70);
  const [brushRadius, setBrushRadius] = useState(20);
  const [strokes, setStrokes] = useState<BrushStroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<BrushStroke | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('tryon');
  const [faceLandmarks, setFaceLandmarks] = useState<FaceLandmarks | null>(null);
  const [zoneMasks, setZoneMasks] = useState<FaceZoneMask[]>([]);
  const [faceError, setFaceError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shadeFitMessage, setShadeFitMessage] = useState<string | null>(null);
  const [skinLAB, setSkinLAB] = useState<{ L: number; a: number; b: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isDrawing = useRef(false);
  const animFrameRef = useRef<number>(0);

  const activeZone = categoryToZone(product.category);

  // Determine brush radius based on zone
  useEffect(() => {
    if (activeZone === 'lips') setBrushRadius(12);
    else if (activeZone === 'eyelids') setBrushRadius(14);
    else setBrushRadius(24);
  }, [activeZone]);

  // Load selfie and detect face
  const initCanvas = useCallback(async (url: string) => {
    setLoading(true);
    setFaceError(null);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      imageRef.current = img;

      const canvas = canvasRef.current;
      const overlay = overlayCanvasRef.current;
      if (!canvas || !overlay) return;

      // Scale to fit max 600px width
      const scale = Math.min(600 / img.width, 800 / img.height, 1);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);

      canvas.width = w;
      canvas.height = h;
      overlay.width = w;
      overlay.height = h;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);

      // Detect face
      try {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = w;
        tempCanvas.height = h;
        const tempCtx = tempCanvas.getContext('2d')!;
        tempCtx.drawImage(img, 0, 0, w, h);

        const landmarks = await detectFace(tempCanvas);
        if (!landmarks) {
          setFaceError('Could not detect your face. Try a clearer, well-lit selfie.');
          setLoading(false);
          return;
        }

        // Scale landmarks to canvas size
        const scaledLandmarks: FaceLandmarks = {
          ...landmarks,
          width: w,
          height: h,
        };

        setFaceLandmarks(scaledLandmarks);
        const masks = extractZoneMasks(scaledLandmarks);
        setZoneMasks(masks);

        // Sample skin tone from cheek
        const cheekMasks = masks.filter(m => m.zone === 'cheeks');
        if (cheekMasks.length > 0) {
          const pts = cheekMasks[0].points;
          const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
          const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
          const [r, g, b] = sampleCanvasColor(ctx, cx, cy, 10);
          setSkinLAB(rgbToLAB(r, g, b));
        }
      } catch {
        // Silently fall back — no face segmentation, user can still brush freely
      }

      setLoading(false);
    };
    img.onerror = () => {
      setFaceError('Failed to load selfie image.');
      setLoading(false);
    };
    img.src = url;
  }, []);

  useEffect(() => {
    if (step === 'canvas' && selfieUrl) {
      initCanvas(selfieUrl);
    }
  }, [step, selfieUrl, initCanvas]);

  // Shade fit badge
  useEffect(() => {
    if (!activeShade?.hex || !skinLAB) {
      setShadeFitMessage(null);
      return;
    }
    const shadeLAB = hexToLAB(activeShade.hex);
    const de = deltaE(skinLAB, shadeLAB);
    if (de < 15) {
      setShadeFitMessage('This shade fits your undertone.');
    } else {
      const pull = warmCoolPull(shadeLAB);
      setShadeFitMessage(`This shade may pull ${pull} on your skin.`);
    }
  }, [activeShade, skinLAB]);

  // Render all strokes to overlay canvas
  const renderStrokes = useCallback((strokeList: BrushStroke[], current: BrushStroke | null) => {
    const overlay = overlayCanvasRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext('2d')!;
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    const finish = product.finish?.toLowerCase() || 'matte';

    const drawStroke = (stroke: BrushStroke) => {
      if (stroke.points.length === 0) return;
      const [r, g, b] = hexToRGB(stroke.color);

      for (const pt of stroke.points) {
        ctx.save();

        if (finish.includes('gloss') || finish.includes('dewy')) {
          ctx.globalCompositeOperation = 'soft-light' as GlobalCompositeOperation;
          ctx.globalAlpha = (stroke.opacity / 100) * 0.9;
        } else if (finish.includes('shimmer') || finish.includes('highlight')) {
          // Dual pass: multiply then screen
          ctx.globalCompositeOperation = 'multiply';
          ctx.globalAlpha = (stroke.opacity / 100) * 0.5;
        } else {
          // Matte / Blush
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = (stroke.opacity / 100) * 0.8;
        }

        const gradient = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, stroke.radius);
        gradient.addColorStop(0, `rgba(${r},${g},${b},1)`);
        gradient.addColorStop(0.6, `rgba(${r},${g},${b},0.6)`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, stroke.radius, 0, Math.PI * 2);
        ctx.fill();

        // Second pass for shimmer
        if (finish.includes('shimmer') || finish.includes('highlight')) {
          ctx.globalCompositeOperation = 'screen';
          ctx.globalAlpha = (stroke.opacity / 100) * 0.3;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, stroke.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    };

    for (const s of strokeList) drawStroke(s);
    if (current) drawStroke(current);
  }, [product.finish]);

  // Pointer handlers
  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = overlayCanvasRef.current!.getBoundingClientRect();
    const scaleX = overlayCanvasRef.current!.width / rect.width;
    const scaleY = overlayCanvasRef.current!.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!activeShade?.hex) return;
    isDrawing.current = true;
    const pos = getPos(e);
    const stroke: BrushStroke = {
      points: [pos],
      color: activeShade.hex,
      radius: brushRadius,
      opacity: intensity,
    };
    setCurrentStroke(stroke);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !currentStroke) return;
    const pos = getPos(e);
    const updated = { ...currentStroke, points: [...currentStroke.points, pos] };
    setCurrentStroke(updated);

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      renderStrokes(strokes, updated);
    });
  };

  const onPointerUp = () => {
    if (!isDrawing.current || !currentStroke) return;
    isDrawing.current = false;
    const newStrokes = [...strokes, currentStroke];
    setStrokes(newStrokes);
    setCurrentStroke(null);
    renderStrokes(newStrokes, null);
  };

  const undo = () => {
    const newStrokes = strokes.slice(0, -1);
    setStrokes(newStrokes);
    renderStrokes(newStrokes, null);
  };

  const resetAll = () => {
    setStrokes([]);
    setCurrentStroke(null);
    const overlay = overlayCanvasRef.current;
    if (overlay) {
      const ctx = overlay.getContext('2d')!;
      ctx.clearRect(0, 0, overlay.width, overlay.height);
    }
  };

  // Selfie step
  if (step === 'selfie') {
    return (
      <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full relative overflow-hidden">
          <SelfieInput
            prompt="Upload a selfie or take a photo in natural light."
            onSelfieReady={(url) => {
              setSelfieUrl(url);
              setStep('canvas');
            }}
            onClose={onClose}
          />
        </div>
      </div>
    );
  }

  // Face error
  if (faceError) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">{faceError}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setFaceError(null); setStep('selfie'); }}
              className="px-6 py-3 bg-black text-white rounded-xl text-sm font-bold"
            >
              Retry
            </button>
            <button onClick={onClose} className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-bold">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-bold">Virtual Try-On</h2>
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode(viewMode === 'before' ? 'tryon' : 'before')}
            className={`p-2 rounded-lg text-xs ${viewMode === 'before' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
            title="Before/After"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'compare' ? 'tryon' : 'compare')}
            className={`p-2 rounded-lg text-xs ${viewMode === 'compare' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
            title="Compare"
          >
            <Columns2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-gray-500">Detecting face landmarks...</p>
            </div>
          </div>
        )}

        <div className="relative" style={{ display: viewMode === 'compare' ? 'flex' : 'block' }}>
          {/* Base canvas (selfie) */}
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[60vh] object-contain"
            style={{
              display: 'block',
              clipPath: viewMode === 'compare' ? 'inset(0 50% 0 0)' : undefined,
            }}
          />
          {/* Overlay canvas (brush strokes) */}
          <canvas
            ref={overlayCanvasRef}
            className="absolute top-0 left-0 max-w-full max-h-[60vh] touch-none"
            style={{
              display: viewMode === 'before' ? 'none' : 'block',
              width: canvasRef.current?.clientWidth,
              height: canvasRef.current?.clientHeight,
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          />
          {viewMode === 'compare' && (
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white z-10" />
          )}
        </div>
      </div>

      {/* Shade fit badge */}
      {shadeFitMessage && viewMode === 'tryon' && (
        <div className={`mx-4 mt-2 px-3 py-2 rounded-lg text-xs font-medium text-center ${
          shadeFitMessage.includes('fits') ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
        }`}>
          {shadeFitMessage}
        </div>
      )}

      {/* Controls */}
      <div className="shrink-0 border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3">
        {/* Brush size + Undo/Reset */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setBrushRadius(Math.max(4, brushRadius - 4))} className="p-1.5 hover:bg-gray-100 rounded">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-gray-400 w-8 text-center">{brushRadius}px</span>
            <button onClick={() => setBrushRadius(Math.min(60, brushRadius + 4))} className="p-1.5 hover:bg-gray-100 rounded">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex gap-1">
            <button onClick={undo} disabled={strokes.length === 0} className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30">
              <Undo2 className="w-4 h-4" />
            </button>
            <button onClick={resetAll} disabled={strokes.length === 0} className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Intensity slider */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-400 w-14">Intensity</span>
          <input
            type="range"
            min={10}
            max={100}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="flex-1 h-1 accent-black"
          />
          <span className="text-[10px] text-gray-500 w-8 text-right">{intensity}%</span>
        </div>

        {/* Shade carousel */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {product.shades.map((shade) => (
            <button
              key={shade.name}
              onClick={() => shade.hex ? setActiveShade(shade) : undefined}
              disabled={!shade.hex}
              className={`shrink-0 flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
                activeShade?.name === shade.name ? 'bg-gray-100 ring-2 ring-black' : 'hover:bg-gray-50'
              } ${!shade.hex ? 'opacity-40 cursor-not-allowed' : ''}`}
              title={!shade.hex ? 'Shade preview not available' : shade.name}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: shade.hex || '#ccc' }}
              />
              <span className="text-[9px] text-gray-500 max-w-[56px] truncate">{shade.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
