"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <Zap size={22} className="fill-indigo-600" />
          Prime
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/services" className="hover:text-indigo-600 transition-colors">Explorer</Link>
          <Link href="/sell" className="hover:text-indigo-600 transition-colors">Vendre</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
            Connexion
          </button>
          <Link
            href="/sell"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Publier un service
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/services" onClick={() => setOpen(false)}>Explorer les services</Link>
          <Link href="/sell" onClick={() => setOpen(false)}>Vendre un service</Link>
          <Link
            href="/sell"
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-center text-white bg-indigo-600 rounded-lg"
          >
            Publier un service
          </Link>
        </div>
      )}
    </nav>
  );
}
