import { FaceZoneMask } from './types';

// MediaPipe FaceMesh landmark indices for each zone
const LANDMARK_ZONES = {
  lips: [
    61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
    308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78,
  ],
  cheeks: {
    left: [234, 93, 132, 58, 172, 136, 150, 149, 176, 148, 152],
    right: [454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152],
  },
  eyelids: {
    left: [226, 247, 30, 29, 27, 28, 56, 190, 243, 112, 26, 22, 23, 24, 110, 25],
    right: [446, 467, 260, 259, 257, 258, 286, 414, 463, 341, 256, 252, 253, 254, 339, 255],
  },
  cheekbones: {
    left: [116, 123, 147, 213, 192, 214, 210, 211],
    right: [345, 352, 376, 433, 416, 434, 430, 431],
  },
};

let faceMeshInstance: any = null;
let loadingPromise: Promise<any> | null = null;

/**
 * Load MediaPipe FaceMesh once and cache for the session.
 * Uses the CDN-hosted WASM bundle.
 */
export async function getFaceMesh(): Promise<any> {
  if (faceMeshInstance) return faceMeshInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    // Dynamically load MediaPipe FaceMesh from CDN
    const { FaceMesh } = await import('@mediapipe/face_mesh');

    const mesh = new FaceMesh({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    mesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    // Warm up the model
    await mesh.initialize();

    faceMeshInstance = mesh;
    return mesh;
  })();

  return loadingPromise;
}

export interface FaceLandmarks {
  landmarks: { x: number; y: number; z: number }[];
  width: number;
  height: number;
}

/**
 * Detect face landmarks from an image element or canvas.
 * Returns null if no face detected.
 */
export async function detectFace(
  imageSource: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
): Promise<FaceLandmarks | null> {
  const mesh = await getFaceMesh();

  return new Promise((resolve) => {
    mesh.onResults((results: any) => {
      if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
        resolve(null);
        return;
      }

      const landmarks = results.multiFaceLandmarks[0];
      const w = 'videoWidth' in imageSource
        ? imageSource.videoWidth
        : imageSource.width;
      const h = 'videoHeight' in imageSource
        ? imageSource.videoHeight
        : imageSource.height;

      resolve({
        landmarks: landmarks.map((l: any) => ({ x: l.x, y: l.y, z: l.z })),
        width: w,
        height: h,
      });
    });

    mesh.send({ image: imageSource });
  });
}

/**
 * Extract zone masks from face landmarks.
 * Returns pixel-coordinate polygons for each zone.
 */
export function extractZoneMasks(
  landmarks: FaceLandmarks
): FaceZoneMask[] {
  const { width, height } = landmarks;
  const lm = landmarks.landmarks;

  const toPixel = (indices: number[]) =>
    indices.map((i) => ({
      x: lm[i].x * width,
      y: lm[i].y * height,
    }));

  const masks: FaceZoneMask[] = [];

  // Lips
  masks.push({ zone: 'lips', points: toPixel(LANDMARK_ZONES.lips) });

  // Cheeks (combine left + right)
  masks.push({ zone: 'cheeks', points: toPixel(LANDMARK_ZONES.cheeks.left) });
  masks.push({ zone: 'cheeks', points: toPixel(LANDMARK_ZONES.cheeks.right) });

  // Eyelids
  masks.push({ zone: 'eyelids', points: toPixel(LANDMARK_ZONES.eyelids.left) });
  masks.push({ zone: 'eyelids', points: toPixel(LANDMARK_ZONES.eyelids.right) });

  // Cheekbones (highlight zone)
  masks.push({ zone: 'cheekbones', points: toPixel(LANDMARK_ZONES.cheekbones.left) });
  masks.push({ zone: 'cheekbones', points: toPixel(LANDMARK_ZONES.cheekbones.right) });

  return masks;
}

/**
 * Get the center of the left cheek landmark zone (for color picker default position).
 */
export function getCheekCenter(landmarks: FaceLandmarks): { x: number; y: number } {
  const lm = landmarks.landmarks;
  const indices = LANDMARK_ZONES.cheeks.left;
  let sx = 0, sy = 0;
  for (const i of indices) {
    sx += lm[i].x * landmarks.width;
    sy += lm[i].y * landmarks.height;
  }
  return { x: sx / indices.length, y: sy / indices.length };
}

/**
 * Get the zone that a product category maps to.
 */
export function categoryToZone(category: string): FaceZoneMask['zone'] {
  const cat = category.toLowerCase();
  if (cat.includes('lip') || cat.includes('lipstick')) return 'lips';
  if (cat.includes('blush')) return 'cheeks';
  if (cat.includes('eyeshadow')) return 'eyelids';
  if (cat.includes('highlight') || cat.includes('bronzer')) return 'cheekbones';
  return 'cheeks'; // fallback
}
