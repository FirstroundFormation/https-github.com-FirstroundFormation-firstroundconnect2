import Link from "next/link";
import { Trophy, TrendingUp } from "lucide-react";
import PrimeBadge from "@/components/PrimeBadge";
import ScorePillar from "@/components/ScorePillar";

const SCORES = [
  { id: "1", date: "15 juin 2026", gym: "CrossFit Nation Paris", prime_score: 72, tier: "Avancé" as const, score_cardio: 27, score_resistance: 21, score_puissance: 14, score_force: 7, score_mobilite: 3 },
  { id: "2", date: "12 avr. 2026", gym: "HYROX Lab Lyon", prime_score: 65, tier: "Avancé" as const, score_cardio: 23, score_resistance: 18, score_puissance: 12, score_force: 8, score_mobilite: 4 },
  { id: "3", date: "8 jan. 2026", gym: "CrossFit Nation Paris", prime_score: 55, tier: "Intermédiaire" as const, score_cardio: 19, score_resistance: 15, score_puissance: 11, score_force: 6, score_mobilite: 4 },
];

export default function ScoresPage() {
  const best = Math.max(...SCORES.map(s => s.prime_score));
  const latest = SCORES[0];
  const progress = SCORES.length > 1 ? latest.prime_score - SCORES[SCORES.length - 1].prime_score : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <p className="text-gold font-orbitron text-xs tracking-widest mb-1">ATHLÈTE</p>
        <h1 className="font-orbitron font-black text-3xl text-white">Historique des scores</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Meilleur score", value: best, icon: Trophy },
          { label: "Dernier score", value: latest.prime_score, icon: Trophy },
          { label: "Progression", value: `+${progress}`, icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="card-dark p-4 text-center">
            <Icon size={18} className="text-gold mx-auto mb-2" />
            <p className="font-orbitron font-black text-3xl text-gold">{value}</p>
            <p className="text-xs text-white/40 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {SCORES.map((s) => (
          <div key={s.id} className="card-dark p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-bold text-white">{s.gym}</p>
                <p className="text-white/40 text-xs mt-0.5">{s.date}</p>
              </div>
              <div className="text-right flex items-center gap-3">
                <PrimeBadge tier={s.tier} />
                <div className="font-orbitron font-black text-3xl text-gold">{s.prime_score}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <ScorePillar label="Cardio" score={s.score_cardio} max={35} color="#3B5FCC" />
              <ScorePillar label="Résistance" score={s.score_resistance} max={30} color="#22C55E" />
              <ScorePillar label="Puissance" score={s.score_puissance} max={20} color="#C9A227" />
              <ScorePillar label="Force" score={s.score_force} max={10} color="#EF4444" />
            </div>
            <div className="mt-3 flex justify-end">
              <Link href="/athlete/scorecard" className="text-xs text-gold hover:underline cursor-pointer">Voir la scorecard →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
