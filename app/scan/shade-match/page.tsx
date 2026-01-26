"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ColorPicker from "@/src/components/tryon/ColorPicker";
import { rgbToLab, rgbToHex } from "@/app/lib/color-analysis/colorScience";

type Match = {
  productId: string;
  brand: string;
  productName: string;
  shade: { shade_name: string; hex: string; undertone?: string };
  distance: number;
  accuracy: number;
};

function ShadeMatchInner() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "FOUNDATION";
  const [image, setImage] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedHex, setSelectedHex] = useState("");

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImage(url);
    setMatches([]);
  };

  const handleColorPicked = async (color: {
    r: number;
    g: number;
    b: number;
  }) => {
    const lab = rgbToLab(color);
    setSelectedHex(rgbToHex(color));

    const res = await fetch("/api/scanner/shade-match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lab, category }),
    });
    const data = await res.json();
    setMatches(data.matches || []);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Find Your Best Match</h1>
          <p className="text-gray-600 mt-2">
            Upload a selfie and tap your skin to match shades across brands.
          </p>
        </div>

        {!image && (
          <label className="block border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] &&
                handleFile(e.target.files[0])
              }
            />
            <span className="text-gray-600">Upload selfie</span>
          </label>
        )}

        {image && (
          <ColorPicker
            image={image}
            onColorPicked={handleColorPicked}
            productCategory="foundation"
          />
        )}

        {selectedHex && (
          <div className="flex items-center gap-3">
            <span
              className="w-8 h-8 rounded-full border"
              style={{ backgroundColor: selectedHex }}
            />
            <span className="text-sm font-mono">{selectedHex}</span>
          </div>
        )}

        {matches.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Best Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map((match) => (
                <div
                  key={`${match.productId}-${match.shade.shade_name}`}
                  className="border rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">
                        {match.brand}
                      </p>
                      <p className="font-semibold">
                        {match.productName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {match.shade.shade_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {match.accuracy}%
                      </div>
                      <div className="text-xs text-gray-400">
                        match
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-full h-12 rounded-lg border mt-3"
                    style={{
                      backgroundColor: match.shade.hex,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Loading shade matcher...</div>}>
      <ShadeMatchInner />
    </Suspense>
  );
}
