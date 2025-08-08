import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const About: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation();

    return (
        <section id="About" ref={ref} className={`bg-gray-50 py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Votre Géomètre-Expert dédié</h2>
                    <div className="mt-4 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/3 relative">
                        <img src="https://dl.dropboxusercontent.com/scl/fi/u62dhrr9b2cml4578tnap/2025-07-31-12_55_51-IMG_0362.heic-FastStone-Image-Viewer-7.8.png?rlkey=odrja1xhoc7lt5i141vpgnewk&raw=1" alt="Portrait de Kévin Delporte, Géomètre-Expert" />
                        <div className="absolute -bottom-6 -right-6 bg-blue-deep text-white rounded-lg shadow-lg px-4 py-3">
                            <p className="font-semibold leading-tight">Géomètre‑expert assermenté</p>
                            <p className="text-sm">Geo 19/1470</p>
                        </div>
                    </div>
                    <div className="md:w-2/3 text-lg text-slate-600 space-y-4 text-left">
                        <p>Je suis Kévin Delporte, Géomètre-Expert immobilier assermenté. Passionné par la précision et l'intégrité, mon objectif est de vous fournir une vision claire et objective de votre bien immobilier.</p>
                        <p>En tant que Géomètre-Expert, mon rôle est d'apporter une rigueur technique et une valeur juridique à chaque expertise. Mon assermentation garantit une objectivité totale, transformant une simple observation en une preuve factuelle et incontestable. C'est l'assurance d'un rapport fiable qui protège vos intérêts.</p>
                        <p>Avec un engagement total envers l'impartialité, je m'assure que chaque rapport est détaillé, compréhensible et conforme aux normes les plus strictes. Votre confiance est ma priorité.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;