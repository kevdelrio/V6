import React from 'react';
import { PROCESS_STEPS } from '@/constants';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Process: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation();

    return (
        <section id="Process" ref={ref} className={`bg-gray-50 py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Comment se déroule une expertise ?</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Un processus simple et transparent en 4 étapes clés.</p>
                    <div className="mt-6 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PROCESS_STEPS.map((step) => (
                        <div key={step.id} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <div className="mb-4 bg-orange-vif/10 p-4 rounded-full">{step.icon}</div>
                            <h3 className="text-xl font-bold text-blue-deep mb-2">{step.title}</h3>
                            <p className="text-slate-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;