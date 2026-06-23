import Link from "next/link";
import { ArrowRight, Shield, Zap, TrendingUp, MapPin, Search } from "lucide-react";

const STATS = [
  { value: "2 400+", label: "Athlètes testés" },
  { value: "48", label: "Salles partenaires" },
  { value: "85€", label: "Prix unique" },
  { value: "100 pts", label: "Score maximum" },
];

const PILLARS = [
  { name: "Cardio", pts: 35, color: "#3B5FCC", icon: "❤", desc: "Rowing 2km + Run 6min" },
  { name: "Résistance", pts: 30, color: "#22C55E", icon: "💪", desc: "Wall Balls + Push-ups" },
  { name: "Puissance", pts: 20, color: "#C9A227", icon: "⚡", desc: "Broad Jump + Push Press" },
  { name: "Force", pts: 10, color: "#EF4444", icon: "🏋", desc: "Deadlift + Farmers Carry" },
  { name: "Mobilité", pts: 5, color: "#A78BFA", icon: "🧘", desc: "OHS + Hip Flexor" },
];

const TIERS = [
  { tier: "ELITE", range: "85–100", color: "#C9A227", bg: "rgba(201,162,39,0.15)" },
  { tier: "AVANCÉ", range: "65–84", color: "#3B5FCC", bg: "rgba(59,95,204,0.15)" },
  { tier: "INTERMÉDIAIRE", range: "45–64", color: "#22C55E", bg: "rgba(34,197,94,0.15)" },
  { tier: "DÉBUTANT", range: "0–44", color: "#EF4444", bg: "rgba(239,68,68,0.15)" },
];

