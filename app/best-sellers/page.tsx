"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BestSellersPage() {
  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Tab state for category filter
  const [activeTab, setActiveTab] = useState<"all" | "clothing" | "accessories" | "shoes" | "beauty">("all");

  // Flash sale countdown
  const [countdown, setCountdown] = useState({ hours: 6, minutes: 28, seconds: 45 });
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) { seconds = 59; minutes -= 1; }
        if (minutes < 0) { minutes = 59; hours -= 1; }
        if (hours < 0) return { hours: 0, minutes: 0, seconds: 0 };
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll refs
  const topSellersRef = useRef<HTMLDivElement>(null);
  const topSellersFashionRef = useRef<HTMLDivElement>(null);
  const staffFavRef = useRef<HTMLDivElement>(null);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  // Auto-scroll for horizontal sections
  useEffect(() => {
    const refs = [topSellersRef, topSellersFashionRef];
    const intervals = refs.map((ref) =>
      setInterval(() => {
        const el = ref.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 10) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: 300, behavior: "smooth" });
        }
      }, 4000)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  // ─── DATA ───

  const hero = {
    tag: "MOST LOVED",
    title: "Best Sellers\nof the Season",
    subtitle: "The pieces everyone's adding to their cart — discover what's trending now",
    image: "/apparel-hero23.jpg",
    cta: "Shop Best Sellers",
  };

  const topCategories = [
    { label: "Outerwear", count: "2.4k sold", image: "/fall-3.jpg" },
    { label: "Knitwear", count: "1.8k sold", image: "/apparel-knitsection-hero.jpg" },
    { label: "Denim", count: "1.5k sold", image: "/apparel-finalwinterpicks12.jpg" },
    { label: "Bags & Acc.", count: "1.2k sold", image: "/apparel-finalwinterpicks123.jpg" },
  ];

  const topSellers = [
    { id: 8001, rank: 1, brand: "MUSINSA STANDARD", title: "Cashmere blend oversized coat [oatmeal]", price: 229, salePrice: 172, discount: 24, sold: 4865, rating: 4.8, image: "/wtrending1.jpg" },
    { id: 8002, rank: 2, brand: "SCULPTOR", title: "Logo embroidered hoodie [black]", price: 98, salePrice: 78, discount: 20, sold: 4216, rating: 4.7, image: "/wtrending2.jpg" },
    { id: 8003, rank: 3, brand: "ANDERSSON BELL", title: "Quilted crossbody mini bag [cream]", price: 156, salePrice: 125, discount: 20, sold: 3956, rating: 4.9, image: "/wtrending3.jpg" },
    { id: 8004, rank: 4, brand: "MUAHMUAH", title: "Flower combo hoodie [ivory]", price: 54, salePrice: 24, discount: 55, sold: 3842, rating: 4.6, image: "/wtrending4.jpg" },
    { id: 8005, rank: 5, brand: "PLACE STUDIO", title: "Pleated skirt layered wide pants [charcoal]", price: 51, salePrice: 29, discount: 43, sold: 3654, rating: 4.7, image: "/wtrending5.jpg" },
    { id: 8006, rank: 6, brand: "BADBLOOD", title: "0119 low-rise bootcut jeans [mid blue]", price: 128, salePrice: 115, discount: 10, sold: 3421, rating: 4.5, image: "/wtrending6.jpg" },
    { id: 8007, rank: 7, brand: "LEATHERY", title: "Butter-soft leather jacket [cognac]", price: 348, salePrice: 278, discount: 20, sold: 3198, rating: 4.9, image: "/wtrending7.jpg" },
    { id: 8008, rank: 8, brand: "KIRSH", title: "Cherry logo sweatshirt [cream]", price: 65, salePrice: 52, discount: 20, sold: 2987, rating: 4.6, image: "/pinterest1.jpg" },
  ];

  const topSellersFashion = [
    { id: 12001, rank: 1, brand: "MUSINSA STANDARD WOMAN", title: "Womens cashmere blend oversized trench coat [dark brown]", price: 229, salePrice: 172, discount: 24, sold: 5124, rating: 4.9, image: "/apparel-hero1.jpg" },
    { id: 12002, rank: 2, brand: "SCULPTOR", title: "Washed denim cargo pants [light blue]", price: 148, salePrice: 118, discount: 20, sold: 4738, rating: 4.8, image: "/apparel-hero3.jpg" },
    { id: 12003, rank: 3, brand: "ANDERSSON BELL", title: "Asymmetric knit vest [cream]", price: 195, salePrice: 156, discount: 20, sold: 4215, rating: 4.7, image: "/apparel-hero4.jpg" },
    { id: 12004, rank: 4, brand: "MUAHMUAH", title: "Henley neck stitch long sleeve tee [ivory]", price: 36, salePrice: 23, discount: 36, sold: 3987, rating: 4.6, image: "/apparel-hero5.jpg" },
    { id: 12005, rank: 5, brand: "PLACE STUDIO", title: "Essential soft muffler set off-shoulder knit [cream]", price: 38, salePrice: 25, discount: 34, sold: 3654, rating: 4.7, image: "/apparel-hero6.jpg" },
    { id: 12006, rank: 6, brand: "BADBLOOD", title: "Signature logo hoodie [ash gray]", price: 89, salePrice: 71, discount: 20, sold: 3421, rating: 4.5, image: "/brandsyouwilllove-1.jpg" },
    { id: 12007, rank: 7, brand: "LEATHERY", title: "Cashmere balmacaan robe coat [black]", price: 241, salePrice: 193, discount: 19, sold: 3198, rating: 4.9, image: "/brandsyouwilllove-23.jpg" },
    { id: 12008, rank: 8, brand: "ESCAPEFROM", title: "Strawberry dot logo collage print hoodie [pink]", price: 71, salePrice: 39, discount: 45, sold: 2876, rating: 4.6, image: "/brandsyouwilllove-3.jpg" },
  ];

  const staffFavorites = [
    { id: 9001, brand: "GROVE", title: "Textured knit polo [olive]", price: 89, salePrice: 71, discount: 20, image: "/look5.jpg" },
    { id: 9002, brand: "CHINDOWN", title: "Oversized trench coat [beige]", price: 268, salePrice: 201, discount: 25, image: "/street-1.jpg" },
    { id: 9003, brand: "PARTIMENTO", title: "Washed cotton chino pants [khaki]", price: 95, salePrice: 76, discount: 20, image: "/look1.jpg" },
    { id: 9004, brand: "VIKINI VENDER", title: "Mesh layered tank top [white]", price: 52, salePrice: 42, discount: 19, image: "/look2.jpg" },
    { id: 9005, brand: "STANDARD ERROR", title: "Structured mini bag [black]", price: 128, salePrice: 102, discount: 20, image: "/look3.jpg" },
    { id: 9006, brand: "LEATHERY", title: "Belted leather midi skirt [brown]", price: 218, salePrice: 174, discount: 20, image: "/look4.jpg" },
  ];

  const flashSale = {
    brand: "MUSINSA STANDARD WOMAN",
    title: "Flash Sale: Top-Rated Essentials",
    subtitle: "Our most-reviewed pieces at their lowest prices ever",
    items: [
      { id: 10001, title: "Cashmere blend trench coat [taupe]", price: 211, salePrice: 148, discount: 30, reviews: 2847, image: "/pinterest4.jpg" },
      { id: 10002, title: "Wool blend duffle short coat [navy]", price: 132, salePrice: 86, discount: 35, reviews: 2156, image: "/pinterest5.jpg" },
      { id: 10003, title: "Daily puffer short padding jacket [beige]", price: 62, salePrice: 40, discount: 35, reviews: 1943, image: "/pinterest6.jpg" },
      { id: 10004, title: "Lightweight down quilted vest [black]", price: 89, salePrice: 58, discount: 35, reviews: 1782, image: "/pinterest7.jpg" },
    ],
  };

  const allCategoryItems = [
    // Clothing (18 items)
    { id: 11001, category: "clothing", brand: "SATUR", title: "Ribbed cotton turtleneck [oatmeal]", price: 68, salePrice: 54, discount: 20, sold: 2456, image: "/drop-1.jpg" },
    { id: 11002, category: "clothing", brand: "COLD CULTURE", title: "Structured bomber jacket [navy]", price: 198, salePrice: 158, discount: 20, sold: 2234, image: "/drop-2.jpg" },
    { id: 11004, category: "clothing", brand: "ERA", title: "Relaxed fit linen shirt [white]", price: 75, salePrice: 56, discount: 25, sold: 2098, image: "/drop-6.jpg" },
    { id: 11007, category: "clothing", brand: "DOFFJASON", title: "Washed canvas work jacket [tan]", price: 158, salePrice: 126, discount: 20, sold: 1798, image: "/women-printer-1.jpg" },
    { id: 11009, category: "clothing", brand: "KIIMUIR", title: "Cashmere blend v-neck sweater [gray]", price: 186, salePrice: 149, discount: 20, sold: 1589, image: "/women-grid-1.jpg" },
    { id: 11011, category: "clothing", brand: "NINEZ", title: "Soft mock neck muscle knit [cream]", price: 42, salePrice: 42, discount: 0, sold: 1487, image: "/women-grid-5.jpg" },
    { id: 11013, category: "clothing", brand: "MUAHMUAH", title: "Flower combo hoodie [ivory]", price: 54, salePrice: 24, discount: 55, sold: 1456, image: "/pinterest1.jpg" },
    { id: 11014, category: "clothing", brand: "PLACE STUDIO", title: "Oversized cable knit vest [ivory]", price: 45, salePrice: 29, discount: 36, sold: 1398, image: "/pinterest2.jpg" },
    { id: 11015, category: "clothing", brand: "ESCAPEFROM", title: "Ribbon detail cropped cardigan [cream]", price: 58, salePrice: 35, discount: 40, sold: 1345, image: "/pinterest3.jpg" },
    { id: 11016, category: "clothing", brand: "SCULPTOR", title: "Logo embroidered hoodie [black]", price: 98, salePrice: 78, discount: 20, sold: 1298, image: "/pinterest13.jpg" },
    { id: 11017, category: "clothing", brand: "LEATHERY", title: "Butter-soft leather jacket [cognac]", price: 348, salePrice: 278, discount: 20, sold: 1256, image: "/fall-4.jpg" },
    { id: 11018, category: "clothing", brand: "BADBLOOD", title: "Signature logo hoodie [ash gray]", price: 89, salePrice: 71, discount: 20, sold: 1198, image: "/fall-5.jpg" },
    { id: 11019, category: "clothing", brand: "GROVE", title: "Textured knit polo [olive]", price: 89, salePrice: 71, discount: 20, sold: 1145, image: "/feed-8.jpg" },
    { id: 11020, category: "clothing", brand: "CHINDOWN", title: "Oversized trench coat [beige]", price: 268, salePrice: 201, discount: 25, sold: 1098, image: "/product-8.jpg" },
    { id: 11021, category: "clothing", brand: "PARTIMENTO", title: "Washed cotton chino pants [khaki]", price: 95, salePrice: 76, discount: 20, sold: 1054, image: "/product-9.jpg" },
    { id: 11022, category: "clothing", brand: "VIKINI VENDER", title: "Mesh layered tank top [white]", price: 52, salePrice: 42, discount: 19, sold: 987, image: "/trend-9.jpg" },
    { id: 11023, category: "clothing", brand: "STANDARD ERROR", title: "Structured blazer [charcoal]", price: 178, salePrice: 142, discount: 20, sold: 945, image: "/apparel6.jpg" },
    { id: 11024, category: "clothing", brand: "HUG YOUR SKIN", title: "Round collar fleece jacket [pink gray]", price: 122, salePrice: 122, discount: 0, sold: 912, image: "/wtrending1.jpg" },
    // Accessories (18 items)
    { id: 11003, category: "accessories", brand: "AAKAM", title: "Suede eyelet dumpling bag [camel]", price: 124, salePrice: 106, discount: 14, sold: 2187, image: "/drop-3.jpg" },
    { id: 11006, category: "accessories", brand: "VVV", title: "Buckle strap tote shoulder bag [black]", price: 146, salePrice: 119, discount: 19, sold: 1876, image: "/drop-8.jpg" },
    { id: 11010, category: "accessories", brand: "MATIN KIM", title: "Logo embossed mini bag [ivory]", price: 178, salePrice: 142, discount: 20, sold: 1534, image: "/women-grid-4.jpg" },
    { id: 11025, category: "accessories", brand: "OSTKAKA", title: "Robe shoulder suede bag [dark brown]", price: 288, salePrice: 259, discount: 10, sold: 1423, image: "/wtrending2.jpg" },
    { id: 11026, category: "accessories", brand: "SCULPTOR", title: "Leather buckle belt bag [brown]", price: 98, salePrice: 79, discount: 19, sold: 1387, image: "/wtrending3.jpg" },
    { id: 11027, category: "accessories", brand: "ANDERSSON BELL", title: "Quilted crossbody mini bag [cream]", price: 156, salePrice: 125, discount: 20, sold: 1345, image: "/wtrending4.jpg" },
    { id: 11028, category: "accessories", brand: "KIRSH", title: "Cherry knit muffler [cream]", price: 68, salePrice: 54, discount: 21, sold: 1298, image: "/wtrending5.jpg" },
    { id: 11029, category: "accessories", brand: "SIYAZU", title: "Flow bag [brown]", price: 137, salePrice: 117, discount: 14, sold: 1256, image: "/wtrending6.jpg" },
    { id: 11030, category: "accessories", brand: "RAWROW", title: "Cordura clip messenger bag [olive]", price: 84, salePrice: 75, discount: 10, sold: 1198, image: "/wtrending7.jpg" },
    { id: 11031, category: "accessories", brand: "ATIL STUDIO", title: "Velour suede mini ribbon bag [black]", price: 73, salePrice: 57, discount: 21, sold: 1145, image: "/pinterest4.jpg" },
    { id: 11032, category: "accessories", brand: "MIDNIGHT MOVE", title: "Ey cr beanie [black]", price: 44, salePrice: 36, discount: 18, sold: 1098, image: "/pinterest5.jpg" },
    { id: 11033, category: "accessories", brand: "MUAHMUAH", title: "Stitch logo patch ball cap [cream]", price: 39, salePrice: 9, discount: 76, sold: 1054, image: "/pinterest6.jpg" },
    { id: 11034, category: "accessories", brand: "BADBLOOD", title: "Signature canvas tote [natural]", price: 62, salePrice: 50, discount: 19, sold: 987, image: "/pinterest7.jpg" },
    { id: 11035, category: "accessories", brand: "VVV", title: "Mini crossbody phone bag [black]", price: 78, salePrice: 62, discount: 20, sold: 945, image: "/pinterest10.jpg" },
    { id: 11036, category: "accessories", brand: "AAKAM", title: "Woven leather card wallet [tan]", price: 58, salePrice: 46, discount: 21, sold: 912, image: "/pinterest12.jpg" },
    { id: 11037, category: "accessories", brand: "MATIN KIM", title: "Padded chain shoulder bag [cream]", price: 198, salePrice: 158, discount: 20, sold: 876, image: "/pinterest13.jpg" },
    { id: 11038, category: "accessories", brand: "SIYAZU", title: "Mini leather crossbody [tan]", price: 95, salePrice: 81, discount: 15, sold: 845, image: "/fall-4.jpg" },
    { id: 11039, category: "accessories", brand: "RAWROW", title: "Canvas tote bag large [cream]", price: 62, salePrice: 53, discount: 15, sold: 812, image: "/fall-5.jpg" },
    // Shoes (18 items)
    { id: 11005, category: "shoes", brand: "BLACK PURPLE", title: "Crease wide boots [black]", price: 197, salePrice: 178, discount: 9, sold: 1965, image: "/drop-7.jpg" },
    { id: 11008, category: "shoes", brand: "BLACK PURPLE", title: "Buckle strap ankle boots [brown]", price: 178, salePrice: 152, discount: 15, sold: 1654, image: "/women-grid-2.jpg" },
    { id: 11012, category: "shoes", brand: "RAWROW", title: "Cordura clip sneakers [olive]", price: 84, salePrice: 75, discount: 10, sold: 1423, image: "/women-grid-3.jpg" },
    { id: 11040, category: "shoes", brand: "SCULPTOR", title: "Chunky platform loafers [black]", price: 148, salePrice: 118, discount: 20, sold: 1387, image: "/feed-8.jpg" },
    { id: 11041, category: "shoes", brand: "ANDERSSON BELL", title: "Leather chelsea boots [dark brown]", price: 228, salePrice: 182, discount: 20, sold: 1298, image: "/product-8.jpg" },
    { id: 11042, category: "shoes", brand: "BADBLOOD", title: "Retro running sneakers [gray/white]", price: 118, salePrice: 94, discount: 20, sold: 1198, image: "/product-9.jpg" },
    { id: 11043, category: "shoes", brand: "BLACK PURPLE", title: "Square toe mules [cream]", price: 138, salePrice: 110, discount: 20, sold: 1145, image: "/trend-9.jpg" },
    { id: 11044, category: "shoes", brand: "SCULPTOR", title: "Canvas low-top sneakers [white]", price: 78, salePrice: 62, discount: 20, sold: 1098, image: "/apparel6.jpg" },
    { id: 11045, category: "shoes", brand: "RAWROW", title: "Suede desert boots [sand]", price: 158, salePrice: 126, discount: 20, sold: 1054, image: "/look1.jpg" },
    { id: 11046, category: "shoes", brand: "BLACK PURPLE", title: "Platform mary jane [black]", price: 168, salePrice: 134, discount: 20, sold: 987, image: "/look2.jpg" },
    { id: 11047, category: "shoes", brand: "ANDERSSON BELL", title: "Woven leather sandals [tan]", price: 188, salePrice: 150, discount: 20, sold: 945, image: "/look3.jpg" },
    { id: 11048, category: "shoes", brand: "BADBLOOD", title: "High-top canvas sneakers [black]", price: 98, salePrice: 78, discount: 20, sold: 912, image: "/look4.jpg" },
    { id: 11049, category: "shoes", brand: "SCULPTOR", title: "Leather loafers penny [brown]", price: 168, salePrice: 134, discount: 20, sold: 876, image: "/look5.jpg" },
    { id: 11050, category: "shoes", brand: "BLACK PURPLE", title: "Pointed toe ankle boots [black]", price: 208, salePrice: 166, discount: 20, sold: 845, image: "/street-1.jpg" },
    { id: 11051, category: "shoes", brand: "RAWROW", title: "Minimalist slip-on [white]", price: 68, salePrice: 54, discount: 21, sold: 812, image: "/wtrending1.jpg" },
    { id: 11052, category: "shoes", brand: "ANDERSSON BELL", title: "Chunky sole derby shoes [black]", price: 198, salePrice: 158, discount: 20, sold: 789, image: "/wtrending2.jpg" },
    { id: 11053, category: "shoes", brand: "BADBLOOD", title: "Vintage runner sneakers [cream]", price: 108, salePrice: 86, discount: 20, sold: 756, image: "/wtrending3.jpg" },
    { id: 11054, category: "shoes", brand: "BLACK PURPLE", title: "Lace-up combat boots [black]", price: 238, salePrice: 190, discount: 20, sold: 723, image: "/wtrending4.jpg" },
    // Beauty (18 items)
    { id: 11060, category: "beauty", brand: "LANEIGE", title: "Water Sleeping Mask [original]", price: 34, salePrice: 27, discount: 20, sold: 2654, image: "/wtrending5.jpg" },
    { id: 11061, category: "beauty", brand: "COSRX", title: "Advanced Snail 96 Mucin Power Essence", price: 25, salePrice: 19, discount: 24, sold: 2456, image: "/wtrending6.jpg" },
    { id: 11062, category: "beauty", brand: "INNISFREE", title: "Green Tea Seed Serum [80ml]", price: 38, salePrice: 28, discount: 26, sold: 2345, image: "/wtrending7.jpg" },
    { id: 11063, category: "beauty", brand: "SULWHASOO", title: "First Care Activating Serum [60ml]", price: 89, salePrice: 71, discount: 20, sold: 2198, image: "/pinterest1.jpg" },
    { id: 11064, category: "beauty", brand: "DR. JART+", title: "Ceramidin Cream [50ml]", price: 48, salePrice: 36, discount: 25, sold: 2087, image: "/pinterest2.jpg" },
    { id: 11065, category: "beauty", brand: "BEAUTY OF JOSEON", title: "Glow Serum : Propolis + Niacinamide", price: 18, salePrice: 14, discount: 22, sold: 1987, image: "/pinterest3.jpg" },
    { id: 11066, category: "beauty", brand: "HERA", title: "Black Cushion SPF34 [15g]", price: 56, salePrice: 42, discount: 25, sold: 1876, image: "/pinterest13.jpg" },
    { id: 11067, category: "beauty", brand: "MISSHA", title: "M Perfect Covering BB Cream SPF42", price: 22, salePrice: 15, discount: 32, sold: 1765, image: "/fall-4.jpg" },
    { id: 11068, category: "beauty", brand: "ETUDE", title: "Drawing Eye Brow Pencil [gray brown]", price: 8, salePrice: 5, discount: 37, sold: 1654, image: "/fall-5.jpg" },
    { id: 11069, category: "beauty", brand: "BANILA CO", title: "Clean It Zero Cleansing Balm [original]", price: 28, salePrice: 21, discount: 25, sold: 1543, image: "/feed-8.jpg" },
    { id: 11070, category: "beauty", brand: "SOME BY MI", title: "AHA BHA PHA 30 Days Miracle Toner", price: 18, salePrice: 13, discount: 28, sold: 1432, image: "/product-8.jpg" },
    { id: 11071, category: "beauty", brand: "LANEIGE", title: "Lip Sleeping Mask [berry]", price: 24, salePrice: 18, discount: 25, sold: 1345, image: "/product-9.jpg" },
    { id: 11072, category: "beauty", brand: "COSRX", title: "Low pH Good Morning Gel Cleanser", price: 15, salePrice: 11, discount: 27, sold: 1298, image: "/trend-9.jpg" },
    { id: 11073, category: "beauty", brand: "INNISFREE", title: "No-Sebum Mineral Powder [5g]", price: 12, salePrice: 9, discount: 25, sold: 1245, image: "/apparel6.jpg" },
    { id: 11074, category: "beauty", brand: "SULWHASOO", title: "Concentrated Ginseng Eye Cream", price: 128, salePrice: 96, discount: 25, sold: 1198, image: "/look1.jpg" },
    { id: 11075, category: "beauty", brand: "DR. JART+", title: "Cicapair Tiger Grass Color Correcting", price: 52, salePrice: 39, discount: 25, sold: 1145, image: "/look2.jpg" },
    { id: 11076, category: "beauty", brand: "HERA", title: "Sensual Powder Matte Lipstick [#335]", price: 38, salePrice: 28, discount: 26, sold: 1098, image: "/look3.jpg" },
    { id: 11077, category: "beauty", brand: "BEAUTY OF JOSEON", title: "Relief Sun : Rice + Probiotics SPF50", price: 16, salePrice: 12, discount: 25, sold: 1054, image: "/look4.jpg" },
  ];

  const getFilteredItems = () => {
    if (activeTab === "all") return allCategoryItems.slice(0, 18);
    return allCategoryItems.filter((item) => item.category === activeTab).slice(0, 18);
  };

  return (
    <div className="min-h-screen bg-white">


      {/* ═══════════════ TOP CATEGORIES ═══════════════ */}
      <section className="py-12 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold tracking-tight">Top Selling Categories</h2>
            <Link href="/shop" className="text-xs text-gray-500 hover:text-black transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topCategories.map((cat) => (
              <Link key={cat.label} href="#" className="group relative block aspect-[4/5] overflow-hidden bg-gray-100">
                <Image src={cat.image} alt={cat.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white text-sm font-semibold">{cat.label}</p>
                  <p className="text-white/60 text-xs mt-1">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TOP SELLERS THIS WEEK ═══════════════ */}
      <section id="top-sellers" className="py-14 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-600 mb-2 block">Beauty</span>
              <h2 className="text-3xl font-light tracking-tight">Top Sellers This Week — Beauty</h2>
              <p className="text-sm text-gray-500 mt-1">Based on real-time sales data — updated daily</p>
            </div>
            <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors border-b border-gray-300 pb-0.5">
              Full Rankings →
            </Link>
          </div>

          <div className="relative group/scroll">
            <div
              ref={topSellersRef}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {topSellers.map((item) => (
                <Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block">
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    {/* Rank badge */}
                    <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">
                      {item.rank}
                    </span>
                    {/* Wishlist */}
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">{item.discount}%</span>
                      <span className="text-sm font-bold">${item.salePrice}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">${item.price}</p>
                    <div className="flex items-center gap-3 pt-0.5">
                      <span className="text-[11px] text-gray-400">★ {item.rating}</span>
                      <span className="text-[11px] text-gray-400">{item.sold.toLocaleString()} sold</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button onClick={() => scrollRight(topSellersRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button onClick={() => scrollLeft(topSellersRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ TOP SELLERS FASHION ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-600 mb-2 block">Fashion</span>
              <h2 className="text-3xl font-light tracking-tight">Top Sellers This Week — Fashion</h2>
              <p className="text-sm text-gray-500 mt-1">The most popular apparel picks — updated daily</p>
            </div>
            <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors border-b border-gray-300 pb-0.5">
              Full Rankings →
            </Link>
          </div>

          <div className="relative group/scroll">
            <div
              ref={topSellersFashionRef}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {topSellersFashion.map((item) => (
                <Link key={item.id} href="#" className="group flex-shrink-0 w-[220px] md:w-[260px] block">
                  <div className="relative aspect-[3/4] bg-white overflow-hidden mb-3">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    {/* Rank badge */}
                    <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">
                      {item.rank}
                    </span>
                    {/* Wishlist */}
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">{item.discount}%</span>
                      <span className="text-sm font-bold">${item.salePrice}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">${item.price}</p>
                    <div className="flex items-center gap-3 pt-0.5">
                      <span className="text-[11px] text-gray-400">★ {item.rating}</span>
                      <span className="text-[11px] text-gray-400">{item.sold.toLocaleString()} sold</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button onClick={() => scrollRight(topSellersFashionRef)} className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button onClick={() => scrollLeft(topSellersFashionRef)} className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10">
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ FLASH SALE ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#111]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400 mb-2 block">Limited Time</span>
              <h2 className="text-3xl font-light text-white tracking-tight">
                {flashSale.title}
              </h2>
              <p className="text-sm text-white/50 mt-1">{flashSale.subtitle}</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 border border-white/10">
              <span className="text-xs text-white/60 uppercase tracking-wider">Ends in</span>
              <div className="flex gap-1">
                <span className="bg-white text-black text-sm font-bold px-2.5 py-1.5 min-w-[36px] text-center">
                  {String(countdown.hours).padStart(2, "0")}
                </span>
                <span className="text-white/60 self-center">:</span>
                <span className="bg-white text-black text-sm font-bold px-2.5 py-1.5 min-w-[36px] text-center">
                  {String(countdown.minutes).padStart(2, "0")}
                </span>
                <span className="text-white/60 self-center">:</span>
                <span className="bg-white text-black text-sm font-bold px-2.5 py-1.5 min-w-[36px] text-center">
                  {String(countdown.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flashSale.items.map((item) => (
              <Link key={item.id} href="#" className="group block">
                <div className="relative aspect-[3/4] bg-gray-900 overflow-hidden mb-3">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                  <span className="absolute top-3 left-3 bg-amber-400 text-black text-[10px] font-bold px-2.5 py-1 tracking-wider">
                    FLASH SALE
                  </span>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <span className={wishlist.includes(item.id) ? "text-red-500" : "text-white/70"}>
                      {wishlist.includes(item.id) ? "♥" : "♡"}
                    </span>
                  </button>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/50 font-medium">{flashSale.brand}</p>
                  <h3 className="text-sm text-white font-normal line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-amber-400">{item.discount}%</span>
                    <span className="text-sm font-bold text-white">${item.salePrice}</span>
                  </div>
                  <p className="text-xs text-white/40 line-through">${item.price}</p>
                  <p className="text-[11px] text-white/40 pt-0.5">★ {item.reviews.toLocaleString()} reviews</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ STAFF FAVORITES ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-light tracking-tight">Staff Favorites</h2>
              <p className="text-sm text-gray-500 mt-1">Hand-picked by our team — the best sellers we personally love</p>
            </div>
          </div>

          {/* Brand spotlight + product grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* Left — Brand image + info */}
            <div className="col-span-12 md:col-span-5">
              <Link href="#" className="group flex flex-col h-full">
                <div className="relative flex-1 min-h-0 bg-gray-100 overflow-hidden">
                  <Image src={staffFavorites[0].image} alt={staffFavorites[0].brand} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-4 pb-1">
                  <p className="text-xs text-gray-500 font-medium">{staffFavorites[0].brand}</p>
                  <p className="text-sm text-gray-700 mt-0.5 italic">Staff Pick of the Week</p>
                </div>
              </Link>
            </div>

            {/* Right — 3×2 product grid */}
            <div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-4">
              {staffFavorites.map((item) => (
                <Link key={item.id} href="#" className="group block">
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">{item.discount}%</span>
                      <span className="text-sm font-bold">${item.salePrice}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">${item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ BEST SELLERS BY CATEGORY ═══════════════ */}
      <section className="py-14 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-light tracking-tight">Best Sellers by Category</h2>
              <p className="text-sm text-gray-500 mt-1">Filter by what you&apos;re looking for</p>
            </div>

            {/* Tabs */}
            <div className="flex border border-gray-300 divide-x divide-gray-300">
              {(["all", "clothing", "accessories", "shoes", "beauty"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-xs font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab === "all" ? "All" : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {getFilteredItems().map((item) => (
              <Link key={item.id} href="#" className="group block">
                <div className="relative aspect-[3/4] bg-white overflow-hidden mb-3">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }}
                    className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                  >
                    <span className={`text-sm ${wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}`}>
                      {wishlist.includes(item.id) ? "♥" : "♡"}
                    </span>
                  </button>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                  <h3 className="text-sm font-normal line-clamp-1">{item.title}</h3>
                  {item.discount > 0 ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-red-600">{item.discount}%</span>
                        <span className="text-sm font-bold">${item.salePrice}</span>
                      </div>
                      <p className="text-xs text-gray-400 line-through">${item.price}</p>
                    </>
                  ) : (
                    <p className="text-sm font-bold">${item.salePrice}</p>
                  )}
                  <p className="text-[11px] text-gray-400 pt-0.5">{item.sold.toLocaleString()} sold</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ NEWSLETTER ═══════════════ */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-black text-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
            Stay Ahead of the Trend
          </h2>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">
            Get weekly updates on best sellers and exclusive early access to flash sales.
          </p>
          <div className="flex items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 text-white text-sm px-5 py-3.5 placeholder-white/40 focus:outline-none focus:border-white/50"
            />
            <button className="bg-white text-black text-sm font-semibold px-6 py-3.5 hover:bg-gray-100 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ MARQUEE ANIMATION STYLE ═══════════════ */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
