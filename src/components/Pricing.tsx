import React from 'react';
import { PRICE_TIERS } from '@/constants';
import type { PriceTier } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PriceCard: React.FC<PriceTier> = ({ icon, title, basePrice, priceSuffix, baseDescription, features, note }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col text-center group h-full">
        <div className="mb-4 bg-orange-vif/10 p-4 rounded-full self-center">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-blue-deep mb-2">{title}</h3>
        <div className="mb-4">
            <span className="text-5xl font-extrabold text-blue-deep">{basePrice}</span>
            <span className="text-lg text-slate-500 ml-1">{priceSuffix}</span>
            {note && <p className="text-sm text-slate-400">{note}</p>}
        </div>
        <div className="text-sm text-slate-600 mb-6 border-t border-gray-200 pt-4 mt-2">
            <p className="font-semibold text-blue-deep mb-1">Ce qui est inclus :</p>
            <p>{baseDescription}</p>
        </div>
        <ul className="space-y-3 text-slate-600 text-left mb-8 flex-grow">
            {features.map((feature) => (
                <li key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <a href="#Contact" className="mt-auto block w-full text-center px-6 py-3 bg-orange-vif text-white font-bold rounded-full hover:bg-orange-vif-dark transition-all duration-300 transform hover:scale-105">
            Demander un devis
        </a>
    </div>
);


const Pricing: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation();

    return (
        <section id="Pricing" ref={ref} className={`bg-gray-50 py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Tarifs Transparents</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Des prix clairs pour des services d'expertise. Les tarifs sont indicatifs et par partie.</p>
                    <div className="mt-6 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PRICE_TIERS.map((tier) => (
                        <PriceCard key={tier.id} {...tier} />
                    ))}
                </div>
                <div className="text-center text-slate-500 mt-12 text-sm max-w-3xl mx-auto space-y-2">
                    <p>Les prix s'entendent par partie (propriétaire ou locataire). Pour toute situation non standard (grandes dépendances, biens atypiques), un devis personnalisé sera établi.</p>
                    <p className="font-semibold text-slate-600">Note : Toute pièce, même de moins de 7m² (dressing, petit bureau, etc.), est considérée comme une pièce supplémentaire.</p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;