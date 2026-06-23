"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Calendar, Users, CheckCircle, X, ClipboardList } from "lucide-react";

const INITIAL_SESSIONS = [
  { id: "s1", date: "2026-06-28", time: "09:00", booked: 5, max: 8, status: "scheduled" as const, revenue: 340 },
  { id: "s2", date: "2026-06-28", time: "14:00", booked: 3, max: 8, status: "scheduled" as const, revenue: 204 },
  { id: "s3", date: "2026-06-29", time: "09:00", booked: 6, max: 8, status: "scheduled" as const, revenue: 408 },
  { id: "s4", date: "2026-06-15", time: "09:00", booked: 8, max: 8, status: "completed" as const, revenue: 544 },
];

export default function GymSessionsPage() {
  const [sessions] = useState(INITIAL_SESSIONS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: "", time: "09:00", max: "8" });

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gold font-orbitron text-xs tracking-widest mb-1">SALLE</p>
          <h1 className="font-orbitron font-black text-3xl text-white">Mes sessions</h1>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-gold text-black font-orbitron font-bold text-xs tracking-wide rounded-lg hover:bg-gold/90 transition-colors cursor-pointer">
          <Plus size={14} /> NOUVELLE SESSION
        </button>
      </div>

      {showForm && (
        <div className="card-dark p-6 border-gold/30">
          <div className="flex items-center justify-between mb-4">
            <p className="font-orbitron font-bold text-white">Créer une session</p>
            <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white cursor-pointer"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Date</label>
              <input type="date" value={form.date} onChange={e => set("date", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-gold/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Heure</label>
              <input type="time" value={form.time} onChange={e => set("time", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-gold/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Places max</label>
              <input type="number" min="1" max="20" value={form.max} onChange={e => set("max", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-gold/50 transition-colors" />
            </div>
          </div>
          <button className="px-6 py-2 bg-gold text-black font-orbitron font-bold text-xs tracking-wide rounded-lg hover:bg-gold/90 transition-colors cursor-pointer">
            CRÉER LA SESSION
          </button>
        </div>
      )}

      <div className="space-y-3">
        {sessions.map(s => (
          <div key={s.id} className="card-dark p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.status === "completed" ? "bg-green-500/20" : "bg-royal/30"}`}>
                <Calendar size={16} className={s.status === "completed" ? "text-green-400" : "text-gold"} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">{s.date} · {s.time}</p>
                <p className="text-xs text-white/40 flex items-center gap-1"><Users size={10} />{s.booked}/{s.max} réservations</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="font-orbitron font-bold text-green-400 text-sm">+{s.revenue}€</p>
                <p className="text-xs text-white/30">Votre part (80%)</p>
              </div>
              {s.status === "completed" ? (
                <div className="flex items-center gap-1 text-green-400 text-xs"><CheckCircle size={14} /> Terminé</div>
              ) : (
                <Link href={`/gym/sessions/${s.id}/score`} className="flex items-center gap-1 px-3 py-2 border border-gold/30 text-gold text-xs font-bold rounded-lg hover:bg-gold/10 transition-colors cursor-pointer">
                  <ClipboardList size={13} /> Saisir scores
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
