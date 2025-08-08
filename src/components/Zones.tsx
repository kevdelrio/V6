import React from 'react';
import { ZONES } from '@/constants';
import { MapPinIcon } from '@/components/Icons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ZoneCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center group h-full">
        <div className="mb-6">
            <MapPinIcon />
        </div>
        <h3 className="text-2xl font-bold text-blue-deep mb-3">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);


const Zones: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation();

    return (
        <section id="Zones" ref={ref} className={`bg-gray-50 py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Zones d'intervention</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Je me déplace dans toute la région de Bruxelles-Capitale et dans trois provinces wallonnes : le Brabant wallon, le Hainaut et Namur. Ces zones d'intervention me permettent de vous offrir un service de proximité, quelle que soit votre localisation.
                    </p>
                    <div className="mt-6 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    {ZONES.map((zone) => (
                        <ZoneCard key={zone.title} title={zone.title} description={zone.description} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Zones;