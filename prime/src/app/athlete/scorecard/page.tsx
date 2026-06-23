"use client";
import { useRef, useState } from "react";
import { Download } from "lucide-react";

const DATA = {
  athlete: { prenom: "THOMAS", nom: "DUPONT", sub: "Vise HYROX 2026 · Lyon", location: "LYON · CROSSFIT LYON 7" },
  rank: { num: "03", label: "TOP NATIONAL", cat: "H · 30-39" },
  prime_score: 79,
  date: "JUIN 2026 · PRIME TESTING",
  pillars: [
    { name: "CARDIO",    max: 35, score: 29, color: "#3B5FCC" },
    { name: "RÉSIST.",   max: 30, score: 23, color: "#22C55E" },
    { name: "PUISSANCE", max: 20, score: 16, color: "#C9A227" },
    { name: "FORCE",     max: 10, score:  7, color: "#EF4444" },
    { name: "MOBILITÉ",  max:  5, score:  4, color: "#A78BFA" },
  ],
  epreuves: [
    { icon: "🚣", name: "2KM ROW",        val: "7'42\"",  pillar: 0 },
    { icon: "🏃", name: "TEST 6MIN",       val: "1 450 m", pillar: 0 },
    { icon: "🏀", name: "WALL BALLS",      val: "74 reps", pillar: 1 },
    { icon: "💪", name: "PUSH-UPS",        val: "22 reps", pillar: 1 },
    { icon: "↔", name: "BROAD JUMP",      val: "2.15 m",  pillar: 2 },
    { icon: "🔼", name: "PUSH PRESS",      val: "11 reps", pillar: 2 },
    { icon: "⬆", name: "DEADLIFT 5RM",   val: "155 kg",  pillar: 3 },
    { icon: "🧳", name: "FARMERS CARRY",   val: "80 m",    pillar: 3 },
    { icon: "🧘", name: "OHS ASSESS.",     val: "B+",      pillar: 4 },
    { icon: "🦵", name: "HIP FLEXOR",      val: "A",       pillar: 4 },
  ],
};

