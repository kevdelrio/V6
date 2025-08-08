import React from 'react';
import { BENEFITS } from '@/constants';
import { BenefitCheckIcon } from '@/components/Icons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Benefits: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation();
    
    return (
        <section id="Benefits" ref={ref} className={`bg-gray-50 py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-extrabold text-blue-deep">Pourquoi me faire confiance ?</h2>
                        <p className="text-lg text-slate-600">Mon engagement est simple : vous apporter la sérénité grâce à une expertise rigoureuse et transparente. Chaque mission est menée avec le plus grand soin pour défendre vos intérêts.</p>
                        <div className="mt-4 w-24 h-1 bg-orange-vif rounded-full"></div>
                    </div>

                    <div className="space-y-6">
                        {BENEFITS.map(benefit => (
                            <div key={benefit.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-white transition-colors duration-200">
                                <BenefitCheckIcon />
                                <div>
                                    <h3 className="font-bold text-xl text-blue-deep">{benefit.title}</h3>
                                    <p className="text-slate-600">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;