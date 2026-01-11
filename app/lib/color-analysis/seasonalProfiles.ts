// 12 Seasonal Color Profiles
// Based on professional color analysis systems

export type SeasonType = 
  | 'Light Spring' | 'Warm Spring' | 'Clear Spring'
  | 'Light Summer' | 'Cool Summer' | 'Soft Summer'
  | 'Soft Autumn' | 'Warm Autumn' | 'Deep Autumn'
  | 'Deep Winter' | 'Cool Winter' | 'Clear Winter';

export interface ColorPalette {
  name: string;
  hex: string;
  category: 'neutral' | 'accent' | 'lipstick' | 'eyeshadow' | 'blush';
}

export interface SeasonalProfile {
  season: SeasonType;
  description: string;
  characteristics: {
    undertone: 'warm' | 'cool' | 'neutral';
    brightness: 'light' | 'medium' | 'deep';
    saturation: 'muted' | 'moderate' | 'vibrant';
    contrast: 'low' | 'medium' | 'high';
  };
  bestColors: ColorPalette[];
  avoidColors: string[];
  makeupRecommendations: {
    lipstick: string[];
    blush: string[];
    eyeshadow: string[];
    eyeliner: string[];
  };
  clothingColors: {
    neutrals: string[];
    accents: string[];
  };
  metals: 'gold' | 'silver' | 'both';
  colorTemperature: number; // -1 (cool) to 1 (warm)
}

