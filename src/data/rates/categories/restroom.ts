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
    }
  ],
  maintenance: [
    {
      id: "RST-3M",
      category: "Restroom Maintenance",
      task: "Stock supplies",
      tool: "Supply cart",
      unit: "restroom",
      ratePerHour: 8
    }
  ]
};