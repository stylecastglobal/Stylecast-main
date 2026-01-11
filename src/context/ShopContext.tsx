"use client";

import { createContext, useContext, useState } from "react";

type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand?: string;
};

type ShopContextType = {
  cart: Item[];
  wishlist: Item[];
  addToCart: (item: Item) => void;
  addToWishlist: (item: Item) => void;
  removeFromWishlist: (id: string) => void;
};

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Item[]>([]);
  const [wishlist, setWishlist] = useState<Item[]>([]);

  const addToCart = (item: Item) => {
    setCart((prev) => [...prev, item]);
  };

  const addToWishlist = (item: Item) => {
    setWishlist((prev) =>
      prev.find((i) => i.id === item.id) ? prev : [...prev, item]
    );
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <ShopContext.Provider
      value={{ cart, wishlist, addToCart, addToWishlist, removeFromWishlist }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
