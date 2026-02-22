"use client";

import type { BodyType } from "../../types/outfit-builder";

const BODY_TYPES: { value: BodyType; label: string; icon: string; desc: string }[] = [
  { value: "slim",     label: "Slim",     icon: "▏",  desc: "Lean frame, narrow shoulders & hips" },
  { value: "regular",  label: "Regular",  icon: "▎",  desc: "Balanced proportions" },
  { value: "curvy",    label: "Curvy",    icon: "◗",  desc: "Defined waist, wider hips" },
  { value: "athletic", label: "Athletic", icon: "▌",  desc: "Broad shoulders, toned build" },
  { value: "relaxed",  label: "Relaxed",  icon: "█",  desc: "Soft, full silhouette" },
];

interface BodyTypeSelectorProps {
  value: BodyType;
  onChange: (bt: BodyType) => void;
}

export default function BodyTypeSelector({ value, onChange }: BodyTypeSelectorProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {BODY_TYPES.map((bt) => {
        const selected = value === bt.value;
        return (
          <button
            key={bt.value}
            onClick={() => onChange(bt.value)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
              selected
                ? "border-black bg-black/5 scale-[1.03]"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            {/* Stylized body silhouette placeholder */}
            <div
              className={`w-10 h-20 rounded-lg flex items-center justify-center text-2xl ${
                selected ? "bg-black text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              {bt.icon}
            </div>
            <span className={`text-xs font-medium ${selected ? "text-black" : "text-gray-600"}`}>
              {bt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
