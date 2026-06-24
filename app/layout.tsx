import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "عمرو خالد الجمل — مطور أنظمة ومواقع",
  description: "محفظة أعمال المطور عمرو خالد الجمل — مطور أنظمة ومواقع بدقة عالية",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-[#0D0D0D] text-white antialiased">
        <Header />
        <main className="content-layer">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
