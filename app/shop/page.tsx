"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
  // Promo Banner Carousel State
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerAutoRef = useRef<NodeJS.Timeout | null>(null);

  // Gift Picks Scroll
  const giftScrollRef = useRef<HTMLDivElement>(null);

  // New section scroll refs
  const seasonFinaleRef = useRef<HTMLDivElement>(null);
  const valentineStylingRef = useRef<HTMLDivElement>(null);
  const hottestBrandsRef = useRef<HTMLDivElement>(null);
  const lecytoRef = useRef<HTMLDivElement>(null);
  const kstarRef = useRef<HTMLDivElement>(null);
  const tokyoPopupRef = useRef<HTMLDivElement>(null);
  const editorsPickRef = useRef<HTMLDivElement>(null);
  const girlLoveRef = useRef<HTMLDivElement>(null);
  const bagsOnSaleRef = useRef<HTMLDivElement>(null);
  const influencerRef = useRef<HTMLDivElement>(null);
  const cozyKnitRef = useRef<HTMLDivElement>(null);
  const finalWinterRef = useRef<HTMLDivElement>(null);

  // LECYTO countdown timer
  const [countdown, setCountdown] = useState({ hours: 25, minutes: 50, seconds: 2 });

  // Promotional Banners Data (groups of 3)
  const promoBanners = [
    [
      {
        id: 1,
        title: "Sale Up to 80% MUAH Logo Hoodie",
        brands: "MUAHMUAH",
        image: "/apparel-hero1.jpg",
      },
      {
        id: 2,
        title: "Goodbye Winter, Hello Deals",
        brands: "PLACE STUDIO, PARTIMENTO WOMEN, CNVS & more",
        image: "/apparel-hero23.jpg",
      },
      {
        id: 3,
        title: "Must-Haves Chosen by Influencers",
        brands: "MUAHMUAH, SCUFFERS, KHAKIPOINT & more",
        image: "/apparel-hero3.jpg",
      },
    ],
    [
      {
        id: 4,
        title: "New Season Essentials",
        brands: "COS, ARKET, WEEKDAY & more",
        image: "/apparel-hero4.jpg",
      },
      {
        id: 5,
        title: "Trending Now: Street Style",
        brands: "SCULPTOR, ANDERSON BELL & more",
        image: "/apparel-hero5.jpg",
      },
      {
        id: 6,
        title: "Valentine's Day Special",
        brands: "Not Your Rose, MANGO, H&M & more",
        image: "/apparel-hero6.jpg",
      },
    ],
  ];

  // Valentine's Gift Picks Data
  const giftPicks = [
    {
      id: 201,
      brand: "AAKAM",
      title: "Suede eyelet dumpling bag (camel)",
      originalPrice: 124,
      salePrice: 106,
      discount: 14,
      image: "/drop-1.jpg",
      badge: "Acc Festival",
    },
    {
      id: 202,
      brand: "VVV",
      title: "Buckle strap tote shoulder bag _ black",
      originalPrice: 146,
      salePrice: 119,
      discount: 19,
      image: "/drop-2.jpg",
      badge: "Acc Festival",
    },
    {
      id: 203,
      brand: "OSTKAKA",
      title: "Robe shoulder suede dark brown",
      originalPrice: 288,
      salePrice: 259,
      discount: 10,
      image: "/drop-3.jpg",
      badge: "Acc Festival",
    },
    {
      id: 204,
      brand: "MIDNIGHT MOVE",
      title: "Ey cr beanie (black)",
      originalPrice: 44,
      salePrice: 36,
      discount: 18,
      image: "/drop-6.jpg",
      badge: "Acc Festival",
    },
    {
      id: 205,
      brand: "MATIN KIM",
      title: "Logo embossed mini bag (ivory)",
      originalPrice: 178,
      salePrice: 142,
      discount: 20,
      image: "/drop-7.jpg",
      badge: "Acc Festival",
    },
    {
      id: 206,
      brand: "SCULPTOR",
      title: "Leather buckle belt bag (brown)",
      originalPrice: 98,
      salePrice: 79,
      discount: 19,
      image: "/drop-8.jpg",
      badge: "Acc Festival",
    },
    {
      id: 207,
      brand: "ANDERSSON BELL",
      title: "Quilted crossbody mini bag",
      originalPrice: 156,
      salePrice: 125,
      discount: 20,
      image: "/women-printer-1.jpg",
      badge: "Acc Festival",
    },
    {
      id: 208,
      brand: "KIRSH",
      title: "Cherry knit muffler (cream)",
      originalPrice: 68,
      salePrice: 54,
      discount: 21,
      image: "/women-grid-2.jpg",
      badge: "Acc Festival",
    },
  ];

  // Section 3: MUSINSA STANDARD Weekly Special
  const weeklySpecial = [
    {
      id: "ws1",
      brand: "SATUR",
      subtitle: "Everyday Essentials",
      image: "/brandsyouwilllove-1.jpg",
    },
    {
      id: "ws2",
      brand: "COLD CULTURE",
      subtitle: "Top-Rated Essentials",
      image: "/brandsyouwilllove-23.jpg",
    },
    {
      id: "ws3",
      brand: "ERA",
      subtitle: "Woman's Best Up to 70% off + Extra 25% Promo",
      image: "/brandsyouwilllove-3.jpg",
    },
  ];

  // Section 4: The Season Finale
  const seasonFinale = [
    {
      id: 301,
      brand: "MUSINSA STANDARD WOMAN",
      title: "Womens cashmere blend oversized shoulder trench coat [dark brown]",
      originalPrice: 229,
      salePrice: 172,
      discount: 24,
      image: "/wtrending1.jpg",
      badge: "EXTRA 25% OFF",
    },
    {
      id: 302,
      brand: "MUSINSA STANDARD WOMAN",
      title: "Womens cashmere blend handmade short mac coat [black]",
      originalPrice: 141,
      salePrice: 92,
      discount: 34,
      image: "/wtrending2.jpg",
      badge: "EXTRA 25% OFF",
    },
    {
      id: 303,
      brand: "MUSINSA STANDARD WOMAN",
      title: "Womens wool blend duffle short coat [navy]",
      originalPrice: 132,
      salePrice: 86,
      discount: 34,
      image: "/wtrending3.jpg",
      badge: "EXTRA 25% OFF",
    },
    {
      id: 304,
      brand: "MUSINSA STANDARD WOMAN",
      title: "Womens daily puffer short padding jacket [light beige]",
      originalPrice: 62,
      salePrice: 40,
      discount: 35,
      image: "/wtrending4.jpg",
      badge: "EXTRA 25% OFF",
    },
    {
      id: 305,
      brand: "MUSINSA STANDARD WOMAN",
      title: "Womens lightweight down quilted vest [black]",
      originalPrice: 89,
      salePrice: 58,
      discount: 35,
      image: "/wtrending5.jpg",
      badge: "EXTRA 25% OFF",
    },
    {
      id: 306,
      brand: "MUSINSA STANDARD WOMAN",
      title: "Womens wool blend belted long coat [charcoal]",
      originalPrice: 198,
      salePrice: 129,
      discount: 35,
      image: "/wtrending6.jpg",
      badge: "EXTRA 25% OFF",
    },
  ];

  // Section 5: Valentine's Styling Picks
  const valentineStyling = [
    {
      id: 401,
      brand: "ESCAPEFROM",
      title: "Strawberry dot escf logo collage print hoodie pink",
      originalPrice: 71,
      salePrice: 39,
      discount: 45,
      image: "/pinterest4.jpg",
    },
    {
      id: 402,
      brand: "PLACE STUDIO",
      title: "Essential soft muffler set off-shoulder long sleeve knit_3color",
      originalPrice: 38,
      salePrice: 25,
      discount: 34,
      image: "/pinterest5.jpg",
    },
    {
      id: 403,
      brand: "PLACE STUDIO",
      title: "Pleated skirt layered wide pants [charcoal]",
      originalPrice: 51,
      salePrice: 29,
      discount: 43,
      image: "/pinterest6.jpg",
    },
    {
      id: 404,
      brand: "MUAHMUAH",
      title: "Henley neck stitch long sleeve tee [5color]",
      originalPrice: 36,
      salePrice: 23,
      discount: 36,
      image: "/pinterest7.jpg",
    },
    {
      id: 405,
      brand: "ESCAPEFROM",
      title: "Ribbon detail cropped cardigan [cream]",
      originalPrice: 58,
      salePrice: 35,
      discount: 40,
      image: "/pinterest10.jpg",
    },
    {
      id: 406,
      brand: "PLACE STUDIO",
      title: "Oversized cable knit vest [ivory]",
      originalPrice: 45,
      salePrice: 29,
      discount: 36,
      image: "/pinterest12.jpg",
    },
  ];

  // Section 6: The Hottest Brands in Seoul
  const hottestBrands = [
    {
      id: "hb1",
      brand: "VIKINI VENDER",
      subtitle: "Encore Season Sale",
      image: "/look4.jpg",
    },
    {
      id: "hb2",
      brand: "STANDARD ERROR",
      subtitle: "Best-Selling Items",
      image: "/look5.jpg",
    },
    {
      id: "hb3",
      brand: "CHINDOWN",
      subtitle: "Only at MUSINSA: K-Icons Approved",
      image: "/street-1.jpg",
    },
    {
      id: "hb4",
      brand: "GROVE",
      subtitle: "New Arrivals This Week",
      image: "/look1.jpg",
    },
    {
      id: "hb5",
      brand: "PARTIMENTO",
      subtitle: "Signature Collection",
      image: "/look2.jpg",
    },
  ];

  // Section 7: LECYTO Extra 20%
  const lecytoItems = [
    {
      id: 501,
      brand: "LECYTO",
      title: "Majesty waffle hoodie zip-up_[black]",
      originalPrice: 91,
      salePrice: 82,
      discount: 9,
      image: "/pinterest13.jpg",
      badge: "EXTRA 20% OFF",
    },
    {
      id: 502,
      brand: "LECYTO",
      title: "Nebula 7 check hood jumper_[red]",
      originalPrice: 249,
      salePrice: 200,
      discount: 19,
      image: "/wtrending7.jpg",
      badge: "EXTRA 20% OFF",
    },
    {
      id: 503,
      brand: "LECYTO",
      title: "Eos pin-striped hoodie zip-up_[black]",
      originalPrice: 121,
      salePrice: 97,
      discount: 19,
      image: "/fall-4.jpg",
      badge: "EXTRA 20% OFF",
    },
    {
      id: 504,
      brand: "LECYTO",
      title: "Riot script string hooded t-shirt_[black]",
      originalPrice: 86,
      salePrice: 77,
      discount: 10,
      image: "/fall-5.jpg",
      badge: "EXTRA 20% OFF",
    },
    {
      id: 505,
      brand: "LECYTO",
      title: "Boy gone wild long sleeve_[white]",
      originalPrice: 63,
      salePrice: 51,
      discount: 19,
      image: "/feed-8.jpg",
      badge: "EXTRA 20% OFF",
    },
    {
      id: 506,
      brand: "LECYTO",
      title: "Avant-garde drape hood_[black]",
      originalPrice: 63,
      salePrice: 57,
      discount: 9,
      image: "/product-8.jpg",
      badge: "EXTRA 20% OFF",
    },
    {
      id: 507,
      brand: "LECYTO",
      title: "Destroyed knit vest_[gray]",
      originalPrice: 78,
      salePrice: 62,
      discount: 20,
      image: "/product-9.jpg",
      badge: "EXTRA 20% OFF",
    },
    {
      id: 508,
      brand: "LECYTO",
      title: "Oversized cargo pants_[black]",
      originalPrice: 95,
      salePrice: 76,
      discount: 20,
      image: "/trend-9.jpg",
      badge: "EXTRA 20% OFF",
    },
  ];

  // Section 8: K-Star Picks
  const kstarPicks = [
    {
      id: 601,
      brand: "GAKKAI UNIONS",
      title: "Double posta balloon pants burgundy",
      originalPrice: 48,
      salePrice: 34,
      discount: 29,
      image: "/wtrending1.jpg",
    },
    {
      id: 602,
      brand: "MUCENT",
      title: "Tech nylon hooded vest sleeveless anorak windbreaker vest (black, charcoal)",
      originalPrice: 63,
      salePrice: 57,
      discount: 9,
      image: "/wtrending2.jpg",
    },
    {
      id: 603,
      brand: "MUCENT",
      title: "Signature camo military ballcap (khaki-baby pink, gray)",
      originalPrice: 42,
      salePrice: 38,
      discount: 9,
      image: "/wtrending3.jpg",
    },
    {
      id: 604,
      brand: "BADBLOOD",
      title: "0119 low-rise bootcut jeans - mid blue",
      originalPrice: 128,
      salePrice: 115,
      discount: 10,
      image: "/wtrending4.jpg",
    },
    {
      id: 605,
      brand: "GAKKAI UNIONS",
      title: "Graphic print oversized tee black",
      originalPrice: 52,
      salePrice: 39,
      discount: 25,
      image: "/wtrending5.jpg",
    },
    {
      id: 606,
      brand: "BADBLOOD",
      title: "Signature logo hoodie - ash gray",
      originalPrice: 89,
      salePrice: 71,
      discount: 20,
      image: "/wtrending6.jpg",
    },
  ];

  // Section 9: POP-UP IN TOKYO
  const tokyoPopup = {
    heroImage: "/pinterest5.jpg",
    items: [
      {
        id: 701,
        brand: "UGLYSHADOW",
        title: "Rabbit ear hood stripe zip-up (brown)",
        originalPrice: 114,
        salePrice: 91,
        discount: 20,
        image: "/pinterest4.jpg",
      },
      {
        id: 702,
        brand: "UGLYSHADOW",
        title: "Scarf fur frill t-shirt (gray)",
        originalPrice: 53,
        salePrice: 43,
        discount: 18,
        image: "/pinterest6.jpg",
      },
      {
        id: 703,
        brand: "UGLYSHADOW",
        title: "Scarf fur frill t-shirt (charcoal)",
        originalPrice: 53,
        salePrice: 43,
        discount: 18,
        image: "/pinterest7.jpg",
      },
      {
        id: 704,
        brand: "UGLYSHADOW",
        title: "Scarf fur frill t-shirt (black)",
        originalPrice: 53,
        salePrice: 43,
        discount: 18,
        image: "/pinterest10.jpg",
      },
      {
        id: 705,
        brand: "UGLYSHADOW",
        title: "Ribbon knit cardigan (cream)",
        originalPrice: 78,
        salePrice: 62,
        discount: 20,
        image: "/pinterest12.jpg",
      },
      {
        id: 706,
        brand: "UGLYSHADOW",
        title: "Oversized wool blend coat (black)",
        originalPrice: 142,
        salePrice: 113,
        discount: 20,
        image: "/pinterest13.jpg",
      },
      {
        id: 707,
        brand: "UGLYSHADOW",
        title: "Layered crop knit top (ivory)",
        originalPrice: 68,
        salePrice: 54,
        discount: 20,
        image: "/fall-4.jpg",
      },
      {
        id: 708,
        brand: "UGLYSHADOW",
        title: "Pleated midi skirt (charcoal)",
        originalPrice: 86,
        salePrice: 69,
        discount: 20,
        image: "/fall-5.jpg",
      },
    ],
  };

  // Section 10: Editor's Pick
  const editorsPick = {
    heroImage: "/pinterest3.jpg",
    items: [
      {
        id: 801,
        brand: "MUAHMUAH",
        title: "Henley neck stitch long sleeve tee [5color]",
        originalPrice: 36,
        salePrice: 23,
        discount: 36,
        image: "/pinterest1.jpg",
      },
      {
        id: 802,
        brand: "MUAHMUAH",
        title: "Stitch single t-shirt [3color]",
        originalPrice: 27,
        salePrice: 14,
        discount: 48,
        image: "/pinterest2.jpg",
      },
      {
        id: 803,
        brand: "MUAHMUAH",
        title: "Flower combo hoodie [2color]",
        originalPrice: 54,
        salePrice: 24,
        discount: 55,
        image: "/pinterest13.jpg",
      },
      {
        id: 804,
        brand: "MUAHMUAH",
        title: "Stitch logo patch ball cap [3color]",
        originalPrice: 39,
        salePrice: 9,
        discount: 76,
        image: "/fall-4.jpg",
      },
      {
        id: 805,
        brand: "MUAHMUAH",
        title: "Cable knit beanie [4color]",
        originalPrice: 28,
        salePrice: 15,
        discount: 46,
        image: "/fall-5.jpg",
      },
      {
        id: 806,
        brand: "MUAHMUAH",
        title: "Oversized graphic sweatshirt [3color]",
        originalPrice: 48,
        salePrice: 26,
        discount: 45,
        image: "/feed-8.jpg",
      },
      {
        id: 807,
        brand: "MUAHMUAH",
        title: "Wide cargo jogger pants [2color]",
        originalPrice: 52,
        salePrice: 31,
        discount: 40,
        image: "/product-8.jpg",
      },
      {
        id: 808,
        brand: "MUAHMUAH",
        title: "Ribbon detail mini bag [4color]",
        originalPrice: 32,
        salePrice: 19,
        discount: 40,
        image: "/product-9.jpg",
      },
    ],
  };

  // Section 11: A girl lost in love.
  const girlLove = {
    heroImage: "/look3.jpg",
    items: [
      {
        id: 901,
        brand: "HUG YOUR SKIN",
        title: "Hooded half coat (charcoal)",
        originalPrice: 183,
        salePrice: 183,
        discount: 0,
        image: "/wtrending1.jpg",
      },
      {
        id: 902,
        brand: "HUG YOUR SKIN",
        title: "Round collar check fleece jacket (pink gray)",
        originalPrice: 122,
        salePrice: 122,
        discount: 0,
        image: "/wtrending2.jpg",
      },
      {
        id: 903,
        brand: "HUG YOUR SKIN",
        title: "Round collar check fleece jacket (mint gray)",
        originalPrice: 122,
        salePrice: 122,
        discount: 0,
        image: "/wtrending3.jpg",
      },
      {
        id: 904,
        brand: "HUG YOUR SKIN",
        title: "Fleece skirt jogger pants (pink gray)",
        originalPrice: 117,
        salePrice: 117,
        discount: 0,
        image: "/wtrending4.jpg",
      },
      {
        id: 905,
        brand: "HUG YOUR SKIN",
        title: "Quilted puffer vest (cream)",
        originalPrice: 98,
        salePrice: 98,
        discount: 0,
        image: "/wtrending5.jpg",
      },
      {
        id: 906,
        brand: "HUG YOUR SKIN",
        title: "Ribbon knit muffler (pink)",
        originalPrice: 68,
        salePrice: 68,
        discount: 0,
        image: "/wtrending6.jpg",
      },
      {
        id: 907,
        brand: "HUG YOUR SKIN",
        title: "Cable knit cardigan (beige)",
        originalPrice: 145,
        salePrice: 145,
        discount: 0,
        image: "/wtrending7.jpg",
      },
      {
        id: 908,
        brand: "HUG YOUR SKIN",
        title: "Wool blend pleated skirt (gray)",
        originalPrice: 108,
        salePrice: 108,
        discount: 0,
        image: "/pinterest1.jpg",
      },
    ],
  };

  // Section 12: Must-Have Bags on Sale
  const bagsOnSale = {
    heroImages: ["/look2.jpg", "/look5.jpg"],
    items: [
      {
        id: 1001,
        brand: "SIYAZU",
        title: "Siac3053 flow bag_brown",
        originalPrice: 137,
        salePrice: 117,
        discount: 14,
        image: "/drop-1.jpg",
      },
      {
        id: 1002,
        brand: "RAWROW",
        title: "Cordura clip messenger bag 362 [2color]",
        originalPrice: 84,
        salePrice: 75,
        discount: 10,
        image: "/drop-2.jpg",
      },
      {
        id: 1003,
        brand: "ATIL STUDIO",
        title: "Velour suede mini dewy ribbon shoulder & crossbody bag_[black]",
        originalPrice: 73,
        salePrice: 57,
        discount: 21,
        image: "/drop-3.jpg",
      },
      {
        id: 1004,
        brand: "BLACK PURPLE",
        title: "Crease wide boots_black",
        originalPrice: 197,
        salePrice: 178,
        discount: 9,
        image: "/drop-6.jpg",
      },
      {
        id: 1005,
        brand: "SIYAZU",
        title: "Mini leather crossbody bag_tan",
        originalPrice: 95,
        salePrice: 81,
        discount: 15,
        image: "/drop-7.jpg",
      },
      {
        id: 1006,
        brand: "RAWROW",
        title: "Canvas tote bag large [3color]",
        originalPrice: 62,
        salePrice: 53,
        discount: 15,
        image: "/drop-8.jpg",
      },
      {
        id: 1007,
        brand: "ATIL STUDIO",
        title: "Quilted chain shoulder bag_[cream]",
        originalPrice: 89,
        salePrice: 71,
        discount: 20,
        image: "/women-printer-1.jpg",
      },
      {
        id: 1008,
        brand: "BLACK PURPLE",
        title: "Buckle strap ankle boots_brown",
        originalPrice: 178,
        salePrice: 152,
        discount: 15,
        image: "/women-grid-2.jpg",
      },
    ],
  };

  // Section 13: Must-Haves Chosen by Influencers
  const influencerPicks = {
    heroImage: "/look4.jpg",
    items: [
      {
        id: 1101,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens cashmere blend handmade muffler half coat [oatmeal]",
        originalPrice: 176,
        salePrice: 123,
        discount: 30,
        image: "/wtrending1.jpg",
      },
      {
        id: 1102,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens cashmere blend trench coat [taupe]",
        originalPrice: 211,
        salePrice: 201,
        discount: 4,
        image: "/wtrending2.jpg",
      },
      {
        id: 1103,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens cashmere blend balmacaan robe coat [dark brown]",
        originalPrice: 185,
        salePrice: 129,
        discount: 30,
        image: "/wtrending3.jpg",
      },
      {
        id: 1104,
        brand: "MUSINSA STANDARD WOMAN",
        title: "City leisure womens hooded light down jacket [black]",
        originalPrice: 97,
        salePrice: 87,
        discount: 10,
        image: "/wtrending4.jpg",
      },
      {
        id: 1105,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens wool blend single coat [charcoal]",
        originalPrice: 165,
        salePrice: 115,
        discount: 30,
        image: "/wtrending5.jpg",
      },
      {
        id: 1106,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens reversible fleece jacket [ivory/brown]",
        originalPrice: 128,
        salePrice: 96,
        discount: 25,
        image: "/wtrending6.jpg",
      },
      {
        id: 1107,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens wool knit half zip-up [oatmeal]",
        originalPrice: 89,
        salePrice: 67,
        discount: 25,
        image: "/wtrending7.jpg",
      },
      {
        id: 1108,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens padded long vest [black]",
        originalPrice: 112,
        salePrice: 78,
        discount: 30,
        image: "/pinterest2.jpg",
      },
    ],
  };

  // Casual Knit Wears
  const cozyKnit = {
    heroImage: "/drmersclub photo1.jpg",
    items: [
      {
        id: 1201,
        brand: "LEATHERY",
        title: "Cashmere balmacaan robe coat [black]",
        originalPrice: 241,
        salePrice: 193,
        discount: 19,
        image: "/wtrending1.jpg",
      },
      {
        id: 1202,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens cashmere blend trench coat [taupe]",
        originalPrice: 211,
        salePrice: 201,
        discount: 4,
        image: "/wtrending2.jpg",
      },
      {
        id: 1203,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens cashmere blend balmacaan robe coat [dark brown]",
        originalPrice: 185,
        salePrice: 129,
        discount: 30,
        image: "/wtrending3.jpg",
      },
      {
        id: 1204,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens cashmere blend cinched double long coat [black]",
        originalPrice: 202,
        salePrice: 142,
        discount: 29,
        image: "/wtrending4.jpg",
      },
      {
        id: 1205,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens wool blend single breasted coat [oatmeal]",
        originalPrice: 178,
        salePrice: 124,
        discount: 30,
        image: "/wtrending5.jpg",
      },
      {
        id: 1206,
        brand: "LEATHERY",
        title: "Oversized wool blend half coat [charcoal]",
        originalPrice: 195,
        salePrice: 156,
        discount: 20,
        image: "/wtrending6.jpg",
      },
      {
        id: 1207,
        brand: "MUSINSA STANDARD WOMAN",
        title: "Womens padded quilted jacket [ivory]",
        originalPrice: 145,
        salePrice: 101,
        discount: 30,
        image: "/wtrending7.jpg",
      },
      {
        id: 1208,
        brand: "LEATHERY",
        title: "Leather belted trench coat [brown]",
        originalPrice: 268,
        salePrice: 214,
        discount: 20,
        image: "/pinterest1.jpg",
      },
    ],
  };

  // Final Winter Picks
  const finalWinter = {
    heroImages: ["/apparel-finalwinterpicks1.jpg", "/apparel-finalwinterpicks2.jpg"],
    items: [
      {
        id: 1301,
        brand: "DOFFJASON",
        title: "Sherpa a-2 mustang jumper black",
        originalPrice: 169,
        salePrice: 135,
        discount: 20,
        image: "/fall-4.jpg",
      },
      {
        id: 1302,
        brand: "KIIMUIR",
        title: "(women) high neck wool long coat_grey",
        originalPrice: 240,
        salePrice: 240,
        discount: 0,
        image: "/fall-5.jpg",
      },
      {
        id: 1303,
        brand: "NINEZ",
        title: "Soft mock neck muscle knit (2 colors)",
        originalPrice: 42,
        salePrice: 42,
        discount: 0,
        image: "/feed-8.jpg",
      },
      {
        id: 1304,
        brand: "LEATHERY",
        title: "M-65 fish tail oversized long parka [2color]",
        originalPrice: 183,
        salePrice: 146,
        discount: 20,
        image: "/product-8.jpg",
      },
      {
        id: 1305,
        brand: "DOFFJASON",
        title: "Wool blend oversized coat_[navy]",
        originalPrice: 198,
        salePrice: 158,
        discount: 20,
        image: "/product-9.jpg",
      },
      {
        id: 1306,
        brand: "KIIMUIR",
        title: "Cashmere blend turtleneck sweater_[cream]",
        originalPrice: 156,
        salePrice: 156,
        discount: 0,
        image: "/trend-9.jpg",
      },
      {
        id: 1307,
        brand: "NINEZ",
        title: "Relaxed fit cotton hoodie (3 colors)",
        originalPrice: 58,
        salePrice: 58,
        discount: 0,
        image: "/pinterest2.jpg",
      },
      {
        id: 1308,
        brand: "LEATHERY",
        title: "Shearling collar leather jacket [black]",
        originalPrice: 295,
        salePrice: 236,
        discount: 20,
        image: "/pinterest3.jpg",
      },
    ],
  };

  // Bestsellers Data (12 items for 2 slides)
  const bestsellers = [
    {
      id: 1,
      brand: "ZARA",
      title: "Cropped Fringe Jacket",
      originalPrice: 89900,
      salePrice: 62930,
      discount: 30,
      image: "/drop-1.jpg",
      likes: 126,
      reviews: 4865,
    },
    {
      id: 2,
      brand: "MANGO",
      title: "Leather Wide Pants",
      originalPrice: 129900,
      salePrice: 97425,
      discount: 25,
      image: "/drop-2.jpg",
      likes: 156,
      reviews: 4916,
    },
    {
      id: 3,
      brand: "COS",
      title: "Wide Tuck Pants",
      originalPrice: 109900,
      salePrice: 87920,
      discount: 20,
      image: "/drop-3.jpg",
      likes: 65,
      reviews: 474,
    },
    {
      id: 4,
      brand: "H&M",
      title: "Fitted Knit Top",
      originalPrice: 39900,
      salePrice: 25935,
      discount: 35,
      image: "/drop-6.jpg",
      likes: 186,
      reviews: 4819,
    },
    {
      id: 5,
      brand: "UNIQLO",
      title: "Cargo Detail Pants",
      originalPrice: 59900,
      salePrice: 50915,
      discount: 15,
      image: "/drop-7.jpg",
      likes: 74,
      reviews: 4975,
    },
    {
      id: 6,
      brand: "PULL&BEAR",
      title: "Half Storm Jumper",
      originalPrice: 64900,
      salePrice: 46728,
      discount: 28,
      image: "/drop-8.jpg",
      likes: 109,
      reviews: 4649,
    },
    {
      id: 7,
      brand: "MASSIMO DUTTI",
      title: "Oversized Leather Coat",
      originalPrice: 249900,
      salePrice: 169932,
      discount: 32,
      image: "/women-printer-1.jpg",
      likes: 212,
      reviews: 3865,
    },
    {
      id: 8,
      brand: "BERSHKA",
      title: "Wind Detail Screenshot",
      originalPrice: 49900,
      salePrice: 38922,
      discount: 22,
      image: "/women-grid-1.jpg",
      likes: 89,
      reviews: 2847,
    },
    {
      id: 9,
      brand: "STRADIVARUIS",
      title: "Cropped Denim Jumper",
      originalPrice: 79900,
      salePrice: 59128,
      discount: 26,
      image: "/women-grid-4.jpg",
      likes: 134,
      reviews: 3756,
    },
    {
      id: 10,
      brand: "ZARA",
      title: "Destroyed Knit Top",
      originalPrice: 59900,
      salePrice: 49118,
      discount: 18,
      image: "/women-grid-5.jpg",
      likes: 95,
      reviews: 2934,
    },
    {
      id: 11,
      brand: "ARKET",
      title: "Hooded Cashmere Sweater",
      originalPrice: 189900,
      salePrice: 132930,
      discount: 30,
      image: "/women-grid-3.jpg",
      likes: 167,
      reviews: 4123,
    },
    {
      id: 12,
      brand: "WEEKDAY",
      title: "High Waist Denim",
      originalPrice: 89900,
      salePrice: 68322,
      discount: 24,
      image: "/apparel6.jpg",
      likes: 203,
      reviews: 5298,
    },
  ];

  const newDrops = [
    {
      id: 101,
      brand: "ZARA",
      title: "Cropped Tweed Jacket",
      originalPrice: 109900,
      salePrice: 87920,
      discount: 20,
      image: "/drop-1.jpg",
      likes: 84,
      reviews: 312,
    },
    {
      id: 102,
      brand: "MANGO",
      title: "Pleated Wide Skirt",
      originalPrice: 79900,
      salePrice: 67915,
      discount: 15,
      image: "/drop-2.jpg",
      likes: 56,
      reviews: 178,
    },
    {
      id: 103,
      brand: "COS",
      title: "Oversized Cotton Shirt",
      originalPrice: 89900,
      salePrice: 71920,
      discount: 20,
      image: "/drop-3.jpg",
      likes: 112,
      reviews: 421,
    },
    {
      id: 104,
      brand: "H&M",
      title: "Soft Knit Cardigan",
      originalPrice: 49900,
      salePrice: 39920,
      discount: 20,
      image: "/drop-6.jpg",
      likes: 64,
      reviews: 205,
    },
    {
      id: 105,
      brand: "UNIQLO",
      title: "Utility Wide Pants",
      originalPrice: 59900,
      salePrice: 50915,
      discount: 15,
      image: "/drop-7.jpg",
      likes: 91,
      reviews: 344,
    },
    {
      id: 106,
      brand: "PULL&BEAR",
      title: "Half Zip Sweatshirt",
      originalPrice: 64900,
      salePrice: 51840,
      discount: 20,
      image: "/drop-8.jpg",
      likes: 73,
      reviews: 189,
    },
  ];

  // Wishlist state
  const [wishlist, setWishlist] = useState<number[]>([]);
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Auto-slide promo banner
  useEffect(() => {
    bannerAutoRef.current = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % promoBanners.length);
    }, 6000);
    return () => {
      if (bannerAutoRef.current) clearInterval(bannerAutoRef.current);
    };
  }, [promoBanners.length]);

  const prevBanner = () => {
    setBannerIndex((prev) => (prev - 1 + promoBanners.length) % promoBanners.length);
  };

  const nextBanner = () => {
    setBannerIndex((prev) => (prev + 1) % promoBanners.length);
  };

  // LECYTO countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Gift Picks scroll
  const scrollGiftLeft = () => {
    giftScrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollGiftRight = () => {
    giftScrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  // Generic scroll helpers
  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Section 1: Promotional Banner Carousel */}
      <section className="pt-4 pb-8 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto relative">
          {/* Banner Grid - 3 cards side by side */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
            >
              {promoBanners.map((group, groupIdx) => (
                <div key={groupIdx} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-3 gap-3">
                    {group.map((banner) => (
                      <Link
                        key={banner.id}
                        href="#"
                        className="group relative block aspect-[4/3] overflow-hidden"
                      >
                        <Image
                          src={banner.image}
                          alt={banner.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Dark gradient overlay at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        {/* Text overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                          <h3 className="text-lg md:text-xl font-bold leading-tight mb-1">
                            {banner.title}
                          </h3>
                          <p className="text-xs text-white/70 font-medium">
                            {banner.brands}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Left/Right Navigation Arrows */}
            <button
              onClick={prevBanner}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
            >
              <span className="text-gray-800 text-lg">‹</span>
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
            >
              <span className="text-gray-800 text-lg">›</span>
            </button>
          </div>

          {/* Slide Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {promoBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setBannerIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  bannerIndex === idx
                    ? "bg-black w-6"
                    : "bg-gray-300 w-1.5 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Drops Section */}
      <section className="py-8 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="text-2xl font-normal">New Drops</h2>
            <Link
              href="#"
              className="text-xs text-gray-500 hover:text-black transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {newDrops.map((item) => (
              <Link key={item.id} href="#" className="group block">
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(item.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                  >
                    {wishlist.includes(item.id) ? "❤️" : "♡"}
                  </button>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 font-medium">
                    {item.brand}
                  </p>
                  <h3 className="text-sm font-normal line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-red-600">
                      {item.discount}%
                    </span>
                    <span className="text-sm font-bold">
                      {item.salePrice.toLocaleString()}원
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 line-through">
                    {item.originalPrice.toLocaleString()}원
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs text-gray-500">
                      ♡ {item.likes}
                    </span>
                    <span className="text-xs text-gray-500">
                      ★ {item.reviews.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Valentine's Gift Picks - Horizontal Scroll */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Title */}
          <h2 className="text-2xl font-normal mb-8">
            Valentine&apos;s Gift Picks
          </h2>

          {/* Scrollable Product Row */}
          <div className="relative group/scroll">
            <div
              ref={giftScrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {giftPicks.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[220px] md:w-[260px] block"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge */}
                    <span className="absolute bottom-3 left-3 bg-black text-white text-[10px] font-semibold px-2 py-1 rounded-sm">
                      {item.badge}
                    </span>

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">
                      {item.brand}
                    </p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>

                    {/* Price Row */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">
                        {item.discount}%
                      </span>
                      <span className="text-sm font-bold">
                        ${item.salePrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">
                      ${item.originalPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Scroll Arrow - Right */}
            <button
              onClick={scrollGiftRight}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>

            {/* Scroll Arrow - Left */}
            <button
              onClick={scrollGiftLeft}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: MUSINSA STANDARD Weekly Special */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-8">
            Brands You&apos;ll Love
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {weeklySpecial.map((item) => (
              <Link key={item.id} href="#" className="group block">
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-4">
                  <Image
                    src={item.image}
                    alt={item.brand}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                <p className="text-sm text-gray-500 mt-0.5">{item.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Casual Knit Wears */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-6">
            Casual Knit Wears
          </h2>

          {/* Hero Banner */}
          <div className="relative w-full aspect-[21/9] overflow-hidden mb-8">
            <Image
              src={cozyKnit.heroImage}
              alt="Casual Knit Wears"
              fill
              className="object-cover"
            />
          </div>

          {/* Product Row */}
          <div className="relative group/scroll">
            <div
              ref={cozyKnitRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cozyKnit.items.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[220px] md:w-[260px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">
                        {item.discount}%
                      </span>
                      <span className="text-sm font-bold">
                        ${item.salePrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">
                      ${item.originalPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scrollRight(cozyKnitRef)}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(cozyKnitRef)}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Final Winter Picks */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-6">
            Final Winter Picks
          </h2>

          {/* Hero Banners - Two Cards */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={finalWinter.heroImages[0]}
                alt="Final Winter Picks 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={finalWinter.heroImages[1]}
                alt="Final Winter Picks 2"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Row */}
          <div className="relative group/scroll">
            <div
              ref={finalWinterRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {finalWinter.items.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[220px] md:w-[260px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>
                    {item.discount > 0 ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-red-600">
                            {item.discount}%
                          </span>
                          <span className="text-sm font-bold">
                            ${item.salePrice}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 line-through">
                          ${item.originalPrice}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-bold pt-1">
                        ${item.salePrice}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scrollRight(finalWinterRef)}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(finalWinterRef)}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: The Season Finale - Up to 70% off */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-8">
            The Season Finale: Up to 70% off
          </h2>

          <div className="relative group/scroll">
            <div
              ref={seasonFinaleRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {seasonFinale.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[220px] md:w-[260px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badge */}
                    <span className="absolute bottom-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm">
                      {item.badge}
                    </span>
                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">
                        {item.discount}%
                      </span>
                      <span className="text-sm font-bold">
                        ${item.salePrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">
                      ${item.originalPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Scroll Arrow */}
            <button
              onClick={() => scrollRight(seasonFinaleRef)}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(seasonFinaleRef)}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          {/* Shop Now Button */}
          <div className="flex justify-center mt-8">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Valentine's Styling Picks */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-8">
            Valentine&apos;s Styling Picks
          </h2>

          <div className="relative group/scroll">
            <div
              ref={valentineStylingRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {valentineStyling.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[220px] md:w-[260px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">
                        {item.discount}%
                      </span>
                      <span className="text-sm font-bold">
                        ${item.salePrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">
                      ${item.originalPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Scroll Arrow */}
            <button
              onClick={() => scrollRight(valentineStylingRef)}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(valentineStylingRef)}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          {/* Shop Now Button */}
          <div className="flex justify-center mt-8">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: The Hottest Brands in Seoul */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-8">
            The Hottest Brands in Seoul
          </h2>

          <div className="relative group/scroll">
            <div
              ref={hottestBrandsRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {hottestBrands.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[calc(33.333%-11px)] min-w-[280px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-4">
                    <Image
                      src={item.image}
                      alt={item.brand}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{item.subtitle}</p>
                </Link>
              ))}
            </div>

            {/* Scroll Arrow */}
            <button
              onClick={() => scrollRight(hottestBrandsRef)}
              className="absolute right-0 top-[40%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(hottestBrandsRef)}
              className="absolute left-0 top-[40%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 7: LECYTO Extra 20% */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-6">
            LECYTO: Extra 20%
          </h2>

          {/* Countdown Timer Bar */}
          <div className="flex justify-center items-center py-3 mb-8 border-t border-b border-gray-200">
            <span className="text-sm text-gray-500 mr-2">Ends in</span>
            <span className="text-sm font-bold text-black">
              {String(countdown.hours).padStart(2, "0")}:
              {String(countdown.minutes).padStart(2, "0")}:
              {String(countdown.seconds).padStart(2, "0")}
            </span>
          </div>

          <div className="relative group/scroll">
            <div
              ref={lecytoRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {lecytoItems.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[180px] md:w-[200px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badge */}
                    <span className="absolute bottom-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm">
                      {item.badge}
                    </span>
                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">
                        {item.discount}%
                      </span>
                      <span className="text-sm font-bold">
                        ${item.salePrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">
                      ${item.originalPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Scroll Arrow */}
            <button
              onClick={() => scrollRight(lecytoRef)}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(lecytoRef)}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          {/* View Brand Page Button */}
          <div className="flex justify-center mt-8">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              View Brand Page
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: K-Star Picks */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-8">K-Star Picks</h2>

          <div className="relative group/scroll">
            <div
              ref={kstarRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {kstarPicks.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[220px] md:w-[260px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">
                        {item.discount}%
                      </span>
                      <span className="text-sm font-bold">
                        ${item.salePrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">
                      ${item.originalPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scrollRight(kstarRef)}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(kstarRef)}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: POP-UP IN TOKYO : WINTER I */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-6">
            POP-UP IN TOKYO : WINTER I - 冬の私
          </h2>

          {/* Hero Banner */}
          <div className="relative w-full aspect-[21/9] overflow-hidden  mb-8">
            <Image
              src={tokyoPopup.heroImage}
              alt="POP-UP IN TOKYO"
              fill
              className="object-cover"
            />
          </div>

          {/* Product Row */}
          <div className="relative group/scroll">
            <div
              ref={tokyoPopupRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {tokyoPopup.items.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[220px] md:w-[260px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">
                        {item.discount}%
                      </span>
                      <span className="text-sm font-bold">
                        ${item.salePrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">
                      ${item.originalPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scrollRight(tokyoPopupRef)}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(tokyoPopupRef)}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Section 10: Editor's Pick */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-6">
            Editor&apos;s Pick: Jacquard Knit Zip-Up Cardigan
          </h2>

          {/* Hero Banner */}
          <div className="relative w-full aspect-[21/9] overflow-hidden  mb-8">
            <Image
              src={editorsPick.heroImage}
              alt="Editor's Pick"
              fill
              className="object-cover"
            />
          </div>

          {/* Product Row */}
          <div className="relative group/scroll">
            <div
              ref={editorsPickRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {editorsPick.items.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[220px] md:w-[260px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">
                        {item.discount}%
                      </span>
                      <span className="text-sm font-bold">
                        ${item.salePrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">
                      ${item.originalPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scrollRight(editorsPickRef)}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(editorsPickRef)}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Section 11: A girl lost in love. */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal italic mb-6">
            A girl lost in love.
          </h2>

          {/* Hero Banner */}
          <div className="relative w-full aspect-[21/9] overflow-hidden  mb-8">
            <Image
              src={girlLove.heroImage}
              alt="A girl lost in love"
              fill
              className="object-cover"
            />
          </div>

          {/* Product Row */}
          <div className="relative group/scroll">
            <div
              ref={girlLoveRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {girlLove.items.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[220px] md:w-[260px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>
                    {item.discount > 0 ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-red-600">
                            {item.discount}%
                          </span>
                          <span className="text-sm font-bold">
                            ${item.salePrice}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 line-through">
                          ${item.originalPrice}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-bold pt-1">
                        ${item.salePrice}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scrollRight(girlLoveRef)}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(girlLoveRef)}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Section 12: Must-Have Bags on Sale */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-6">
            Must-Have Bags on Sale
          </h2>

          {/* Hero Banners - Two Cards */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={bagsOnSale.heroImages[0]}
                alt="Must-Have Bags on Sale 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={bagsOnSale.heroImages[1]}
                alt="Must-Have Bags on Sale 2"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Row */}
          <div className="relative group/scroll">
            <div
              ref={bagsOnSaleRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {bagsOnSale.items.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[220px] md:w-[260px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">
                        {item.discount}%
                      </span>
                      <span className="text-sm font-bold">
                        ${item.salePrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">
                      ${item.originalPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scrollRight(bagsOnSaleRef)}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(bagsOnSaleRef)}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Section 13: Must-Haves Chosen by Influencers */}
      <section className="py-10 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-normal mb-6">
            Must-Haves Chosen by Influencers
          </h2>

          {/* Hero Banner */}
          <div className="relative w-full aspect-[16/9] overflow-hidden  mb-8">
            <Image
              src={influencerPicks.heroImage}
              alt="Must-Haves Chosen by Influencers"
              fill
              className="object-cover"
            />
          </div>

          {/* Product Row */}
          <div className="relative group/scroll">
            <div
              ref={influencerRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {influencerPicks.items.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="group flex-shrink-0 w-[220px] md:w-[260px] block"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden  mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <span className={wishlist.includes(item.id) ? "text-red-500" : "text-gray-400"}>
                        {wishlist.includes(item.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                    <h3 className="text-sm font-normal line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">
                        {item.discount}%
                      </span>
                      <span className="text-sm font-bold">
                        ${item.salePrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">
                      ${item.originalPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scrollRight(influencerRef)}
              className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">›</span>
            </button>
            <button
              onClick={() => scrollLeft(influencerRef)}
              className="absolute left-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity z-10"
            >
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="#"
              className="inline-flex items-center px-8 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Product Grid Section (Musinsa Style) */}
      <section className="py-8 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-6 py-5 border-b border-gray-200">
            <div className="flex gap-8">
              <button className="text-base hover:text-black transition-colors flex items-center gap-2 font-normal">
                Product <span className="text-xs">▼</span>
              </button>
              <button className="text-base hover:text-black transition-colors flex items-center gap-2 font-normal">
                Size <span className="text-xs">▼</span>
              </button>
              <button className="text-base hover:text-black transition-colors flex items-center gap-2 font-normal">
                Color <span className="text-xs">▼</span>
              </button>
            </div>
            <button className="text-base text-black hover:opacity-70 transition-opacity flex items-center gap-2 font-normal">
              Sort by: Popular <span className="text-xs">▼</span>
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bestsellers.map((item) => (
              <Link
                key={item.id}
                href="#"
                className="group block"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(item.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                  >
                    {wishlist.includes(item.id) ? "❤️" : "♡"}
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 font-medium">
                    {item.brand}
                  </p>
                  <h3 className="text-sm font-normal line-clamp-1">
                    {item.title}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-red-600">
                      {item.discount}%
                    </span>
                    <span className="text-sm font-bold">
                      {item.salePrice.toLocaleString()}원
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-400 line-through">
                    {item.originalPrice.toLocaleString()}원
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs text-gray-500">
                      ♡ {item.likes}
                    </span>
                    <span className="text-xs text-gray-500">
                      ★ {item.reviews.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}