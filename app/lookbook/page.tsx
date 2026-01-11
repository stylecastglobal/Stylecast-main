"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Gender type
type Gender = "women" | "men";

// Printer lookbook data (what goes in the printer)
const printerLookbooks = {
  women: [
    "/women-printer-1.jpg",
    "/women-printer-2.jpg",
    "/women-printer-3.jpg",
    "/women-printer-4.jpg",
    "/women-printer-5.jpg",
  ],
  men: [
    "/men-printer-1.jpg",
    "/men-printer-2.jpg",
    "/men-printer-3.jpg",
    "/men-printer-4.jpg",
    "/men-printer-5.jpg",
  ],
};

// Grid lookbook data (separate from printer)
const gridLookbooks = {
  women: [
    { id: 1, title: "Casual", image: "/women-grid-1.jpg", season: "Winter 2025" },
    { id: 2, title: "Airport Outfit", image: "/women-grid-2.jpg", season: "Winter 2025" },
    { id: 3, title: "Office Ready", image: "/women-grid3.jpg", season: "Winter 2025" },
    { id: 4, title: "Weekend Vibes", image: "/women-grid-4.jpg", season: "Winter 2025" },
    { id: 5, title: "Date Night", image: "/women-grid-5.jpg", season: "Winter 2025" },
    { id: 6, title: "Street Style", image: "/women-grid-6.jpg", season: "Winter 2025" },
    { id: 7, title: "Cozy Layers", image: "/women-grid-7.jpg", season: "Winter 2025" },
    { id: 8, title: "Athletic Edge", image: "/women-grid-8.jpg", season: "Winter 2025" },
    { id: 9, title: "Classic Elegance", image: "/women-grid-9.jpg", season: "Winter 2025" },
  ],
  men: [
    { id: 1, title: "Sharp Tailored", image: "/men-grid-1.jpg", season: "Winter 2025" },
    { id: 2, title: "Casual Friday", image: "/men-grid-2.jpg", season: "Winter 2025" },
    { id: 3, title: "Business Pro", image: "/men-grid-3.jpg", season: "Winter 2025" },
    { id: 4, title: "Weekend Relaxed", image: "/men-grid-4.jpg", season: "Winter 2025" },
    { id: 5, title: "Evening Sophisticated", image: "/men-grid-5.jpg", season: "Winter 2025" },
    { id: 6, title: "Urban Street", image: "/men-grid-6.jpg", season: "Winter 2025" },
    { id: 7, title: "Warm Layers", image: "/men-grid-7.jpg", season: "Winter 2025" },
    { id: 8, title: "Sport Luxe", image: "/men-grid-8.jpg", season: "Winter 2025" },
    { id: 9, title: "Timeless Classic", image: "/men-grid-9.jpg", season: "Winter 2025" },
  ],
};

// Row titles for the 6 horizontal rows
const rowTitles = [
  "Made By Our Creators",
  "Everyday & Casual",
  "Work & Professional",
  "Night & Going Out",
  "Elevated & Luxe",
  "Vacation",
];

