// src/constants/index.ts
import {
  NavLink,
  Service,
  ProcessStep,
  GalleryImage,
  Benefit,
  Zone,
  PriceTier,
  Testimonial,
  FaqItem,
  PriceMap,
  PriceOptions,
  BookingStep,
} from '@/types';
import {
  CheckFileIcon,
  HomeReceptionIcon,
  EvaluationIcon,
  TechnicalExpertiseIcon,
  RentalPermitIcon,
  PhoneIcon,
  SearchIcon,
  ClipboardIcon,
  DocumentCheckIcon,
  ApartmentIcon,
  HouseIcon,
  WarehouseIcon,
  CalendarIcon,
  UserCheckIcon,
} from '@/components/Icons';

export const NAV_LINKS: NavLink[] = [
  { name: 'Services', href: '#Services' },
  { name: 'Tarifs', href: '#Pricing' },
  { name: 'Prendre RDV', href: '#Booking' },
  { name: 'Calculateur', href: '#Calculator' },
  { name: 'Contact', href: '#Contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'service-etats-des-lieux',
    type: 'edl',
    icon: CheckFileIcon,
    title: 'États des lieux',
    description:
      "Réalisation d'états des lieux détaillés pour protéger locataires et propriétaires en évitant les litiges et en sécurisant la garantie locative.",
    duration: 90,
  },
  {
    id: 'service-premiere-reception',
    type: 'reception',
    icon: HomeReceptionIcon,
    title: 'Première réception',
    description:
      'Accompagnement lors de la réception provisoire de votre bien afin de vérifier la conformité des travaux et de signaler les éventuelles anomalies.',
    duration: 120,
  },
  {
    id: 'service-evaluations',
    type: 'evaluation',
    icon: EvaluationIcon,
    title: 'Évaluations',
    description:
      "Estimation objective et rigoureuse de la valeur de votre bien immobilier, pour une vente, une succession ou l'obtention d'un crédit.",
    duration: 60,
  },
  {
    id: 'service-expertises-techniques',
    type: 'technique',
    icon: TechnicalExpertiseIcon,
    title: 'Expertises techniques',
    description:
      "Analyse des pathologies du bâtiment, détection des malfaçons et identification des problèmes d'humidité pour un diagnostic précis et des solutions adaptées.",
    duration: 120,
  },
  {
    id: 'service-permis-location',
    type: 'permis',
    icon: RentalPermitIcon,
    title: 'Permis de location',
    description:
      "Établissement du dossier et contrôle des critères techniques pour l'obtention du permis de location conformément aux exigences réglementaires.",
    duration: 60,
  },
];

export const BOOKING_STEPS: BookingStep[] = [
  { id: 'step-service', name: 'Service', icon: CheckFileIcon },
  { id: 'step-date', name: 'Date & Heure', icon: CalendarIcon },
  { id: 'step-info', name: 'Informations & Confirmation', icon: UserCheckIcon },
];

export const CALCULATOR_STEPS: BookingStep[] = [
  { id: 'step-calc', name: 'Estimation', icon: EvaluationIcon },
  { id: 'step-contact', name: 'Contact', icon: UserCheckIcon },
];

export const DEFAULT_BOOKING_SLOTS: string[] = (
  import.meta.env.VITE_BOOKING_SLOTS || '10:00,12:00,14:00,16:00,18:00'
)
  .split(',')
  .map((slot) => slot.trim());

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'process-contact',
    icon: <PhoneIcon />,
    title: '1. Prise de Contact',
    description:
      "Contactez-moi pour m'exposer vos besoins. Nous fixons un rendez-vous et un devis clairs.",
  },
  {
    id: 'process-visit',
    icon: <SearchIcon />,
    title: '2. Visite sur Site',
    description:
      'Chaque pièce est analysée (sols, murs, plafonds, équipements) et chaque détail est consigné et photographié.',
  },
  {
    id: 'process-analysis',
    icon: <ClipboardIcon />,
    title: '3. Analyse & Rédaction',
    description:
      'Je compile les données dans un rapport structuré, avec un vocabulaire précis et des descriptions claires.',
  },
  {
    id: 'process-report',
    icon: <DocumentCheckIcon />,
    title: '4. Remise du Rapport',
    description:
      'Vous recevez le rapport complet. Je reste disponible pour répondre à vos questions et clarifier chaque point.',
  },
];

