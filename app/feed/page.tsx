"use client";

import { useState } from "react";
import { feedItems, type FeedItem } from "./feedData";

export default function FeedPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [items, setItems] = useState<FeedItem[]>(feedItems);
  const [formUsername, setFormUsername] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    "All" | FeedItem["category"]
  >("All");
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(items.map((item) => [item.id, 0]))
  );
  const [likedById, setLikedById] = useState<Record<number, boolean>>(
    Object.fromEntries(items.map((item) => [item.id, false]))
  );
  const [commentsById, setCommentsById] = useState<Record<number, string[]>>(
    Object.fromEntries(items.map((item) => [item.id, []]))
  );
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [commentDraft, setCommentDraft] = useState("");


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
                  <div className="absolute bottom-3 right-3 flex items-center gap-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-gray-900 shadow-sm">
                    <button
                      type="button"
                      onClick={() => {
                        const nextLiked = !likedById[item.id];
                        setLikedById((prev) => ({
                          ...prev,
                          [item.id]: nextLiked,
                        }));
                        setLikeCounts((counts) => ({
                          ...counts,
                          [item.id]: Math.max(
                            0,
                            (counts[item.id] ?? 0) + (nextLiked ? 1 : -1)
                          ),
                        }));
                      }}
                      className="flex items-center gap-1 hover:text-black"
                      aria-label="Like"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill={likedById[item.id] ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z" />
                      </svg>
                      <span>{likeCounts[item.id] ?? 0}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCommentId(item.id);
                        setCommentDraft("");
                      }}
                      className="flex items-center gap-1 hover:text-black"
                      aria-label="Comments"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 15a3 3 0 0 1-3 3H8l-5 3V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z" />
                      </svg>
                      <span>{(commentsById[item.id] ?? []).length}</span>
                    </button>
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
            className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden"
          >
            <form
              className="w-full"
              onSubmit={async (event) => {
                event.preventDefault();
                if (!formFile) {
                  setSubmitError("Please upload a photo.");
                  return;
                }
                if (!formUsername.trim()) {
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
                  const nextItem: FeedItem = {
                    id: Date.now(),
                    title: formTitle.trim(),
                    username: formUsername.trim(),
                    image: URL.createObjectURL(formFile),
                    width: 800,
                    height: 1100,
                    source: "Upload",
                    layout: "standard",
                    category: "New",
                  };

                  setItems((prev) => [nextItem, ...prev]);
                  setLikeCounts((prev) => ({ ...prev, [nextItem.id]: 0 }));
                  setLikedById((prev) => ({ ...prev, [nextItem.id]: false }));
                  setCommentsById((prev) => ({ ...prev, [nextItem.id]: [] }));
                  setFormUsername("");
                  setFormTitle("");
                  setFormFile(null);
                  setPreviewUrl("");
                  setIsUploadOpen(false);
                } catch (error) {
                  setSubmitError("Could not upload the image. Try again.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="text-gray-600 hover:text-black"
                  aria-label="Back"
                >
                  ←
                </button>
                <p className="text-sm font-semibold">Create new post</p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-60"
                >
                  {isSubmitting ? "Sharing..." : "Share"}
                </button>
              </div>

              <div className="grid md:grid-cols-[1.4fr_0.6fr]">
                <label className="relative flex items-center justify-center bg-gray-50 border-r border-gray-200 min-h-[420px] cursor-pointer">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">
                        Upload a photo
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Click to select from your computer
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      setFormFile(file);
                      setPreviewUrl(file ? URL.createObjectURL(file) : "");
                    }}
                  />
                </label>

                <div className="flex flex-col gap-4 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {formUsername.trim()
                        ? formUsername.trim().slice(1, 2).toUpperCase()
                        : "U"}
                    </div>
                    <input
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                      placeholder="@username"
                      value={formUsername}
                      onChange={(event) => setFormUsername(event.target.value)}
                    />
                  </div>
                  <textarea
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[180px] resize-none"
                    placeholder="Write a caption..."
                    value={formTitle}
                    onChange={(event) => setFormTitle(event.target.value)}
                  />
                  {submitError && (
                    <p className="text-xs text-red-500">{submitError}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    Submissions are reviewed before appearing on the feed.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {activeCommentId !== null && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveCommentId(null)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <p className="text-sm font-semibold">Comments</p>
              <button
                onClick={() => setActiveCommentId(null)}
                className="text-gray-400 hover:text-black"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[320px] overflow-y-auto px-4 py-3 space-y-3">
              {(commentsById[activeCommentId] ?? []).length === 0 ? (
                <p className="text-sm text-gray-500">
                  No comments yet. Be the first.
                </p>
              ) : (
                (commentsById[activeCommentId] ?? []).map((comment, index) => (
                  <div key={`${activeCommentId}-${index}`} className="text-sm">
                    <span className="font-semibold">you</span>{" "}
                    <span className="text-gray-700">{comment}</span>
                  </div>
                ))
              )}
            </div>
            <form
              className="border-t border-gray-200 px-4 py-3 flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                const next = commentDraft.trim();
                if (!next) return;
                setCommentsById((prev) => ({
                  ...prev,
                  [activeCommentId]: [
                    ...(prev[activeCommentId] ?? []),
                    next,
                  ],
                }));
                setCommentDraft("");
              }}
            >
              <input
                className="flex-1 rounded-full border border-gray-200 px-3 py-2 text-sm"
                placeholder="Add a comment..."
                value={commentDraft}
                onChange={(event) => setCommentDraft(event.target.value)}
              />
              <button type="submit" className="text-sm font-semibold text-black">
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
