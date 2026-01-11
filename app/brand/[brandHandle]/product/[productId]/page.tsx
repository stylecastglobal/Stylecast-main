"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Type definitions
type DetailSection = {
  id: string;
  type: "image" | "text" | "table";
  content: string;
  image?: string;
  title?: string;
};

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  material: string;
  care: string;
  detailSections?: DetailSection[];
};

// Mock product data (나중에 실제 데이터로 교체)
const PRODUCTS: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Minimal Wool Coat",
    price: "$420",
    description: "A timeless wool coat crafted with precision. Features a minimalist silhouette with premium wool blend fabric. Perfect for layering in colder months.",
    images: ["/product-1.jpg", "/product-1.jpg", "/product-1.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Charcoal", "Navy"],
    material: "80% Wool, 20% Polyester",
    care: "Dry clean only",
    detailSections: [
      {
        id: "1",
        type: "image",
        content: "",
        image: "/product-1.jpg",
      },
      {
        id: "2",
        type: "text",
        content: "The Minimal Wool Coat represents the pinnacle of contemporary outerwear design. Crafted from premium wool blend fabric, this coat features a minimalist silhouette that pairs effortlessly with any wardrobe.\n\nEach piece is carefully constructed with attention to detail, ensuring both durability and timeless style. The clean lines and structured fit make this coat a versatile addition to your winter collection.",
        title: "Design & Craftsmanship",
      },
      {
        id: "3",
        type: "table",
        content: "Size | Chest | Length | Shoulder\nS | 90cm | 95cm | 42cm\nM | 95cm | 97cm | 44cm\nL | 100cm | 99cm | 46cm\nXL | 105cm | 101cm | 48cm",
        title: "Size Chart",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Leather Bag",
    price: "$310",
    description: "Handcrafted leather shoulder bag with premium hardware. Designed for everyday elegance.",
    images: ["/product-2.jpg", "/product-2.jpg", "/product-2.jpg"],
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tan"],
    material: "100% Italian Leather",
    care: "Wipe clean with damp cloth",
    detailSections: [
      {
        id: "1",
        type: "text",
        content: "Handcrafted from premium Italian leather, this shoulder bag combines functionality with timeless elegance. Each bag is meticulously crafted by skilled artisans.",
        title: "Premium Materials",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Tailored Trousers",
    price: "$260",
    description: "Perfectly tailored trousers with a contemporary fit. Made from premium stretch fabric for all-day comfort.",
    images: ["/product-3.jpg", "/product-3.jpg", "/product-3.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Grey"],
    material: "70% Wool, 28% Polyester, 2% Elastane",
    care: "Machine wash cold",
  },
  "4": {
    id: "4",
    name: "Cashmere Sweater",
    price: "$380",
    description: "Luxurious cashmere sweater with a relaxed fit. Soft and warm for everyday comfort.",
    images: ["/product-4.jpg", "/product-4.jpg", "/product-4.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Black", "Grey"],
    material: "100% Cashmere",
    care: "Hand wash cold",
  },
  "5": {
    id: "5",
    name: "Silk Shirt",
    price: "$290",
    description: "Elegant silk shirt with a modern cut. Perfect for both casual and formal occasions.",
    images: ["/product-5.jpg", "/product-5.jpg", "/product-5.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy"],
    material: "100% Silk",
    care: "Dry clean only",
  },
  "6": {
    id: "6",
    name: "Leather Boots",
    price: "$520",
    description: "Premium leather boots with durable construction. Timeless design for any season.",
    images: ["/product-6.jpg", "/product-6.jpg", "/product-6.jpg"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    colors: ["Black", "Brown"],
    material: "100% Leather",
    care: "Polish regularly",
  },
  "7": {
    id: "7",
    name: "Wool Scarf",
    price: "$180",
    description: "Soft wool scarf with a classic design. Perfect accessory for cold weather.",
    images: ["/product-7.jpg", "/product-7.jpg", "/product-7.jpg"],
    sizes: ["One Size"],
    colors: ["Grey", "Black", "Camel"],
    material: "100% Merino Wool",
    care: "Hand wash cold",
  },
  "8": {
    id: "8",
    name: "Canvas Tote",
    price: "$220",
    description: "Durable canvas tote bag with leather handles. Spacious and stylish for everyday use.",
    images: ["/product-8.jpg", "/product-8.jpg", "/product-8.jpg"],
    sizes: ["One Size"],
    colors: ["Natural", "Black"],
    material: "Canvas with Leather trim",
    care: "Spot clean only",
  },
  "9": {
    id: "9",
    name: "Merino Cardigan",
    price: "$340",
    description: "Lightweight merino cardigan with a refined silhouette. Versatile layering piece.",
    images: ["/product-9.jpg", "/product-9.jpg", "/product-9.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Grey", "Black"],
    material: "100% Merino Wool",
    care: "Hand wash cold",
  },
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const brandHandle = params.brandHandle as string;
  const productId = params.productId as string;

  const product = PRODUCTS[productId];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-black text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push(`/brand/${brandHandle}`)}
            className="text-2xl font-bold tracking-tight hover:opacity-60 transition"
          >
            Studio Archive
          </button>
          <nav className="flex gap-8 text-sm">
            <a href="#" className="text-gray-600 hover:text-black">Shop</a>
            <a href="#" className="text-gray-600 hover:text-black">About</a>
            <a href="#" className="text-gray-600 hover:text-black">Contact</a>
          </nav>
        </div>
      </header>

      {/* PRODUCT DETAIL */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT: IMAGES */}
          <div>
            {/* Main Image */}
            <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden rounded-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 overflow-hidden rounded-lg border-2 transition ${
                    selectedImage === index
                      ? "border-black"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div>
            <h1 className="text-4xl font-bold text-black mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-semibold text-black mb-6">
              {product.price}
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* COLOR SELECTION */}
            <div className="mb-6">
              <label className="text-sm font-medium text-black block mb-3">
                Color: {selectedColor}
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 border-2 rounded-lg text-sm font-medium transition ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-black hover:border-black"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE SELECTION */}
            <div className="mb-8">
              <label className="text-sm font-medium text-black block mb-3">
                Size: {selectedSize || "Select a size"}
              </label>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg text-sm font-medium transition ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-black hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mb-8">
              <label className="text-sm font-medium text-black block mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-black transition"
                >
                  −
                </button>
                <span className="text-lg font-medium w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-black transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* ADD TO CART */}
            <button
              disabled={!selectedSize}
              className={`w-full py-4 rounded-lg text-sm font-medium transition mb-4 ${
                selectedSize
                  ? "bg-black text-white hover:bg-neutral-900"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {selectedSize ? "Add to Cart" : "Select a size"}
            </button>

            <button className="w-full py-4 border-2 border-black rounded-lg text-sm font-medium hover:bg-black hover:text-white transition">
              Buy it now
            </button>

            {/* PRODUCT DETAILS */}
            <div className="mt-12 space-y-6 border-t border-gray-200 pt-8">
              <div>
                <h3 className="font-medium text-black mb-2">Material</h3>
                <p className="text-sm text-gray-600">{product.material}</p>
              </div>

              <div>
                <h3 className="font-medium text-black mb-2">Care Instructions</h3>
                <p className="text-sm text-gray-600">{product.care}</p>
              </div>

              <div>
                <h3 className="font-medium text-black mb-2">Shipping & Returns</h3>
                <p className="text-sm text-gray-600">
                  Free shipping on orders over $200. Free returns within 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT DETAIL SECTIONS */}
      {product.detailSections && product.detailSections.length > 0 && (
        <div className="max-w-7xl mx-auto px-8 py-16 space-y-16 border-t border-gray-200">
          {product.detailSections.map((section: DetailSection) => (
            <div key={section.id}>
              {section.type === "image" && section.image && (
                <img
                  src={section.image}
                  alt="Product detail"
                  className="w-full rounded-lg"
                />
              )}

              {section.type === "text" && (
                <div className="max-w-3xl mx-auto">
                  {section.title && (
                    <h2 className="text-2xl font-bold text-black mb-4">
                      {section.title}
                    </h2>
                  )}
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </p>
                </div>
              )}

              {section.type === "table" && (
                <div className="max-w-4xl mx-auto">
                  {section.title && (
                    <h2 className="text-2xl font-bold text-black mb-6 text-center">
                      {section.title}
                    </h2>
                  )}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                        {section.content.split("\n").filter((row: string) => row.trim()).map((row: string, i: number) => (
                          <tr key={i}>
                            {row.split("|").map((cell: string, j: number) => (
                              <td
                                key={j}
                                className={`px-6 py-4 border border-gray-300 ${
                                  i === 0
                                    ? "bg-gray-100 font-medium text-center"
                                    : "text-gray-700"
                                }`}
                              >
                                {cell.trim()}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-gray-200 px-8 py-12 mt-16">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          © 2026 Studio Archive. All rights reserved.
        </div>
      </footer>
    </div>
  );
}