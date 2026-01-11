// app/ai-makeup-studio/lib/skinTone.ts

import { Lab, RGB, rgbToHex, rgbToLab } from "./colorUtils";

export type SkinBrightness = "Fair" | "Light" | "Medium" | "Tan" | "Deep";
export type SkinUndertone = "Warm" | "Cool" | "Neutral";

export interface SkinToneResult {
  brightness: SkinBrightness;
  undertone: SkinUndertone;
  rgb: RGB;
  hex: string;
  lab: Lab;
}

/**
 * Analyze skin tone from an image URL.
 * For v1, we sample the central 40% of the image as a proxy for the face area.
 */
export async function analyzeSkinToneFromImageUrl(
  imageUrl: string
): Promise<SkinToneResult | null> {
  try {
    const img = await loadImage(imageUrl);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const { width, height } = canvas;

    // Central region (40% of width and height)
    const regionWidth = width * 0.4;
    const regionHeight = height * 0.4;
    const startX = (width - regionWidth) / 2;
    const startY = (height - regionHeight) / 2;

    const imageData = ctx.getImageData(
      startX,
      startY,
      regionWidth,
      regionHeight
    );
    const { data } = imageData;

    let rSum = 0;
    let gSum = 0;
    let bSum = 0;
    let count = 0;

    // Walk pixels, step by 4 (r,g,b,a)
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // skip transparent pixels
      if (a < 200) continue;

      rSum += r;
      gSum += g;
      bSum += b;
      count++;
    }

    if (count === 0) return null;

    const avg: RGB = {
      r: rSum / count,
      g: gSum / count,
      b: bSum / count,
    };

    const lab = rgbToLab(avg);
    const hex = rgbToHex(avg);

    const brightness = classifyBrightness(lab.L);
    const undertone = classifyUndertone(lab.a, lab.b);

    return {
      brightness,
      undertone,
      rgb: avg,
      hex,
      lab,
    };
  } catch (err) {
    console.error("Skin tone analysis failed:", err);
    return null;
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

function classifyBrightness(L: number): SkinBrightness {
  if (L >= 80) return "Fair";
  if (L >= 70) return "Light";
  if (L >= 55) return "Medium";
  if (L >= 40) return "Tan";
  return "Deep";
}

function classifyUndertone(a: number, b: number): SkinUndertone {
  const diff = a - b;
  const threshold = 8;

  if (diff > threshold) return "Warm";
  if (diff < -threshold) return "Cool";
  return "Neutral";
}
