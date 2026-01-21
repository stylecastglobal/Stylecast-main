"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Product interface with all features
interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  status: "Live" | "Draft" | "Out of stock";
  inventory: number;
  updatedAt: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  material?: string;
  care?: string;
  category?: string;
  sku?: string;
  isOnSale?: boolean;
  salePercentage?: number;
  priceHistory?: { date: string; price: string }[];
  detailSections?: {
    id: string;
    type: "image" | "text";
    content: string;
    image?: string;
    title?: string;
  }[];
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimal Wool Coat",
    price: "$420",
    image: "/product-1.jpg",
    status: "Live",
    inventory: 18,
    updatedAt: "2 days ago",
    description: "A timeless wool coat crafted with precision.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Charcoal", "Navy"],
    material: "80% Wool, 20% Polyester",
    care: "Dry clean only",
    category: "Outerwear",
    sku: "WC-001",
    isOnSale: false,
    priceHistory: [
      { date: "2025-12-01", price: "$450" },
      { date: "2026-01-01", price: "$420" },
    ],
  },
  {
    id: "2",
    name: "Leather Shoulder Bag",
    price: "$248",
    originalPrice: "$310",
    image: "/product-2.jpg",
    status: "Live",
    inventory: 7,
    updatedAt: "5 days ago",
    description: "Handcrafted leather shoulder bag.",
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tan"],
    material: "100% Italian Leather",
    care: "Wipe clean with damp cloth",
    category: "Accessories",
    sku: "LB-002",
    isOnSale: true,
    salePercentage: 20,
    priceHistory: [
      { date: "2025-11-01", price: "$310" },
      { date: "2026-01-05", price: "$248" },
    ],
  },
  {
    id: "3",
    name: "Tailored Black Trousers",
    price: "$260",
    image: "/product-3.jpg",
    status: "Draft",
    inventory: 0,
    updatedAt: "1 week ago",
    description: "Perfectly tailored trousers.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Grey"],
    material: "70% Wool, 28% Polyester, 2% Elastane",
    care: "Machine wash cold",
    category: "Bottoms",
    sku: "TR-003",
    isOnSale: false,
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [filter, setFilter] = useState<"All" | "Live" | "Draft" | "Out of stock" | "On Sale">("All");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [viewingPriceHistory, setViewingPriceHistory] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    if (filter === "All") return true;
    if (filter === "On Sale") return p.isOnSale;
    return p.status === filter;
  });

  const handleSaveProduct = (product: Product) => {
    if (isAddingNew) {
      setProducts([...products, { ...product, id: Date.now().toString() }]);
      setIsAddingNew(false);
    } else {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleAddNew = () => {
    const newProduct: Product = {
      id: "",
      name: "",
      price: "$0",
      image: "/placeholder.jpg",
      status: "Draft",
      inventory: 0,
      updatedAt: "Just now",
      description: "",
      sizes: ["S", "M", "L"],
      colors: ["Black"],
      material: "",
      care: "",
      category: "",
      sku: "",
      isOnSale: false,
      priceHistory: [],
    };
    setEditingProduct(newProduct);
    setIsAddingNew(true);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <button
              onClick={() => router.push("/brand-admin")}
              className="text-sm text-gray-500 hover:text-black mb-2"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl md:text-4xl font-semibold text-black">
              Products
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your products and inventory.
            </p>
          </div>

          <button
            onClick={handleAddNew}
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-900 transition"
          >
            Add product
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Products", value: products.length.toString() },
            { label: "Live", value: products.filter(p => p.status === "Live").length.toString() },
            { label: "Draft", value: products.filter(p => p.status === "Draft").length.toString() },
            { label: "On Sale", value: products.filter(p => p.isOnSale).length.toString() },
            { label: "Low Stock", value: products.filter(p => p.inventory > 0 && p.inventory < 10).length.toString() },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-[24px] p-5 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold text-black">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* FILTER BAR */}
        <div className="flex gap-3 flex-wrap mb-8">
          {(["All", "Live", "Draft", "Out of stock", "On Sale"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* PRODUCTS TABLE */}
        <div className="bg-white rounded-[32px] shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#fafafa] border-b">
              <tr className="text-sm text-gray-500">
                <th className="px-8 py-5">Product</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Inventory</th>
                <th className="px-8 py-5">Updated</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
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
                      <div>
                        <p className="font-medium text-black">{product.name}</p>
                        <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                          product.status === "Live"
                            ? "bg-green-100 text-green-700"
                            : product.status === "Draft"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>
                      {product.isOnSale && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 w-fit">
                          {product.salePercentage}% OFF
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-black font-medium">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                      {product.priceHistory && product.priceHistory.length > 0 && (
                        <button
                          onClick={() => setViewingPriceHistory(product)}
                          className="text-xs text-blue-600 hover:underline mt-1"
                        >
                          View history
                        </button>
                      )}
                    </div>
                  </td>

                  <td className="px-8 py-6 text-gray-600">{product.category || "—"}</td>

                  <td className="px-8 py-6">
                    <span
                      className={`${
                        product.inventory === 0
                          ? "text-red-600"
                          : product.inventory < 10
                          ? "text-orange-600"
                          : "text-gray-600"
                      }`}
                    >
                      {product.inventory > 0 ? `${product.inventory} in stock` : "Out of stock"}
                    </span>
                  </td>

                  <td className="px-8 py-6 text-gray-500 text-sm">
                    {product.updatedAt}
                  </td>

                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setIsAddingNew(false);
                      }}
                      className="text-sm underline text-black hover:text-gray-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          isNew={isAddingNew}
          onSave={handleSaveProduct}
          onDelete={() => {
            handleDeleteProduct(editingProduct.id);
            setEditingProduct(null);
          }}
          onClose={() => {
            setEditingProduct(null);
            setIsAddingNew(false);
          }}
        />
      )}
    </main>
  );
}

