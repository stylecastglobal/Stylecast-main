import { LABColor, ShadeIndexEntry, ShadeMatchResult, Undertone } from './types';
import { hexToLAB, deltaE, classifyUndertone } from './color-lab';

/**
 * Pre-built shade index from the product database.
 * All foundation/concealer/cushion shades with pre-computed LAB values.
 * Loaded once and cached in session memory.
 */

let cachedIndex: ShadeIndexEntry[] | null = null;

// Inline shade database — built from products_database.json makeup products
// This avoids a network fetch and keeps everything client-side.
const SHADE_DB: {
  brand: string;
  product: string;
  category: string;
  finish: string;
  shades: { name: string; hex: string }[];
}[] = [
  {
    brand: 'DIOR', product: 'Forever Foundation', category: 'Foundation', finish: 'Matte',
    shades: [
      { name: '0N', hex: '#F5E0CC' }, { name: '1N', hex: '#EEDCC0' },
      { name: '2W', hex: '#E0C4A0' }, { name: '3N', hex: '#D4A87A' },
      { name: '4W', hex: '#C49060' }, { name: '5N', hex: '#A87848' },
    ],
  },
  {
    brand: "L'Oréal", product: 'True Match Foundation', category: 'Foundation', finish: 'Satin',
    shades: [
      { name: 'W1 Porcelain', hex: '#F5DCC8' }, { name: 'W2 Light Ivory', hex: '#EEDCC0' },
      { name: 'W4 Natural Beige', hex: '#D8C0A0' }, { name: 'W5 Sand Beige', hex: '#C8A880' },
      { name: 'W6 Sun Beige', hex: '#B89068' }, { name: 'W8 Cream Café', hex: '#8B6848' },
    ],
  },
  {
    brand: "L'Oréal", product: 'Infallible 24HR Fresh Wear Foundation', category: 'Foundation', finish: 'Matte',
    shades: [
      { name: '400 Pearl', hex: '#F5E0CC' }, { name: '420 Ivory', hex: '#EEDCC0' },
      { name: '450 Rose Beige', hex: '#E0C4A0' }, { name: '500 Honey Bisque', hex: '#C8A880' },
      { name: '510 Caramel', hex: '#A87848' }, { name: '530 Espresso', hex: '#6B4830' },
    ],
  },
  {
    brand: 'Fenty Beauty', product: "Pro Filt'r Soft Matte Foundation", category: 'Foundation', finish: 'Matte',
    shades: [
      { name: '100', hex: '#F5E0CC' }, { name: '130', hex: '#EEDCC0' },
      { name: '185', hex: '#E0C4A0' }, { name: '230', hex: '#D4A87A' },
      { name: '290', hex: '#C49060' }, { name: '330', hex: '#A87848' },
      { name: '385', hex: '#8B6040' }, { name: '420', hex: '#6B4830' },
      { name: '445', hex: '#5A3828' }, { name: '498', hex: '#3D2418' },
    ],
  },
  {
    brand: 'Charlotte Tilbury', product: 'Airbrush Flawless Foundation', category: 'Foundation', finish: 'Matte',
    shades: [
      { name: '1 Cool', hex: '#F5DCC8' }, { name: '3 Neutral', hex: '#EEDCC0' },
      { name: '5 Neutral', hex: '#E0C8A8' }, { name: '7 Warm', hex: '#D4B090' },
      { name: '9 Neutral', hex: '#C49870' }, { name: '11 Warm', hex: '#A88060' },
      { name: '13 Neutral', hex: '#8B6848' }, { name: '15 Cool', hex: '#6B5038' },
    ],
  },
  {
    brand: 'Maybelline', product: 'Fit Me Matte Foundation', category: 'Foundation', finish: 'Matte',
    shades: [
      { name: '110 Porcelain', hex: '#F5E0CC' }, { name: '120 Classic Ivory', hex: '#EEDCC0' },
      { name: '220 Natural Beige', hex: '#D4B898' }, { name: '230 Natural Buff', hex: '#C8A880' },
      { name: '310 Sun Beige', hex: '#B89068' }, { name: '330 Toffee', hex: '#9A7850' },
      { name: '338 Spicy Brown', hex: '#7B5B3A' }, { name: '360 Mocha', hex: '#5A3828' },
    ],
  },
  {
    brand: 'MAC', product: 'Studio Fix Fluid Foundation', category: 'Foundation', finish: 'Matte',
    shades: [
      { name: 'NW10', hex: '#F5DCC8' }, { name: 'NW15', hex: '#EEDCC0' },
      { name: 'NW25', hex: '#D8C0A0' }, { name: 'NW30', hex: '#C8A880' },
      { name: 'NW35', hex: '#B89068' }, { name: 'NW40', hex: '#A07850' },
      { name: 'NW45', hex: '#886040' }, { name: 'NW50', hex: '#6B4830' },
      { name: 'NW55', hex: '#503020' }, { name: 'NW58', hex: '#3D2418' },
    ],
  },
  {
    brand: 'NARS', product: 'Radiant Creamy Concealer', category: 'Concealer', finish: 'Dewy',
    shades: [
      { name: 'Chantilly', hex: '#F5E0CC' }, { name: 'Vanilla', hex: '#EEDCC0' },
      { name: 'Custard', hex: '#E0C4A0' }, { name: 'Ginger', hex: '#D4A87A' },
      { name: 'Caramel', hex: '#B8865A' }, { name: 'Amande', hex: '#9A6B4A' },
      { name: 'Café', hex: '#7B5339' }, { name: 'Cacao', hex: '#5A3828' },
    ],
  },
  {
    brand: 'Maybelline', product: 'Fit Me Concealer', category: 'Concealer', finish: 'Dewy',
    shades: [
      { name: '05 Ivory', hex: '#F5E0CC' }, { name: '10 Light', hex: '#EEDCC0' },
      { name: '15 Fair', hex: '#E8D4B8' }, { name: '20 Sand', hex: '#D4B898' },
      { name: '25 Medium', hex: '#C4A078' }, { name: '30 Honey', hex: '#B08860' },
      { name: '35 Deep', hex: '#8B6848' }, { name: '40 Caramel', hex: '#6B5038' },
    ],
  },
];

