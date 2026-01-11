import Tesseract from "tesseract.js"

export async function runOCR(imageUrl: string): Promise<string> {
  try {
    const result = await Tesseract.recognize(imageUrl, "eng", {
      logger: () => {},
    })

    return result.data.text || ""
  } catch (err) {
    console.error("OCR error:", err)
    return ""
  }
}
