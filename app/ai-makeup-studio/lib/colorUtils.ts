// app/ai-makeup-studio/lib/colorUtils.ts

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Lab {
  L: number;
  a: number;
  b: number;
}

export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (v: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(v)));
    return clamped.toString(16).padStart(2, "0");
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// sRGB → XYZ → Lab conversion (standard formulas)
export function rgbToLab({ r, g, b }: RGB): Lab {
  // 1. normalize
  let R = r / 255;
  let G = g / 255;
  let B = b / 255;

  // 2. inverse gamma
  const pivot = (v: number) =>
    v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;

  R = pivot(R);
  G = pivot(G);
  B = pivot(B);

  // 3. RGB → XYZ (D65)
  const X = R * 0.4124564 + G * 0.3575761 + B * 0.1804375;
  const Y = R * 0.2126729 + G * 0.7151522 + B * 0.0721750;
  const Z = R * 0.0193339 + G * 0.1191920 + B * 0.9503041;

  // 4. Normalize by reference white (D65)
  const Xr = 0.95047;
  const Yr = 1.0;
  const Zr = 1.08883;

  const fx = f(X / Xr);
  const fy = f(Y / Yr);
  const fz = f(Z / Zr);

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const bVal = 200 * (fy - fz);

  return { L, a, b: bVal };
}

function f(t: number): number {
  const delta = 6 / 29;
  const delta3 = delta * delta * delta;

  if (t > delta3) {
    return Math.cbrt(t);
  }
  return t / (3 * delta * delta) + 4 / 29;
}
