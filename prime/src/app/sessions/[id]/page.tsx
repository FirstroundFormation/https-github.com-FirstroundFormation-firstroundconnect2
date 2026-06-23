import Link from "next/link";
import { Calendar, MapPin, Users, Clock, CheckCircle, ArrowLeft, Shield } from "lucide-react";

const SESSION = {
  id: "s1", date: "Samedi 28 juin 2026", time: "09h00–11h30",
  gym: { id: "1", name: "CrossFit Nation Paris", address: "12 rue de la Roquette, 75011 Paris" },
  spots_left: 3, max: 8, price: 85,
  coach: "Thomas R. — Coach certifié PRIME",
};

const PROTOCOL = [
  { pilier: "CARDIO", color: "#3B5FCC", events: ["Rowing 2km — effort maximal", "Run 6 minutes — distance maximale"] },
  { pilier: "RÉSISTANCE", color: "#22C55E", events: ["Wall Balls 5min — répétitions max (9kg H / 6kg F)", "Push-ups max — sans temps limite"] },
  { pilier: "PUISSANCE", color: "#C9A227", events: ["Broad Jump — meilleur saut (3 essais)", "Push Press AMRAP — 40kg H / 25kg F"] },
  { pilier: "FORCE", color: "#EF4444", events: ["Deadlift 5RM — charge max", "Farmers Carry — distance avec 50% du poids du corps"] },
  { pilier: "MOBILITÉ", color: "#A78BFA", events: ["Overhead Squat — notation A/B/C/D", "Hip Flexor Test — notation A/B/C/D"] },
];

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  void id;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/salles/1" className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-gold transition-colors mb-6">
        <ArrowLeft size={14} /> Retour à la salle
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <p className="text-gold font-orbitron text-xs tracking-widest mb-2">SESSION PRIME</p>
            <h1 className="font-orbitron font-black text-3xl text-white">{SESSION.gym.name}</h1>
            <p className="text-white/50 mt-1 flex items-center gap-2 text-sm">
              <MapPin size={13} /> {SESSION.gym.address}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Calendar, label: SESSION.date, sub: SESSION.time },
              { icon: Users, label: `${SESSION.spots_left} places`, sub: `sur ${SESSION.max}` },
              { icon: Clock, label: "2h30 environ", sub: "protocole complet" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="card-dark p-3 text-center">
                <Icon size={16} className="text-gold mx-auto mb-2" />
                <p className="text-white text-xs font-bold">{label}</p>
                <p className="text-white/40 text-xs">{sub}</p>
              </div>
            ))}
          </div>

          <div className="card-dark p-6">
            <h2 className="font-orbitron font-bold text-white text-sm tracking-wide mb-5">PROTOCOLE DES 10 ÉPREUVES</h2>
            <div className="space-y-4">
              {PROTOCOL.map(({ pilier, color, events }) => (
                <div key={pilier}>
                  <p className="text-xs font-orbitron font-bold tracking-widest mb-2" style={{ color }}>{pilier}</p>
                  <div className="space-y-1 pl-3 border-l-2" style={{ borderColor: `${color}40` }}>
                    {events.map(e => (
                      <div key={e} className="flex items-center gap-2 text-sm text-white/60">
                        <CheckCircle size={12} style={{ color }} className="shrink-0" />
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Panel */}
        <div className="sticky top-24 space-y-4">
          <div className="card-dark p-6 glow-gold">
            <p className="text-white/40 text-xs font-orbitron tracking-widest mb-1">TARIF</p>
            <p className="font-orbitron font-black text-5xl text-gold mb-1">{SESSION.price}€</p>
            <p className="text-xs text-white/30 mb-6">Paiement unique — scorecard incluse</p>

            <div className="space-y-2 text-sm text-white/60 mb-6">
              <div className="flex justify-between">
                <span>Date</span><span className="text-white">{SESSION.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Horaire</span><span className="text-white">{SESSION.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Coach</span><span className="text-white text-xs">{SESSION.coach.split("—")[0]}</span>
              </div>
            </div>

            <Link href="/auth/register" className="block w-full py-4 bg-gold text-black font-orbitron font-bold text-sm tracking-widest rounded-lg hover:bg-gold/90 transition-all text-center">
              RÉSERVER MAINTENANT
            </Link>
            <p className="text-xs text-white/30 text-center mt-3 flex items-center justify-center gap-1">
              <Shield size={11} /> Paiement sécurisé Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
