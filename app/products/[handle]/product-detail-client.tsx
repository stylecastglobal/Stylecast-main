"use client";

import { useState } from "react";
import Image from "next/image";
import { useShop } from "@/app/context/ShopContext";

export type ProductData = {
  id: number;
  title: string;
  handle: string;
  description: string;
  price: string;
  vendor: string;
  product_type: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
  options: Array<{
    name: string;
    values: string[];
  }>;
  variants: Array<{
    id: number;
    title: string;
    price: string;
    sku: string;
    option1: string;
    option2: string;
    available: boolean;
    image_id: number;
  }>;
  officialUrl: string;
};

export default function ProductDetailClient({ product }: { product: ProductData }) {
  const { addToCart, addToWishlist } = useShop();
  const [selectedImage, setSelectedImage] = useState(0);
  const colorOption = product.options.find(o => o.name.toUpperCase() === "COLOR");
  const sizeOption = product.options.find(o => o.name.toUpperCase() === "SIZE");

  const [selectedColor, setSelectedColor] = useState(
    colorOption?.values[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState("")
  const [activeTab, setActiveTab] = useState("description");

  const colorImages = product.images.filter(
    img => img.alt?.toUpperCase() === selectedColor?.toUpperCase()
  );
  const displayImages = colorImages.length > 0 ? colorImages : product.images;

  const getTextFromHTML = (html: string) => {
    if (typeof document === "undefined") {
      return html.replace(/<[^>]*>/g, " ");
    }
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart({
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      name: `${product.title} (${selectedColor} / ${selectedSize})`,
      price: parseFloat(product.price),
      image: displayImages[selectedImage]?.src || product.images[0].src,
    });
    alert("Added to cart!");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {displayImages.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-20 h-24 border-2 rounded overflow-hidden ${selectedImage === idx ? "border-black" : "border-gray-200"}`}
              >
                <Image src={img.src} alt={img.alt || product.title} fill className="object-cover" sizes="80px" unoptimized />
              </button>
            ))}
          </div>
          <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden" style={{ maxHeight: "600px", aspectRatio: "3/4" }}>
            <Image src={displayImages[selectedImage]?.src || product.images[0].src} alt={product.title} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" priority unoptimized />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold mb-2 flex items-center gap-2">
            {product.vendor.toUpperCase()}
            <span className="text-gray-400">Official Online Store</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-2 text-sm mb-4">
            <span>(3)</span>
            <span className="text-gray-400">♡ 868</span>
          </div>
          <div className="text-3xl font-bold mb-6">${product.price}</div>
          <div className="text-sm text-gray-600 mb-6">Earn up to 120 Points (worth $1.2)</div>

          {colorOption && (
            <div className="mb-6">
              <div className="text-sm font-semibold mb-3">Color Options</div>
              <div className="flex gap-2">
                {colorOption.values.map(color => (
                  <button key={color} onClick={() => { setSelectedColor(color); setSelectedImage(0); }} className={`w-16 h-16 border-2 rounded overflow-hidden ${selectedColor === color ? "border-black" : "border-gray-200"}`}>
                    <Image src={product.images.find(img => img.alt?.toUpperCase() === color.toUpperCase())?.src || product.images[0].src} alt={color} width={64} height={64} className="object-cover w-full h-full" unoptimized />
                  </button>
                ))}
              </div>
            </div>
          )}

          {sizeOption && (
            <div className="mb-6">
              <div className="text-sm font-semibold mb-3">Size</div>
              <div className="flex gap-2">
                {sizeOption.values.map(size => {
                  const variant = product.variants.find(v => {
                    const opts = [v.option1, v.option2].filter(Boolean);
                    const matchesSize = opts.includes(size);
                    const matchesColor = !selectedColor || opts.includes(selectedColor);
                    return matchesSize && matchesColor;
                  });
                  const available = variant?.available ?? true;
                  return (
                    <button key={size} onClick={() => setSelectedSize(size)} disabled={!available} className={`px-6 py-2 border rounded ${selectedSize === size ? "border-black bg-black text-white" : available ? "border-gray-300 hover:border-black" : "border-gray-200 text-gray-300 cursor-not-allowed"}`}>
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="border-t border-b py-4 mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Duties and Taxes</span>
              <span>You can check the Duties and Taxes in your shopping bag.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery</span>
              <div className="text-right">
                <div>Ships in an average of 6 days.</div>
                <div className="text-xs text-gray-500">within 3-9 days, excluding weekends/holidays</div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Information</span>
              <div className="text-right">
                <div>$19</div>
                <div className="text-xs text-gray-500">Free shipping on orders above $200</div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Departure area</span>
              <span>Ships from Korea</span>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button onClick={() => addToWishlist({ id: product.id.toString(), name: product.title, price: parseFloat(product.price), image: product.images[0].src })} className="w-12 h-12 border border-gray-300 rounded flex items-center justify-center hover:border-black">
              ♡
            </button>
            <button onClick={handleAddToCart} className="flex-1 border border-black rounded h-12 font-semibold hover:bg-gray-50">
              ADD TO BAG
            </button>
          </div>

          <a href={product.officialUrl} target="_blank" rel="noopener noreferrer" className="block w-full bg-black text-white rounded h-12 flex items-center justify-center font-semibold hover:bg-gray-900">
            Buy on Official Store
          </a>

          <p className="text-xs text-gray-500 mt-3 text-center">Purchases are completed on the brand official website.</p>
        </div>
      </div>

      <div className="mt-16 border-t">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-4 text-sm font-semibold ${
              activeTab === "description"
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            DESCRIPTION
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-6 py-4 text-sm font-semibold ${
              activeTab === "details"
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            DETAILS
          </button>
          <button
            onClick={() => setActiveTab("size")}
            className={`px-6 py-4 text-sm font-semibold ${
              activeTab === "size"
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            SIZE GUIDE
          </button>
          <button
            onClick={() => setActiveTab("care")}
            className={`px-6 py-4 text-sm font-semibold ${
              activeTab === "care"
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            CARE INSTRUCTIONS
          </button>
        </div>

        <div className="py-8 px-8">
        {activeTab === "description" && (
            <div className="text-sm text-gray-700 space-y-4 leading-relaxed">
              {getTextFromHTML(product.description).split(/\n+/).filter(p => p.trim()).map((paragraph, idx) => (
                <p key={idx}>{paragraph.trim()}</p>
              ))}
            </div>
          )}

          {activeTab === "details" && (
            <div className="text-sm space-y-2">
              <p>100% SUEDE</p>
              <p>MADE IN KOREA</p>
            </div>
          )}

          {activeTab === "size" && (
            <div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left font-normal"></th>
                    <th className="py-3 text-center font-normal">S</th>
                    <th className="py-3 text-center font-normal">M</th>
                    <th className="py-3 text-center font-normal">L</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Chest (cm)</td>
                    <td className="py-3 text-center">108</td>
                    <td className="py-3 text-center">112</td>
                    <td className="py-3 text-center">116</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Length (cm)</td>
                    <td className="py-3 text-center">65</td>
                    <td className="py-3 text-center">67</td>
                    <td className="py-3 text-center">69</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-6">
                Please note that due to the manufacturing process and the method of measurement, a 1-2cm deviation may occur.
              </p>
            </div>
          )}

          {activeTab === "care" && (
            <div className="text-sm text-gray-700 space-y-3">
              <p>Professional dry clean only.</p>
              <p>Do not wash or bleach.</p>
              <p>Avoid direct sunlight and heat.</p>
              <p>Store in a cool, dry place.</p>
            </div>
          )}
        </div>
        {/* 여기에 추가! */}
      <div className="mt-16 mb-16">
        <h2 className="text-xl font-bold mb-6">SNAPS</h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden">
            <Image
              src="/influencer/product-1-1.jpg"
              alt="Influencer style 1"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
          <div className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden">
            <Image
              src="/influencer/product-1-2.jpg"
              alt="Influencer style 2"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
          <div className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden">
            <Image
              src="/influencer/product-1-3.jpg"
              alt="Influencer style 3"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
          <div className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden">
            <Image
              src="/influencer/product-1-4.jpg"
              alt="Influencer style 4"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
          <div className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden">
            <Image
              src="/influencer/product-1-5.jpg"
              alt="Influencer style 5"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
        </div>
      </div>
 
      </div>
    </div>
  );
}