import Link from "next/link";
import { User, Building2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <p className="text-gold font-orbitron text-xs tracking-widest mb-3">INSCRIPTION</p>
        <h1 className="font-orbitron font-black text-3xl text-white mb-3">JE SUIS...</h1>
        <p className="text-white/40 text-sm mb-10">Choisissez votre type de compte</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/auth/register/athlete" className="card-dark p-8 hover:border-gold/40 transition-all cursor-pointer group block text-left">
            <div className="w-14 h-14 rounded-2xl bg-royal/30 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
              <User size={24} className="text-gold" />
            </div>
            <h2 className="font-orbitron font-bold text-white text-lg mb-2 group-hover:text-gold transition-colors">ATHLÈTE</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-4">Je veux tester mon niveau et obtenir mon PRIME Score</p>
            <div className="flex items-center text-gold text-sm font-bold">
              Commencer <ArrowRight size={14} className="ml-2" />
            </div>
          </Link>

          <Link href="/auth/register/gym" className="card-dark p-8 hover:border-gold/40 transition-all cursor-pointer group block text-left">
            <div className="w-14 h-14 rounded-2xl bg-royal/30 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
              <Building2 size={24} className="text-gold" />
            </div>
            <h2 className="font-orbitron font-bold text-white text-lg mb-2 group-hover:text-gold transition-colors">SALLE</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-4">Je veux rejoindre le réseau PRIME et proposer des sessions</p>
            <div className="flex items-center text-gold text-sm font-bold">
              Devenir partenaire <ArrowRight size={14} className="ml-2" />
            </div>
          </Link>
        </div>

        <p className="mt-8 text-sm text-white/40">
          Déjà un compte ?{" "}
          <Link href="/auth/login" className="text-gold hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
