"use client";

import { useState } from "react";
import { feedItems, type FeedItem } from "./feedData";

export default function FeedPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [items, setItems] = useState<FeedItem[]>(feedItems);
  const [formUsername, setFormUsername] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    "All" | FeedItem["category"]
  >("All");


  const layoutToSpan: Record<FeedItem["layout"], number> = {
    standard: 36,
    tall: 46,
    wide: 32,
  };

  const layoutToClass: Record<FeedItem["layout"], string> = {
    standard: "",
    tall: "",
    wide: "sm:col-span-2",
  };

  return (
    <main className="min-h-screen bg-white text-[#111]">
      <section className="px-6 sm:px-10 lg:px-14 pt-10 pb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="max-w-6xl flex flex-wrap items-center gap-4 text-sm text-gray-700">
            {["All", "Women", "Men", "New", "Trending"].map((label) => (
              <button
                key={label}
                onClick={() =>
                  setActiveCategory(label as "All" | FeedItem["category"])
                }
                className={`pb-1 border-b-2 transition-colors ${
                  activeCategory === label
                    ? "border-black text-black"
                    : "border-transparent hover:border-black"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="h-11 w-11 rounded-md bg-black text-white text-2xl leading-none flex items-center justify-center hover:bg-gray-900 transition-colors"
            aria-label="Upload"
          >
            +
          </button>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-14 pb-20">
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2 [column-fill:_balance]">
          {items
            .filter(
              (item) =>
                activeCategory === "All" || item.category === activeCategory
            )
            .map((item) => (
              <article
                key={item.id}
                className="group relative break-inside-avoid bg-white p-1"
              >
                <div className="relative w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute left-3 right-3 bottom-3 translate-y-3 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.title}
                  </div>
                  <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white transition-opacity duration-200 group-hover:opacity-0">
                    {item.username}
                  </div>
                </div>
              </article>
            ))}
        </div>
      </section>

      {isUploadOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsUploadOpen(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">Upload your feed</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Submit a post for review before it goes live.
                </p>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-gray-400 hover:text-black"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form
              className="mt-6 space-y-3"
              onSubmit={async (event) => {
                event.preventDefault();
                const urlValue = formUrl.trim();
                const isPinterest = urlValue.includes("pinterest");
                const isInstagram = urlValue.includes("instagram");

                if (!urlValue && !formFile) {
                  setSubmitError("Please add a website URL or upload a photo.");
                  return;
                }
                if (!formUsername.trim() && !isPinterest && !isInstagram) {
                  setSubmitError("Please add your @username.");
                  return;
                }
                if (!formTitle.trim()) {
                  setSubmitError("Please add a short title.");
                  return;
                }
                setSubmitError("");
                setIsSubmitting(true);

                try {
                  let image = "";
                  let title = formTitle.trim();
                  let source = "User";
                  let username = formUsername.trim();
                  let category: FeedItem["category"] = "New";

                  if (urlValue) {
                    const res = await fetch(
                      `/api/feed/preview?url=${encodeURIComponent(
                        urlValue
                      )}`
                    );
                    if (!res.ok) {
                      throw new Error("Preview failed");
                    }
                    const data = (await res.json()) as {
                      image: string;
                      title?: string;
                      source?: string;
                    };
                    image = data.image;
                    title = title || data.title || "User submission";
                    source = data.source || source;
                    if (isPinterest) {
                      username = "@pinterest";
                    }
                    if (isInstagram) {
                      username = "@instagram";
                    }
                  } else if (formFile) {
                    image = URL.createObjectURL(formFile);
                    title = formFile.name;
                    source = "Upload";
                  }

                  const nextItem: FeedItem = {
                    id: Date.now(),
                    title,
                    username,
                    image,
                    width: 800,
                    height: 1100,
                    source,
                    layout: "standard",
                    category,
                  };

                  setItems((prev) => [nextItem, ...prev]);
                  setFormUsername("");
                  setFormTitle("");
                  setFormUrl("");
                  setFormFile(null);
                  setIsUploadOpen(false);
                } catch (error) {
                  setSubmitError(
                    "Could not load the image. Try a direct image URL."
                  );
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <input
                className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
                placeholder="@username"
                value={formUsername}
                onChange={(event) => setFormUsername(event.target.value)}
              />
              <input
                className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
                placeholder="Short title"
                value={formTitle}
                onChange={(event) => setFormTitle(event.target.value)}
              />
              <input
                className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
                placeholder="Website URL (Pinterest, Instagram, blog)"
                value={formUrl}
                onChange={(event) => setFormUrl(event.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setFormFile(event.target.files?.[0] ?? null)
                }
                className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
              />
              {submitError && (
                <p className="text-xs text-red-500">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-black px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-gray-900 disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Submissions are reviewed before appearing on the feed.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
