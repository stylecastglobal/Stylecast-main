'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload, Search, ArrowLeft } from 'lucide-react';
import { runOCR } from '@/lib/runOCR';
import { scoreImageSimilarity } from '@/lib/productScanner/imageMatch';

type ScanStatus = 'idle' | 'processing' | 'low-confidence' | 'error';

type Candidate = {
  id: string;
  brand: string;
  name: string;
  category: string;
  image: string | null;
  image_set: string[];
  score: number;
};

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number) => {
  const timeout = new Promise<T>((_, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Timeout"));
    }, timeoutMs);
    // Ensure the timeout is cleared if the outer race finishes first.
    void promise.finally(() => clearTimeout(timeoutId));
  });
  return Promise.race([promise, timeout]);
};

export default function ScanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productName, setProductName] = useState('');
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [scanMessage, setScanMessage] = useState('');
  const [candidatePreview, setCandidatePreview] = useState<Candidate | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setScanStatus('processing');
    setScanMessage('Analyzing your product...');
    setCandidatePreview(null);

    try {
      const ocrText = await withTimeout(runOCR(imageUrl), 7000);
      if (!ocrText.trim()) {
        setScanStatus('low-confidence');
        setScanMessage('No text detected. Try manual search.');
        return;
      }

      const cacheKey = `scan:search:${ocrText.toLowerCase()}`;
      const cached = sessionStorage.getItem(cacheKey);
      const data = cached
        ? JSON.parse(cached)
        : await fetch(`/api/scanner/search?q=${encodeURIComponent(ocrText)}`).then((r) => r.json());
      if (!cached) {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      }
      const candidates: Candidate[] = data.results || [];

      if (!candidates.length) {
        setScanStatus('low-confidence');
        setScanMessage('Could not recognize this product. Try manual search.');
        return;
      }

      const fallbackCandidate = candidates[0];
      let best: Candidate | null = null;
      let bestScore = -1;

      for (const candidate of candidates.slice(0, 8)) {
        if (!candidate.image) continue;
        const imageScore = await withTimeout(
          scoreImageSimilarity(imageUrl, candidate.image),
          3000
        );
        const combinedScore = candidate.score * 0.6 + imageScore * 0.4;
        if (combinedScore > bestScore) {
          bestScore = combinedScore;
          best = candidate;
        }
      }

      if (!best) {
        best = fallbackCandidate;
        bestScore = fallbackCandidate.score;
      }

      if (bestScore < 0.35) {
        setScanStatus('low-confidence');
        setScanMessage('Low confidence. Please search manually or try a clearer photo.');
        setCandidatePreview(best);
        return;
      }

      router.push(`/scan/result/${best.id}?confidence=${Math.round(bestScore * 100)}`);
    } catch (error) {
      console.error('Scan failed:', error);
      setScanStatus('error');
      setScanMessage('Scan failed. Please try again or search manually.');
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  };

  const handleManualSubmit = () => {
    if (!productName.trim()) return;
    
    router.push(`/scan/search?q=${encodeURIComponent(productName.trim())}`);
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
            <h1 className="text-lg font-semibold">Scan & Try</h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Quick tools */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-10">
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-sm font-semibold text-[#111]">Shade Match</div>
              <p className="mt-1 text-sm text-gray-600">
                Upload a selfie and match your foundation tone.
              </p>
              <button
                onClick={() => router.push("/scan/shade-match")}
                className="mt-3 inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-[#111] hover:bg-gray-50"
              >
                Open Shade Match →
              </button>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-sm font-semibold text-[#111]">AI Try-On Studio</div>
              <p className="mt-1 text-sm text-gray-600">
                Try makeup shades automatically or manually.
              </p>
              <button
                onClick={() => router.push("/ai-makeup-studio")}
                className="mt-3 inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-[#111] hover:bg-gray-50"
              >
                Open Try-On →
              </button>
            </div>
          </div>

          {/* Intro */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#111]">Analyze Any Product</h2>
            <p className="text-gray-600 text-lg">
              Take a photo of any beauty product to analyze and try it on virtually
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden mb-6">
            <div className="aspect-square flex flex-col items-center justify-center p-12">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-8">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-[#111]">Upload Product Photo</h3>
              <p className="text-gray-600 text-center mb-10 max-w-md">
                Take a photo of the product on the shelf or from your collection
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

          {scanStatus !== 'idle' && (
            <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              <p className="font-semibold">{scanMessage}</p>
              {candidatePreview && (
                <div className="mt-3 text-sm text-gray-600">
                  Best guess: {candidatePreview.brand} — {candidatePreview.name}
                </div>
              )}
            </div>
          )}

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
                <h3 className="font-bold text-lg text-[#111]">Can't scan the product?</h3>
                <p className="text-sm text-gray-600">Type the product name manually</p>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="e.g., NARS Light Reflecting Foundation"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
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

          {/* Tips */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h4 className="font-bold text-sm text-gray-700 mb-3">💡 Tips for best results:</h4>
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
                <span>Include the shade name if visible on the packaging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">•</span>
                <span>Works with foundation, lipstick, blush, and eyeshadow</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}