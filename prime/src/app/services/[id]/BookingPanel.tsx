"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Service } from "@/lib/data";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function BookingPanel({ service }: { service: Service }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: service.id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        router.push(`/checkout/success?service=${service.id}`);
      }
    } catch {
      router.push(`/checkout/success?service=${service.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">À partir de</p>
        <p className="text-3xl font-bold text-gray-900">{service.price}€</p>
      </div>

      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Livraison</span>
          <span className="font-medium text-gray-900">{service.deliveryDays} jours</span>
        </div>
        <div className="flex justify-between">
          <span>Révisions</span>
          <span className="font-medium text-gray-900">3 incluses</span>
        </div>
        <div className="flex justify-between">
          <span>Vendeur</span>
          <span className="font-medium text-gray-900">{service.seller.name}</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading ? (
          <><Loader2 size={18} className="animate-spin" /> Redirection...</>
        ) : (
          "Commander maintenant"
        )}
      </button>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <ShieldCheck size={14} className="text-green-500 shrink-0" />
        Paiement sécurisé — Satisfait ou remboursé
      </div>

      <div className="pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          En commandant, vous acceptez nos <span className="underline cursor-pointer">CGV</span>
        </p>
      </div>
    </div>
  );
}
