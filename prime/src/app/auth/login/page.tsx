"use client";
import Link from "next/link";
import { useState } from "react";
import { Loader2, Zap } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    window.location.href = "/athlete/dashboard";
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-orbitron font-black text-2xl text-gold tracking-widest flex items-center justify-center gap-2 mb-2">
            <Zap size={20} className="fill-gold" /> PRIME
          </div>
          <h1 className="font-orbitron font-bold text-xl text-white">Connexion</h1>
          <p className="text-white/40 text-sm mt-1">Accédez à votre espace</p>
        </div>

        <form onSubmit={handleSubmit} className="card-dark p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Email</label>
            <input
              type="email" required value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-gold/50 transition-colors"
              placeholder="vous@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Mot de passe</label>
            <input
              type="password" required value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-gold/50 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-gold text-black font-orbitron font-bold text-sm tracking-widest rounded-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Connexion...</> : "SE CONNECTER"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-white/40 text-sm">
            Pas encore de compte ?{" "}
            <Link href="/auth/register" className="text-gold hover:underline">S&apos;inscrire</Link>
          </p>
          <div className="text-xs text-white/20">
            <Link href="/gym/dashboard" className="hover:text-gold transition-colors">Espace salle →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
