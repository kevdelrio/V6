import React, { useState } from 'react';
import { calculatePrice } from '@/utils/pricing';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { CalculatorState, CalculatorContact } from '@/types';
import { CALCULATOR_STEPS } from '@/constants';

const initialCalculatorState: CalculatorState = {
  mission: 'locatif',
  typeBien: 'appartement',
  chambres: 1,
  sdb: 1,
  meuble: false,
  jardin: false,
  frais: '2parties',
  surface: 300,
  facades: 1,
  recolement: false,
  autres_pieces: 0,
  mobilier: false,
  chambres_communautaire: 1,
};

const missionDetailOptions: Record<CalculatorState['mission'], string[]> = {
  locatif: ["un état des lieux d'entrée", "un état des lieux de sortie"],
  'avant-travaux': ["une mission avant travaux"],
  reception: ["une réception provisoire"],
  acquisitif: ["une mission acquisitive"],
  'permis-location': ["un permis de location"],
};

const createMessage = (detail: string) =>
  `Bonjour,\nJe souhaiterais connaître vos disponibilités pour ${detail}, ou bien j’ai une question à ce sujet.`;

const CalculatorStepper: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-8">
    {CALCULATOR_STEPS.map((step, index) => (
      <React.Fragment key={step.id}>
        <div className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              index <= currentStep ? 'bg-orange-vif text-white' : 'bg-gray-200 text-slate-500'
            } ${index === currentStep ? 'ring-4 ring-orange-vif/30' : ''}`}
          >
            <step.icon className="w-6 h-6" />
          </div>
          <p
            className={`mt-2 text-sm font-semibold transition-colors duration-300 ${
              index <= currentStep ? 'text-orange-vif' : 'text-slate-500'
            }`}
          >
            {step.name}
          </p>
        </div>
        {index < CALCULATOR_STEPS.length - 1 && (
          <div
            className={`flex-1 h-1 mx-4 transition-colors duration-300 ${
              index < currentStep ? 'bg-orange-vif' : 'bg-gray-200'
            }`}
          ></div>
        )}
      </React.Fragment>
    ))}
  </div>
);

const CalculatorForm: React.FC = () => {
  const [state, setState] = useState<CalculatorState>(initialCalculatorState);
  const [contact, setContact] = useState<CalculatorContact>(() => {
    const detail = missionDetailOptions[initialCalculatorState.mission][0];
    return {
      propertyAddress: '',
      fullName: '',
      email: '',
      phone: '',
      missionDetail: detail,
      message: createMessage(detail),
    };
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleMissionChange = (newMission: CalculatorState['mission']) => {
    const defaultStateForMission: CalculatorState = {
      ...initialCalculatorState,
      mission: newMission,
    };
    if (newMission === 'permis-location') {
      defaultStateForMission.typeBien = 'studio';
    }
    setState(defaultStateForMission);
    const detail = missionDetailOptions[newMission][0];
    setContact(prev => ({
      ...prev,
      missionDetail: detail,
      message: createMessage(detail),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val =
      type === 'checkbox'
        ? checked
        : type === 'number' ||
          ['chambres', 'sdb', 'autres_pieces', 'chambres_communautaire', 'facades'].includes(name)
        ? parseInt(value, 10) || 0
        : value;

    setState(prev => ({ ...prev, [name]: val }));
  };

  const { pricePerParty, total, isPerParty } = calculatePrice(state);

  const handleContactChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setContact(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'missionDetail' ? { message: createMessage(value) } : {}),
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Demande d'informations - ${contact.missionDetail}`;
    const body = encodeURIComponent(
      `Adresse du bien: ${contact.propertyAddress}\nNom et prénom: ${contact.fullName}\nEmail: ${contact.email}\nTéléphone: ${contact.phone}\n\n${contact.message}`
    );
    window.location.href = `mailto:geometre1470@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
  };

  const nextStep = () =>
    setCurrentStep(prev => Math.min(prev + 1, CALCULATOR_STEPS.length - 1));
  const prevStep = () =>
    setCurrentStep(prev => Math.max(prev - 1, 0));

  const TabButton: React.FC<{
    missionType: CalculatorState['mission'];
    children: React.ReactNode;
  }> = ({ missionType, children }) => {
    const isActive = state.mission === missionType;
    return (
      <button
        type="button"
        onClick={() => handleMissionChange(missionType)}
        className={`py-3 px-4 text-center font-semibold rounded-t-lg flex-1 transition-all duration-300 text-sm md:text-base ${
          isActive
            ? 'bg-orange-vif text-white shadow-md'
            : 'bg-white hover:bg-orange-vif/10 text-blue-deep'
        }`}
      >
        {children}
      </button>
    );
  };

  if (currentStep === 1) {
    return (
      <div className="bg-blue-deep/5 rounded-xl p-4 md:p-6 max-w-5xl mx-auto shadow-lg border border-orange-vif/20">
        <CalculatorStepper currentStep={currentStep} />
        <div className="bg-white p-6 rounded-lg shadow-inner">
          <h4 className="text-xl font-bold text-blue-deep mb-4 text-center">Prendre contact</h4>
          <form onSubmit={handleContactSubmit} className="space-y-4 max-w-xl mx-auto">
            <input
              type="text"
              name="propertyAddress"
              placeholder="Adresse du bien"
              value={contact.propertyAddress}
              onChange={handleContactChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="fullName"
              placeholder="Nom et prénom"
              value={contact.fullName}
              onChange={handleContactChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Adresse e-mail"
              value={contact.email}
              onChange={handleContactChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Numéro de téléphone"
              value={contact.phone}
              onChange={handleContactChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <select
              name="missionDetail"
              value={contact.missionDetail}
              onChange={handleContactChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              {missionDetailOptions[state.mission].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <textarea
              name="message"
              value={contact.message}
              onChange={handleContactChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-orange-vif text-white rounded-lg font-semibold hover:bg-orange-vif-dark transition"
            >
              Envoyer ma demande
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={prevStep}
              className="text-blue-deep underline"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-deep/5 rounded-xl p-4 md:p-6 max-w-5xl mx-auto shadow-lg border border-orange-vif/20">
      <CalculatorStepper currentStep={currentStep} />
      <div className="flex flex-col sm:flex-row">
        <TabButton missionType="locatif">Locatif</TabButton>
        <TabButton missionType="avant-travaux">Avant Travaux</TabButton>
        <TabButton missionType="reception">Réception Provisoire</TabButton>
        <TabButton missionType="acquisitif">Acquisitif</TabButton>
        <TabButton missionType="permis-location">Permis Location</TabButton>
      </div>

      <div className="bg-white p-6 rounded-b-lg shadow-inner">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-6">
            {state.mission === 'locatif' && (
              <>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Type de bien</label>
                    <select
                      name="typeBien"
                      onChange={handleChange}
                      value={state.typeBien}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="appartement">Appartement</option>
                      <option value="maison">Maison / Villa</option>
                      <option value="studio">Studio</option>
                      <option value="kot">Kot (logement étudiant)</option>
                    </select>
                  </div>
                  {(state.typeBien === 'appartement' || state.typeBien === 'maison') && (
                    <>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Chambres</label>
                        <select
                          name="chambres"
                          onChange={handleChange}
                          value={state.chambres}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(i => (
                            <option key={i} value={i}>{`${i} chambre${i > 1 ? 's' : ''}`}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Salles de bain</label>
                        <select
                          name="sdb"
                          onChange={handleChange}
                          value={state.sdb}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          {Array.from({ length: 6 }, (_, i) => i + 1).map(i => (
                            <option key={i} value={i}>{`${i} salle${i > 1 ? 's' : ''} de bain`}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-700 mb-2">Options :</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="meuble"
                        checked={state.meuble}
                        onChange={handleChange}
                        className="h-5 w-5 text-orange-vif rounded"
                      />
                      <span className="ml-2">Bien meublé</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="jardin"
                        checked={state.jardin}
                        onChange={handleChange}
                        className="h-5 w-5 text-orange-vif rounded"
                      />
                      <span className="ml-2">Jardin &gt;100m²</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {state.mission === 'avant-travaux' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type de bien</label>
                  <select
                    name="typeBien"
                    onChange={handleChange}
                    value={state.typeBien}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="maison">Maison</option>
                    <option value="appartement">Appartement</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nombre de façades</label>
                  <select
                    name="facades"
                    onChange={handleChange}
                    value={state.facades}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    {[1, 2, 3, 4].map(i => (
                      <option key={i} value={i}>{`${i} façade${i > 1 ? 's' : ''}`}</option>
                    ))}
                  </select>
                </div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="recolement"
                    checked={state.recolement}
                    onChange={handleChange}
                    className="h-5 w-5 text-orange-vif rounded"
                  />
                  <span className="ml-2">Inclure le récolement (constat après travaux)</span>
                </label>
              </div>
            )}

            {state.mission === 'reception' && (
              <>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Type de bien</label>
                    <select
                      name="typeBien"
                      onChange={handleChange}
                      value={state.typeBien}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="studio">Studio</option>
                      <option value="appartement">Appartement</option>
                      <option value="maison">Maison</option>
                      <option value="villa">Villa</option>
                    </select>
                  </div>
                  {state.typeBien !== 'studio' ? (
                    <>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Chambres</label>
                        <select
                          name="chambres"
                          onChange={handleChange}
                          value={state.chambres}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(i => (
                            <option key={i} value={i}>{`${i} chambre${i > 1 ? 's' : ''}`}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Salles de bain</label>
                        <select
                          name="sdb"
                          onChange={handleChange}
                          value={state.sdb}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          {Array.from({ length: 6 }, (_, i) => i + 1).map(i => (
                            <option key={i} value={i}>{`${i} salle${i > 1 ? 's' : ''} de bain`}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Salles de bain</label>
                      <select
                        name="sdb"
                        onChange={handleChange}
                        value={state.sdb}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        {Array.from({ length: 6 }, (_, i) => i + 1).map(i => (
                          <option key={i} value={i}>{`${i} salle${i > 1 ? 's' : ''} de bain`}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-700 mb-2">Options :</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="meuble"
                        checked={state.meuble}
                        onChange={handleChange}
                        className="h-5 w-5 text-orange-vif rounded"
                      />
                      <span className="ml-2">Bien meublé</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="jardin"
                        checked={state.jardin}
                        onChange={handleChange}
                        className="h-5 w-5 text-orange-vif rounded"
                      />
                      <span className="ml-2">Jardin &gt;100m²</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {state.mission === 'acquisitif' && (
              <>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Type de bien</label>
                    <select
                      name="typeBien"
                      onChange={handleChange}
                      value={state.typeBien}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="studio">Studio / Flat</option>
                      <option value="appartement">Appartement</option>
                      <option value="maison">Maison</option>
                    </select>
                  </div>
                  {state.typeBien !== 'studio' && (
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Chambres</label>
                      <select
                        name="chambres"
                        onChange={handleChange}
                        value={state.chambres}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(i => (
                          <option key={i} value={i}>{`${i} chambre${i > 1 ? 's' : ''}`}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Autres pièces suppl.</label>
                    <input
                      type="number"
                      name="autres_pieces"
                      min={0}
                      onChange={handleChange}
                      value={state.autres_pieces}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="mobilier"
                    checked={state.mobilier}
                    onChange={handleChange}
                    className="h-5 w-5 text-orange-vif rounded"
                  />
                  <span className="ml-2">Reportage photo du mobilier</span>
                </label>
              </>
            )}

            {state.mission === 'permis-location' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type de logement</label>
                  <select
                    name="typeBien"
                    onChange={handleChange}
                    value={state.typeBien}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="studio">Studio</option>
                    <option value="communautaire">Logement communautaire</option>
                  </select>
                </div>
                {state.typeBien === 'communautaire' && (
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nombre de chambres / espaces privatifs
                    </label>
                    <input
                      type="number"
                      name="chambres_communautaire"
                      min={1}
                      onChange={handleChange}
                      value={state.chambres_communautaire}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}

            {isPerParty && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Frais à charge</label>
                <select
                  name="frais"
                  onChange={handleChange}
                  value={state.frais}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="2parties">Deux parties</option>
                  <option value="1seulepartie">Une seule partie</option>
                </select>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-inner mt-6 md:mt-0">
            <h4 className="text-xl font-bold text-blue-deep mb-4 text-center">Estimation du coût</h4>
            {total === 0 && state.mission !== 'locatif' ? (
              <p className="text-center text-2xl font-bold text-blue-deep">Sur devis</p>
            ) : (
              <div className="space-y-4">
                {isPerParty && state.frais === '2parties' && (
                  <>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-slate-600">Part Propriétaire :</span>
                      <span className="font-semibold text-blue-deep">{pricePerParty.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-slate-600">Part Locataire :</span>
                      <span className="font-semibold text-blue-deep">{pricePerParty.toFixed(2)} €</span>
                    </div>
                  </>
                )}
                {!isPerParty && (
                  <div className="text-center text-sm text-slate-500 mb-2">
                    Le prix est un forfait total.
                  </div>
                )}
                <div className="border-t border-gray-200 my-2" />
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span className="text-orange-vif">
                    {isPerParty && state.frais === '1seulepartie'
                      ? 'Total à votre charge :'
                      : 'Total TVAC :'}
                  </span>
                  <span className="text-orange-vif">{total.toFixed(2)} €</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-6">
          Cette estimation est indicative. Un devis définitif sera fourni après analyse de votre demande.
        </p>
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-3 bg-orange-vif text-white rounded-lg font-semibold hover:bg-orange-vif-dark transition"
          >
            Demander un rendez-vous
          </button>
        </div>
      </div>
    </div>
  );
};

const Calculator: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      id="Calculator"
      ref={ref as React.RefObject<HTMLElement>}
      className={`bg-white py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto">
        <CalculatorForm />
      </div>
    </section>
  );
};

export default Calculator;
