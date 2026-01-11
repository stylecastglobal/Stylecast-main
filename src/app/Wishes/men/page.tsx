import GiftGrid, { GiftItem } from "@/app/components/GiftGrid";

export default function MenGiftsPage() {
  const items: GiftItem[] = [
    // 예시 — 네가 직접 이미지, 가격, 브랜드 넣으면 됨
    {
      id: 1,
      image: "/men-1.jpg",
      brand: "Acne Studios",
      name: "Wool Scarf (Grey)",
      price: 120000,
      url: "https://example.com/product1",
    },
    {
      id: 2,
      image: "/men-2.jpg",
      brand: "Uniqlo",
      name: "Fleece Muffler",
      price: 29000,
      url: "https://example.com/product2",
    },
    // 필요한 만큼 추가
  ];

  return (
    <GiftGrid
      title="Men"
      subtitle="Top Picks for Him"
      items={items}
    />
  );
}
