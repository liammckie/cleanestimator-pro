import { ProductivityRate } from '../types';

export const healthcareGeneralCleaningRates: ProductivityRate[] = [
  {
    id: "HCC-1M",
    category: "General Asset Cleaning",
    task: "Dust with duster",
    tool: "Duster",
    unit: "100 m²",
    ratePerHour: 4.64 // 60 min / 12.92 min per unit
  },
  // ... Add all HCC series rates (1-3)
];

export const healthcareVacuumingRates: ProductivityRate[] = [
  {
    id: "HCV-1M",
    category: "General Asset Vacuuming",
    task: "Vacuum with hand-held duster vacuum",
    tool: "Hand-held duster vacuum",
    unit: "100 m²",
    ratePerHour: 1.11 // 60 min / 53.82 min per unit
  },
  // ... Add all HCV series rates (1-3)
];

export const healthcarePhoneRates: ProductivityRate[] = [
  {
    id: "HCP-1M",
    category: "General Asset Phone",
    task: "Sanitize using trigger sprayer and cloth/cleaner-disinfectant",
    tool: "Cleaning supplies",
    unit: "Each",
    ratePerHour: 150 // 60 min / 0.4 min per unit
  }
];

export const healthcareTrashRates: ProductivityRate[] = [
  {
    id: "HCT-1M",
    category: "General Asset Trash Removal and Pickup",
    task: "Empty trash/ashtrays/pencil sharpener and wipe clean",
    tool: "Cleaning supplies",
    unit: "100 m²",
    ratePerHour: 4.64 // 60 min / 12.92 min per unit
  },
  // ... Add all HCT series rates (1-3)
];