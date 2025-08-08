import React from 'react';
import { reportConversion, PHONE_CONVERSION_LABEL } from '@/services/googleAds';

const Hero: React.FC = () => {
    const handlePhoneClick = () => {
        reportConversion(PHONE_CONVERSION_LABEL);
    };

    return (
        <section id="Home" className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden scroll-mt-24">
            {/* Image de fond avec bords arrondis en bas */}
            <img
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1920&auto=format&fit=crop"
                srcSet="
                    https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=480&auto=format&fit=crop 480w,
                    https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=768&auto=format&fit=crop 768w,
                    https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1920&auto=format&fit=crop 1920w
                "
                sizes="100vw"
                alt="Maison moderne"
                className="absolute inset-0 w-full h-full object-cover z-0 rounded-b-2xl"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none rounded-b-2xl"></div>
            <div className="relative z-20 text-white px-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
                    Géomètre-Expert Immobilier
                </h1>
                <div className="mt-6 text-base md:text-xl font-medium tracking-wider text-white/90 drop-shadow-sm max-w-4xl mx-auto">
                   <p>État des lieux <span className="text-orange-vif mx-1 md:mx-2">|</span>Permis de location <span className="text-orange-vif mx-1 md:mx-2">|</span>Évaluation <span className="text-orange-vif mx-1 md:mx-2">|</span>Première réception</p>
                   <p className="mt-2">Expertise technique</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
                    <a 
                        href="tel:0470941588" 
                        onClick={handlePhoneClick}
                        className="inline-flex items-center justify-center gap-2 bg-orange-vif text-white text-lg md:text-xl font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-orange-vif-dark transition"
                    >
                       0470&nbsp;94&nbsp;15&nbsp;88
                    </a>
                    <a 
                        href="#Calculator" 
                        className="inline-flex items-center justify-center gap-2 bg-green-500 text-white text-lg md:text-xl font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition"
                    >
                        Calculer mon prix
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;

