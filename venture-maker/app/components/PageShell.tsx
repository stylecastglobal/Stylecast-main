"use client";

import { motion } from "framer-motion";
import React from "react";

export default function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="border-b border-black/10 pb-10"
        >
          <p className="text-xs font-semibold tracking-widest text-slate-500">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
            {title}
          </h1>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.5, ease: "easeOut" }}
          className="mt-12"
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
}
