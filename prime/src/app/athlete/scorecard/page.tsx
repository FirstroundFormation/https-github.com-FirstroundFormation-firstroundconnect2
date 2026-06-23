"use client";
import { useRef } from "react";
import { Download, Share2 } from "lucide-react";
import PrimeBadge from "@/components/PrimeBadge";

const SCORE_DATA = {
  athlete: { first_name: "ALEX", last_name: "MARTIN", city: "PARIS", target: "HYROX", gender: "M" as const },
  prime_score: 72, tier: "Avancé" as const,
  score_cardio: 27, score_resistance: 21, score_puissance: 14, score_force: 7, score_mobilite: 3,
  date: "15 JUIN 2026", gym: "CROSSFIT NATION PARIS",
  results: [
    { pilier: "CARDIO", color: "#3B5FCC", items: [{ label: "Rowing 2km", value: "7'12\"", unit: "" }, { label: "Run 6min", value: "1480", unit: "m" }] },
    { pilier: "RÉSISTANCE", color: "#22C55E", items: [{ label: "Wall Balls", value: "85", unit: "reps" }, { label: "Push-ups", value: "32", unit: "reps" }] },
    { pilier: "PUISSANCE", color: "#C9A227", items: [{ label: "Broad Jump", value: "235", unit: "cm" }, { label: "Push Press", value: "13", unit: "reps" }] },
    { pilier: "FORCE", color: "#EF4444", items: [{ label: "Deadlift 5RM", value: "140", unit: "kg" }, { label: "Farmers Carry", value: "75", unit: "m" }] },
    { pilier: "MOBILITÉ", color: "#A78BFA", items: [{ label: "OHS", value: "B", unit: "" }, { label: "Hip Flexor", value: "B", unit: "" }] },
  ],
};

export default function ScorecardPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  async function handleExport() {
    const html2canvas = (await import("html2canvas")).default;
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: "#0A0A0E", useCORS: true });
    const link = document.createElement("a");
    link.download = `prime-score-${SCORE_DATA.athlete.last_name.toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gold font-orbitron text-xs tracking-widest mb-1">MA SCORECARD</p>
          <h1 className="font-orbitron font-black text-2xl text-white">Exporter mon score</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-white/20 text-white/60 text-sm rounded-lg hover:border-gold/30 hover:text-gold transition-colors flex items-center gap-2 cursor-pointer">
            <Share2 size={14} /> Partager
          </button>
          <button onClick={handleExport} className="px-4 py-2 bg-gold text-black font-orbitron font-bold text-xs tracking-wide rounded-lg hover:bg-gold/90 transition-colors flex items-center gap-2 cursor-pointer">
            <Download size={14} /> Exporter PNG
          </button>
        </div>
      </div>

      {/* SCORECARD */}
      <div ref={cardRef} className="relative overflow-hidden rounded-2xl" style={{ background: "#0A0A0E", border: "1px solid rgba(201,162,39,0.3)" }}>
        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(30,58,138,0.3) 0%, transparent 50%, rgba(201,162,39,0.1) 100%)" }} />

        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="font-orbitron font-bold text-gold/60 text-xs tracking-widest mb-1">PRIME ATHLETIC</p>
              <h2 className="font-orbitron font-black text-4xl text-white leading-tight">
                {SCORE_DATA.athlete.first_name}<br />{SCORE_DATA.athlete.last_name}
              </h2>
              <p className="text-white/40 text-sm mt-1">{SCORE_DATA.athlete.city} · {SCORE_DATA.athlete.gender === "M" ? "HOMME" : "FEMME"}</p>
            </div>
            <div className="text-right">
              <p className="font-orbitron font-black text-7xl text-gold leading-none">{SCORE_DATA.prime_score}</p>
              <p className="text-gold/60 font-orbitron text-sm">/ 100</p>
              <div className="mt-2 flex justify-end"><PrimeBadge tier={SCORE_DATA.tier} /></div>
            </div>
          </div>

          {/* Pillars bars */}
          <div className="space-y-3 mb-8">
            {[
              { label: "Cardio", score: SCORE_DATA.score_cardio, max: 35, color: "#3B5FCC" },
              { label: "Résistance", score: SCORE_DATA.score_resistance, max: 30, color: "#22C55E" },
              { label: "Puissance", score: SCORE_DATA.score_puissance, max: 20, color: "#C9A227" },
              { label: "Force", score: SCORE_DATA.score_force, max: 10, color: "#EF4444" },
              { label: "Mobilité", score: SCORE_DATA.score_mobilite, max: 5, color: "#A78BFA" },
            ].map(({ label, score, max, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs font-orbitron font-bold w-20" style={{ color }}>{label.toUpperCase()}</span>
                <div className="flex-1 h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${(score/max)*100}%`, background: color }} />
                </div>
                <span className="text-xs font-orbitron font-bold text-white w-8 text-right">{score}/{max}</span>
              </div>
            ))}
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {SCORE_DATA.results.map(({ pilier, color, items }) => (
              <div key={pilier} className="rounded-xl p-3" style={{ background: `${color}11`, border: `1px solid ${color}30` }}>
                <p className="text-xs font-orbitron font-bold tracking-widest mb-2" style={{ color }}>{pilier}</p>
                {items.map(({ label, value, unit }) => (
                  <div key={label} className="flex justify-between text-xs mb-1">
                    <span className="text-white/50">{label}</span>
                    <span className="font-bold text-white">{value}{unit}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer gradient bar */}
          <div className="h-2 rounded-full mb-4" style={{ background: "linear-gradient(to right, #3B5FCC, #C9A227, #22C55E, #EF4444, #A78BFA)" }} />

          <div className="flex items-center justify-between text-xs text-white/30 font-orbitron">
            <span>{SCORE_DATA.gym}</span>
            <span>{SCORE_DATA.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