function buildIndex(): ShadeIndexEntry[] {
  const entries: ShadeIndexEntry[] = [];
  for (const product of SHADE_DB) {
    for (const shade of product.shades) {
      const lab = hexToLAB(shade.hex);
      entries.push({
        brand: product.brand,
        productName: product.product,
        shadeName: shade.name,
        hex: shade.hex,
        lab,
        category: product.category,
        finish: product.finish,
        undertone: classifyUndertone(lab),
      });
    }
  }
  return entries;
}

/** Get the shade index, building it on first call and caching. */
export function getShadeIndex(): ShadeIndexEntry[] {
  if (!cachedIndex) {
    cachedIndex = buildIndex();
  }
  return cachedIndex;
}

/**
 * KNN shade matching.
 * Finds the closest shades to the given skin LAB color.
 * Returns top `topK` results per category, up to `maxTotal`.
 */
export function findMatchingShades(
  skinLAB: LABColor,
  options?: {
    topK?: number;
    maxTotal?: number;
    categories?: string[];
    boostShadeName?: string;
  }
): ShadeMatchResult[] {
  const index = getShadeIndex();
  const topK = options?.topK ?? 5;
  const maxTotal = options?.maxTotal ?? 15;

  // Compute ΔE for all entries
  let results: (ShadeIndexEntry & { deltaE: number })[] = index
    .filter((e) => {
      if (options?.categories && options.categories.length > 0) {
        return options.categories.some(
          (c) => e.category.toLowerCase() === c.toLowerCase()
        );
      }
      return true;
    })
    .map((entry) => ({
      ...entry,
      deltaE: deltaE(skinLAB, entry.lab),
    }));

  // Sort by ΔE ascending (closest first)
  results.sort((a, b) => a.deltaE - b.deltaE);

  // Find max ΔE for percentage calculation
  const maxDeltaE = results.length > 0 ? Math.max(...results.map((r) => r.deltaE), 1) : 1;

  // Apply boost for known shade name
  let scored = results.map((r) => {
    let matchPercent = Math.max(0, Math.round(100 - (r.deltaE / maxDeltaE) * 100));
    if (options?.boostShadeName && r.shadeName.toLowerCase().includes(options.boostShadeName.toLowerCase())) {
      matchPercent = Math.min(100, matchPercent + 5);
    }
    return { ...r, matchPercent };
  });

  // Re-sort by matchPercent descending
  scored.sort((a, b) => b.matchPercent - a.matchPercent);

  // Take top K per category
  const byCategory = new Map<string, ShadeMatchResult[]>();
  for (const r of scored) {
    const cat = r.category;
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    const arr = byCategory.get(cat)!;
    if (arr.length < topK) {
      arr.push(r);
    }
  }

  // Flatten and limit
  const final: ShadeMatchResult[] = [];
  for (const arr of byCategory.values()) {
    final.push(...arr);
  }
  final.sort((a, b) => b.matchPercent - a.matchPercent);
  return final.slice(0, maxTotal);
}
