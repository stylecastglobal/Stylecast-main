export default function ConsultSuccessPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        
        {/* Icon */}
        <div className="mx-auto mb-8 flex items-center justify-center w-16 h-16 rounded-full bg-orange-100">
          <svg
            className="w-8 h-8 text-orange-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-4">
          상담 신청이 정상적으로 접수되었습니다
        </h1>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6">
          남겨주신 내용을 바탕으로 담당자가 검토 후
          <br />
          <span className="font-semibold text-gray-800">
            최대 48시간 이내
          </span>
          에 연락드릴 예정입니다.
        </p>

        <p className="text-sm text-gray-500 mb-12">
          문의량이 많은 경우 답변이 다소 지연될 수 있으나,
          순차적으로 안내드리고 있으니 양해 부탁드립니다.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md
                       border border-gray-300 px-8 py-3 text-sm font-semibold
                       text-gray-700 hover:bg-gray-50 transition"
          >
            메인으로 돌아가기
          </a>

          <a
            href="/insights"
            className="inline-flex items-center justify-center rounded-md
                       bg-[#FF6A00] px-8 py-3 text-sm font-semibold text-white
                       hover:bg-[#E85F00] transition"
          >
            경영 인사이트 보기
          </a>
        </div>
      </div>
    </main>
  );
}
