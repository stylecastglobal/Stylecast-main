"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "../context/ShopContext";

type CartItem = {
  id: string;
  brand: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

type AddOnItem = {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
};

export default function CartPage() {
  const { cart, addToCart, addToWishlist } = useShop();

  /* ================= CART (LOCAL DEMO ITEMS) ================= */
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "cart-1",
      brand: "CPGN STUDIO",
      name: "[2-WAY] Sleeve Star Pigment Hood Zip-up Smoke Black",
      price: 48,
      qty: 1,
      image: "/sample-product.jpg",
    },
  ]);

  /* ================= PROMO CODE DRAWER STATE ================= */
  const [isPromoDrawerOpen, setIsPromoDrawerOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  /* ================= ADD-ONS ================= */
  const addOns: AddOnItem[] = useMemo(
    () => [
      {
        id: "addon-1",
        brand: "NONOER",
        name: "Over Dew Lip Pencil [Matte]",
        price: 12,
        image: "/addon-1.jpg",
      },
      {
        id: "addon-2",
        brand: "LOGIN FOREST",
        name: "Garden Finishing Spray",
        price: 8,
        image: "/addon-2.jpg",
      },
      {
        id: "addon-3",
        brand: "MUSINSA STANDARD",
        name: "Hyaluronic Acid Balancing",
        price: 15,
        image: "/addon-3.jpg",
      },
      {
        id: "addon-4",
        brand: "DASHU",
        name: "Volume Styling Wax",
        price: 8,
        image: "/addon-4.jpg",
      },
    ],
    []
  );

  /* ================= TOTAL CALC ================= */
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const duties = subtotal > 0 ? 8 : 0;
  const discount = subtotal > 0 ? 25 : 0;
  const total = subtotal + shipping + duties - discount;

  /* ================= TOTAL ANIMATION (STEP 2) ================= */
  const [animateTotal, setAnimateTotal] = useState(false);

  useEffect(() => {
    setAnimateTotal(true);
    const t = setTimeout(() => setAnimateTotal(false), 300);
    return () => clearTimeout(t);
  }, [total]);

  /* ================= ADD-ON SCROLL (ARROWS) ================= */
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  /* ================= ACTIONS ================= */
  const addAddonToCart = (p: AddOnItem) => {
    // local cart UI
    setItems((prev) => [
      ...prev,
      {
        id: `cart-${Date.now()}`,
        brand: p.brand,
        name: p.name,
        price: p.price,
        qty: 1,
        image: p.image,
      },
    ]);

    // global cart (for header badge / checkout later)
    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
    });
  };

  const addAddonToWishlist = (p: AddOnItem) => {
    addToWishlist({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
    });
  };

  /* ================= PROMO CODE HANDLER ================= */
  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoMessage("");
      return;
    }
    setPromoMessage("No promo codes available for the selected items.");
  };

  /* ================= UI ================= */
  return (
    <>
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-semibold mb-8">
          SHOPPING BAG ({items.length})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2">
            {/* CART ITEMS */}
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 border-b pb-8 mb-8">
                <div className="relative w-32 h-40 bg-gray-100 rounded">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                <div className="flex-1">
                  <div className="font-semibold">{item.brand}</div>
                  <div className="text-sm text-gray-700">{item.name}</div>

                  <div className="mt-4 text-sm">Qty: {item.qty}</div>

                  <Link
                    href="/outfit-builder"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-medium border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition"
                  >
                    <span>✦</span> Create Outfit
                  </Link>
                </div>

                <div className="text-right font-semibold">${item.price}</div>
              </div>
            ))}

            {/* ================= ADD-ON SECTION ================= */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Easy add-on beauty under $15
                </h2>

                <div className="flex gap-2">
                  <button
                    onClick={() => scroll("left")}
                    className="border px-3 py-1"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    className="border px-3 py-1"
                  >
                    →
                  </button>
                </div>
              </div>

              <div
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none]"
              >
                {addOns.map((p) => (
                  <div key={p.id} className="min-w-[160px]">
                    <div className="relative w-[160px] h-[180px] bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />

                      {/* ❤️ WISHLIST (STEP 3) */}
                      <button
                        onClick={() => addAddonToWishlist(p)}
                        className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center"
                      >
                        <Image
                          src="/heart.png"
                          alt="Wishlist"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs text-gray-500">{p.brand}</div>
                      <div className="text-sm font-medium line-clamp-2">
                        {p.name}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-red-600 font-semibold">
                          ${p.price}
                        </span>

                        {/* ➕ ADD (STEP 2) */}
                        <button
                          onClick={() => addAddonToCart(p)}
                          className="text-xs border border-black px-3 py-1 rounded-full hover:bg-black hover:text-white transition"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT / TOTAL ================= */}
          <aside className="border rounded-xl p-6 h-fit">
            {/* ================= PROMO CODE BUTTON ================= */}
            <button
              onClick={() => setIsPromoDrawerOpen(true)}
              className="w-full flex items-center justify-between py-3 border-b mb-6 hover:bg-gray-50 transition"
            >
              <span className="font-semibold">Apply promo code</span>
              <span className="text-xl">›</span>
            </button>

            {promoMessage && (
              <p className="text-xs text-gray-600 mb-4 -mt-2">
                {promoMessage}
              </p>
            )}

            {/* ================= PRICE BREAKDOWN ================= */}
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Duties & Taxes</span>
                <span>${duties}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Discounts</span>
                <span>- ${discount}</span>
              </div>
            </div>

            {/* 🔥 TOTAL WITH ANIMATION */}
            <div
              className={`flex justify-between text-lg font-semibold mb-4 transition-all duration-300 ${
                animateTotal ? "scale-[1.04] bg-gray-50 px-2 py-1 rounded" : ""
              }`}
            >
              <span>Total ({items.length})</span>
              <span>USD ${total}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-black text-white py-4 rounded hover:bg-gray-900 transition text-center font-medium"
            >
              PROCEED TO CHECKOUT
            </Link>
          </aside>
        </div>
      </section>

      {/* ================= PROMO CODE DRAWER ================= */}
      {isPromoDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsPromoDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">PROMO CODE</h2>
              <button
                onClick={() => setIsPromoDrawerOpen(false)}
                className="text-2xl hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Input */}
              <div className="flex gap-2 mb-8">
                <input
                  type="text"
                  placeholder="Enter your promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 border rounded px-4 py-3 text-sm"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-black text-white px-8 py-3 text-sm rounded hover:bg-gray-900"
                >
                  Apply
                </button>
              </div>

              {/* Available Promos */}
              <div className="space-y-4">
                {[
                  {
                    title: "15% OFF",
                    desc: "4 Days Only. Extra 15% Off. Available on orders over 200USD / 250SGD / 8,300THB. Some exclusions may apply.",
                    code: "AGEDAY252",
                    expires: "01/12 10:00 am KST",
                    eligible: false,
                  },
                  {
                    title: "25% OFF",
                    desc: "For 7 days only! Extra 25% off. Applicable to MUSINSA STANDARD MAN/WOMAN/SPORTS/KIDS/BEAUTY brands only, on orders over $100.",
                    code: "MUTANFAMILYSALE",
                    expires: "01/12 10:00 am KST",
                    eligible: false,
                  },
                  {
                    title: "20% OFF",
                    desc: "For seven days only! Brands on offer: OFCOURSEWHY/NOT, FRANTICSERVICE, LONDONDADA, ROYAL OAK...",
                    code: "NEW2601",
                    expires: "01/12 10:00 am KST",
                    eligible: false,
                  },
                  {
                    title: "30% OFF",
                    desc: "Age Day Special One Week Only Beauty 30% Off Promo Code! For purchases over 99 USD / 99 SGD...",
                    code: "BEAUTYAGEDAY30",
                    expires: "01/12 10:00 am KST",
                    eligible: false,
                  },
                  {
                    title: "40% OFF",
                    desc: "Age Day Special One Week Only Beauty 40% Off Promo Code! For purchases over 199 USD / 199 SGD...",
                    code: "BEAUTYAGEDAY40",
                    expires: "01/12 10:00 am KST",
                    eligible: false,
                  },
                ].map((promo, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 relative opacity-60"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">{promo.title}</h3>
                      <span className="text-xs text-gray-500">
                        Not eligible
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-3">
                      {promo.desc}
                    </p>
                    <div className="text-xs text-gray-500">
                      <div>Code : {promo.code}</div>
                      <div>Expires {promo.expires}</div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-600 mt-8 text-center">
                • Only one promo code can be used per order.
              </p>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}