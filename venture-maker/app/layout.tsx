import "./globals.css";
import Header from "@/app/components/Header";


export const metadata = {
  title: "Venture Maker",
  description: "Total Business Growth Strategy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white">
        <Header />
        {children}
      </body>
    </html>
  );
}

