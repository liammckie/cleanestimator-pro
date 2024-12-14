import { ProductivityRate } from '../types';

export const correctionalRates: ProductivityRate[] = [
  {
    id: "CIC-1M",
    category: "Correctional Facilities",
    task: "Clean standard jail cell",
    tool: "500 psi / 35 bar spray-and-vacuum machine",
    unit: "22 m²",
    ratePerHour: 1.01 // 60 min / 59.2 min per unit
  },
  // ... Add all CIC series rates (1-13)
];