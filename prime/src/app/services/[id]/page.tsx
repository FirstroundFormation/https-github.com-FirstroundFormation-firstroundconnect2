import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { Star, Clock, MapPin, CheckCircle, ArrowLeft } from "lucide-react";
import BookingPanel from "./BookingPanel";

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);
  if (!service) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/services" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft size={14} /> Retour aux services
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {service.category}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 mt-3">{service.title}</h1>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                {service.seller.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{service.seller.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin size={11} />{service.seller.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={16} className="fill-amber-500" />
              <span className="font-semibold text-sm">{service.seller.rating}</span>
              <span className="text-gray-400 text-sm">({service.seller.reviews} avis)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Clock size={14} />
              Livraison en {service.deliveryDays} jours
            </div>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-3">Description du service</h2>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Ce qui est inclus</h2>
            <ul className="space-y-2">
              {[
                "Livraison dans les délais garantis",
                "Révisions incluses (jusqu'à 3)",
                "Fichiers sources fournis",
                "Support après livraison (7 jours)",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Booking Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingPanel service={service} />
          </div>
        </div>
      </div>
    </div>
  );
}
