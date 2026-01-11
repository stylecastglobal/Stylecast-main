import GiftGrid, { GiftItem } from "@/app/components/GiftGrid";

export default function WomenGiftsPage() {
  const items: GiftItem[] = [
    {
      id: 1,
      image: "/women-1.jpg",
      brand: "Aritzia",
      name: "Babaton Wool Coat",
      price: 320000,
      url: "https://example.com/product1",
    },
  ];

  return (
    <GiftGrid
      title="Women"
      subtitle="Elegant gifts curated for her"
      items={items}
    />
  );
}