export const seasonalProfiles: Record<SeasonType, SeasonalProfile> = {
  'Light Spring': {
    season: 'Light Spring',
    description: 'Warm, light, and fresh with delicate coloring. Your natural lightness is your most dominant feature.',
    characteristics: {
      undertone: 'warm',
      brightness: 'light',
      saturation: 'moderate',
      contrast: 'low',
    },
    bestColors: [
      { name: 'Warm Ivory', hex: '#FFF8E7', category: 'neutral' },
      { name: 'Peach', hex: '#FFE5B4', category: 'accent' },
      { name: 'Coral Pink', hex: '#FF9999', category: 'blush' },
      { name: 'Light Apricot', hex: '#FFCCAA', category: 'lipstick' },
      { name: 'Golden Yellow', hex: '#FFD700', category: 'accent' },
      { name: 'Light Teal', hex: '#88D8C0', category: 'eyeshadow' },
      { name: 'Camel', hex: '#C19A6B', category: 'neutral' },
      { name: 'Warm Taupe', hex: '#B38B6D', category: 'neutral' },
      { name: 'Salmon', hex: '#FA8072', category: 'accent' },
      { name: 'Light Warm Gray', hex: '#D3C5B8', category: 'neutral' },
      { name: 'Peachy Pink', hex: '#FFCBA4', category: 'lipstick' },
      { name: 'Warm Beige', hex: '#E8D5C4', category: 'neutral' },
    ],
    avoidColors: ['Pure black', 'Cool bright colors', 'Dark navy', 'Burgundy'],
    makeupRecommendations: {
      lipstick: ['Peachy nude', 'Coral pink', 'Light apricot', 'Warm rose'],
      blush: ['Peach', 'Coral', 'Warm pink'],
      eyeshadow: ['Warm taupe', 'Peach', 'Golden brown', 'Light teal'],
      eyeliner: ['Brown', 'Warm gray', 'Bronze'],
    },
    clothingColors: {
      neutrals: ['Cream', 'Camel', 'Warm beige', 'Light warm gray'],
      accents: ['Coral', 'Peach', 'Golden yellow', 'Light teal', 'Warm pink'],
    },
    metals: 'gold',
    colorTemperature: 0.7,
  },

  'Warm Spring': {
    season: 'Warm Spring',
    description: 'Warm, vibrant, and golden. Warmth is your most dominant characteristic with golden undertones.',
    characteristics: {
      undertone: 'warm',
      brightness: 'medium',
      saturation: 'vibrant',
      contrast: 'medium',
    },
    bestColors: [
      { name: 'Warm Cream', hex: '#FFF5E1', category: 'neutral' },
      { name: 'Bright Coral', hex: '#FF6B6B', category: 'lipstick' },
      { name: 'Golden Orange', hex: '#FFA500', category: 'accent' },
      { name: 'Warm Red', hex: '#DC143C', category: 'lipstick' },
      { name: 'Golden Yellow', hex: '#FFD700', category: 'accent' },
      { name: 'Turquoise', hex: '#40E0D0', category: 'eyeshadow' },
      { name: 'Warm Brown', hex: '#8B4513', category: 'neutral' },
      { name: 'Terracotta', hex: '#E2725B', category: 'accent' },
      { name: 'Warm Olive', hex: '#808000', category: 'eyeshadow' },
      { name: 'Pumpkin', hex: '#FF7518', category: 'accent' },
      { name: 'Coral Red', hex: '#FF4040', category: 'lipstick' },
      { name: 'Warm Camel', hex: '#C19A6B', category: 'neutral' },
    ],
    avoidColors: ['Black', 'Cool pink', 'Icy blue', 'Purple'],
    makeupRecommendations: {
      lipstick: ['Bright coral', 'Warm red', 'Orange-red', 'Peachy coral'],
      blush: ['Coral', 'Warm peach', 'Terracotta'],
      eyeshadow: ['Warm brown', 'Golden bronze', 'Warm olive', 'Turquoise'],
      eyeliner: ['Warm brown', 'Bronze', 'Terracotta'],
    },
    clothingColors: {
      neutrals: ['Warm cream', 'Camel', 'Warm brown', 'Warm beige'],
      accents: ['Coral', 'Golden yellow', 'Turquoise', 'Warm orange', 'Warm red'],
    },
    metals: 'gold',
    colorTemperature: 0.9,
  },

  'Clear Spring': {
    season: 'Clear Spring',
    description: 'Warm, bright, and clear. High contrast and clarity are your dominant features with warm undertones.',
    characteristics: {
      undertone: 'warm',
      brightness: 'medium',
      saturation: 'vibrant',
      contrast: 'high',
    },
    bestColors: [
      { name: 'Bright White', hex: '#FFFFFF', category: 'neutral' },
      { name: 'Clear Coral', hex: '#FF7F50', category: 'lipstick' },
      { name: 'Bright Aqua', hex: '#00FFFF', category: 'accent' },
      { name: 'True Red', hex: '#FF0000', category: 'lipstick' },
      { name: 'Bright Yellow', hex: '#FFFF00', category: 'accent' },
      { name: 'Clear Emerald', hex: '#50C878', category: 'eyeshadow' },
      { name: 'Warm Navy', hex: '#1F4788', category: 'neutral' },
      { name: 'Hot Pink', hex: '#FF69B4', category: 'accent' },
      { name: 'Bright Purple', hex: '#9370DB', category: 'eyeshadow' },
      { name: 'Clear Warm Gray', hex: '#A9A9A9', category: 'neutral' },
      { name: 'Poppy Red', hex: '#E60026', category: 'lipstick' },
      { name: 'Bright Turquoise', hex: '#00CED1', category: 'accent' },
    ],
    avoidColors: ['Muted colors', 'Dusty tones', 'Burgundy', 'Dark brown'],
    makeupRecommendations: {
      lipstick: ['Clear coral', 'True red', 'Bright pink', 'Poppy red'],
      blush: ['Coral pink', 'Bright peach', 'Clear pink'],
      eyeshadow: ['Emerald', 'Bright purple', 'Turquoise', 'Clear bronze'],
      eyeliner: ['Black', 'Navy', 'Bright brown'],
    },
    clothingColors: {
      neutrals: ['Bright white', 'Warm navy', 'Clear gray', 'True black (small amounts)'],
      accents: ['True red', 'Bright aqua', 'Hot pink', 'Emerald', 'Bright yellow'],
    },
    metals: 'gold',
    colorTemperature: 0.6,
  },

  'Light Summer': {
    season: 'Light Summer',
    description: 'Cool, light, and soft. Delicate and ethereal with cool undertones and low contrast.',
    characteristics: {
      undertone: 'cool',
      brightness: 'light',
      saturation: 'muted',
      contrast: 'low',
    },
    bestColors: [
      { name: 'Soft White', hex: '#F5F5F5', category: 'neutral' },
      { name: 'Rose Pink', hex: '#FFB6C1', category: 'lipstick' },
      { name: 'Powder Blue', hex: '#B0E0E6', category: 'accent' },
      { name: 'Lavender', hex: '#E6E6FA', category: 'eyeshadow' },
      { name: 'Soft Mauve', hex: '#E0B0FF', category: 'accent' },
      { name: 'Cool Taupe', hex: '#B8B4A8', category: 'neutral' },
      { name: 'Dusty Blue', hex: '#8CA2AD', category: 'eyeshadow' },
      { name: 'Cool Rose', hex: '#D8A0A0', category: 'blush' },
      { name: 'Soft Aqua', hex: '#AFEEEE', category: 'accent' },
      { name: 'Light Cool Gray', hex: '#D3D3D3', category: 'neutral' },
      { name: 'Dusty Pink', hex: '#DCAEB4', category: 'lipstick' },
      { name: 'Soft Cocoa', hex: '#C4A88A', category: 'neutral' },
    ],
    avoidColors: ['Black', 'Bright orange', 'Warm golden colors', 'Dark brown'],
    makeupRecommendations: {
      lipstick: ['Rose pink', 'Dusty rose', 'Soft mauve', 'Cool pink'],
      blush: ['Rose', 'Dusty pink', 'Soft mauve'],
      eyeshadow: ['Lavender', 'Dusty blue', 'Cool taupe', 'Soft gray'],
      eyeliner: ['Soft gray', 'Cool brown', 'Charcoal'],
    },
    clothingColors: {
      neutrals: ['Soft white', 'Cool taupe', 'Light gray', 'Soft cocoa'],
      accents: ['Powder blue', 'Lavender', 'Rose pink', 'Soft aqua', 'Dusty mauve'],
    },
    metals: 'silver',
    colorTemperature: -0.7,
  },

  'Cool Summer': {
    season: 'Cool Summer',
    description: 'Cool, muted, and elegant. Coolness is your most dominant feature with blue/pink undertones.',
    characteristics: {
      undertone: 'cool',
      brightness: 'medium',
      saturation: 'muted',
      contrast: 'low',
    },
    bestColors: [
      { name: 'Cool White', hex: '#F8F8FF', category: 'neutral' },
      { name: 'Rose Mauve', hex: '#C39BD3', category: 'lipstick' },
      { name: 'Soft Blue', hex: '#87CEEB', category: 'accent' },
      { name: 'Cool Plum', hex: '#8E4585', category: 'eyeshadow' },
      { name: 'Raspberry', hex: '#E30B5C', category: 'lipstick' },
      { name: 'Cool Navy', hex: '#000080', category: 'neutral' },
      { name: 'Lavender Gray', hex: '#9C9EBC', category: 'eyeshadow' },
      { name: 'Dusty Rose', hex: '#C08081', category: 'blush' },
      { name: 'Cool Teal', hex: '#5F9EA0', category: 'accent' },
      { name: 'Cool Charcoal', hex: '#555D50', category: 'neutral' },
      { name: 'Soft Berry', hex: '#B5485D', category: 'lipstick' },
      { name: 'Cool Gray', hex: '#9B9B9B', category: 'neutral' },
    ],
    avoidColors: ['Orange', 'Golden yellow', 'Warm browns', 'Bright warm colors'],
    makeupRecommendations: {
      lipstick: ['Rose mauve', 'Raspberry', 'Soft berry', 'Cool pink'],
      blush: ['Dusty rose', 'Soft pink', 'Cool mauve'],
      eyeshadow: ['Plum', 'Lavender gray', 'Cool blue', 'Soft brown'],
      eyeliner: ['Cool gray', 'Navy', 'Soft black'],
    },
    clothingColors: {
      neutrals: ['Cool white', 'Cool navy', 'Cool gray', 'Cool charcoal'],
      accents: ['Soft blue', 'Raspberry', 'Cool teal', 'Lavender', 'Rose mauve'],
    },
    metals: 'silver',
    colorTemperature: -0.9,
  },

  'Soft Summer': {
    season: 'Soft Summer',
    description: 'Cool, soft, and muted. Gentleness and softness are your dominant features with cool-neutral undertones.',
    characteristics: {
      undertone: 'cool',
      brightness: 'medium',
      saturation: 'muted',
      contrast: 'low',
    },
    bestColors: [
      { name: 'Soft Ivory', hex: '#FFFFF0', category: 'neutral' },
      { name: 'Dusty Pink', hex: '#D8A7B1', category: 'lipstick' },
      { name: 'Muted Teal', hex: '#6B9D9C', category: 'accent' },
      { name: 'Soft Purple', hex: '#B19CD9', category: 'eyeshadow' },
      { name: 'Mauve', hex: '#C49EC4', category: 'accent' },
      { name: 'Soft Gray-Brown', hex: '#9F8B7D', category: 'neutral' },
      { name: 'Cool Blue-Gray', hex: '#778899', category: 'neutral' },
      { name: 'Muted Rose', hex: '#BC8F8F', category: 'blush' },
      { name: 'Sage Green', hex: '#9CAF88', category: 'eyeshadow' },
      { name: 'Pewter', hex: '#8B8589', category: 'neutral' },
      { name: 'Muted Berry', hex: '#9B5563', category: 'lipstick' },
      { name: 'Soft Cocoa', hex: '#A89080', category: 'neutral' },
    ],
    avoidColors: ['Bright colors', 'Pure white', 'Black', 'Orange'],
    makeupRecommendations: {
      lipstick: ['Dusty rose', 'Muted berry', 'Soft mauve', 'Rose brown'],
      blush: ['Muted rose', 'Dusty pink', 'Soft mauve'],
      eyeshadow: ['Soft purple', 'Sage', 'Gray-brown', 'Muted teal'],
      eyeliner: ['Soft brown', 'Gray', 'Muted black'],
    },
    clothingColors: {
      neutrals: ['Soft ivory', 'Gray-brown', 'Blue-gray', 'Pewter', 'Soft cocoa'],
      accents: ['Muted teal', 'Dusty pink', 'Sage', 'Soft purple', 'Mauve'],
    },
    metals: 'silver',
    colorTemperature: -0.5,
  },

  'Soft Autumn': {
    season: 'Soft Autumn',
    description: 'Warm, soft, and muted. Gentle warmth with muted, earthy tones and low contrast.',
    characteristics: {
      undertone: 'warm',
      brightness: 'medium',
      saturation: 'muted',
      contrast: 'low',
    },
    bestColors: [
      { name: 'Warm Cream', hex: '#FFF8DC', category: 'neutral' },
      { name: 'Terracotta', hex: '#CC7A5C', category: 'lipstick' },
      { name: 'Sage Green', hex: '#A9B183', category: 'eyeshadow' },
      { name: 'Warm Taupe', hex: '#B0896E', category: 'neutral' },
      { name: 'Muted Teal', hex: '#66857D', category: 'accent' },
      { name: 'Warm Olive', hex: '#727A3F', category: 'eyeshadow' },
      { name: 'Soft Salmon', hex: '#E8A798', category: 'blush' },
      { name: 'Warm Khaki', hex: '#C3B091', category: 'neutral' },
      { name: 'Muted Coral', hex: '#D9927D', category: 'lipstick' },
      { name: 'Warm Stone', hex: '#9A8B7B', category: 'neutral' },
      { name: 'Soft Rust', hex: '#B7583D', category: 'accent' },
      { name: 'Warm Gray', hex: '#ADA295', category: 'neutral' },
    ],
    avoidColors: ['Bright colors', 'Pure white', 'Black', 'Cool pastels'],
    makeupRecommendations: {
      lipstick: ['Terracotta', 'Muted coral', 'Warm nude', 'Soft rust'],
      blush: ['Soft salmon', 'Warm peach', 'Terracotta'],
      eyeshadow: ['Sage green', 'Warm olive', 'Warm taupe', 'Soft brown'],
      eyeliner: ['Warm brown', 'Soft olive', 'Bronze'],
    },
    clothingColors: {
      neutrals: ['Warm cream', 'Warm taupe', 'Khaki', 'Warm gray', 'Warm stone'],
      accents: ['Sage green', 'Muted teal', 'Terracotta', 'Soft rust', 'Warm olive'],
    },
    metals: 'gold',
    colorTemperature: 0.5,
  },

  'Warm Autumn': {
    season: 'Warm Autumn',
    description: 'Warm, rich, and earthy. Dominant warmth with golden, rich undertones and medium contrast.',
    characteristics: {
      undertone: 'warm',
      brightness: 'medium',
      saturation: 'moderate',
      contrast: 'medium',
    },
    bestColors: [
      { name: 'Warm Beige', hex: '#E8D5C4', category: 'neutral' },
      { name: 'Burnt Orange', hex: '#CC5500', category: 'accent' },
      { name: 'Golden Bronze', hex: '#CD7F32', category: 'eyeshadow' },
      { name: 'Warm Brick Red', hex: '#B22222', category: 'lipstick' },
      { name: 'Mustard', hex: '#FFDB58', category: 'accent' },
      { name: 'Olive Green', hex: '#556B2F', category: 'eyeshadow' },
      { name: 'Warm Chocolate', hex: '#7B3F00', category: 'neutral' },
      { name: 'Pumpkin Spice', hex: '#E07A5F', category: 'blush' },
      { name: 'Warm Teal', hex: '#5E807F', category: 'accent' },
      { name: 'Caramel', hex: '#AF6E4D', category: 'neutral' },
      { name: 'Burnt Sienna', hex: '#E97451', category: 'lipstick' },
      { name: 'Warm Camel', hex: '#C19A6B', category: 'neutral' },
    ],
    avoidColors: ['Cool pink', 'Icy blue', 'Purple', 'Black'],
    makeupRecommendations: {
      lipstick: ['Burnt sienna', 'Warm brick red', 'Terracotta', 'Warm nude'],
      blush: ['Pumpkin spice', 'Warm peach', 'Bronze'],
      eyeshadow: ['Golden bronze', 'Olive green', 'Warm brown', 'Copper'],
      eyeliner: ['Warm brown', 'Bronze', 'Warm black'],
    },
    clothingColors: {
      neutrals: ['Warm beige', 'Chocolate', 'Camel', 'Caramel'],
      accents: ['Burnt orange', 'Mustard', 'Warm teal', 'Olive', 'Brick red'],
    },
    metals: 'gold',
    colorTemperature: 0.8,
  },

  'Deep Autumn': {
    season: 'Deep Autumn',
    description: 'Warm, deep, and rich. Depth is your dominant feature with warm, intense coloring.',
    characteristics: {
      undertone: 'warm',
      brightness: 'deep',
      saturation: 'vibrant',
      contrast: 'high',
    },
    bestColors: [
      { name: 'Deep Cream', hex: '#F5E6D3', category: 'neutral' },
      { name: 'Deep Rust', hex: '#A0522D', category: 'lipstick' },
      { name: 'Rich Emerald', hex: '#046307', category: 'eyeshadow' },
      { name: 'Deep Burgundy', hex: '#800020', category: 'lipstick' },
      { name: 'Rich Gold', hex: '#B8860B', category: 'accent' },
      { name: 'Deep Teal', hex: '#014D4E', category: 'eyeshadow' },
      { name: 'Espresso', hex: '#3D2817', category: 'neutral' },
      { name: 'Warm Brick', hex: '#9C4A3A', category: 'blush' },
      { name: 'Deep Olive', hex: '#3F4A1F', category: 'eyeshadow' },
      { name: 'Dark Chocolate', hex: '#4A2511', category: 'neutral' },
      { name: 'Deep Terracotta', hex: '#A0450E', category: 'lipstick' },
      { name: 'Warm Charcoal', hex: '#494541', category: 'neutral' },
    ],
    avoidColors: ['Pastels', 'Cool pink', 'Icy colors', 'Light bright colors'],
    makeupRecommendations: {
      lipstick: ['Deep rust', 'Burgundy', 'Deep terracotta', 'Brick red'],
      blush: ['Warm brick', 'Deep bronze', 'Rich terracotta'],
      eyeshadow: ['Emerald', 'Deep teal', 'Deep olive', 'Bronze gold'],
      eyeliner: ['Black', 'Dark brown', 'Deep teal'],
    },
    clothingColors: {
      neutrals: ['Espresso', 'Dark chocolate', 'Warm charcoal', 'Deep cream'],
      accents: ['Deep rust', 'Rich emerald', 'Burgundy', 'Deep teal', 'Rich gold'],
    },
    metals: 'gold',
    colorTemperature: 0.6,
  },

  'Deep Winter': {
    season: 'Deep Winter',
    description: 'Cool, deep, and intense. Dramatic depth with cool undertones and high contrast.',
    characteristics: {
      undertone: 'cool',
      brightness: 'deep',
      saturation: 'vibrant',
      contrast: 'high',
    },
    bestColors: [
      { name: 'Pure White', hex: '#FFFFFF', category: 'neutral' },
      { name: 'True Red', hex: '#DC143C', category: 'lipstick' },
      { name: 'Deep Royal Blue', hex: '#002366', category: 'accent' },
      { name: 'Hot Pink', hex: '#FF1493', category: 'lipstick' },
      { name: 'Deep Purple', hex: '#4B0082', category: 'eyeshadow' },
      { name: 'True Black', hex: '#000000', category: 'neutral' },
      { name: 'Emerald', hex: '#50C878', category: 'eyeshadow' },
      { name: 'Deep Magenta', hex: '#8B008B', category: 'blush' },
      { name: 'Cool Navy', hex: '#000080', category: 'neutral' },
      { name: 'Charcoal', hex: '#36454F', category: 'neutral' },
      { name: 'Ruby Red', hex: '#9B111E', category: 'lipstick' },
      { name: 'Deep Teal', hex: '#014D4E', category: 'accent' },
    ],
    avoidColors: ['Warm browns', 'Orange', 'Gold', 'Warm beige'],
    makeupRecommendations: {
      lipstick: ['True red', 'Hot pink', 'Ruby red', 'Deep berry'],
      blush: ['Deep pink', 'Cool berry', 'Deep rose'],
      eyeshadow: ['Deep purple', 'Emerald', 'Navy', 'Charcoal'],
      eyeliner: ['Black', 'Navy', 'Deep purple'],
    },
    clothingColors: {
      neutrals: ['Pure white', 'True black', 'Cool navy', 'Charcoal'],
      accents: ['True red', 'Royal blue', 'Hot pink', 'Deep purple', 'Emerald'],
    },
    metals: 'silver',
    colorTemperature: -0.8,
  },

  'Cool Winter': {
    season: 'Cool Winter',
    description: 'Cool, vivid, and clear. Coolness is your most dominant feature with icy, crisp coloring.',
    characteristics: {
      undertone: 'cool',
      brightness: 'medium',
      saturation: 'vibrant',
      contrast: 'high',
    },
    bestColors: [
      { name: 'Icy White', hex: '#F0F8FF', category: 'neutral' },
      { name: 'Cool Pink', hex: '#FF69B4', category: 'lipstick' },
      { name: 'Royal Blue', hex: '#4169E1', category: 'accent' },
      { name: 'Magenta', hex: '#FF00FF', category: 'lipstick' },
      { name: 'Cool Purple', hex: '#8A2BE2', category: 'eyeshadow' },
      { name: 'Cool Navy', hex: '#000080', category: 'neutral' },
      { name: 'Icy Blue', hex: '#87CEFA', category: 'eyeshadow' },
      { name: 'Cool Fuchsia', hex: '#FF00FF', category: 'blush' },
      { name: 'Pine Green', hex: '#01796F', category: 'accent' },
      { name: 'Cool Gray', hex: '#708090', category: 'neutral' },
      { name: 'Cool Berry', hex: '#DC143C', category: 'lipstick' },
      { name: 'Icy Lavender', hex: '#E6E6FA', category: 'accent' },
    ],
    avoidColors: ['Orange', 'Warm yellow', 'Gold', 'Warm browns'],
    makeupRecommendations: {
      lipstick: ['Cool pink', 'Magenta', 'Cool berry', 'Fuchsia'],
      blush: ['Cool pink', 'Fuchsia', 'Cool rose'],
      eyeshadow: ['Cool purple', 'Icy blue', 'Silver', 'Cool gray'],
      eyeliner: ['Black', 'Navy', 'Cool gray'],
    },
    clothingColors: {
      neutrals: ['Icy white', 'Cool navy', 'Cool gray', 'True black'],
      accents: ['Royal blue', 'Magenta', 'Cool pink', 'Pine green', 'Icy lavender'],
    },
    metals: 'silver',
    colorTemperature: -0.9,
  },

  'Clear Winter': {
    season: 'Clear Winter',
    description: 'Cool, bright, and clear. High clarity and contrast with cool undertones and vivid coloring.',
    characteristics: {
      undertone: 'cool',
      brightness: 'medium',
      saturation: 'vibrant',
      contrast: 'high',
    },
    bestColors: [
      { name: 'Clear White', hex: '#FFFFFF', category: 'neutral' },
      { name: 'True Red', hex: '#FF0000', category: 'lipstick' },
      { name: 'Bright Blue', hex: '#0000FF', category: 'accent' },
      { name: 'Hot Pink', hex: '#FF69B4', category: 'lipstick' },
      { name: 'Bright Purple', hex: '#9F00FF', category: 'eyeshadow' },
      { name: 'True Black', hex: '#000000', category: 'neutral' },
      { name: 'Bright Emerald', hex: '#00FF00', category: 'eyeshadow' },
      { name: 'Cool Magenta', hex: '#FF00FF', category: 'blush' },
      { name: 'Cool Sapphire', hex: '#0F52BA', category: 'accent' },
      { name: 'Cool Charcoal', hex: '#36454F', category: 'neutral' },
      { name: 'Cherry Red', hex: '#DE3163', category: 'lipstick' },
      { name: 'Bright Turquoise', hex: '#00CED1', category: 'accent' },
    ],
    avoidColors: ['Muted colors', 'Warm browns', 'Orange', 'Dusty tones'],
    makeupRecommendations: {
      lipstick: ['True red', 'Hot pink', 'Cherry red', 'Bright berry'],
      blush: ['Hot pink', 'Cool magenta', 'Bright rose'],
      eyeshadow: ['Bright purple', 'Emerald', 'Bright blue', 'Silver'],
      eyeliner: ['Black', 'Bright blue', 'Deep purple'],
    },
    clothingColors: {
      neutrals: ['Clear white', 'True black', 'Cool charcoal'],
      accents: ['True red', 'Bright blue', 'Hot pink', 'Bright purple', 'Turquoise'],
    },
    metals: 'silver',
    colorTemperature: -0.7,
  },
};

