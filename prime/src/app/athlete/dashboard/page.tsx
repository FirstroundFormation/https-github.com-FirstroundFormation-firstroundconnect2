import Link from "next/link";
import { Trophy, Calendar, TrendingUp, MapPin, ArrowRight, Zap, Star } from "lucide-react";
import PrimeBadge from "@/components/PrimeBadge";
import GaugeChart from "@/components/GaugeChart";
import RadarChart from "@/components/RadarChart";

const LAST_SCORE = {
  prime_score: 72, tier: "Avancé" as const,
  score_cardio: 27, score_resistance: 21, score_puissance: 14, score_force: 7, score_mobilite: 3,
  gym: "CrossFit Nation Paris", date: "15 juin 2026",
};

const PILLARS = [
  { label: "Cardio", score: LAST_SCORE.score_cardio, max: 35, color: "#3B5FCC" },
  { label: "Résistance", score: LAST_SCORE.score_resistance, max: 30, color: "#22C55E" },
  { label: "Puissance", score: LAST_SCORE.score_puissance, max: 20, color: "#C9A227" },
  { label: "Force", score: LAST_SCORE.score_force, max: 10, color: "#EF4444" },
  { label: "Mobilité", score: LAST_SCORE.score_mobilite, max: 5, color: "#A78BFA" },
];

const HISTORY = [
  { date: "15 juin 2026", score: 72, tier: "Avancé" as const },
  { date: "12 avr. 2026", score: 65, tier: "Avancé" as const },
  { date: "8 jan. 2026", score: 55, tier: "Intermédiaire" as const },
];

// Gamification: XP toward next tier (85 = Elite)
const XP_CURRENT = 72;
const XP_NEXT_TIER = 85;
const XP_PREV_TIER = 65;
const XP_PROGRESS = Math.round(((XP_CURRENT - XP_PREV_TIER) / (XP_NEXT_TIER - XP_PREV_TIER)) * 100);

const ACHIEVEMENTS = [
  { label: "1ère session", icon: Star, earned: true },
  { label: "Score 65+", icon: TrendingUp, earned: true },
  { label: "Top 10 Paris", icon: Trophy, earned: false },
  { label: "Score 85+", icon: Zap, earned: false },
];

export default function AthleteDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gold font-barlow font-bold text-sm tracking-widest uppercase mb-1">Dashboard Athlète</p>
          <h1 className="font-barlow font-black text-5xl text-white uppercase tracking-tight">Alex Martin</h1>
          <p className="text-white/40 text-sm flex items-center gap-1 mt-1"><MapPin size={12} />Paris · Objectif HYROX</p>
        </div>
        <Link href="/athlete/scorecard" className="hidden md:flex items-center gap-2 px-5 py-2.5 border border-gold/40 text-gold text-sm font-bold hover:bg-gold hover:text-black transition-all duration-200 rounded-lg cursor-pointer font-barlow uppercase tracking-wide">
          <Trophy size={15} /> Ma Scorecard
        </Link>
      </div>

      {/* ── GAMIFICATION: XP Bar ── */}
      <div className="card-dark p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Zap size={16} className="text-gold" />
            <span className="font-barlow font-bold text-sm text-white uppercase tracking-wide">Progression vers Elite</span>
          </div>
          <span className="font-barlow font-bold text-gold text-sm">{XP_PROGRESS}% · {XP_NEXT_TIER - XP_CURRENT} pts restants</span>
        </div>
        <div className="xp-bar">
          <div className="xp-bar-fill" style={{ width: `${XP_PROGRESS}%` }} />
        </div>
        <div className="flex justify-between text-xs text-white/30 mt-2 font-barlow">
          <span>Avancé ({XP_PREV_TIER})</span>
          <span>Elite ({XP_NEXT_TIER})</span>
        </div>
      </div>

      {/* ── Main score section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Gauge + Badge */}
        <div className="card-dark p-6 glow-gold flex flex-col items-center">
          <p className="text-white/40 text-xs font-barlow font-bold tracking-widest uppercase mb-4">PRIME Score</p>
          <GaugeChart score={LAST_SCORE.prime_score} size={200} />
          <div className="mt-3 mb-2"><PrimeBadge tier={LAST_SCORE.tier} /></div>
          <p className="text-xs text-white/30 font-barlow mt-3 text-center">{LAST_SCORE.gym}<br />{LAST_SCORE.date}</p>
        </div>

        {/* Radar Chart */}
        <div className="card-dark p-6 flex flex-col items-center">
          <p className="text-white/40 text-xs font-barlow font-bold tracking-widest uppercase mb-4">Profil athlétique</p>
          <RadarChart pillars={PILLARS} size={240} />
        </div>

        {/* Progression + Quick actions */}
        <div className="space-y-6">
          {/* Next session */}
          <div className="card-dark p-5">
            <p className="text-xs font-barlow font-bold text-white/40 tracking-widest uppercase mb-3">Prochaine Session</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-barlow font-bold text-white text-lg">CrossFit Nation Paris</p>
                <p className="text-white/50 text-sm flex items-center gap-1 mt-1"><Calendar size={12} /> 28 juin · 09h00</p>
              </div>
              <Link href="/sessions/s1" className="flex items-center gap-1 text-gold text-sm font-bold hover:text-gold/70 transition-colors cursor-pointer">Voir <ArrowRight size={13} /></Link>
            </div>
          </div>

          {/* Score history mini */}
          <div className="card-dark p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-barlow font-bold text-white/40 tracking-widest uppercase">Progression</p>
              <Link href="/athlete/scores" className="text-xs text-gold hover:underline flex items-center gap-1 cursor-pointer font-barlow">Historique <TrendingUp size={11} /></Link>
            </div>
            <div className="space-y-3">
              {HISTORY.map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-white/30 w-28 font-barlow">{h.date}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${h.score}%` }} />
                  </div>
                  <span className="font-barlow font-bold text-white text-sm w-6 text-right">{h.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick nav */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Réserver", href: "/athlete/sessions", icon: Calendar },
              { label: "Scores", href: "/athlete/scores", icon: Trophy },
              { label: "Classement", href: "/athlete/ranking", icon: TrendingUp },
            ].map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href} className="card-dark p-4 text-center hover:bg-gold/10 hover:border-gold/40 transition-all duration-200 cursor-pointer group block">
                <Icon size={20} className="text-gold mx-auto mb-2" />
                <p className="text-xs font-barlow font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-wide">{label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── GAMIFICATION: Achievements ── */}
      <div>
        <p className="font-barlow font-black text-2xl text-white uppercase tracking-tight mb-6">Achievements</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map(({ label, icon: Icon, earned }) => (
            <div key={label} className={`card-dark p-5 text-center transition-all duration-200 ${earned ? "border-gold/30 hover:bg-gold/10 cursor-default" : "opacity-40"}`}>
              <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${earned ? "bg-gold/20" : "bg-white/5"}`}>
                <Icon size={22} className={earned ? "text-gold" : "text-white/30"} />
              </div>
              <p className={`text-xs font-barlow font-bold uppercase tracking-wide ${earned ? "text-gold" : "text-white/30"}`}>{label}</p>
              {earned && <p className="text-[10px] text-green-400 mt-1 font-barlow">Débloqué ✓</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
