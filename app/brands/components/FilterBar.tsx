"use client";

import { useState } from "react";

interface FilterBarProps {
  isExclusiveChecked: boolean;
  setIsExclusiveChecked: (checked: boolean) => void;
}

export default function FilterBar({
  isExclusiveChecked,
  setIsExclusiveChecked,
}: FilterBarProps) {
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [isStyleOpen, setIsStyleOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const styles = [
    "ALL STYLE",
    "STREET MOOD",
    "URBAN CASUAL",
    "YOUNG CASUAL",
    "MODERN CLASSIC",
    "HERITAGE LOOK",
    "SIMPLE & EASY",
    "K-BEAUTY",
  ];

  const toggleStyle = (styleName: string) => {
    if (styleName === "ALL STYLE") {
      setSelectedStyles([]);
    } else {
      setSelectedStyles((prev) =>
        prev.includes(styleName)
          ? prev.filter((s) => s !== styleName)
          : [...prev, styleName]
      );
    }
  };

  const clearFilters = () => {
    setSelectedGender("All");
    setSelectedStyles([]);
  };

  return (
    <div className="border-b border-gray-200 bg-white sticky top-28 z-40">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Exclusive Checkbox */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isExclusiveChecked}
                  onChange={(e) => setIsExclusiveChecked(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border-2 rounded transition-all ${
                    isExclusiveChecked
                      ? "bg-black border-black"
                      : "bg-white border-gray-400 group-hover:border-gray-600"
                  }`}
                >
                  {isExclusiveChecked && (
                    <svg
                      className="w-full h-full text-white"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8l3 3 7-7"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm font-semibold text-black">EXCLUSIVE</span>
            </label>
          </div>

          {/* Right: Filter Dropdowns */}
          <div className="flex items-center gap-3">
            {/* All (Gender) Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsAllOpen(!isAllOpen);
                  setIsStyleOpen(false);
                }}
                className="flex items-center gap-2 px-6 py-2.5 border-2 border-black rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors bg-white text-black"
              >
                All
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isAllOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Gender Dropdown - BLACK THEME */}
              {isAllOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-black rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-6">
                    <h4 className="text-white text-base font-bold mb-5 tracking-wide">
                      Gender
                    </h4>
                    <div className="space-y-4">
                      {["All", "Women", "Men"].map((gender) => (
                        <label
                          key={gender}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name="gender"
                              checked={selectedGender === gender}
                              onChange={() => setSelectedGender(gender)}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                selectedGender === gender
                                  ? "border-white bg-white"
                                  : "border-gray-500 group-hover:border-white"
                              }`}
                            >
                              {selectedGender === gender && (
                                <div className="w-2.5 h-2.5 rounded-full bg-black" />
                              )}
                            </div>
                          </div>
                          <span className="text-white text-sm font-medium">
                            {gender}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
                      <button
                        onClick={clearFilters}
                        className="text-white text-sm font-medium flex items-center gap-2 hover:text-gray-300 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Clear
                      </button>
                      <button
                        onClick={() => setIsAllOpen(false)}
                        className="px-7 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors"
                      >
                        Show Results
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Style Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsStyleOpen(!isStyleOpen);
                  setIsAllOpen(false);
                }}
                className="flex items-center gap-2 px-6 py-2.5 border-2 border-black rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors bg-white text-black"
              >
                Style
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isStyleOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Style Dropdown - BLACK THEME, TEXT ONLY */}
              {isStyleOpen && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-black rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-6">
                    <h4 className="text-white text-base font-bold mb-5 tracking-wide">
                      Style
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {styles.map((style) => (
                        <button
                          key={style}
                          onClick={() => toggleStyle(style)}
                          className={`relative px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${
                            selectedStyles.includes(style) ||
                            (style === "ALL STYLE" && selectedStyles.length === 0)
                              ? "border-white bg-white text-black"
                              : "border-gray-600 text-white hover:border-white hover:bg-white/10"
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
                      <button
                        onClick={clearFilters}
                        className="text-white text-sm font-medium flex items-center gap-2 hover:text-gray-300 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Clear
                      </button>
                      <button
                        onClick={() => setIsStyleOpen(false)}
                        className="px-7 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors"
                      >
                        Show Results
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}