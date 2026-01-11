"use client";
import { useState, useEffect } from "react";

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);

  // Only show once per session
  useEffect(() => {
    const dismissed = sessionStorage.getItem("newsletter-dismissed");
    if (!dismissed) {
      setTimeout(() => setOpen(true), 1500); // delay pop-up like GM
    }
  }, []);

  function closeModal() {
    sessionStorage.setItem("newsletter-dismissed", "true");
    setOpen(false);
  }

  return (
    <>
      {/* Subscribe button (for footer) will toggle open */}
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-neutral-700 hover:text-black transition"
      >
        Subscribe →
      </button>

      {/* BACKDROP */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[200] animation-fade">
          {/* MODAL */}
          <div className="bg-white rounded-2xl p-10 w-[90%] max-w-lg shadow-xl relative">

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-neutral-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              Subscribe to our newsletter and stay connected.
            </h2>

            <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
              Be the first to know about new drops, exclusive offers, and event invitations.
            </p>

            <form className="flex flex-col gap-4">
              <input
                type="email"
                required
                placeholder="Email Address*"
                className="w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:border-neutral-900"
              />

              <button
                type="submit"
                className="w-full bg-black text-white rounded-xl py-3 font-medium hover:bg-neutral-800 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
