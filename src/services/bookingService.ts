import { PRICE_MAP, PRICE_MODIFIERS } from '@/constants';

interface PriceCalculationParams {
  typeBien: 'appartement' | 'maison' | 'villa' | 'studio' | 'kot' | 'entrepot';
  chambres: number;
  sdb: number;
  surface?: number;
  options: {
    meuble: boolean;
    jardin: boolean;
    parking: boolean;
    cave: boolean;
    print: boolean;
    piscine: boolean;
    bxl: boolean;
    admin: boolean;
    reouverture: boolean;
  };
}

export const calculatePrice = (params: PriceCalculationParams) => {
  let key: string;
  let basePrice = 0;
  const missionType = 'locatif';

  if (params.typeBien === 'entrepot') {
    const surfaceKey = Math.min(2000, Math.ceil((params.surface ?? 300) / 100) * 100);
    key = `${missionType}_${params.typeBien}_${surfaceKey}_0`;
    basePrice = PRICE_MAP[key] ?? 0;
    if (basePrice === 0 && params.surface && params.surface > 2000) {
      basePrice = 710 + ((params.surface - 2000) / 100) * 30;
    } else if (basePrice === 0) {
      basePrice = 200;
    }
  } else if (params.typeBien === 'studio' || params.typeBien === 'kot') {
    key = `${missionType}_appartement_0_${params.sdb}`;
    basePrice = PRICE_MAP[key] ?? 0;
  } else {
    const bienType = params.typeBien === 'villa' ? 'maison' : params.typeBien;
    key = `${missionType}_${bienType}_${params.chambres}_${params.sdb}`;
    basePrice = PRICE_MAP[key] ?? 0;
  }

  let pricePerParty = basePrice;

  if (basePrice > 0) {
    if (params.options.meuble) {
      pricePerParty += basePrice * PRICE_MODIFIERS.meuble.value;
    }
    if (params.options.jardin) {
      pricePerParty += PRICE_MODIFIERS.jardin.value;
    }
    if (params.options.parking) {
      pricePerParty += PRICE_MODIFIERS.parking.value;
    }
    if (params.options.cave) {
      pricePerParty += PRICE_MODIFIERS.cave.value;
    }
    if (params.options.print) {
      pricePerParty += basePrice * PRICE_MODIFIERS.print.value;
    }
    if (params.options.piscine) {
      pricePerParty += PRICE_MODIFIERS.piscine.value;
    }
    if (params.options.bxl) {
      pricePerParty += PRICE_MODIFIERS.bxl.value;
    }
    if (params.options.admin) {
      pricePerParty += PRICE_MODIFIERS.admin.value;
    }
    if (params.options.reouverture) {
      pricePerParty += PRICE_MODIFIERS.reouverture.value;
    }
  }

  return {
    basePrice: basePrice,
    pricePerParty: pricePerParty,
    total: pricePerParty * 2,
  };
};