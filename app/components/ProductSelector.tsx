"use client";

import { useState, useEffect } from "react";
import { useMakeupStore } from "../lib/store";
import { MakeupCategory, Product, Shade } from "../types/makeup";

export default function ProductSelector() {
  const [selectedCategory, setSelectedCategory] = useState<MakeupCategory>("LIPS");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // 카테고리별로 독립적인 intensity 값 저장
  const [intensityByCategory, setIntensityByCategory] = useState<Record<MakeupCategory, number>>({
    LIPS: 50,
    CHEEKS: 50,
    EYESHADOW: 50,
    EYEBROW: 50,
  });
  
  const {
    selectedMakeups,
    addMakeup,
    removeMakeup,
    setCurrentCategory,
    preferredProductId,
  } = useMakeupStore();
  const [remoteProducts, setRemoteProducts] = useState<Product[]>([]);

  // Sync with store when category changes
  useEffect(() => {
    setCurrentCategory(selectedCategory);
  }, [selectedCategory, setCurrentCategory]);

  // 카테고리가 바뀔 때 해당 카테고리의 선택된 제품의 intensity 값 불러오기
  useEffect(() => {
    const currentSelection = getCurrentSelection();
    if (currentSelection) {
      // 현재 선택된 메이크업의 opacity를 intensity로 변환 (0.1~1.0 → 10~100)
      const opacityToIntensity = Math.round(((currentSelection.shade.opacity || 0.5) - 0.1) / 0.9 * 90 + 10);
      setIntensityByCategory(prev => ({
        ...prev,
        [selectedCategory]: opacityToIntensity
      }));
    }
  }, [selectedCategory]);

  const categories: { value: MakeupCategory; label: string }[] = [
    { value: "LIPS", label: "Lips" },
    { value: "CHEEKS", label: "Blush" },
    { value: "EYESHADOW", label: "Eyeshadow" },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      const cacheKey = `scan:category:${selectedCategory}`;
      const cached = sessionStorage.getItem(cacheKey);
      const data = cached
        ? JSON.parse(cached)
        : await fetch(`/api/scanner/category?category=${selectedCategory}`).then((r) => r.json());
      if (!cached) {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      }
      const mapped = (data.products || []).map((item: any) => ({
        ...item,
        shades: (item.shades || []).map((shade: any) => ({
          name: shade.shade_name || shade.name,
          hex: shade.hex || "#000000",
        })),
      }));
      setRemoteProducts(mapped);
    };
    loadProducts();
  }, [selectedCategory]);

  useEffect(() => {
    if (!preferredProductId || !remoteProducts.length) return;
    const match = remoteProducts.find((product) => product.id === preferredProductId);
    if (match) setSelectedProduct(match);
  }, [preferredProductId, remoteProducts]);

  const products = remoteProducts;

  const handleShadeSelect = (shade: Shade) => {
    if (!selectedProduct) return;

    const currentIntensity = intensityByCategory[selectedCategory];
    const calculatedOpacity = (currentIntensity / 100) * 0.9 + 0.1;

    addMakeup({
      category: selectedCategory,
      product: selectedProduct,
      shade: { ...shade, opacity: calculatedOpacity },
    });
  };

  const handleIntensityChange = (value: number) => {
    // 현재 카테고리의 intensity 업데이트
    setIntensityByCategory(prev => ({
      ...prev,
      [selectedCategory]: value
    }));
    
    const currentSelection = getCurrentSelection();
    if (currentSelection) {
      const calculatedOpacity = (value / 100) * 0.9 + 0.1;
      addMakeup({
        ...currentSelection,
        shade: { ...currentSelection.shade, opacity: calculatedOpacity },
      });
    }
  };

  const getCurrentSelection = () => {
    return selectedMakeups.find((m) => m.category === selectedCategory);
  };

  const currentSelection = getCurrentSelection();
  const currentIntensity = intensityByCategory[selectedCategory];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Color</h2>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setSelectedCategory(cat.value);
              setSelectedProduct(null);
            }}
            className={`
              flex-1 px-4 py-3 font-medium transition-all rounded-xl
              ${
                selectedCategory === cat.value
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Current Selection */}
      {currentSelection && (
        <div className="mb-6 p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-emerald-900 text-lg">
                {currentSelection.product.brand}
              </p>
              <p className="text-emerald-700 text-sm">{currentSelection.shade.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                  style={{ backgroundColor: currentSelection.shade.hex }}
                />
                <span className="text-sm font-mono text-emerald-600">
                  {currentSelection.shade.hex}
                </span>
              </div>
            </div>
            <button
              onClick={() => removeMakeup(selectedCategory)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Remove
            </button>
          </div>

          {/* Intensity Slider */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">
                Color Opacity
              </label>
              <span className="text-sm font-bold text-slate-900 bg-white px-3 py-1 rounded-full">
                {currentIntensity}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={currentIntensity}
              onChange={(e) => handleIntensityChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${currentIntensity}%, #e2e8f0 ${currentIntensity}%, #e2e8f0 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Sheer</span>
              <span>Opaque</span>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className={`
              p-4 rounded-xl text-left transition-all border-2
              ${
                selectedProduct?.id === product.id
                  ? "border-slate-900 bg-slate-50 shadow-lg"
                  : "border-slate-200 bg-white hover:border-slate-400"
              }
            `}
          >
            <h3 className="font-semibold text-slate-900">{product.brand}</h3>
            <p className="text-sm text-slate-600 mt-1">{product.product}</p>
            <p className="text-xs text-slate-500 mt-2">
              {product.shades.length} shades
            </p>
          </button>
        ))}
      </div>

      {/* Shade Selector */}
      {selectedProduct && (
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 className="font-semibold text-slate-900 mb-4">
            Choose a shade from {selectedProduct.brand}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {selectedProduct.shades.map((shade) => (
              <button
                key={shade.name}
                onClick={() => handleShadeSelect(shade)}
                className={`
                  p-3 rounded-lg transition-all border-2
                  ${
                    currentSelection?.shade.name === shade.name
                      ? "border-slate-900 ring-4 ring-slate-200"
                      : "border-slate-200 hover:border-slate-400"
                  }
                `}
              >
                <div
                  className="w-full h-14 rounded-lg mb-2 border border-slate-200"
                  style={{ backgroundColor: shade.hex }}
                />
                <p className="text-sm font-medium text-slate-900">{shade.name}</p>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  {shade.hex}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}