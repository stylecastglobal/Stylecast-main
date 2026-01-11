// app/terms/page.tsx
export default function TermsPage() {
  return (
    <main className="bg-white">
      {/* Header spacing */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <div className="border-b border-black/10 pb-10">
          <p className="text-xs font-semibold tracking-widest text-slate-500">
            LEGAL
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
            이용약관
          </h1>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            본 이용약관은 중소벤처 경영지원단 Venture Maker 웹사이트 및 관련 서비스
            (이하 “사이트”)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을
            규정합니다.
          </p>

          <div className="mt-6 text-xs text-slate-500">
            <p>시행일: 2025-01-01</p>
            <p>최종 업데이트: 2025-12-22</p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-12 space-y-12">
          <Section title="1. 약관의 적용과 동의">
            <p>
              이용자는 사이트에 접속하거나 열람, 이용하는 경우 본 약관에 동의한 것으로
              간주됩니다. 본 약관에 동의하지 않는 경우 사이트를 이용하지 마시기 바랍니다.
            </p>
          </Section>

          <Section title="2. 약관의 변경">
            <p>
              회사는 관련 법령을 위반하지 않는 범위에서 본 약관을 변경할 수 있습니다.
              회사가 약관을 변경하는 경우 사이트 내 공지 또는 기타 합리적인 방법으로
              변경 내용을 안내합니다. 변경된 약관은 공지된 시행일로부터 효력이 발생하며,
              이용자가 변경된 약관 시행 이후에도 사이트를 계속 이용하는 경우 변경에
              동의한 것으로 봅니다.
            </p>
          </Section>

          <Section title="3. 개인정보">
            <p>
              회사의 개인정보 처리에 관한 사항은 별도의{" "}
              <a href="/privacy" className="text-blue-700 hover:underline">
                개인정보처리방침
              </a>
              에 따릅니다.
            </p>
          </Section>

          <Section title="4. 사이트 콘텐츠 및 지식재산권">
            <p>
              사이트에 포함된 모든 콘텐츠(문서, 글, 이미지, 디자인, 로고, 상표, 자료 등)는
              회사 또는 정당한 권리를 가진 제3자에게 귀속되며, 관련 법령에 의해 보호됩니다.
              이용자는 회사의 사전 서면 동의 없이 콘텐츠를 복제, 전송, 배포, 게시, 판매,
              2차적 저작물 작성 등 상업적 목적으로 이용할 수 없습니다.
            </p>
          </Section>

          <Section title="5. 허용되는 이용 범위">
            <p>
              이용자는 개인적이고 비상업적인 범위에서 사이트를 열람하고 정보를 참고할 수
              있습니다. 단, 콘텐츠의 출처 표시 및 권리 표시(저작권, 상표 등)는 유지되어야
              하며, 콘텐츠를 수정하거나 오해를 유발하는 방식으로 사용할 수 없습니다.
            </p>
          </Section>

          <Section title="6. 링크">
            <p>
              회사는 사이트에 외부 사이트로 연결되는 링크를 제공할 수 있습니다. 외부
              사이트의 내용 및 운영에 대해 회사는 책임을 지지 않으며, 이용자는 외부
              사이트의 약관 및 정책을 확인해야 합니다.
            </p>
          </Section>

          <Section title="7. 금지행위">
            <ul className="list-disc pl-6 space-y-2">
              <li>관련 법령 또는 공서양속에 반하는 행위</li>
              <li>타인의 권리를 침해하거나 명예를 훼손하는 행위</li>
              <li>허위 또는 오해를 유발하는 정보 게시</li>
              <li>악성 코드, 바이러스, 자동화된 수단을 통한 서비스 방해 행위</li>
              <li>회사 또는 제3자의 지식재산권을 침해하는 행위</li>
              <li>상업적 목적의 무단 광고, 홍보, 스팸성 행위</li>
            </ul>
          </Section>

          <Section title="8. 서비스 제공의 변경 및 중단">
            <p>
              회사는 운영상 또는 기술상 필요에 따라 사이트의 전부 또는 일부를 변경,
              중단할 수 있습니다. 회사는 가능한 범위에서 사전 공지하되, 긴급한 경우 사후
              공지할 수 있습니다.
            </p>
          </Section>

          <Section title="9. 면책">
            <p>
              사이트의 정보는 일반적인 참고 목적을 위해 제공됩니다. 회사는 정보의 정확성,
              완전성, 최신성에 대해 보증하지 않으며, 이용자는 자신의 판단과 책임 하에
              사이트 정보를 활용해야 합니다. 회사는 사이트 정보의 이용으로 인해 발생한
              직접적 또는 간접적 손해에 대해 법령이 허용하는 범위 내에서 책임을 제한합니다.
            </p>
          </Section>

          <Section title="10. 책임 제한">
            <p>
              회사는 천재지변, 시스템 장애, 통신 장애, 제3자 서비스 장애, 기타 불가항력적
              사유로 인한 서비스 이용 불가에 대해 책임을 지지 않습니다. 또한 회사는
              이용자가 사이트를 통해 얻은 정보에 기반해 내린 의사결정 및 그 결과에 대해
              책임을 부담하지 않습니다.
            </p>
          </Section>

          <Section title="11. 손해배상 및 면책">
            <p>
              이용자가 본 약관 또는 관련 법령을 위반하여 회사 또는 제3자에게 손해가 발생한
              경우, 이용자는 그 손해를 배상해야 합니다. 또한 이용자는 자신의 위반 또는
              부적절한 이용으로 인해 제기되는 분쟁, 청구, 비용(합리적인 변호사 비용 포함)
              으로부터 회사를 면책하고 방어해야 합니다.
            </p>
          </Section>

          <Section title="12. 준거법 및 관할">
            <p>
              본 약관은 대한민국 법령에 따라 해석 및 적용됩니다. 사이트 이용과 관련하여
              분쟁이 발생할 경우, 회사의 본점 소재지를 관할하는 법원을 전속적 관할 법원으로
              합니다.
            </p>
          </Section>

          <Section title="13. 문의">
            <p className="text-slate-700">
              약관 관련 문의는 아래 연락처로 부탁드립니다.
            </p>
            <div className="mt-4 rounded-2xl border border-black/10 p-6">
              <p className="text-sm text-slate-900 font-semibold">
                중소벤처 경영지원단 | Venture Maker
              </p>
              <p className="mt-2 text-sm text-slate-600">
                이메일: eumhc63@gmail.com
              </p>
              <p className="text-sm text-slate-600">
                전화: 010-4324-2683
              </p>
              <p className="text-sm text-slate-600">
                주소: 서울특별시 강서구 마곡중앙6로 11, 3층 314-39호 (마곡동, 보타닉파크타워3)
              </p>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="text-sm text-slate-600 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
