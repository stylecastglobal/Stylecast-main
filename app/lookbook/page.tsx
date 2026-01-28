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

  // Carousel index per row (6 rows)
  const [rowIndices, setRowIndices] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // Get current lookbooks based on gender
  const currentGridLookbooks = gridLookbooks[selectedGender];

  // Reset row carousels when gender changes
  useEffect(() => {
    setRowIndices([0, 0, 0, 0, 0, 0]);
  }, [selectedGender]);

  const handleLookbookClick = (id: number) => {
    const next = currentGridLookbooks.find((item) => item.id === id) ?? null;
    setActiveLookbook(next);
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
        <div className="max-w-[1400px] mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-black">Create your lookbook</h2>
            <p className="text-sm text-gray-600">
              Submissions are reviewed first. Approved lookbooks will appear here.
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
            }}
            className="self-start sm:self-auto bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-900 transition-colors"
          >
            Submit a Lookbook
          </button>
        </div>
      </section>

      {/* GENDER TOGGLE */}
      <section className="w-full px-12 pb-8">
        <div className="inline-flex rounded-2xl bg-gray-100 p-1.5 shadow-inner">
          <button
            onClick={() => setSelectedGender("women")}
            className={`px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
              selectedGender === "women"
                ? "bg-white text-black shadow-lg"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => setSelectedGender("men")}
            className={`px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
              selectedGender === "men"
                ? "bg-white text-black shadow-lg"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Men
          </button>
        </div>
      </section>

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
                          onClick={() => handleLookbookClick(item.id)}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-[3/5] rounded-2xl overflow-hidden bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            
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
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold">Submit your lookbook</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Submissions are reviewed first. Approved lookbooks will appear on this page.
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
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5 text-sm text-gray-700">
                Thanks! Your submission is pending review. Once approved, it will appear
                on this page.
              </div>
            ) : (
              <form
                className="mt-6 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  const hasLink = lookbookLink.trim().length > 0;
                  const hasPdf = Boolean(lookbookPdf);
                  if (!hasLink && !hasPdf) {
                    setSubmitError("Please provide a lookbook link or upload a PDF.");
                    return;
                  }
                  setSubmitError("");
                  setSubmitComplete(true);
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Name</label>
                    <input
                      required
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Email</label>
                    <input
                      required
                      type="email"
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">
                    Lookbook link (optional)
                  </label>
                  <input
                    type="url"
                    value={lookbookLink}
                    onChange={(event) => setLookbookLink(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    placeholder="Drive, Notion, or portfolio link"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">
                    Upload lookbook PDF (optional)
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(event) => {
                      const file = event.target.files?.[0] || null;
                      setLookbookPdf(file);
                    }}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Provide either a link or a PDF. Only one is required.
                  </p>
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
                          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
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
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm min-h-[100px]"
                    placeholder="Tell us about the concept or styling."
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-600">{submitError}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 transition-colors"
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
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl"
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

            <div className="rounded-3xl border border-gray-100 bg-[#f7f6f2] p-3 sm:p-3.5 mb-6">
              <div className="relative aspect-[4/5] w-full max-w-[430px] mx-auto">
                <Image
                  src={activeLookbook.image}
                  alt={activeLookbook.title}
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                />
              </div>
            </div>

            <div className="space-y-4">
              {activeLookbook.products.map((product, index) => (
                <div
                  key={`${product.name}-${index}`}
                  className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between gap-4"
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
