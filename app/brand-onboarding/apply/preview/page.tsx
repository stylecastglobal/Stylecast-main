"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// --------------------------------------------------
// Fade + Lift animation class
// --------------------------------------------------
const fadeLift =
  "opacity-0 translate-y-4 transition-all duration-700 ease-out will-change-transform";

// Load draft from localStorage
function loadDraft() {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem("stylecast_apply_draft");
  return saved ? JSON.parse(saved) : null;
}

// Save draft
function saveDraft(data: any) {
  localStorage.setItem("stylecast_apply_draft", JSON.stringify(data));
}

export default function PreviewPage() {
  const router = useRouter();
  const [animated, setAnimated] = useState(false);

  const [form, setForm] = useState<any>({
    brandName: "",
    brandDescription: "",
    productCategories: [],
    images: [],
    displayPreference: "",
  });

  // --------------------------------------------------
  // Load saved form data
  // --------------------------------------------------
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setForm(draft);
    }

    setTimeout(() => setAnimated(true), 50);
  }, []);

  // Update a field + save draft
  function updateField(key: string, val: any) {
    const updated = { ...form, [key]: val };
    setForm(updated);
    saveDraft(updated);
  }

  // Go to final submit page
  function goToSubmit() {
    saveDraft(form);
    router.push("/brand-onboarding/apply/submit");
  }

  // Back
  function goBack() {
    router.push("/brand-onboarding/apply");
  }

  // --------------------------------------------------
  // UI Rendering
  // --------------------------------------------------
  return (
    <main className="min-h-screen w-full bg-black text-white px-6 py-20 flex justify-center">
      <div className="w-full max-w-3xl">

        {/* --------------------------------------------------
            HEADER
        -------------------------------------------------- */}
        <div className={`${!animated ? fadeLift : "opacity-100 translate-y-0"} mb-10`}>
          <button
            onClick={goBack}
            className="text-white/50 hover:text-white transition mb-6"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-semibold tracking-tight mb-3">
            Brand Page Preview
          </h1>
          <p className="text-white/60 max-w-xl">
            This is a preview of how your brand may appear within StyleCast.
            Final presentation will be refined after approval.
          </p>
        </div>

        {/* --------------------------------------------------
            PREVIEW CARD
        -------------------------------------------------- */}
        <div
          className={`${!animated ? fadeLift : "opacity-100 translate-y-0"}
            bg-white/5 border border-white/10 rounded-2xl p-8 mb-12`}
        >
          {/* BRAND NAME */}
          <h2 className="text-2xl font-semibold mb-3">
            {form.brandName || "Brand Name"}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-white/70 leading-relaxed mb-6">
            {form.brandDescription || "Brand description will appear here."}
          </p>

          {/* PRODUCT CATEGORIES */}
          {form.productCategories?.length > 0 && (
            <div className="mb-6">
              <p className="uppercase text-xs text-white/40 tracking-wide mb-2">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {form.productCategories.map((c: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full border border-white/20 text-white/70 text-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* IMAGES */}
          {form.images?.length > 0 && (
            <div>
              <p className="uppercase text-xs text-white/40 tracking-wide mb-3">
                Sample Images
              </p>

              <div className="grid grid-cols-3 gap-3">
                {form.images.map((file: File, i: number) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-lg border border-white/10 p-3 text-xs text-white/70 truncate"
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --------------------------------------------------
            DISPLAY PREFERENCE
        -------------------------------------------------- */}
        <div className={`${!animated ? fadeLift : "opacity-100 translate-y-0"} mb-16`}>
          <h2 className="text-xl font-medium mb-4">Display Preference *</h2>

          <div className="space-y-3">
            {[
              {
                value: "customize",
                label: "I would like to customize my brand presentation",
              },
              {
                value: "curated",
                label: "I would like StyleCast to curate my brand presentation",
              },
              {
                value: "either",
                label: "I'm open to either option",
              },
            ].map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl border cursor-pointer transition
                  ${
                    form.displayPreference === opt.value
                      ? "border-white bg-white/10"
                      : "border-white/20"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={form.displayPreference === opt.value}
                  onChange={() => updateField("displayPreference", opt.value)}
                />
                <span className="text-white text-sm">{opt.label}</span>
              </label>
            ))}
          </div>

          <p className="text-white/40 text-sm mt-3">
            You’ll be able to adjust this later if approved.
          </p>
        </div>

        {/* --------------------------------------------------
            CTA BUTTONS
        -------------------------------------------------- */}
        <div
          className={`${!animated ? fadeLift : "opacity-100 translate-y-0"} 
          flex justify-end`}
        >
          <button
            onClick={goToSubmit}
            className="px-10 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition"
          >
            Review & Submit Application →
          </button>
        </div>
      </div>
    </main>
  );
}
