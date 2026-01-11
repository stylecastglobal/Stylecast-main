"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="
            bg-white text-black w-[90%] max-w-md rounded-2xl shadow-xl
            p-8 relative
          "
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
            onClick={onClose}
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold mb-4">Subscribe to our newsletter</h2>
          <p className="text-gray-600 text-sm mb-6">
            Stay updated with new drops, exclusive offers, and events.
          </p>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Email Address*"
              className="
                w-full px-4 py-3 border border-gray-300 rounded-xl
                focus:outline-none focus:border-black
              "
            />

            <button
              type="submit"
              className="
                w-full py-3 bg-black text-white rounded-xl font-medium
                hover:bg-gray-900 transition
              "
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
