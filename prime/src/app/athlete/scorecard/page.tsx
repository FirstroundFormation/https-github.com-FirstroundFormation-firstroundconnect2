"use client";
import { useRef, useState } from "react";
import { Download, Share2, Camera } from "lucide-react";
import RadarChart from "@/components/RadarChart";

const SCORE_DATA = {
  athlete: { first_name: "ALEX", last_name: "MARTIN", city: "PARIS", target: "HYROX", gender: "M" as const, handle: "@alex.martin" },
  prime_score: 72, tier: "AVANCÉ" as const,
  score_cardio: 27, score_resistance: 21, score_puissance: 14, score_force: 7, score_mobilite: 3,
  date: "15 JUIN 2026", gym: "CROSSFIT NATION PARIS",
  percentile: 91,
  results: [
    { pilier: "CARDIO",      color: "#3B5FCC", max: 35, score: 27, items: [{ label: "Rowing 2km", value: "7'12\"" }, { label: "Run 6min", value: "1480m" }] },
    { pilier: "RÉSISTANCE",  color: "#22C55E", max: 30, score: 21, items: [{ label: "Wall Balls", value: "85 reps" }, { label: "Push-ups", value: "32 reps" }] },
    { pilier: "PUISSANCE",   color: "#C9A227", max: 20, score: 14, items: [{ label: "Broad Jump", value: "235 cm" }, { label: "Push Press", value: "13 reps" }] },
    { pilier: "FORCE",       color: "#EF4444", max: 10, score: 7,  items: [{ label: "Deadlift 5RM", value: "140 kg" }, { label: "Farmers", value: "75 m" }] },
    { pilier: "MOBILITÉ",    color: "#A78BFA", max: 5,  score: 3,  items: [{ label: "OHS", value: "B" }, { label: "Hip Flexor", value: "B" }] },
  ],
};

const TIER_CONFIG = {
  ELITE:        { label: "ELITE",        bg: "from-yellow-500/30 to-yellow-900/10", accent: "#C9A227", glow: "0 0 60px rgba(201,162,39,0.5)", star: "★★★★★" },
  AVANCÉ:       { label: "AVANCÉ",       bg: "from-blue-600/30 to-blue-900/10",    accent: "#3B5FCC", glow: "0 0 60px rgba(59,95,204,0.4)",  star: "★★★★☆" },
  INTERMÉDIAIRE:{ label: "INTERMÉDIAIRE",bg: "from-green-600/30 to-green-900/10",  accent: "#22C55E", glow: "0 0 60px rgba(34,197,94,0.4)",  star: "★★★☆☆" },
  DÉBUTANT:     { label: "DÉBUTANT",     bg: "from-white/10 to-transparent",        accent: "#94A3B8", glow: "0 0 30px rgba(148,163,184,0.2)",star: "★★☆☆☆" },
};

const tier = TIER_CONFIG[SCORE_DATA.tier] ?? TIER_CONFIG["AVANCÉ"];

const PILLARS = [
  { label: "Cardio",     score: SCORE_DATA.score_cardio,     max: 35, color: "#3B5FCC" },
  { label: "Résistance", score: SCORE_DATA.score_resistance, max: 30, color: "#22C55E" },
  { label: "Puissance",  score: SCORE_DATA.score_puissance,  max: 20, color: "#C9A227" },
  { label: "Force",      score: SCORE_DATA.score_force,      max: 10, color: "#EF4444" },
  { label: "Mobilité",   score: SCORE_DATA.score_mobilite,   max: 5,  color: "#A78BFA" },
];

// Fake QR code via path
function MiniQR() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="4" fill="rgba(255,255,255,0.06)" />
      {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
        const on = (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3) || Math.random() > 0.5;
        return on ? <rect key={`${r}-${c}`} x={4 + c * 6} y={4 + r * 6} width="5" height="5" rx="1" fill="rgba(255,255,255,0.7)" /> : null;
      }))}
      {/* corners */}
      <rect x="4" y="4" width="17" height="17" rx="2" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x="27" y="4" width="17" height="17" rx="2" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x="4" y="27" width="17" height="17" rx="2" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x="8" y="8" width="9" height="9" rx="1" fill="rgba(255,255,255,0.7)" />
      <rect x="31" y="8" width="9" height="9" rx="1" fill="rgba(255,255,255,0.7)" />
      <rect x="8" y="31" width="9" height="9" rx="1" fill="rgba(255,255,255,0.7)" />
    </svg>
  );
}

