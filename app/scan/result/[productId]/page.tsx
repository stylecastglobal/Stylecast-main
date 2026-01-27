import { headers } from "next/headers";
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
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${proto}://${host}` : "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/scanner/products/${productId}`,
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
