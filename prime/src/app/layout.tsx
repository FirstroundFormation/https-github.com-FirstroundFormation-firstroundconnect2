import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'PRIME — Test ton niveau. Prouve-le.',
  description: 'Plateforme de testing athlétique décentralisé. Obtiens ton PRIME Score sur 100.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Design system: Barlow Condensed (headings) + Barlow (body) + Orbitron (PRIME brand) */}
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black text-off-white min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <span className="font-orbitron font-bold text-gold tracking-widest">PRIME</span>
            <span>© 2026 PRIME Athletics. Tous droits réservés.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
