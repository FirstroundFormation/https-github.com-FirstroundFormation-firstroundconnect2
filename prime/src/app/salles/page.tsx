import Link from "next/link";
import { MapPin, Calendar, Star, Filter } from "lucide-react";

const GYMS = [
  { id: "1", name: "CrossFit Nation Paris", city: "Paris", zip: "75011", address: "12 rue de la Roquette", sessions: 12, rating: 4.8, active: true, equipment: ["rower", "barbell", "kettlebell"], next: "Sam 28 juin 09h00" },
  { id: "2", name: "HYROX Lab Lyon", city: "Lyon", zip: "69003", address: "45 cours Lafayette", sessions: 8, rating: 4.9, active: true, equipment: ["rower", "sled", "barbell"], next: "Dim 29 juin 10h00" },
  { id: "3", name: "Athletic Club Bordeaux", city: "Bordeaux", zip: "33000", address: "8 allée de Tourny", sessions: 5, rating: 4.6, active: true, equipment: ["rower", "barbell"], next: "Sam 5 juil 10h30" },
  { id: "4", name: "Force & Forme Nantes", city: "Nantes", zip: "44000", address: "23 rue du Commerce", sessions: 7, rating: 4.7, active: true, equipment: ["rower", "barbell", "kettlebell"], next: "Sam 28 juin 14h00" },
  { id: "5", name: "Elite Performance Lille", city: "Lille", zip: "59000", address: "5 grand place", sessions: 9, rating: 4.9, active: true, equipment: ["rower", "sled", "barbell"], next: "Sam 28 juin 08h00" },
  { id: "6", name: "Sport Arena Marseille", city: "Marseille", zip: "13001", address: "10 la Canebière", sessions: 6, rating: 4.5, active: true, equipment: ["rower", "barbell"], next: "Dim 29 juin 09h30" },
  { id: "7", name: "Power Box Toulouse", city: "Toulouse", zip: "31000", address: "3 place du Capitole", sessions: 4, rating: 4.7, active: false, equipment: ["rower", "barbell"], next: "Bientôt" },
  { id: "8", name: "Forge Athletic Strasbourg", city: "Strasbourg", zip: "67000", address: "15 rue des Grandes Arcades", sessions: 3, rating: 4.8, active: false, equipment: ["rower", "barbell"], next: "Bientôt" },
];

export default function SallesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-gold font-orbitron text-sm tracking-widest mb-2">RÉSEAU PRIME</p>
        <h1 className="font-orbitron font-black text-4xl text-white mb-3">SALLES CERTIFIÉES</h1>
        <p className="text-white/50">{GYMS.filter(g => g.active).length} salles actives · {GYMS.length} au total</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="w-full lg:w-56 shrink-0 space-y-6">
          <div className="card-dark p-4">
            <div className="flex items-center gap-2 text-white/60 text-sm font-bold mb-4">
              <Filter size={14} /> Filtres
            </div>
            <div className="space-y-2">
              {["Toutes", "Paris", "Lyon", "Bordeaux", "Nantes", "Lille"].map(city => (
                <button key={city} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${city === "Toutes" ? "bg-gold/20 text-gold" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                  {city}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {GYMS.map(gym => (
            <Link key={gym.id} href={`/salles/${gym.id}`} className="card-dark p-5 hover:border-gold/30 transition-all cursor-pointer group block">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-royal/30 flex items-center justify-center text-gold font-orbitron font-black text-xl">
                  {gym.name.charAt(0)}
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-400">
                  <Star size={11} className="fill-amber-400" />
                  {gym.rating}
                </div>
              </div>

              <h3 className="font-bold text-white text-sm mb-1 group-hover:text-gold transition-colors line-clamp-2">{gym.name}</h3>
              <p className="text-xs text-white/40 flex items-center gap-1 mb-3">
                <MapPin size={10} />{gym.address}, {gym.city}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {gym.equipment.slice(0, 3).map(e => (
                  <span key={e} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">{e}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-1 text-xs text-gold/70">
                  <Calendar size={10} />
                  {gym.next}
                </div>
                {gym.active ? (
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-green-400">Actif</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-white/30">Bientôt</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
