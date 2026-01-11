"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { useMakeupStore } from "../lib/store";
import { BrushStroke } from "../types/makeup";

// Canvas를 외부에서 접근할 수 있도록 ref 타입 정의
export interface BrushCanvasRef {
  getCanvas: () => HTMLCanvasElement | null;
}

const BrushCanvas = forwardRef<BrushCanvasRef>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);

  const {
    originalImage,
    selectedMakeups,
    currentCategory,
    brushStrokes,
    currentBrushSize,
    isErasing,
    addBrushStroke,
  } = useMakeupStore();

  const currentMakeup = selectedMakeups.find((m) => m.category === currentCategory);

  // Expose canvas to parent component
  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));

  // Load image
  useEffect(() => {
    if (!originalImage || !imageRef.current || !canvasRef.current) return;

    const img = imageRef.current;
    const canvas = canvasRef.current;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      redrawCanvas();
    };
    img.src = originalImage;
  }, [originalImage]);

  // Redraw when strokes change
  useEffect(() => {
    redrawCanvas();
  }, [brushStrokes]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Clear and draw image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    // Draw all strokes
    brushStrokes.forEach((stroke) => {
      drawStroke(ctx, stroke);
    });
  };

  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: BrushStroke) => {
    if (stroke.points.length < 2) return;

    ctx.save();
    
    // 카테고리별로 다른 블렌드 모드 적용
    switch (stroke.category) {
      case "LIPS":
        ctx.globalCompositeOperation = "source-over";
        break;
      case "CHEEKS":
        ctx.globalCompositeOperation = "multiply";
        break;
      case "EYESHADOW":
        ctx.globalCompositeOperation = "multiply";
        break;
      default:
        ctx.globalCompositeOperation = "source-over";
    }
    
    ctx.globalAlpha = stroke.opacity;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.brushSize;
    ctx.filter = `blur(${stroke.brushSize * 0.3}px)`;

    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    
    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }
    
    ctx.stroke();
    ctx.restore();
  };

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!currentMakeup && !isErasing) return;
    
    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    setIsDrawing(true);
    setCurrentStroke([coords]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    const newStroke = [...currentStroke, coords];
    setCurrentStroke(newStroke);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !currentMakeup) return;

    redrawCanvas();

    const previewStroke: BrushStroke = {
      category: currentMakeup.category,
      color: isErasing ? "#FFFFFF" : currentMakeup.shade.hex,
      opacity: isErasing ? 1 : (currentMakeup.shade.opacity || 0.5),
      brushSize: currentBrushSize,
      points: newStroke,
    };

    drawStroke(ctx, previewStroke);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentStroke.length > 1 && currentMakeup) {
      const newStroke: BrushStroke = {
        category: currentMakeup.category,
        color: isErasing ? "#FFFFFF" : currentMakeup.shade.hex,
        opacity: isErasing ? 1 : (currentMakeup.shade.opacity || 0.5),
        brushSize: currentBrushSize,
        points: currentStroke,
      };

      addBrushStroke(newStroke);
    }

    setCurrentStroke([]);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!currentMakeup && !isErasing) return;
    
    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    setIsDrawing(true);
    setCurrentStroke([coords]);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    const newStroke = [...currentStroke, coords];
    setCurrentStroke(newStroke);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !currentMakeup) return;

    redrawCanvas();

    const previewStroke: BrushStroke = {
      category: currentMakeup.category,
      color: isErasing ? "#FFFFFF" : currentMakeup.shade.hex,
      opacity: isErasing ? 1 : (currentMakeup.shade.opacity || 0.5),
      brushSize: currentBrushSize,
      points: newStroke,
    };

    drawStroke(ctx, previewStroke);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  if (!originalImage) return null;

  return (
    <div className="w-full">
      <div className="relative bg-slate-100 rounded-2xl overflow-hidden shadow-lg">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-auto cursor-crosshair"
          style={{
            touchAction: "none",
          }}
        />
        <img
          ref={imageRef}
          src={originalImage}
          alt="Source"
          className="hidden"
          crossOrigin="anonymous"
        />

        {/* Brush cursor preview */}
        {currentMakeup && (
          <div
            className="absolute top-4 left-4 pointer-events-none"
            style={{
              width: currentBrushSize,
              height: currentBrushSize,
              borderRadius: "50%",
              border: "2px solid white",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
              backgroundColor: isErasing ? "rgba(255,255,255,0.5)" : `${currentMakeup.shade.hex}80`,
            }}
          />
        )}
      </div>
    </div>
  );
});

BrushCanvas.displayName = "BrushCanvas";

export default BrushCanvas;