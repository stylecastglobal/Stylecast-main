"use client";

export default function ProcessingStep() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Animated Loader */}
      <div className="mb-8">
        <div className="relative w-24 h-24">
          {/* Outer spinning circle */}
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-3 bg-black rounded-full animate-pulse opacity-20"></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center max-w-md">
        <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3">
          Analyzing Your Colors
        </h2>
        <p className="text-gray-600 mb-6">
          Examining your undertone, brightness, and contrast...
        </p>
        
        {/* Progress Steps */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
            <span>Detecting facial features</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
            <span>Analyzing skin tone</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-200"></div>
            <span>Matching to seasonal profiles</span>
          </div>
        </div>
      </div>

      {/* Subtle Animation Hint */}
      <div className="mt-12 text-xs text-gray-400">
        This usually takes 3-5 seconds
      </div>
    </div>
  );
}