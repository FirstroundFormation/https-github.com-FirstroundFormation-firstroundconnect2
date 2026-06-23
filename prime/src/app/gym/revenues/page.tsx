import { Euro, TrendingUp, CheckCircle, Clock } from "lucide-react";

const TRANSFERS = [
  { date: "15 juin 2026", athlete: "Alex Martin", session: "28 juin 09h00", gross: 85, net: 68, status: "completed" },
  { date: "15 juin 2026", athlete: "Sophie Leblanc", session: "28 juin 09h00", gross: 85, net: 68, status: "completed" },
  { date: "12 juin 2026", athlete: "Karim Benali", session: "12 juin 10h00", gross: 85, net: 68, status: "completed" },
  { date: "8 juin 2026", athlete: "Emma Simon", session: "8 juin 09h00", gross: 85, net: 68, status: "pending" },
  { date: "1 juin 2026", athlete: "Lucas Martin", session: "1 juin 14h00", gross: 85, net: 68, status: "completed" },
];

export default function RevenuesPage() {
  const total = TRANSFERS.filter(t => t.status === "completed").reduce((sum, t) => sum + t.net, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <p className="text-gold font-orbitron text-xs tracking-widest mb-1">SALLE</p>
        <h1 className="font-orbitron font-black text-3xl text-white">Historique des revenus</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total reçu (juin)", value: `${total}€`, icon: Euro, color: "#22C55E" },
          { label: "Sessions réalisées", value: String(TRANSFERS.filter(t => t.status === "completed").length), icon: TrendingUp, color: "#C9A227" },
          { label: "Commission PRIME", value: `${TRANSFERS.filter(t => t.status==="completed").length * 17}€`, icon: Euro, color: "#3B5FCC" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card-dark p-5 text-center">
            <Icon size={18} className="mx-auto mb-2" style={{ color }} />
            <p className="font-orbitron font-black text-2xl" style={{ color }}>{value}</p>
            <p className="text-xs text-white/40 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="card-dark overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <p className="font-orbitron font-bold text-white text-sm tracking-wide">REVERSEMENTS STRIPE</p>
        </div>
        <div className="divide-y divide-white/5">
          {TRANSFERS.map((t, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-bold text-white">{t.athlete}</p>
                <p className="text-xs text-white/30">{t.date} · {t.session}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <p className="text-xs text-white/30 line-through">{t.gross}€</p>
                  <p className="font-orbitron font-bold text-green-400">+{t.net}€</p>
                </div>
                {t.status === "completed" ? (
                  <div className="flex items-center gap-1 text-xs text-green-400"><CheckCircle size={12} /> Versé</div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-amber-400"><Clock size={12} /> En attente</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
