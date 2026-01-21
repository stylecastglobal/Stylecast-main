"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


const tabs = [
  "Overview",
  "Products",
  "Orders",
  "Brand Page",
  "Analytics",
  "Payouts",
  "Settings",
] as const;


type Tab = (typeof tabs)[number];

export default function BrandAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-black">
              Brand Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your brand, products, and storefront.
            </p>
          </div>

          <button
            onClick={() => router.push("/brand/demo")}
            className="bg-black text-white px-6 py-3 rounded-[30px] text-sm font-medium hover:bg-neutral-900 transition"
          >
            View public page
          </button>
        </div>

        {/* TAB BAR */}
<div className="flex gap-2 mb-10 flex-wrap">
  {tabs.map((tab) => (
    <button
      key={tab}
      onClick={() => {
        if (tab === "Products") {
          router.push("/brand-admin/products");
        } else {
          setActiveTab(tab);
        }
      }}
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
  <div className="space-y-10">

    {/* BRAND STATUS */}
    <div className="bg-white rounded-[30px] p-6 shadow-sm border-l-4 border-green-500">
      <p className="text-sm text-gray-500 mb-1">Brand status</p>
      <p className="text-lg font-semibold text-black">Live</p>
      <p className="text-sm text-gray-600 mt-1">
        Your brand page is visible to customers.
      </p>
    </div>

    {/* PERFORMANCE SNAPSHOT */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "Visits", value: "1,240" },
        { label: "Orders", value: "32" },
        { label: "Revenue", value: "$8,420" },
        { label: "Conversion", value: "2.6%" },
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

    {/* TOP PERFORMING PRODUCT */}
<div className="bg-white rounded-[30px] p-8 shadow-sm">
  <h2 className="text-xl font-semibold text-black mb-6">
    Top performing product
  </h2>

  <div className="flex flex-col md:flex-row gap-6 items-center">

    {/* PRODUCT IMAGE */}
    <div className="w-32 h-40 rounded-[20px] overflow-hidden bg-gray-100 flex-shrink-0">
      <img
        src="/top-product.jpg"
        alt="Top product"
        className="w-full h-full object-cover"
      />
    </div>

    {/* PRODUCT INFO */}
    <div className="flex-1 w-full">
      <p className="text-lg font-medium text-black">
        Minimal Wool Coat
      </p>
      <p className="text-sm text-gray-500 mb-3">
        Studio Archive
      </p>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="bg-[#f5f5f5] rounded-full px-4 py-2 text-black">
          Price: $420
        </div>
        <div className="bg-[#f5f5f5] rounded-full px-4 py-2 text-black">
          18 sold (last 7 days)
        </div>
        <div className="bg-[#eaf7f0] text-green-700 rounded-full px-4 py-2">
          +32% week over week
        </div>
      </div>
    </div>

    {/* ACTIONS */}
    <div className="flex flex-col gap-3 w-full md:w-auto">
      <button className="bg-black text-white px-6 py-3 rounded-[30px] text-sm font-medium hover:bg-neutral-900 transition">
        View product
      </button>
      <button className="underline text-sm text-black">
        Edit product
      </button>
    </div>

  </div>
</div>


    {/* PRODUCT HEALTH */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-black mb-6">
        Product health
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Live products", value: "18" },
          { label: "Drafts", value: "4" },
          { label: "Low stock", value: "2" },
          { label: "Needs attention", value: "1" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-[#f5f5f5] rounded-[20px] p-5"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-xl font-semibold text-black mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* ORDERS OVERVIEW */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-black mb-6">
        Orders
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Processing", value: "3" },
          { label: "Shipped today", value: "1" },
          { label: "Last order", value: "2 hours ago" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-[#f5f5f5] rounded-[20px] p-5"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-lg font-medium text-black mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* BRAND PAGE READINESS */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-black mb-6">
        Brand page readiness
      </h2>

      <ul className="space-y-3">
        {[
          { label: "Logo uploaded", done: true },
          { label: "Cover image", done: true },
          { label: "Brand description", done: true },
          { label: "Story section", done: false },
          { label: "Featured products", done: false },
        ].map((item) => (
          <li key={item.label} className="flex items-center gap-3">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                item.done ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            <span className="text-black">{item.label}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setActiveTab("Brand Page")}
        className="mt-6 underline text-black text-sm"
      >
        Edit brand page
      </button>
    </div>

    {/* NEXT STEPS */}
    <div className="bg-black text-white rounded-[40px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">
          Next steps
        </h3>
        <p className="text-gray-300 text-sm">
          Complete your setup to improve conversions.
        </p>
      </div>

      <ul className="text-sm space-y-2">
        <li>• Add featured products</li>
        <li>• Complete brand story section</li>
        <li>• Review pending orders</li>
      </ul>
    </div>

  </div>
)}


        {/* PLACEHOLDERS */}
{/* PRODUCTS - Products 탭 삭제, 버튼에서 직접 리다이렉트 처리 */}

{/* ORDERS */}
{activeTab === "Orders" && (
  <div className="space-y-10">

    {/* ORDERS SUMMARY */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "Processing", value: "3" },
        { label: "Shipped", value: "5" },
        { label: "Completed", value: "24" },
        { label: "Refunded", value: "0" },
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

    {/* FILTER BAR */}
    <div className="flex gap-3 flex-wrap">
      {["All", "Processing", "Shipped", "Completed", "Cancelled"].map(
        (filter, i) => (
          <button
            key={filter}
            className={`px-5 py-2 rounded-full text-sm font-medium transition
              ${
                i === 0
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-200 hover:bg-gray-100"
              }`}
          >
            {filter}
          </button>
        )
      )}
    </div>

    {/* ORDERS TABLE */}
    <div className="bg-white rounded-[32px] shadow-sm overflow-hidden">

      <table className="w-full text-left">
        <thead className="bg-[#fafafa] border-b">
          <tr className="text-sm text-gray-500">
            <th className="px-8 py-5">Order</th>
            <th className="px-8 py-5">Customer</th>
            <th className="px-8 py-5">Product</th>
            <th className="px-8 py-5">Total</th>
            <th className="px-8 py-5">Status</th>
            <th className="px-8 py-5">Date</th>
            <th className="px-8 py-5 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {[
            {
              id: "SC-20341",
              customer: "Emma Wilson",
              product: "Minimal Wool Coat",
              total: "$420",
              status: "Processing",
              date: "Jan 6, 2026",
            },
            {
              id: "SC-20318",
              customer: "Daniel Kim",
              product: "Leather Shoulder Bag",
              total: "$310",
              status: "Shipped",
              date: "Jan 4, 2026",
            },
            {
              id: "SC-20294",
              customer: "Sophie Martin",
              product: "Tailored Black Trousers",
              total: "$260",
              status: "Completed",
              date: "Dec 29, 2025",
            },
          ].map((order) => (
            <tr
              key={order.id}
              className="border-b last:border-none hover:bg-[#fafafa] transition"
            >
              <td className="px-8 py-6 font-medium text-black">
                {order.id}
              </td>

              <td className="px-8 py-6 text-black">
                {order.customer}
              </td>

              <td className="px-8 py-6 text-gray-600">
                {order.product}
              </td>

              <td className="px-8 py-6 text-black">
                {order.total}
              </td>

              <td className="px-8 py-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {order.status}
                </span>
              </td>

              <td className="px-8 py-6 text-gray-500 text-sm">
                {order.date}
              </td>

              <td className="px-8 py-6 text-right">
                <button className="text-sm underline text-black">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>
)}

{/* BRAND PAGE */}
{activeTab === "Brand Page" && (
  <div className="space-y-10">

    {/* HEADER */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <p className="text-sm text-gray-500 mb-1">
          Storefront status
        </p>
        <p className="text-lg font-semibold text-black">
          Live
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Your storefront is visible to customers.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => router.push("/brand/demo")}
          className="bg-white border border-gray-300 text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition"
        >
          View public page
        </button>

        <button
          onClick={() => router.push("/brand-admin/storefront")}
          className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-900 transition"
        >
          Open Storefront
        </button>
      </div>
    </div>

    {/* BRAND INFORMATION */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-black mb-6">
        Brand information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-sm text-gray-600 mb-2 block">
            Brand name
          </label>
          <input
            defaultValue="Studio Archive"
            className="w-full border border-gray-300 rounded-[16px] px-4 py-3 focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">
            Support email
          </label>
          <input
            defaultValue="support@studioarchive.com"
            className="w-full border border-gray-300 rounded-[16px] px-4 py-3 focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600 mb-2 block">
          Brand description
        </label>
        <textarea
          rows={4}
          defaultValue="Modern essentials crafted with precision and purpose."
          className="w-full border border-gray-300 rounded-[16px] px-4 py-3 resize-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>

    {/* SEO */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-black mb-2">
        Search engine optimization
      </h2>

      <p className="text-sm text-gray-500 mb-8 max-w-2xl">
        Control how your brand appears in search results.
      </p>

      {/* SEO PREVIEW */}
      <div className="border rounded-[20px] p-5 mb-6">
        <p className="text-blue-700 text-sm font-medium">
          Studio Archive – Modern Essentials
        </p>
        <p className="text-green-700 text-xs mt-1">
          https://stylecast.com/brand/studio-archive
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Modern essentials crafted with precision and purpose.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        <div>
          <label className="text-sm text-gray-600 mb-2 block">
            SEO title
          </label>
          <input
            className="w-full border border-gray-300 rounded-[16px] px-4 py-3 focus:ring-2 focus:ring-black"
            placeholder="Studio Archive – Modern Essentials"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">
            URL handle
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              stylecast.com/brand/
            </span>
            <input
              className="flex-1 border border-gray-300 rounded-[16px] px-4 py-3 focus:ring-2 focus:ring-black"
              placeholder="studio-archive"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-600 mb-2 block">
            Meta description
          </label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded-[16px] px-4 py-3 resize-none focus:ring-2 focus:ring-black"
            placeholder="Discover modern essentials crafted with precision and purpose."
          />
        </div>
      </div>
    </div>

  </div>
)}





{/* ANALYTICS */}
{activeTab === "Analytics" && (
  <div className="space-y-10">

    {/* DATE RANGE */}
    <div className="bg-white rounded-[30px] p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-black">
          Analytics
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Understand how customers interact with your brand.
        </p>
      </div>

      <select className="bg-[#f1f1f1] rounded-[16px] px-4 py-3 text-sm text-black">
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Last 90 days</option>
        <option>Year to date</option>
      </select>
    </div>

    {/* KPI SNAPSHOT */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "Total visits", value: "8,421", sub: "+12% vs last period" },
        { label: "Orders", value: "214", sub: "+8%" },
        { label: "Revenue", value: "$54,230", sub: "+15%" },
        { label: "Conversion rate", value: "2.54%", sub: "+0.3%" },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-[24px] p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="text-2xl font-semibold text-black mt-1">
            {item.value}
          </p>
          <p className="text-sm text-green-600 mt-1">
            {item.sub}
          </p>
        </div>
      ))}
    </div>

    {/* REVENUE TREND */}
<div className="bg-white rounded-[30px] p-8 shadow-sm">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-lg font-semibold text-black">
        Revenue trend
      </h3>
      <p className="text-sm text-gray-500">
        Daily revenue over selected period
      </p>
    </div>

    <p className="text-sm text-green-600">
      +15% compared to previous period
    </p>
  </div>

  {/* GRAPH PLACEHOLDER */}
  <div className="relative h-56 w-full">
    <div className="absolute inset-0 flex items-end gap-3">

      {[
        40, 55, 48, 70, 65, 80, 92,
        88, 76, 84, 96, 110
      ].map((value, i) => (
        <div
          key={i}
          className="flex-1 flex items-end"
        >
          <div
            className="w-full rounded-t-[8px] bg-black/80"
            style={{ height: `${value}%` }}
          />
        </div>
      ))}

    </div>

    {/* BASELINE */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
  </div>

  {/* AXIS LABELS */}
  <div className="flex justify-between text-xs text-gray-400 mt-4">
    <span>Week 1</span>
    <span>Week 2</span>
    <span>Week 3</span>
    <span>Week 4</span>
  </div>
</div>




    {/* TRAFFIC + SALES */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="bg-white rounded-[30px] p-8 shadow-sm">
        <h3 className="text-lg font-semibold text-black mb-4">
          Traffic overview
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Direct</span>
            <span className="text-black">42%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Search</span>
            <span className="text-black">31%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Social</span>
            <span className="text-black">19%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Referral</span>
            <span className="text-black">8%</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[30px] p-8 shadow-sm">
        <h3 className="text-lg font-semibold text-black mb-4">
          Revenue breakdown
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Top product</span>
            <span className="text-black">$18,420</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Returning customers</span>
            <span className="text-black">38%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Average order value</span>
            <span className="text-black">$253</span>
          </div>
        </div>
      </div>

    </div>

    {/* TOP PRODUCTS */}
<div className="bg-white rounded-[30px] p-8 shadow-sm">
  {/* HEADER */}
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-lg font-semibold text-black">
      Top selling products
    </h3>

    <button
      onClick={() => router.push("/brand-admin/analytics/products")}
      className="text-sm underline text-gray-600 hover:text-black transition"
    >
      View all
    </button>
  </div>

  {/* LIST */}
  <div className="space-y-4">
    {[
      {
        name: "Minimal Wool Coat",
        revenue: "$18,420",
        orders: "74 orders",
      },
      {
        name: "Leather Shoulder Bag",
        revenue: "$14,880",
        orders: "48 orders",
      },
      {
        name: "Tailored Black Trousers",
        revenue: "$9,620",
        orders: "37 orders",
      },
    ].map((item) => (
      <div
        key={item.name}
        className="flex items-center justify-between bg-[#f5f5f5] rounded-[20px] px-6 py-4"
      >
        <div>
          <p className="text-black font-medium">
            {item.name}
          </p>
          <p className="text-sm text-gray-500">
            {item.orders}
          </p>
        </div>

        <p className="text-black font-semibold">
          {item.revenue}
        </p>
      </div>
    ))}
  </div>
</div>


    {/* CUSTOMER INSIGHTS */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h3 className="text-lg font-semibold text-black mb-6">
        Customer insights
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "New customers", value: "62%" },
          { label: "Returning", value: "38%" },
          { label: "Avg. time on page", value: "3m 14s" },
          { label: "Bounce rate", value: "41%" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-[#f5f5f5] rounded-[20px] p-5"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-lg font-semibold text-black mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* INSIGHTS + ACTION */}
    <div className="bg-black text-white rounded-[40px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">
          Actionable insights
        </h3>
        <p className="text-gray-300 text-sm">
          Improve performance based on your data.
        </p>
      </div>

      <ul className="text-sm space-y-2">
        <li>• Promote top product on brand page</li>
        <li>• Optimize mobile conversion flow</li>
        <li>• Increase featured product visibility</li>
      </ul>
    </div>

  </div>
)}


{activeTab === "Settings" && (
  <div className="space-y-10">

    {/* BRAND INFO */}
<div className="bg-white rounded-[30px] p-8 shadow-sm">
  <h2 className="text-2xl font-semibold text-black mb-2">
    Brand information
  </h2>

  <p className="text-sm text-gray-500 mb-8 max-w-2xl">
    This information is displayed on your public brand page and used for
    customer support communications.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
    <div>
      <label className="text-sm text-gray-600">Brand name</label>
      <input
        className="mt-2 w-full rounded-[16px] px-4 py-3 bg-[#f5f5f5] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Studio Archive"
      />
    </div>

    <div>
      <label className="text-sm text-gray-600">Support email</label>
      <input
        type="email"
        className="mt-2 w-full rounded-[16px] px-4 py-3 bg-[#f5f5f5] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="support@studioarchive.com"
      />
    </div>

    <div className="md:col-span-2">
      <label className="text-sm text-gray-600">Brand description</label>
      <textarea
        rows={4}
        className="mt-2 w-full rounded-[16px] px-4 py-3 bg-[#f5f5f5] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Modern essentials crafted with precision and purpose."
      />
    </div>
  </div>

  {/* ACTION BAR */}
  <div className="mt-8 flex items-center justify-between max-w-3xl">
    <p className="text-xs text-gray-500">
      Remember to save your changes before leaving this page.
    </p>

    <button className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-neutral-900 transition">
      Save changes
    </button>
  </div>
</div>


    {/* ORDER NOTIFICATIONS */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-black mb-6">
        Order notifications
      </h2>

      <div className="space-y-6 max-w-2xl">

        {[
          "New order placed",
          "Order cancelled",
          "Order shipped",
          "Refund requested",
        ].map((label) => (
          <div
            key={label}
            className="flex items-center justify-between"
          >
            <p className="text-black">{label}</p>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" defaultChecked className="accent-black" />
                Email
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-black" />
                Push
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-black" />
                Dashboard
              </label>
            </div>
          </div>
        ))}

      </div>
    </div>

    {/* PAYOUT & FINANCE */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-black mb-6">
        Payout & finance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        <div>
          <label className="text-sm text-gray-500">Payout frequency</label>
          <select className="mt-2 w-full bg-[#f5f5f5] rounded-[16px] px-4 py-3">
            <option>Weekly</option>
            <option>Bi-weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-500">Default currency</label>
          <select className="mt-2 w-full bg-[#f5f5f5] rounded-[16px] px-4 py-3">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
          </select>
        </div>
      </div>
    </div>

    {/* TEAM & ACCESS */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-black mb-6">
        Team & access
      </h2>

      <div className="space-y-4 max-w-3xl">
        {[
          { name: "Taehee Eum", role: "Owner" },
          { name: "Operations Manager", role: "Admin" },
        ].map((user) => (
          <div
            key={user.name}
            className="flex justify-between items-center bg-[#f5f5f5] rounded-[16px] px-5 py-4"
          >
            <div>
              <p className="text-black font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>

            <button className="text-sm underline text-black">
              Manage
            </button>
          </div>
        ))}

        <button className="underline text-sm text-black mt-2">
          Invite team member
        </button>
      </div>
    </div>

    {/* SECURITY */}
    <div className="bg-white rounded-[30px] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-black mb-6">
        Security
      </h2>

      <div className="space-y-4">
        <button className="underline text-black text-left">
          Change password
        </button>

        <button className="underline text-black text-left">
          Enable two-factor authentication
        </button>

        <button className="underline text-red-600 text-left">
          Remove brand from StyleCast
        </button>
      </div>
    </div>





{/* PAYOUT & FINANCE */}
<div className="bg-white rounded-[30px] p-8 shadow-sm">
  <h2 className="text-2xl font-semibold text-black mb-2">
    Payout & finance
  </h2>

  <p className="text-sm text-gray-600 mb-8 max-w-2xl">
    Your payout details will be reviewed and approved by the StyleCast team
    before payouts are enabled. Changes may take up to 1–2 business days to
    verify.
  </p>

  {/* PAYOUT SETTINGS */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mb-10">

    {/* PAYOUT FREQUENCY */}
    <div>
      <label className="text-sm text-gray-700 block mb-2">
        Payout frequency
      </label>

      <select
        className="
          w-full
          rounded-[16px]
          px-4 py-3
          bg-white
          border border-gray-300
          text-black
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "
        defaultValue="Weekly"
      >
        <option value="Weekly">Weekly</option>
        <option value="Bi-weekly">Bi-weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
    </div>

    {/* DEFAULT CURRENCY */}
    <div>
      <label className="text-sm text-gray-700 block mb-2">
        Default currency
      </label>

      <select
        className="
          w-full
          rounded-[16px]
          px-4 py-3
          bg-white
          border border-gray-300
          text-black
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "
        defaultValue="USD"
      >
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
        <option value="KRW">KRW (₩)</option>
      </select>
    </div>
  </div>

  {/* BANK INFORMATION */}
  <h3 className="text-lg font-semibold text-black mb-4">
    Bank information
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
    <div>
      <label className="text-sm text-gray-600">Account holder name</label>
      <input
        className="mt-2 w-full rounded-[16px] px-4 py-3 bg-[#f5f5f5] text-black placeholder-gray-400"
        placeholder="Studio Archive Inc."
      />
    </div>

    <div>
      <label className="text-sm text-gray-600">Bank name</label>
      <input
        className="mt-2 w-full rounded-[16px] px-4 py-3 bg-[#f5f5f5] text-black placeholder-gray-400"
        placeholder="Chase Bank"
      />
    </div>

    <div>
      <label className="text-sm text-gray-600">Account number</label>
      <input
        type="password"
        className="mt-2 w-full rounded-[16px] px-4 py-3 bg-[#f5f5f5] text-black placeholder-gray-400"
        placeholder="••••••••••"
      />
    </div>

    <div>
      <label className="text-sm text-gray-600">
        Routing / SWIFT / IBAN
      </label>
      <input
        className="mt-2 w-full rounded-[16px] px-4 py-3 bg-[#f5f5f5] text-black placeholder-gray-400"
        placeholder="Routing or SWIFT code"
      />
    </div>
  </div>

  {/* STATUS + ACTION */}
  <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-center gap-3 text-sm">
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
      <span className="text-gray-700">
        Payout details pending approval by StyleCast
      </span>
    </div>

    <button className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-neutral-900 transition">
      Save & submit for approval
    </button>
  </div>

  <p className="text-xs text-gray-500 mt-4 max-w-2xl">
    For security reasons, payouts are disabled until your banking details
    are reviewed and approved by StyleCast. You will be notified once
    verification is complete.
  </p>
</div>
  </div>
)}







{/* PAYOUTS */}
{activeTab === "Payouts" && (
  <div className="space-y-10">

    {/* PAYOUT SUMMARY */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "Total paid", value: "$42,180" },
        { label: "Pending payout", value: "$6,240" },
        { label: "Last payout", value: "Jan 3, 2026" },
        { label: "Next payout", value: "Jan 10, 2026" },
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

    {/* PAYOUT HISTORY */}
    <div className="bg-white rounded-[32px] shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b">
        <h2 className="text-xl font-semibold text-black">
          Payout history
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Record of all completed and pending payouts.
        </p>
      </div>

      <table className="w-full text-left">
        <thead className="bg-[#fafafa] border-b">
          <tr className="text-sm text-gray-500">
            <th className="px-8 py-5">Payout ID</th>
            <th className="px-8 py-5">Period</th>
            <th className="px-8 py-5">Amount</th>
            <th className="px-8 py-5">Status</th>
            <th className="px-8 py-5">Date</th>
            <th className="px-8 py-5 text-right">Invoice</th>
          </tr>
        </thead>

        <tbody>
          {[
            {
              id: "PO-10421",
              period: "Dec 1 – Dec 7, 2025",
              amount: "$8,420",
              status: "Paid",
              date: "Jan 3, 2026",
            },
            {
              id: "PO-10398",
              period: "Nov 24 – Nov 30, 2025",
              amount: "$6,780",
              status: "Paid",
              date: "Dec 27, 2025",
            },
            {
              id: "PO-10456",
              period: "Jan 1 – Jan 7, 2026",
              amount: "$6,240",
              status: "Pending",
              date: "Processing",
            },
          ].map((payout) => (
            <tr
              key={payout.id}
              className="border-b last:border-none hover:bg-[#fafafa] transition"
            >
              <td className="px-8 py-6 font-medium text-black">
                {payout.id}
              </td>

              <td className="px-8 py-6 text-gray-600">
                {payout.period}
              </td>

              <td className="px-8 py-6 text-black">
                {payout.amount}
              </td>

              <td className="px-8 py-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    payout.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {payout.status}
                </span>
              </td>

              <td className="px-8 py-6 text-gray-500 text-sm">
                {payout.date}
              </td>

              <td className="px-8 py-6 text-right">
                <button className="text-sm underline text-black">
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* INFO NOTE */}
    <div className="bg-[#f5f5f5] rounded-[24px] p-6 text-sm text-gray-600 max-w-3xl">
      Payouts are processed according to your selected payout frequency.
      Pending payouts will be released once the payout cycle is complete
      and your bank details are approved by StyleCast.
    </div>

  </div>
)}



      </div>
    </main>
  );
}
