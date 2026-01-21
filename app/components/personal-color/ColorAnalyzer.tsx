'use client';

import { useState } from 'react';
import ImageUploader from './ImageUploader';
import SeasonalResults from './SeasonalResults';
import {
  analyzePersonalColor,
  ColorAnalysisResult,
} from '../../lib/color-analysis/colorAnalyzer';

export default function ColorAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ColorAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = async (file: File) => {
    setSelectedFile(file);
    setError(null);
    setIsAnalyzing(true);

    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Perform color analysis
      const analysisResult = await analyzePersonalColor(file);
      setResult(analysisResult);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to analyze image. Please try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartOver = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {!result ? (
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-black text-white text-sm font-semibold rounded-full mb-4">
              AI PERSONAL COLOR
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Your True Personal
              <br />
              Color with AI Precision
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload a single selfie and let our AI analyze your skin tone,
              brightness, saturation, and contrast to determine your exact{' '}
              <span className="font-semibold">12-tone personal color type</span>.
              Instantly receive tailored makeup and fashion color recommendations.
            </p>
          </div>

          {/* Season Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
              <div
                key={season}
                className="px-4 py-2 border-2 border-gray-200 rounded-full text-sm font-medium text-gray-700"
              >
                {season}
              </div>
            ))}
          </div>

          {/* Image Uploader */}
          <ImageUploader
            onImageSelected={handleImageSelected}
            isAnalyzing={isAnalyzing}
          />

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-800 text-center">{error}</p>
              <button
                onClick={handleStartOver}
                className="mt-3 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* How It Works */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Upload Your Photo
              </h3>
              <p className="text-sm text-gray-600">
                Take or upload a clear selfie in natural lighting
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                AI Analysis
              </h3>
              <p className="text-sm text-gray-600">
                Our algorithm analyzes your unique color characteristics
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Get Your Palette
              </h3>
              <p className="text-sm text-gray-600">
                Receive personalized color recommendations instantly
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Know Your Personal Color?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="text-2xl">✨</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Look More Radiant
                  </h3>
                  <p className="text-sm text-gray-600">
                    The right colors make your skin glow and your eyes sparkle
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🛍️</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Shop Smarter
                  </h3>
                  <p className="text-sm text-gray-600">
                    No more guessing - know exactly which colors suit you
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">💄</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Perfect Makeup Match
                  </h3>
                  <p className="text-sm text-gray-600">
                    Find lipstick, blush, and eyeshadow shades made for you
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">💰</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Save Money
                  </h3>
                  <p className="text-sm text-gray-600">
                    Stop buying clothes and makeup that don't work for you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <SeasonalResults 
            result={result} 
            onStartOver={handleStartOver}
            uploadedImage={imagePreview || undefined}
          />
        </div>
      )}
    </div>
  );
}