let openCvLoading: Promise<void> | null = null
let openCvReady = false

export async function loadOpenCV(): Promise<void> {
  if (openCvReady) return

  if (typeof window === "undefined") {
    // 서버에서는 아무 것도 하지 않음
    return
  }

  if (openCvLoading) {
    return openCvLoading
  }

  openCvLoading = new Promise<void>((resolve, reject) => {
    // 이미 cv가 로드되어 있으면 바로 끝
    const existing = (window as any).cv
    if (existing && existing.Mat) {
      openCvReady = true
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = "https://docs.opencv.org/4.x/opencv.js"
    script.async = true

    script.onload = () => {
      const cv = (window as any).cv
      if (cv && cv.Mat) {
        openCvReady = true
        resolve()
      } else {
        // 혹시 초기화가 느릴 경우 조금 기다렸다가 다시 확인
        setTimeout(() => {
          const cv2 = (window as any).cv
          if (cv2 && cv2.Mat) {
            openCvReady = true
            resolve()
          } else {
            reject(new Error("OpenCV failed to initialize"))
          }
        }, 500)
      }
    }

    script.onerror = () => {
      reject(new Error("Failed to load OpenCV script"))
    }

    document.body.appendChild(script)
  })

  return openCvLoading
}
