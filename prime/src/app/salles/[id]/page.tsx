import Link from "next/link";
import { MapPin, Calendar, Users, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

const GYM = {
  id: "1", name: "CrossFit Nation Paris", city: "Paris", address: "12 rue de la Roquette, 75011 Paris",
  description: "CrossFit Nation est l'une des salles les mieux équipées de Paris pour le testing PRIME. Encadrement expert, protocole respecté à 100%.",
  rating: 4.8, reviews: 47, sessions_done: 23,
  equipment: ["Concept2 Rower", "Barbell + poids Eleiko", "Wall balls (9kg/6kg)", "Kettlebells (32kg/24kg)", "Plateforme soulevé de terre", "Ceintures de portage"],
  sessions: [
    { id: "s1", date: "Sam 28 juin 2026", time: "09h00", spots: 3, price: 85 },
    { id: "s2", date: "Sam 28 juin 2026", time: "14h00", spots: 5, price: 85 },
    { id: "s3", date: "Dim 29 juin 2026", time: "09h00", spots: 2, price: 85 },
    { id: "s4", date: "Sam 5 juil 2026", time: "09h00", spots: 8, price: 85 },
  ],
};

export default async function GymPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  void id;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/salles" className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-gold transition-colors mb-6">
        <ArrowLeft size={14} /> Retour aux salles
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="card-dark p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-royal/30 flex items-center justify-center text-gold font-orbitron font-black text-2xl shrink-0">
                {GYM.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="font-orbitron font-black text-2xl text-white mb-1">{GYM.name}</h1>
                <p className="text-white/50 flex items-center gap-1 text-sm"><MapPin size={13} />{GYM.address}</p>
              </div>
              <div className="text-right">
                <div className="text-gold font-orbitron font-bold text-lg">{GYM.rating}</div>
                <div className="text-white/30 text-xs">{GYM.reviews} avis</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{GYM.description}</p>
            <div className="flex gap-6 mt-4 pt-4 border-t border-white/10">
              <div className="text-center">
                <p className="font-orbitron font-bold text-gold">{GYM.sessions_done}</p>
                <p className="text-xs text-white/40">Sessions réalisées</p>
              </div>
              <div className="text-center">
                <p className="font-orbitron font-bold text-gold">{GYM.sessions_done * 6}</p>
                <p className="text-xs text-white/40">Athlètes testés</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Salle certifiée PRIME</span>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div className="card-dark p-6">
            <h2 className="font-orbitron font-bold text-white text-sm tracking-wide mb-4">ÉQUIPEMENTS</h2>
            <div className="grid grid-cols-2 gap-2">
              {GYM.equipment.map(eq => (
                <div key={eq} className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle size={14} className="text-green-400 shrink-0" />
                  {eq}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="space-y-4">
          <h2 className="font-orbitron font-bold text-white text-sm tracking-wide">SESSIONS DISPONIBLES</h2>
          {GYM.sessions.map(session => (
            <div key={session.id} className="card-dark p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={14} className="text-gold" />
                <span className="text-sm font-bold text-white">{session.date}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60 text-sm">{session.time}</span>
                <div className="flex items-center gap-1 text-xs text-white/40">
                  <Users size={11} />
                  {session.spots} place{session.spots > 1 ? "s" : ""} restante{session.spots > 1 ? "s" : ""}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-orbitron font-bold text-gold">{session.price}€</span>
                <Link href={`/sessions/${session.id}`} className="px-4 py-2 bg-gold text-black text-xs font-orbitron font-bold rounded-lg hover:bg-gold/90 transition-colors flex items-center gap-1">
                  RÉSERVER <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
