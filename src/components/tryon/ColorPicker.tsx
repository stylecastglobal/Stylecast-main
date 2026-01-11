'use client';

import { useRef, useEffect, useState } from 'react';
import { Target } from 'lucide-react';

interface ColorPickerProps {
  image: string;
  onColorPicked: (color: { r: number; g: number; b: number }) => void;
  productCategory: string;
}

export default function ColorPicker({ image, onColorPicked, productCategory }: ColorPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [previewColor, setPreviewColor] = useState<{ r: number; g: number; b: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = image;
  }, [image]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    setPreviewColor({ r: pixel[0], g: pixel[1], b: pixel[2] });
  };

  const handleClick = () => {
    if (previewColor) {
      onColorPicked(previewColor);
    }
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-purple-900 mb-2 text-lg">Pick Your Skin Tone</h3>
            <p className="text-sm text-purple-800">
              {productCategory === 'foundation' 
                ? 'Click on your forehead, cheek, or jawline to pick your natural skin tone'
                : 'Click on the area where you want to apply color'}
            </p>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden relative">
        <canvas
          ref={canvasRef}
          className="w-full h-auto cursor-crosshair"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />

        {/* Cursor Preview */}
        {cursorPosition && previewColor && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-full border-4 border-white shadow-2xl"
                style={{
                  backgroundColor: `rgb(${previewColor.r}, ${previewColor.g}, ${previewColor.b})`,
                }}
              />
              <div className="mt-3 px-4 py-2 bg-black/90 rounded-xl text-xs font-mono text-white shadow-lg">
                RGB({previewColor.r}, {previewColor.g}, {previewColor.b})
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Color Preview */}
      {previewColor && (
        <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div
            className="w-24 h-24 rounded-2xl border-2 border-gray-300 shadow-sm"
            style={{
              backgroundColor: `rgb(${previewColor.r}, ${previewColor.g}, ${previewColor.b})`,
            }}
          />
          <div className="flex-1">
            <div className="font-bold text-lg mb-1 text-[#111]">Selected Color</div>
            <div className="text-sm text-gray-600 font-mono">
              RGB({previewColor.r}, {previewColor.g}, {previewColor.b})
            </div>
          </div>
          <button
            onClick={handleClick}
            className="px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-sm"
          >
            Confirm →
          </button>
        </div>
      )}
    </div>
  );
}