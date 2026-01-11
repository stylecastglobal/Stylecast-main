import PageShell from "@/components/PageShell";

export default function AIPage() {
  return (
    <PageShell
      eyebrow="VENTUREMAKER AI"
      title="벤처메이커 AI"
      subtitle="데이터와 인공지능을 활용해 의사결정 속도를 높이고, 반복 업무를 자동화해 운영 효율을 개선합니다."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Box
          title="업무 자동화"
          desc="반복되는 자료 정리, 분류, 보고 흐름을 자동화합니다."
        />
        <Box
          title="의사결정 지원"
          desc="핵심 지표 중심 대시보드와 분석 기반 실행안을 제공합니다."
        />
        <Box
          title="문서 품질 향상"
          desc="제안서, 신청서, 보고서를 읽기 쉬운 구조로 정리합니다."
        />
        <Box
          title="보안과 권한"
          desc="접근 권한과 데이터 범위를 명확히 설계합니다."
        />
      </div>
    </PageShell>
  );
}

function Box({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl bg-slate-50 border border-black/5 p-8 hover:bg-white hover:border-black/10 hover:shadow-xl hover:shadow-black/5 transition">
      <p className="text-lg font-bold text-slate-900">{title}</p>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}
