"use client";

import { useRouter } from "next/navigation";

export default function ProductAnalyticsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-black">
              Product performance
            </h1>
            <p className="text-gray-600 mt-2">
              Revenue and sales breakdown by product
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="text-sm underline text-black"
          >
            Back to analytics
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[32px] shadow-sm overflow-hidden">

          <table className="w-full text-left">
            <thead className="bg-[#fafafa] border-b">
              <tr className="text-sm text-gray-500">
                <th className="px-8 py-5">Product</th>
                <th className="px-8 py-5">Orders</th>
                <th className="px-8 py-5">Revenue</th>
                <th className="px-8 py-5">Conversion</th>
                <th className="px-8 py-5">Trend</th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  name: "Minimal Wool Coat",
                  orders: 74,
                  revenue: "$18,420",
                  conversion: "3.4%",
                  trend: "+18%",
                  image: "/product-1.jpg",
                },
                {
                  name: "Leather Shoulder Bag",
                  orders: 48,
                  revenue: "$14,880",
                  conversion: "2.8%",
                  trend: "+9%",
                  image: "/product-2.jpg",
                },
                {
                  name: "Tailored Black Trousers",
                  orders: 37,
                  revenue: "$9,620",
                  conversion: "2.1%",
                  trend: "-4%",
                  image: "/product-3.jpg",
                },
              ].map((product) => (
                <tr
                  key={product.name}
                  className="border-b last:border-none hover:bg-[#fafafa] transition"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-20 rounded-[14px] bg-gray-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium text-black">
                        {product.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-8 py-6 text-black">
                    {product.orders}
                  </td>

                  <td className="px-8 py-6 text-black font-medium">
                    {product.revenue}
                  </td>

                  <td className="px-8 py-6 text-gray-600">
                    {product.conversion}
                  </td>

                  <td
                    className={`px-8 py-6 font-medium ${
                      product.trend.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </main>
  );
}
