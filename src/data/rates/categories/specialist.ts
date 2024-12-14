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
    },
    {
      id: "SPC-2M",
      category: "Medical Cleaning",
      task: "Laboratory deep clean",
      tool: "Lab cleaning equipment",
      unit: "room",
      ratePerHour: 3
    }
  ],
  industrial: [
    {
      id: "SPC-3M",
      category: "Industrial Cleaning",
      task: "Heavy machinery cleaning",
      tool: "Industrial cleaning equipment",
      unit: "machine",
      ratePerHour: 1.5
    },
    {
      id: "SPC-4M",
      category: "Industrial Cleaning",
      task: "Industrial floor scrubbing",
      tool: "Industrial scrubber",
      unit: "m²",
      ratePerHour: 450
    }
  ]
};