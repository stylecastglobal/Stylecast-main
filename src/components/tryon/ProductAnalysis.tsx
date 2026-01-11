'use client';

import { CheckCircle2, AlertTriangle, Sparkles, Star, Package } from 'lucide-react';

interface ProductAnalysisProps {
  productImage: string;
  productInfo: {
    name: string;
    brand: string;
    ingredients: string[];
    satisfaction: number;
    warnings: string[];
  };
  onContinue: () => void;
}

export default function ProductAnalysis({ productImage, productInfo, onContinue }: ProductAnalysisProps) {
  // 데모 데이터 (나중에 실제 데이터로 교체)
  const performanceScores = {
    packaging: 4.5,
    pigmentation: 4.8,
    application: 4.6,
    coverage: 4.3,
    adherence: 4.7,
    consistency: 4.4,
  };

  const shades = [
    { id: 'oslo', name: 'Oslo', hex: '#F4D9C6', description: 'Fair with pink undertone' },
    { id: 'siberia', name: 'Siberia', hex: '#F5E0D3', description: 'Fair with neutral undertone' },
    { id: 'mont-blanc', name: 'Mont Blanc', hex: '#F0CABF', description: 'Fair with peach undertone' },
    { id: 'deauville', name: 'Deauville', hex: '#E8C4B0', description: 'Light with golden undertone' },
    { id: 'stromboli', name: 'Stromboli', hex: '#D9B099', description: 'Light-medium with warm undertone' },
    { id: 'syracuse', name: 'Syracuse', hex: '#C89B7E', description: 'Medium with golden undertone' },
  ];

  const reviews = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2 weeks ago',
      verified: true,
      comment: 'Perfect for my dry skin! The coverage is buildable and it looks so natural.',
      helpful: 124,
    },
    {
      id: 2,
      author: 'Jessica L.',
      rating: 4,
      date: '1 month ago',
      verified: true,
      comment: 'Love the dewy finish. Only wish it had more shades for deeper skin tones.',
      helpful: 89,
    },
    {
      id: 3,
      author: 'Emily R.',
      rating: 5,
      date: '2 months ago',
      verified: true,
      comment: 'This is my holy grail foundation! Lasts all day without oxidizing.',
      helpful: 156,
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderScore = (score: number) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all"
            style={{ width: `${(score / 5) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-gray-700 w-8">{score}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Product Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8">
        <div className="flex gap-8 items-start">
          <div className="w-40 h-40 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
            <img src={productImage} alt="Product" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">{productInfo.brand}</div>
            <h2 className="text-3xl font-bold mb-6 text-[#111]">{productInfo.name}</h2>
            
            {/* Satisfaction Score */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-5 h-5 ${
                  productInfo.satisfaction >= 90 ? 'text-green-600' : 'text-yellow-600'
                }`} />
                <span className="text-sm font-medium text-gray-600">User Satisfaction</span>
              </div>
              <div className={`text-3xl font-bold ${
                productInfo.satisfaction >= 90 ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {productInfo.satisfaction}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Scores */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8">
        <h3 className="text-xl font-bold mb-6 text-[#111] flex items-center gap-2">
          <Package className="w-5 h-5" />
          Performance Scores
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-2">Packaging</div>
            {renderScore(performanceScores.packaging)}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-2">Pigmentation</div>
            {renderScore(performanceScores.pigmentation)}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-2">Application</div>
            {renderScore(performanceScores.application)}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-2">Coverage</div>
            {renderScore(performanceScores.coverage)}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-2">Adherence</div>
            {renderScore(performanceScores.adherence)}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-2">Consistency</div>
            {renderScore(performanceScores.consistency)}
          </div>
        </div>
      </div>

      {/* Available Shades */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8">
        <h3 className="text-xl font-bold mb-6 text-[#111]">Available Shades</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {shades.map((shade) => (
            <div
              key={shade.id}
              className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-gray-300 transition-all"
            >
              <div
                className="w-full h-20 rounded-xl mb-3 border-2 border-gray-300"
                style={{ backgroundColor: shade.hex }}
              />
              <div className="font-bold text-sm text-[#111] mb-1">{shade.name}</div>
              <div className="text-xs text-gray-600">{shade.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8">
        <h3 className="text-xl font-bold mb-6 text-[#111] flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Key Ingredients
        </h3>
        <div className="flex flex-wrap gap-3">
          {productInfo.ingredients.map((ingredient, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 border border-gray-200"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#111]">Customer Reviews</h3>
          <button className="text-sm text-gray-600 hover:text-black transition-colors font-medium">
            View All →
          </button>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[#111]">{review.author}</span>
                    {review.verified && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{review.date}</div>
                </div>
                {renderStars(review.rating)}
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
              
              <div className="text-xs text-gray-500">
                {review.helpful} people found this helpful
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warnings */}
      {productInfo.warnings.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-3 text-lg">Cautions</h3>
              <ul className="space-y-2">
                {productInfo.warnings.map((warning, idx) => (
                  <li key={idx} className="text-sm text-yellow-800 flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Find My Shade Button */}
      <button
        onClick={onContinue}
        className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg"
      >
        Find My Shade →
      </button>
    </div>
  );
}