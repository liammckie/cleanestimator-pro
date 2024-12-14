import { ProductivityRate } from '../types';

export const healthcareBundledRates: ProductivityRate[] = [
  {
    id: "HCB-1M",
    category: "Health Care Bundled Times",
    task: "Trash/clean and disinfect surfaces and bath/replace supplies/dust mop floor",
    tool: "Multiple cleaning tools",
    unit: "15 m²",
    ratePerHour: 4.46 // 60 min / 13.45 min per unit
  },
  // ... Add all HCB series rates (1-5)
];