"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// --------------------------------------------------
// Fade + Lift Minimal Animation (CSS-class driven)
// --------------------------------------------------
const fadeLift =
  "opacity-0 translate-y-4 transition-all duration-700 ease-out will-change-transform";

// Utility: load draft state
function loadDraft() {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem("stylecast_apply_draft");
  return saved ? JSON.parse(saved) : null;
}

// Utility: save draft
function saveDraft(data: any) {
  localStorage.setItem("stylecast_apply_draft", JSON.stringify(data));
}

export default function BrandApplyPage() {
  const router = useRouter();

  // --------------------------------------------------
  // Form State
  // --------------------------------------------------
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    brandName: "",
    brandWebsite: "",
    brandDescription: "",
    targetCustomer: "",
    productCategories: [] as string[],
    priceRange: "",
    instagram: "",
    founderStory: "",
    lookbookLink: "",
    images: [] as File[],
  });

  const [animated, setAnimated] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // --------------------------------------------------
  // Load draft on mount
  // --------------------------------------------------
  useEffect(() => {
    const draft = loadDraft();
    if (draft) setForm(draft);

    setTimeout(() => setAnimated(true), 50);
  }, []);

  // --------------------------------------------------
  // Update handler
  // --------------------------------------------------
  function updateField(key: string, value: any) {
    const updated = { ...form, [key]: value };
    setForm(updated);
    saveDraft(updated);
  }

  // Multi-select toggle
  function toggleCategory(cat: string) {
    let updated = [...form.productCategories];
    if (updated.includes(cat)) {
      updated = updated.filter((c) => c !== cat);
    } else {
      updated.push(cat);
    }
    updateField("productCategories", updated);
  }

  // File Upload
  function handleFiles(files: FileList) {
    const arr = Array.from(files).slice(0, 15); // limit 15
    updateField("images", [...form.images, ...arr]);
  }

  // Dropzone events
  function handleDragOver(e: any) {
    e.preventDefault();
    setDragActive(true);
  }
  function handleDragLeave(e: any) {
    e.preventDefault();
    setDragActive(false);
  }
  function handleDrop(e: any) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  }

  // --------------------------------------------------
  // Navigate to preview page
  // --------------------------------------------------
  function goToPreview() {
    saveDraft(form);
    router.push("/brand-onboarding/apply/preview");
  }

  // --------------------------------------------------
  // UI BLOCK
  // --------------------------------------------------
  return (
    <main className="min-h-screen w-full bg-black text-white px-6 py-20 flex justify-center">
      <div className="w-full max-w-3xl">

        {/* TITLE */}
        <div className={`${!animated ? fadeLift : "opacity-100 translate-y-0"}`}>
          <h1 className="text-4xl font-semibold mb-3 tracking-tight">
            Brand Information
          </h1>
          <p className="text-white/60 mb-12">
            Tell us about your brand. All applications are reviewed manually.
          </p>
        </div>

        {/* --------------------------------------------------
            CONTACT INFORMATION
        -------------------------------------------------- */}
        <div className={`${!animated ? fadeLift : "opacity-100 translate-y-0"} mb-12`}>
          <h2 className="text-xl font-medium mb-4">Contact Information *</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="bg-black border border-white/20 rounded-lg px-4 py-3"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              required
            />
            <input
              className="bg-black border border-white/20 rounded-lg px-4 py-3"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              required
            />
          </div>

          <input
            className="bg-black border border-white/20 rounded-lg px-4 py-3 w-full mt-4"
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
          />

          <input
            className="bg-black border border-white/20 rounded-lg px-4 py-3 w-full mt-4"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            required
          />
        </div>

        {/* --------------------------------------------------
            BRAND INFORMATION
        -------------------------------------------------- */}
        <div className={`${!animated ? fadeLift : "opacity-100 translate-y-0"} mb-12`}>
          <h2 className="text-xl font-medium mb-4">About the Brand *</h2>

          <input
            className="bg-black border border-white/20 rounded-lg px-4 py-3 w-full mb-4"
            placeholder="Brand Name"
            value={form.brandName}
            onChange={(e) => updateField("brandName", e.target.value)}
            required
          />

          <input
            className="bg-black border border-white/20 rounded-lg px-4 py-3 w-full mb-4"
            placeholder="Brand Website"
            value={form.brandWebsite}
            onChange={(e) => updateField("brandWebsite", e.target.value)}
          />

          <textarea
            className="bg-black border border-white/20 rounded-lg px-4 py-3 w-full mb-2 h-28"
            placeholder="Brand description (max 300 words)"
            value={form.brandDescription}
            onChange={(e) => updateField("brandDescription", e.target.value)}
            required
          />
          <p className="text-white/40 text-sm mb-6">
            Describe your brand in your own words. Focus on perspective, not marketing language.
          </p>

          <textarea
            className="bg-black border border-white/20 rounded-lg px-4 py-3 w-full mb-2 h-24"
            placeholder="Target customer description"
            value={form.targetCustomer}
            onChange={(e) => updateField("targetCustomer", e.target.value)}
            required
          />
          <p className="text-white/40 text-sm mb-6">
            Who is this brand for? Describe the lifestyle or mindset of your ideal customer.
          </p>
        </div>

        {/* --------------------------------------------------
            PRODUCT CATEGORIES
        -------------------------------------------------- */}
        <div className={`${!animated ? fadeLift : "opacity-100 translate-y-0"} mb-12`}>
          <h2 className="text-xl font-medium mb-4">Product Category *</h2>

          <div className="grid grid-cols-2 gap-3">
            {["Apparel", "Accessories", "Jewelry", "Beauty / Skincare", "Other"].map(
              (cat) => (
                <label
                  key={cat}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer
                  ${
                    form.productCategories.includes(cat)
                      ? "border-white bg-white/10"
                      : "border-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.productCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              )
            )}
          </div>
        </div>

        {/* --------------------------------------------------
            PRICE RANGE
        -------------------------------------------------- */}
        <div className={`${!animated ? fadeLift : "opacity-100 translate-y-0"} mb-12`}>
          <h2 className="text-xl font-medium mb-4">Typical Price Range *</h2>

          <select
            className="bg-black border border-white/20 rounded-lg px-4 py-3 w-full"
            value={form.priceRange}
            onChange={(e) => updateField("priceRange", e.target.value)}
            required
          >
            <option value="">Select a price range</option>
            <option>Under $50</option>
            <option>$50–$100</option>
            <option>$100–$300</option>
            <option>$300+</option>
          </select>
        </div>

        {/* --------------------------------------------------
            OPTIONAL FIELDS
        -------------------------------------------------- */}
        <div className={`${!animated ? fadeLift : "opacity-100 translate-y-0"} mb-12`}>
          <h2 className="text-xl font-medium mb-4">Optional Details</h2>

          <input
            className="bg-black border border-white/20 rounded-lg px-4 py-3 w-full mb-4"
            placeholder="Instagram or Social Link"
            value={form.instagram}
            onChange={(e) => updateField("instagram", e.target.value)}
          />

          <textarea
            className="bg-black border border-white/20 rounded-lg px-4 py-3 w-full mb-4 h-24"
            placeholder="Founder story"
            value={form.founderStory}
            onChange={(e) => updateField("founderStory", e.target.value)}
          />

          <input
            className="bg-black border border-white/20 rounded-lg px-4 py-3 w-full"
            placeholder="Lookbook or Campaign Link"
            value={form.lookbookLink}
            onChange={(e) => updateField("lookbookLink", e.target.value)}
          />
        </div>

        {/* --------------------------------------------------
            DRAG & DROP UPLOADER
        -------------------------------------------------- */}
        <div
          className={`
            ${!animated ? fadeLift : "opacity-100 translate-y-0"} 
            mb-14
            border-2 rounded-2xl p-10 text-center transition
            ${
              dragActive
                ? "border-white bg-white/5"
                : "border-white/20 bg-white/5"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-lg font-medium mb-2">Upload Product Images</p>
          <p className="text-white/40 text-sm mb-4">
            Upload up to 15 images that represent how your products should be presented.
          </p>

          <label className="cursor-pointer inline-block px-6 py-3 bg-white text-black rounded-full font-medium">
            Choose Files
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
          </label>

          {/* thumbnails */}
          {form.images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-6">
              {form.images.map((file, i) => (
                <div
                  key={i}
                  className="text-xs text-white/70 truncate border border-white/20 rounded-lg px-2 py-2"
                >
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --------------------------------------------------
            ACTION BUTTONS
        -------------------------------------------------- */}
        <div
          className={`${!animated ? fadeLift : "opacity-100 translate-y-0"} 
          flex items-center justify-between mt-16`}
        >
          {/* Save draft */}
          <button
            onClick={() => saveDraft(form)}
            className="text-white/60 hover:text-white transition"
          >
            Save as draft
          </button>

          {/* Continue */}
          <button
            onClick={goToPreview}
            className="px-10 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition"
          >
            Continue to Preview →
          </button>
        </div>
      </div>
    </main>
  );
}
