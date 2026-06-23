import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Prime — Marketplace de services freelance",
  description: "Trouvez les meilleurs freelances pour vos projets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 bg-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
            © 2026 Prime — Marketplace de services freelance
          </div>
        </footer>
      </body>
    </html>
  );
}
