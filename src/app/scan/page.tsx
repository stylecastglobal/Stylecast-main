'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload, Search, ArrowLeft } from 'lucide-react';

export default function ScanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productName, setProductName] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: AI로 제품 인식
    // 지금은 바로 Try-On 페이지로 이동
    router.push('/try-on/1');
  };

  const handleManualSubmit = () => {
    if (!productName.trim()) return;
    
    // 수동 입력으로 제품 검색
    router.push('/try-on/1');
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