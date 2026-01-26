import { notFound } from "next/navigation";
import ScanResultClient from "./scan-result-client";

interface PageProps {
  params: Promise<{ productId: string }>;
  searchParams?: Promise<{ confidence?: string }>;
}

export default async function ScanResultPage({ params, searchParams }: PageProps) {
  const { productId } = await params;
  const resolvedParams = await searchParams;
  const confidence = resolvedParams?.confidence || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/scanner/products/${productId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  if (!data?.product) {
    notFound();
  }

  return <ScanResultClient product={data.product} confidence={confidence} />;
}
