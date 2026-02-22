"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { OutfitItem, OutfitCategory, BodyType, HeightBucket } from "../../types/outfit-builder";
import { getAnchorPoint, anchorToStyle } from "../../lib/avatar/anchorPoints";

interface OutfitLayerProps {
  item: OutfitItem | undefined;
  category: OutfitCategory;
  bodyType?: BodyType;
  heightBucket?: HeightBucket;
}

/**
 * SVG clip paths that match the avatar body regions for each category.
 * These create natural clothing silhouettes instead of rectangular boxes.
 */
const CATEGORY_CLIP_PATHS: Record<OutfitCategory, string> = {
  tops: "polygon(15% 0%, 85% 0%, 95% 8%, 100% 20%, 92% 100%, 8% 100%, 0% 20%, 5% 8%)",
  bottoms: "polygon(8% 0%, 92% 0%, 88% 35%, 82% 70%, 78% 100%, 58% 100%, 55% 45%, 50% 40%, 45% 45%, 42% 100%, 22% 100%, 18% 70%, 12% 35%)",
  outerwear: "polygon(10% 0%, 90% 0%, 100% 5%, 100% 100%, 85% 100%, 80% 30%, 75% 15%, 25% 15%, 20% 30%, 15% 100%, 0% 100%, 0% 5%)",
  shoes: "polygon(0% 20%, 15% 0%, 85% 0%, 100% 20%, 100% 80%, 85% 100%, 15% 100%, 0% 80%)",
  accessories: "ellipse(50% 45% at 50% 50%)",
};

/**
 * A single clothing layer positioned on the avatar using anchor points.
 * Animates in/out when items change for real-time visual feedback.
 */
export default function OutfitLayer({
  item,
  category,
  bodyType = "regular",
  heightBucket = "average",
}: OutfitLayerProps) {
  const anchor = getAnchorPoint(category, bodyType, heightBucket);
  const style = anchorToStyle(anchor);

  return (
    <AnimatePresence mode="wait">
      {item && (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={style}
          className="pointer-events-none"
        >
          {item.overlayImage ? (
            // Real overlay PNG — positioned to fill the anchor box
            <Image
              src={item.overlayImage}
              alt={item.name}
              fill
              className="object-contain"
              sizes="200px"
            />
          ) : (
            // Product image clipped to body-shaped region
            <ClothingImageLayer
              category={category}
              color={item.attributes.color}
              image={item.image}
              name={item.name}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Renders the product image clipped to a clothing silhouette shape.
 * Uses the item's color as a base with the product photo overlaid.
 */
function ClothingImageLayer({
  category,
  color,
  image,
  name,
}: {
  category: OutfitCategory;
  color: string;
  image: string;
  name: string;
}) {
  const clipPath = CATEGORY_CLIP_PATHS[category];

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ clipPath }}
    >
      {/* Base color fill */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: color || "#888" }}
      />

      {/* Product image — covers the shape */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover mix-blend-multiply"
          sizes="200px"
        />
      </div>

      {/* Subtle overlay to blend with avatar style */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: color || "#888", opacity: 0.25 }}
      />
    </div>
  );
}
