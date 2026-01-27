"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

type SearchResult = {
  id: string;
  brand: string;
  name: string;
  category: string;
  image: string | null;
  image_set: string[];
  score: number;
};

export default function ScanSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const run = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/scanner/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    };
    run();
  }, [query]);

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600 mb-6">Results for "{query}"</p>

        {loading && <p className="text-gray-500">Searching...</p>}
        {!loading && results.length === 0 && (
          <p className="text-gray-500">
            No products found. Try a different search.
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => router.push(`/scan/result/${result.id}`)}
              className="text-left border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[3/4] bg-gray-100">
                {result.image && (
                  <Image
                    src={result.image}
                    alt={result.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized
                  />
                )}
              </div>
              <div className="p-4">
                <p className="text-xs uppercase text-gray-400">
                  {result.brand}
                </p>
                <p className="font-semibold text-gray-900">
                  {result.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
