import Link from "next/link";
import { Search, Shield, Zap, TrendingUp } from "lucide-react";
import { SERVICES, CATEGORIES } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";

export default function HomePage() {
  const featured = SERVICES.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Les meilleurs freelances,<br />
            <span className="text-indigo-200">au bon moment.</span>
          </h1>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Trouvez un expert en quelques minutes. Paiement sécurisé, livraison garantie.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 gap-2 shadow-lg">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Ex: développeur React, logo, SEO..."
                className="flex-1 py-4 text-gray-900 outline-none bg-transparent text-sm"
              />
            </div>
            <Link
              href="/services"
              className="px-6 py-4 bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold rounded-xl transition-colors whitespace-nowrap"
            >
              Rechercher
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {CATEGORIES.slice(0, 4).map((cat) => (
              <Link
                key={cat}
                href={`/services?category=${encodeURIComponent(cat)}`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-sm rounded-full border border-white/20 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Freelances actifs", value: "1 200+" },
            { label: "Services livrés", value: "8 500+" },
            { label: "Satisfaction client", value: "98%" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-indigo-600">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured services */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Services populaires</h2>
          <Link href="/services" className="text-sm text-indigo-600 font-medium hover:underline">
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Explorer par catégorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/services?category=${encodeURIComponent(cat)}`}
                className="bg-white rounded-xl p-4 text-center hover:shadow-md hover:border-indigo-200 border border-gray-200 transition-all group"
              >
                <p className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                  {cat}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Prime */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">Pourquoi choisir Prime ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Paiement sécurisé", desc: "Votre paiement est protégé jusqu’à la livraison finale de votre commande." },
            { icon: Zap, title: "Freelances vérifiés", desc: "Chaque prestataire est vérifié et noté par la communauté après chaque mission." },
            { icon: TrendingUp, title: "Résultats garantis", desc: "Satisfait ou remboursé. Nous assurons la qualité de chaque livraison." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon size={24} className="text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Seller */}
      <section className="bg-indigo-600 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Vous êtes freelance ?</h2>
          <p className="text-indigo-100 mb-8">
            Rejoignez Prime et proposez vos services à des milliers de clients.
            Inscription gratuite, commissions réduites.
          </p>
          <Link
            href="/sell"
            className="inline-block px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Publier mon premier service
          </Link>
        </div>
      </section>
    </div>
  );
}
