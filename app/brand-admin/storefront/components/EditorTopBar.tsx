export default function EditorTopBar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-black">Storefront</h1>
        <span className="text-sm text-gray-500">· Draft</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-lg transition">
          Exit
        </button>
        <button className="px-6 py-2 text-sm bg-black text-white rounded-lg hover:bg-neutral-900 transition">
          Save
        </button>
      </div>
    </header>
  );
}