"use client";
import { useState, useCallback } from "react";
import { computePrimeScore } from "@/lib/scoring";
import type { Grade } from "@/lib/types";
import { CheckCircle, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PrimeBadge from "@/components/PrimeBadge";
import ScorePillar from "@/components/ScorePillar";

type FormState = {
  athlete_name: string; gender: "M" | "F"; body_weight_kg: string;
  rowing_2km_seconds: string; run_6min_meters: string;
  wall_balls_5min_reps: string; pushups_max_reps: string;
  broad_jump_cm: string; push_press_amrap_reps: string;
  deadlift_5rm_kg: string; farmers_carry_meters: string;
  overhead_squat_grade: Grade; hip_flexor_grade: Grade;
};

const FIELDS = [
  { pilier: "CARDIO", color: "#3B5FCC", items: [
    { key: "rowing_2km_seconds", label: "Rowing 2km", unit: "secondes", ph: "432 (= 7'12\")", min: 180, max: 720 },
    { key: "run_6min_meters", label: "Run 6 min", unit: "mètres", ph: "1480", min: 400, max: 2200 },
  ]},
  { pilier: "RÉSISTANCE", color: "#22C55E", items: [
    { key: "wall_balls_5min_reps", label: "Wall Balls 5min", unit: "reps", ph: "85", min: 0, max: 200 },
    { key: "pushups_max_reps", label: "Push-ups max", unit: "reps", ph: "32", min: 0, max: 150 },
  ]},
  { pilier: "PUISSANCE", color: "#C9A227", items: [
    { key: "broad_jump_cm", label: "Broad Jump", unit: "cm", ph: "235", min: 50, max: 350 },
    { key: "push_press_amrap_reps", label: "Push Press AMRAP", unit: "reps", ph: "13", min: 0, max: 50 },
  ]},
  { pilier: "FORCE", color: "#EF4444", items: [
    { key: "deadlift_5rm_kg", label: "Deadlift 5RM", unit: "kg", ph: "140", min: 20, max: 400 },
    { key: "farmers_carry_meters", label: "Farmers Carry", unit: "m", ph: "75", min: 0, max: 200 },
  ]},
];

const GRADE_OPTIONS: Grade[] = ["A", "B", "C", "D"];
const GRADE_LABELS = { A: "Excellent", B: "Bon", C: "Passable", D: "À travailler" };

export default function ScoringPage() {
  const [form, setForm] = useState<FormState>({
    athlete_name: "", gender: "M", body_weight_kg: "80",
    rowing_2km_seconds: "", run_6min_meters: "",
    wall_balls_5min_reps: "", pushups_max_reps: "",
    broad_jump_cm: "", push_press_amrap_reps: "",
    deadlift_5rm_kg: "", farmers_carry_meters: "",
    overhead_squat_grade: "B", hip_flexor_grade: "B",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  const preview = useCallback(() => {
    const allFilled = [
      form.rowing_2km_seconds, form.run_6min_meters,
      form.wall_balls_5min_reps, form.pushups_max_reps,
      form.broad_jump_cm, form.push_press_amrap_reps,
      form.deadlift_5rm_kg, form.farmers_carry_meters,
    ].every(v => v && !isNaN(Number(v)));
    if (!allFilled) return null;
    return computePrimeScore({
      rowing_2km_seconds: Number(form.rowing_2km_seconds),
      run_6min_meters: Number(form.run_6min_meters),
      wall_balls_5min_reps: Number(form.wall_balls_5min_reps),
      pushups_max_reps: Number(form.pushups_max_reps),
      broad_jump_cm: Number(form.broad_jump_cm),
      push_press_amrap_reps: Number(form.push_press_amrap_reps),
      deadlift_5rm_kg: Number(form.deadlift_5rm_kg),
      body_weight_kg: Number(form.body_weight_kg),
      farmers_carry_meters: Number(form.farmers_carry_meters),
      overhead_squat_grade: form.overhead_squat_grade,
      hip_flexor_grade: form.hip_flexor_grade,
      gender: form.gender,
    });
  }, [form]);

  const result = preview();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted && result) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <div>
          <p className="text-white/40 text-xs font-orbitron tracking-widest mb-2">SCORE ENREGISTRÉ</p>
          <h2 className="font-orbitron font-black text-2xl text-white mb-1">{form.athlete_name}</h2>
          <div className="font-orbitron font-black text-7xl text-gold">{result.prime_score}</div>
          <p className="text-gold/60 font-orbitron text-sm">/ 100</p>
          <div className="flex justify-center mt-3"><PrimeBadge tier={result.tier} /></div>
        </div>
        <div className="card-dark p-4 space-y-2 text-left">
          <ScorePillar label="Cardio" score={result.score_cardio} max={35} color="#3B5FCC" />
          <ScorePillar label="Résistance" score={result.score_resistance} max={30} color="#22C55E" />
          <ScorePillar label="Puissance" score={result.score_puissance} max={20} color="#C9A227" />
          <ScorePillar label="Force" score={result.score_force} max={10} color="#EF4444" />
          <ScorePillar label="Mobilité" score={result.score_mobilite} max={5} color="#A78BFA" />
        </div>
        <p className="text-xs text-white/40">La scorecard a été envoyée automatiquement à l&apos;athlète.</p>
        <button onClick={() => { setSubmitted(false); setForm(f => ({ ...f, athlete_name: "" })); }}
          className="px-6 py-3 bg-gold text-black font-orbitron font-bold text-sm rounded-lg hover:bg-gold/90 transition-colors cursor-pointer">
          ATHLÈTE SUIVANT
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/gym/sessions" className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-gold transition-colors mb-6 cursor-pointer">
        <ArrowLeft size={14} /> Retour aux sessions
      </Link>
      <div className="mb-8">
        <p className="text-gold font-orbitron text-xs tracking-widest mb-1">SAISIE EN DIRECT</p>
        <h1 className="font-orbitron font-black text-3xl text-white">Saisie des scores</h1>
        <p className="text-white/40 text-sm mt-1">Session du Sam 28 juin · 09h00</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {/* Athlete info */}
          <div className="card-dark p-5 space-y-4">
            <p className="font-orbitron font-bold text-white text-sm tracking-wide">ATHLÈTE</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Nom</label>
                <input required value={form.athlete_name} onChange={e => set("athlete_name", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-gold/50 transition-colors"
                  placeholder="Alex Martin" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Poids (kg)</label>
                <input type="number" required value={form.body_weight_kg} onChange={e => set("body_weight_kg", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-gold/50 transition-colors"
                  placeholder="80" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-2">Genre</label>
              <div className="flex gap-3">
                {(["M","F"] as const).map(g => (
                  <button key={g} type="button" onClick={() => set("gender", g)}
                    className={`flex-1 py-2 text-sm font-orbitron font-bold rounded-lg border transition-colors cursor-pointer ${form.gender === g ? "bg-gold/20 border-gold text-gold" : "border-white/10 text-white/40 hover:border-white/20"}`}>
                    {g === "M" ? "HOMME" : "FEMME"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Performance fields */}
          {FIELDS.map(({ pilier, color, items }) => (
            <div key={pilier} className="card-dark p-5 space-y-4">
              <p className="font-orbitron font-bold text-sm tracking-widest" style={{ color }}>{pilier}</p>
              <div className="grid grid-cols-2 gap-4">
                {items.map(({ key, label, unit, ph, min, max }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">{label}</label>
                    <div className="relative">
                      <input type="number" min={min} max={max} value={form[key as keyof FormState]}
                        onChange={e => set(key, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-gold/50 transition-colors pr-12"
                        placeholder={ph} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30">{unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Mobility */}
          <div className="card-dark p-5 space-y-4">
            <p className="font-orbitron font-bold text-sm tracking-widest text-purple-400">MOBILITÉ</p>
            {[
              { key: "overhead_squat_grade", label: "Overhead Squat" },
              { key: "hip_flexor_grade", label: "Hip Flexor" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-2">{label}</label>
                <div className="grid grid-cols-4 gap-2">
                  {GRADE_OPTIONS.map(g => (
                    <button key={g} type="button" onClick={() => set(key, g)}
                      className={`py-2 text-sm font-orbitron font-bold rounded-lg border transition-colors cursor-pointer ${form[key as keyof FormState] === g ? "bg-purple-500/20 border-purple-400 text-purple-300" : "border-white/10 text-white/40 hover:border-white/20"}`}>
                      {g}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-white/30 mt-1">
                  {GRADE_LABELS[form[key as keyof FormState] as Grade]}
                </p>
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading || !result}
            className="w-full py-4 bg-gold text-black font-orbitron font-bold text-sm tracking-widest rounded-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Enregistrement...</> : "VALIDER LE SCORE"}
          </button>
        </form>

        {/* Live preview */}
        <div className="sticky top-24 space-y-4">
          <div className="card-dark p-6">
            <p className="text-xs font-orbitron text-white/40 tracking-widest mb-4">SCORE EN TEMPS RÉEL</p>
            {result ? (
              <>
                <div className="text-center mb-4">
                  <div className="font-orbitron font-black text-7xl text-gold leading-none">{result.prime_score}</div>
                  <p className="text-gold/60 font-orbitron text-xs mt-1">/ 100</p>
                  <div className="flex justify-center mt-2"><PrimeBadge tier={result.tier} /></div>
                </div>
                <div className="space-y-2.5">
                  <ScorePillar label="Cardio" score={result.score_cardio} max={35} color="#3B5FCC" />
                  <ScorePillar label="Résistance" score={result.score_resistance} max={30} color="#22C55E" />
                  <ScorePillar label="Puissance" score={result.score_puissance} max={20} color="#C9A227" />
                  <ScorePillar label="Force" score={result.score_force} max={10} color="#EF4444" />
                  <ScorePillar label="Mobilité" score={result.score_mobilite} max={5} color="#A78BFA" />
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="font-orbitron font-black text-7xl text-white/10">--</div>
                <p className="text-white/30 text-xs mt-2">Remplissez les résultats pour voir le score</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
