'use client';

import { useRef, useEffect, useState } from 'react';
import { Paintbrush, RotateCcw, Download, Minus, Plus } from 'lucide-react';

interface BrushCanvasProps {
  image: string;
  shades: any[];
  productCategory: string;
}

export default function BrushCanvas({ image, shades, productCategory }: BrushCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [selectedShade, setSelectedShade] = useState(shades[0]);
  const [brushSize, setBrushSize] = useState(30);
  const [opacity, setOpacity] = useState(0.6);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!canvas || !overlayCanvas) return;

    const ctx = canvas.getContext('2d');
    const overlayCtx = overlayCanvas.getContext('2d');
    if (!ctx || !overlayCtx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      overlayCanvas.width = img.width;
      overlayCanvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
    };
    img.src = image;
  }, [image]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown') return;

    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.globalAlpha = opacity;
    ctx.fillStyle = selectedShade.hex;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveImage = () => {
    const baseCanvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!baseCanvas || !overlayCanvas) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = baseCanvas.width;
    tempCanvas.height = baseCanvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    tempCtx.drawImage(baseCanvas, 0, 0);
    tempCtx.drawImage(overlayCanvas, 0, 0);

    const link = document.createElement('a');
    link.download = `makeup-${selectedShade.name}.png`;
    link.href = tempCanvas.toDataURL();
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
            <Paintbrush className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h3 className="font-bold text-pink-900 mb-2 text-lg">Paint & Preview</h3>
            <p className="text-sm text-pink-800">
              Use the brush to apply {productCategory} on your photo. Adjust size and opacity for the perfect look.
            </p>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-auto"
          />
          
          <canvas
            ref={overlayCanvasRef}
            className="absolute top-0 left-0 w-full h-auto cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />

          {isDrawing && (
            <div className="absolute top-4 right-4 px-4 py-2 bg-black/90 rounded-xl text-xs text-white font-medium shadow-lg">
              Brush: {brushSize}px | Opacity: {Math.round(opacity * 100)}%
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-gray-200 space-y-6 bg-gray-50">
          {/* Brush Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-700">Brush Size</span>
              <span className="text-sm text-gray-600 font-mono">{brushSize}px</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setBrushSize(Math.max(10, brushSize - 5))}
                className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
              >
                <Minus className="w-4 h-4 text-gray-700" />
              </button>
              <input
                type="range"
                min="10"
                max="100"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <button
                onClick={() => setBrushSize(Math.min(100, brushSize + 5))}
                className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Opacity */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-700">Opacity</span>
              <span className="text-sm text-gray-600 font-mono">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity * 100}
              onChange={(e) => setOpacity(parseInt(e.target.value) / 100)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={clearCanvas}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
            <button
              onClick={saveImage}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all font-bold shadow-sm"
            >
              <Download className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Shade Selector */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8">
        <h3 className="text-2xl font-bold mb-6 text-[#111]">Select Shade</h3>
        
        {/* Selected Shade */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6 flex items-center gap-6 border border-gray-200">
          <div
            className="w-24 h-24 rounded-2xl border-2 border-gray-300 shadow-sm"
            style={{ backgroundColor: selectedShade.hex }}
          />
          <div>
            <div className="font-bold text-xl mb-1 text-[#111]">{selectedShade.name}</div>
            <div className="text-sm text-gray-600">{selectedShade.description}</div>
          </div>
        </div>

        {/* Shade Grid */}
        <div className="grid grid-cols-4 gap-4">
          {shades.map((shade) => (
            <button
              key={shade.id}
              onClick={() => setSelectedShade(shade)}
              className={`aspect-square rounded-2xl border-2 transition-all shadow-sm ${
                selectedShade.id === shade.id
                  ? 'border-black scale-105 shadow-lg'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              style={{ backgroundColor: shade.hex }}
              title={shade.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}