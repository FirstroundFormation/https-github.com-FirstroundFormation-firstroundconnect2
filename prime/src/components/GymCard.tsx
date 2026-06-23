import Link from "next/link";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import type { Gym } from "@/lib/types";

export default function GymCard({ gym, nextSession }: { gym: Gym; nextSession?: string }) {
  return (
    <Link href={`/salles/${gym.id}`} className="card-dark block p-5 hover:border-gold/30 transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        {gym.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={gym.photo_url} alt={gym.name} className="w-12 h-12 rounded-lg object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-royal/30 flex items-center justify-center text-gold font-orbitron font-bold text-lg">
            {gym.name.charAt(0)}
          </div>
        )}
        <ChevronRight size={16} className="text-white/30 group-hover:text-gold transition-colors" />
      </div>
      <h3 className="font-bold text-white mb-1 group-hover:text-gold transition-colors">{gym.name}</h3>
      <p className="text-sm text-white/50 flex items-center gap-1 mb-3">
        <MapPin size={12} />{gym.city}
      </p>
      {nextSession && (
        <div className="flex items-center gap-1 text-xs text-gold/80">
          <Calendar size={11} />Prochaine session : {nextSession}
        </div>
      )}
      {gym.is_active && (
        <div className="mt-3 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400">Salle active</span>
        </div>
      )}
    </Link>
  );
}