// Pure SVG radar chart inline (no import needed, no overflow clipping issue)
function RadarSVG({ pillars }: { pillars: typeof DATA.pillars }) {
  const size = 140;
  const cx = size / 2, cy = size / 2, r = size * 0.36;
  const n = pillars.length;
  const angles = pillars.map((_, i) => (360 / n) * i);
  function pt(angle: number, radius: number) {
    const rad = (angle - 90) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }
  const levels = [0.33, 0.66, 1];
  const dataPoints = pillars.map((p, i) => pt(angles[i], r * (p.score / p.max)));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {levels.map(lv => (
        <polygon key={lv}
          points={angles.map(a => { const p = pt(a, r * lv); return `${p.x},${p.y}`; }).join(" ")}
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      ))}
      {angles.map((a, i) => {
        const outer = pt(a, r);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
      })}
      <path d={dataPath} fill="rgba(201,162,39,0.15)" stroke="#C9A227" strokeWidth="1.5" strokeLinejoin="round" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={pillars[i].color} stroke="#000" strokeWidth="1.5" />
      ))}
      {angles.map((a, i) => {
        const lp = pt(a, r + 17);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fill={pillars[i].color} fontSize="8" fontFamily="'Barlow Condensed', sans-serif" fontWeight="700">
            {pillars[i].name.substring(0, 5)}
          </text>
        );
      })}
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
    const canvas = await html2canvas(cardRef.current, { scale: 3, backgroundColor: "#000", useCORS: true, logging: false });
    const link = document.createElement("a");
    link.download = `PRIME-${DATA.athlete.nom}-${DATA.prime_score}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setExporting(false);
  }

  const PILLAR_COLORS = DATA.pillars.map(p => p.color);

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: "#111" }}>
      {/* Page header */}
      <div className="max-w-xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <p className="font-orbitron text-gold/60 text-xs tracking-[0.3em] mb-1">MA SCORECARD</p>
          <h1 className="font-barlow font-black text-2xl text-white">Exporte et partage</h1>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs tracking-widest text-black cursor-pointer disabled:opacity-60 transition-all"
          style={{ background: "#C9A227", boxShadow: "0 0 20px rgba(201,162,39,0.4)" }}
        >
          {exporting ? "⏳" : <Download size={14} />}
          {exporting ? "Export..." : "PNG HD"}
        </button>
      </div>

      {/* ══ CARD ══ */}
      <div ref={cardRef} className="max-w-xl mx-auto overflow-hidden"
        style={{ background: "#000", border: "1px solid rgba(201,162,39,0.15)", boxShadow: "0 0 60px rgba(0,0,0,0.8)" }}>

        {/* ── PHOTO ZONE ── */}
        <div className="relative overflow-hidden" style={{ height: 280 }}>
          {/* Background gradient when no photo */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #0D1B3E 0%, #1E3A8A 60%, #0A0A14 100%)" }} />
          {/* Athlete silhouette suggestion */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg viewBox="0 0 200 280" width="200" height="280" fill="white">
              <ellipse cx="100" cy="45" rx="28" ry="28" />
              <path d="M55 90 Q70 75 100 78 Q130 75 145 90 L155 180 L130 185 L120 140 L118 240 L82 240 L80 140 L70 185 L45 180 Z" />
            </svg>
          </div>
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: 140,
            background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 70%, #000 100%)" }} />

          {/* Logo */}
          <div className="absolute top-3 left-4 font-orbitron font-black text-lg tracking-widest"
            style={{ textShadow: "0 0 20px rgba(201,162,39,0.5)" }}>
            <span className="text-white">PR</span><span style={{ color: "#C9A227" }}>I</span><span className="text-white">ME</span>
          </div>

          {/* Rank badge */}
          <div className="absolute top-3 right-4 text-right">
            <p className="font-orbitron text-[9px] font-bold tracking-widest" style={{ color: "rgba(201,162,39,0.7)" }}>
              {DATA.rank.label}
            </p>
            <p className="font-orbitron font-black leading-none" style={{ fontSize: 56, color: "#C9A227", textShadow: "0 0 30px rgba(201,162,39,0.4)" }}>
              {DATA.rank.num}
            </p>
            <p className="font-orbitron font-bold text-xs tracking-widest" style={{ color: "#C9A227" }}>
              {DATA.rank.cat}
            </p>
          </div>

          {/* Location */}
          <p className="absolute font-orbitron font-bold text-[9px] tracking-widest"
            style={{ bottom: 38, left: 16, color: "rgba(255,255,255,0.6)" }}>
            {DATA.athlete.location}
          </p>
        </div>

        {/* ── NAME ZONE ── */}
        <div className="px-4 py-3" style={{ background: "#000" }}>
          <h2 className="font-orbitron font-black text-white leading-none tracking-tight" style={{ fontSize: "clamp(28px,6vw,40px)" }}>
            {DATA.athlete.prenom}<br />{DATA.athlete.nom}
          </h2>
          <p className="font-orbitron text-[11px] font-semibold tracking-widest mt-1.5"
            style={{ color: "rgba(255,255,255,0.38)", textTransform: "uppercase" }}>
            {DATA.athlete.sub}
          </p>
        </div>

        {/* ── SCORE + PILLARS + RADAR ── */}
        <div className="px-4 py-3 flex items-start gap-4"
          style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)" }}>

          {/* Score */}
          <div className="shrink-0">
            <p className="font-orbitron text-[8px] font-bold tracking-widest" style={{ color: "rgba(201,162,39,0.6)" }}>PRIME SCORE</p>
            <p className="font-orbitron font-black leading-none" style={{ fontSize: 64, color: "#C9A227", textShadow: "0 0 40px rgba(201,162,39,0.3)" }}>
              {DATA.prime_score}
            </p>
            <p className="font-orbitron font-semibold text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>/100</p>
          </div>

          {/* Pillar bars */}
          <div className="flex-1 flex flex-col gap-1.5 justify-center pt-1">
            {DATA.pillars.map(({ name, max, score, color }) => (
              <div key={name} className="flex items-center gap-0">
                <span className="font-orbitron text-[8px] font-bold tracking-wide shrink-0" style={{ color, width: 68 }}>{name}</span>
                <span className="font-orbitron font-bold text-[11px] shrink-0" style={{ color, width: 28 }}>{score}</span>
                <span className="font-orbitron text-[9px] shrink-0" style={{ color: "rgba(255,255,255,0.25)", width: 26 }}>/{max}</span>
                <div className="flex-1 h-[4px] rounded-sm overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="h-full rounded-sm" style={{ width: `${(score / max) * 100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Radar — toile d'araignée */}
          <div className="shrink-0">
            <RadarSVG pillars={DATA.pillars} />
          </div>
        </div>

        {/* ── ÉPREUVES GRID ── */}
        <div className="grid grid-cols-2"
          style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {DATA.epreuves.map(({ icon, name, val, pillar }, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-7 h-7 flex items-center justify-center text-xs shrink-0"
                style={{ border: `1px solid ${PILLAR_COLORS[pillar]}30` }}>
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-orbitron text-[8px] font-semibold tracking-wide truncate"
                  style={{ color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                  {name}
                </p>
                <p className="font-orbitron font-bold text-[12px]" style={{ color: PILLAR_COLORS[pillar] }}>{val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <div className="flex items-center justify-between px-4 py-2"
          style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="font-orbitron text-[9px] font-semibold tracking-widest"
            style={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
            {DATA.date}
          </p>
          <p className="font-orbitron text-[8px] font-bold tracking-widest"
            style={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
            FIND YOUR <span style={{ color: "#C9A227" }}>PRIME</span>
          </p>
        </div>

        {/* Rainbow bar */}
        <div className="h-1" style={{ background: "linear-gradient(to right, #3B5FCC, #C9A227, #22C55E, #EF4444, #A78BFA)" }} />
      </div>
    </div>
  );
}