export default function Lookbook() {
  const router = useRouter();
  
  // Gender state
  const [selectedGender, setSelectedGender] = useState<Gender>("women");

  const [currentPrint, setCurrentPrint] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printedPhoto, setPrintedPhoto] = useState<number | null>(null);
  const [isFalling, setIsFalling] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);

  // Carousel index per row (6 rows)
  const [rowIndices, setRowIndices] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // Get current lookbooks based on gender
  const currentPrinterLookbooks = printerLookbooks[selectedGender];
  const currentGridLookbooks = gridLookbooks[selectedGender];

  useEffect(() => {
    const interval = setInterval(() => setLightsOn((p) => !p), 800);
    return () => clearInterval(interval);
  }, []);

  // Reset printer + row carousels when gender changes
  useEffect(() => {
    setCurrentPrint(0);
    setPrintedPhoto(null);
    setIsFalling(false);
    setIsPrinting(false);
    setRowIndices([0, 0, 0, 0, 0, 0]);
  }, [selectedGender]);

  const printerSound = () => {
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_d1718ab41b.mp3?filename=printer-cutting-paper-43258.mp3"
    );
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const handlePrint = () => {
    if (isPrinting) return;

    if (printedPhoto !== null) {
      setIsFalling(true);
      setTimeout(() => {
        setPrintedPhoto(null);
        setIsFalling(false);
        setCurrentPrint((c) => (c + 1) % currentPrinterLookbooks.length);
      }, 800);
      return;
    }

    setIsPrinting(true);
    printerSound();

    setTimeout(() => {
      setPrintedPhoto(currentPrint);
      setIsPrinting(false);
    }, 2800);
  };

  const handlePhotoClick = () => {
    if (printedPhoto !== null) {
      setSelectedOutfit(printedPhoto);
      setShowDetails(true);
    }
  };

  const handleLookbookClick = (id: number) => {
    router.push(`/lookbook/${selectedGender}/${id}`);
  };

  // Build 6 rows, each intended to show 3 items (Option C: rows 4–6 empty until you add more)
  const rows = Array.from({ length: 6 }, (_, i) => {
    const start = i * 3;
    return currentGridLookbooks.slice(start, start + 3);
  });

  const handlePrev = (rowIndex: number) => {
    const items = rows[rowIndex];
    if (items.length <= 1) return;
    setRowIndices((prev) => {
      const copy = [...prev];
      copy[rowIndex] =
        (copy[rowIndex] - 1 + items.length) % items.length;
      return copy;
    });
  };

  const handleNext = (rowIndex: number) => {
    const items = rows[rowIndex];
    if (items.length <= 1) return;
    setRowIndices((prev) => {
      const copy = [...prev];
      copy[rowIndex] =
        (copy[rowIndex] + 1) % items.length;
      return copy;
    });
  };

  return (
    <main className="min-h-screen bg-white text-[#111]">
      {/* TITLE SECTION */}
      <section className="w-full pt-24 pb-8 text-center">
        <h1 className="text-[3.3rem] md:text-[4.4rem] font-semibold tracking-tight">
          LOOKBOOK
        </h1>
      </section>

      {/* GENDER TOGGLE */}
      <section className="w-full px-12 pb-8">
        <div className="inline-flex rounded-2xl bg-gray-100 p-1.5 shadow-inner">
          <button
            onClick={() => setSelectedGender("women")}
            className={`px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
              selectedGender === "women"
                ? "bg-white text-black shadow-lg"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => setSelectedGender("men")}
            className={`px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
              selectedGender === "men"
                ? "bg-white text-black shadow-lg"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Men
          </button>
        </div>
      </section>

      {/* MAIN CONTENT: PRINTER + LOOKBOOK GRID */}
      <section className="w-full flex gap-12 px-12 pb-32">
        
        {/* LEFT: PRINTER (1/3 width) */}
        <div className="w-1/3 flex flex-col items-center">
          <div className="mb-6 text-center">
            <p className="text-gray-800 text-lg font-medium">
              StyleCast weekly lookbooks are now up.
            </p>
            <p className="text-gray-500 text-sm max-w-xs mt-2 leading-relaxed mx-auto">
              Print this week&apos;s curated outfits as receipt-style snapshots
              you can save, screenshot, or share.
            </p>
          </div>

          <div className="w-full max-w-md">
            {/* Printer Head */}
            <div className="relative mx-auto h-16 w-full rounded-full bg-gradient-to-b from-[#f7f7f7] via-[#d9d9d9] to-[#b9b9b9] border border-[#cfcfcf] shadow-[0_10px_25px_rgba(0,0,0,0.18)] flex items-center px-8">
              <div className="absolute inset-[3px] rounded-full bg-gradient-to-b from-[#fdfdfd] via-[#dcdcdc] to-[#b5b5b5]" />
              <div className="relative w-full h-3 rounded-full bg-gradient-to-b from-[#4a4a4a] to-[#2b2b2b] shadow-inner" />

              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-2">
                <div
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                    lightsOn
                      ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]"
                      : "bg-green-700/40"
                  }`}
                />
                <div
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                    !lightsOn
                      ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.7)]"
                      : "bg-blue-700/40"
                  }`}
                />
              </div>
            </div>

            {/* Printer Body */}
            <div className="relative mt-4 rounded-[28px] bg-[#f0f0f0] border border-[#dedede] px-6 pb-8 pt-6 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
              <div className="mb-6">
                <div className="rounded-2xl bg-[#f7f7f7] border border-[#dedede] p-3 shadow-inner">
                  <div className="rounded-xl bg-black px-4 py-2 text-center">
                    <p className="text-[11px] text-white tracking-[0.26em] font-mono">
                      PHOTO {currentPrint + 1}/{currentPrinterLookbooks.length}
                    </p>

                    {isPrinting && (
                      <div className="mt-2 flex justify-center gap-1">
                        <span className="queue-dot" />
                        <span className="queue-dot delay-150" />
                        <span className="queue-dot delay-300" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative h-[420px] rounded-2xl bg-[#161616] overflow-hidden border border-[#232323]">
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />

                {isPrinting && (
                  <div
                    className="absolute left-1/2 top-0 w-[260px] bg-white rounded-md overflow-hidden shadow-xl"
                    style={{
                      transform: "translate(-50%, -110%)",
                      animation:
                        "printDown 2.8s cubic-bezier(0.4,0,0.2,1) forwards",
                    }}
                  >
                    <ReceiptContent
                      outfitSrc={currentPrinterLookbooks[currentPrint]}
                      index={currentPrint}
                    />
                  </div>
                )}

                {!isPrinting && printedPhoto !== null && (
                  <div
                    onClick={handlePhotoClick}
                    className={`absolute left-1/2 top-1/2 w-[260px] bg-white rounded-md overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02] ${
                      isFalling ? "animate-fall-out" : ""
                    }`}
                    style={{
                      transform: "translate(-50%, -50%)",
                      filter:
                        "drop-shadow(0 18px 40px rgba(0,0,0,0.35))",
                    }}
                  >
                    <ReceiptContent
                      outfitSrc={currentPrinterLookbooks[printedPhoto]}
                      index={printedPhoto}
                    />
                  </div>
                )}

                {!isPrinting && printedPhoto === null && (
                  <div className="absolute left-1/2 -top-[35%] w-[260px] opacity-15">
                    <div
                      className="bg-white rounded-md overflow-hidden"
                      style={{ transform: "translateX(-50%)" }}
                    >
                      <ReceiptContent
                        outfitSrc={currentPrinterLookbooks[currentPrint]}
                        index={currentPrint}
                        minimal
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handlePrint}
                disabled={isPrinting}
                className={`mt-8 w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                  isPrinting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-[#222] shadow-lg"
                }`}
              >
                {isPrinting
                  ? "Printing..."
                  : printedPhoto !== null
                  ? "Print Next Outfit"
                  : "Print Outfit"}
              </button>

              <p className="mt-3 text-center text-sm text-gray-600">
                {printedPhoto === null
                  ? "Click to print your first outfit receipt."
                  : "Click the printed receipt for details, or print the next outfit."}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: LOOKBOOK GRID (2/3 width) → now 6 titled rows with arrows */}
        <div className="w-2/3 space-y-16">
          {rows.map((items, rowIndex) => (
            <div key={rowIndex}>
              {/* Row title */}
              <h2 className="text-2xl font-semibold mb-4">
                {rowTitles[rowIndex]}
              </h2>

              <div className="relative">
                {/* Left arrow */}
                <button
                  onClick={() => handlePrev(rowIndex)}
                  disabled={items.length <= 1}
                  className="absolute -left-8 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-black disabled:opacity-20"
                >
                  ‹
                </button>

                <div className="grid grid-cols-3 gap-6">
                  {items.length === 0 ? (
                    <div className="col-span-3 text-sm text-gray-300 italic">
                      No outfits yet for this category.
                    </div>
                  ) : (
                    items.map((_, colIdx) => {
                      const visibleIndex =
                        (rowIndices[rowIndex] + colIdx) % items.length;
                      const item = items[visibleIndex];

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleLookbookClick(item.id)}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-[3/5] rounded-2xl overflow-hidden bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Text content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <p className="text-white/70 text-xs font-medium tracking-wider uppercase mb-1">
                                {item.season}
                              </p>
                              <h3 className="text-white text-xl font-semibold">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Right arrow */}
                <button
                  onClick={() => handleNext(rowIndex)}
                  disabled={items.length <= 1}
                  className="absolute -right-8 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-black disabled:opacity-20"
                >
                  ›
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUTFIT DETAILS MODAL */}
      {showDetails && selectedOutfit !== null && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4">
              Outfit #{selectedOutfit + 1}
            </h2>

            <div className="relative w-full aspect-[3/4] mb-6 rounded-2xl overflow-hidden">
              <Image
                src={currentPrinterLookbooks[selectedOutfit]}
                alt="Outfit"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="border-t-2 border-dashed border-gray-300 pt-4">
                <h3 className="font-semibold text-lg mb-3">
                  Product Details
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-xl text-sm">
                    <span>Top</span>
                    <span className="text-gray-600">
                      StyleCast Collection
                    </span>
                  </div>

                  <div className="flex justify-between p-3 bg-gray-50 rounded-xl text-sm">
                    <span>Bottom</span>
                    <span className="text-gray-600">Premium Line</span>
                  </div>

                  <div className="flex justify-between p-3 bg-gray-50 rounded-xl text-sm">
                    <span>Accessories</span>
                    <span className="text-gray-600">
                      Curated Selection
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowDetails(false)}
                className="w-full py-4 mt-4 bg-[#111] text-white rounded-xl font-semibold hover:bg-[#333] transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS */}
      <style jsx>{`
        @keyframes printDown {
          0% { transform: translate(-50%, -110%); }
          40% { transform: translate(-50%, -10%); }
          100% { transform: translate(-50%, 40%); }
        }

        @keyframes fall-out {
          0% { transform: translate(-50%, -50%); opacity: 1; }
          100% { transform: translate(-50%, 150%); opacity: 0; }
        }

        .animate-fall-out {
          animation: fall-out 0.8s forwards ease-in;
        }

        .queue-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background-color: #22c55e;
          animation: pulseDot 0.9s infinite ease-in-out;
        }

        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }

        @keyframes pulseDot {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        .receipt-body {
          background: linear-gradient(to bottom, #fff 0%, #fff 75%, #f6f6f6 100%);
        }

        .receipt-edge {
          height: 10px;
          background-image:
            linear-gradient(-45deg, transparent 75%, #e5e5e5 75%),
            linear-gradient(45deg, transparent 75%, #e5e5e5 75%);
          background-size: 8px 8px;
          background-position: 0 0, 4px 4px;
        }

        .paper-curl {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle at 100% 100%, rgba(0,0,0,0.18), transparent 60%);
          opacity: 0.35;
        }
      `}</style>
    </main>
  );
}

function ReceiptContent({
  outfitSrc,
  index,
  minimal = false,
}: {
  outfitSrc: string;
  index: number;
  minimal?: boolean;
}) {
  return (
    <div className="relative">
      <div className="receipt-body px-8 pt-8 pb-6">
        {!minimal && (
          <div className="mb-4 text-center">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-gray-800">
              OUTFIT RECEIPT
            </p>
          </div>
        )}

        <div className="relative w-full aspect-[3/4] mb-4">
          <Image
            src={outfitSrc}
            alt={`Outfit ${index + 1}`}
            fill
            className="object-contain"
          />
        </div>

        {!minimal && (
          <>
            <div className="mt-2 text-center text-[11px] text-gray-700">
              <p className="font-medium">STYLECAST OUTFIT #{index + 1}</p>
              <p className="font-mono text-[10px] text-gray-500">
                CURATED FOR YOU
              </p>
            </div>

            <div className="mt-4 border-t border-dashed border-gray-300 pt-2 text-center text-[10px] font-mono text-gray-500">
              <p>SC-00{index + 1} • LOOKBOOK</p>
            </div>

            <div className="mt-3 flex justify-center">
              <div className="w-24 h-5 bg-[repeating-linear-gradient(90deg,#111_0_2px,transparent_2px_4px)] opacity-70" />
            </div>
          </>
        )}
      </div>

      <div className="receipt-edge" />
      <div className="paper-curl" />
    </div>
  );
}