export default function HomePage() {
  return (
    <div>
      {/* ════════════ HERO — Block-based, Animated Pattern ════════════ */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-24 pattern-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />

        {/* Geometric block accent — Vibrant style */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10"
          style={{ background: "linear-gradient(135deg, #C9A227, transparent)", clipPath: "polygon(100% 0, 100% 60%, 40% 0)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-8"
          style={{ background: "linear-gradient(315deg, #1E3A8A, transparent)", clipPath: "polygon(0 40%, 0 100%, 60% 100%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT — text + search */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-barlow font-bold tracking-widest uppercase mb-10">
              <Zap size={12} className="fill-gold" /> Beta · Saison 2026
            </div>

            <h1 className="font-barlow font-black uppercase leading-[0.9] tracking-tight text-white mb-6"
              style={{ fontSize: "clamp(56px, 9vw, 110px)" }}>
              Find your<br />
              <span className="text-gold">PRIME.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-xl mb-10 font-barlow leading-relaxed">
              10 épreuves standardisées. Une salle certifiée près de chez toi.
              Un <strong className="text-white">PRIME Score sur 100</strong>. La vérité sur ton niveau réel.
            </p>

            {/* Search CTA */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mb-8">
              <div className="flex-1 flex items-center bg-white/8 border border-white/15 backdrop-blur-sm rounded-xl px-4 gap-3">
                <Search size={16} className="text-white/40 shrink-0" />
                <input type="text" placeholder="Chercher une salle ou une ville..."
                  className="flex-1 py-4 text-white text-sm outline-none bg-transparent placeholder:text-white/30 font-barlow" />
              </div>
              <Link href="/salles"
                className="px-7 py-4 bg-gold text-black font-barlow font-black text-sm uppercase tracking-widest rounded-xl hover:bg-gold/90 transition-colors whitespace-nowrap glow-gold">
                Trouver →
              </Link>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {["Paris", "Lyon", "HYROX", "CrossFit", "Bordeaux"].map(s => (
                <Link key={s} href={`/salles?q=${s}`}
                  className="px-3 py-1.5 text-xs font-barlow font-bold text-white/50 border border-white/10 rounded-full hover:border-gold/40 hover:text-gold transition-all duration-200 uppercase tracking-wide">
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT — mini PRIME Card */}
          <div className="shrink-0 hidden lg:block">
            <div className="relative" style={{ width: 280 }}>
              {/* Floating glow */}
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
                style={{ background: "radial-gradient(circle, #C9A227 0%, #1E3A8A 60%, transparent 100%)" }} />

              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl"
                style={{
                  background: "linear-gradient(160deg, #0D0D18 0%, #0A0A0E 60%, #0D0D14 100%)",
                  border: "1px solid rgba(201,162,39,0.45)",
                  boxShadow: "0 0 60px rgba(201,162,39,0.25), 0 0 120px rgba(30,58,138,0.2)",
                }}>

                {/* Holographic top edge */}
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, transparent, #C9A227, #A78BFA, #3B5FCC, transparent)" }} />

                {/* Ghost score bg */}
                <div className="absolute -right-4 top-4 font-orbitron font-black leading-none pointer-events-none select-none"
                  style={{ fontSize: 120, color: "rgba(201,162,39,0.06)" }}>72</div>

                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-orbitron font-black text-sm tracking-widest text-gold">PRIME</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-orbitron font-black tracking-widest"
                      style={{ background: "rgba(59,95,204,0.2)", color: "#3B5FCC", border: "1px solid rgba(59,95,204,0.4)" }}>
                      AVANCÉ
                    </span>
                  </div>

                  {/* Athlete */}
                  <p className="text-white/30 text-[10px] font-orbitron tracking-widest mb-0.5">PARIS · HYROX</p>
                  <p className="font-barlow font-black text-white text-xl leading-tight mb-4">ALEX MARTIN</p>

                  {/* Big score */}
                  <div className="flex items-end gap-2 mb-3">
                    <span className="font-orbitron font-black leading-none"
                      style={{ fontSize: 72, color: "#3B5FCC", textShadow: "0 0 40px rgba(59,95,204,0.6)" }}>
                      72
                    </span>
                    <div className="pb-2 flex flex-col">
                      <span className="text-white/30 font-orbitron text-xs">/ 100</span>
                      <span className="text-white/50 font-orbitron text-[10px]">TOP 9%</span>
                      <span className="text-sm" style={{ color: "#3B5FCC" }}>★★★★☆</span>
                    </div>
                  </div>

                  {/* Rainbow bar */}
                  <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{
                      width: "72%",
                      background: "linear-gradient(90deg, #3B5FCC 0%, #22C55E 30%, #C9A227 60%, #EF4444 80%, #A78BFA 100%)",
                      boxShadow: "0 0 8px rgba(201,162,39,0.5)"
                    }} />
                  </div>

                  {/* Pillar bars */}
                  <div className="flex flex-col gap-1.5 mb-4">
                    {[
                      { label: "CARDIO",  color: "#3B5FCC", pct: 77 },
                      { label: "RÉSIST",  color: "#22C55E", pct: 70 },
                      { label: "PUISS",   color: "#C9A227", pct: 70 },
                      { label: "FORCE",   color: "#EF4444", pct: 70 },
                      { label: "MOBIL",   color: "#A78BFA", pct: 60 },
                    ].map(({ label, color, pct }) => (
                      <div key={label} className="flex items-center gap-2">
                        <span className="font-orbitron text-[8px] font-bold w-12 shrink-0" style={{ color }}>{label}</span>
                        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-3 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-white/20 text-[8px] font-orbitron tracking-widest">CROSSFIT NATION PARIS</p>
                    <p className="text-white/20 text-[8px] font-orbitron">15 JUIN 2026</p>
                  </div>
                </div>

                {/* Corner glow */}
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-20"
                  style={{ background: "radial-gradient(circle at 100% 100%, #C9A227 0%, transparent 70%)" }} />
              </div>

              {/* Label below card */}
              <p className="text-center text-white/25 text-xs font-orbitron tracking-widest mt-3">
                TA CARTE · EXPORTABLE PNG
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════ STATS BLOCK ════════════ */}
      <section className="border-y border-white/8 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center px-6 py-2">
              <p className="font-barlow font-black text-4xl text-gold">{value}</p>
              <p className="text-sm text-white/40 font-barlow mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ 5 PILLARS — Block layout, 48px+ gaps ════════════ */}
      <section className="section-block max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-gold font-barlow font-bold text-sm tracking-widest uppercase mb-3">Le Protocole</p>
          <h2 className="font-barlow font-black text-5xl md:text-6xl text-white uppercase tracking-tight">
            5 Piliers. 100 Points.
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto font-barlow">Un protocole scientifique qui évalue toutes les composantes de ta condition physique réelle.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PILLARS.map(({ name, pts, color, desc }, i) => (
            <div key={name}
              className={`card-dark card-${name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace("é","e")} p-6 flex flex-col gap-4 cursor-default`}
              style={{ borderColor: `${color}20` }}>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-barlow font-black text-xl"
                  style={{ background: `${color}20`, color }}>
                  {pts}
                </div>
                <span className="text-xs text-white/20 font-barlow font-bold">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h3 className="font-barlow font-black text-xl text-white uppercase tracking-wide" style={{ color }}>{name}</h3>
                <p className="text-xs text-white/40 font-barlow mt-1 leading-relaxed">{desc}</p>
              </div>
              <div className="mt-auto">
                <div className="h-1 rounded-full" style={{ background: `${color}20` }}>
                  <div className="h-full rounded-full" style={{ width: `${pts}%`, background: color }} />
                </div>
                <p className="text-xs text-white/20 font-barlow mt-1 text-right">{pts} pts</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ TIERS — Gamification ════════════ */}
      <section className="section-block bg-white/[0.02] border-y border-white/8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold font-barlow font-bold text-sm tracking-widest uppercase mb-3">Gamification</p>
            <h2 className="font-barlow font-black text-5xl text-white uppercase tracking-tight">Les 4 Tiers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TIERS.map(({ tier, range, color, bg }) => (
              <div key={tier} className="card-dark p-6 text-center" style={{ borderColor: `${color}30`, background: bg }}>
                <p className="font-barlow font-black text-2xl mb-1 uppercase" style={{ color }}>{tier}</p>
                <p className="font-barlow font-bold text-white/60 text-sm">{range} pts</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section className="section-block max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-gold font-barlow font-bold text-sm tracking-widest uppercase mb-3">Comment ça marche</p>
          <h2 className="font-barlow font-black text-5xl text-white uppercase tracking-tight">3 Étapes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: "01", title: "Choisis ta salle", desc: "Trouve une salle PRIME certifiée près de chez toi. Réserve en ligne à 85€." },
            { n: "02", title: "Passe le protocole", desc: "10 épreuves standardisées, encadrées par un coach certifié PRIME. ~2h." },
            { n: "03", title: "Reçois ton score", desc: "PRIME Score /100, tier, scorecard exportable PNG. Comparaison nationale." },
          ].map(({ n, title, desc }) => (
            <div key={n} className="relative pl-8 border-l-2 border-gold/30">
              <div className="font-barlow font-black text-7xl text-white/5 absolute -left-6 top-0 leading-none">{n}</div>
              <h3 className="font-barlow font-black text-2xl text-white uppercase tracking-tight mb-2">{title}</h3>
              <p className="text-white/50 font-barlow text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ WHY PRIME (Trust block) ════════════ */}
      <section className="section-block bg-white/[0.02] border-y border-white/8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Paiement sécurisé", desc: "Stripe Connect. 80% versé directement à la salle. Zéro risque." },
            { icon: Zap, title: "Protocole standardisé", desc: "Même épreuves, même barème partout en France. Résultat comparable." },
            { icon: TrendingUp, title: "Progression trackée", desc: "Rejoue et compare ton score. Vois ta progression sur le temps." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                <Icon size={22} className="text-gold" />
              </div>
              <div>
                <h3 className="font-barlow font-black text-xl text-white uppercase tracking-tight mb-1">{title}</h3>
                <p className="text-white/50 text-sm font-barlow leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ CTA GYM ════════════ */}
      <section className="section-block max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl pattern-bg" style={{ background: "#1E3A8A" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-royal/80 to-royal/40" />
          <div className="absolute top-0 right-0 w-80 h-80 opacity-20"
            style={{ background: "linear-gradient(135deg, #C9A227, transparent)", clipPath: "polygon(100% 0, 100% 80%, 20% 0)" }} />
          <div className="relative px-10 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-gold font-barlow font-bold text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
                <MapPin size={14} /> Pour les salles
              </p>
              <h2 className="font-barlow font-black text-4xl text-white uppercase tracking-tight mb-3">
                Rejoignez le réseau PRIME
              </h2>
              <p className="text-white/70 font-barlow max-w-md leading-relaxed">
                Monétisez votre équipement existant. Vous touchez <strong className="text-gold">80% par session</strong> directement via Stripe.
                Zéro gestion facturation.
              </p>
            </div>
            <Link href="/auth/register?type=gym"
              className="shrink-0 px-8 py-4 bg-gold text-black font-barlow font-black text-sm uppercase tracking-widest rounded-xl hover:bg-gold/90 transition-colors glow-gold whitespace-nowrap flex items-center gap-2">
              Devenir partenaire <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