export const GALLERY_IMAGES_COUNT = 28;

export const GALLERY_IMAGES: GalleryImage[] = Array.from(
  { length: GALLERY_IMAGES_COUNT },
  (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      id: `gallery-image-${n}`,
      // Placez les fichiers dans: public/assets/rapport/etat-des-lieux-01.jpg ... -28.jpg
      src: `/assets/rapport/etat-des-lieux-${n}.jpg`,
      name: `État des lieux – ${n}`,
    };
  }
);

export const BENEFITS: Benefit[] = [
  { id: 'benefit-impartialite', title: 'Impartialité Totale', description: "Une évaluation juste et objective, sans conflit d'intérêts." },
  { id: 'benefit-reactivite', title: 'Réactivité Garantie', description: 'Des délais d’intervention rapides et un contact direct avec votre expert.' },
  { id: 'benefit-experience', title: "10 Ans d'Expérience", description: 'Un savoir-faire éprouvé au service de la précision et de la fiabilité.' },
  { id: 'benefit-rapports', title: 'Rapports Détaillés', description: 'Des documents clairs, complets et illustrés pour une parfaite compréhension.' },
];

export const ZONES: Zone[] = [
  {
    title: 'Bruxelles',
    description:
      'Interventions dans toute la Région de Bruxelles-Capitale, qui regroupe 19 communes et constitue le cœur urbain de la Belgique.',
  },
  {
    title: 'Brabant wallon',
    description:
      'Présent dans le Brabant wallon, province dynamique de Wallonie, pour vos besoins à Waterloo, Wavre ou encore Nivelles.',
  },
  {
    title: 'Hainaut',
    description:
      "Je couvre l'ensemble du Hainaut, de Mons à Charleroi en passant par La Louvière, pour répondre à vos demandes locales.",
  },
  {
    title: 'Namur',
    description:
      'Services disponibles dans la province de Namur, du chef-lieu aux communes environnantes comme Dinant et Philippeville.',
  },
];

