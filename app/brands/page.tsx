import { brands } from '@/app/data/brandsData';
import BrandCard from './components/BrandCard';

export default function BrandsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Tabs */}
      <div className="mb-8 border border-gray-200 bg-white shadow-sm">
        <div className="flex gap-6 overflow-x-auto px-5 py-4 scrollbar-hide">
          {[
            "New-In",
            "HIGHLIGHT",
            "TRENDING",
            "RISING",
            "BEAUTY",
            "A-Z",
          ].map((label, index) => (
            <button
              key={label}
              className={`group relative whitespace-nowrap text-sm font-medium transition-all ${
                index === 0
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {label}
              <span
                className={`absolute left-0 -bottom-2 h-[2px] w-full transition-all ${
                  index === 0
                    ? "bg-black"
                    : "bg-transparent group-hover:bg-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-end gap-3 mb-8">
        <button className="flex items-center gap-2 px-3 py-1.5 border text-sm text-gray-700 rounded-none">
          All <span className="text-[10px] text-gray-500">▾</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 border text-sm text-gray-700 rounded-none">
          Style <span className="text-[10px] text-gray-500">▾</span>
        </button>
      </div>

      {/* Brand Grid - 핵심 부분! */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
}