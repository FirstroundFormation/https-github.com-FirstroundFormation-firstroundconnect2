"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES, CATEGORIES } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { Suspense } from "react";

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCat);
  const [maxPrice, setMaxPrice] = useState(1000);

  const filtered = SERVICES.filter((s) => {
    const matchQuery =
      !query ||
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchCat = !category || s.category === category;
    const matchPrice = s.price <= maxPrice;
    return matchQuery && matchCat && matchPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Explorer les services</h1>
      <p className="text-gray-500 mb-8">{SERVICES.length} services disponibles</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-1">
                <SlidersHorizontal size={14} /> Filtres
              </label>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Catégorie</label>
              <div className="space-y-1">
                <button
                  onClick={() => setCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !category ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Toutes les catégories
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      category === cat ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
                Budget max : {maxPrice}€
              </label>
              <input
                type="range"
                min={50}
                max={1000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>50€</span><span>1000€</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 gap-2 mb-6 shadow-sm">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Rechercher un service, compétence..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 py-3 text-sm outline-none bg-transparent"
            />
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">Aucun service trouvé</p>
              <p className="text-sm mt-2">Essayez d&apos;autres filtres</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense>
      <ServicesContent />
    </Suspense>
  );
}
