import { ProductivityRate } from '../../types';

export interface RestroomRates {
  cleaning: ProductivityRate[];
  maintenance: ProductivityRate[];
}

export const restroomRates: RestroomRates = {
  cleaning: [
    {
      id: "RST-1M",
      category: "Restroom Cleaning",
      task: "Clean and sanitize toilet",
      tool: "Cleaning chemicals and cloths",
      unit: "toilet",
      ratePerHour: 12
    },
    {
      id: "RST-2M",
      category: "Restroom Cleaning",
      task: "Clean and sanitize urinal",
      tool: "Cleaning chemicals and cloths",
      unit: "urinal",
      ratePerHour: 15
    },
    {
      id: "RST-3M",
      category: "Restroom Cleaning",
      task: "Clean mirrors and surfaces",
      tool: "Glass cleaner and microfiber cloths",
      unit: "m²",
      ratePerHour: 120
    }
  ],
  maintenance: [
    {
      id: "RST-4M",
      category: "Restroom Maintenance",
      task: "Stock supplies",
      tool: "Supply cart",
      unit: "restroom",
      ratePerHour: 8
    },
    {
      id: "RST-5M",
      category: "Restroom Maintenance",
      task: "Deep clean floors",
      tool: "Floor scrubber",
      unit: "m²",
      ratePerHour: 180
    }
  ]
};