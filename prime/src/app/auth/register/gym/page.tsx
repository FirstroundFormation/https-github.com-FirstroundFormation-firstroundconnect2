"use client";
import { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft, ExternalLink } from "lucide-react";

export default function RegisterGymPage() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "", password: "", name: "", address: "", city: "", zip_code: "", description: "",
  });

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 3) { setStep(s => s + 1); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    window.location.href = "/gym/dashboard";
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/auth/register" className="text-white/40 hover:text-gold transition-colors"><ArrowLeft size={18} /></Link>
          <div>
            <p className="text-gold font-orbitron text-xs tracking-widest">INSCRIPTION SALLE</p>
            <p className="text-white/40 text-xs">Étape {step}/3</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {[1,2,3].map(n => (
            <div key={n} className={`flex-1 h-1 rounded-full transition-colors ${n <= step ? "bg-gold" : "bg-white/10"}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="card-dark p-6 space-y-4">
          {step === 1 && (
            <>
              <h2 className="font-orbitron font-bold text-white text-lg mb-2">Compte administrateur</h2>
              {[
                { k: "email", label: "Email", type: "email", ph: "contact@masalle.fr" },
                { k: "password", label: "Mot de passe", type: "password", ph: "8 caractères min." },
              ].map(({ k, label, type, ph }) => (
                <div key={k}>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">{label}</label>
                  <input type={type} required value={form[k as keyof typeof form]} onChange={e => set(k, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-gold/50 transition-colors"
                    placeholder={ph} />
                </div>
              ))}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-orbitron font-bold text-white text-lg mb-2">Informations salle</h2>
              {[
                { k: "name", label: "Nom de la salle", ph: "CrossFit Nation" },
                { k: "address", label: "Adresse", ph: "12 rue de la Roquette" },
                { k: "city", label: "Ville", ph: "Paris" },
                { k: "zip_code", label: "Code postal", ph: "75011" },
              ].map(({ k, label, ph }) => (
                <div key={k}>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">{label}</label>
                  <input required value={form[k as keyof typeof form]} onChange={e => set(k, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-gold/50 transition-colors"
                    placeholder={ph} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Description (optionnel)</label>
                <textarea rows={3} value={form.description} onChange={e => set("description", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-gold/50 transition-colors resize-none"
                  placeholder="Décrivez votre salle et ses équipements..." />
              </div>
            </>
          )}

          {step === 3 && (
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto">
                <ExternalLink size={28} className="text-gold" />
              </div>
              <h2 className="font-orbitron font-bold text-white text-lg">Connexion Stripe</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Pour recevoir vos reversements (80% de chaque session), vous devez connecter un compte Stripe.
                C&apos;est gratuit et prend 5 minutes.
              </p>
              <div className="card-dark p-4 text-left space-y-2 text-sm text-white/60">
                <p className="font-bold text-white text-xs font-orbitron">VOTRE MODÈLE ÉCONOMIQUE</p>
                <div className="flex justify-between"><span>Prix session</span><span className="text-white">85€</span></div>
                <div className="flex justify-between"><span>Votre part (80%)</span><span className="text-green-400 font-bold">68€</span></div>
                <div className="flex justify-between"><span>Commission PRIME (20%)</span><span className="text-white/40">17€</span></div>
              </div>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gold text-black font-orbitron font-bold text-sm tracking-widest rounded-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Traitement...</>
              : step === 3 ? "CONNECTER STRIPE & FINALISER" : "CONTINUER →"}
          </button>
        </form>
      </div>
    </div>
  );
}
