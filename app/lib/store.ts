import { create } from "zustand";
import { SelectedMakeup, BrushStroke, MakeupCategory } from "../types/makeup";

interface MakeupStore {
  originalImage: string | null;
  processedImage: string | null;

  selectedMakeups: SelectedMakeup[];
  currentCategory: MakeupCategory;

  brushStrokes: BrushStroke[];
  currentBrushSize: number;
  isErasing: boolean;

  isProcessing: boolean;
  currentStep: "upload" | "apply" | "save";

  // ⭐ Before/After toggle
  viewMode: "before" | "after";
  setViewMode: (mode: "before" | "after") => void;

  setOriginalImage: (image: string) => void;
  setProcessedImage: (image: string) => void;
  addMakeup: (makeup: SelectedMakeup) => void;
  removeMakeup: (category: string) => void;
  clearAllMakeup: () => void;
  setCurrentCategory: (category: MakeupCategory) => void;

  addBrushStroke: (stroke: BrushStroke) => void;
  undoLastStroke: () => void;
  clearAllStrokes: () => void;
  clearStrokesByCategory: (category: string) => void;
  setBrushSize: (size: number) => void;
  setIsErasing: (erasing: boolean) => void;

  setIsProcessing: (processing: boolean) => void;
  setCurrentStep: (step: "upload" | "apply" | "save") => void;
  reset: () => void;
}

export const useMakeupStore = create<MakeupStore>((set) => ({
  originalImage: null,
  processedImage: null,
  selectedMakeups: [],
  currentCategory: "LIPS",
  brushStrokes: [],
  currentBrushSize: 30,
  isErasing: false,
  isProcessing: false,
  currentStep: "upload",

  // ⭐ NEW: Before/After
  viewMode: "after",
  setViewMode: (mode) => set({ viewMode: mode }),

  setOriginalImage: (image) =>
    set({ originalImage: image, processedImage: image, currentStep: "apply" }),

  setProcessedImage: (image) => set({ processedImage: image }),

  addMakeup: (makeup) =>
    set((state) => {
      const filtered = state.selectedMakeups.filter(
        (m) => m.category !== makeup.category
      );
      return { selectedMakeups: [...filtered, makeup] };
    }),

  removeMakeup: (category) =>
    set((state) => ({
      selectedMakeups: state.selectedMakeups.filter(
        (m) => m.category !== category
      ),
      brushStrokes: state.brushStrokes.filter(
        (s) => s.category !== category
      ),
    })),

  clearAllMakeup: () => set({ selectedMakeups: [], brushStrokes: [] }),

  setCurrentCategory: (category) => set({ currentCategory: category }),

  addBrushStroke: (stroke) =>
    set((state) => ({
      brushStrokes: [...state.brushStrokes, stroke],
    })),

  undoLastStroke: () =>
    set((state) => ({
      brushStrokes: state.brushStrokes.slice(0, -1),
    })),

  clearAllStrokes: () => set({ brushStrokes: [] }),

  clearStrokesByCategory: (category) =>
    set((state) => ({
      brushStrokes: state.brushStrokes.filter(
        (s) => s.category !== category
      ),
    })),

  setBrushSize: (size) => set({ currentBrushSize: size }),
  setIsErasing: (erasing) => set({ isErasing: erasing }),

  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setCurrentStep: (step) => set({ currentStep: step }),

  reset: () =>
    set({
      originalImage: null,
      processedImage: null,
      selectedMakeups: [],
      currentCategory: "LIPS",
      brushStrokes: [],
      currentBrushSize: 30,
      isErasing: false,
      isProcessing: false,
      currentStep: "upload",
      viewMode: "after",
    }),
}));
