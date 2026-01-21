"use client";

import Image from "next/image";
import Link from "next/link";
import { useShop } from "../context/ShopContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  return (
    <section className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-semibold mb-10">Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">You haven't saved any items yet.</p>
          <Link
            href="/cart"
            className="text-sm underline hover:text-gray-700"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <div key={item.id} className="group">
                {/* IMAGE */}
                <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />

                  {/* REMOVE ✕ */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md hover:bg-gray-100"
                  >
                    <span className="text-lg">✕</span>
                  </button>
                </div>

                {/* INFO */}
                <div className="mt-3">
                  <div className="text-sm font-medium line-clamp-2">
                    {item.name}
                  </div>
                  <div className="mt-1 text-sm font-semibold">
                    ${item.price}
                  </div>

                  {/* ACTION */}
                  <button
                    onClick={() => {
                      addToCart(item);
                      // Optionally remove from wishlist after adding to cart
                      // removeFromWishlist(item.id);
                    }}
                    className="mt-3 w-full border border-black py-2 text-sm rounded-full hover:bg-black hover:text-white transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* BACK */}
          <div className="mt-16">
            <Link href="/cart" className="text-sm underline hover:text-gray-700">
              Continue shopping
            </Link>
          </div>
        </>
      )}
    </section>
  );
}