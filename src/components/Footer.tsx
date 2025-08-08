import React from 'react';

const LogoWhite = () => (
    <a href="#Home" className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
        KD<span className="text-orange-vif">.</span>Expertise
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-blue-deep text-slate-300 rounded-t-2xl shadow-2xl mt-16">
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="
                    flex flex-col 
                    lg:flex-row
                    lg:justify-between
                    lg:items-start
                    gap-y-10 lg:gap-y-0
                    text-center lg:text-left
                ">
                    {/* Coordonnées (plus large) */}
                    <div className="mb-8 lg:mb-0 lg:basis-2/6 lg:pr-8">
                        <LogoWhite />
                        <div className="text-slate-400 text-sm leading-relaxed mt-4">
                            <p>Kévin Delporte</p>
                            <p>Géomètre‑Expert Immobilier</p>
                            <p>1470 Genappe, Belgique</p>
                            <p>
                                <span className="font-medium text-white">Tél :</span>{' '}
                                <a href="tel:+32470941588" className="hover:text-orange-vif transition">0470 94 15 88</a>
                            </p>
                            <p>
                                <span className="font-medium text-white">Email :</span>{' '}
                                <a href="mailto:geometre1470@gmail.com" className="hover:text-orange-vif transition">geometre1470@gmail.com</a>
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:basis-[300px] lg:px-4">
                        <h4 className="font-bold text-xl text-white mb-4 tracking-wide">Navigation</h4>
                        <ul className="space-y-2 text-sm">
 <li><a href="#Home" className="hover:text-orange-vif transition">Accueil</a></li>
        <li><a href="#About" className="hover:text-orange-vif transition">À propos</a></li>
        <li><a href="#Services" className="hover:text-orange-vif transition">Services</a></li>
        
        <li><a href="#ReportViewer" className="hover:text-orange-vif transition">Exemple de rapport</a></li>
        
        <li><a href="#Pricing" className="hover:text-orange-vif transition">Tarifs</a></li>
        <li><a href="#Calculator" className="hover:text-orange-vif transition">Calculateur</a></li>
        
       
        <li><a href="#Faq" className="hover:text-orange-vif transition">FAQ</a></li>
        <li><a href="#Contact" className="hover:text-orange-vif transition">Contact</a></li>
        <li><a href="#Legal" className="hover:text-orange-vif transition">Mentions légales</a></li>
                        </ul>
                    </div>

                    {/* Légal */}
                    <div className="lg:basis-[300px] lg:px-4">
                        <h4 className="font-bold text-xl text-white mb-4 tracking-wide">Légal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#Legal" className="hover:text-orange-vif transition">Mentions Légales</a></li>
                            <li><a href="#Privacy" className="hover:text-orange-vif transition">Confidentialité &amp; RGPD</a></li>
                        </ul>
                    </div>

                    {/* Liens utiles (plus large) */}
                    <div className="lg:basis-[300px] lg:px-4">
                        <h4 className="font-bold text-xl text-white mb-4 tracking-wide">Liens utiles</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="https://www.geometre-expert.be" target="_blank" rel="noopener noreferrer" className="hover:text-orange-vif transition">Ordre des Géomètres‑Experts</a></li>
                            <li><a href="https://www.notaire.be" target="_blank" rel="noopener noreferrer" className="hover:text-orange-vif transition">Notaire.be</a></li>
                            <li><a href="https://finances.belgium.be/fr/particuliers/habitation/cadastre" target="_blank" rel="noopener noreferrer" className="hover:text-orange-vif transition">Cadastre - SPF Finances</a></li>
                            <li><a href="https://geoportail.wallonie.be" target="_blank" rel="noopener noreferrer" className="hover:text-orange-vif transition">Géoportail Wallonie</a></li>
                            <li><a href="https://logement.brussels/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-vif transition">Logement - Bruxelles</a></li>
                            <li><a href="https://www.wallonie.be/fr/demarches/sinformer-sur-le-bail-dhabitation" target="_blank" rel="noopener noreferrer" className="hover:text-orange-vif transition">Guide du bail (Wallonie)</a></li>
                            <li><a href="https://www.ejustice.just.fgov.be/cgi_loi/change_lg.pl?language=fr&la=F&cn=1997010825&table_name=loi" target="_blank" rel="noopener noreferrer" className="hover:text-orange-vif transition">Règles d'entretien</a></li>
                        </ul>
                    </div>

                    {/* Régions */}
                    <div className="lg:basis-[300px] lg:px-4">
                        <h4 className="font-bold text-xl text-white mb-4 tracking-wide">Régions</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="https://www.wallonie.be" target="_blank" rel="noopener noreferrer" className="hover:text-orange-vif transition">Wallonie</a></li>
                            <li><a href="https://be.brussels" target="_blank" rel="noopener noreferrer" className="hover:text-orange-vif transition">Bruxelles-Capitale</a></li>
                            <li><a href="https://www.vlaanderen.be" target="_blank" rel="noopener noreferrer" className="hover:text-orange-vif transition">Flandre</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-slate-950 py-5 rounded-b-2xl shadow-xl text-center text-xs sm:text-sm text-slate-400 tracking-wide">
                <p>
                    Copyright © {new Date().getFullYear()} <span className="font-medium text-white">kd-expertise.be</span> – Tous droits réservés.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
