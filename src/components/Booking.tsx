import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import type { BookingState, Service } from '@/types';
import { SERVICES, BOOKING_STEPS } from '@/constants';
import { getAvailableSlots, bookSlot } from '@/services/firebaseBooking';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeftIcon, ChevronRightIcon, ConfirmationIcon } from '@/components/Icons';
import { reportConversion, BOOKING_CONVERSION_LABEL } from '@/services/googleAds';
import { sendMail } from '@/services/firebaseMail';
import { calculatePrice } from '@/services/bookingService';

const BookingStepper: React.FC<{ currentStep: number }> = ({ currentStep }) => (
    <div className="flex items-center justify-center mb-8">
        {BOOKING_STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                            ${index <= currentStep ? 'bg-orange-vif text-white' : 'bg-gray-200 text-slate-500'}
                            ${index === currentStep ? 'ring-4 ring-orange-vif/30' : ''}`}>
                        <step.icon className="w-6 h-6" />
                    </div>
                    <p className={`mt-2 text-sm font-semibold transition-colors duration-300 ${index <= currentStep ? 'text-orange-vif' : 'text-slate-500'}`}>
                        {step.name}
                    </p>
                </div>
                {index < BOOKING_STEPS.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 transition-colors duration-300 ${index < currentStep ? 'bg-orange-vif' : 'bg-gray-200'}`}></div>
                )}
            </React.Fragment>
        ))}
    </div>
);

const BookingStep1Services: React.FC<{ onSelectService: (service: Service) => void }> = ({ onSelectService }) => (
    <div>
        <h3 className="text-2xl font-bold text-center text-blue-deep mb-6">Quel service souhaitez-vous ?</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map(service => {
                const Icon = service.icon;
                return (
                    <button key={service.id} onClick={() => onSelectService(service)} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg hover:border-orange-vif border-2 border-transparent transition-all duration-300 text-left flex flex-col items-center text-center h-full">
                        <Icon className="w-10 h-10 text-orange-vif mb-3" />
                        <h4 className="font-bold text-blue-deep">{service.title}</h4>
                        <p className="text-sm text-slate-500 mt-1 flex-grow">{service.description}</p>
                    </button>
                );
            })}
        </div>
    </div>
);

