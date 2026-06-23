"use client";
import { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";

const TARGETS = ["hyrox","athx","trail","marathon","crossfit","triathlon"];

export default function RegisterAthletePage() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email:"", password:"", first_name:"", last_name:"",
    birth_year:"", gender:"M", city:"", target_competition:"hyrox"
  });

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    window.location.href = "/athlete/dashboard";
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/auth/register" className="text-white/40 hover:text-gold transition-colors"><ArrowLeft size={18} /></Link>
          <div>
            <p className="text-gold font-orbitron text-xs tracking-widest">INSCRIPTION ATHLÈTE</p>
            <p className="text-white/40 text-xs">Étape {step}/2</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {[1,2].map(n => (
            <div key={n} className={`flex-1 h-1 rounded-full transition-colors ${n <= step ? "bg-gold" : "bg-white/10"}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="card-dark p-6 space-y-4">
          {step === 1 ? (
            <>
              <h2 className="font-orbitron font-bold text-white text-lg mb-2">Compte</h2>
              {[
                { k: "email", label: "Email", type: "email", ph: "vous@email.com" },
                { k: "password", label: "Mot de passe", type: "password", ph: "8 caractères min." },
              ].map(({ k, label, type, ph }) => (
                <div key={k}>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">{label}</label>
                  <input type={type} required value={form[k as keyof typeof form]}
                    onChange={e => set(k, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-gold/50 transition-colors"
                    placeholder={ph} />
                </div>
              ))}
            </>
          ) : (
            <>
              <h2 className="font-orbitron font-bold text-white text-lg mb-2">Profil athlète</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "first_name", label: "Prénom", ph: "Alex" },
                  { k: "last_name", label: "Nom", ph: "Martin" },
                ].map(({ k, label, ph }) => (
                  <div key={k}>
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">{label}</label>
                    <input required value={form[k as keyof typeof form]} onChange={e => set(k, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-gold/50 transition-colors"
                      placeholder={ph} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Année de naissance</label>
                  <input type="number" required min={1950} max={2010} value={form.birth_year} onChange={e => set("birth_year", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-gold/50 transition-colors"
                    placeholder="1990" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Genre</label>
                  <select value={form.gender} onChange={e => set("gender", e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-gold/50 transition-colors">
                    <option value="M">Homme</option>
                    <option value="F">Femme</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Ville</label>
                <input required value={form.city} onChange={e => set("city", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-gold/50 transition-colors"
                  placeholder="Paris" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-2">Objectif</label>
                <div className="grid grid-cols-3 gap-2">
                  {TARGETS.map(t => (
                    <button key={t} type="button" onClick={() => set("target_competition", t)}
                      className={`px-3 py-2 text-xs font-orbitron font-bold rounded-lg border transition-colors cursor-pointer ${form.target_competition === t ? "bg-gold/20 border-gold text-gold" : "border-white/10 text-white/40 hover:border-white/20"}`}>
                      {t.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gold text-black font-orbitron font-bold text-sm tracking-widest rounded-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Création...</> : step === 1 ? "CONTINUER →" : "CRÉER MON COMPTE"}
          </button>
        </form>
      </div>
    </div>
  );
}
