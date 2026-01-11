"use client";

import { useState } from "react";
import { useMakeupStore } from "../lib/store";
import { downloadCanvas } from "../lib/makeupRenderer";

export default function SaveLook() {
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const { selectedMakeups, reset } = useMakeupStore();

  const handleSave = async () => {
    // Get canvas from parent component
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    if (!canvas) {
      alert("No makeup preview available");
      return;
    }

    setIsSaving(true);

    try {
      // Download the image
      downloadCanvas(canvas, `stylecast-look-${Date.now()}.png`);

      // Show success message
      setSavedMessage("Look saved successfully! Check your downloads.");
      
      setTimeout(() => setSavedMessage(null), 3000);
    } catch (error) {
      console.error("Error saving look:", error);
      alert("Failed to save look");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Start over with a new selfie?")) {
      reset();
    }
  };

  if (selectedMakeups.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Save Your Look</h2>

        {/* Products Summary */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Your Selected Products:</h3>
          <div className="space-y-2">
            {selectedMakeups.map((makeup, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  className="w-10 h-10 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: makeup.shade.hex }}
                />
                <div className="flex-1">
                  <p className="font-medium">
                    {makeup.product.brand} - {makeup.product.product}
                  </p>
                  <p className="text-sm text-gray-600">
                    {makeup.shade.name} ({makeup.shade.hex})
                  </p>
                </div>
                <span className="px-3 py-1 bg-white rounded-full text-xs font-medium">
                  {makeup.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            <p className="font-medium">{savedMessage}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "💾 Save to Lookbook"
            )}
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 transition-colors"
          >
            🔄 Start Over
          </button>
        </div>

        {/* Shopping List */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-900">
            🛍️ Shopping List
          </h4>
          <p className="text-sm text-blue-800 mb-2">
            Want to purchase these products? Here's your list:
          </p>
          <ul className="text-sm text-blue-900 space-y-1">
            {selectedMakeups.map((makeup, index) => (
              <li key={index}>
                • {makeup.product.brand} {makeup.product.product} in{" "}
                {makeup.shade.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}