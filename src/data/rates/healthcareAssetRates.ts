import { ProductivityRate } from '../types';

export const healthcareAssetRates: ProductivityRate[] = [
  {
    id: "HCA-1M",
    category: "Health Care Assets",
    task: "Autoclave, exterior",
    tool: "Cleaning supplies",
    unit: "Each",
    ratePerHour: 26.67 // 60 min / 2.25 min per unit
  },
  // ... Add all HCA series rates (1-55)
];