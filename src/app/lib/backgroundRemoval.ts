// Background removal using remove.bg API
// For MVP, we'll use remove.bg API
// Later: migrate to self-hosted U²Net

const REMOVE_BG_API_KEY = process.env.NEXT_PUBLIC_REMOVE_BG_API_KEY || "";

export interface BackgroundRemovalOptions {
  size?: "auto" | "preview" | "full" | "medium" | "hd" | "4k";
  type?: "auto" | "person" | "product" | "car";
  format?: "auto" | "png" | "jpg";
  roi?: string;
  crop?: boolean;
  scale?: string;
}

export async function removeBackground(
  imageFile: File | Blob,
  options: BackgroundRemovalOptions = {}
): Promise<Blob> {
  const formData = new FormData();
  formData.append("image_file", imageFile);
  formData.append("size", options.size || "auto");
  formData.append("type", options.type || "person");
  
  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": REMOVE_BG_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.title || "Background removal failed");
    }

    return await response.blob();
  } catch (error) {
    console.error("Background removal error:", error);
    throw error;
  }
}

// Convert blob to data URL
export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Alternative: Client-side background removal placeholder
// This would be replaced with U²Net model later
export async function removeBackgroundClient(imageFile: File): Promise<string> {
  // For now, return original image
  // TODO: Implement U²Net model inference
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(imageFile);
  });
}

// Check if API key is configured
export function isBackgroundRemovalConfigured(): boolean {
  return REMOVE_BG_API_KEY.length > 0;
}