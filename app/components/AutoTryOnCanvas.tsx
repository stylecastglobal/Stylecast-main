"use client";

import { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import { useMakeupStore } from "@/app/lib/store";

const LIP_INDICES = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308];
const LEFT_EYE = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE = [362, 385, 387, 263, 373, 380];

function toPoint(landmark: any, width: number, height: number) {
  return { x: landmark.x * width, y: landmark.y * height };
}

export default function AutoTryOnCanvas() {
  const { originalImage, selectedMakeups } = useMakeupStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!originalImage) return;

    let cancelled = false;
    let landmarker: FaceLandmarker | null = null;

    const run = async () => {
      try {
        setError("");
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = originalImage;
        await img.decode();

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm"
        );
        landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
          runningMode: "IMAGE",
          numFaces: 1,
        });

        const results = landmarker.detect(img);
        const landmarks = results.faceLandmarks?.[0];
        if (!landmarks || cancelled) {
          setError("Could not detect face. Try a clearer selfie.");
          return;
        }

        for (const makeup of selectedMakeups) {
          const color = makeup.shade.hex;
          const opacity = makeup.shade.opacity ?? 0.5;

          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.fillStyle = color;

          if (makeup.category === "LIPS") {
            ctx.beginPath();
            LIP_INDICES.forEach((idx, i) => {
              const point = toPoint(landmarks[idx], canvas.width, canvas.height);
              if (i === 0) ctx.moveTo(point.x, point.y);
              else ctx.lineTo(point.x, point.y);
            });
            ctx.closePath();
            ctx.fill();
          }

          if (makeup.category === "EYESHADOW") {
            ctx.beginPath();
            LEFT_EYE.forEach((idx, i) => {
              const point = toPoint(landmarks[idx], canvas.width, canvas.height);
              if (i === 0) ctx.moveTo(point.x, point.y);
              else ctx.lineTo(point.x, point.y);
            });
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            RIGHT_EYE.forEach((idx, i) => {
              const point = toPoint(landmarks[idx], canvas.width, canvas.height);
              if (i === 0) ctx.moveTo(point.x, point.y);
              else ctx.lineTo(point.x, point.y);
            });
            ctx.closePath();
            ctx.fill();
          }

          if (makeup.category === "CHEEKS") {
            const left = toPoint(landmarks[234], canvas.width, canvas.height);
            const right = toPoint(landmarks[454], canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(left.x, left.y, canvas.width * 0.05, 0, Math.PI * 2);
            ctx.arc(right.x, right.y, canvas.width * 0.05, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      } catch (err) {
        console.error(err);
        setError("Auto try-on failed. Use manual brush mode instead.");
      }
    };

    run();

    return () => {
      cancelled = true;
      landmarker?.close();
    };
  }, [originalImage, selectedMakeups]);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
      {error && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white text-sm px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
