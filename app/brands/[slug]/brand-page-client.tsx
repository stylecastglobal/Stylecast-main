// app/brands/[slug]/brand-page-client.tsx
"use client";

import { useState, useRef } from "react";
import BrandHero from "../components/BrandHero";
import ProductCard from "../components/ProductCard";
import { Brand } from "@/app/data/types";

type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  image: string | null;
  images: string[];
  price: string | null;
  officialUrl: string;
  product_type?: string;
};

interface BrandPageClientProps {
  brand: Brand;
  products: ShopifyProduct[];
}

const PRODUCTS_PER_PAGE = 60;

export default function BrandPageClient({
  brand,
  products,
}: BrandPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log("Product types:", [...new Set(products.map(p => p.product_type))]);

  const trendingProducts = products.slice(0, 12);

  const scrollTrending = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "right" ? 600 : -600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => {
        const productType = (p.product_type || '').toLowerCase();
        const title = p.title.toLowerCase();
        
        if (selectedCategory === "Tops") {
          return productType.includes('top') || 
                 productType.includes('shirt') || 
                 productType.includes('sweater') ||
                 productType.includes('hoodie') ||
                 productType.includes('tee') ||
                 productType.includes('knit') ||
                 title.includes('shirt') ||
                 title.includes('hoodie') ||
                 title.includes('sweater') ||
                 title.includes('tee');
        }
        
        if (selectedCategory === "Bottoms") {
          return productType.includes('bottom') || 
                 productType.includes('pant') || 
                 productType.includes('short') ||
                 productType.includes('jean') ||
                 productType.includes('trouser') ||
                 title.includes('pant') ||
                 title.includes('short') ||
                 title.includes('jean');
        }
        
        if (selectedCategory === "Accessories") {
          return productType.includes('accessories') || 
                 productType.includes('bag') || 
                 productType.includes('hat') ||
                 productType.includes('cap') ||
                 productType.includes('belt') ||
                 title.includes('bag') ||
                 title.includes('hat') ||
                 title.includes('cap');
        }
        
        return false;
      });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return parseFloat(a.price || "0") - parseFloat(b.price || "0");
    }
    if (sortBy === "price-high") {
      return parseFloat(b.price || "0") - parseFloat(a.price || "0");
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 10;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 6) {
        for (let i = 1; i <= 8; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 5) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 7; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <>
      <BrandHero brand={brand} />

      <section className="max-w-[1280px] mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">TRENDING NOW</h2>
          <button
            onClick={() => scrollTrending("right")}
            className="text-sm text-gray-600 hover:text-black"
          >
            View More →
          </button>
        </div>

        <div className="relative group">
          <button
            onClick={() => scrollTrending("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ←
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {trendingProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[190px]">
                <ProductCard product={product} brandSlug={brand.slug} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollTrending("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            →
          </button>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 mt-16">
        <div className="border-b mb-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex gap-6">
              <button
                onClick={() => handleCategoryChange("All")}
                className={`text-sm pb-2 ${
                  selectedCategory === "All"
                    ? "font-semibold border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleCategoryChange("Tops")}
                className={`text-sm pb-2 ${
                  selectedCategory === "Tops"
                    ? "font-semibold border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Tops
              </button>
              <button
                onClick={() => handleCategoryChange("Bottoms")}
                className={`text-sm pb-2 ${
                  selectedCategory === "Bottoms"
                    ? "font-semibold border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Bottoms
              </button>
              <button
                onClick={() => handleCategoryChange("Accessories")}
                className={`text-sm pb-2 ${
                  selectedCategory === "Accessories"
                    ? "font-semibold border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Accessories
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border px-3 py-1.5 rounded"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Total {sortedProducts.length} items
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-5 gap-y-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} brandSlug={brand.slug} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-12 mb-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black disabled:opacity-30"
            >
              ‹
            </button>

            {getPageNumbers().map((page, idx) => (
              <button
                key={idx}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
                className={`w-8 h-8 flex items-center justify-center text-sm ${
                  page === currentPage
                    ? "font-bold text-black"
                    : "text-gray-500 hover:text-black"
                } ${page === "..." ? "cursor-default" : ""}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black disabled:opacity-30"
            >
              ›
            </button>
          </div>
        )}
      </section>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}