"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAthlete = pathname.startsWith('/athlete');
  const isGym = pathname.startsWith('/gym');

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-orbitron font-bold text-lg tracking-widest text-gold flex items-center gap-2">
          <Zap size={18} className="fill-gold text-gold" />
          PRIME
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
          <Link href="/salles" className="hover:text-gold transition-colors">Salles</Link>
          <Link href="/athlete/sessions" className="hover:text-gold transition-colors">Sessions</Link>
          {isAthlete && <Link href="/athlete/dashboard" className="hover:text-gold transition-colors">Mon dashboard</Link>}
          {isGym && <Link href="/gym/dashboard" className="hover:text-gold transition-colors">Espace salle</Link>}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login" className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">
            Connexion
          </Link>
          <Link href="/auth/register" className="px-4 py-2 text-sm font-bold text-black bg-gold rounded-lg hover:bg-gold/90 transition-colors font-orbitron tracking-wide">
            S&apos;inscrire
          </Link>
        </div>

        <button className="md:hidden text-white/70" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/salles" onClick={() => setOpen(false)} className="text-white/70 hover:text-white">Salles</Link>
          <Link href="/athlete/sessions" onClick={() => setOpen(false)} className="text-white/70 hover:text-white">Sessions</Link>
          <Link href="/athlete/dashboard" onClick={() => setOpen(false)} className="text-white/70 hover:text-white">Dashboard</Link>
          <Link href="/auth/register" onClick={() => setOpen(false)} className="px-4 py-2 text-center font-bold text-black bg-gold rounded-lg font-orbitron">S&apos;inscrire</Link>
        </div>
      )}
    </nav>
  );
}
