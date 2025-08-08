import React, { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import type { ContactFormData } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PhoneIconContact, MailIconContact, ClockIconContact } from '@/components/Icons';
import { sendMail } from '@/services/firebaseMail';
import { reportConversion, PHONE_CONVERSION_LABEL, FORM_CONVERSION_LABEL } from '@/services/googleAds';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });
    const [gdprAccepted, setGdprAccepted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ref, isVisible] = useScrollAnimation();
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneClick = () => {
        reportConversion(PHONE_CONVERSION_LABEL);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!gdprAccepted) {
            alert("Veuillez accepter la politique de confidentialité.");
            return;
        }
        setIsSubmitting(true);
        try {
            const token = await recaptchaRef.current?.executeAsync();
            if (!token) {
                throw new Error("La vérification reCAPTCHA a échoué. Veuillez réessayer.");
            }
            
            await sendMail({
                type: 'contact',
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                token
            });
            reportConversion(FORM_CONVERSION_LABEL);
            alert('Message envoyé avec succès.');
            setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
            setGdprAccepted(false);
            recaptchaRef.current?.reset();
        } catch (error) {
            let errorMessage = "Erreur lors de l’envoi.";
            if (error && typeof (error as any).text === 'string') {
                errorMessage += ` Détails: ${(error as any).text}`;
            } else if (error instanceof Error) {
                errorMessage += ` Détails: ${error.message}`;
            }
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <section id="Contact" ref={ref} className={`bg-white py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Contactez-moi pour un devis gratuit</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Remplissez le formulaire ci-dessous ou utilisez mes coordonnées. Je vous répondrai dans les plus brefs délais.</p>
                    <div className="mt-6 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                         <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey="6LfBspgrAAAAAN2gT5DZzwCdU8hJycQCn7WG61u9"
                        />
                        <div className="grid sm:grid-cols-2 gap-6">
                            <label htmlFor="firstName" className="block">
                                <span className="block mb-1 text-slate-700">Prénom</span>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    placeholder="ex: Jean"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-vif focus:border-transparent transition"
                                />
                            </label>
                            <label htmlFor="lastName" className="block">
                                <span className="block mb-1 text-slate-700">Nom</span>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    placeholder="ex: Dupont"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-vif focus:border-transparent transition"
                                />
                            </label>
                        </div>
                        <label htmlFor="email" className="block">
                            <span className="block mb-1 text-slate-700">E-mail</span>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="ex: jean.dupont@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-vif focus:border-transparent transition"
                            />
                        </label>
                        <label htmlFor="phone" className="block">
                            <span className="block mb-1 text-slate-700">Téléphone</span>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                placeholder="ex: 0470 94 15 88"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-vif focus:border-transparent transition"
                            />
                        </label>
                        <label htmlFor="message" className="block">
                            <span className="block mb-1 text-slate-700">Message</span>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Votre message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-vif focus:border-transparent transition"
                            ></textarea>
                        </label>
                        
                        <div className="flex items-start">
                            <input type="checkbox" id="gdpr" checked={gdprAccepted} onChange={() => setGdprAccepted(!gdprAccepted)} className="h-5 w-5 mt-1 text-orange-vif border-gray-300 rounded focus:ring-orange-vif"/>
                            <label htmlFor="gdpr" className="ml-3 text-sm text-slate-600">
                                En soumettant ce formulaire, j'accepte que les informations saisies soient utilisées dans le cadre de ma demande et de la relation commerciale qui peut en découler.
                            </label>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-orange-vif text-white font-bold rounded-full text-lg hover:bg-orange-vif-dark transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
                           {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                        </button>
                    </form>
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col space-y-4">
                           <div className="flex items-center">
                               <PhoneIconContact />
                               <a href="tel:0470941588" onClick={handlePhoneClick} className="text-lg font-semibold text-blue-deep">0470&nbsp;94&nbsp;15&nbsp;88</a>
                           </div>
                           <div className="flex items-center">
                               <MailIconContact /> <span className="text-lg font-semibold text-blue-deep">geometre1470@gmail.com</span>
                           </div>
                           <div className="flex items-center">
                                <ClockIconContact /> <span className="text-lg font-semibold text-blue-deep">Disponible&nbsp;: 7&nbsp;jours/7 de 9h&nbsp;à&nbsp;18h</span>
                           </div>
                        </div>
                        <div className="h-full min-h-[400px] rounded-lg shadow-lg">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40638.16911579478!2d4.398688402127271!3d50.60942404557999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2304136585189%3A0x40099ab2f4d6e90!2sGenappe!5e0!3m2!1sfr!2sbe"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Carte de la région de Genappe"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
