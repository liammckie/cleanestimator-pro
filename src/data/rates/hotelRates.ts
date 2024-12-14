import { ProductivityRate } from '../types';

export const hotelRates: ProductivityRate[] = [
  {
    id: "HOT-1M",
    category: "Hotels and Hospitality",
    task: "Don or doff gloves",
    tool: "Gloves",
    unit: "Pair",
    ratePerHour: 120 // 60 min / 0.5 min per unit
  },
  // ... Add all HOT series rates (1-18)
];