import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ProductDetailClient, { type ProductData } from "./product-detail-client";

interface PageProps {
  params: Promise<{ handle: string }>;
  searchParams?: Promise<{ brand?: string }>;
}

export default async function ProductDetailPage({ params, searchParams }: PageProps) {
  const { handle } = await params;
  const resolvedSearchParams = await searchParams;
  const brand = resolvedSearchParams?.brand || "glowny"; 
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${proto}://${host}` : "http://localhost:3000";

  let product: ProductData | null = null;

  try {
    const res = await fetch(
      `${baseUrl}/api/products/${handle}?brand=${brand}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const data = await res.json();
      product = data.product;
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}