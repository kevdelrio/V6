import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Legal: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation();

    return (
        <section ref={ref} className={`bg-white py-12 md:py-20 px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div id="Legal" className="container mx-auto max-w-5xl scroll-mt-24">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Mentions Légales</h2>
                    <div className="mt-4 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>
                <div className="grid gap-8 text-slate-600 md:grid-cols-3">
                    <div className="bg-slate-50 p-6 rounded-lg shadow">
                        <h3 className="text-2xl font-bold text-blue-deep mb-4">Éditeur du site</h3>
                        <ul className="space-y-1">
                            <li>Nom de l'entreprise : KD.Expertise (Nom commercial)</li>
                            <li>Nom du responsable : Kévin Delporte</li>
                            <li>Adresse : 1470 Genappe, Belgique</li>
                            <li>Téléphone : 0470 94 15 88</li>
                            <li>Email : geometre1470@gmail.com</li>
                            <li>Numéro d'entreprise : BE 0123.456.789</li>
                        </ul>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-lg shadow">
                        <h3 className="text-2xl font-bold text-blue-deep mb-4">Hébergement</h3>
                        <p>Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-lg shadow">
                        <h3 className="text-2xl font-bold text-blue-deep mb-4">Propriété intellectuelle</h3>
                        <p>L'ensemble de ce site relève de la législation belge et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
                    </div>
                </div>
            </div>

            <div id="Privacy" className="container mx-auto max-w-5xl mt-20 scroll-mt-24">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Politique de Confidentialité (RGPD)</h2>
                    <div className="mt-4 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>
                <p className="text-slate-600 mb-8">La présente politique de confidentialité définit et vous informe de la manière dont KD.Expertise utilise et protège les informations que vous nous transmettez, le cas échéant, lorsque vous utilisez le présent site.</p>
                <div className="grid gap-8 text-slate-600 md:grid-cols-3">
                    <div className="bg-slate-50 p-6 rounded-lg shadow">
                        <h3 className="text-2xl font-bold text-blue-deep mb-4">Données collectées</h3>
                        <p>Nous collectons les données que vous nous fournissez via le formulaire de contact (nom, prénom, email, téléphone, message). Ces informations sont utilisées exclusivement pour répondre à votre demande et dans le cadre de la relation commerciale qui peut en découler.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-lg shadow">
                        <h3 className="text-2xl font-bold text-blue-deep mb-4">Durée de conservation</h3>
                        <p>Vos données personnelles sont conservées pendant une durée qui n'excède pas la durée nécessaire aux finalités pour lesquelles elles ont été collectées.</p>
                    </div>
                     <div className="bg-slate-50 p-6 rounded-lg shadow">
                        <h3 className="text-2xl font-bold text-blue-deep mb-4">Vos droits</h3>
                        <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition de vos données personnelles. Vous pouvez exercer ce droit en nous contactant par email à geometre1470@gmail.com.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Legal;