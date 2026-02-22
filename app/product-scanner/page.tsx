'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload, Search, ArrowLeft, CheckCircle, AlertTriangle, Loader2, Star, ChevronRight, Paintbrush, Palette } from 'lucide-react';
import { isTryOnCategory, isShadeFinderCategory } from '@/lib/tryon/types';
import VirtualTryOn from '@/app/components/tryon/VirtualTryOn';
import ShadeFinder from '@/app/components/tryon/ShadeFinder';
import { runOCR } from '@/lib/runOCR';

type Review = {
  author: string;
  rating: number;
  text: string;
  days_ago: number;
};

type Alternative = {
  brand: string;
  name: string;
  category: string;
  texture: string;
  skin_types: string[];
  key_ingredients: string[];
};

type Shade = {
  name: string;
  hex: string;
};

type ScanResult = {
  success: boolean;
  confidence?: number;
  brand?: string;
  name?: string;
  category?: string;
  skin_types?: string[];
  texture?: string;
  finish?: string;
  key_ingredients?: string[];
  pros?: string[];
  cons?: string[];
  shades?: Shade[];
  extracted_text?: string;
  error?: string;
  suggestion?: string;
  reviews?: Review[];
  alternatives?: Alternative[];
};

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number) => {
  const timeout = new Promise<T>((_, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Timeout'));
    }, timeoutMs);
    void promise.finally(() => clearTimeout(timeoutId));
  });
  return Promise.race([promise, timeout]);
};

