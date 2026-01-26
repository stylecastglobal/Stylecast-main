"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProductDoc } from "@/lib/productScanner/types";

export default function ScanResultClient({
  product,
  confidence,
}: {
  product: ProductDoc;
  confidence: string;
}) {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden">
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            )}
          </div>

          <div>
            <p className="text-xs uppercase text-gray-400">{product.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
            {confidence && (
              <p className="text-sm text-gray-500 mt-2">Confidence: {confidence}%</p>
            )}

            <div className="mt-6">
              <p className="text-2xl font-bold text-gray-900">{product.price || "Price N/A"}</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
            </div>

            {product.stores?.length > 0 && (
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-semibold mb-2">You can purchase from:</p>
                <ul className="space-y-1">
                  {product.stores.map((store) => (
                    <li key={store.link}>
                      <a href={store.link} target="_blank" rel="noreferrer" className="underline">
                        {store.name}
                      </a>
                      {store.price ? ` · ${store.price}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <Link
                href={`/ai-makeup-studio?productId=${product.id}`}
                className="block w-full text-center bg-black text-white py-3 rounded-xl font-semibold"
              >
                Try On
              </Link>
              <Link
                href={`/scan/shade-match?productId=${product.id}&category=${product.category}`}
                className="block w-full text-center border border-black py-3 rounded-xl font-semibold"
              >
                Find My Shade
              </Link>
            </div>
          </div>
        </div>

        {product.shades && product.shades.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">Shades</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.shades.map((shade) => (
                <div
                  key={shade.shade_name}
                  className="border border-gray-200 rounded-xl p-3"
                >
                  <div
                    className="w-full h-16 rounded-lg border"
                    style={{ backgroundColor: shade.hex }}
                  />
                  <p className="text-sm font-semibold mt-2">{shade.shade_name}</p>
                  <p className="text-xs text-gray-500">{shade.undertone || "unknown"}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold mb-3">Ingredients</h3>
            <p className="text-sm text-gray-600">
              {product.ingredients || "No ingredient data available."}
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold mb-3">Safety Flags</h3>
            <div className="flex flex-wrap gap-2">
              {(product.safety_flags || ["No flags found"]).map((flag) => (
                <span key={flag} className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                  {flag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold mb-3">Wear Time</h3>
            <p className="text-sm text-gray-600">
              {product.wear_time_rating || "No wear-time data available."}
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold mb-3">Review Summary</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Oily: {product.reviews_summary?.oily || "N/A"}</li>
              <li>Dry: {product.reviews_summary?.dry || "N/A"}</li>
              <li>Acne-prone: {product.reviews_summary?.acne_prone || "N/A"}</li>
              <li>Sensitive: {product.reviews_summary?.sensitive || "N/A"}</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