const BookingStep2DateTime: React.FC<{ onSelectDateTime: (date: Date, time: string) => void; onBack: () => void; }> = ({ onSelectDateTime, onBack }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        const load = async () => {
            if (selectedDate) {
                const dateKey = selectedDate.toISOString().split('T')[0];
                const slots = await getAvailableSlots(dateKey);
                const now = new Date();
                let filtered = slots;
                if (selectedDate.toDateString() === now.toDateString()) {
                    const currentMinutes = now.getHours() * 60 + now.getMinutes();
                    filtered = slots.filter(slot => {
                        const [hours, minutes] = slot.split(':').map(Number);
                        return hours * 60 + minutes > currentMinutes;
                    });
                }
                setAvailableTimes(filtered);
            } else {
                setAvailableTimes([]);
            }
        };
        load();
    }, [selectedDate]);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday, 1 = Monday...
    const weekDays = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

    const changeMonth = (delta: number) => {
        const newDate = new Date(currentYear, currentMonth + delta, 1);
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
        setSelectedDate(null);
    };

    const calendarDays = useMemo(() => {
        const days = [];
        const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust to Monday start
        for (let i = 0; i < startDayIndex; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const isPast = date < today;
            const isSelected = selectedDate?.getTime() === date.getTime();
            days.push(
                <button
                    key={i}
                    disabled={isPast}
                    onClick={() => setSelectedDate(date)}
                    className={`p-2 text-center rounded-full w-10 h-10 transition-colors duration-200
                        ${isPast ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-orange-vif/20'}
                        ${isSelected ? 'bg-orange-vif text-white font-bold' : 'text-slate-700'}`
                    }
                >
                    {i}
                </button>
            );
        }
        return days;
    }, [currentMonth, currentYear, selectedDate, daysInMonth, firstDayOfMonth, today]);

    return (
        <div>
            <h3 className="text-2xl font-bold text-center text-blue-deep mb-6">Choisissez une date et une heure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeftIcon /></button>
                        <h4 className="font-bold text-lg text-blue-deep">{new Date(currentYear, currentMonth).toLocaleString('fr-BE', { month: 'long', year: 'numeric' })}</h4>
                        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronRightIcon /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center font-semibold text-sm text-slate-500 mb-2">
                        {weekDays.map(day => <div key={day}>{day}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1 items-center justify-center">{calendarDays}</div>
                </div>
                <div className="flex flex-col">
                    {selectedDate && (
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg text-blue-deep text-center md:text-left">Créneaux pour le {selectedDate.toLocaleDateString('fr-BE')}</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {availableTimes.length > 0 ? (
                                    availableTimes.map(time => (
                                        <button key={time} onClick={() => onSelectDateTime(selectedDate!, time)} className="p-3 bg-white rounded-lg shadow-sm border-2 border-transparent hover:border-orange-vif transition-all duration-200 font-semibold text-blue-deep">
                                            {time}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-slate-500 col-span-2">Aucun créneau disponible pour cette date.</p>
                                )}
                            </div>
                        </div>
                    )}
                    {!selectedDate && (
                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg p-6">
                            <p className="text-slate-500 text-center">Veuillez sélectionner une date pour voir les créneaux disponibles.</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8 flex justify-between">
                <button onClick={onBack} className="px-6 py-2 bg-gray-200 text-slate-700 font-bold rounded-full hover:bg-gray-300 transition">Précédent</button>
            </div>
        </div>
    );
};

const BookingStep3Info: React.FC<{
    bookingState: BookingState;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
    onBack: () => void;
    recaptchaRef: React.RefObject<ReCAPTCHA>;
    isSubmitting: boolean;
}> = ({ bookingState, onFormChange, onSubmit, onBack, recaptchaRef, isSubmitting }) => {

    const isEdl = bookingState.service?.type === 'edl';
    const { pricePerParty } = calculatePrice({
        typeBien: bookingState.typeBien,
        chambres: Number(bookingState.chambres),
        sdb: Number(bookingState.sdb),
        options: {
            meuble: bookingState.meuble,
            jardin: bookingState.jardin,
            parking: bookingState.parking,
            cave: bookingState.cave,
            print: bookingState.print,
            piscine: false,
            bxl: false,
            admin: false,
            reouverture: false
        },
        surface: 0
    });

    return (
        <div>
            <h3 className="text-2xl font-bold text-center text-blue-deep mb-6">Vos informations et récapitulatif</h3>
            <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-8">
                 <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey="6LfBspgrAAAAAN2gT5DZzwCdU8hJycQCn7WG61u9"
                />
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-blue-deep border-b pb-2">Vos coordonnées</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" name="firstName" placeholder="Prénom" required onChange={onFormChange} value={bookingState.firstName} className="w-full p-3 border border-gray-300 rounded-lg"/>
                        <input type="text" name="lastName" placeholder="Nom" required onChange={onFormChange} value={bookingState.lastName} className="w-full p-3 border border-gray-300 rounded-lg"/>
                    </div>
                    <input type="email" name="email" placeholder="E-mail" required onChange={onFormChange} value={bookingState.email} className="w-full p-3 border border-gray-300 rounded-lg"/>
                    <input type="tel" name="phone" placeholder="Téléphone" required onChange={onFormChange} value={bookingState.phone} className="w-full p-3 border border-gray-300 rounded-lg"/>
                    <input type="text" name="propertyAddress" placeholder="Adresse du bien concerné" required onChange={onFormChange} value={bookingState.propertyAddress} className="w-full p-3 border border-gray-300 rounded-lg"/>

                    {isEdl && (
                       <div className="space-y-4 pt-4 border-t">
                            <h4 className="text-lg font-semibold text-blue-deep">Détails de l'état des lieux</h4>
                            <div>
                                <label className="block font-semibold text-slate-700 mb-2">Type d'état des lieux</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <input type="radio" name="bookingType" value="entree" checked={bookingState.bookingType === 'entree'} onChange={onFormChange} className="h-4 w-4 text-orange-vif border-gray-300 focus:ring-orange-vif"/> <span className="ml-2">Entrée</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="bookingType" value="sortie" checked={bookingState.bookingType === 'sortie'} onChange={onFormChange} className="h-4 w-4 text-orange-vif border-gray-300 focus:ring-orange-vif"/> <span className="ml-2">Sortie</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold text-slate-700 mb-2">Type de bien</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <input type="radio" name="typeBien" value="appartement" checked={bookingState.typeBien === 'appartement'} onChange={onFormChange} className="h-4 w-4 text-orange-vif border-gray-300 focus:ring-orange-vif"/> <span className="ml-2">Appartement</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="typeBien" value="maison" checked={bookingState.typeBien === 'maison'} onChange={onFormChange} className="h-4 w-4 text-orange-vif border-gray-300 focus:ring-orange-vif"/> <span className="ml-2">Maison / Villa</span>
                                    </label>
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">Chambres</label>
                                    <select name="chambres" onChange={onFormChange} value={bookingState.chambres} className="w-full p-3 border border-gray-300 rounded-lg">
                                        {Array.from(Array(11).keys()).map(i => <option key={i} value={i}>{i} chambre{i > 1 ? 's' : ''}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">Salles de bain</label>
                                    <select name="sdb" onChange={onFormChange} value={bookingState.sdb} className="w-full p-3 border border-gray-300 rounded-lg">
                                        {Array.from(Array(6).keys()).map(i => <option key={i} value={i + 1}>{i + 1} salle{i > 0 ? 's' : ''} de bain</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700 mb-2">Options</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" name="meuble" checked={bookingState.meuble} onChange={onFormChange} className="h-4 w-4 text-orange-vif rounded"/> <span className="ml-2">Meublé</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" name="jardin" checked={bookingState.jardin} onChange={onFormChange} className="h-4 w-4 text-orange-vif rounded"/> <span className="ml-2">Jardin</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" name="parking" checked={bookingState.parking} onChange={onFormChange} className="h-4 w-4 text-orange-vif rounded"/> <span className="ml-2">Parking</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" name="cave" checked={bookingState.cave} onChange={onFormChange} className="h-4 w-4 text-orange-vif rounded"/> <span className="ml-2">Cave</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" name="print" checked={bookingState.print} onChange={onFormChange} className="h-4 w-4 text-orange-vif rounded"/> <span className="ml-2">Imprimé</span>
                                    </label>
                                </div>
                            </div>
                       </div>
                    )}
                    <textarea name="notes" placeholder="Notes ou informations complémentaires..." rows={3} onChange={onFormChange} value={bookingState.notes} className="w-full p-3 border border-gray-300 rounded-lg"></textarea>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 h-fit">
                    <h4 className="text-lg font-semibold text-blue-deep border-b pb-2">Récapitulatif</h4>
                    <div><strong>Service:</strong> <p className="text-slate-600">{bookingState.service?.title}</p></div>
                    {isEdl && <div><strong>Type de bien:</strong> <p className="text-slate-600 capitalize">{bookingState.typeBien === 'maison' ? 'Maison / Villa' : 'Appartement'}</p></div>}
                    <div><strong>Date:</strong> <p className="text-slate-600">{bookingState.date?.toLocaleDateString('fr-BE')}</p></div>
                    <div><strong>Heure:</strong> <p className="text-slate-600">{bookingState.time}</p></div>
                    {isEdl && pricePerParty > 0 && (
                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between items-center text-lg">
                                <span className="text-slate-600">Prix indicatif / partie:</span>
                                <span className="font-bold text-blue-deep">{pricePerParty.toFixed(2)} €</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Le prix définitif sera confirmé sur le devis.</p>
                        </div>
                    )}
                    <p className="text-sm text-slate-500 pt-4">Veuillez vérifier les informations. Un e-mail de confirmation vous sera envoyé.</p>
                </div>
                <div className="md:col-span-2 mt-4 flex justify-between">
                    <button type="button" onClick={onBack} className="px-6 py-3 bg-gray-200 text-slate-700 font-bold rounded-full hover:bg-gray-300 transition">Précédent</button>
                    <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-orange-vif text-white font-bold rounded-full text-lg hover:bg-orange-vif-dark transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Confirmation...' : 'Confirmer mon rendez-vous'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const BookingStep4Confirmation: React.FC<{ bookingState: BookingState, onReset: () => void }> = ({ bookingState, onReset }) => {
    return (
        <div className="text-center py-12">
            <ConfirmationIcon className="w-20 h-20 text-green-500 mx-auto" />
            <h3 className="text-3xl font-bold text-blue-deep mt-6">Rendez-vous confirmé !</h3>
            <p className="mt-2 text-slate-600 max-w-md mx-auto">
                Merci, {bookingState.firstName}. Votre demande de rendez-vous pour un(e) <strong className="text-blue-deep">{bookingState.service?.title}</strong> le <strong className="text-blue-deep">{bookingState.date?.toLocaleDateString('fr-BE')} à {bookingState.time}</strong> a bien été enregistrée.
            </p>
            <p className="mt-4 text-slate-600">Un e-mail de confirmation vient de vous être envoyé à l'adresse <strong className="text-blue-deep">{bookingState.email}</strong>.</p>
            <p className="mt-2 text-sm text-slate-500">N'hésitez pas à me contacter si vous avez la moindre question.</p>
            <button onClick={onReset} className="mt-8 px-8 py-3 bg-orange-vif text-white font-bold rounded-full hover:bg-orange-vif-dark transition-all">Prendre un autre rendez-vous</button>
        </div>
    );
};

const Booking: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const [bookingState, setBookingState] = useState<BookingState>({
        service: null,
        date: null,
        time: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        propertyAddress: '',
        notes: '',
        bookingType: 'entree',
        typeBien: 'appartement',
        chambres: 1,
        sdb: 1,
        meuble: false,
        jardin: false,
        parking: false,
        cave: false,
        print: false,
    });
    
    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, BOOKING_STEPS.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleSelectService = (service: Service) => {
        setBookingState(prev => ({ ...prev, service }));
        nextStep();
    };

    const handleSelectDateTime = (date: Date, time: string) => {
        setBookingState(prev => ({ ...prev, date, time }));
        nextStep();
    };
    
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setBookingState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = await recaptchaRef.current?.executeAsync();
            if (!token) {
                throw new Error("La vérification reCAPTCHA a échoué. Veuillez réessayer.");
            }

            const payload = {
                type: 'booking',
                service: bookingState.service?.title,
                date: bookingState.date?.toLocaleDateString('fr-BE'),
                time: bookingState.time,
                name: `${bookingState.firstName} ${bookingState.lastName}`,
                email: bookingState.email,
                phone: bookingState.phone,
                address: bookingState.propertyAddress,
                notes: bookingState.notes,
                bookingType: bookingState.bookingType,
                typeBien: bookingState.typeBien,
                chambres: bookingState.chambres,
                sdb: bookingState.sdb,
                options: [
                    bookingState.meuble && 'Meublé',
                    bookingState.jardin && 'Jardin/Terrasse',
                    bookingState.parking && 'Parking/Garage',
                    bookingState.cave && 'Cave',
                    bookingState.print && 'Version Imprimée'
                ].filter(Boolean).join(', ') || 'Aucune',
                token
            };

            await sendMail(payload);
            reportConversion(BOOKING_CONVERSION_LABEL);
            if (bookingState.date && bookingState.time) {
                const dateKey = bookingState.date.toISOString().split('T')[0];
                await bookSlot(dateKey, bookingState.time);
            }
            nextStep();
        } catch (error) {
            let errorMessage = "Erreur lors de la prise de rendez-vous.";
            if (error && typeof (error as any).text === 'string') {
                errorMessage += ` Détails: ${(error as any).text}`;
            } else if (error instanceof Error) {
                errorMessage += ` Détails: ${error.message}`;
            }
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
            recaptchaRef.current?.reset();
        }
    };
    
    const handleReset = () => {
        setBookingState({
            service: null, date: null, time: null, firstName: '', lastName: '',
            email: '', phone: '', propertyAddress: '', notes: '',
            bookingType: 'entree', typeBien: 'appartement', chambres: 1, sdb: 1,
            meuble: false, jardin: false, parking: false, cave: false, print: false
        });
        setCurrentStep(0);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <BookingStep1Services onSelectService={handleSelectService} />;
            case 1:
                return <BookingStep2DateTime onSelectDateTime={handleSelectDateTime} onBack={prevStep} />;
            case 2:
                return <BookingStep3Info bookingState={bookingState} onFormChange={handleFormChange} onSubmit={handleSubmit} onBack={prevStep} recaptchaRef={recaptchaRef} isSubmitting={isSubmitting}/>;
            case BOOKING_STEPS.length:
                 return <BookingStep4Confirmation bookingState={bookingState} onReset={handleReset} />;
            default:
                return null;
        }
    };

    return (
        <section id="Booking" ref={ref} className={`bg-white py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Prendre Rendez-vous en Ligne</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Planifiez votre expertise en quelques clics. Simple, rapide et efficace.</p>
                    <div className="mt-6 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto bg-gray-50 p-6 md:p-8 rounded-2xl shadow-lg border">
                    <BookingStepper currentStep={currentStep} />
                    <div className="mt-8">
                        {renderStep()}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Booking;
