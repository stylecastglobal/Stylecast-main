import { loadOpenCV } from "@/lib/loadOpenCV";

type Histogram = number[];

function computeHistogram(image: HTMLImageElement, bins = 8): Histogram {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  ctx.drawImage(image, 0, 0);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const bucketCount = bins * bins * bins;
  const hist = new Array(bucketCount).fill(0);

  for (let i = 0; i < data.length; i += 4) {
    const r = Math.floor((data[i] / 256) * bins);
    const g = Math.floor((data[i + 1] / 256) * bins);
    const b = Math.floor((data[i + 2] / 256) * bins);
    const idx = r * bins * bins + g * bins + b;
    hist[idx] += 1;
  }

  const total = data.length / 4;
  return hist.map((value) => value / total);
}

function histogramSimilarity(a: Histogram, b: Histogram): number {
  if (!a.length || !b.length || a.length !== b.length) return 0;
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) {
    sum += 1 - Math.abs(a[i] - b[i]);
  }
  return sum / a.length;
}

async function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function orbSimilarity(target: HTMLImageElement, candidate: HTMLImageElement): number | null {
  const cv = (window as any).cv;
  if (!cv?.ORB) return null;

  const toMat = (img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    return cv.imread(canvas);
  };

  const matA = toMat(target);
  const matB = toMat(candidate);
  if (!matA || !matB) return null;

  const orb = new cv.ORB();
  const kpA = new cv.KeyPointVector();
  const kpB = new cv.KeyPointVector();
  const descA = new cv.Mat();
  const descB = new cv.Mat();

  orb.detectAndCompute(matA, new cv.Mat(), kpA, descA);
  orb.detectAndCompute(matB, new cv.Mat(), kpB, descB);

  let similarity = null;
  if (!descA.empty() && !descB.empty()) {
    const bf = new cv.BFMatcher(cv.NORM_HAMMING, true);
    const matches = new cv.DMatchVector();
    bf.match(descA, descB, matches);
    const matchCount = matches.size();
    const norm = Math.max(kpA.size(), kpB.size(), 1);
    similarity = Math.min(1, matchCount / norm);
    matches.delete();
    bf.delete();
  }

  matA.delete();
  matB.delete();
  kpA.delete();
  kpB.delete();
  descA.delete();
  descB.delete();
  orb.delete();

  return similarity;
}

export async function scoreImageSimilarity(targetUrl: string, candidateUrl: string): Promise<number> {
  const [targetImg, candidateImg] = await Promise.all([loadImage(targetUrl), loadImage(candidateUrl)]);

  try {
    await loadOpenCV();
    const orbScore = orbSimilarity(targetImg, candidateImg);
    if (orbScore !== null) return orbScore;
  } catch {
    // fall back to histogram
  }

  const histA = computeHistogram(targetImg);
  const histB = computeHistogram(candidateImg);
  return histogramSimilarity(histA, histB);
}
