"use client";

import { useState } from "react";
import { validateImage, fileToBase64 } from "../../lib/colorAnalysis";

interface UploadStepProps {
  onImagesSelected: (images: string[]) => void;
}

export default function UploadStep({ onImagesSelected }: UploadStepProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError(null);

    if (files.length + selectedFiles.length > 3) {
      setError("You can upload a maximum of 3 photos.");
      return;
    }

    for (const file of files) {
      const validationError = validateImage(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    try {
      const base64Images = await Promise.all(
        files.map((file) => fileToBase64(file))
      );

      setSelectedFiles([...selectedFiles, ...files]);
      setPreviews([...previews, ...base64Images]);
    } catch {
      setError("Failed to load images. Please try again.");
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleAnalyze = () => {
    if (previews.length === 0) {
      setError("Please upload at least one photo.");
      return;
    }
    onImagesSelected(previews);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-16">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extralight tracking-tight text-gray-900 mb-3">
          Find Your Personal Color
        </h1>
        <p className="text-gray-500 text-lg font-light tracking-wide">
          Upload a selfie and we will analyze your undertone, brightness, and contrast.
        </p>
      </div>

      {/* UPLOAD AREA */}
      <div className="w-full max-w-xl mb-12">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-72 
          border border-gray-300 rounded-2xl 
          bg-gray-50 hover:bg-gray-100 
          transition-all cursor-pointer 
          backdrop-blur-sm"
        >
          <div className="flex flex-col items-center text-gray-600">
            <div className="w-12 h-12 border border-gray-400 rounded-xl flex items-center justify-center mb-4 text-gray-700">
              ↑
            </div>

            <p className="text-sm text-gray-700 mb-1 tracking-wide">
              <span className="font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400 tracking-wide">JPG or PNG — up to 10MB</p>
            <p className="text-xs text-gray-400 tracking-wide mt-1">Upload 1–3 photos</p>
          </div>

          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
          />
        </label>
      </div>

      {/* PREVIEWS */}
      {previews.length > 0 && (
        <div className="w-full max-w-xl mb-10">
          <div className="grid grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 
                  bg-black text-white rounded-full 
                  text-sm flex items-center justify-center 
                  opacity-80 hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="w-full max-w-xl mb-10 p-4 bg-gray-100 border border-gray-300 rounded-xl">
          <p className="text-sm text-gray-800 tracking-wide">{error}</p>
        </div>
      )}

      {/* ANALYZE BUTTON */}
      <button
        onClick={handleAnalyze}
        disabled={previews.length === 0}
        className="px-10 py-3 bg-black text-white rounded-full 
        font-medium tracking-wide 
        hover:bg-gray-900 transition-all 
        disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed mb-16"
      >
        Analyze My Tone
      </button>

      {/* PANELS — FUTURISTIC CLEAN GRID */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* GUIDELINES */}
        <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 tracking-tight">
            For Best Results
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <li>• Take photos in natural daylight.</li>
            <li>• Avoid heavy makeup or filters.</li>
            <li>• Remove glasses and accessories.</li>
            <li>• Use a plain white background if possible.</li>
            <li>• Upload 2–3 photos for better accuracy.</li>
          </ul>
        </div>

        {/* LEGAL */}
        <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 tracking-tight">
            Legal & Safety Requirements
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <li>• Images are used strictly for processing only.</li>
            <li>• Photos are deleted immediately unless you choose to save them.</li>
            <li>• Results are approximate; personal color is not an exact science.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
