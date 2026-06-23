import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

const SESSIONS = [
  { id: "s1", gym: "CrossFit Nation Paris", city: "Paris", date: "Sam 28 juin", time: "09h00", spots: 3, price: 85 },
  { id: "s2", gym: "CrossFit Nation Paris", city: "Paris", date: "Sam 28 juin", time: "14h00", spots: 5, price: 85 },
  { id: "s3", gym: "HYROX Lab Lyon", city: "Lyon", date: "Dim 29 juin", time: "10h00", spots: 2, price: 85 },
  { id: "s4", gym: "Athletic Club Bordeaux", city: "Bordeaux", date: "Sam 5 juil", time: "10h30", spots: 8, price: 85 },
  { id: "s5", gym: "Force & Forme Nantes", city: "Nantes", date: "Sam 28 juin", time: "14h00", spots: 4, price: 85 },
  { id: "s6", gym: "Elite Performance Lille", city: "Lille", date: "Sam 28 juin", time: "08h00", spots: 1, price: 85 },
];

export default function SessionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-gold font-orbitron text-xs tracking-widest mb-1">ATHLÈTE</p>
        <h1 className="font-orbitron font-black text-3xl text-white">Réserver une session</h1>
        <p className="text-white/40 text-sm mt-1">{SESSIONS.length} sessions disponibles en France</p>
      </div>

      <div className="space-y-3">
        {SESSIONS.map(s => (
          <Link key={s.id} href={`/sessions/${s.id}`} className="card-dark p-5 flex items-center justify-between hover:border-gold/30 transition-all cursor-pointer group block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-royal/30 flex items-center justify-center text-gold font-orbitron font-black text-lg shrink-0">
                {s.gym.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white group-hover:text-gold transition-colors">{s.gym}</p>
                <p className="text-xs text-white/40 flex items-center gap-1"><MapPin size={10} />{s.city}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="text-white font-bold">{s.date}</p>
                <p className="text-white/40 text-xs flex items-center gap-1"><Calendar size={10} />{s.time}</p>
              </div>
              <div className="text-center">
                <p className="text-white/50 text-xs flex items-center gap-1"><Users size={10} />{s.spots} places</p>
              </div>
              <div className="text-center">
                <p className="font-orbitron font-bold text-gold">{s.price}€</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-white/30 group-hover:text-gold transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