export default function ScorecardPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    const html2canvas = (await import("html2canvas")).default;
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      backgroundColor: "#0A0A0E",
      useCORS: true,
      logging: false,
    });
    const link = document.createElement("a");
    link.download = `PRIME-${SCORE_DATA.prime_score}-${SCORE_DATA.athlete.last_name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setExporting(false);
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#08080C" }}>
      {/* Page header */}
      <div className="max-w-sm mx-auto mb-6 flex items-center justify-between">
        <div>
          <p className="font-orbitron text-gold/60 text-xs tracking-[0.3em] mb-1">MA SCORECARD</p>
          <h1 className="font-barlow font-black text-2xl text-white tracking-tight">Partage ton niveau</h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-xl border border-white/10 text-white/50 hover:border-white/30 hover:text-white transition-all cursor-pointer">
            <Share2 size={16} />
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs tracking-wide text-black transition-all cursor-pointer disabled:opacity-60"
            style={{ background: tier.accent, boxShadow: exporting ? "none" : tier.glow.replace("60px", "20px") }}
          >
            {exporting ? <span className="animate-spin">◌</span> : <Download size={14} />}
            {exporting ? "Export..." : "PNG HD"}
          </button>
        </div>
      </div>

      {/* ── THE CARD ── */}
      <div
        ref={cardRef}
        className="max-w-sm mx-auto relative overflow-hidden select-none"
        style={{
          background: "linear-gradient(160deg, #0D0D18 0%, #0A0A0E 50%, #0D0D14 100%)",
          borderRadius: "24px",
          border: `1px solid ${tier.accent}40`,
          boxShadow: tier.glow,
          aspectRatio: "4/5",
        }}
      >
        {/* ── Background: gradient noise + sport silhouette ── */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Diagonal colored bands */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(135deg, ${tier.accent}18 0%, transparent 45%, rgba(30,58,138,0.12) 100%)`
          }} />
          {/* Geometric grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 20 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 26} x2="400" y2={i * 26} stroke="white" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 16 }, (_, i) => (
              <line key={`v${i}`} x1={i * 26} y1="0" x2={i * 26} y2="500" stroke="white" strokeWidth="0.5" />
            ))}
          </svg>
          {/* Large ghost score text background */}
          <div className="absolute -right-6 top-8 font-orbitron font-black text-[180px] leading-none select-none pointer-events-none"
            style={{ color: `${tier.accent}08`, letterSpacing: "-0.05em" }}>
            {SCORE_DATA.prime_score}
          </div>
          {/* Radial glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full -translate-y-1/2"
            style={{ background: `radial-gradient(circle, ${tier.accent}20 0%, transparent 70%)` }} />
        </div>

        {/* ── Content ── */}
        <div className="relative h-full flex flex-col p-6">

          {/* TOP BAR: logo + tier + date */}
          <div className="flex items-center justify-between mb-5">
            <span className="font-orbitron font-black text-base tracking-widest" style={{ color: tier.accent }}>PRIME</span>
            <div className="flex items-center gap-2">
              <span className="text-white/25 text-xs font-orbitron">{SCORE_DATA.date}</span>
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-orbitron font-black tracking-widest"
                style={{ background: `${tier.accent}20`, color: tier.accent, border: `1px solid ${tier.accent}50` }}
              >
                {tier.label}
              </span>
            </div>
          </div>

          {/* ATHLETE */}
          <div className="mb-4">
            <p className="text-white/35 text-xs font-orbitron tracking-[0.2em] mb-0.5">{SCORE_DATA.athlete.city} · {SCORE_DATA.athlete.target}</p>
            <h2 className="font-barlow font-black text-white leading-none tracking-tight" style={{ fontSize: "clamp(28px, 7vw, 38px)" }}>
              {SCORE_DATA.athlete.first_name} {SCORE_DATA.athlete.last_name}
            </h2>
            <p className="text-white/30 text-xs font-orbitron mt-0.5">{SCORE_DATA.athlete.handle}</p>
          </div>

          {/* BIG SCORE */}
          <div className="flex items-end gap-3 mb-1">
            <div>
              <span
                className="font-orbitron font-black leading-none block"
                style={{ fontSize: "clamp(80px, 22vw, 96px)", color: tier.accent, textShadow: tier.glow }}
              >
                {SCORE_DATA.prime_score}
              </span>
            </div>
            <div className="pb-3 flex flex-col gap-1">
              <span className="text-white/30 font-orbitron text-sm">/ 100</span>
              <span className="text-white/60 font-orbitron text-xs">TOP {100 - SCORE_DATA.percentile}%</span>
              <span className="text-base" style={{ color: tier.accent }}>{tier.star}</span>
            </div>
          </div>

          {/* RAINBOW PROGRESS BAR */}
          <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${SCORE_DATA.prime_score}%`,
                background: "linear-gradient(90deg, #3B5FCC 0%, #22C55E 30%, #C9A227 60%, #EF4444 80%, #A78BFA 100%)",
                boxShadow: "0 0 12px rgba(201,162,39,0.6)"
              }}
            />
          </div>

          {/* PILLARS COMPACT — horizontal bars */}
          <div className="flex flex-col gap-2 mb-4">
            {PILLARS.map(({ label, score, max, color }) => {
              const pct = score / max;
              return (
                <div key={label} className="flex items-center gap-2">
                  <span className="font-orbitron text-[9px] font-bold w-16 shrink-0" style={{ color }}>
                    {label.toUpperCase()}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct * 100}%`, background: color, boxShadow: `0 0 6px ${color}80` }}
                    />
                  </div>
                  <span className="font-orbitron font-black text-[9px] w-8 text-right" style={{ color }}>
                    {score}<span className="text-white/25">/{max}</span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* RADAR */}
          <div className="flex justify-center mb-3">
            <RadarChart pillars={PILLARS} size={150} />
          </div>

          {/* FOOTER */}
          <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <p className="text-white/25 text-[9px] font-orbitron tracking-widest uppercase">{SCORE_DATA.gym}</p>
              <p className="text-white/15 text-[8px] font-orbitron tracking-widest mt-0.5">prime-athletics.com</p>
            </div>
            <MiniQR />
          </div>
        </div>

        {/* Holographic foil edge top */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${tier.accent}, #A78BFA, #3B5FCC, transparent)` }} />
        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-20"
          style={{
            background: `radial-gradient(circle at 100% 100%, ${tier.accent} 0%, transparent 70%)`
          }} />
      </div>

      {/* Tip below card */}
      <div className="max-w-sm mx-auto mt-5 flex items-center gap-2 text-white/25 text-xs font-orbitron">
        <Camera size={12} />
        <span>Format 4:5 optimisé pour Instagram &amp; Stories</span>
      </div>
    </div>
  );
}
