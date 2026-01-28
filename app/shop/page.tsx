"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<"all" | "men" | "women">("all");
  
  // Bestsellers Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<NodeJS.Timeout | null>(null);

  // Categories
  const categories = [
    { id: "tops", label: "Tops", count: 342 },
    { id: "bottoms", label: "Bottoms", count: 218 },
    { id: "outerwear", label: "Outerwear", count: 156 },
    { id: "footwear", label: "Footwear", count: 289 },
    { id: "accessories", label: "Accessories", count: 421 },
    { id: "bags", label: "Bags", count: 134 },
  ];

  // Bestsellers Data (12 items for 2 slides)
  const bestsellers = [
    {
      id: 1,
      brand: "ZARA",
      title: "Cropped Fringe Jacket",
      originalPrice: 89900,
      salePrice: 62930,
      discount: 30,
      image: "/drop-1.jpg",
      likes: 126,
      reviews: 4865,
    },
    {
      id: 2,
      brand: "MANGO",
      title: "Leather Wide Pants",
      originalPrice: 129900,
      salePrice: 97425,
      discount: 25,
      image: "/drop-2.jpg",
      likes: 156,
      reviews: 4916,
    },
    {
      id: 3,
      brand: "COS",
      title: "Wide Tuck Pants",
      originalPrice: 109900,
      salePrice: 87920,
      discount: 20,
      image: "/drop-3.jpg",
      likes: 65,
      reviews: 474,
    },
    {
      id: 4,
      brand: "H&M",
      title: "Fitted Knit Top",
      originalPrice: 39900,
      salePrice: 25935,
      discount: 35,
      image: "/drop-6.jpg",
      likes: 186,
      reviews: 4819,
    },
    {
      id: 5,
      brand: "UNIQLO",
      title: "Cargo Detail Pants",
      originalPrice: 59900,
      salePrice: 50915,
      discount: 15,
      image: "/drop-7.jpg",
      likes: 74,
      reviews: 4975,
    },
    {
      id: 6,
      brand: "PULL&BEAR",
      title: "Half Storm Jumper",
      originalPrice: 64900,
      salePrice: 46728,
      discount: 28,
      image: "/drop-8.jpg",
      likes: 109,
      reviews: 4649,
    },
    {
      id: 7,
      brand: "MASSIMO DUTTI",
      title: "Oversized Leather Coat",
      originalPrice: 249900,
      salePrice: 169932,
      discount: 32,
      image: "/women-printer-1.jpg",
      likes: 212,
      reviews: 3865,
    },
    {
      id: 8,
      brand: "BERSHKA",
      title: "Wind Detail Screenshot",
      originalPrice: 49900,
      salePrice: 38922,
      discount: 22,
      image: "/women-grid-1.jpg",
      likes: 89,
      reviews: 2847,
    },
    {
      id: 9,
      brand: "STRADIVARUIS",
      title: "Cropped Denim Jumper",
      originalPrice: 79900,
      salePrice: 59128,
      discount: 26,
      image: "/women-grid-4.jpg",
      likes: 134,
      reviews: 3756,
    },
    {
      id: 10,
      brand: "ZARA",
      title: "Destroyed Knit Top",
      originalPrice: 59900,
      salePrice: 49118,
      discount: 18,
      image: "/women-grid-5.jpg",
      likes: 95,
      reviews: 2934,
    },
    {
      id: 11,
      brand: "ARKET",
      title: "Hooded Cashmere Sweater",
      originalPrice: 189900,
      salePrice: 132930,
      discount: 30,
      image: "/women-grid-3.jpg",
      likes: 167,
      reviews: 4123,
    },
    {
      id: 12,
      brand: "WEEKDAY",
      title: "High Waist Denim",
      originalPrice: 89900,
      salePrice: 68322,
      discount: 24,
      image: "/apparel6.jpg",
      likes: 203,
      reviews: 5298,
    },
  ];

  // Wishlist state
  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Auto-slide carousel
  useEffect(() => {
    if (!isHovered) {
      carouselRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 2); // 2 slides (0 and 1)
      }, 5000); // Change every 5 seconds
    }

    return () => {
      if (carouselRef.current) {
        clearInterval(carouselRef.current);
      }
    };
  }, [isHovered]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 2);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2);
  };

  return (
    <div className="min-h-screen bg-white">
    

      {/* Hero Section with Categories */}
      <section className="pt-24 pb-16 px-6 md:px-12 lg:px-20 border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto">
          {/* Gender Filter */}
          <div className="flex justify-end mb-12 gap-1">
            {["all", "men", "women"].map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender as any)}
                className={`px-6 py-1.5 text-xs uppercase tracking-[0.2em] transition-all ${
                  selectedGender === gender
                    ? "bg-black text-white"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {gender}
              </button>
            ))}
          </div>

          {/* Shop by Categories */}
          <h1 className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-8 font-semibold">
            Shop by Category
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-200">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`bg-white p-8 text-left transition-all hover:bg-gray-50 group ${
                  selectedCategory === cat.id ? "bg-black text-white" : ""
                }`}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3
                      className={`text-2xl mb-2 font-semibold tracking-tight ${
                        selectedCategory === cat.id ? "text-white" : "text-black"
                      }`}
                    >
                      {cat.label}
                    </h3>
                    <p
                      className={`text-xs tracking-[0.2em] font-medium ${
                        selectedCategory === cat.id
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      {cat.count} items
                    </p>
                  </div>
                  <div
                    className={`mt-6 text-[11px] uppercase tracking-[0.25em] font-semibold ${
                      selectedCategory === cat.id
                        ? "text-white"
                        : "text-black opacity-0 group-hover:opacity-100"
                    } transition-opacity`}
                  >
                    Browse →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Carousel Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-baseline gap-4">
              <h2 className="text-2xl font-normal">Bestsellers</h2>
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-black transition-colors"
              >
                View All →
              </Link>
            </div>

            {/* Manual Arrow Buttons */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all flex items-center justify-center"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all flex items-center justify-center"
              >
                →
              </button>
            </div>
          </div>

          {/* Carousel Container */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {/* Slide 1 (Items 0-5) */}
              <div className="w-full flex-shrink-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {bestsellers.slice(0, 6).map((item) => (
                    <Link
                      key={item.id}
                      href="#"
                      className="group block"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Wishlist Heart Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(item.id);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                        >
                          {wishlist.includes(item.id) ? "❤️" : "♡"}
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500 font-medium">
                          {item.brand}
                        </p>
                        <h3 className="text-sm font-normal line-clamp-1">
                          {item.title}
                        </h3>
                        
                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-red-600">
                            {item.discount}%
                          </span>
                          <span className="text-sm font-bold">
                            {item.salePrice.toLocaleString()}원
                          </span>
                        </div>
                        
                        <p className="text-xs text-gray-400 line-through">
                          {item.originalPrice.toLocaleString()}원
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-3 pt-1">
                          <span className="text-xs text-gray-500">
                            ♡ {item.likes}
                          </span>
                          <span className="text-xs text-gray-500">
                            ★ {item.reviews.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Slide 2 (Items 6-11) */}
              <div className="w-full flex-shrink-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {bestsellers.slice(6, 12).map((item) => (
                    <Link
                      key={item.id}
                      href="#"
                      className="group block"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Wishlist Heart Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(item.id);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                        >
                          {wishlist.includes(item.id) ? "❤️" : "♡"}
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500 font-medium">
                          {item.brand}
                        </p>
                        <h3 className="text-sm font-normal line-clamp-1">
                          {item.title}
                        </h3>
                        
                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-red-600">
                            {item.discount}%
                          </span>
                          <span className="text-sm font-bold">
                            {item.salePrice.toLocaleString()}원
                          </span>
                        </div>
                        
                        <p className="text-xs text-gray-400 line-through">
                          {item.originalPrice.toLocaleString()}원
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-3 pt-1">
                          <span className="text-xs text-gray-500">
                            ♡ {item.likes}
                          </span>
                          <span className="text-xs text-gray-500">
                            ★ {item.reviews.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1].map((index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index
                      ? "bg-black w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid Section (Musinsa Style) */}
      <section className="py-8 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-6 py-5 border-b border-gray-200">
            <div className="flex gap-8">
              <button className="text-base hover:text-black transition-colors flex items-center gap-2 font-normal">
                Product <span className="text-xs">▼</span>
              </button>
              <button className="text-base hover:text-black transition-colors flex items-center gap-2 font-normal">
                Size <span className="text-xs">▼</span>
              </button>
              <button className="text-base hover:text-black transition-colors flex items-center gap-2 font-normal">
                Color <span className="text-xs">▼</span>
              </button>
            </div>
            <button className="text-base text-black hover:opacity-70 transition-opacity flex items-center gap-2 font-normal">
              Sort by: Popular <span className="text-xs">▼</span>
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bestsellers.map((item) => (
              <Link
                key={item.id}
                href="#"
                className="group block"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(item.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                  >
                    {wishlist.includes(item.id) ? "❤️" : "♡"}
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 font-medium">
                    {item.brand}
                  </p>
                  <h3 className="text-sm font-normal line-clamp-1">
                    {item.title}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-red-600">
                      {item.discount}%
                    </span>
                    <span className="text-sm font-bold">
                      {item.salePrice.toLocaleString()}원
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-400 line-through">
                    {item.originalPrice.toLocaleString()}원
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs text-gray-500">
                      ♡ {item.likes}
                    </span>
                    <span className="text-xs text-gray-500">
                      ★ {item.reviews.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}