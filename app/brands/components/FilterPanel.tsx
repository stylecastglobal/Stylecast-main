"use client";

interface FilterPanelProps {
  type: "gender" | "style";
  onClose: () => void;
}

export default function FilterPanel({ type, onClose }: FilterPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30">
      <div className="mt-32 w-[720px] bg-white rounded-2xl shadow-xl p-8 relative">
        {/* HEADER */}
        <h2 className="text-xl font-semibold mb-6 capitalize">
          {type === "gender" ? "Gender" : "Style"}
        </h2>

        {/* CONTENT */}
        {type === "gender" && (
          <div className="space-y-4">
            {["All", "Women", "Men"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-3 text-lg cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  defaultChecked={g === "All"}
                  className="w-5 h-5 accent-black"
                />
                {g}
              </label>
            ))}
          </div>
        )}

        {type === "style" && (
          <div className="grid grid-cols-4 gap-6">
            {[
              "ALL STYLE",
              "STREET MOOD",
              "URBAN CASUAL",
              "YOUNG CASUAL",
              "MODERN CLASSIC",
              "HERITAGE LOOK",
              "SIMPLE & EASY",
              "K-BEAUTY",
            ].map((style) => (
              <div
                key={style}
                className="border rounded-xl p-4 text-center cursor-pointer hover:border-black"
              >
                <div className="aspect-square bg-gray-100 mb-3" />
                <p className="text-sm font-medium">{style}</p>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-sm flex items-center gap-2"
          >
            ⟳ Clear
          </button>

          <button
            onClick={onClose}
            className="px-10 py-4 bg-black text-white rounded-lg font-medium"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}
