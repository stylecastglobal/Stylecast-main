import GiftGrid, { GiftItem } from "@/app/components/GiftGrid";

export default function EldersGiftsPage() {
  const items: GiftItem[] = [
    {
      id: 1,
      image: "/elders-1.jpg",
      brand: "Muji",
      name: "Soft Warm Muffler",
      price: 25000,
      url: "https://example.com/product1",
    },
  ];

  return (
    <GiftGrid
      title="Elders"
      subtitle="Thoughtful items for older adults"
      items={items}
    />
  );
}
