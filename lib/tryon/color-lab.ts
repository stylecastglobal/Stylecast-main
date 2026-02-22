import { LABColor, Undertone } from './types';

/** Convert hex string (#RRGGBB) to [R, G, B] 0-255 */
export function hexToRGB(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

/** Convert RGB (0-255) to CIE LAB (D65 illuminant) */
export function rgbToLAB(r: number, g: number, b: number): LABColor {
  // sRGB → linear
  let rr = r / 255;
  let gg = g / 255;
  let bb = b / 255;
  rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92;
  gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92;
  bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92;

  // linear RGB → XYZ (D65)
  let x = (rr * 0.4124564 + gg * 0.3575761 + bb * 0.1804375) / 0.95047;
  let y = (rr * 0.2126729 + gg * 0.7151522 + bb * 0.0721750);
  let z = (rr * 0.0193339 + gg * 0.1191920 + bb * 0.9503041) / 1.08883;

  // XYZ → LAB
  const f = (t: number) => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

/** Convert hex to LAB */
export function hexToLAB(hex: string): LABColor {
  const [r, g, b] = hexToRGB(hex);
  return rgbToLAB(r, g, b);
}

/** CIE76 ΔE (Euclidean distance in LAB space) */
export function deltaE(lab1: LABColor, lab2: LABColor): number {
  return Math.sqrt(
    (lab1.L - lab2.L) ** 2 +
    (lab1.a - lab2.a) ** 2 +
    (lab1.b - lab2.b) ** 2
  );
}

/** Classify undertone from LAB values */
export function classifyUndertone(lab: LABColor): Undertone {
  const hueAngle = (Math.atan2(lab.b, lab.a) * 180 / Math.PI + 360) % 360;

  if (lab.b > 8 && hueAngle >= 20 && hueAngle <= 60) return 'Warm';
  if (lab.b < 2 && hueAngle > 280) return 'Cool';
  if (lab.a > 5 && lab.b >= 4 && lab.b <= 10) return 'Olive';
  return 'Neutral';
}

/** Determine warm/cool pull direction from b* axis */
export function warmCoolPull(lab: LABColor): 'warm' | 'cool' {
  return lab.b > 5 ? 'warm' : 'cool';
}

/** Sample average color from canvas at a given region */
export function sampleCanvasColor(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number = 10
): [number, number, number] {
  const x = Math.max(0, Math.floor(cx - radius));
  const y = Math.max(0, Math.floor(cy - radius));
  const w = Math.min(radius * 2, ctx.canvas.width - x);
  const h = Math.min(radius * 2, ctx.canvas.height - y);
  if (w <= 0 || h <= 0) return [128, 128, 128];

  const imageData = ctx.getImageData(x, y, w, h);
  const data = imageData.data;
  let rSum = 0, gSum = 0, bSum = 0, count = 0;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue; // skip transparent
    rSum += data[i];
    gSum += data[i + 1];
    bSum += data[i + 2];
    count++;
  }

  if (count === 0) return [128, 128, 128];
  return [
    Math.round(rSum / count),
    Math.round(gSum / count),
    Math.round(bSum / count),
  ];
}

/** Convert RGB to hex string */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
}
