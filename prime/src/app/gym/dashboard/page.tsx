import Link from "next/link";
import { TrendingUp, Users, Calendar, Euro, ArrowRight, Plus } from "lucide-react";

const KPI = [
  { label: "Revenus ce mois", value: "1 904€", sub: "+12% vs mois dernier", icon: Euro, color: "#C9A227" },
  { label: "Athlètes testés", value: "28", sub: "ce mois", icon: Users, color: "#3B5FCC" },
  { label: "Sessions réalisées", value: "4", sub: "ce mois", icon: Calendar, color: "#22C55E" },
  { label: "Score moyen", value: "67/100", sub: "de ta salle", icon: TrendingUp, color: "#A78BFA" },
];

const UPCOMING = [
  { id: "s1", date: "Sam 28 juin", time: "09h00", booked: 5, max: 8 },
  { id: "s2", date: "Sam 28 juin", time: "14h00", booked: 3, max: 8 },
  { id: "s3", date: "Dim 29 juin", time: "09h00", booked: 6, max: 8 },
];

export default function GymDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gold font-orbitron text-xs tracking-widest mb-1">ESPACE SALLE</p>
          <h1 className="font-orbitron font-black text-3xl text-white">CrossFit Nation Paris</h1>
          <p className="text-white/40 text-sm mt-1">12 rue de la Roquette, 75011 Paris</p>
        </div>
        <Link href="/gym/sessions" className="hidden md:flex items-center gap-2 px-4 py-2 bg-gold text-black font-orbitron font-bold text-xs tracking-wide rounded-lg hover:bg-gold/90 transition-colors cursor-pointer">
          <Plus size={14} /> NOUVELLE SESSION
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {KPI.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="card-dark p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                <Icon size={16} style={{ color }} />
              </div>
            </div>
            <p className="font-orbitron font-black text-2xl" style={{ color }}>{value}</p>
            <p className="text-xs text-white/50 mt-1">{label}</p>
            <p className="text-xs text-white/30 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-orbitron font-bold text-white text-sm tracking-wide">PROCHAINES SESSIONS</p>
            <Link href="/gym/sessions" className="text-xs text-gold hover:underline cursor-pointer">Gérer <ArrowRight className="inline" size={11} /></Link>
          </div>
          <div className="space-y-3">
            {UPCOMING.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <p className="text-sm font-bold text-white">{s.date} · {s.time}</p>
                  <p className="text-xs text-white/40">{s.booked}/{s.max} réservations</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${(s.booked/s.max)*100}%` }} />
                  </div>
                  <Link href={`/gym/sessions/${s.id}/score`} className="text-xs text-gold font-bold hover:underline cursor-pointer">Saisir</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-orbitron font-bold text-white text-sm tracking-wide">REVENUS DU MOIS</p>
            <Link href="/gym/revenues" className="text-xs text-gold hover:underline cursor-pointer">Détail →</Link>
          </div>
          <div className="space-y-2">
            {[
              { date: "15 juin", athlete: "Alex M.", amount: 68 },
              { date: "15 juin", athlete: "Sophie L.", amount: 68 },
              { date: "12 juin", athlete: "Karim B.", amount: 68 },
              { date: "8 juin", athlete: "Emma S.", amount: 68 },
            ].map(({ date, athlete, amount }, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-white font-medium">{athlete}</p>
                  <p className="text-xs text-white/30">{date}</p>
                </div>
                <span className="text-green-400 font-bold font-orbitron">+{amount}€</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Sessions", href: "/gym/sessions", icon: Calendar },
          { label: "Athlètes", href: "/gym/athletes", icon: Users },
          { label: "Revenus", href: "/gym/revenues", icon: Euro },
        ].map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href} className="card-dark p-5 text-center hover:border-gold/30 transition-all cursor-pointer group block">
            <Icon size={22} className="text-gold mx-auto mb-2" />
            <p className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
