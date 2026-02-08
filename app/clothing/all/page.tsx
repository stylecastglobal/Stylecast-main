"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AllClothingPage() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const itemsPerPage = 25;

  // Filter dropdowns open state
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  // Active filters
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    brand: [],
    type: [],
    size: [],
    color: [],
    price: [],
  });

  // Sort
  const [sortBy, setSortBy] = useState("relevance");

  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleFilter = (category: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[category] || [];
      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({ brand: [], type: [], size: [], color: [], price: [] });
  };

  const totalActiveFilters = Object.values(activeFilters).flat().length;

  // Filter options
  const filterOptions = {
    brand: ["MUSINSA STANDARD", "SCULPTOR", "ANDERSSON BELL", "MUAHMUAH", "PLACE STUDIO", "BADBLOOD", "LEATHERY", "KIRSH", "ESCAPEFROM", "GROVE", "CHINDOWN", "PARTIMENTO"],
    type: ["Tops", "Pants", "Dresses", "Outerwear", "Knitwear", "Shirts", "Skirts", "Hoodies & Sweats"],
    size: ["XS", "S", "M", "L", "XL", "XXL", "Free"],
    color: ["Black", "White", "Gray", "Navy", "Brown", "Beige", "Cream", "Pink", "Blue", "Green"],
    price: ["Under $50", "$50 - $100", "$100 - $200", "$200 - $300", "$300+"],
  };

  // ─── PRODUCT DATA (125 items total for 5 pages) ───
  const allProducts = [
    { id: 20001, brand: "MUSINSA STANDARD", title: "Cashmere blend oversized coat [oatmeal]", price: 229, salePrice: 172, discount: 24, reviews: 4865, image: "/wtrending1.jpg", badge: "Best" },
    { id: 20002, brand: "SCULPTOR", title: "Logo embroidered hoodie [black]", price: 98, salePrice: 78, discount: 20, reviews: 4216, image: "/wtrending2.jpg", badge: "" },
    { id: 20003, brand: "ANDERSSON BELL", title: "Asymmetric knit vest [cream]", price: 195, salePrice: 156, discount: 20, reviews: 3956, image: "/wtrending3.jpg", badge: "New" },
    { id: 20004, brand: "MUAHMUAH", title: "Flower combo hoodie [ivory]", price: 54, salePrice: 24, discount: 55, reviews: 3842, image: "/wtrending4.jpg", badge: "" },
    { id: 20005, brand: "PLACE STUDIO", title: "Pleated skirt layered wide pants [charcoal]", price: 51, salePrice: 29, discount: 43, reviews: 3654, image: "/wtrending5.jpg", badge: "" },
    { id: 20006, brand: "BADBLOOD", title: "0119 low-rise bootcut jeans [mid blue]", price: 128, salePrice: 115, discount: 10, reviews: 3421, image: "/wtrending6.jpg", badge: "" },
    { id: 20007, brand: "LEATHERY", title: "Butter-soft leather jacket [cognac]", price: 348, salePrice: 278, discount: 20, reviews: 3198, image: "/wtrending7.jpg", badge: "Best" },
    { id: 20008, brand: "KIRSH", title: "Cherry logo sweatshirt [cream]", price: 65, salePrice: 52, discount: 20, reviews: 2987, image: "/pinterest1.jpg", badge: "" },
    { id: 20009, brand: "ESCAPEFROM", title: "Strawberry dot logo hoodie [pink]", price: 71, salePrice: 39, discount: 45, reviews: 2876, image: "/pinterest2.jpg", badge: "" },
    { id: 20010, brand: "GROVE", title: "Textured knit polo [olive]", price: 89, salePrice: 71, discount: 20, reviews: 2654, image: "/pinterest3.jpg", badge: "New" },
    { id: 20011, brand: "CHINDOWN", title: "Oversized trench coat [beige]", price: 268, salePrice: 201, discount: 25, reviews: 2543, image: "/pinterest13.jpg", badge: "" },
    { id: 20012, brand: "PARTIMENTO", title: "Washed cotton chino pants [khaki]", price: 95, salePrice: 76, discount: 20, reviews: 2432, image: "/fall-4.jpg", badge: "" },
    { id: 20013, brand: "MUSINSA STANDARD", title: "Womens wool blend belted long coat [charcoal]", price: 198, salePrice: 129, discount: 35, reviews: 2345, image: "/fall-5.jpg", badge: "Best" },
    { id: 20014, brand: "SCULPTOR", title: "Washed denim cargo pants [light blue]", price: 148, salePrice: 118, discount: 20, reviews: 2234, image: "/feed-8.jpg", badge: "" },
    { id: 20015, brand: "MUAHMUAH", title: "Henley neck stitch long sleeve tee [ivory]", price: 36, salePrice: 23, discount: 36, reviews: 2187, image: "/product-8.jpg", badge: "" },
    { id: 20016, brand: "PLACE STUDIO", title: "Essential soft muffler set knit [cream]", price: 38, salePrice: 25, discount: 34, reviews: 2098, image: "/product-9.jpg", badge: "" },
    { id: 20017, brand: "BADBLOOD", title: "Signature logo hoodie [ash gray]", price: 89, salePrice: 71, discount: 20, reviews: 1987, image: "/trend-9.jpg", badge: "" },
    { id: 20018, brand: "LEATHERY", title: "Cashmere balmacaan robe coat [black]", price: 241, salePrice: 193, discount: 19, reviews: 1876, image: "/apparel6.jpg", badge: "" },
    { id: 20019, brand: "KIRSH", title: "Cherry knit beanie set [pink]", price: 48, salePrice: 38, discount: 21, reviews: 1765, image: "/look1.jpg", badge: "New" },
    { id: 20020, brand: "GROVE", title: "Oversized pocket shirt [sage]", price: 82, salePrice: 66, discount: 20, reviews: 1654, image: "/look2.jpg", badge: "" },
    { id: 20021, brand: "ESCAPEFROM", title: "Ribbon detail cropped cardigan [cream]", price: 58, salePrice: 35, discount: 40, reviews: 1543, image: "/look3.jpg", badge: "" },
    { id: 20022, brand: "CHINDOWN", title: "Wool blend coat [charcoal]", price: 248, salePrice: 186, discount: 25, reviews: 1432, image: "/look4.jpg", badge: "" },
    { id: 20023, brand: "PARTIMENTO", title: "Signature collection jacket [navy]", price: 178, salePrice: 142, discount: 20, reviews: 1345, image: "/look5.jpg", badge: "" },
    { id: 20024, brand: "ANDERSSON BELL", title: "Quilted puffer jacket [olive]", price: 312, salePrice: 250, discount: 20, reviews: 1298, image: "/street-1.jpg", badge: "" },
    { id: 20025, brand: "MUSINSA STANDARD", title: "Daily puffer short padding [light beige]", price: 62, salePrice: 40, discount: 35, reviews: 1256, image: "/drop-1.jpg", badge: "" },

    { id: 20026, brand: "SCULPTOR", title: "Destroyed knit vest [gray]", price: 78, salePrice: 62, discount: 20, reviews: 1198, image: "/drop-2.jpg", badge: "" },
    { id: 20027, brand: "MUAHMUAH", title: "Stitch single t-shirt [white]", price: 27, salePrice: 14, discount: 48, reviews: 1145, image: "/drop-3.jpg", badge: "" },
    { id: 20028, brand: "PLACE STUDIO", title: "Oversized cable knit vest [ivory]", price: 45, salePrice: 29, discount: 36, reviews: 1098, image: "/drop-6.jpg", badge: "New" },
    { id: 20029, brand: "BADBLOOD", title: "Destroyed straight jeans [mid blue]", price: 128, salePrice: 102, discount: 20, reviews: 1054, image: "/drop-7.jpg", badge: "" },
    { id: 20030, brand: "LEATHERY", title: "Oversized wool blend half coat [charcoal]", price: 195, salePrice: 156, discount: 20, reviews: 987, image: "/drop-8.jpg", badge: "" },
    { id: 20031, brand: "KIRSH", title: "Cherry logo cardigan [cream]", price: 78, salePrice: 62, discount: 21, reviews: 945, image: "/women-printer-1.jpg", badge: "" },
    { id: 20032, brand: "GROVE", title: "Relaxed fit linen shirt [white]", price: 75, salePrice: 56, discount: 25, reviews: 912, image: "/women-grid-2.jpg", badge: "" },
    { id: 20033, brand: "ESCAPEFROM", title: "Collage print oversized tee [black]", price: 42, salePrice: 34, discount: 19, reviews: 876, image: "/women-grid-1.jpg", badge: "" },
    { id: 20034, brand: "CHINDOWN", title: "K-Icons approved jacket [navy]", price: 198, salePrice: 158, discount: 20, reviews: 845, image: "/women-grid-4.jpg", badge: "" },
    { id: 20035, brand: "PARTIMENTO", title: "Cotton twill wide pants [charcoal]", price: 78, salePrice: 62, discount: 20, reviews: 812, image: "/women-grid-5.jpg", badge: "" },
    { id: 20036, brand: "MUSINSA STANDARD", title: "Womens cashmere blend trench [taupe]", price: 211, salePrice: 201, discount: 4, reviews: 789, image: "/women-grid-3.jpg", badge: "" },
    { id: 20037, brand: "ANDERSSON BELL", title: "Layered crop knit top [ivory]", price: 68, salePrice: 54, discount: 20, reviews: 756, image: "/pinterest4.jpg", badge: "" },
    { id: 20038, brand: "SCULPTOR", title: "Canvas work jacket [tan]", price: 158, salePrice: 126, discount: 20, reviews: 723, image: "/pinterest5.jpg", badge: "" },
    { id: 20039, brand: "MUAHMUAH", title: "Wide cargo jogger pants [black]", price: 52, salePrice: 31, discount: 40, reviews: 698, image: "/pinterest6.jpg", badge: "" },
    { id: 20040, brand: "PLACE STUDIO", title: "Soft knit cardigan set [beige]", price: 62, salePrice: 43, discount: 31, reviews: 675, image: "/pinterest7.jpg", badge: "" },
    { id: 20041, brand: "BADBLOOD", title: "Vintage wash hoodie [navy]", price: 78, salePrice: 62, discount: 20, reviews: 654, image: "/pinterest10.jpg", badge: "" },
    { id: 20042, brand: "LEATHERY", title: "Belted leather midi skirt [brown]", price: 218, salePrice: 174, discount: 20, reviews: 632, image: "/pinterest12.jpg", badge: "" },
    { id: 20043, brand: "KIRSH", title: "Cherry embroidered hoodie [gray]", price: 72, salePrice: 58, discount: 19, reviews: 612, image: "/apparel-hero1.jpg", badge: "" },
    { id: 20044, brand: "GROVE", title: "Textured wool blend blazer [charcoal]", price: 198, salePrice: 158, discount: 20, reviews: 598, image: "/apparel-hero23.jpg", badge: "" },
    { id: 20045, brand: "ESCAPEFROM", title: "Logo print cropped hoodie [white]", price: 58, salePrice: 41, discount: 29, reviews: 576, image: "/apparel-hero3.jpg", badge: "" },
    { id: 20046, brand: "CHINDOWN", title: "Structured blazer [black]", price: 228, salePrice: 182, discount: 20, reviews: 554, image: "/apparel-hero4.jpg", badge: "New" },
    { id: 20047, brand: "PARTIMENTO", title: "Pleated wide trousers [cream]", price: 88, salePrice: 70, discount: 20, reviews: 532, image: "/apparel-hero5.jpg", badge: "" },
    { id: 20048, brand: "MUSINSA STANDARD", title: "Lightweight down quilted vest [black]", price: 89, salePrice: 58, discount: 35, reviews: 512, image: "/apparel-hero6.jpg", badge: "" },
    { id: 20049, brand: "ANDERSSON BELL", title: "Pleated midi skirt [charcoal]", price: 86, salePrice: 69, discount: 20, reviews: 498, image: "/brandsyouwilllove-1.jpg", badge: "" },
    { id: 20050, brand: "SCULPTOR", title: "Oversized cargo pants [black]", price: 95, salePrice: 76, discount: 20, reviews: 476, image: "/brandsyouwilllove-23.jpg", badge: "" },

    { id: 20051, brand: "MUAHMUAH", title: "Cable knit beanie [cream]", price: 28, salePrice: 15, discount: 46, reviews: 456, image: "/brandsyouwilllove-3.jpg", badge: "" },
    { id: 20052, brand: "PLACE STUDIO", title: "Fleece half-zip pullover [ivory]", price: 58, salePrice: 41, discount: 29, reviews: 432, image: "/brandsyouwilllove-2.jpg", badge: "" },
    { id: 20053, brand: "BADBLOOD", title: "Graphic print oversized tee [black]", price: 52, salePrice: 39, discount: 25, reviews: 412, image: "/apparel-cozyknitcollection.jpg", badge: "" },
    { id: 20054, brand: "LEATHERY", title: "M-65 fish tail long parka [khaki]", price: 183, salePrice: 146, discount: 20, reviews: 398, image: "/apparel-knitsection-hero.jpg", badge: "" },
    { id: 20055, brand: "KIRSH", title: "Cherry pattern knit sweater [navy]", price: 82, salePrice: 66, discount: 20, reviews: 378, image: "/apparel-winteressentials-hero.jpg", badge: "" },
    { id: 20056, brand: "GROVE", title: "Cotton twill chore jacket [olive]", price: 148, salePrice: 118, discount: 20, reviews: 356, image: "/apparel-finalwinterpicks1.jpg", badge: "" },
    { id: 20057, brand: "ESCAPEFROM", title: "Velvet track pants [burgundy]", price: 68, salePrice: 48, discount: 29, reviews: 334, image: "/apparel-finalwinterpicks2.jpg", badge: "" },
    { id: 20058, brand: "CHINDOWN", title: "Double-breasted coat [camel]", price: 298, salePrice: 238, discount: 20, reviews: 312, image: "/apparel-finalwinterpicks12.jpg", badge: "" },
    { id: 20059, brand: "PARTIMENTO", title: "Corduroy wide pants [brown]", price: 82, salePrice: 66, discount: 20, reviews: 298, image: "/apparel-finalwinterpicks123.jpg", badge: "" },
    { id: 20060, brand: "MUSINSA STANDARD", title: "Wool knit half zip-up [oatmeal]", price: 89, salePrice: 67, discount: 25, reviews: 276, image: "/drop-1.jpg", badge: "" },
    { id: 20061, brand: "SCULPTOR", title: "Sherpa fleece jacket [cream]", price: 168, salePrice: 134, discount: 20, reviews: 265, image: "/drop-2.jpg", badge: "" },
    { id: 20062, brand: "ANDERSSON BELL", title: "Ribbon knit cardigan [cream]", price: 78, salePrice: 62, discount: 20, reviews: 254, image: "/drop-3.jpg", badge: "" },
    { id: 20063, brand: "MUAHMUAH", title: "Oversized graphic sweatshirt [gray]", price: 48, salePrice: 26, discount: 45, reviews: 243, image: "/drop-6.jpg", badge: "" },
    { id: 20064, brand: "PLACE STUDIO", title: "Structured mini skirt [black]", price: 42, salePrice: 29, discount: 31, reviews: 232, image: "/drop-7.jpg", badge: "" },
    { id: 20065, brand: "BADBLOOD", title: "Relaxed fit chino pants [beige]", price: 78, salePrice: 62, discount: 20, reviews: 221, image: "/drop-8.jpg", badge: "" },
    { id: 20066, brand: "LEATHERY", title: "Shearling collar leather jacket [black]", price: 295, salePrice: 236, discount: 20, reviews: 212, image: "/women-printer-1.jpg", badge: "" },
    { id: 20067, brand: "KIRSH", title: "Cherry logo zip-up hoodie [black]", price: 78, salePrice: 62, discount: 21, reviews: 198, image: "/women-grid-2.jpg", badge: "" },
    { id: 20068, brand: "GROVE", title: "Linen blend relaxed blazer [sand]", price: 168, salePrice: 134, discount: 20, reviews: 187, image: "/women-grid-1.jpg", badge: "" },
    { id: 20069, brand: "ESCAPEFROM", title: "Tie-dye oversized tee [purple]", price: 38, salePrice: 27, discount: 29, reviews: 176, image: "/women-grid-4.jpg", badge: "" },
    { id: 20070, brand: "CHINDOWN", title: "Cashmere turtleneck [ivory]", price: 168, salePrice: 134, discount: 20, reviews: 165, image: "/women-grid-5.jpg", badge: "" },
    { id: 20071, brand: "PARTIMENTO", title: "Military cargo shorts [olive]", price: 68, salePrice: 54, discount: 21, reviews: 156, image: "/women-grid-3.jpg", badge: "" },
    { id: 20072, brand: "MUSINSA STANDARD", title: "Reversible fleece jacket [ivory/brown]", price: 128, salePrice: 96, discount: 25, reviews: 145, image: "/pinterest4.jpg", badge: "" },
    { id: 20073, brand: "SCULPTOR", title: "Nylon anorak windbreaker [black]", price: 118, salePrice: 94, discount: 20, reviews: 134, image: "/pinterest5.jpg", badge: "" },
    { id: 20074, brand: "ANDERSSON BELL", title: "Oversized wool blend coat [black]", price: 342, salePrice: 274, discount: 20, reviews: 123, image: "/pinterest6.jpg", badge: "" },
    { id: 20075, brand: "MUAHMUAH", title: "Ribbon detail mini bag [pink]", price: 32, salePrice: 19, discount: 40, reviews: 112, image: "/pinterest7.jpg", badge: "" },

    { id: 20076, brand: "PLACE STUDIO", title: "Mock neck ribbed top [black]", price: 32, salePrice: 22, discount: 31, reviews: 456, image: "/pinterest10.jpg", badge: "" },
    { id: 20077, brand: "BADBLOOD", title: "Washed denim jacket [light blue]", price: 148, salePrice: 118, discount: 20, reviews: 445, image: "/pinterest12.jpg", badge: "" },
    { id: 20078, brand: "LEATHERY", title: "Leather moto jacket [black]", price: 398, salePrice: 318, discount: 20, reviews: 434, image: "/pinterest13.jpg", badge: "" },
    { id: 20079, brand: "KIRSH", title: "Cherry stripe long sleeve [navy]", price: 48, salePrice: 38, discount: 21, reviews: 423, image: "/fall-4.jpg", badge: "" },
    { id: 20080, brand: "GROVE", title: "Waffle knit henley [cream]", price: 58, salePrice: 46, discount: 21, reviews: 412, image: "/fall-5.jpg", badge: "" },
    { id: 20081, brand: "ESCAPEFROM", title: "Oversized fleece pullover [gray]", price: 68, salePrice: 48, discount: 29, reviews: 401, image: "/feed-8.jpg", badge: "" },
    { id: 20082, brand: "CHINDOWN", title: "Tailored wide trousers [navy]", price: 118, salePrice: 94, discount: 20, reviews: 398, image: "/product-8.jpg", badge: "" },
    { id: 20083, brand: "PARTIMENTO", title: "Brushed cotton hoodie [charcoal]", price: 72, salePrice: 58, discount: 19, reviews: 387, image: "/product-9.jpg", badge: "" },
    { id: 20084, brand: "MUSINSA STANDARD", title: "Padded long vest [black]", price: 112, salePrice: 78, discount: 30, reviews: 376, image: "/trend-9.jpg", badge: "" },
    { id: 20085, brand: "SCULPTOR", title: "Cropped trucker jacket [black]", price: 138, salePrice: 110, discount: 20, reviews: 365, image: "/apparel6.jpg", badge: "" },
    { id: 20086, brand: "ANDERSSON BELL", title: "Scarf fur frill t-shirt [gray]", price: 53, salePrice: 43, discount: 18, reviews: 354, image: "/look1.jpg", badge: "" },
    { id: 20087, brand: "MUAHMUAH", title: "Cropped zip hoodie [cream]", price: 52, salePrice: 31, discount: 40, reviews: 343, image: "/look2.jpg", badge: "" },
    { id: 20088, brand: "PLACE STUDIO", title: "Ribbed knit midi dress [black]", price: 68, salePrice: 48, discount: 29, reviews: 332, image: "/look3.jpg", badge: "" },
    { id: 20089, brand: "BADBLOOD", title: "Straight leg raw hem jeans [dark]", price: 118, salePrice: 94, discount: 20, reviews: 321, image: "/look4.jpg", badge: "" },
    { id: 20090, brand: "LEATHERY", title: "Suede bomber jacket [tan]", price: 278, salePrice: 222, discount: 20, reviews: 312, image: "/look5.jpg", badge: "" },
    { id: 20091, brand: "KIRSH", title: "Cherry embroidered polo [white]", price: 52, salePrice: 42, discount: 19, reviews: 298, image: "/street-1.jpg", badge: "" },
    { id: 20092, brand: "GROVE", title: "Corduroy trucker jacket [brown]", price: 158, salePrice: 126, discount: 20, reviews: 287, image: "/wtrending1.jpg", badge: "" },
    { id: 20093, brand: "ESCAPEFROM", title: "Color block windbreaker [blue/white]", price: 88, salePrice: 62, discount: 30, reviews: 276, image: "/wtrending2.jpg", badge: "" },
    { id: 20094, brand: "CHINDOWN", title: "Quilted liner jacket [olive]", price: 148, salePrice: 118, discount: 20, reviews: 265, image: "/wtrending3.jpg", badge: "" },
    { id: 20095, brand: "PARTIMENTO", title: "French terry sweatpants [gray]", price: 58, salePrice: 46, discount: 21, reviews: 254, image: "/wtrending4.jpg", badge: "" },
    { id: 20096, brand: "MUSINSA STANDARD", title: "Merino wool crewneck [charcoal]", price: 78, salePrice: 58, discount: 26, reviews: 243, image: "/wtrending5.jpg", badge: "" },
    { id: 20097, brand: "SCULPTOR", title: "Pigment dyed hoodie [olive]", price: 88, salePrice: 70, discount: 20, reviews: 232, image: "/wtrending6.jpg", badge: "" },
    { id: 20098, brand: "ANDERSSON BELL", title: "Deconstructed shirt jacket [white]", price: 198, salePrice: 158, discount: 20, reviews: 221, image: "/wtrending7.jpg", badge: "" },
    { id: 20099, brand: "MUAHMUAH", title: "Logo tape track pants [black]", price: 48, salePrice: 29, discount: 40, reviews: 212, image: "/pinterest1.jpg", badge: "" },
    { id: 20100, brand: "PLACE STUDIO", title: "Boucle tweed mini skirt [pink]", price: 52, salePrice: 36, discount: 31, reviews: 198, image: "/pinterest2.jpg", badge: "" },

    { id: 20101, brand: "BADBLOOD", title: "Oversized denim trucker [mid wash]", price: 158, salePrice: 126, discount: 20, reviews: 187, image: "/pinterest3.jpg", badge: "" },
    { id: 20102, brand: "LEATHERY", title: "Cropped leather biker [black]", price: 368, salePrice: 294, discount: 20, reviews: 176, image: "/pinterest13.jpg", badge: "" },
    { id: 20103, brand: "KIRSH", title: "Cherry pattern pajama set [pink]", price: 68, salePrice: 54, discount: 21, reviews: 165, image: "/fall-4.jpg", badge: "" },
    { id: 20104, brand: "GROVE", title: "Seersucker camp collar shirt [blue]", price: 72, salePrice: 58, discount: 19, reviews: 154, image: "/fall-5.jpg", badge: "" },
    { id: 20105, brand: "ESCAPEFROM", title: "Mesh panel bomber [black]", price: 98, salePrice: 69, discount: 30, reviews: 143, image: "/feed-8.jpg", badge: "" },
    { id: 20106, brand: "CHINDOWN", title: "Pinstripe relaxed pants [gray]", price: 98, salePrice: 78, discount: 20, reviews: 132, image: "/product-8.jpg", badge: "" },
    { id: 20107, brand: "PARTIMENTO", title: "Heavyweight pocket tee [white]", price: 38, salePrice: 30, discount: 21, reviews: 121, image: "/product-9.jpg", badge: "" },
    { id: 20108, brand: "MUSINSA STANDARD", title: "City leisure hooded down [black]", price: 97, salePrice: 87, discount: 10, reviews: 112, image: "/trend-9.jpg", badge: "" },
    { id: 20109, brand: "SCULPTOR", title: "Fleece bucket hat [cream]", price: 38, salePrice: 30, discount: 21, reviews: 98, image: "/apparel6.jpg", badge: "" },
    { id: 20110, brand: "ANDERSSON BELL", title: "Wool blend pleated skirt [gray]", price: 108, salePrice: 86, discount: 20, reviews: 87, image: "/look1.jpg", badge: "" },
    { id: 20111, brand: "MUAHMUAH", title: "Patchwork denim jacket [mixed]", price: 78, salePrice: 47, discount: 40, reviews: 76, image: "/look2.jpg", badge: "" },
    { id: 20112, brand: "PLACE STUDIO", title: "Balloon sleeve blouse [white]", price: 48, salePrice: 34, discount: 29, reviews: 65, image: "/look3.jpg", badge: "" },
    { id: 20113, brand: "BADBLOOD", title: "Carpenter work pants [brown]", price: 98, salePrice: 78, discount: 20, reviews: 54, image: "/look4.jpg", badge: "" },
    { id: 20114, brand: "LEATHERY", title: "Waxed cotton field jacket [olive]", price: 248, salePrice: 198, discount: 20, reviews: 45, image: "/look5.jpg", badge: "" },
    { id: 20115, brand: "KIRSH", title: "Cherry logo bucket hat [cream]", price: 42, salePrice: 34, discount: 19, reviews: 34, image: "/street-1.jpg", badge: "" },
    { id: 20116, brand: "GROVE", title: "Garment dyed chino shorts [sand]", price: 62, salePrice: 50, discount: 19, reviews: 28, image: "/wtrending1.jpg", badge: "" },
    { id: 20117, brand: "ESCAPEFROM", title: "Puffer scarf [black]", price: 48, salePrice: 34, discount: 29, reviews: 23, image: "/wtrending2.jpg", badge: "" },
    { id: 20118, brand: "CHINDOWN", title: "Herringbone wool vest [charcoal]", price: 128, salePrice: 102, discount: 20, reviews: 18, image: "/wtrending3.jpg", badge: "" },
    { id: 20119, brand: "PARTIMENTO", title: "Ripstop cargo joggers [black]", price: 72, salePrice: 58, discount: 19, reviews: 15, image: "/wtrending4.jpg", badge: "" },
    { id: 20120, brand: "MUSINSA STANDARD", title: "Cashmere blend cinched coat [black]", price: 202, salePrice: 142, discount: 29, reviews: 12, image: "/wtrending5.jpg", badge: "" },
    { id: 20121, brand: "SCULPTOR", title: "Mesh jersey tank [white]", price: 38, salePrice: 30, discount: 21, reviews: 10, image: "/wtrending6.jpg", badge: "" },
    { id: 20122, brand: "ANDERSSON BELL", title: "Crinkle nylon shirt [sage]", price: 148, salePrice: 118, discount: 20, reviews: 8, image: "/wtrending7.jpg", badge: "" },
    { id: 20123, brand: "MUAHMUAH", title: "Terry cloth shorts set [cream]", price: 58, salePrice: 35, discount: 40, reviews: 6, image: "/pinterest1.jpg", badge: "" },
    { id: 20124, brand: "PLACE STUDIO", title: "Crochet knit vest [ivory]", price: 42, salePrice: 29, discount: 31, reviews: 4, image: "/pinterest2.jpg", badge: "" },
    { id: 20125, brand: "BADBLOOD", title: "Loose fit bermuda shorts [beige]", price: 68, salePrice: 54, discount: 21, reviews: 3, image: "/pinterest3.jpg", badge: "" },
  ];

  const totalResults = allProducts.length;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = allProducts.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════ PAGE HEADER ═══════════════ */}
      <div className="px-6 md:px-12 lg:px-20 pt-6 pb-4">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-2xl font-light tracking-tight">All Clothing</h1>
          <p className="text-sm text-gray-500 mt-1">{totalResults} Results</p>
        </div>
      </div>

      {/* ═══════════════ HORIZONTAL FILTER BAR ═══════════════ */}
      <div className="sticky top-[120px] z-40 bg-white border-b border-gray-200">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between py-3">
            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              {Object.entries(filterOptions).map(([key, options]) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => setOpenFilter(openFilter === key ? null : key)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium border transition-colors ${
                      activeFilters[key]?.length > 0
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="capitalize">{key}</span>
                    {activeFilters[key]?.length > 0 && (
                      <span className="bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {activeFilters[key].length}
                      </span>
                    )}
                    <span className="text-[10px] ml-0.5">▼</span>
                  </button>

                  {/* Dropdown */}
                  {openFilter === key && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-xl p-4 min-w-[220px] max-h-[320px] overflow-y-auto z-50">
                      <div className="space-y-2">
                        {options.map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 -mx-2 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={activeFilters[key]?.includes(option) || false}
                              onChange={() => toggleFilter(key, option)}
                              className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                            />
                            <span className="text-xs text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Clear filters */}
              {totalActiveFilters > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-500 hover:text-black transition-colors ml-2 underline"
                >
                  Clear all ({totalActiveFilters})
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setOpenFilter(openFilter === "sort" ? null : "sort")}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-700 border border-gray-300 hover:border-gray-400 transition-colors"
              >
                Sort: {sortBy === "relevance" ? "Relevance" : sortBy === "price-low" ? "Price: Low" : sortBy === "price-high" ? "Price: High" : sortBy === "newest" ? "Newest" : "Popular"}
                <span className="text-[10px] ml-0.5">▼</span>
              </button>

              {openFilter === "sort" && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 shadow-xl min-w-[180px] z-50">
                  {["relevance", "popular", "newest", "price-low", "price-high"].map((option) => (
                    <button
                      key={option}
                      onClick={() => { setSortBy(option); setOpenFilter(null); }}
                      className={`block w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 transition-colors ${
                        sortBy === option ? "font-semibold text-black" : "text-gray-600"
                      }`}
                    >
                      {option === "relevance" ? "Relevance" : option === "popular" ? "Popular" : option === "newest" ? "Newest" : option === "price-low" ? "Price: Low to High" : "Price: High to Low"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Close dropdowns on background click */}
      {openFilter && (
        <div className="fixed inset-0 z-30" onClick={() => setOpenFilter(null)} />
      )}

      {/* ═══════════════ PRODUCT GRID ═══════════════ */}
      <section className="py-8 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentProducts.map((item) => (
              <Link key={item.id} href="#" className="group block">
                <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badge */}
                  {item.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 tracking-wider ${
                      item.badge === "New" ? "bg-black text-white" : "bg-amber-400 text-black"
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {/* Wishlist */}
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }}
                    className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                  >
                    <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                      {wishlist.includes(item.id) ? "♥" : "♡"}
                    </span>
                  </button>
                </div>

                {/* Product info */}
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
                    <p className="text-sm font-bold">${item.price}</p>
                  )}
                  <p className="text-[11px] text-gray-400 pt-0.5">★ {item.reviews.toLocaleString()} reviews</p>
                </div>
              </Link>
            ))}
          </div>

          {/* ═══════════════ PAGINATION ═══════════════ */}
          <div className="flex flex-col items-center mt-14 mb-8 gap-3">
            <div className="flex items-center gap-1">
              {/* Previous */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${
                  currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"
                }`}
              >
                ‹
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "text-black border-b-2 border-black"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${
                  currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"
                }`}
              >
                ›
              </button>
            </div>

            <p className="text-xs text-gray-400">
              You&apos;re viewing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, totalResults)} of {totalResults} results
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
