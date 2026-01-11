'use client';

import { useState } from 'react';
import { CheckCircle2, Award, TrendingUp } from 'lucide-react';

interface ShadeMatchingProps {
  pickedColor: { r: number; g: number; b: number };
  matchedShade: any;
  allShades: any[];
  onShadeSelected: (shade: any) => void;
}

export default function ShadeMatching({
  pickedColor,
  matchedShade,
  allShades,
  onShadeSelected,
}: ShadeMatchingProps) {
  const [selectedShade, setSelectedShade] = useState(matchedShade);

  const handleShadeClick = (shade: any) => {
    const distance = Math.sqrt(
      Math.pow(shade.rgb.r - pickedColor.r, 2) +
      Math.pow(shade.rgb.g - pickedColor.g, 2) +
      Math.pow(shade.rgb.b - pickedColor.b, 2)
    );
    const maxDistance = Math.sqrt(255 * 255 + 255 * 255 + 255 * 255);
    const matchPercentage = Math.round((1 - distance / maxDistance) * 100);

    const updatedShade = { ...shade, matchPercentage };
    setSelectedShade(updatedShade);
    onShadeSelected(updatedShade);
  };

  return (
    <div className="space-y-6">
      {/* Best Match Card */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-2 border-purple-200 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-purple-900">Best Match Found!</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Your Color */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="text-sm text-gray-500 mb-3 font-medium">Your Skin Tone</div>
            <div
              className="w-full h-32 rounded-xl border-2 border-gray-300 mb-3 shadow-sm"
              style={{
                backgroundColor: `rgb(${pickedColor.r}, ${pickedColor.g}, ${pickedColor.b})`,
              }}
            />
            <div className="text-xs font-mono text-gray-600">
              RGB({pickedColor.r}, {pickedColor.g}, {pickedColor.b})
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="text-4xl text-purple-400">→</div>
          </div>

          {/* Matched Shade */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-300">
            <div className="text-sm text-gray-500 mb-3 font-medium">Recommended Shade</div>
            <div
              className="w-full h-32 rounded-xl border-2 border-purple-400 mb-3 shadow-lg"
              style={{ backgroundColor: selectedShade.hex }}
            />
            <div className="font-bold text-lg mb-1 text-[#111]">{selectedShade.name}</div>
            <div className="text-sm text-gray-600 mb-3">{selectedShade.description}</div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-xl">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-lg font-bold text-purple-600">
                {selectedShade.matchPercentage}% Match
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* All Shades */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8">
        <h3 className="text-2xl font-bold mb-6 text-[#111]">All Available Shades</h3>
        
        <div className="space-y-4">
          {allShades.map((shade) => {
            const distance = Math.sqrt(
              Math.pow(shade.rgb.r - pickedColor.r, 2) +
              Math.pow(shade.rgb.g - pickedColor.g, 2) +
              Math.pow(shade.rgb.b - pickedColor.b, 2)
            );
            const maxDistance = Math.sqrt(255 * 255 + 255 * 255 + 255 * 255);
            const matchPercentage = Math.round((1 - distance / maxDistance) * 100);
            const isSelected = selectedShade.id === shade.id;
            const isBestMatch = matchedShade.id === shade.id;

            return (
              <button
                key={shade.id}
                onClick={() => handleShadeClick(shade)}
                className={`w-full flex items-center gap-6 p-5 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'border-purple-400 bg-purple-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {/* Shade Color */}
                <div
                  className="w-20 h-20 rounded-xl flex-shrink-0 border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: shade.hex }}
                />

                {/* Shade Info */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-lg text-[#111]">{shade.name}</span>
                    {isBestMatch && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full border border-purple-200">
                        Best Match
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{shade.description}</div>
                </div>

                {/* Match Percentage */}
                <div className="text-right">
                  <div className={`text-3xl font-bold ${
                    matchPercentage >= 90 ? 'text-green-600' :
                    matchPercentage >= 75 ? 'text-yellow-600' :
                    'text-gray-400'
                  }`}>
                    {matchPercentage}%
                  </div>
                  <div className="text-xs text-gray-500 font-medium">Match</div>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <CheckCircle2 className="w-7 h-7 text-purple-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Match Score Legend */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <div className="text-sm font-bold mb-4 text-gray-700">Match Score Guide</div>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-600" />
            <span className="text-sm text-gray-700">90-100% Perfect Match</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-yellow-600" />
            <span className="text-sm text-gray-700">75-89% Good Match</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gray-400" />
            <span className="text-sm text-gray-700">Below 75% Try Another</span>
          </div>
        </div>
      </div>
    </div>
  );
}