"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { gridLookbooks, type LookbookItem } from "./lookbookData";

// Gender type
type Gender = "women" | "men";

// Row titles for the 6 horizontal rows
const rowTitles = [
  "Made By Our Creators",
  "Everyday & Casual",
  "Work & Professional",
  "Night & Going Out",
  "Elevated & Luxe",
  "Vacation",
];

export default function Lookbook() {
  // Gender state
  const [selectedGender, setSelectedGender] = useState<Gender>("women");
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [activeLookbook, setActiveLookbook] = useState<LookbookItem | null>(null);
  const [submitComplete, setSubmitComplete] = useState(false);
  const [productLinks, setProductLinks] = useState<string[]>([""]);
  const [lookbookLink, setLookbookLink] = useState("");
  const [lookbookPdf, setLookbookPdf] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [submitGender, setSubmitGender] = useState<"women" | "men" | "unisex">("women");
  const [submitName, setSubmitName] = useState("");
  const [submitTitle, setSubmitTitle] = useState("");
  const [submitImage, setSubmitImage] = useState<File | null>(null);
  const [userLookbooks, setUserLookbooks] = useState<LookbookItem[]>([]);

  // Carousel index per row (6 rows)
  const [rowIndices, setRowIndices] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // Get current lookbooks based on gender
  const currentGridLookbooks = gridLookbooks[selectedGender];

  // User-submitted lookbooks filtered by selected gender
  const userFiltered = userLookbooks.filter(
    (lb) => lb.gender === selectedGender || lb.gender === "unisex"
  );

  // Reset row carousels when gender changes
  useEffect(() => {
    setRowIndices([0, 0, 0, 0, 0, 0]);
  }, [selectedGender]);

  const handleLookbookClick = (item: LookbookItem) => {
    setActiveLookbook(item);
  };

  const parsePrice = (price: string) => {
    const normalized = Number(price.replace(/[^0-9.]/g, ""));
    return Number.isFinite(normalized) ? normalized : 0;
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  // Build 6 rows, each intended to show 4 items
  const rows = Array.from({ length: 6 }, (_, i) => {
    const start = i * 4;
    return currentGridLookbooks.slice(start, start + 4);
  });

  const handlePrev = (rowIndex: number) => {
    const items = rows[rowIndex];
    if (items.length <= 1) return;
    setRowIndices((prev) => {
      const copy = [...prev];
      copy[rowIndex] =
        (copy[rowIndex] - 1 + items.length) % items.length;
      return copy;
    });
  };

  const handleNext = (rowIndex: number) => {
    const items = rows[rowIndex];
    if (items.length <= 1) return;
    setRowIndices((prev) => {
      const copy = [...prev];
      copy[rowIndex] =
        (copy[rowIndex] + 1) % items.length;
      return copy;
    });
  };

  return (
    <main className="min-h-screen bg-white text-[#111]">
      {/* Submit CTA */}
      <section className="w-full px-12 pt-20 pb-6">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-gray-50 border border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-black">Create your lookbook</h2>
            <p className="text-sm text-gray-600">
              Share your style. Your lookbook will appear on the page instantly.
            </p>
          </div>
          <button
            onClick={() => {
              setIsSubmitOpen(true);
              setSubmitComplete(false);
              setProductLinks([""]);
              setLookbookLink("");
              setLookbookPdf(null);
              setSubmitError("");
              setSubmitGender("women");
              setSubmitName("");
              setSubmitTitle("");
              setSubmitImage(null);
            }}
            className="self-start sm:self-auto bg-black text-white px-5 py-2.5 text-sm font-semibold hover:bg-gray-900 transition-colors"
          >
            Submit a Lookbook
          </button>
        </div>
      </section>

      {/* GENDER TOGGLE */}
      <section className="w-full px-12 pb-8">
        <div className="inline-flex gap-6 border-b border-gray-200">
          <button
            onClick={() => setSelectedGender("women")}
            className={`pb-2.5 text-sm font-medium tracking-wide uppercase transition-all duration-200 ${
              selectedGender === "women"
                ? "text-black border-b-2 border-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => setSelectedGender("men")}
            className={`pb-2.5 text-sm font-medium tracking-wide uppercase transition-all duration-200 ${
              selectedGender === "men"
                ? "text-black border-b-2 border-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Men
          </button>
        </div>
      </section>

      {/* USER SUBMISSIONS SECTION */}
      {userFiltered.length > 0 && (
        <section className="w-full px-12 pb-12">
          <h2 className="text-2xl font-semibold mb-4">Made by Our StyleCasters</h2>
          <div className="grid grid-cols-4 gap-6">
            {userFiltered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleLookbookClick(item)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/5] overflow-hidden bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
                  {item.image.startsWith("blob:") ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white/70 text-xs font-medium tracking-wider uppercase mb-1">
                      {item.season}
                    </p>
                    <h3 className="text-white text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-xs mt-1">{item.creator}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MAIN CONTENT: LOOKBOOK GRID */}
      <section className="w-full px-12 pb-32">
        <div className="w-full space-y-16">
          {rows.map((items, rowIndex) => (
            <div key={rowIndex}>
              {/* Row title */}
              <h2 className="text-2xl font-semibold mb-4">
                {rowTitles[rowIndex]}
              </h2>

              <div className="relative">
                {/* Left arrow */}
                <button
                  onClick={() => handlePrev(rowIndex)}
                  disabled={items.length <= 1}
                  className="absolute -left-8 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-black disabled:opacity-20"
                >
                  ‹
                </button>

                <div className="grid grid-cols-4 gap-6">
                  {items.length === 0 ? (
                    <div className="col-span-4 text-sm text-gray-300 italic">
                      No outfits yet for this category.
                    </div>
                  ) : (
                    items.map((_, colIdx) => {
                      const visibleIndex =
                        (rowIndices[rowIndex] + colIdx) % items.length;
                      const item = items[visibleIndex];

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleLookbookClick(item)}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-[3/5] overflow-hidden bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
                            {item.image.startsWith("blob:") ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            )}
                            
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Text content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <p className="text-white/70 text-xs font-medium tracking-wider uppercase mb-1">
                                {item.season}
                              </p>
                              <h3 className="text-white text-xl font-semibold">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Right arrow */}
                <button
                  onClick={() => handleNext(rowIndex)}
                  disabled={items.length <= 1}
                  className="absolute -right-8 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-black disabled:opacity-20"
                >
                  ›
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Submit Modal */}
      {isSubmitOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsSubmitOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 sm:p-8 max-w-2xl w-full shadow-2xl"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold">Submit your lookbook</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Your lookbook will appear on the page right away.
                </p>
              </div>
              <button
                onClick={() => setIsSubmitOpen(false)}
                className="text-gray-400 hover:text-black"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {submitComplete ? (
              <div className="bg-gray-50 border border-gray-200 p-5 text-sm text-gray-700">
                Your lookbook is now live on the page!
              </div>
            ) : (
              <form
                className="mt-6 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!submitImage) {
                    setSubmitError("Please upload a lookbook image.");
                    return;
                  }
                  setSubmitError("");
                  const imageUrl = URL.createObjectURL(submitImage);
                  const newLookbook: LookbookItem = {
                    id: Date.now(),
                    title: submitTitle.trim() || "Untitled Look",
                    image: imageUrl,
                    season: "Community Lookbook",
                    brand: "Community",
                    creator: submitName.trim() ? `@${submitName.trim().toLowerCase().replace(/\s+/g, "")}` : "@anonymous",
                    gender: submitGender,
                    products: productLinks
                      .filter((l) => l.trim())
                      .map((l, i) => ({
                        name: `Product ${i + 1}`,
                        price: "--",
                        brand: "--",
                        officialUrl: l.trim(),
                      })),
                  };
                  setUserLookbooks((prev) => [...prev, newLookbook]);
                  setSubmitComplete(true);
                  setTimeout(() => setIsSubmitOpen(false), 1000);
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Name</label>
                    <input
                      required
                      value={submitName}
                      onChange={(e) => setSubmitName(e.target.value)}
                      className="mt-1 w-full border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Email</label>
                    <input
                      required
                      type="email"
                      className="mt-1 w-full border border-gray-300 px-3 py-2 text-sm"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Lookbook image</label>
                  <label className="mt-1 flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 hover:border-black cursor-pointer transition-colors bg-gray-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSubmitImage(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    {submitImage ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={URL.createObjectURL(submitImage)}
                          alt="Preview"
                          className="h-24 object-contain"
                        />
                        <p className="text-xs text-gray-500">{submitImage.name}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-gray-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 16V4m0 0l-4 4m4-4l4 4" />
                          <path d="M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
                        </svg>
                        <span className="text-sm font-medium">Click to upload your lookbook image</span>
                        <span className="text-xs">JPG, PNG, WEBP</span>
                      </div>
                    )}
                  </label>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Lookbook title</label>
                  <input
                    required
                    value={submitTitle}
                    onChange={(e) => setSubmitTitle(e.target.value)}
                    className="mt-1 w-full border border-gray-300 px-3 py-2 text-sm"
                    placeholder="e.g. Summer Casual"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Category</label>
                  <div className="mt-1.5 flex gap-3">
                    {(["women", "men", "unisex"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setSubmitGender(g)}
                        className={`px-4 py-2 text-sm font-medium border transition-colors ${
                          submitGender === g
                            ? "border-black bg-black text-white"
                            : "border-gray-300 text-gray-600 hover:border-gray-500"
                        }`}
                      >
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-600">
                      Product links (required)
                    </label>
                    <button
                      type="button"
                      onClick={() => setProductLinks((prev) => [...prev, ""])}
                      className="text-xs font-semibold text-black hover:opacity-70"
                    >
                      + Add link
                    </button>
                  </div>
                  <div className="space-y-3">
                    {productLinks.map((link, index) => (
                      <div key={`product-link-${index}`} className="flex gap-2">
                        <input
                          required
                          type="url"
                          value={link}
                          onChange={(event) => {
                            const value = event.target.value;
                            setProductLinks((prev) => {
                              const next = [...prev];
                              next[index] = value;
                              return next;
                            });
                          }}
                          className="w-full border border-gray-300 px-3 py-2 text-sm"
                          placeholder={`Product URL #${index + 1}`}
                        />
                        {productLinks.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setProductLinks((prev) =>
                                prev.filter((_, idx) => idx !== index)
                              )
                            }
                            className="px-3 text-gray-400 hover:text-black"
                            aria-label="Remove link"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Include every product link that should appear in the lookbook.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Notes</label>
                  <textarea
                    className="mt-1 w-full border border-gray-300 px-3 py-2 text-sm min-h-[100px]"
                    placeholder="Tell us about the concept or styling."
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-600">{submitError}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 text-sm font-semibold hover:bg-gray-900 transition-colors"
                >
                  Submit for review
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Lookbook Detail Modal */}
      {activeLookbook && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveLookbook(null)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="bg-white p-6 sm:p-8 max-w-3xl w-full shadow-2xl"
          >
            <div className="flex items-start justify-between mb-6 gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  {activeLookbook.season}
                </p>
                <h3 className="text-2xl font-semibold mt-2">
                  {activeLookbook.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {activeLookbook.creator}
                </p>
              </div>
              <button
                onClick={() => setActiveLookbook(null)}
                className="text-gray-400 hover:text-black"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="border border-gray-100 bg-[#f7f6f2] p-3 sm:p-3.5 mb-6">
              <div className="relative aspect-[4/5] w-full max-w-[430px] mx-auto">
                {activeLookbook.image.startsWith("blob:") ? (
                  <img
                    src={activeLookbook.image}
                    alt={activeLookbook.title}
                    className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                  />
                ) : (
                  <Image
                    src={activeLookbook.image}
                    alt={activeLookbook.title}
                    fill
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                  />
                )}
              </div>
            </div>

            <div className="space-y-4">
              {activeLookbook.products.map((product, index) => (
                <div
                  key={`${product.name}-${index}`}
                  className="border border-gray-200 p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      {product.brand}
                    </p>
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.price}</p>
                  </div>
                  <a
                    href={product.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-black underline hover:text-gray-700"
                  >
                    Buy on official store
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-sm font-semibold">
              <span>Total look cost</span>
              <span>
                {formatPrice(
                  activeLookbook.products.reduce(
                    (sum, product) => sum + parsePrice(product.price),
                    0
                  )
                )}
              </span>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
