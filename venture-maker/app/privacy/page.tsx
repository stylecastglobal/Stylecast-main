// app/privacy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="border-b border-black/10 pb-10">
          <p className="text-xs font-semibold tracking-widest text-slate-500">
            LEGAL
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
            개인정보처리방침
          </h1>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            중소벤처 경영지원단 Venture Maker(이하 “회사”)는 개인정보보호법,
            정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령을
            준수하며, 이용자의 개인정보를 보호하기 위하여 최선을 다하고 있습니다.
            본 개인정보처리방침은 회사가 제공하는 웹사이트 및 관련 서비스
            이용과 관련하여 개인정보가 어떠한 목적과 방식으로 수집·이용되고,
            어떻게 보호·관리되는지를 설명합니다.
          </p>

          <div className="mt-6 text-xs text-slate-500">
            <p>시행일: 2025-01-01</p>
            <p>최종 개정일: 2025-12-22</p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-12 space-y-14">

          <Section title="1. 개인정보의 처리 목적">
            <p>
              회사는 다음의 목적을 위하여 개인정보를 처리합니다.
              처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
              이용되지 않으며, 이용 목적이 변경되는 경우에는
              관련 법령에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>문의사항 접수 및 답변 제공</li>
              <li>상담 신청 및 컨설팅 서비스 제공</li>
              <li>서비스 이용에 따른 본인 식별 및 의사소통</li>
              <li>서비스 개선 및 품질 관리</li>
              <li>법령 및 약관 위반 여부 확인</li>
            </ul>
          </Section>

          <Section title="2. 처리하는 개인정보 항목">
            <p>회사는 다음과 같은 개인정보 항목을 처리할 수 있습니다.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>필수항목: 이름, 연락처(전화번호), 이메일 주소</li>
              <li>선택항목: 회사명, 직책, 문의 내용</li>
              <li>
                자동 수집 항목: IP 주소, 쿠키, 접속 로그, 브라우저 정보,
                기기 정보, 방문 기록
              </li>
            </ul>
          </Section>

          <Section title="3. 개인정보의 처리 및 보유 기간">
            <p>
              회사는 법령에 따른 개인정보 보유·이용 기간 또는
              이용자로부터 개인정보를 수집 시에 동의받은
              개인정보 보유·이용 기간 내에서 개인정보를 처리 및 보유합니다.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>문의 및 상담 기록: 처리 완료 후 3년</li>
              <li>계약 및 서비스 제공 기록: 관련 법령에 따른 보존 기간</li>
              <li>웹사이트 접속 기록: 3개월</li>
            </ul>
          </Section>

          <Section title="4. 개인정보의 제3자 제공">
            <p>
              회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
              다만, 다음의 경우에는 예외로 합니다.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>이용자가 사전에 동의한 경우</li>
              <li>
                법령에 의거하거나 수사기관의 적법한 요청이 있는 경우
              </li>
            </ul>
          </Section>

          <Section title="5. 개인정보 처리의 위탁">
            <p>
              회사는 서비스 향상을 위해 개인정보 처리 업무를
              외부 전문 업체에 위탁할 수 있으며,
              이 경우 관련 법령에 따라 위탁 계약을 체결하고
              개인정보가 안전하게 관리될 수 있도록 감독합니다.
            </p>
          </Section>

          <Section title="6. 정보주체의 권리와 행사 방법">
            <p>
              이용자는 언제든지 다음 각 호의 개인정보 보호 관련 권리를
              행사할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>개인정보 열람 요청</li>
              <li>개인정보 정정 및 삭제 요청</li>
              <li>개인정보 처리 정지 요청</li>
              <li>동의 철회 요청</li>
            </ul>
            <p>
              권리 행사는 서면, 이메일, 전화 등을 통하여 하실 수 있으며,
              회사는 이에 대해 지체 없이 조치하겠습니다.
            </p>
          </Section>

          <Section title="7. 개인정보의 안전성 확보 조치">
            <p>
              회사는 개인정보의 안전성 확보를 위해 다음과 같은
              기술적·관리적 보호 조치를 시행하고 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>개인정보 접근 권한 최소화</li>
              <li>관리자 및 담당자 교육 실시</li>
              <li>보안 프로그램 및 접근 통제 시스템 운영</li>
              <li>개인정보 보관 서버에 대한 물리적 접근 제한</li>
            </ul>
          </Section>

          <Section title="8. 쿠키의 사용">
            <p>
              회사는 이용자에게 보다 나은 서비스를 제공하기 위해
              쿠키(Cookie)를 사용할 수 있습니다.
              이용자는 웹 브라우저 설정을 통해 쿠키 저장을
              거부하거나 삭제할 수 있습니다.
            </p>
          </Section>

          <Section title="9. 개인정보 보호책임자">
            <div className="rounded-2xl border border-black/10 p-6">
              <p className="text-sm font-semibold text-slate-900">
                개인정보 보호책임자
              </p>
              <p className="mt-2 text-sm text-slate-600">
                성명: 엄현철
              </p>
              <p className="text-sm text-slate-600">
                연락처: 010-4324-2683
              </p>
              <p className="text-sm text-slate-600">
                이메일: eumhc63@gmail.com
              </p>
            </div>
          </Section>

          <Section title="10. 권익침해 구제 방법">
            <p>
              이용자는 개인정보 침해에 대한 피해구제,
              상담 등을 아래 기관에 문의할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>개인정보침해신고센터 (국번없이 118)</li>
              <li>개인정보분쟁조정위원회 (국번없이 1833-6972)</li>
              <li>대검찰청 사이버범죄수사과 (1301)</li>
              <li>경찰청 사이버범죄 신고 (182)</li>
            </ul>
          </Section>

          <Section title="11. 개인정보처리방침의 변경">
            <p>
              본 개인정보처리방침은 법령 또는 회사 정책에 따라
              변경될 수 있으며, 변경 사항은 사이트를 통해
              사전에 공지합니다.
            </p>
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
