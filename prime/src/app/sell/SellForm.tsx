"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/data";
import { CheckCircle, Loader2 } from "lucide-react";

export default function SellForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    deliveryDays: "",
    tags: "",
  });

  function update(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-4">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={28} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Service publié !</h2>
        <p className="text-gray-500 text-sm">
          Votre service <span className="font-semibold text-gray-900">&ldquo;{form.title}&rdquo;</span> est maintenant
          visible par les acheteurs.
        </p>
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => router.push("/services")}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Voir tous les services
          </button>
          <button
            onClick={() => { setSubmitted(false); setForm({ title: "", category: "", description: "", price: "", deliveryDays: "", tags: "" }); }}
            className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            Publier un autre service
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Titre du service *</label>
        <input
          required
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Ex: Création de site web React professionnel"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Catégorie *</label>
        <select
          required
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition bg-white"
        >
          <option value="">Sélectionner une catégorie</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Décrivez votre service en détail : ce que vous livrez, votre expérience, votre processus de travail..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Prix (€) *</label>
          <input
            required
            type="number"
            min={10}
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder="150"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Délai (jours) *</label>
          <input
            required
            type="number"
            min={1}
            value={form.deliveryDays}
            onChange={(e) => update("deliveryDays", e.target.value)}
            placeholder="5"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Mots-clés / Compétences</label>
        <input
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
          placeholder="React, TypeScript, Node.js (séparés par des virgules)"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
        />
        <p className="text-xs text-gray-400 mt-1">Aidez les acheteurs à trouver votre service plus facilement</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading ? (
          <><Loader2 size={18} className="animate-spin" /> Publication en cours...</>
        ) : (
          "Publier mon service"
        )}
      </button>
    </form>
  );
}
