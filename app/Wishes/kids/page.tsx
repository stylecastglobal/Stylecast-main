import GiftGrid, { GiftItem } from "@/app/components/GiftGrid";

export default function KidsGiftsPage() {
  const items: GiftItem[] = [
    {
      id: 1,
      image: "/kids-1.jpg",
      brand: "Zara Kids",
      name: "Winter Scarf Set",
      price: 19000,
      url: "https://example.com/product1",
    },
  ];

  return (
    <GiftGrid
      title="Kids"
      subtitle="Fun, playful gifts for little ones"
      items={items}
    />
  );
}
