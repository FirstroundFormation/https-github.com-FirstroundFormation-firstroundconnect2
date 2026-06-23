import { Trophy, MapPin } from "lucide-react";
import PrimeBadge from "@/components/PrimeBadge";

const ATHLETES = [
  { id: "1", name: "Alex Martin", city: "Paris", gender: "M", last_score: 72, tier: "Avancé" as const, sessions: 3, date: "15 juin 2026" },
  { id: "2", name: "Sophie Leblanc", city: "Paris", gender: "F", last_score: 68, tier: "Avancé" as const, sessions: 2, date: "15 juin 2026" },
  { id: "3", name: "Karim Benali", city: "Paris", gender: "M", last_score: 81, tier: "Avancé" as const, sessions: 4, date: "12 juin 2026" },
  { id: "4", name: "Emma Simon", city: "Paris", gender: "F", last_score: 91, tier: "Elite" as const, sessions: 5, date: "8 juin 2026" },
  { id: "5", name: "Lucas Martin", city: "Bordeaux", gender: "M", last_score: 57, tier: "Intermédiaire" as const, sessions: 1, date: "1 juin 2026" },
];

export default function GymAthletesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div>
        <p className="text-gold font-orbitron text-xs tracking-widest mb-1">SALLE</p>
        <h1 className="font-orbitron font-black text-3xl text-white">Mes athlètes</h1>
        <p className="text-white/40 text-sm mt-1">{ATHLETES.length} athlètes ont passé PRIME dans votre salle</p>
      </div>

      <div className="space-y-3">
        {ATHLETES.map(a => (
          <div key={a.id} className="card-dark px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-royal/30 flex items-center justify-center text-gold font-orbitron font-bold">
                {a.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white text-sm">{a.name}</p>
                <p className="text-xs text-white/40 flex items-center gap-1"><MapPin size={10} />{a.city} · {a.gender === "M" ? "H" : "F"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-xs text-white/30">{a.sessions} session{a.sessions > 1 ? "s" : ""}</p>
                <p className="text-xs text-white/20">Dernière : {a.date}</p>
              </div>
              <PrimeBadge tier={a.tier} />
              <div className="flex items-center gap-1 text-gold font-orbitron font-bold">
                <Trophy size={13} />{a.last_score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
