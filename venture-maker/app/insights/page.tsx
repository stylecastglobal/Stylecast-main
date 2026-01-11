"use client";

import PageShell from "@/components/PageShell";
import { motion } from "framer-motion";

const posts = [
  { title: "정책자금 승인 확률을 높이는 자료 구조", meta: "Finance • 6 min read" },
  { title: "인증 심사에서 자주 떨어지는 포인트", meta: "Certification • 5 min read" },
  { title: "작은 조직이 인공지능을 도입할 때 순서", meta: "AI • 7 min read" },
];

export default function InsightsPage() {
  return (
    <PageShell
      eyebrow="INSIGHTS"
      title="경영 인사이트"
      subtitle="현장에서 바로 쓰이는 관점과 체크리스트 중심으로 정리합니다."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {posts.map((p, idx) => (
          <motion.a
            key={p.title}
            href="#"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * idx, duration: 0.45, ease: "easeOut" }}
            className="rounded-3xl border border-black/10 p-8 bg-white hover:shadow-xl hover:shadow-black/5 transition"
          >
            <p className="text-xs font-semibold tracking-widest text-slate-500">
              {p.meta}
            </p>
            <p className="mt-4 text-lg font-bold text-slate-900 leading-snug">
              {p.title}
            </p>
            <p className="mt-6 text-sm font-semibold text-blue-700">
              읽기 →
            </p>
          </motion.a>
        ))}
      </div>
    </PageShell>
  );
}
