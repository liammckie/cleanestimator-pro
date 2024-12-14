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
      task: "Deep clean commercial kitchen",
      tool: "Commercial kitchen cleaning kit",
      unit: "kitchen",
      ratePerHour: 1
    }
  ],
  industrial: [
    {
      id: "KIT-2M",
      category: "Kitchen - Industrial",
      task: "Industrial kitchen equipment cleaning",
      tool: "Industrial cleaning equipment",
      unit: "equipment",
      ratePerHour: 2
    }
  ]
};