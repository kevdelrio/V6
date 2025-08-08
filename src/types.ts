import type * as React from 'react';

export interface NavLink {
  name: string;
  href: string;
}

export interface Service {
  id: string;
  type: string;
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  duration: number;
}

export interface ProcessStep {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
}

export interface Zone {
  title: string;
  description: string;
}

export interface PriceTier {
  id: string;
  icon: React.ReactNode;
  title: string;
  basePrice: string;
  priceSuffix: string;
  baseDescription: string;
  features: string[];
  note?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type BookingStepId = 'service' | 'date' | 'info' | 'confirmation';

export interface BookingStep {
    id: string;
    name: string;
    icon: React.FC<{className?: string}>;
}

export interface BookingState {
    service: Service | null;
    date: Date | null;
    time: string | null;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    propertyAddress: string;
    notes: string;
    // For EDL
    bookingType: 'entree' | 'sortie';
    typeBien: 'appartement' | 'maison' | 'villa' | 'studio' | 'kot' | 'entrepot';
    chambres: number;
    sdb: number;
    meuble: boolean;
    jardin: boolean;
    parking: boolean;
    cave: boolean;
    print: boolean;
}

export interface PriceMap {
  [key: string]: number;
}

export interface PriceOptions {
  [key: string]: { value: number };
}

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}

export interface PriceItem {
    label: string;
    price: string;
}
export interface CalculatorState {
    mission: 'locatif' | 'avant-travaux' | 'reception' | 'acquisitif' | 'permis-location';
    typeBien: 'appartement' | 'maison' | 'studio' | 'kot' | 'communautaire' | 'villa';
    chambres: number;
    sdb: number;
    meuble: boolean;
    jardin: boolean;
    frais: '2parties' | '1seulepartie';
    surface: number;
    facades: number;
    recolement: boolean;
    autres_pieces: number;
    mobilier: boolean;
    chambres_communautaire: number;
}
export interface CalculatorContact {
    propertyAddress: string;
    fullName: string;
    email: string;
    phone: string;
    missionDetail: string;
    message: string;
}
