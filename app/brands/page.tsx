import { brands } from '@/app/data/brandsData';
import BrandCard from './components/BrandCard';

export default function BrandsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Tabs */}
      <div className="flex gap-6 mb-8 border-b">
        <button className="pb-2 border-b-2 border-black font-semibold">New-In</button>
        <button className="pb-2 text-gray-500">HIGHLIGHT</button>
        <button className="pb-2 text-gray-500">TRENDING</button>
        <button className="pb-2 text-gray-500">RISING</button>
        <button className="pb-2 text-gray-500">BEAUTY</button>
        <button className="pb-2 text-gray-500">A-Z</button>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-end gap-4 mb-8">
        <button className="px-4 py-2 border rounded-lg">All ▼</button>
        <button className="px-4 py-2 border rounded-lg">Style ▼</button>
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