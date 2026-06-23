import type { Tier } from "@/lib/types";

const TIER_STYLES: Record<Tier, string> = {
  Elite: "bg-gold/20 text-gold border-gold/40",
  Avancé: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  Intermédiaire: "bg-green-500/20 text-green-400 border-green-500/40",
  Débutant: "bg-white/10 text-white/60 border-white/20",
};

export default function PrimeBadge({ tier }: { tier: Tier }) {
  return (
    <span className={`px-3 py-1 rounded-full border text-xs font-bold font-orbitron tracking-wider ${TIER_STYLES[tier]}`}>
      {tier.toUpperCase()}
    </span>
  );
}
