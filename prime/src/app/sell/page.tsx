import SellForm from "./SellForm";

export default function SellPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Publier un service</h1>
        <p className="text-gray-500 mt-2">
          Créez votre annonce et commencez à recevoir des commandes en quelques minutes.
        </p>
      </div>
      <SellForm />
    </div>
  );
}
