"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const tabs = ["Overview", "My Orders", "Payment", "Customer Service", "Settings"] as const;
type Tab = (typeof tabs)[number];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-black">
            My Account
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account, orders, and preferences.
          </p>
        </div>

        {/* TAB BAR */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition
                ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-200 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <>
            {/* ACCOUNT SNAPSHOT */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: "Orders", value: "0" },
                { label: "Saved Items", value: "2" },
                { label: "Reviews", value: "0" },
                { label: "Membership", value: "Free" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-[24px] p-5 shadow-sm"
                >
                  <p className="text-sm text-gray-500 mb-1">
                    {item.label}
                  </p>
                  <p className="text-2xl font-semibold text-black">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* RECENTLY VIEWED + SAVED */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-[30px] p-6 shadow-sm md:col-span-2">
                <h2 className="text-lg font-semibold mb-4 text-black">
                  Recently viewed
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-[#ededed] rounded-[20px] h-36 flex items-center justify-center text-gray-500 text-sm"
                    >
                      Product preview
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[30px] p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-black">
                  Saved items
                </h2>

                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-[#ededed] rounded-[16px] h-14 flex items-center justify-center text-gray-500 text-sm"
                    >
                      Saved product
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* STYLECAST PICKS */}
            <div className="bg-white rounded-[30px] p-6 shadow-sm mb-10">
              <h2 className="text-lg font-semibold mb-4 text-black">
                StyleCast picks for you
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-[#ededed] rounded-[20px] h-40 flex items-center justify-center text-gray-500 text-sm"
                  >
                    Recommended
                  </div>
                ))}
              </div>
            </div>

            {/* BRAND CTA */}
            <div className="bg-black text-white rounded-[40px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">
                  Own a brand?
                </h3>
                <p className="text-gray-300">
                  Apply to manage your own storefront on StyleCast.
                </p>
              </div>

              <button
                onClick={() => router.push("/brand-onboarding")}
                className="bg-white text-black px-8 py-4 rounded-[30px] font-medium hover:bg-gray-100 transition"
              >
                Apply as a Brand
              </button>
            </div>
          </>
        )}

        {/* MY ORDERS */}
        {activeTab === "My Orders" && (
          <div className="bg-white rounded-[30px] p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-black">
              My Orders
            </h2>

            <div className="space-y-8">
              {[
                {
                  id: "SC-10231",
                  date: "Jan 2, 2026",
                  status: "Delivered",
                  name: "Minimal Wool Coat",
                  brand: "Studio Archive",
                  price: "$420",
                  image: "/order-1.jpg",
                },
                {
                  id: "SC-10218",
                  date: "Dec 21, 2025",
                  status: "Shipped",
                  name: "Leather Shoulder Bag",
                  brand: "Élan Form",
                  price: "$310",
                  image: "/order-2.jpg",
                },
                {
                  id: "SC-10194",
                  date: "Dec 5, 2025",
                  status: "Processing",
                  name: "Tailored Black Trousers",
                  brand: "Noir Atelier",
                  price: "$260",
                  image: "/order-3.jpg",
                },
              ].map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-[24px] p-6"
                >
                  <div className="flex justify-between items-center mb-5">
                    <div className="text-sm text-gray-500">
                      Order #{order.id} · {order.date}
                    </div>
                    <div className="text-sm font-medium text-black">
                      {order.status}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-24 h-28 rounded-[16px] overflow-hidden bg-gray-100">
                      <img
                        src={order.image}
                        alt={order.name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-lg font-medium text-black">
                        {order.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.brand}
                      </p>
                    </div>

                    <p className="text-lg font-semibold text-black">
                      {order.price}
                    </p>
                  </div>

                  <div className="mt-5 text-sm">
                    <button className="underline text-black">
                      View order details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAYMENT */}
        {activeTab === "Payment" && (
          <div className="space-y-8">
            <div className="bg-white rounded-[30px] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-black">
                  Payment Methods
                </h2>
                <button className="text-sm underline text-gray-700 hover:text-black transition">
                  Add new payment method
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-[28px] p-6 bg-gradient-to-br from-black to-neutral-800 text-white">
                  <p className="text-sm opacity-80 mb-4">Default</p>
                  <div className="flex justify-between mb-6">
                    <p className="text-lg font-medium">Visa</p>
                    <p className="text-sm opacity-80">•••• 4242</p>
                  </div>
                  <div className="flex justify-between text-sm opacity-80">
                    <p>Expires 08 / 27</p>
                    <p>Taehee Eum</p>
                  </div>
                </div>

                <div className="rounded-[28px] p-6 bg-[#f0f0f0] text-black">
                  <div className="flex justify-between mb-6">
                    <p className="text-lg font-medium">Mastercard</p>
                    <p className="text-sm text-gray-500">•••• 9910</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <p>Expires 11 / 26</p>
                    <p>Taehee Eum</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[30px] p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-black">
                Billing History
              </h2>

              {[
                { date: "Jan 2, 2026", item: "Minimal Wool Coat", amount: "$420" },
                { date: "Dec 21, 2025", item: "Leather Shoulder Bag", amount: "$310" },
                { date: "Dec 5, 2025", item: "Tailored Black Trousers", amount: "$260" },
              ].map((bill, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b pb-4 last:border-none"
                >
                  <div>
                    <p className="text-sm text-gray-500">{bill.date}</p>
                    <p className="text-black font-medium">{bill.item}</p>
                  </div>
                  <p className="text-black font-medium">{bill.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}

{/* CUSTOMER SERVICE */}
{activeTab === "Customer Service" && (
  <div className="space-y-8">

    {/* QUICK HELP */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-black mb-6">
        Customer Service
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Track an order",
            desc: "Check delivery status and shipping updates.",
          },
          {
            title: "Returns & refunds",
            desc: "Start a return or view refund status.",
          },
          {
            title: "Payment issues",
            desc: "Problems with payment or billing.",
          },
          {
            title: "Account support",
            desc: "Help with login, email, or security.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="border border-gray-200 rounded-[24px] p-6 hover:bg-gray-50 transition cursor-pointer"
          >
            <p className="text-lg font-medium text-black mb-1">
              {item.title}
            </p>
            <p className="text-sm text-gray-500">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* CONTACT SUPPORT */}
    <div className="bg-black text-white rounded-[30px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Need more help?
        </h3>
        <p className="text-gray-300">
          Our support team is here to help you.
        </p>
      </div>

      <button className="bg-white text-black px-8 py-4 rounded-[30px] font-medium hover:bg-gray-100 transition">
        Contact Support
      </button>
    </div>

    {/* FAQ */}
<div className="bg-white rounded-[30px] p-8 shadow-sm">
  <h2 className="text-xl font-semibold mb-6 text-black">
    FAQ
  </h2>

  <div className="space-y-4">
    {[
      {
        q: "How long does shipping take?",
        a: "Shipping times vary by brand and location. Most orders are delivered within 3–7 business days. You can view the estimated delivery date on your order page.",
      },
      {
        q: "What is your return policy?",
        a: "Most items can be returned within 14 days of delivery, provided they are unworn and in original condition. Return eligibility may vary by brand.",
      },
      {
        q: "How do refunds work?",
        a: "Once your return is approved and received, refunds are issued to your original payment method within 5–10 business days.",
      },
      {
        q: "How can I change my order?",
        a: "Orders can only be changed before they are processed or shipped. Please contact customer support as soon as possible after placing your order.",
      },
    ].map((item, index) => (
      <FAQItem key={index} question={item.q} answer={item.a} />
    ))}
  </div>
</div>

  </div>
)}






        {/* SETTINGS */}
{activeTab === "Settings" && (
  <div className="space-y-10">

    {/* ACCOUNT INFO */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-black mb-6">
        Account
      </h2>

      <div className="space-y-5 max-w-xl">
        <div>
          <label className="text-sm text-gray-500">Full name</label>
          <p className="text-black font-medium mt-1">
            Taehee Eum
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>
          <p className="text-black font-medium mt-1">
            taehee@email.com
          </p>
        </div>

        <div className="flex gap-4 pt-2">
          <button className="underline text-black text-sm">
            Change password
          </button>
          <span className="text-gray-300">|</span>
          <p className="text-sm text-gray-500">
            Signed in with Email
          </p>
        </div>
      </div>
    </div>

    {/* NOTIFICATIONS */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-black mb-6">
        Notifications
      </h2>

      <div className="space-y-6 max-w-xl">
        {[
          "Order updates",
          "Promotions and sales",
          "New brand drops",
          "Email notifications",
        ].map((label) => (
          <div
            key={label}
            className="flex items-center justify-between"
          >
            <p className="text-black">{label}</p>

            {/* SWITCH */}
            <button
              className="w-12 h-7 rounded-full bg-black relative transition"
            >
              <span className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full" />
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* PREFERENCES */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-black">
        Preferences
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LANGUAGE */}
<div>
  <p className="text-sm text-gray-500 mb-2">Language</p>

  <select
    className="w-full bg-[#f1f1f1] rounded-[16px] px-4 py-3 text-black"
    defaultValue="en"
  >
    {/* Most used */}
    <option value="en">English</option>
    <option value="es">Spanish</option>
    <option value="fr">French</option>
    <option value="de">German</option>


    {/* Other languages */}
    <option value="ko">Korean</option>
    <option value="ja">Japanese</option>
    <option value="zh">Chinese (Simplified)</option>
  </select>
</div>


       {/* CURRENCY */}
<div>
  <p className="text-sm text-gray-500 mb-2">Currency</p>

  <select
    className="w-full bg-[#f1f1f1] rounded-[16px] px-4 py-3 text-black"
    defaultValue="USD"
  >
    {/* Most used */}
    <option value="USD">USD ($)</option>
    <option value="EUR">EUR (€)</option>
    <option value="GBP">GBP (£)</option>
    <option value="JPY">JPY (¥)</option>


    {/* Other currencies */}
    <option value="CAD">CAD ($)</option>
    <option value="KRW">KRW (₩)</option>
    <option value="CNY">CNY (¥)</option>
  </select>
</div>


        {/* MARKETING PREFERENCES */}
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Marketing preferences
          </p>

          <label className="flex items-center justify-between bg-[#f1f1f1] rounded-[16px] px-4 py-3">
            <span className="text-black">
              Personalized recommendations
            </span>

            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-black"
            />
          </label>
        </div>

    

      </div>
    </div>

    {/* SECURITY */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-black">
        Security
      </h2>

      <div className="flex flex-col gap-4">
        <button className="text-left text-black underline">
          Log out
        </button>

        <button className="text-left text-red-600 underline">
          Delete account
        </button>
      </div>
    </div>

  </div>
)}

      </div>
    </main>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-gray-200 rounded-[20px] px-6 py-4 cursor-pointer transition hover:bg-gray-50"
      onClick={() => setOpen(!open)}
    >
      <p className="text-black font-medium">
        {question}
      </p>

      {open && (
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}
