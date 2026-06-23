import Link from "next/link";
import { Trophy, Calendar, TrendingUp, MapPin, ArrowRight } from "lucide-react";
import ScorePillar from "@/components/ScorePillar";
import PrimeBadge from "@/components/PrimeBadge";

const LAST_SCORE = {
  prime_score: 72, tier: "Avancé" as const,
  score_cardio: 27, score_resistance: 21, score_puissance: 14, score_force: 7, score_mobilite: 3,
  gym: "CrossFit Nation Paris", date: "15 juin 2026",
};
const HISTORY = [
  { date: "15 juin 2026", score: 72, tier: "Avancé" as const },
  { date: "12 avr. 2026", score: 65, tier: "Avancé" as const },
  { date: "8 jan. 2026", score: 55, tier: "Intermédiaire" as const },
];

export default function AthleteDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gold font-orbitron text-xs tracking-widest mb-1">DASHBOARD ATHLÈTE</p>
          <h1 className="font-orbitron font-black text-3xl text-white">Alex Martin</h1>
          <p className="text-white/40 text-sm flex items-center gap-1 mt-1"><MapPin size={12} />Paris · Objectif HYROX</p>
        </div>
        <Link href="/athlete/scorecard" className="hidden md:flex items-center gap-2 px-4 py-2 border border-gold/30 text-gold text-sm font-bold hover:bg-gold/10 rounded-lg transition-colors cursor-pointer">
          <Trophy size={15} /> Ma Scorecard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 card-dark p-6 glow-gold">
          <p className="text-white/40 text-xs font-orbitron tracking-widest mb-3">DERNIER PRIME SCORE</p>
          <div className="text-center mb-4">
            <div className="font-orbitron font-black text-8xl text-gold leading-none">{LAST_SCORE.prime_score}</div>
            <p className="text-gold/60 text-xs font-orbitron tracking-wide mt-1">/ 100</p>
          </div>
          <div className="flex justify-center mb-5"><PrimeBadge tier={LAST_SCORE.tier} /></div>
          <div className="space-y-3">
            <ScorePillar label="Cardio" score={LAST_SCORE.score_cardio} max={35} color="#3B5FCC" />
            <ScorePillar label="Résistance" score={LAST_SCORE.score_resistance} max={30} color="#22C55E" />
            <ScorePillar label="Puissance" score={LAST_SCORE.score_puissance} max={20} color="#C9A227" />
            <ScorePillar label="Force" score={LAST_SCORE.score_force} max={10} color="#EF4444" />
            <ScorePillar label="Mobilité" score={LAST_SCORE.score_mobilite} max={5} color="#A78BFA" />
          </div>
          <p className="text-xs text-white/30 text-center mt-4">{LAST_SCORE.gym} · {LAST_SCORE.date}</p>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card-dark p-5">
            <p className="text-xs font-orbitron text-white/40 tracking-widest mb-3">PROCHAINE SESSION</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">CrossFit Nation Paris</p>
                <p className="text-white/50 text-sm flex items-center gap-1 mt-1"><Calendar size={12} /> 28 juin 2026 · 09h00</p>
              </div>
              <Link href="/sessions/s1" className="flex items-center gap-1 text-gold text-sm font-bold hover:underline cursor-pointer">Voir <ArrowRight size={13} /></Link>
            </div>
          </div>

          <div className="card-dark p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-orbitron text-white/40 tracking-widest">PROGRESSION</p>
              <Link href="/athlete/scores" className="text-xs text-gold hover:underline flex items-center gap-1 cursor-pointer">Historique <TrendingUp size={11} /></Link>
            </div>
            <div className="space-y-3">
              {HISTORY.map((h, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-white/30 w-28">{h.date}</div>
                    <div className="h-1.5 rounded-full bg-white/10 w-40 overflow-hidden">
                      <div className="h-full rounded-full bg-gold" style={{ width: `${h.score}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-orbitron font-bold text-white text-sm">{h.score}</span>
                    <PrimeBadge tier={h.tier} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Réserver", href: "/athlete/sessions", icon: Calendar },
              { label: "Scores", href: "/athlete/scores", icon: Trophy },
              { label: "Classement", href: "/athlete/ranking", icon: TrendingUp },
            ].map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href} className="card-dark p-4 text-center hover:border-gold/30 transition-all cursor-pointer group block">
                <Icon size={20} className="text-gold mx-auto mb-2" />
                <p className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">{label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
