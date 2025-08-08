import { PRICE_MAP } from '@/constants';
import { CalculatorState } from '@/types';

export const calculatePrice = (state: CalculatorState) => {
  let basePrice = 0;
  let pricePerParty = 0;
  let total = 0;
  const isPerParty = state.mission === 'locatif';

  switch (state.mission) {
    case 'locatif': {
      if (state.typeBien === 'studio' || state.typeBien === 'kot') {
        const key = `locatif_appartement_0_${state.sdb}`;
        basePrice = PRICE_MAP[key] ?? 0;
      } else {
        const key = `locatif_${state.typeBien}_${state.chambres}_${state.sdb}`;
        basePrice = PRICE_MAP[key] ?? 0;
      }
      pricePerParty = basePrice;
      if (basePrice > 0) {
        if (state.meuble) {
          pricePerParty += basePrice * 0.3;
        }
        if (state.jardin) {
          pricePerParty += 20;
        }
      }
      total = isPerParty ? pricePerParty * 2 : pricePerParty;
      break;
    }
    case 'avant-travaux': {
      basePrice = 180 + 50 * (state.facades - 1);
      pricePerParty = basePrice;
      total = pricePerParty;
      break;
    }
    case 'reception': {
      switch (state.typeBien) {
        case 'studio':
          basePrice = 150;
          break;
        case 'appartement':
          basePrice = 180;
          break;
        case 'maison':
          basePrice = 250;
          break;
        case 'villa':
          basePrice = 350;
          break;
        default:
          basePrice = 0;
      }
      const extraRooms = Math.max(0, state.chambres - 1);
      const extraBaths = Math.max(0, state.sdb - 1);
      basePrice += extraRooms * 10 + extraBaths * 20;
      if (state.meuble) {
        basePrice += basePrice * 0.3;
      }
      if (state.jardin) {
        basePrice += 20;
      }
      pricePerParty = basePrice;
      total = pricePerParty;
      break;
    }
    case 'acquisitif': {
      if (state.typeBien === 'studio') {
        basePrice = 145;
      } else if (state.typeBien === 'appartement') {
        if (state.chambres <= 2) basePrice = 160; else if (state.chambres <= 4) basePrice = 180; else basePrice = 200;
      } else {
        if (state.chambres <= 2) basePrice = 200; else if (state.chambres <= 4) basePrice = 220; else basePrice = 260;
      }
      basePrice += state.autres_pieces * 15;
      if (state.mobilier) basePrice += 75;
      pricePerParty = basePrice;
      total = pricePerParty;
      break;
    }
    case 'permis-location': {
      const BASE_PRICE_HTVA = 205;
      const EXTRA_ROOM_HTVA = 41;
      const TVA_RATE = 1.21;

      if (state.typeBien === 'studio') {
        basePrice = BASE_PRICE_HTVA;
      } else {
        basePrice = BASE_PRICE_HTVA + state.chambres_communautaire * EXTRA_ROOM_HTVA;
      }

      basePrice *= TVA_RATE;
      pricePerParty = basePrice;
      total = pricePerParty;
      break;
    }
    default:
      pricePerParty = 0;
      total = 0;
  }

  return { pricePerParty, total, isPerParty };
};