export default function ProductScannerPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productName, setProductName] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showTryOn, setShowTryOn] = useState(false);
  const [showShadeFinder, setShowShadeFinder] = useState(false);
  const [tryOnPreSelectedShade, setTryOnPreSelectedShade] = useState<Shade | undefined>(undefined);

  const handleScan = async (file?: File, manualQuery?: string) => {
    if (!file && !manualQuery) return;

    setStatus('scanning');
    setResult(null);

    try {
      let queryText = manualQuery?.trim() || '';
      let extractedText = '';

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        try {
          extractedText = await withTimeout(runOCR(imageUrl), 9000);
          if (!queryText) queryText = extractedText.trim();
        } finally {
          URL.revokeObjectURL(imageUrl);
        }
      }

      if (!queryText) {
        setResult({ success: false, error: 'Could not detect product text. Try a clearer photo or manual search.' });
        setStatus('error');
        return;
      }

      // Try Firestore search first
      let firestoreResult: ScanResult | null = null;
      try {
        const searchRes = await fetch(`/api/scanner/search?q=${encodeURIComponent(queryText)}`);
        const searchData = await searchRes.json();
        const candidates = (searchData?.results || []) as Array<{
          id: string; brand: string; name: string; category: string;
          image: string | null; image_set: string[]; score: number;
        }>;

        if (candidates.length > 0) {
          const best = candidates[0];
          const productRes = await fetch(`/api/scanner/products/${best.id}`);
          const productData = await productRes.json();
          const product = productData?.product;

          if (product) {
            firestoreResult = {
              success: true,
              confidence: Math.max(0.45, Math.min(0.95, typeof best.score === 'number' ? best.score : 0.7)),
              brand: product.brand || best.brand,
              name: product.name || best.name,
              category: product.category || best.category,
              key_ingredients: product.ingredients
                ? String(product.ingredients).split(/\s*,\s*/).map((x: string) => x.trim()).filter(Boolean).slice(0, 18)
                : undefined,
              shades: Array.isArray(product.shades)
                ? product.shades
                    .filter((s: any) => s && (s.hex || s.shade_name))
                    .map((s: any) => ({ name: String(s.shade_name || s.name || 'Shade'), hex: String(s.hex || '#000000') }))
                : undefined,
              extracted_text: extractedText || undefined,
            };
          }
        }
      } catch {
        // Firestore search failed — fall through to AI
      }

      if (firestoreResult) {
        setResult(firestoreResult);
        setStatus('done');
        return;
      }

      // Fallback: use Claude AI to analyze the product
      const formData = new FormData();
      formData.append('query', queryText);

      const res = await fetch('/api/scan', { method: 'POST', body: formData });
      const data: ScanResult = await res.json();

      if (extractedText && data.success) {
        data.extracted_text = extractedText;
      }

      setResult(data);
      setStatus(data.success ? 'done' : 'error');
    } catch (err) {
      console.error(err);
      setResult({ success: false, error: 'Scan failed. Please try again.' });
      setStatus('error');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setResult({ success: false, error: 'Please upload a valid image (JPEG, PNG, WebP, or GIF).' });
      setStatus('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setResult({ success: false, error: 'File too large. Maximum size is 10MB.' });
      setStatus('error');
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    handleScan(file, productName.trim() || undefined);
  };

  const handleManualSubmit = () => {
    if (!productName.trim()) return;
    handleScan(undefined, productName.trim());
  };

  const resetScan = () => {
    setStatus('idle');
    setResult(null);
    setPreviewUrl(null);
    setProductName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Product Scanner</h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#111]">
              Scan Any Beauty Product
            </h2>
            <p className="text-gray-600 text-lg">
              Upload a photo or type a product name to get instant skin compatibility insights
            </p>
          </div>

          {/* Result Card */}
          {status === 'scanning' && (
            <div className="mb-8 rounded-3xl border border-gray-200 bg-gray-50 p-8 text-center">
              <Loader2 className="w-10 h-10 text-gray-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Analyzing your product...</p>
              <p className="text-sm text-gray-400 mt-1">Using OCR + AI to identify ingredients and compatibility</p>
            </div>
          )}

          {status === 'done' && result?.success && (
            <div className="mb-8 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden">
              {/* Product Header */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{result.brand}</p>
                    <h3 className="text-2xl font-bold text-[#111]">{result.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{result.category}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black text-white px-3 py-1.5 text-xs font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {Math.round((result.confidence ?? 0) * 100)}% Match
                  </span>
                </div>
              </div>

              {/* Try On / Find My Shade CTAs */}
              {(result.shades && result.shades.length > 0) && (
                <div className="px-8 pt-6 flex gap-3">
                  {result.category && isTryOnCategory(result.category) && (
                    <button
                      onClick={() => { setTryOnPreSelectedShade(undefined); setShowTryOn(true); }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all shadow-sm"
                    >
                      <Paintbrush className="w-4 h-4" />
                      Try On
                    </button>
                  )}
                  {result.category && isShadeFinderCategory(result.category) && (
                    <button
                      onClick={() => setShowShadeFinder(true)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
                    >
                      <Palette className="w-4 h-4" />
                      Find My Shade
                    </button>
                  )}
                </div>
              )}

              <div className="p-8 space-y-6">
                {/* Quick Summary */}
                {(result.skin_types?.length || result.texture) && (
                  <div className="bg-gray-50 rounded-2xl p-5 border-l-4 border-black">
                    <p className="text-sm text-gray-600 italic">
                      {[
                        result.skin_types?.length ? `Best for ${result.skin_types.join('/')} skin` : null,
                        result.texture ? `${result.texture} texture` : null,
                        result.pros?.[0] ?? null,
                      ].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                )}

                {/* Skin Compatibility + Finish side by side */}
                {(result.skin_types?.length || result.texture) && (
                  <div className="grid grid-cols-2 gap-4">
                    {result.skin_types && result.skin_types.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-[#111] mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-black rounded-full" />
                          Skin Compatibility
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.skin_types.map((type) => (
                            <span key={type} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 font-medium">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.texture && (
                      <div>
                        <h4 className="text-sm font-bold text-[#111] mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-black rounded-full" />
                          Finish
                        </h4>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3">{result.texture}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Ingredients */}
                {result.key_ingredients && result.key_ingredients.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-[#111] mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-black rounded-full" />
                      Key Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.key_ingredients.slice(0, 5).map((ing) => (
                        <span key={ing} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pros & Cons side by side */}
                {(result.pros?.length || result.cons?.length) ? (
                  <div className="grid grid-cols-2 gap-4">
                    {result.pros && result.pros.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-[#111] mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-green-500 rounded-full" />
                          Pros
                        </h4>
                        <ul className="space-y-2">
                          {result.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {result.cons && result.cons.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-[#111] mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-red-400 rounded-full" />
                          Cons & Cautions
                        </h4>
                        <ul className="space-y-2">
                          {result.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Reviews — horizontal scroll */}
                {result.reviews && result.reviews.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-[#111] mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-black rounded-full" />
                      Reviews
                    </h4>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-8 px-8 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                      {result.reviews.map((review, i) => (
                        <div key={i} className="min-w-[260px] max-w-[280px] shrink-0 rounded-xl border border-gray-200 bg-gray-50 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-[#111]">{review.author}</span>
                            <span className="text-[10px] text-gray-400">{review.days_ago}d ago</span>
                          </div>
                          <div className="flex gap-0.5 mb-2">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <Star key={s} className={`w-3 h-3 ${s < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Alternatives — horizontal scroll */}
                {result.alternatives && result.alternatives.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-[#111] mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-black rounded-full" />
                      You Might Also Like
                    </h4>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-8 px-8 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                      {result.alternatives.map((alt, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setProductName(`${alt.brand} ${alt.name}`);
                            handleScan(undefined, `${alt.brand} ${alt.name}`);
                          }}
                          className="min-w-[200px] max-w-[220px] shrink-0 rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-black hover:shadow-sm transition-all group"
                        >
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">{alt.brand}</p>
                          <p className="text-sm font-bold text-[#111] leading-tight mb-2 group-hover:underline">{alt.name}</p>
                          <div className="flex flex-wrap gap-1">
                            {alt.skin_types?.slice(0, 2).map((t) => (
                              <span key={t} className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500">{t}</span>
                            ))}
                            {alt.texture && (
                              <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500">{alt.texture}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400 group-hover:text-black">
                            Scan this <ChevronRight className="w-3 h-3" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Scan Again */}
              <div className="px-8 pb-8">
                <button
                  onClick={resetScan}
                  className="w-full py-4 rounded-xl font-bold bg-black text-white hover:bg-gray-800 transition-all"
                >
                  Scan Another Product
                </button>
              </div>
            </div>
          )}

          {status === 'error' && result && (
            <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-red-800">{result.error}</p>
                  {result.suggestion && (
                    <p className="text-sm text-red-600 mt-1">{result.suggestion}</p>
                  )}
                  {result.extracted_text && (
                    <p className="text-xs text-red-400 mt-2">Extracted text: {result.extracted_text}</p>
                  )}
                </div>
              </div>
              <button
                onClick={resetScan}
                className="mt-4 w-full py-3 rounded-xl font-bold border border-red-300 text-red-700 hover:bg-red-100 transition-all"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Upload Card — always visible when idle or after error */}
          {(status === 'idle' || status === 'error') && (
            <>
              <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden mb-6">
                <div className="aspect-[4/3] flex flex-col items-center justify-center p-12">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="max-h-48 rounded-xl mb-6 object-contain" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-8">
                      <Camera className="w-16 h-16 text-gray-400" />
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-3 text-[#111]">Upload Product Photo</h3>
                  <p className="text-gray-600 text-center mb-10 max-w-md">
                    Take a photo of the product label — our AI will identify it and analyze ingredients
                  </p>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-10 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-sm flex items-center gap-3"
                  >
                    <Upload className="w-5 h-5" />
                    Choose Photo
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Manual Input */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Search className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#111]">Search by name</h3>
                    <p className="text-sm text-gray-600">Type the product name to look it up</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="e.g., CeraVe Hydrating Facial Cleanser"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors text-[#111]"
                  />

                  <button
                    onClick={handleManualSubmit}
                    disabled={!productName.trim()}
                    className={`w-full py-4 rounded-xl font-bold transition-all ${
                      productName.trim()
                        ? 'bg-black text-white hover:bg-gray-800 shadow-sm'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Search Product →
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Tips */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h4 className="font-bold text-sm text-gray-700 mb-3">Tips for best results:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">•</span>
                <span>Make sure the product name and brand are clearly visible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">•</span>
                <span>Use good lighting for better AI recognition</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">•</span>
                <span>Works with skincare, foundation, serums, moisturizers, and more</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">•</span>
                <span>You can also type the product name if the photo scan doesn't work</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Virtual Try-On Modal */}
      {showTryOn && result?.success && result.category && result.brand && result.name && (
        <VirtualTryOn
          product={{
            brand: result.brand,
            name: result.name,
            category: result.category,
            finish: result.finish || result.texture || '',
            texture: result.texture || '',
            shades: result.shades || [],
          }}
          preSelectedShade={tryOnPreSelectedShade}
          onClose={() => setShowTryOn(false)}
        />
      )}

      {/* Shade Finder Modal */}
      {showShadeFinder && result?.success && result.category && result.brand && result.name && (
        <ShadeFinder
          product={{
            brand: result.brand,
            name: result.name,
            category: result.category,
            finish: result.finish || result.texture || '',
            texture: result.texture || '',
            shades: result.shades || [],
          }}
          onTryOn={(shade) => {
            setShowShadeFinder(false);
            setTryOnPreSelectedShade(shade);
            setShowTryOn(true);
          }}
          onClose={() => setShowShadeFinder(false)}
        />
      )}
    </div>
  );
}
