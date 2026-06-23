import Link from "next/link";
import { Star, Clock } from "lucide-react";
import type { Service } from "@/lib/data";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.id}`} className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-200">
      <div className="aspect-video overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
            {service.seller.avatar}
          </div>
          <span className="text-sm text-gray-600">{service.seller.name}</span>
          <span className="ml-auto flex items-center gap-1 text-sm text-amber-500 font-medium">
            <Star size={13} className="fill-amber-500" />
            {service.seller.rating}
            <span className="text-gray-400 font-normal">({service.seller.reviews})</span>
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {service.title}
        </h3>
        <div className="flex flex-wrap gap-1 mt-2 mb-3">
          {service.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} />
            Livraison {service.deliveryDays}j
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400">À partir de</span>
            <p className="text-base font-bold text-gray-900">{service.price}€</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
