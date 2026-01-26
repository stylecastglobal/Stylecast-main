// app/data/types.ts

export interface Brand {
    id: string;
    slug: string;
    name: string;
    description: string;
    heroImage: string;
    category: string[];
    badge?: string;
    favorites?: string;
    trending?: boolean;
  }
  
  export interface Product {
    id: string;
    brandId: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    inStock: boolean;
    officialUrl?: string;
  }