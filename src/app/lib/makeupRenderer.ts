export function canvasToDataURL(canvas: HTMLCanvasElement, format: string = "image/png"): string {
  return canvas.toDataURL(format, 0.95);
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string = "makeup-look.png"): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}