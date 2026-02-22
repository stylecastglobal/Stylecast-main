"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "../context/ShopContext";
import { useOutfitBuilderStore } from "../lib/outfit-builder-store";
import { trackPurchaseAfterReasoning } from "../lib/analytics/reasoning";

export default function CheckoutPage() {
  const { cart } = useShop();
  const { reasoning, slots } = useOutfitBuilderStore();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zipCode: "",
    phone: "",
  });

  // Calculate totals (same as cart page)
  const subtotal = 48; // You can calculate from cart items
  const shipping = 15;
  const duties = 8;
  const discount = 25;
  const total = subtotal + shipping + duties - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout submission
    console.log("Checkout submitted:", formData);

    trackPurchaseAfterReasoning({
      reasoningWasDisplayed: reasoning != null,
      itemCount: cart.length,
      totalAmount: total,
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-8 py-16">
      <Link href="/cart" className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-8">
        <span className="mr-2">←</span> Back to cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT - FORM */}
        <div>
          <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* CONTACT */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* SHIPPING ADDRESS */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                type="text"
                name="apartment"
                placeholder="Apartment, suite, etc. (optional)"
                value={formData.apartment}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>South Korea</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* PAYMENT METHOD */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <input type="radio" name="payment" id="card" defaultChecked />
                  <label htmlFor="card" className="flex items-center gap-2">
                    <span>Credit Card</span>
                    <div className="flex gap-1">
                      <Image src="/visa.png" alt="Visa" width={30} height={20} />
                      <Image src="/mastercard.png" alt="Mastercard" width={30} height={20} />
                    </div>
                  </label>
                </div>

                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full px-4 py-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" id="paypal" />
                  <label htmlFor="paypal" className="flex items-center gap-2">
                    <span>PayPal</span>
                    <Image src="/paypal.png" alt="PayPal" width={60} height={20} />
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-900 transition text-lg font-semibold"
            >
              Complete Order
            </button>
          </form>
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        <div>
          <div className="border rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            {/* CART ITEM */}
            <div className="flex gap-4 pb-6 mb-6 border-b">
              <div className="relative w-20 h-24 bg-gray-100 rounded">
                <Image
                  src="/sample-product.jpg"
                  alt="Product"
                  fill
                  className="object-cover rounded"
                />
                <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  1
                </span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">
                  [2-WAY] Sleeve Star Pigment Hood Zip-up Smoke Black
                </div>
                <div className="text-xs text-gray-500 mt-1">CPGN STUDIO</div>
              </div>
              <div className="font-semibold">${subtotal}</div>
            </div>

            {/* PRICE BREAKDOWN */}
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

            {/* TOTAL */}
            <div className="flex justify-between text-xl font-bold pt-6 border-t">
              <span>Total</span>
              <span>USD ${total}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}