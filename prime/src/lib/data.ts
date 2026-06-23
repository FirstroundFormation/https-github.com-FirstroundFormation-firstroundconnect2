export type Service = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  deliveryDays: number;
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    location: string;
  };
  tags: string[];
  image: string;
};

export const CATEGORIES = [
  "Développement web",
  "Design & Créatif",
  "Marketing digital",
  "Rédaction",
  "Vidéo & Animation",
  "Data & IA",
];

export const SERVICES: Service[] = [
  {
    id: "1",
    title: "Création de site web React / Next.js",
    description:
      "Je crée votre site web moderne avec React ou Next.js. Design responsive, SEO optimisé, performances maximales. Livraison rapide et support inclus.",
    category: "Développement web",
    price: 350,
    deliveryDays: 7,
    seller: {
      id: "s1",
      name: "Alexandre M.",
      avatar: "AM",
      rating: 4.9,
      reviews: 142,
      location: "Paris, France",
    },
    tags: ["React", "Next.js", "TypeScript"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
  },
  {
    id: "2",
    title: "Identité visuelle complète pour votre marque",
    description:
      "Logo, charte graphique, carte de visite, bannières réseaux sociaux. Je crée une identité cohérente et mémorable pour votre marque.",
    category: "Design & Créatif",
    price: 280,
    deliveryDays: 5,
    seller: {
      id: "s2",
      name: "Sophie L.",
      avatar: "SL",
      rating: 4.8,
      reviews: 89,
      location: "Lyon, France",
    },
    tags: ["Logo", "Branding", "Figma"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
  },
  {
    id: "3",
    title: "Campagne publicitaire Meta Ads & Google Ads",
    description:
      "Mise en place et gestion de vos campagnes publicitaires sur Meta (Facebook/Instagram) et Google. Ciblage précis, optimisation continue.",
    category: "Marketing digital",
    price: 450,
    deliveryDays: 3,
    seller: {
      id: "s3",
      name: "Karim B.",
      avatar: "KB",
      rating: 4.7,
      reviews: 203,
      location: "Bordeaux, France",
    },
    tags: ["Meta Ads", "Google Ads", "ROI"],
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80",
  },
  {
    id: "4",
    title: "Rédaction d'articles SEO pour votre blog",
    description:
      "Articles optimisés pour les moteurs de recherche, écrits par une rédactrice experte. Recherche de mots-clés incluse, ton adapté à votre marque.",
    category: "Rédaction",
    price: 120,
    deliveryDays: 2,
    seller: {
      id: "s4",
      name: "Marie D.",
      avatar: "MD",
      rating: 4.9,
      reviews: 317,
      location: "Nantes, France",
    },
    tags: ["SEO", "Copywriting", "Blog"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
  },
  {
    id: "5",
    title: "Montage vidéo professionnel pour YouTube / Réseaux",
    description:
      "Montage vidéo cinématique, sous-titres, effets visuels, musique libre de droits. Idéal pour YouTube, Instagram Reels ou TikTok.",
    category: "Vidéo & Animation",
    price: 200,
    deliveryDays: 4,
    seller: {
      id: "s5",
      name: "Lucas R.",
      avatar: "LR",
      rating: 4.6,
      reviews: 78,
      location: "Toulouse, France",
    },
    tags: ["Montage", "After Effects", "YouTube"],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80",
  },
  {
    id: "6",
    title: "Scraping de données & Dashboard analytique",
    description:
      "Collecte de données web automatisée, nettoyage et visualisation dans un dashboard interactif. Python, Pandas, Plotly ou Power BI.",
    category: "Data & IA",
    price: 500,
    deliveryDays: 10,
    seller: {
      id: "s6",
      name: "Yasmine K.",
      avatar: "YK",
      rating: 4.8,
      reviews: 55,
      location: "Montpellier, France",
    },
    tags: ["Python", "Data", "Dashboard"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
];
