import PrimeBadge from "@/components/PrimeBadge";
import { Trophy, Medal } from "lucide-react";

const RANKINGS = [
  { rank: 1, name: "Thomas D.", city: "Paris", score: 91, tier: "Elite" as const },
  { rank: 2, name: "Emma S.", city: "Lyon", score: 88, tier: "Elite" as const },
  { rank: 3, name: "Karim B.", city: "Paris", score: 85, tier: "Elite" as const },
  { rank: 4, name: "Lucas M.", city: "Bordeaux", score: 79, tier: "Avancé" as const },
  { rank: 5, name: "Léa F.", city: "Paris", score: 76, tier: "Avancé" as const },
  { rank: 6, name: "Noah R.", city: "Nantes", score: 74, tier: "Avancé" as const },
  { rank: 7, name: "Alex M.", city: "Paris", score: 72, tier: "Avancé" as const, isYou: true },
  { rank: 8, name: "Marie C.", city: "Lille", score: 71, tier: "Avancé" as const },
  { rank: 9, name: "Hugo B.", city: "Marseille", score: 68, tier: "Avancé" as const },
  { rank: 10, name: "Chloé D.", city: "Lyon", score: 65, tier: "Avancé" as const },
];

const RANK_COLORS: Record<number, string> = { 1: "#C9A227", 2: "#9CA3AF", 3: "#CD7F32" };

export default function RankingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div>
        <p className="text-gold font-orbitron text-xs tracking-widest mb-1">COMMUNAUTÉ</p>
        <h1 className="font-orbitron font-black text-3xl text-white">Classement Paris</h1>
        <p className="text-white/40 text-sm mt-1">Tous athlètes · Saison 2026</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {["Paris", "France", "HYROX"].map(f => (
          <button key={f} className={`py-2 text-xs font-orbitron font-bold rounded-lg border transition-colors cursor-pointer ${f === "Paris" ? "bg-gold/20 border-gold text-gold" : "border-white/10 text-white/40 hover:border-white/20"}`}>
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {RANKINGS.map(({ rank, name, city, score, tier, isYou }) => (
          <div key={rank} className={`flex items-center gap-4 px-5 py-3.5 rounded-xl border transition-all ${isYou ? "border-gold/40 bg-gold/5 glow-gold" : "card-dark"}`}>
            <div className="w-8 text-center">
              {rank <= 3 ? (
                <Medal size={18} style={{ color: RANK_COLORS[rank] }} className="mx-auto" />
              ) : (
                <span className="font-orbitron font-bold text-sm text-white/40">#{rank}</span>
              )}
            </div>
            <div className="flex-1">
              <span className={`font-bold text-sm ${isYou ? "text-gold" : "text-white"}`}>{name}</span>
              {isYou && <span className="ml-2 text-xs text-gold/60 font-orbitron">(MOI)</span>}
              <p className="text-xs text-white/30">{city}</p>
            </div>
            <PrimeBadge tier={tier} />
            <div className="font-orbitron font-black text-lg" style={{ color: rank <= 3 ? RANK_COLORS[rank] : "#F4F1EA" }}>
              {score}
            </div>
          </div>
        ))}
      </div>

      <div className="card-dark p-4 text-center">
        <Trophy size={18} className="text-gold mx-auto mb-2" />
        <p className="text-sm text-white/60">Tu es <span className="text-gold font-bold">#7 sur 847 athlètes</span> à Paris</p>
        <p className="text-xs text-white/30 mt-1">+5 points pour passer dans le top 5</p>
      </div>
    </div>
  );
}
