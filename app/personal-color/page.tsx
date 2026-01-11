"use client";

import { useState } from "react";
import UploadStep from "../../src/components/UploadStep";
import ProcessingStep from "../../src/components/ProcessingStep";
import ResultStep from "../../src/components/ResultStep";
import { analyzePersonalColor } from "../../lib/colorAnalysis";
import { PersonalColorResult, AnalysisStep } from "../../lib/types";

export default function PersonalColorPage() {
  const [currentStep, setCurrentStep] = useState<AnalysisStep>("upload");
  const [result, setResult] = useState<PersonalColorResult | null>(null);

  const handleImagesSelected = async (images: string[]) => {
    setCurrentStep("processing");

    try {
      const analysisResult = await analyzePersonalColor(images);
      setResult(analysisResult);
      setCurrentStep("result");
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
      setCurrentStep("upload");
    }
  };

  const handleReset = () => {
    setCurrentStep("upload");
    setResult(null);
  };

  return (
    <main>
      {currentStep === "upload" && (
        <UploadStep onImagesSelected={handleImagesSelected} />
      )}

      {currentStep === "processing" && <ProcessingStep />}

      {currentStep === "result" && result && (
        <ResultStep result={result} onReset={handleReset} />
      )}
    </main>
  );
}