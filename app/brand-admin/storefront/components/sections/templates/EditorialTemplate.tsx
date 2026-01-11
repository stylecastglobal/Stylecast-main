"use client";

import { useRouter } from "next/navigation";
import type { BrandPageConfig } from "../../../types";

interface EditorialTemplateProps {
  config: BrandPageConfig;
}

export default function EditorialTemplate({ config }: EditorialTemplateProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="px-12 py-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="text-sm tracking-[0.2em] font-medium">
            {config.brand.name.toUpperCase()}
          </div>
          <nav className="flex gap-12 text-sm tracking-wide">
            <a href="#" className="hover:opacity-60 transition">New Arrivals</a>
            <a href="#" className="hover:opacity-60 transition">Collections</a>
            <a href="#" className="hover:opacity-60 transition">Editorial</a>
          </nav>
        </div>
      </header>

      {/* HERO - EDITORIAL STYLE */}
      <section className="px-12 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-8">
            {/* Left: Large Typography */}
            <div className="col-span-7 flex flex-col justify-center">
              <h1 className="font-serif text-7xl leading-[1.1] text-black mb-8">
                {config.hero.headline}
              </h1>
              <p className="text-lg text-gray-600 mb-12 max-w-lg leading-relaxed">
                {config.hero.subheadline}
              </p>
              <div>
                
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="col-span-5">
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                {config.hero.image && (
                  <img
                    src={config.hero.image}
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW DROPS SECTION */}
      <section className="px-12 py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-serif text-4xl text-black mb-12 text-center">
            New Drops
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.products?.slice(0, 3).map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => router.push(`/brand/${config.brand.handle}/product/${product.id}`)}
              >
                <div className="aspect-[3/4] bg-gray-200 mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL SECTION 1 */}
      <section className="px-12 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-5">
              <div className="aspect-square bg-gray-200 overflow-hidden">
                {config.editorial?.section1Image && (
                  <img
                    src={config.editorial.section1Image}
                    alt="Editorial section 1"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="col-span-7 flex flex-col justify-center">
              <h2 className="font-serif text-5xl text-black mb-6">
                Crafted for the modern wardrobe
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-xl">
                Each piece is designed with intention, balancing form and function
                to create timeless essentials that elevate everyday dressing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS SECTION */}
      <section className="px-12 py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-serif text-4xl text-black mb-12 text-center">
            Bestsellers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.products?.slice(3, 6).map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => router.push(`/brand/${config.brand.handle}/product/${product.id}`)}
              >
                <div className="aspect-[3/4] bg-gray-200 mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL SECTION 2 */}
      <section className="px-12 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-7 flex flex-col justify-center">
              <h2 className="font-serif text-5xl text-black mb-6">
                Precision in every detail
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-xl">
                From fabric selection to final stitch, our commitment to quality
                ensures each garment stands the test of time.
              </p>
            </div>
            <div className="col-span-5">
              <div className="aspect-[4/5] bg-gray-200 overflow-hidden">
                {config.editorial?.section2Image && (
                  <img
                    src={config.editorial.section2Image}
                    alt="Editorial section 2"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      {config.about && (
        <section className="px-12 py-24 bg-gray-50">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-12 gap-12">
              <div className="col-span-6">
                <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                  {config.about.image && (
                    <img
                      src={config.about.image}
                      alt="About"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="col-span-6 flex flex-col justify-center">
                <h2 className="font-serif text-4xl text-black mb-6">
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

      {/* ALL PRODUCTS SECTION */}
      <section className="px-12 py-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-serif text-4xl mb-16 text-center text-black">
            All Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.products?.slice(6, 9).map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => router.push(`/brand/${config.brand.handle}/product/${product.id}`)}
              >
                <div className="aspect-[3/4] bg-gray-200 mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1 text-black">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-12 py-16 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <div className="text-sm tracking-[0.2em] font-medium mb-4">
                {config.brand.name.toUpperCase()}
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Modern essentials crafted with precision and purpose.
              </p>
            </div>
            
            <div className="col-span-8 grid grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-medium mb-4">Shop</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-black">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-black">Collections</a></li>
                  <li><a href="#" className="hover:text-black">Sale</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">About</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-black">Our Story</a></li>
                  <li><a href="#" className="hover:text-black">Sustainability</a></li>
                  <li><a href="#" className="hover:text-black">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Support</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-black">FAQ</a></li>
                  <li><a href="#" className="hover:text-black">Shipping</a></li>
                  <li><a href="#" className="hover:text-black">Returns</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
            © 2026 {config.brand.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}