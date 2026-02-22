"use client";

import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

const currencies = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "KRW", symbol: "₩", label: "Korean Won" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
];

export default function LocaleSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-black transition border border-gray-200 rounded-full px-3 py-1.5 bg-gray-50 hover:bg-gray-100"
      >
        <span className="font-medium">
          {selectedLang.code.toUpperCase()}
        </span>
        <span className="text-gray-300">|</span>
        <span className="font-medium">
          {selectedCurrency.symbol} {selectedCurrency.code}
        </span>
        <svg
          className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Language Section */}
          <div className="p-3 pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2 px-1">
              Language
            </p>
            <div className="grid grid-cols-2 gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition ${
                    selectedLang.code === lang.code
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span className="font-medium">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Currency Section */}
          <div className="p-3 pt-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2 px-1">
              Currency
            </p>
            <div className="grid grid-cols-2 gap-1">
              {currencies.map((cur) => (
                <button
                  key={cur.code}
                  onClick={() => {
                    setSelectedCurrency(cur);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition ${
                    selectedCurrency.code === cur.code
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-medium">{cur.symbol}</span>
                  <span className="font-medium">{cur.code}</span>
                  <span className="text-[10px] text-gray-400 ml-auto">
                    {selectedCurrency.code === cur.code ? "" : cur.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
