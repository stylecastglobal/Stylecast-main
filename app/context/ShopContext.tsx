"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type ShopItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type ShopContextValue = {
  cart: ShopItem[];
  wishlist: ShopItem[];
  addToCart: (item: ShopItem) => void;
  removeFromCart: (id: string) => void;
  addToWishlist: (item: ShopItem) => void;
  removeFromWishlist: (id: string) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopItem[]>([]);
  const [wishlist, setWishlist] = useState<ShopItem[]>([]);

  const addToCart = (item: ShopItem) => {
    setCart((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const addToWishlist = (item: ShopItem) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      addToWishlist,
      removeFromWishlist,
    }),
    [cart, wishlist]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error("useShop must be used within <ShopProvider>.");
  }
  return ctx;
}
