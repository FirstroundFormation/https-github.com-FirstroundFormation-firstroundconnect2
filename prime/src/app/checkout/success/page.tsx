import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { SERVICES } from "@/lib/data";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service: serviceId } = await searchParams;
  const service = SERVICES.find((s) => s.id === serviceId);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md w-full text-center space-y-5">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Commande confirmée !</h1>
        {service && (
          <div className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4 text-left space-y-1">
            <p className="font-semibold text-gray-900">{service.title}</p>
            <p>Vendeur : {service.seller.name}</p>
            <p>Livraison dans {service.deliveryDays} jours</p>
            <p className="font-semibold text-indigo-600">{service.price}€</p>
          </div>
        )}
        <p className="text-sm text-gray-500">
          Un email de confirmation vous a été envoyé. Le freelance va vous contacter sous 24h.
        </p>
        <div className="flex flex-col gap-3 pt-2">
          <Link href="/services" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
            Explorer d&apos;autres services
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
