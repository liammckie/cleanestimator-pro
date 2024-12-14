import { ProductivityRate } from '../types';

export const windowsGlassRates: ProductivityRate[] = [
  {
    id: "WCL-1M",
    category: "Windows & Glass",
    task: "Wash",
    tool: "Trigger sprayer, chemical, and rag",
    unit: "10 m²",
    ratePerHour: 4.55 // 60 min / 13.18 min per unit
  },
  // ... Add all WCL series rates (1-33)
];

export const windowBlindsRates: ProductivityRate[] = [
  {
    id: "WBL-1M",
    category: "Window Blinds",
    task: "Remove and clean",
    tool: "Ultrasonic machine",
    unit: "Each",
    ratePerHour: 9.23 // 60 min / 6.5 min per unit
  },
  // ... Add all WBL series rates (1-9)
];

export const glassCleaningRates: ProductivityRate[] = [
  {
    id: "GLS-1M",
    category: "Glass Cleaning",
    task: "Clean entry door",
    tool: "Microfiber attachment and extension tool and chemical",
    unit: "1.5 m²",
    ratePerHour: 157.89 // 60 min / 0.38 min per unit
  },
  // ... Add all GLS series rates (1-6)
];