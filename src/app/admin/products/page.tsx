'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

interface ProductData {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  shades: Array<{
    id: string;
    name: string;
    hex: string;
    description: string;
  }>;
  details: {
    texture: string;
    finish: string;
    coverage: string;
    longevity: string;
  };
  ingredients: {
    beneficial: string[];
    caution: string[];
    harmful: string[];
  };
  skinTypeRating: {
    oily: number;
    dry: number;
    combination: number;
    sensitive: number;
  };
  aiAnalysis: {
    matchScore: number;
    userSkinType: string;
    pros: string[];
    cons: string[];
  };
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductData>({
    id: '',
    barcode: '',
    name: '',
    brand: '',
    category: 'Foundation',
    price: 0,
    image: '',
    shades: [],
    details: {
      texture: '',
      finish: '',
      coverage: '',
      longevity: '',
    },
    ingredients: {
      beneficial: [],
      caution: [],
      harmful: [],
    },
    skinTypeRating: {
      oily: 0,
      dry: 0,
      combination: 0,
      sensitive: 0,
    },
    aiAnalysis: {
      matchScore: 0,
      userSkinType: 'combination',
      pros: [],
      cons: [],
    },
  });

  // 임시 저장된 제품 목록
  const [products, setProducts] = useState<ProductData[]>([]);

  const saveProduct = () => {
    // Firebase나 DB에 저장하는 로직
    // 지금은 localStorage에 임시 저장
    const updatedProducts = [...products, currentProduct];
    setProducts(updatedProducts);
    localStorage.setItem('stylecast-products', JSON.stringify(updatedProducts));
    
    alert('제품이 저장되었습니다!');
    setIsEditing(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentProduct({
      id: '',
      barcode: '',
      name: '',
      brand: '',
      category: 'Foundation',
      price: 0,
      image: '',
      shades: [],
      details: {
        texture: '',
        finish: '',
        coverage: '',
        longevity: '',
      },
      ingredients: {
        beneficial: [],
        caution: [],
        harmful: [],
      },
      skinTypeRating: {
        oily: 0,
        dry: 0,
        combination: 0,
        sensitive: 0,
      },
      aiAnalysis: {
        matchScore: 0,
        userSkinType: 'combination',
        pros: [],
        cons: [],
      },
    });
  };

  const addShade = () => {
    setCurrentProduct({
      ...currentProduct,
      shades: [
        ...currentProduct.shades,
        { id: `shade-${Date.now()}`, name: '', hex: '#000000', description: '' },
      ],
    });
  };

  const updateShade = (index: number, field: string, value: string) => {
    const updatedShades = [...currentProduct.shades];
    updatedShades[index] = { ...updatedShades[index], [field]: value };
    setCurrentProduct({ ...currentProduct, shades: updatedShades });
  };

  const removeShade = (index: number) => {
    const updatedShades = currentProduct.shades.filter((_, i) => i !== index);
    setCurrentProduct({ ...currentProduct, shades: updatedShades });
  };

  return (
    <div className="min-h-screen bg-white pt-32 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">제품 관리</h1>
            <p className="text-gray-600">수동으로 제품 정보를 추가하거나 수정하세요</p>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all"
            >
              <Plus className="w-5 h-5" />
              새 제품 추가
            </button>
          )}
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-gray-50 rounded-3xl p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">제품 정보 입력</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-semibold mb-2">바코드</label>
                <input
                  type="text"
                  value={currentProduct.barcode}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, barcode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                  placeholder="예: 3600531576486"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">제품명</label>
                <input
                  type="text"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                  placeholder="예: Light Reflecting Foundation"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">브랜드</label>
                <input
                  type="text"
                  value={currentProduct.brand}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, brand: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                  placeholder="예: NARS"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">카테고리</label>
                <select
                  value={currentProduct.category}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                >
                  <option value="Foundation">Foundation</option>
                  <option value="Lipstick">Lipstick</option>
                  <option value="Eyeshadow">Eyeshadow</option>
                  <option value="Mascara">Mascara</option>
                  <option value="Blush">Blush</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">가격 ($)</label>
                <input
                  type="number"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                  placeholder="52.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">이미지 URL</label>
                <input
                  type="text"
                  value={currentProduct.image}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Shades */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold">색상 (Shades)</label>
                <button
                  onClick={addShade}
                  className="text-sm px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  + 색상 추가
                </button>
              </div>

              <div className="space-y-3">
                {currentProduct.shades.map((shade, index) => (
                  <div key={shade.id} className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={shade.name}
                      onChange={(e) => updateShade(index, 'name', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="색상 이름 (예: Oslo)"
                    />
                    <input
                      type="color"
                      value={shade.hex}
                      onChange={(e) => updateShade(index, 'hex', e.target.value)}
                      className="w-16 h-10 rounded-lg border border-gray-300"
                    />
                    <input
                      type="text"
                      value={shade.description}
                      onChange={(e) => updateShade(index, 'description', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="설명 (예: Fair with pink undertone)"
                    />
                    <button
                      onClick={() => removeShade(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Texture</label>
                <input
                  type="text"
                  value={currentProduct.details.texture}
                  onChange={(e) => setCurrentProduct({
                    ...currentProduct,
                    details: { ...currentProduct.details, texture: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Finish</label>
                <input
                  type="text"
                  value={currentProduct.details.finish}
                  onChange={(e) => setCurrentProduct({
                    ...currentProduct,
                    details: { ...currentProduct.details, finish: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Coverage</label>
                <input
                  type="text"
                  value={currentProduct.details.coverage}
                  onChange={(e) => setCurrentProduct({
                    ...currentProduct,
                    details: { ...currentProduct.details, coverage: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Longevity</label>
                <input
                  type="text"
                  value={currentProduct.details.longevity}
                  onChange={(e) => setCurrentProduct({
                    ...currentProduct,
                    details: { ...currentProduct.details, longevity: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={saveProduct}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-all font-semibold"
              >
                <Save className="w-5 h-5" />
                저장하기
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  resetForm();
                }}
                className="px-6 py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold"
              >
                취소
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                </div>
                <div className="text-xl font-bold">${product.price}</div>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                바코드: {product.barcode}
              </div>

              <div className="flex gap-2 mb-4">
                {product.shades.slice(0, 5).map((shade) => (
                  <div
                    key={shade.id}
                    className="w-8 h-8 rounded-lg border border-gray-300"
                    style={{ backgroundColor: shade.hex }}
                    title={shade.name}
                  />
                ))}
                {product.shades.length > 5 && (
                  <div className="w-8 h-8 rounded-lg border border-gray-300 bg-gray-100 flex items-center justify-center text-xs">
                    +{product.shades.length - 5}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  <Edit className="w-4 h-4 inline mr-1" />
                  수정
                </button>
                <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && !isEditing && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">아직 등록된 제품이 없습니다.</p>
            <p className="text-gray-400 mt-2">위의 "새 제품 추가" 버튼을 눌러 제품을 등록하세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}