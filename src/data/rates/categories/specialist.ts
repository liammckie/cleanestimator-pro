import { ProductivityRate } from '../../types';

export interface SpecialistRates {
  medical: ProductivityRate[];
  industrial: ProductivityRate[];
}

export const specialistRates: SpecialistRates = {
  medical: [
    {
      id: "SPC-1M",
      category: "Medical Cleaning",
      task: "Operating room terminal clean",
      tool: "Specialized medical cleaning kit",
      unit: "room",
      ratePerHour: 2
    }
  ],
  industrial: [
    {
      id: "SPC-2M",
      category: "Industrial Cleaning",
      task: "Heavy machinery cleaning",
      tool: "Industrial cleaning equipment",
      unit: "machine",
      ratePerHour: 1.5
    }
  ]
};