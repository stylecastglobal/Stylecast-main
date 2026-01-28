import Image from "next/image";
import { notFound } from "next/navigation";
import { gridLookbooks } from "../../lookbookData";

interface PageProps {
  params: Promise<{ gender: "women" | "men"; id: string }>;
}

export default async function LookbookDetailPage({ params }: PageProps) {
  const { gender, id } = await params;
  const lookbookId = Number(id);
  const items = gridLookbooks[gender];
  const lookbook = items?.find((item) => item.id === lookbookId);

  if (!lookbook) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-[#111]">
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-lg flex items-center justify-center p-6">
            <Image
              src={lookbook.image}
              alt={lookbook.title}
              fill
              className="object-contain"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                {lookbook.season}
              </p>
              <h1 className="text-3xl font-semibold mt-2">{lookbook.title}</h1>
              <p className="text-sm text-gray-600 mt-1">{lookbook.creator}</p>
              <p className="text-sm text-gray-600 mt-2">
                Curated products from this lookbook.
              </p>
            </div>

            <div className="space-y-4">
              {lookbook.products.map((product, index) => (
                <div
                  key={`${product.name}-${index}`}
                  className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      {product.brand}
                    </p>
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.price}</p>
                  </div>
                  <a
                    href={product.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-black underline hover:text-gray-700"
                  >
                    Buy on official store
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
