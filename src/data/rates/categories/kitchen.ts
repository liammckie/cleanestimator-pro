import { ProductivityRate } from '../../types';

export interface KitchenRates {
  commercial: ProductivityRate[];
  industrial: ProductivityRate[];
}

export const kitchenRates: KitchenRates = {
  commercial: [
    {
      id: "KIT-1M",
      category: "Kitchen - Commercial",
      task: "Clean commercial kitchen surfaces",
      tool: "Commercial cleaning kit",
      unit: "m²",
      ratePerHour: 85
    },
    {
      id: "KIT-2M",
      category: "Kitchen - Commercial",
      task: "Clean commercial kitchen equipment",
      tool: "Specialized cleaning tools",
      unit: "unit",
      ratePerHour: 12
    }
  ],
  industrial: [
    {
      id: "KIT-3M",
      category: "Kitchen - Industrial",
      task: "Clean industrial kitchen surfaces",
      tool: "Industrial cleaning equipment",
      unit: "m²",
      ratePerHour: 65
    },
    {
      id: "KIT-4M",
      category: "Kitchen - Industrial",
      task: "Clean industrial kitchen equipment",
      tool: "Heavy-duty cleaning kit",
      unit: "unit",
      ratePerHour: 8
    }
  ]
};