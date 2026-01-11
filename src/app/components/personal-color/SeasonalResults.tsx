'use client';

import { ColorAnalysisResult } from '../../lib/color-analysis/colorAnalyzer';
import { SeasonType } from '../../lib/color-analysis/seasonalProfiles';
import { useState } from 'react';

interface SeasonalResultsProps {
  result: ColorAnalysisResult;
  onStartOver?: () => void;
  uploadedImage?: string;
}

export default function SeasonalResults({
  result,
  onStartOver,
  uploadedImage,
}: SeasonalResultsProps) {
  const { season, profile, characteristics, measurements, confidence } = result;
  const [showShareMenu, setShowShareMenu] = useState(false);

  const seasonFamily = season.split(' ')[1] || season;

  const seasonEmoji: Record<string, string> = {
    Spring: '🌸',
    Summer: '☀️',
    Autumn: '🍂',
    Winter: '❄️',
  };

  const handleShare = async (platform: string) => {
    const shareText = `I just discovered I'm a ${season}! 🎨 Find out your personal color type with AI analysis.`;
    const shareUrl = window.location.href;

    switch (platform) {
      case 'instagram':
        try {
          await navigator.clipboard.writeText(shareUrl);
          alert('Link copied! Open Instagram and paste in your story or bio.');
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
      case 'tiktok':
        window.open(
          `https://www.tiktok.com/upload?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareUrl);
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
      case 'download':
        localStorage.setItem('colorAnalysisResult', JSON.stringify(result));
        alert('Results saved! You can access them anytime.');
        break;
    }
    setShowShareMenu(false);
  };

  // Sample makeup products (replace with real product images)
  const makeupProducts = [
    {
      name: 'Velvet Matte Lipstick',
      price: '$24.00',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
    },
    {
      name: 'Radiance Blush',
      price: '$28.00',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
    },
    {
      name: 'Silk Eyeshadow Palette',
      price: '$42.00',
      image: 'https://images.unsplash.com/photo-1583241475880-b36b52f4f334?w=400&h=400&fit=crop',
    },
    {
      name: 'Precision Eyeliner',
      price: '$18.00',
      image: 'https://images.unsplash.com/photo-1631214524020-7e18db0a8e4b?w=400&h=400&fit=crop',
    },
    {
      name: 'Lip Gloss Shine',
      price: '$22.00',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    },
    {
      name: 'Foundation Perfect Match',
      price: '$38.00',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 pb-8 border-b border-gray-200">
        <div className="text-6xl mb-2">{seasonEmoji[seasonFamily]}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          You are a {season}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {profile.description}
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all"
              style={{ width: `${confidence * 100}%` }}
            ></div>
          </div>
          <span>{Math.round(confidence * 100)}% confident</span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Uploaded Image */}
        {uploadedImage && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Photo</h2>
            <div className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
              <img
                src={uploadedImage}
                alt="Your uploaded photo"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}

        {/* Right: Color Profile */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Color Profile
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Undertone</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {characteristics.undertone}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Brightness</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {characteristics.brightness}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Saturation</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {characteristics.saturation}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Contrast</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {characteristics.contrast}
              </p>
            </div>
          </div>

          {/* Analyzed Colors */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Analyzed Colors</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: measurements.skinColorHex }}
                ></div>
                <div>
                  <p className="text-xs text-gray-600">Skin Tone</p>
                  <p className="text-sm font-mono text-gray-900">
                    {measurements.skinColorHex}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: measurements.hairColorHex }}
                ></div>
                <div>
                  <p className="text-xs text-gray-600">Hair Color</p>
                  <p className="text-sm font-mono text-gray-900">
                    {measurements.hairColorHex}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Color Palette - White with Black Border */}
<div className="bg-white border-2 border-black rounded-3xl p-8 relative overflow-hidden">
  <div className="relative z-10">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Perfect Color Palette</h2>
    <p className="text-gray-600 mb-6 text-sm">
      Colors that harmonize with your natural beauty
    </p>
    
    {/* Compact color grid */}
    <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
      {profile.bestColors.map((color, index) => (
        <div
          key={index}
          className="group relative"
        >
          <div
            className="aspect-square rounded-lg border-2 border-gray-900 shadow-sm transition-transform group-hover:scale-110 group-hover:shadow-lg cursor-pointer"
            style={{ backgroundColor: color.hex }}
          ></div>
          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {color.name}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Animated Makeup Products Carousel */}
      <div className="overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          💄 Recommended Makeup Products
        </h2>
        
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling container */}
          <div className="flex gap-6 animate-scroll">
            {/* Duplicate products for seamless loop */}
            {[...makeupProducts, ...makeupProducts].map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="w-full h-72 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price}
                    </span>
                    <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium">
                      Shop
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Colors to Avoid */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">⚠️ Colors to Avoid</h3>
        <p className="text-gray-600 mb-4">
          These colors may wash you out or clash with your natural coloring
        </p>
        <div className="flex flex-wrap gap-2">
          {profile.avoidColors.map((color, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white border border-red-200 rounded-full text-sm text-gray-700"
            >
              {color}
            </span>
          ))}
        </div>
      </div>

      {/* Jewelry */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">💍</span>
          Jewelry & Metals
        </h3>
        <p className="text-gray-700">
          <span className="font-semibold capitalize">{profile.metals}</span>{' '}
          jewelry will complement your skin tone beautifully
          {profile.metals === 'gold' && ' (rose gold also works great!)'}
          {profile.metals === 'silver' && ' (white gold and platinum too!)'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-8">
        {onStartOver && (
          <button
            onClick={onStartOver}
            className="flex-1 py-4 border-2 border-black text-black rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Try Another Photo
          </button>
        )}
        
        {/* Share Button */}
        <div className="flex-1 relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share My Results
          </button>

          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
              <button
                onClick={() => handleShare('instagram')}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-900"
              >
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Share on Instagram
              </button>

              <button
                onClick={() => handleShare('tiktok')}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-900"
              >
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
                Share on TikTok
              </button>
              
              <button
                onClick={() => handleShare('twitter')}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-900"
              >
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Share on Twitter
              </button>
              
              <button
                onClick={() => handleShare('facebook')}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-900"
              >
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Share on Facebook
              </button>

              <button
                onClick={() => handleShare('copy')}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-900"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Link
              </button>

              <button
                onClick={() => handleShare('download')}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-t border-gray-200 text-gray-900"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Results
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}