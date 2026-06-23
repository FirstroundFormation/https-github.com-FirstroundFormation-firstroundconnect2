import Link from "next/link";
import { ArrowRight, Trophy, MapPin, Users, Zap } from "lucide-react";

const MOCK_GYMS = [
  { id: "1", name: "CrossFit Nation Paris", city: "Paris", sessions: 12, score_avg: 68 },
  { id: "2", name: "HYROX Lab Lyon", city: "Lyon", sessions: 8, score_avg: 71 },
  { id: "3", name: "Athletic Club Bordeaux", city: "Bordeaux", sessions: 5, score_avg: 63 },
  { id: "4", name: "Force & Forme Nantes", city: "Nantes", sessions: 7, score_avg: 59 },
  { id: "5", name: "Elite Performance Lille", city: "Lille", sessions: 9, score_avg: 74 },
  { id: "6", name: "Sport Arena Marseille", city: "Marseille", sessions: 6, score_avg: 66 },
];

const STATS = [
  { value: "2 400+", label: "Athlètes testés" },
  { value: "48", label: "Salles partenaires" },
  { value: "85€", label: "Prix unique" },
  { value: "10", label: "Épreuves standardisées" },
];

const PILLARS = [
  { name: "Cardio", pts: 35, color: "#3B5FCC", desc: "Rowing 2km + Run 6min" },
  { name: "Résistance", pts: 30, color: "#22C55E", desc: "Wall Balls + Push-ups" },
  { name: "Puissance", pts: 20, color: "#C9A227", desc: "Broad Jump + Push Press" },
  { name: "Force", pts: 10, color: "#EF4444", desc: "Deadlift + Farmers Carry" },
  { name: "Mobilité", pts: 5, color: "#A78BFA", desc: "OHS + Hip Flexor" },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-royal/20 via-black to-black" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-royal/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-bold font-orbitron tracking-widest mb-8">
            <Zap size={12} className="fill-gold" />
            BETA — SAISON 2026
          </div>

          <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-none tracking-tight">
            TEST TON<br />
            <span className="text-gold">NIVEAU.</span><br />
            <span className="text-white/50">PROUVE-LE.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            PRIME est le premier protocole de testing athlétique décentralisé. 10 épreuves standardisées dans une salle près de chez toi. Un score sur 100. Une vérité.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="px-8 py-4 bg-gold text-black font-orbitron font-bold text-sm tracking-widest rounded-lg hover:bg-gold/90 transition-all glow-gold flex items-center justify-center gap-2">
              RÉSERVER MA SESSION <ArrowRight size={16} />
            </Link>
            <Link href="/salles" className="px-8 py-4 border border-white/20 text-white font-bold text-sm rounded-lg hover:border-gold/40 hover:text-gold transition-all flex items-center justify-center gap-2">
              <MapPin size={16} /> TROUVER UNE SALLE
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-orbitron font-black text-3xl text-gold mb-1">{value}</p>
              <p className="text-sm text-white/50">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 PILLARS */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <p className="text-gold font-orbitron text-sm tracking-widest mb-3">LE PROTOCOLE</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white">5 PILIERS. 100 POINTS.</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">Un protocole scientifique qui évalue toutes les composantes de ta condition physique réelle.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PILLARS.map(({ name, pts, color, desc }) => (
            <div key={name} className="card-dark p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform cursor-default">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-orbitron font-black" style={{ background: `${color}22`, color }}>
                {pts}
              </div>
              <h3 className="font-orbitron font-bold text-white text-sm tracking-wide">{name.toUpperCase()}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
              <div className="mt-auto">
                <div className="h-1 rounded-full" style={{ background: `${color}40` }}>
                  <div className="h-full rounded-full" style={{ width: `${pts}%`, background: color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white/[0.02] border-y border-white/10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold font-orbitron text-sm tracking-widest mb-3">COMMENT ÇA MARCHE</p>
            <h2 className="font-orbitron font-black text-4xl text-white">3 ÉTAPES SIMPLES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Choisis ta salle", desc: "Trouve une salle PRIME certifiée près de chez toi et réserve une session à 85€." },
              { n: "02", title: "Passe le protocole", desc: "10 épreuves standardisées encadrées par un coach certifié. Durée : 2h environ." },
              { n: "03", title: "Reçois ton score", desc: "Obtiens ton PRIME Score /100, ton tier et ta scorecard exportable instantanément." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="relative">
                <div className="font-orbitron font-black text-6xl text-white/5 mb-4">{n}</div>
                <h3 className="font-orbitron font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GYM NETWORK */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-gold font-orbitron text-sm tracking-widest mb-2">RÉSEAU</p>
            <h2 className="font-orbitron font-black text-3xl text-white">SALLES PARTENAIRES</h2>
          </div>
          <Link href="/salles" className="text-sm text-gold font-bold hover:underline flex items-center gap-1">
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOCK_GYMS.map((gym) => (
            <Link key={gym.id} href={`/salles/${gym.id}`} className="card-dark p-4 hover:border-gold/30 transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-lg bg-royal/30 flex items-center justify-center text-gold font-orbitron font-bold mb-3">
                {gym.name.charAt(0)}
              </div>
              <p className="text-xs font-bold text-white group-hover:text-gold transition-colors line-clamp-2 mb-1">{gym.name}</p>
              <p className="text-xs text-white/40 flex items-center gap-1"><MapPin size={10} />{gym.city}</p>
              <p className="text-xs text-gold/70 mt-2">{gym.sessions} sessions</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA GYM */}
      <section className="mx-4 mb-16 rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-royal to-royal/50" />
        <div className="relative px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users size={20} className="text-gold" />
              <span className="text-gold font-orbitron text-sm tracking-widest font-bold">POUR LES SALLES</span>
            </div>
            <h2 className="font-orbitron font-black text-3xl text-white mb-3">Rejoignez le réseau PRIME</h2>
            <p className="text-white/70 max-w-md">Monétisez votre équipement existant. PRIME s&apos;occupe de tout : paiements, protocole, certification. Vous touchez 80% direct.</p>
          </div>
          <Link href="/auth/register?type=gym" className="shrink-0 px-8 py-4 bg-gold text-black font-orbitron font-bold text-sm tracking-widest rounded-lg hover:bg-gold/90 transition-all glow-gold whitespace-nowrap">
            DEVENIR PARTENAIRE <ArrowRight className="inline ml-2" size={16} />
          </Link>
        </div>
      </section>

      {/* SCORE EXAMPLE */}
      <section className="max-w-5xl mx-auto px-4 py-16 mb-8">
        <div className="text-center mb-12">
          <p className="text-gold font-orbitron text-sm tracking-widest mb-3">EXEMPLE DE RÉSULTAT</p>
          <h2 className="font-orbitron font-black text-4xl text-white">TON PRIME SCORE</h2>
        </div>
        <div className="card-dark p-8 max-w-sm mx-auto glow-royal">
          <div className="text-center mb-6">
            <p className="text-white/40 text-xs font-orbitron tracking-widest mb-2">PRIME SCORE</p>
            <div className="font-orbitron font-black text-8xl text-gold">72</div>
            <p className="text-gold/70 font-orbitron text-sm tracking-widest mt-1">/ 100 — AVANCÉ</p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Cardio", score: 27, max: 35, color: "#3B5FCC" },
              { label: "Résistance", score: 21, max: 30, color: "#22C55E" },
              { label: "Puissance", score: 14, max: 20, color: "#C9A227" },
              { label: "Force", score: 7, max: 10, color: "#EF4444" },
              { label: "Mobilité", score: 3, max: 5, color: "#A78BFA" },
            ].map(({ label, score, max, color }) => (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-xs text-white/50">
                  <span>{label}</span>
                  <span style={{ color }}>{score}/{max}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(score/max)*100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/30 font-orbitron tracking-wide">ALEX M. · PARIS · 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}