// Helper function to get profile by season name
export function getSeasonalProfile(season: SeasonType): SeasonalProfile {
  return seasonalProfiles[season];
}

// Helper function to find closest season based on characteristics
export function findClosestSeason(
  undertone: 'warm' | 'cool' | 'neutral',
  brightness: 'light' | 'medium' | 'deep',
  saturation: 'muted' | 'moderate' | 'vibrant',
  contrast: 'low' | 'medium' | 'high'
): SeasonType {
  // Spring: Warm undertone
  if (undertone === 'warm') {
    if (brightness === 'light' && contrast === 'low') return 'Light Spring';
    if (saturation === 'vibrant' && contrast === 'medium') return 'Warm Spring';
    if (saturation === 'vibrant' && contrast === 'high') return 'Clear Spring';
  }

  // Summer: Cool undertone
  if (undertone === 'cool') {
    if (brightness === 'light' && contrast === 'low') return 'Light Summer';
    if (saturation === 'muted' && brightness === 'medium') return 'Cool Summer';
    if (saturation === 'muted' && contrast === 'low') return 'Soft Summer';
  }

  // Autumn: Warm undertone
  if (undertone === 'warm') {
    if (saturation === 'muted' && contrast === 'low') return 'Soft Autumn';
    if (saturation === 'moderate' && brightness === 'medium') return 'Warm Autumn';
    if (brightness === 'deep' && contrast === 'high') return 'Deep Autumn';
  }

  // Winter: Cool undertone
  if (undertone === 'cool') {
    if (brightness === 'deep' && contrast === 'high') return 'Deep Winter';
    if (saturation === 'vibrant' && brightness === 'medium') return 'Cool Winter';
    if (saturation === 'vibrant' && contrast === 'high') return 'Clear Winter';
  }

  // Neutral undertone - map to closest season
  if (undertone === 'neutral') {
    if (saturation === 'muted') return 'Soft Summer';
    if (brightness === 'light') return 'Light Summer';
    return 'Soft Autumn';
  }

  // Default fallback
  return 'Soft Autumn';
}