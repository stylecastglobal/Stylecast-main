"use client";

import { useRouter } from "next/navigation";
import type { BrandPageConfig } from "../../../types";

interface MinimalTemplateProps {
  config: BrandPageConfig;
}

export default function MinimalTemplate({ config }: MinimalTemplateProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b border-gray-200 px-8 py-6 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {config.brand.name}
          </h1>
          <nav className="flex gap-8 text-sm">
            <a href="#" className="text-gray-600 hover:text-black">Shop</a>
            <a href="#" className="text-gray-600 hover:text-black">About</a>
            <a href="#" className="text-gray-600 hover:text-black">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO WITH BACKGROUND IMAGE */}
      <section className="relative px-8 py-32">
        {/* Background Image */}
        {config.hero.image && (
          <div className="absolute inset-0">
            <img
              src={config.hero.image}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        )}
        
        {/* Hero Content - White Text */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            {config.hero.headline}
          </h2>
          <p className="text-xl text-white mb-8 drop-shadow-lg">
            {config.hero.subheadline}
          </p>
          <button className="bg-white text-black px-8 py-4 rounded-full text-sm font-medium hover:bg-gray-100 transition">
            EXPLORE COLLECTION
          </button>
        </div>
      </section>

      {/* NEW DROPS */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            New Drops
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.products?.slice(0, 3).map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => router.push(`/brand/${config.brand.handle}/product/${product.id}`)}
              >
                <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-black mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      {config.about && (
        <section className="px-8 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden rounded-lg">
                {config.about.image && (
                  <img
                    src={config.about.image}
                    alt="About"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">
                  {config.about.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {config.about.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BESTSELLERS */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            Bestsellers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.products?.slice(3, 6).map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => router.push(`/brand/${config.brand.handle}/product/${product.id}`)}
              >
                <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-black mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            All Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.products?.slice(6, 9).map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => router.push(`/brand/${config.brand.handle}/product/${product.id}`)}
              >
                <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-black mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-black mb-4">{config.brand.name}</h3>
              <p className="text-sm text-gray-600">
                Modern essentials crafted with precision and purpose.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-black mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black">New Arrivals</a></li>
                <li><a href="#" className="hover:text-black">Collections</a></li>
                <li><a href="#" className="hover:text-black">Sale</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-black mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black">FAQ</a></li>
                <li><a href="#" className="hover:text-black">Shipping</a></li>
                <li><a href="#" className="hover:text-black">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
            © 2026 {config.brand.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}