export const PRICE_TIERS: PriceTier[] = [
  {
    id: 'pricing-appartement',
    icon: <ApartmentIcon />,
    title: 'Appartement',
    basePrice: '140€',
    priceSuffix: '/ partie',
    baseDescription: '1 ch., 1 SDB, 1 cuisine, 1 séjour, 1 cave, 1 parking',
    features: ['+ 15€ par chambre suppl.', "+ 20€ par pièce d'eau suppl."],
    note: 'TVAC',
  },
  {
    id: 'pricing-maison',
    icon: <HouseIcon />,
    title: 'Maison',
    basePrice: '200€',
    priceSuffix: '/ partie',
    baseDescription:
      '1 ch., 1 SDB, 1 cuisine, 1 séjour, 1 jardinet, 1 parking, 1 garage',
    features: ['+ 15€ par pièce supplémentaire', 'Devis ajusté si grande superficie'],
    note: 'TVAC',
  },
  {
    id: 'pricing-entrepot',
    icon: <WarehouseIcon />,
    title: 'Entrepôt / Commercial',
    basePrice: '200€',
    priceSuffix: '/ partie',
    baseDescription: 'Base pour 300 m²',
    features: ['+ 30€ par 100 m² suppl.', 'Idéal pour surfaces professionnelles'],
    note: 'TVAC',
  },
  {
    id: 'pricing-permis-location',
    icon: <RentalPermitIcon />,
    title: 'Permis de location',
    basePrice: '248,05€',
    priceSuffix: 'TVAC',
    baseDescription: 'Logement individuel',
    features: [
      'Logement collectif : +49,61€ TVAC par pièce individuelle',
      'Délivrance du permis par la commune gratuite',
    ],
    note: 'Tarifs Wallonie 2025',
  },
  {
    id: 'pricing-premiere-reception',
    icon: <HomeReceptionIcon />,
    title: 'Première réception',
    basePrice: '150€',
    priceSuffix: 'TVAC',
    baseDescription: 'Studio',
    features: [
      'Appartement : 180€ – Maison : 250€ – Villa : 350€',
      '+10€ par chambre supplémentaire',
      '+20€ par salle d\'eau supplémentaire',
    ],
    note: 'Tarifs indicatifs',
  },
  {
    id: 'pricing-avant-travaux',
    icon: <DocumentCheckIcon />,
    title: 'Avant travaux',
    basePrice: '180€',
    priceSuffix: 'TVAC',
    baseDescription: '1 façade',
    features: [
      '+50€ par façade supplémentaire',
      'Constat complet avant chantier',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote:
      "L'état des lieux réalisé par Kévin Delporte était d'une précision remarquable. Son professionnalisme nous a permis d'éviter tout litige. Je recommande vivement !",
    author: 'Marie Dupont',
    role: 'Propriétaire',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    quote:
      'Nous avions besoin d’une évaluation rapide pour notre crédit pont. M. Delporte a été incroyablement réactif et son rapport était très complet. Un service impeccable.',
    author: 'Julien Bernard',
    role: 'Acheteur',
    rating: 4,
  },
  {
    id: 'testimonial-3',
    quote:
      "Enfin un expert qui prend le temps d'expliquer les choses simplement. L'expertise technique pour notre fissure nous a rassurés. Merci pour votre pédagogie.",
    author: 'Sophie Lambert',
    role: 'Vendeuse',
    rating: 5,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-delais',
    question: "Quels sont vos délais d'intervention ?",
    answer:
      "Je m'efforce d'intervenir dans les 48 à 72 heures suivant votre demande, en fonction de l'urgence et de la complexité de la mission.",
  },
  {
    id: 'faq-region',
    question: 'Dans quelle région intervenez-vous ?',
    answer:
      "Mon champ d'action principal couvre la Wallonie et Bruxelles, mais je peux me déplacer plus loin sur demande spécifique.",
  },
  {
    id: 'faq-obligatoire',
    question: 'Un état des lieux est-il vraiment obligatoire ?',
    answer:
      'Oui, un état des lieux détaillé est obligatoire et doit être joint au bail. Il protège aussi bien le locataire que le propriétaire en cas de litige.',
  },
  {
    id: 'faq-deroulement',
    question: 'Comment se déroule une expertise technique ?',
    answer:
      'L’expertise commence par une analyse sur site, suivie de la rédaction d’un rapport détaillé qui identifie les problèmes, leurs causes, et propose des solutions.',
  },
];

const buildPriceMap = (): PriceMap => {
  const map: PriceMap = {};
  const baseApartment = 140;
  const baseHouse = 200;

  for (let chambres = 0; chambres <= 10; chambres++) {
    for (let sdb = 1; sdb <= 6; sdb++) {
      if (chambres === 0) {
        map[`locatif_appartement_0_${sdb}`] = 125 + 20 * (sdb - 1);
      } else {
        map[`locatif_appartement_${chambres}_${sdb}`] =
          baseApartment + 15 * (chambres - 1) + 20 * (sdb - 1);
        map[`locatif_maison_${chambres}_${sdb}`] =
          baseHouse + 15 * (chambres - 1) + 20 * (sdb - 1);
      }
    }
  }

  const entrepot = {
    'locatif_entrepot_0_0': 200,
    'locatif_entrepot_400_0': 230,
    'locatif_entrepot_500_0': 260,
    'locatif_entrepot_600_0': 290,
    'locatif_entrepot_700_0': 320,
    'locatif_entrepot_800_0': 350,
    'locatif_entrepot_900_0': 380,
    'locatif_entrepot_1000_0': 410,
    'locatif_entrepot_1100_0': 440,
    'locatif_entrepot_1200_0': 470,
    'locatif_entrepot_1300_0': 500,
    'locatif_entrepot_1400_0': 530,
    'locatif_entrepot_1500_0': 560,
    'locatif_entrepot_1600_0': 590,
    'locatif_entrepot_1700_0': 620,
    'locatif_entrepot_1800_0': 650,
    'locatif_entrepot_1900_0': 680,
    'locatif_entrepot_2000_0': 710,
  } as PriceMap;
  Object.assign(map, entrepot);

  map['avant-travaux_maison_1f'] = 180;
  map['avant-travaux_maison_2f'] = 230;
  map['avant-travaux_maison_3f'] = 280;
  map['avant-travaux_maison_4f'] = 330;

  return map;
};

export const PRICE_MAP: PriceMap = buildPriceMap();

export const PRICE_MODIFIERS: PriceOptions = {
  meuble: { value: 0.3 },
  jardin: { value: 20 },
  parking: { value: 5 },
  cave: { value: 10 },
  print: { value: 0.3 },
  piscine: { value: 20 },
  bxl: { value: 15 },
  admin: { value: 30 },
  reouverture: { value: 150 },
};
