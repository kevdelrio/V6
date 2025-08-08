import React from 'react';
import type { Service } from '@/types';
import { SERVICES } from '@/constants';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ServiceCard: React.FC<Service> = ({ id, icon: Icon, title, description }) => (
    <div id={id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center group h-full">
        <div className="mb-6">
            <Icon />
        </div>
        <h3 className="text-2xl font-bold text-blue-deep mb-3">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);


const Services: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation();
    
    return (
        <section id="Services" ref={ref} className={`bg-white py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Mes Domaines d'Intervention</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Des services complets pour vous accompagner à chaque étape de votre projet immobilier.</p>
                    <div className="mt-6 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                    {SERVICES.map((service) => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;