// PRODUCT EDIT MODAL COMPONENT
function ProductEditModal({
  product,
  isNew,
  onSave,
  onDelete,
  onClose,
}: {
  product: Product;
  isNew: boolean;
  onSave: (product: Product) => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(product);
  const [activeTab, setActiveTab] = useState<"basic" | "details">("basic");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (newPrice: string) => {
    const priceHistory = formData.priceHistory || [];
    if (formData.price !== newPrice) {
      priceHistory.push({
        date: new Date().toISOString().split('T')[0],
        price: formData.price,
      });
    }
    setFormData({ ...formData, price: newPrice, priceHistory });
  };

  const addDetailSection = (type: "image" | "text") => {
    const newSection = {
      id: Date.now().toString(),
      type,
      content: "",
      image: type === "image" ? "" : undefined,
      title: "",
    };
    setFormData({
      ...formData,
      detailSections: [...(formData.detailSections || []), newSection],
    });
  };

  const updateDetailSection = (id: string, updates: Partial<NonNullable<Product["detailSections"]>[0]>) => {
    setFormData({
      ...formData,
      detailSections: formData.detailSections?.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      ),
    });
  };

  const deleteDetailSection = (id: string) => {
    setFormData({
      ...formData,
      detailSections: formData.detailSections?.filter((section) => section.id !== id),
    });
  };

  const handleDetailImageChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateDetailSection(id, { image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full my-8 p-8 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <h2 className="text-2xl font-bold text-black">
            {isNew ? "Add Product" : "Edit Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ×
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 flex-shrink-0">
          <button
            onClick={() => setActiveTab("basic")}
            className={`pb-3 px-4 text-sm font-medium transition ${
              activeTab === "basic"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Basic Info
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`pb-3 px-4 text-sm font-medium transition ${
              activeTab === "details"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Detail Page
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="flex-1 overflow-hidden min-h-0">
          {/* BASIC INFO TAB */}
          {activeTab === "basic" && (
            <div className="h-full overflow-y-auto pr-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT COLUMN */}
                <div className="space-y-6">
                  {/* IMAGE */}
                  <div>
                    <label className="text-sm font-medium text-black block mb-2">
                      Product Image
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-40 rounded-lg bg-gray-100 overflow-hidden">
                        <img
                          src={formData.image}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="cursor-pointer">
                        <span className="px-4 py-2 bg-gray-100 text-black text-sm rounded-lg hover:bg-gray-200 transition inline-block">
                          Change image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* NAME */}
                  <div>
                    <label className="text-sm font-medium text-black block mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Minimal Wool Coat"
                    />
                  </div>

                  {/* SKU & CATEGORY */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-black block mb-2">
                        SKU
                      </label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) =>
                          setFormData({ ...formData, sku: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="WC-001"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-black block mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="">Select category</option>
                        <option value="Outerwear">Outerwear</option>
                        <option value="Tops">Tops</option>
                        <option value="Bottoms">Bottoms</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Shoes">Shoes</option>
                      </select>
                    </div>
                  </div>

                  {/* PRICE & SALE */}
                  <div>
                    <label className="text-sm font-medium text-black block mb-2">
                      Price *
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="$420"
                    />
                  </div>

                  {/* SALE TOGGLE */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="isOnSale"
                      checked={formData.isOnSale}
                      onChange={(e) =>
                        setFormData({ ...formData, isOnSale: e.target.checked })
                      }
                      className="w-5 h-5 accent-black"
                    />
                    <div className="flex-1">
                      <label htmlFor="isOnSale" className="text-sm font-medium text-black cursor-pointer">
                        Put this product on sale
                      </label>
                    </div>
                  </div>

                  {formData.isOnSale && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-black block mb-2">
                          Original Price
                        </label>
                        <input
                          type="text"
                          value={formData.originalPrice || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, originalPrice: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="$500"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-black block mb-2">
                          Sale % OFF
                        </label>
                        <input
                          type="number"
                          value={formData.salePercentage || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, salePercentage: parseInt(e.target.value) || 0 })
                          }
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="20"
                        />
                      </div>
                    </div>
                  )}

                  {/* DESCRIPTION */}
                  <div>
                    <label className="text-sm font-medium text-black block mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      placeholder="Product description..."
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6">
                  {/* STATUS */}
                  <div>
                    <label className="text-sm font-medium text-black block mb-2">
                      Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as Product["status"],
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="Live">Live</option>
                      <option value="Draft">Draft</option>
                      <option value="Out of stock">Out of stock</option>
                    </select>
                  </div>

                  {/* INVENTORY */}
                  <div>
                    <label className="text-sm font-medium text-black block mb-2">
                      Inventory *
                    </label>
                    <input
                      type="number"
                      value={formData.inventory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          inventory: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="18"
                    />
                  </div>

                  {/* SIZES */}
                  <div>
                    <label className="text-sm font-medium text-black block mb-2">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["XXS", "XS", "S", "M", "L", "XL", "XXL", "One Size"].map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            const sizes = formData.sizes || [];
                            if (sizes.includes(size)) {
                              setFormData({
                                ...formData,
                                sizes: sizes.filter((s) => s !== size),
                              });
                            } else {
                              setFormData({ ...formData, sizes: [...sizes, size] });
                            }
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            formData.sizes?.includes(size)
                              ? "bg-black text-white"
                              : "bg-gray-100 text-black hover:bg-gray-200"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* COLORS */}
                  <div>
                    <label className="text-sm font-medium text-black block mb-2">
                      Available Colors
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {["Black", "White", "Grey", "Navy", "Brown", "Beige", "Red", "Green"].map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            const colors = formData.colors || [];
                            if (colors.includes(color)) {
                              setFormData({
                                ...formData,
                                colors: colors.filter((c) => c !== color),
                              });
                            } else {
                              setFormData({ ...formData, colors: [...colors, color] });
                            }
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            formData.colors?.includes(color)
                              ? "bg-black text-white"
                              : "bg-gray-100 text-black hover:bg-gray-200"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>

                    {/* Custom colors added by user */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.colors?.filter(c => !["Black", "White", "Grey", "Navy", "Brown", "Beige", "Red", "Green"].includes(c)).map((customColor) => (
                        <div key={customColor} className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium">
                          {customColor}
                          <button
                            onClick={() => {
                              setFormData({
                                ...formData,
                                colors: formData.colors?.filter((c) => c !== customColor),
                              });
                            }}
                            className="text-white hover:text-gray-300"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add custom color input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="customColorInput"
                        placeholder="Add custom color"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.currentTarget.value.trim()) {
                            const newColor = e.currentTarget.value.trim();
                            const colors = formData.colors || [];
                            if (!colors.includes(newColor)) {
                              setFormData({ ...formData, colors: [...colors, newColor] });
                            }
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById("customColorInput") as HTMLInputElement;
                          const newColor = input.value.trim();
                          if (newColor) {
                            const colors = formData.colors || [];
                            if (!colors.includes(newColor)) {
                              setFormData({ ...formData, colors: [...colors, newColor] });
                            }
                            input.value = "";
                          }
                        }}
                        className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-neutral-900 transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* MATERIAL */}
                  <div>
                    <label className="text-sm font-medium text-black block mb-2">
                      Material
                    </label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) =>
                        setFormData({ ...formData, material: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="80% Wool, 20% Polyester"
                    />
                  </div>

                  {/* CARE */}
                  <div>
                    <label className="text-sm font-medium text-black block mb-2">
                      Care Instructions
                    </label>
                    <input
                      type="text"
                      value={formData.care}
                      onChange={(e) =>
                        setFormData({ ...formData, care: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Dry clean only"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DETAIL PAGE TAB */}
          {activeTab === "details" && (
            <div className="h-full flex flex-col">
              <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
                {/* LEFT: EDITOR */}
<div className="flex flex-col min-h-0">
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex-shrink-0">
    <h3 className="text-xs font-medium text-blue-900 mb-1">💡 Editor Tips:</h3>
    <ul className="text-xs text-blue-800 space-y-0.5">
      <li>• Click "Add Image" to insert pictures</li>
      <li>• Type directly to add text</li>
      <li>• Delete any section with the × button</li>
    </ul>
  </div>

  <div className="flex-1 border-2 border-gray-200 rounded-2xl bg-white overflow-y-auto min-h-0 mb-4">
    <div className="p-6 space-y-6">
      {/* Render all sections */}
      {formData.detailSections && formData.detailSections.length > 0 ? (
        formData.detailSections.map((section, index) => (
          <div key={section.id} className="group relative">
            {/* Delete button */}
            <button
              onClick={() => deleteDetailSection(section.id)}
              className="absolute -right-2 -top-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition z-10 hover:bg-red-600 flex items-center justify-center"
              title="Delete section"
            >
              ×
            </button>

            {/* IMAGE */}
            {section.type === "image" && (
              <div>
                {section.image ? (
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <div className="aspect-[16/9] w-full">
                      <img
                        src={section.image}
                        alt="Content"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label className="absolute bottom-3 right-3 cursor-pointer">
                      <span className="px-3 py-1.5 bg-black/80 text-white text-xs rounded hover:bg-black transition inline-block">
                        Change
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleDetailImageChange(section.id, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div className="aspect-[16/9] border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition flex flex-col items-center justify-center">
                      <div className="text-3xl mb-2">🖼️</div>
                      <p className="text-sm font-medium text-black">Click to upload</p>
                      <p className="text-xs text-gray-500 mt-1">Recommended: 1200×675px</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDetailImageChange(section.id, e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            )}

            {/* TEXT */}
            {section.type === "text" && (
              <div className="space-y-2">
                {/* Title input */}
                <input
                  type="text"
                  value={section.title || ""}
                  onChange={(e) =>
                    updateDetailSection(section.id, { title: e.target.value })
                  }
                  placeholder="Heading (optional)"
                  className="w-full text-lg font-bold text-black placeholder:text-gray-300 border-none outline-none bg-transparent px-0"
                />
                {/* Content textarea */}
                <textarea
                  value={section.content}
                  onChange={(e) => {
                    updateDetailSection(section.id, { content: e.target.value });
                    // Auto-resize
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  placeholder="Start typing..."
                  rows={3}
                  className="w-full text-gray-700 placeholder:text-gray-300 border-none outline-none resize-none bg-transparent px-0 leading-relaxed"
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-sm">Start adding content below</p>
        </div>
      )}
    </div>
  </div>

  {/* ADD BUTTONS - OUTSIDE SCROLL AREA */}
  <div className="flex gap-2 flex-shrink-0">
    <button
      onClick={() => {
        addDetailSection("text");
        // Auto-focus on new text field
        setTimeout(() => {
          const textareas = document.querySelectorAll('textarea');
          const lastTextarea = textareas[textareas.length - 1] as HTMLTextAreaElement;
          if (lastTextarea) lastTextarea.focus();
        }, 100);
      }}
      className="flex-1 py-3 bg-white border-2 border-gray-300 text-black text-sm font-medium rounded-lg hover:border-black hover:bg-gray-50 transition"
    >
      + Add Text
    </button>
    <button
      onClick={() => addDetailSection("image")}
      className="flex-1 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-900 transition"
    >
      + Add Image
    </button>
  </div>
</div>

                {/* RIGHT: LIVE PREVIEW */}
                <div className="flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <h3 className="text-sm font-medium text-gray-700">Live Preview</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Customer view</span>
                  </div>

                  <div className="flex-1 border-2 border-gray-300 rounded-2xl bg-gray-50 overflow-y-auto min-h-0">
                    <div className="bg-white min-h-full">
                      {/* Preview content */}
                      {formData.detailSections && formData.detailSections.length > 0 ? (
                        <div className="space-y-12 py-12">
                          {formData.detailSections.map((section) => (
                            <div key={section.id}>
                              {section.type === "image" && section.image && (
                                <div className="px-8">
                                  <div className="rounded-lg overflow-hidden">
                                    <div className="aspect-[16/9] w-full">
                                      <img
                                        src={section.image}
                                        alt="Product detail"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {section.type === "text" && (section.title || section.content) && (
                                <div className="max-w-3xl mx-auto px-8">
                                  {section.title && (
                                    <h2 className="text-2xl font-bold text-black mb-4">
                                      {section.title}
                                    </h2>
                                  )}
                                  {section.content && (
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                      {section.content}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 py-20">
                          <div className="text-center">
                            <div className="text-5xl mb-3">👀</div>
                            <p className="text-sm">Your content will appear here</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6 flex-shrink-0">
          <button
            onClick={() => onSave(formData)}
            className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-neutral-900 transition"
          >
            {isNew ? "Add Product" : "Save Changes"}
          </button>
          {!isNew && (
            <button
              onClick={onDelete}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
            >
              Delete
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg font-medium hover:border-black transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}