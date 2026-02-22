/**
 * Session-only selfie store.
 * Stores the selfie image URL in memory so it can be reused
 * between Feature A (Try-On) and Feature B (Shade Finder)
 * without re-uploading.
 *
 * No data is persisted to disk, localStorage, or any server.
 */

let selfieObjectUrl: string | null = null;
let selfieImageElement: HTMLImageElement | null = null;

export function setSelfie(objectUrl: string): void {
  // Revoke previous URL to free memory
  if (selfieObjectUrl && selfieObjectUrl !== objectUrl) {
    URL.revokeObjectURL(selfieObjectUrl);
  }
  selfieObjectUrl = objectUrl;
  selfieImageElement = null; // reset cached element
}

export function getSelfieUrl(): string | null {
  return selfieObjectUrl;
}

/**
 * Get or create an HTMLImageElement from the stored selfie URL.
 * Caches the element so it's not recreated on every call.
 */
export async function getSelfieImage(): Promise<HTMLImageElement | null> {
  if (!selfieObjectUrl) return null;
  if (selfieImageElement) return selfieImageElement;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      selfieImageElement = img;
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = selfieObjectUrl!;
  });
}

export function clearSelfie(): void {
  if (selfieObjectUrl) {
    URL.revokeObjectURL(selfieObjectUrl);
  }
  selfieObjectUrl = null;
  selfieImageElement = null;
}

export function hasSelfie(): boolean {
  return selfieObjectUrl !== null;
}
