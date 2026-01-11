// lib/toneProfiles.ts
import { SeasonToneProfile } from "./types";

/**
 * Database of all 12 seasonal tone profiles
 * Each profile contains:
 * - Identification ranges for matching
 * - Color palette recommendations
 * - Celebrity examples (women / men)
 * - Tone attributes
 */
export const TONE_PROFILES: SeasonToneProfile[] = [
  // SPRING FAMILY
  {
    id: "bright-spring",
    label: "Bright Spring",
    description: "Clear, warm, and vibrant with high contrast",
    attributes: {
      undertone: "warm",
      depth: "medium",
      brightness: "bright",
    },
    hueRange: [15, 45],
    saturationRange: [0.6, 0.9],
    brightnessRange: [0.5, 0.75],
    contrastRange: [0.5, 0.8],
    palette: {
      makeup: {
        lips: [
          { hex: "#FF6B6B", label: "coral red" },
          { hex: "#FF8C94", label: "bright coral" },
          { hex: "#E63946", label: "true red" },
        ],
        blush: [
          { hex: "#FF9AA2", label: "peachy pink" },
          { hex: "#FFB6B9", label: "warm coral" },
        ],
        contour: [
          { hex: "#C4A57B", label: "warm taupe" },
          { hex: "#D4A574", label: "golden bronze" },
        ],
        highlight: [
          { hex: "#FFE5B4", label: "champagne gold" },
          { hex: "#FFDAB9", label: "warm peach" },
        ],
        eyeshadow: [
          { hex: "#8B6F47", label: "warm bronze" },
          { hex: "#CD853F", label: "golden brown" },
          { hex: "#F4A460", label: "sandy gold" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#FF6B35", label: "bright orange" },
          { hex: "#FFD23F", label: "golden yellow" },
          { hex: "#4ECDC4", label: "turquoise" },
        ],
        bottoms: [
          { hex: "#FFE66D", label: "bright yellow" },
          { hex: "#FF99C8", label: "hot pink" },
          { hex: "#2A9D8F", label: "teal" },
        ],
        outerwear: [
          { hex: "#E63946", label: "true red" },
          { hex: "#457B9D", label: "clear blue" },
        ],
      },
      avoid: [
        { hex: "#708090", label: "dusty gray" },
        { hex: "#8B7D6B", label: "muted taupe" },
        { hex: "#2F4F4F", label: "dark slate" },
      ],
    },
    celebritiesWomen: [
      "Emma Stone",
      "Amy Adams",
      "Amanda Seyfried",
      "Suzy (Bae Suzy)",
      "Sana (TWICE)",
      "Hyeri (Lee Hye-ri)",
    ],
    celebritiesMen: [
      "Chris Pine",
      "Eddie Redmayne",
      "Lee Minho",
      "Park Hyungsik",
      "Song Kang",
      "Kento Yamazaki",
    ],
  },
  {
    id: "warm-spring",
    label: "Warm Spring",
    description: "Golden, peachy, and warm with medium contrast",
    attributes: {
      undertone: "warm",
      depth: "medium",
      brightness: "medium",
    },
    hueRange: [20, 50],
    saturationRange: [0.5, 0.8],
    brightnessRange: [0.5, 0.8],
    contrastRange: [0.3, 0.6],
    palette: {
      makeup: {
        lips: [
          { hex: "#E07A5F", label: "terracotta" },
          { hex: "#F4978E", label: "peach" },
          { hex: "#D4756C", label: "warm coral" },
        ],
        blush: [
          { hex: "#FBBFB0", label: "warm peach" },
          { hex: "#F8AD9D", label: "apricot" },
        ],
        contour: [
          { hex: "#C19A6B", label: "camel" },
          { hex: "#B8956A", label: "warm tan" },
        ],
        highlight: [
          { hex: "#FFE4C4", label: "bisque" },
          { hex: "#FFDEAD", label: "warm cream" },
        ],
        eyeshadow: [
          { hex: "#A0826D", label: "warm taupe" },
          { hex: "#BC8F8F", label: "rosy brown" },
          { hex: "#CD9575", label: "copper" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#E76F51", label: "burnt sienna" },
          { hex: "#F4A259", label: "golden orange" },
          { hex: "#E9C46A", label: "warm yellow" },
        ],
        bottoms: [
          { hex: "#D4A373", label: "camel" },
          { hex: "#BC6C25", label: "rust" },
          { hex: "#8B7355", label: "warm brown" },
        ],
        outerwear: [
          { hex: "#A0826D", label: "warm taupe" },
          { hex: "#6A994E", label: "moss green" },
        ],
      },
      avoid: [
        { hex: "#000000", label: "black" },
        { hex: "#4A4A4A", label: "cool gray" },
        { hex: "#6B5B95", label: "purple" },
      ],
    },
    celebritiesWomen: [
      "Jessica Alba",
      "Mandy Moore",
      "Drew Barrymore",
      "IU (Lee Ji-eun)",
      "Yeri (Kim Ye-rim)",
      "Park Minyoung",
    ],
    celebritiesMen: [
      "Matthew McConaughey",
      "Ryan Gosling",
      "Gong Yoo",
      "Park Seojoon",
      "Jung Haein",
      "Liu Haoran",
    ],
  },
  {
    id: "light-spring",
    label: "Light Spring",
    description: "Light, warm, and delicate with low contrast",
    attributes: {
      undertone: "warm",
      depth: "light",
      brightness: "bright",
    },
    hueRange: [25, 55],
    saturationRange: [0.4, 0.7],
    brightnessRange: [0.65, 0.9],
    contrastRange: [0.2, 0.5],
    palette: {
      makeup: {
        lips: [
          { hex: "#FFB6C1", label: "light pink" },
          { hex: "#FFCBA4", label: "peach cream" },
          { hex: "#F4B5BD", label: "soft coral" },
        ],
        blush: [
          { hex: "#FFD9E0", label: "baby pink" },
          { hex: "#FFDFD3", label: "soft peach" },
        ],
        contour: [
          { hex: "#D4B896", label: "soft tan" },
          { hex: "#E8D5C4", label: "light taupe" },
        ],
        highlight: [
          { hex: "#FFF8DC", label: "cornsilk" },
          { hex: "#FFFACD", label: "lemon chiffon" },
        ],
        eyeshadow: [
          { hex: "#D2B48C", label: "tan" },
          { hex: "#DEB887", label: "burlywood" },
          { hex: "#F5DEB3", label: "wheat" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#FFE4B5", label: "peach" },
          { hex: "#FFD700", label: "light gold" },
          { hex: "#87CEEB", label: "sky blue" },
        ],
        bottoms: [
          { hex: "#F5DEB3", label: "wheat" },
          { hex: "#FFE4E1", label: "misty rose" },
          { hex: "#B0E0E6", label: "powder blue" },
        ],
        outerwear: [
          { hex: "#DDA15E", label: "light camel" },
          { hex: "#90EE90", label: "light green" },
        ],
      },
      avoid: [
        { hex: "#000000", label: "black" },
        { hex: "#4B0082", label: "indigo" },
        { hex: "#2F4F4F", label: "dark slate" },
      ],
    },
    celebritiesWomen: [
      "Blake Lively",
      "Gwyneth Paltrow",
      "Taylor Swift",
      "Taeyeon (Kim Taeyeon)",
      "Yoona (Im Yoona)",
      "Sakura Miyawaki",
    ],
    celebritiesMen: [
      "Tom Hiddleston",
      "Timothée Chalamet",
      "Cha Eunwoo",
      "Jin (Kim Seokjin)",
      "Kentaro Sakaguchi",
      "Dylan Wang (Wang Hedi)",
    ],
  },

  // SUMMER FAMILY
  {
    id: "light-summer",
    label: "Light Summer",
    description: "Cool, light, and soft with low contrast",
    attributes: {
      undertone: "cool",
      depth: "light",
      brightness: "soft",
    },
    hueRange: [180, 240],
    saturationRange: [0.3, 0.6],
    brightnessRange: [0.65, 0.9],
    contrastRange: [0.2, 0.4],
    palette: {
      makeup: {
        lips: [
          { hex: "#DDA0DD", label: "soft plum" },
          { hex: "#FFB6D9", label: "cool pink" },
          { hex: "#E6B8CF", label: "mauve pink" },
        ],
        blush: [
          { hex: "#F4C2C2", label: "rose" },
          { hex: "#E6B8CF", label: "soft mauve" },
        ],
        contour: [
          { hex: "#B5A397", label: "cool taupe" },
          { hex: "#C4B5A0", label: "soft gray" },
        ],
        highlight: [
          { hex: "#F5F5F5", label: "soft white" },
          { hex: "#E6E6FA", label: "lavender mist" },
        ],
        eyeshadow: [
          { hex: "#C9A0DC", label: "soft lavender" },
          { hex: "#A9A9A9", label: "cool gray" },
          { hex: "#DDA0DD", label: "plum" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#E6E6FA", label: "lavender" },
          { hex: "#B0C4DE", label: "light steel blue" },
          { hex: "#FFB6D9", label: "cool pink" },
        ],
        bottoms: [
          { hex: "#D8BFD8", label: "thistle" },
          { hex: "#ADD8E6", label: "light blue" },
          { hex: "#F5F5DC", label: "cool beige" },
        ],
        outerwear: [
          { hex: "#778899", label: "light slate" },
          { hex: "#9FA8DA", label: "periwinkle" },
        ],
      },
      avoid: [
        { hex: "#FF6347", label: "tomato red" },
        { hex: "#FF8C00", label: "dark orange" },
        { hex: "#000000", label: "black" },
      ],
    },
    celebritiesWomen: [
      "Naomi Watts",
      "Cate Blanchett",
      "Michelle Pfeiffer",
      "Seo Hyunjin",
      "Lee Sungkyung",
      "Satomi Ishihara",
    ],
    celebritiesMen: [
      "Benedict Cumberbatch",
      "Daniel Radcliffe",
      "Lee Jongsuk",
      "Park Bogum",
      "Kentaro Ito",
      "Hu Yitian",
    ],
  },
  {
    id: "cool-summer",
    label: "Cool Summer",
    description: "Cool, soft, and muted with medium contrast",
    attributes: {
      undertone: "cool",
      depth: "medium",
      brightness: "soft",
    },
    hueRange: [180, 240],
    saturationRange: [0.35, 0.65],
    brightnessRange: [0.5, 0.75],
    contrastRange: [0.3, 0.6],
    palette: {
      makeup: {
        lips: [
          { hex: "#C77A86", label: "dusty rose" },
          { hex: "#B57281", label: "mauve" },
          { hex: "#D291BC", label: "soft raspberry" },
        ],
        blush: [
          { hex: "#E6B8CF", label: "cool rose" },
          { hex: "#D8A3B8", label: "dusty pink" },
        ],
        contour: [
          { hex: "#A89A91", label: "cool taupe" },
          { hex: "#9C8E85", label: "gray taupe" },
        ],
        highlight: [
          { hex: "#E8E5E0", label: "cool ivory" },
          { hex: "#F0EAE4", label: "soft pearl" },
        ],
        eyeshadow: [
          { hex: "#9B9B9B", label: "cool gray" },
          { hex: "#8A7F8D", label: "soft plum" },
          { hex: "#7B8FA3", label: "cool blue" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#9FA8DA", label: "soft blue" },
          { hex: "#CE93D8", label: "orchid" },
          { hex: "#A1887F", label: "cool taupe" },
        ],
        bottoms: [
          { hex: "#B0BEC5", label: "blue gray" },
          { hex: "#D7CCC8", label: "cool sand" },
          { hex: "#90A4AE", label: "slate blue" },
        ],
        outerwear: [
          { hex: "#607D8B", label: "blue gray" },
          { hex: "#8E8E93", label: "cool charcoal" },
        ],
      },
      avoid: [
        { hex: "#FF4500", label: "orange red" },
        { hex: "#FFD700", label: "gold" },
        { hex: "#000000", label: "black" },
      ],
    },
    celebritiesWomen: [
      "Emily Blunt",
      "Jennifer Aniston",
      "Diane Kruger",
      "Song Hye-kyo",
      "Zhang Ziyi",
      "Kyoko Fukada",
    ],
    celebritiesMen: [
      "Jensen Ackles",
      "Henry Cavill",
      "Kim Jae-wook",
      "Takeru Satoh",
      "Wallace Huo",
      "Shim Changmin",
    ],
  },
  {
    id: "soft-summer",
    label: "Soft Summer",
    description: "Muted, cool, and gentle with low contrast",
    attributes: {
      undertone: "cool",
      depth: "medium",
      brightness: "soft",
    },
    hueRange: [170, 230],
    saturationRange: [0.25, 0.55],
    brightnessRange: [0.45, 0.7],
    contrastRange: [0.2, 0.45],
    palette: {
      makeup: {
        lips: [
          { hex: "#C89FA3", label: "muted rose" },
          { hex: "#B8999C", label: "dusty mauve" },
          { hex: "#D4A5A5", label: "soft rose" },
        ],
        blush: [
          { hex: "#D9B5B8", label: "soft pink" },
          { hex: "#C9A9A6", label: "dusty rose" },
        ],
        contour: [
          { hex: "#A89F9A", label: "soft taupe" },
          { hex: "#B5A99C", label: "muted brown" },
        ],
        highlight: [
          { hex: "#E8E2D8", label: "soft cream" },
          { hex: "#F0EBE0", label: "muted ivory" },
        ],
        eyeshadow: [
          { hex: "#A5A3A0", label: "soft gray" },
          { hex: "#9E9289", label: "taupe gray" },
          { hex: "#8B8D7A", label: "sage" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#B0A8B9", label: "soft lavender" },
          { hex: "#A5B6A1", label: "sage green" },
          { hex: "#B9A9A7", label: "dusty mauve" },
        ],
        bottoms: [
          { hex: "#C1B5A8", label: "soft tan" },
          { hex: "#A8A19E", label: "warm gray" },
          { hex: "#9BA09F", label: "pewter" },
        ],
        outerwear: [
          { hex: "#7A7D75", label: "olive gray" },
          { hex: "#8A9597", label: "slate" },
        ],
      },
      avoid: [
        { hex: "#000000", label: "black" },
        { hex: "#FF0000", label: "bright red" },
        { hex: "#FFA500", label: "orange" },
      ],
    },
    celebritiesWomen: [
      "Sarah Jessica Parker",
      "Meryl Streep",
      "Kate Middleton",
      "Han Hyojoo",
      "Gong Hyojin",
      "Juri Ueno",
    ],
    celebritiesMen: [
      "Mark Ruffalo",
      "Paul Rudd",
      "Ryu Junyeol",
      "Jo Jungseok",
      "Satoshi Tsumabuki",
      "Chen Bolin",
    ],
  },

  // AUTUMN FAMILY
  {
    id: "soft-autumn",
    label: "Soft Autumn",
    description: "Warm, muted, and earthy with low contrast",
    attributes: {
      undertone: "warm",
      depth: "medium",
      brightness: "soft",
    },
    hueRange: [15, 45],
    saturationRange: [0.3, 0.6],
    brightnessRange: [0.4, 0.65],
    contrastRange: [0.2, 0.45],
    palette: {
      makeup: {
        lips: [
          { hex: "#B8715B", label: "terracotta" },
          { hex: "#A8756C", label: "warm brown" },
          { hex: "#C7877A", label: "soft rust" },
        ],
        blush: [
          { hex: "#D4A089", label: "warm peach" },
          { hex: "#C7997B", label: "terracotta" },
        ],
        contour: [
          { hex: "#9A8072", label: "warm taupe" },
          { hex: "#A28E7A", label: "soft bronze" },
        ],
        highlight: [
          { hex: "#F4E6D2", label: "warm cream" },
          { hex: "#E8D7C3", label: "soft gold" },
        ],
        eyeshadow: [
          { hex: "#8B7D6B", label: "warm brown" },
          { hex: "#9B8E7E", label: "khaki" },
          { hex: "#A3896A", label: "bronze" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#A8956B", label: "olive" },
          { hex: "#B5895D", label: "camel" },
          { hex: "#9D8B6C", label: "khaki" },
        ],
        bottoms: [
          { hex: "#8B7355", label: "warm brown" },
          { hex: "#A89F91", label: "taupe" },
          { hex: "#7A6D5C", label: "earth brown" },
        ],
        outerwear: [
          { hex: "#6B5D52", label: "warm charcoal" },
          { hex: "#8B6F47", label: "bronze" },
        ],
      },
      avoid: [
        { hex: "#000000", label: "black" },
        { hex: "#FF1493", label: "hot pink" },
        { hex: "#00FFFF", label: "cyan" },
      ],
    },
    celebritiesWomen: [
      "Gisele Bündchen",
      "Jennifer Lopez",
      "Jessica Biel",
      "Son Yejin",
      "Lee Honey (Honey Lee)",
      "Tang Wei",
    ],
    celebritiesMen: [
      "Javier Bardem",
      "Oscar Isaac",
      "Jung Woosung",
      "Ha Jungwoo",
      "Shun Oguri",
      "Chen Kun",
    ],
  },
  {
    id: "warm-autumn",
    label: "Warm Autumn",
    description: "Rich, warm, and golden with medium contrast",
    attributes: {
      undertone: "warm",
      depth: "medium",
      brightness: "medium",
    },
    hueRange: [15, 50],
    saturationRange: [0.5, 0.8],
    brightnessRange: [0.4, 0.7],
    contrastRange: [0.3, 0.6],
    palette: {
      makeup: {
        lips: [
          { hex: "#C45E3B", label: "rust" },
          { hex: "#D4654E", label: "terracotta" },
          { hex: "#B5573F", label: "warm brown" },
        ],
        blush: [
          { hex: "#E79871", label: "warm peach" },
          { hex: "#D98E6C", label: "bronze" },
        ],
        contour: [
          { hex: "#A67C52", label: "golden bronze" },
          { hex: "#B88A5C", label: "warm tan" },
        ],
        highlight: [
          { hex: "#FFE5B4", label: "champagne" },
          { hex: "#F5DEB3", label: "golden wheat" },
        ],
        eyeshadow: [
          { hex: "#8B6914", label: "dark goldenrod" },
          { hex: "#A0826D", label: "copper" },
          { hex: "#CD853F", label: "peru" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#D2691E", label: "chocolate" },
          { hex: "#B8860B", label: "dark goldenrod" },
          { hex: "#8B4513", label: "saddle brown" },
        ],
        bottoms: [
          { hex: "#D2691E", label: "sienna" },
          { hex: "#A0522D", label: "sienna" },
          { hex: "#8B7D6B", label: "warm taupe" },
        ],
        outerwear: [
          { hex: "#704214", label: "sepia" },
          { hex: "#8B6914", label: "dark gold" },
        ],
      },
      avoid: [
        { hex: "#000000", label: "black" },
        { hex: "#FF1493", label: "deep pink" },
        { hex: "#4169E1", label: "royal blue" },
      ],
    },
    celebritiesWomen: [
      "Julia Roberts",
      "Julianne Moore",
      "Lindsay Lohan",
      "Kim Taehee",
      "Kim Heesun",
      "Maggie Cheung",
    ],
    celebritiesMen: [
      "Gerard Butler",
      "Chris Hemsworth",
      "Yoo Ah In",
      "Ma Dongseok",
      "Hiroshi Abe",
      "Huang Xiaoming",
    ],
  },
  {
    id: "deep-autumn",
    label: "Deep Autumn",
    description: "Rich, warm, and deep with high contrast",
    attributes: {
      undertone: "warm",
      depth: "deep",
      brightness: "medium",
    },
    hueRange: [10, 40],
    saturationRange: [0.5, 0.85],
    brightnessRange: [0.25, 0.55],
    contrastRange: [0.5, 0.8],
    palette: {
      makeup: {
        lips: [
          { hex: "#8B3A3A", label: "deep burgundy" },
          { hex: "#A0522D", label: "sienna" },
          { hex: "#8B4513", label: "saddle brown" },
        ],
        blush: [
          { hex: "#C76856", label: "terracotta" },
          { hex: "#B8735A", label: "warm clay" },
        ],
        contour: [
          { hex: "#6B4423", label: "deep bronze" },
          { hex: "#7A5230", label: "rich brown" },
        ],
        highlight: [
          { hex: "#D4A76A", label: "antique gold" },
          { hex: "#C19A6B", label: "camel" },
        ],
        eyeshadow: [
          { hex: "#654321", label: "dark brown" },
          { hex: "#8B6914", label: "dark gold" },
          { hex: "#556B2F", label: "dark olive" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#8B4513", label: "saddle brown" },
          { hex: "#6B8E23", label: "olive" },
          { hex: "#8B0000", label: "dark red" },
        ],
        bottoms: [
          { hex: "#654321", label: "dark brown" },
          { hex: "#704214", label: "sepia" },
          { hex: "#3B3024", label: "dark taupe" },
        ],
        outerwear: [
          { hex: "#2F1B0C", label: "chocolate" },
          { hex: "#4A2511", label: "espresso" },
        ],
      },
      avoid: [
        { hex: "#E6E6FA", label: "lavender" },
        { hex: "#FFB6C1", label: "light pink" },
        { hex: "#B0C4DE", label: "light blue" },
      ],
    },
    celebritiesWomen: [
      "Halle Berry",
      "Kim Kardashian",
      "Eva Mendes",
      "Jun Jihyun (Gianna Jun)",
      "Liu Wen",
      "Aishwarya Rai",
    ],
    celebritiesMen: [
      "Idris Elba",
      "Robert Downey Jr.",
      "Lee Byunghun",
      "Ji Changwook",
      "Takeshi Kaneshiro",
      "Daniel Wu",
    ],
  },

  // WINTER FAMILY
  {
    id: "bright-winter",
    label: "Bright Winter",
    description: "Cool, bright, and clear with high contrast",
    attributes: {
      undertone: "cool",
      depth: "medium",
      brightness: "bright",
    },
    hueRange: [180, 270],
    saturationRange: [0.65, 0.95],
    brightnessRange: [0.45, 0.75],
    contrastRange: [0.6, 0.9],
    palette: {
      makeup: {
        lips: [
          { hex: "#DC143C", label: "crimson" },
          { hex: "#FF1493", label: "deep pink" },
          { hex: "#C71585", label: "medium violet red" },
        ],
        blush: [
          { hex: "#FF69B4", label: "hot pink" },
          { hex: "#FF6EB4", label: "bright pink" },
        ],
        contour: [
          { hex: "#8B7D7B", label: "cool brown" },
          { hex: "#9E8B8E", label: "cool taupe" },
        ],
        highlight: [
          { hex: "#F8F8FF", label: "ghost white" },
          { hex: "#E6E6FA", label: "lavender" },
        ],
        eyeshadow: [
          { hex: "#4B0082", label: "indigo" },
          { hex: "#8B008B", label: "dark magenta" },
          { hex: "#483D8B", label: "dark slate blue" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#0000FF", label: "blue" },
          { hex: "#FF00FF", label: "magenta" },
          { hex: "#00FFFF", label: "cyan" },
        ],
        bottoms: [
          { hex: "#000080", label: "navy" },
          { hex: "#800080", label: "purple" },
          { hex: "#008B8B", label: "dark cyan" },
        ],
        outerwear: [
          { hex: "#000000", label: "black" },
          { hex: "#191970", label: "midnight blue" },
        ],
      },
      avoid: [
        { hex: "#FFA500", label: "orange" },
        { hex: "#FFD700", label: "gold" },
        { hex: "#D2691E", label: "chocolate" },
      ],
    },
    celebritiesWomen: [
      "Megan Fox",
      "Anne Hathaway",
      "Zooey Deschanel",
      "Krystal Jung",
      "Lisa (Lalisa Manoban)",
      "Fan Bingbing",
    ],
    celebritiesMen: [
      "Adam Lambert",
      "Cillian Murphy",
      "Lee Joongi",
      "Kim Jaejoong",
      "Miyavi",
      "Kris Wu",
    ],
  },
  {
    id: "cool-winter",
    label: "Cool Winter",
    description: "Icy cool with intense contrast and clarity",
    attributes: {
      undertone: "cool",
      depth: "medium",
      brightness: "bright",
    },
    hueRange: [190, 270],
    saturationRange: [0.6, 0.9],
    brightnessRange: [0.4, 0.7],
    contrastRange: [0.55, 0.85],
    palette: {
      makeup: {
        lips: [
          { hex: "#B22222", label: "fire brick" },
          { hex: "#DC143C", label: "crimson" },
          { hex: "#8B1A1A", label: "deep red" },
        ],
        blush: [
          { hex: "#DB7093", label: "pale violet red" },
          { hex: "#C71585", label: "cool pink" },
        ],
        contour: [
          { hex: "#696969", label: "dim gray" },
          { hex: "#808080", label: "gray" },
        ],
        highlight: [
          { hex: "#F0F8FF", label: "alice blue" },
          { hex: "#F5F5F5", label: "white smoke" },
        ],
        eyeshadow: [
          { hex: "#2F4F4F", label: "dark slate gray" },
          { hex: "#483D8B", label: "dark slate blue" },
          { hex: "#663399", label: "rebecca purple" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#4169E1", label: "royal blue" },
          { hex: "#8A2BE2", label: "blue violet" },
          { hex: "#FF1493", label: "deep pink" },
        ],
        bottoms: [
          { hex: "#191970", label: "midnight blue" },
          { hex: "#000080", label: "navy" },
          { hex: "#2F4F4F", label: "dark slate" },
        ],
        outerwear: [
          { hex: "#000000", label: "black" },
          { hex: "#1C1C1C", label: "charcoal" },
        ],
      },
      avoid: [
        { hex: "#FF8C00", label: "dark orange" },
        { hex: "#FFD700", label: "gold" },
        { hex: "#8B4513", label: "saddle brown" },
      ],
    },
    celebritiesWomen: [
      "Liv Tyler",
      "Courteney Cox",
      "Sandra Bullock",
      "Son Naeun",
      "Liu Shishi",
      "Yui Aragaki",
    ],
    celebritiesMen: [
      "Keanu Reeves",
      "David Tennant",
      "G-Dragon (Kwon Jiyong)",
      "T.O.P (Choi Seunghyun)",
      "Tomohisa Yamashita",
      "Zhang Han",
    ],
  },
  {
    id: "deep-winter",
    label: "Deep Winter",
    description: "Deep, cool, and dramatic with very high contrast",
    attributes: {
      undertone: "cool",
      depth: "deep",
      brightness: "bright",
    },
    hueRange: [200, 280],
    saturationRange: [0.6, 0.9],
    brightnessRange: [0.2, 0.5],
    contrastRange: [0.65, 0.95],
    palette: {
      makeup: {
        lips: [
          { hex: "#8B0000", label: "dark red" },
          { hex: "#800020", label: "burgundy" },
          { hex: "#6A0DAD", label: "deep purple" },
        ],
        blush: [
          { hex: "#C71585", label: "medium violet red" },
          { hex: "#9932CC", label: "dark orchid" },
        ],
        contour: [
          { hex: "#483C32", label: "taupe" },
          { hex: "#5C4033", label: "dark taupe" },
        ],
        highlight: [
          { hex: "#E6E6FA", label: "lavender" },
          { hex: "#D8BFD8", label: "thistle" },
        ],
        eyeshadow: [
          { hex: "#191970", label: "midnight blue" },
          { hex: "#4B0082", label: "indigo" },
          { hex: "#800080", label: "purple" },
        ],
      },
      clothing: {
        tops: [
          { hex: "#000080", label: "navy" },
          { hex: "#8B008B", label: "dark magenta" },
          { hex: "#006400", label: "dark green" },
        ],
        bottoms: [
          { hex: "#000000", label: "black" },
          { hex: "#2F4F4F", label: "dark slate" },
          { hex: "#191970", label: "midnight blue" },
        ],
        outerwear: [
          { hex: "#000000", label: "black" },
          { hex: "#1C1C1C", label: "charcoal" },
        ],
      },
      avoid: [
        { hex: "#FFA500", label: "orange" },
        { hex: "#FFD700", label: "gold" },
        { hex: "#F5DEB3", label: "wheat" },
      ],
    },
    celebritiesWomen: [
      "Lucy Liu",
      "Krysten Ritter",
      "Demi Moore",
      "CL (Lee Chaerin)",
      "Jennie (Jennie Kim)",
      "Li Yuchun (Chris Lee)",
    ],
    celebritiesMen: [
      "Benedict Wong",
      "Jason Momoa",
      "Lee Dongwook",
      "Kim Woobin",
      "Rami Malek",
      "Ken Watanabe",
    ],
  },
];

/**
 * Helper function to get a tone profile by ID
 */
export function getToneProfileById(id: string): SeasonToneProfile | undefined {
  return TONE_PROFILES.find((profile) => profile.id === id);
}

/**
 * Helper function to get all tone profiles for a specific season
 */
export function getToneProfilesBySeason(
  season: "Spring" | "Summer" | "Autumn" | "Winter"
): SeasonToneProfile[] {
  const seasonMap: Record<string, string[]> = {
    Spring: ["bright-spring", "warm-spring", "light-spring"],
    Summer: ["light-summer", "cool-summer", "soft-summer"],
    Autumn: ["soft-autumn", "warm-autumn", "deep-autumn"],
    Winter: ["bright-winter", "cool-winter", "deep-winter"],
  };

  return TONE_PROFILES.filter((profile) =>
    seasonMap[season]?.includes(profile.id)
  );
}
