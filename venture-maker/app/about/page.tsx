import PageShell from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="ABOUT"
      title="회사소개"
      subtitle="중소기업과 벤처기업의 성장을 더 빠르고 더 안전하게 만들기 위해, 전략과 실행, 기술을 함께 설계합니다."
    >
      <section className="grid lg:grid-cols-3 gap-6">
        <Card
          title="전략"
          desc="시장과 재무 구조를 기반으로 현실적인 성장 전략을 수립합니다."
        />
        <Card
          title="실행"
          desc="서류, 인증, 자금, 운영 개선을 단계별로 실행 가능하게 만듭니다."
        />
        <Card
          title="기술"
          desc="데이터와 인공지능 기반 의사결정 체계를 구축합니다."
        />
      </section>

      <section className="mt-14 grid lg:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl border border-black/10 p-8">
          <p className="text-sm font-semibold text-slate-900">핵심 원칙</p>
          <ul className="mt-5 space-y-3 text-sm text-slate-600 leading-relaxed">
            <li>성과에 직접 연결되는 우선순위만 제안합니다</li>
            <li>자료와 숫자로 검증 가능한 방식으로 설계합니다</li>
            <li>현장에서 바로 실행 가능한 형태로 정리합니다</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-slate-50 border border-black/5 p-8">
          <p className="text-sm font-semibold text-slate-900">지원 범위</p>
          <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <Pill text="정책자금 및 자금 구조" />
            <Pill text="재무제표 개선 및 신용" />
            <Pill text="인증 및 정부 과제" />
            <Pill text="브랜딩 및 공간 기획" />
            <Pill text="인공지능 기반 운영" />
            <Pill text="성과 중심 실행 로드맵" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="group rounded-3xl border border-black/10 p-8 bg-white hover:shadow-xl hover:shadow-black/5 transition">
      <div className="h-10 w-10 rounded-2xl bg-slate-900/5 group-hover:bg-slate-900/10 transition" />
      <p className="mt-6 text-lg font-bold text-slate-900">{title}</p>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <div className="rounded-full bg-white border border-black/10 px-4 py-2">
      {text}
    </div>
  );
}
