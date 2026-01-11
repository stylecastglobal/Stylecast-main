"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ConsultPage() {
    const router = useRouter();
    const [field, setField] = useState("");
  const [showEtc, setShowEtc] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!agree) {
    setError("개인정보 수집 및 이용에 동의해주세요.");
    return;
  }

  setError("");
  setLoading(true);

  // 임시 로딩 시뮬레이션
  setTimeout(() => {
    setLoading(false);
    router.push("/consult/success");
  }, 2000);
};


  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-orange-500 mb-4">
            CONSULTATION REQUEST
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6">
            상담 신청
          </h1>
          <p className="text-gray-600 leading-relaxed">
            벤처기업 인증부터 정책자금까지.<br />
            귀사의 상황에 맞는 전략을 전문가가 직접 검토합니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* 기본 정보 */}
          <section className="space-y-6">
            <Input label="신청자 성명" required />
            <Input label="신청자 이메일" type="email" required />
            <Input label="전화번호" placeholder="010-0000-0000" required />
            <Input label="회사명" />
            <Input label="업종" />
            <Input label="지역" />
          </section>

          {/* 상담 분야 */}
          <section className="space-y-4">
            <label className="block text-sm font-semibold text-gray-800">
              상담 신청 분야 <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={field}
              onChange={(e) => {
                setField(e.target.value);
                setShowEtc(e.target.value === "기타");
              }}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm
                         text-gray-900 focus:ring-2 focus:ring-orange-500"
            >
              <option value="">보기에서 선택해주세요</option>
              <option>벤처기업 인증</option>
              <option>기업부설연구소 설립</option>
              <option>메인비즈 인증</option>
              <option>이노비즈 인증</option>
              <option>ISO 인증</option>
              <option>기타 지원 사업</option>
              <option>정책조금조달사업</option>
              <option value="기타">기타</option>
            </select>

            {showEtc && (
              <Input
                label="기타 상담 내용"
                placeholder="원하시는 상담 내용을 직접 입력해주세요"
              />
            )}
          </section>

          <Input label="상담 가능 시간" placeholder="예: 평일 오후 2시 이후" />

          <section>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              남기실 말씀
            </label>
            <textarea
  rows={5}
  placeholder="현재 상황이나 궁금하신 점을 자유롭게 작성해주세요"
  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm
             text-gray-900
             placeholder:text-gray-500
             focus:outline-none focus:ring-2 focus:ring-orange-500"
/>

          </section>

          {/* 개인정보 동의 */}
          <section className="space-y-2">
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1"
              />
              <span>
                개인정보 수집 및 이용에 동의합니다.{" "}
                <button
                  type="button"
                  onClick={() => setShowPolicy(true)}
                  className="text-blue-600 underline"
                >
                  (내용 보기)
                </button>
              </span>
            </label>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </section>

          {/* Submit */}
          <div className="pt-8 text-center">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center justify-center rounded-md
                px-12 py-4 text-sm font-semibold text-white transition
                ${loading ? "bg-gray-400" : "bg-[#FF6A00] hover:bg-[#E85F00]"}`}
            >
              {loading ? "접수 중..." : "상담 신청하기"}
            </button>
          </div>
        </form>
      </div>

      {/* 개인정보 모달 */}
      {showPolicy && (
        <Modal onClose={() => setShowPolicy(false)} />
      )}
    </main>
  );
}

/* ================= Input ================= */
function Input({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm
                   text-gray-900
                   placeholder:text-gray-500
                   focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}


/* ================= Modal ================= */
function Modal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl max-w-2xl w-full p-8 relative overflow-y-auto max-h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-extrabold text-blue-900 mb-6">
          개인정보 처리방침
        </h2>

        <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
          <p>
            중소벤처 경영지원단 Venture Maker(이하 “회사”)는 정보주체의
            개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을
            준수하고 있습니다.
          </p>

          <section>
            <h3 className="font-bold text-gray-900 mb-1">
              1. 수집하는 개인정보 항목
            </h3>
            <p>
              회사는 상담 신청을 위해 다음과 같은 개인정보를 수집합니다.
            </p>
            <ul className="list-disc ml-5 mt-2">
              <li>필수 항목: 성명, 이메일 주소, 전화번호</li>
              <li>선택 항목: 회사명, 업종, 지역, 상담 내용</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-1">
              2. 개인정보의 수집 및 이용 목적
            </h3>
            <p>
              수집된 개인정보는 다음의 목적을 위해 이용됩니다.
            </p>
            <ul className="list-disc ml-5 mt-2">
              <li>상담 요청 확인 및 상담 진행</li>
              <li>문의 사항에 대한 회신 및 고객 관리</li>
              <li>서비스 품질 개선 및 내부 통계 자료 활용</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-1">
              3. 개인정보의 보유 및 이용 기간
            </h3>
            <p>
              회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를
              지체 없이 파기합니다. 단, 관계 법령에 따라 보존할 필요가 있는
              경우 해당 기간 동안 보관합니다.
            </p>
            <ul className="list-disc ml-5 mt-2">
              <li>상담 기록: 상담 종료 후 1년간 보관</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-1">
              4. 개인정보의 제3자 제공
            </h3>
            <p>
              회사는 원칙적으로 정보주체의 개인정보를 외부에 제공하지
              않습니다. 다만, 법령에 따라 요구되는 경우에 한하여 제공될 수
              있습니다.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-1">
              5. 정보주체의 권리
            </h3>
            <p>
              정보주체는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제,
              처리 정지를 요청할 수 있습니다.
            </p>
            <p className="mt-2">
              귀하는 개인정보 수집 및 이용에 동의하지 않을 권리가 있으며,
              동의하지 않을 경우 상담 신청이 제한될 수 있습니다.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-1">
              6. 개인정보 보호 책임자
            </h3>
            <p>
              개인정보 보호 관련 문의는 아래로 연락주시기 바랍니다.
            </p>
            <p className="mt-1">
              책임자: 중소벤처 경영지원단 Venture Maker<br />
              연락처: 010-4324-2683
            </p>
          </section>

          <p className="text-xs text-gray-500 mt-4">
            본 개인정보 처리방침은 관련 법령 및 내부 정책에 따라 변경될 수
            있으며, 변경 시 본 페이지를 통해 안내드립니다.
          </p>
        </div>
      </div>
    </div>
  );
}

