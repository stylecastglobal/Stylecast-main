 "use client";

 import { useMemo, useState } from "react";
 import Image from "next/image";
 import { useParams } from "next/navigation";

 const collections = [
   { slug: "winter-ready-skincare", title: "Winter-Ready Skincare" },
   { slug: "best-sellers", title: "Best Sellers" },
   { slug: "new-arrivals", title: "New Arrivals" },
   { slug: "sun-care", title: "Sun Care" },
   { slug: "facial-cleanser", title: "Facial Cleanser" },
   { slug: "makeup-remover", title: "Makeup Remover" },
   { slug: "toner-pads", title: "Toner Pads" },
   { slug: "serum-ampoule", title: "Serum & Ampoule" },
   { slug: "toner-essence", title: "Toner & Essence" },
   { slug: "face-masks", title: "Face Masks" },
 ];

 const products = [
   {
     id: 1,
     brand: "Dr. Jart+",
     title: "Dermask Clearing Solution Face Mask 5pcs",
     price: 26.99,
     image: "/drop-1.jpg",
     inStock: true,
     actionLabel: "ADD TO CART",
     collections: ["winter-ready-skincare", "best-sellers", "face-masks"],
   },
   {
     id: 2,
     brand: "BCL",
     title: "Saborino Morning Face Mask 32 Sheets",
     price: 16.99,
     image: "/drop-2.jpg",
     inStock: true,
     actionLabel: "ADD TO CART",
     badge: "Buy More Save More",
     collections: ["best-sellers", "face-masks"],
   },
   {
     id: 3,
     brand: "numbuzin",
     title: "No.9 NAD Bio Lifting-sil Full Face Mask",
     price: 7.99,
     image: "/drop-3.jpg",
     inStock: true,
     actionLabel: "CHOOSE OPTIONS",
     badge: "Buy More Save More",
     collections: ["new-arrivals", "face-masks"],
   },
   {
     id: 4,
     brand: "Dr. Althea",
     title: "345 Relief Face Mask 4pc",
     price: 16.99,
     image: "/drop-6.jpg",
     inStock: true,
     actionLabel: "ADD TO CART",
     badge: "NEW",
     collections: ["winter-ready-skincare", "new-arrivals", "face-masks"],
   },
   {
     id: 5,
     brand: "Mediheal",
     title: "Ampoule Mask",
     price: 24.99,
     image: "/drop-7.jpg",
     inStock: true,
     actionLabel: "ADD TO CART",
     collections: ["serum-ampoule", "face-masks"],
   },
   {
     id: 6,
     brand: "Biodance",
     title: "Bio-Collagen Real Deep Mask (Pink)",
     price: 6.99,
     image: "/drop-8.jpg",
     inStock: true,
     actionLabel: "CHOOSE OPTIONS",
     collections: ["face-masks", "best-sellers"],
   },
   {
     id: 7,
     brand: "Etude House",
     title: "House Therapy Air Mask (11 Types)",
     price: 2.99,
     image: "/women-grid-1.jpg",
     inStock: true,
     actionLabel: "CHOOSE OPTIONS",
     badge: "Buy More Save More",
     collections: ["face-masks", "new-arrivals"],
   },
   {
     id: 8,
     brand: "TIRTIR",
     title: "Mask Fit Red Cushion Foundation",
     price: 33.99,
     image: "/women-grid-4.jpg",
     inStock: true,
     actionLabel: "ADD TO CART",
     collections: ["best-sellers", "new-arrivals"],
   },
   {
     id: 9,
     brand: "Medicube",
     title: "Collagen Night Wrapping Mask 75ml",
     price: 40.99,
     image: "/women-grid-5.jpg",
     inStock: true,
     actionLabel: "ADD TO CART",
     collections: ["winter-ready-skincare", "serum-ampoule"],
   },
   {
     id: 10,
     brand: "Beauty of Joseon",
     title: "Centella Asiatica Calming Mask",
     price: 6.99,
     image: "/women-grid-3.jpg",
     inStock: true,
     actionLabel: "CHOOSE OPTIONS",
     collections: ["toner-essence", "best-sellers"],
   },
   {
     id: 11,
     brand: "COSRX",
     title: "Advanced Snail Mucin Mask (2 Sizes)",
     price: 6.99,
     image: "/apparel6.jpg",
     inStock: true,
     actionLabel: "ADD TO CART",
     badge: "Buy More Save More",
     collections: ["serum-ampoule", "face-masks"],
   },
   {
     id: 12,
     brand: "Some By Mi",
     title: "Retinol Intensive Eye Cream",
     price: 32.99,
     image: "/women-printer-1.jpg",
     inStock: true,
     actionLabel: "ADD TO CART",
     collections: ["winter-ready-skincare", "new-arrivals"],
   },
 ];

 const brandFilters = [
   "Abib",
   "Anua",
   "Ariul",
   "AXIS-Y",
   "BCL",
   "Beauty of Joseon",
   "Biodance",
 ];

 const productTypeFilters = [
   "Eye Masks",
   "Facial Cleanser",
   "Foundation & Cushion",
   "Lip Treatment",
   "Modeling Mask",
   "Sheet Mask",
   "Skincare Tool",
 ];

 const skinTypeFilters = [
   "All skin types",
   "Combination",
   "Dry",
   "Oily",
   "Problem",
   "Sensitive",
 ];

 export default function CollectionPage() {
   const params = useParams();
   const slug = typeof params?.slug === "string" ? params.slug : "";
   const [wishlist, setWishlist] = useState<number[]>([]);

   const activeCollection = useMemo(
     () => collections.find((item) => item.slug === slug),
     [slug]
   );

   const filteredProducts = useMemo(() => {
     const matches = products.filter((product) =>
       product.collections.includes(slug)
     );
     return matches.length ? matches : products;
   }, [slug]);

   const toggleWishlist = (id: number) => {
     setWishlist((prev) =>
       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
     );
   };

   return (
     <div className="min-h-screen bg-white text-black">
       <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
         <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4 mb-6">
           <div className="flex items-center gap-6 text-sm text-gray-700">
             <button className="flex items-center gap-2 border border-gray-300 px-3 py-1.5 hover:border-black transition">
               <span className="text-base">⇆</span>
               Hide filters
             </button>
             <span className="text-gray-500">
               {filteredProducts.length} Results
             </span>
           </div>
           <div className="flex items-center gap-4 text-sm text-gray-700">
             <div className="flex items-center gap-2 text-gray-400">
               <span className="text-lg">▦</span>
               <span className="text-lg">▤</span>
             </div>
             <button className="flex items-center gap-2 hover:text-black transition">
               Sort: Relevance <span className="text-xs">▾</span>
             </button>
           </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
           <aside className="space-y-8 text-sm text-gray-700">
             <div className="flex items-center justify-between">
               <span className="font-semibold text-black">In stock only</span>
               <span className="w-10 h-5 bg-gray-200 rounded-full relative">
                 <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-black" />
               </span>
             </div>

             <div>
               <div className="flex items-center justify-between mb-3">
                 <span className="font-semibold text-black">Brand</span>
                 <span className="text-gray-400">⌄</span>
               </div>
               <div className="space-y-2">
                 {brandFilters.map((brand) => (
                   <label
                     key={brand}
                     className="flex items-center gap-2 text-gray-600"
                   >
                     <input type="checkbox" className="accent-black" />
                     {brand}
                   </label>
                 ))}
               </div>
               <button className="mt-3 text-xs text-gray-500 hover:text-black">
                 Show more
               </button>
             </div>

             <div>
               <div className="flex items-center justify-between mb-3">
                 <span className="font-semibold text-black">Product type</span>
                 <span className="text-gray-400">⌄</span>
               </div>
               <div className="space-y-2">
                 {productTypeFilters.map((type) => (
                   <label
                     key={type}
                     className="flex items-center gap-2 text-gray-600"
                   >
                     <input type="checkbox" className="accent-black" />
                     {type}
                   </label>
                 ))}
               </div>
               <button className="mt-3 text-xs text-gray-500 hover:text-black">
                 Show more
               </button>
             </div>

             <div>
               <div className="flex items-center justify-between mb-3">
                 <span className="font-semibold text-black">Skin type</span>
                 <span className="text-gray-400">⌄</span>
               </div>
               <div className="space-y-2">
                 {skinTypeFilters.map((type) => (
                   <label
                     key={type}
                     className="flex items-center gap-2 text-gray-600"
                   >
                     <input type="checkbox" className="accent-black" />
                     {type}
                   </label>
                 ))}
               </div>
               <button className="mt-3 text-xs text-gray-500 hover:text-black">
                 Show more
               </button>
             </div>

             <div>
               <div className="flex items-center justify-between mb-3">
                 <span className="font-semibold text-black">Price</span>
                 <span className="text-gray-400">⌄</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="flex items-center gap-2 border border-gray-300 px-2 py-1">
                   <span className="text-gray-400">$</span>
                   <input
                     type="number"
                     defaultValue={0}
                     className="w-12 text-sm outline-none"
                   />
                 </div>
                 <span className="text-gray-400">to</span>
                 <div className="flex items-center gap-2 border border-gray-300 px-2 py-1">
                   <span className="text-gray-400">$</span>
                   <input
                     type="number"
                     defaultValue={52}
                     className="w-12 text-sm outline-none"
                   />
                 </div>
               </div>
               <div className="mt-3 h-1 bg-gray-200 rounded-full">
                 <div className="w-1/3 h-1 bg-black rounded-full" />
               </div>
               <p className="mt-2 text-xs text-gray-500">
                 The highest price is $52.99
               </p>
             </div>
           </aside>

           <main>
             <div className="mb-6">
               <p className="text-sm text-gray-500">Shop by Collection</p>
               <h1 className="text-3xl font-semibold text-black">
                 {activeCollection?.title ?? "Collection"}
               </h1>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
               {filteredProducts.map((product) => (
                 <div key={product.id} className="group">
                   <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                     <Image
                       src={product.image}
                       alt={product.title}
                       fill
                       className="object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                     {product.badge && (
                       <span className="absolute top-3 left-3 bg-black text-white text-[10px] uppercase tracking-wide px-2 py-1">
                         {product.badge}
                       </span>
                     )}
                     <button
                       onClick={() => toggleWishlist(product.id)}
                       className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow"
                       aria-label="Toggle wishlist"
                     >
                       {wishlist.includes(product.id) ? "❤️" : "♡"}
                     </button>
                   </div>
                   <div className="mt-3 space-y-1">
                     <p className="text-xs text-gray-500 font-semibold">
                       {product.brand}
                     </p>
                     <p className="text-sm text-gray-800 line-clamp-2">
                       {product.title}
                     </p>
                     <p className="text-sm font-medium">
                       ${product.price.toFixed(2)} CAD
                     </p>
                     {product.inStock && (
                       <p className="text-xs text-green-600">In stock</p>
                     )}
                   </div>
                   <button className="mt-4 w-full border border-gray-300 py-2 text-xs tracking-wide hover:border-black hover:text-black transition">
                     {product.actionLabel}
                   </button>
                 </div>
               ))}
             </div>
           </main>
         </div>
       </section>
     </div>
   );
 }
