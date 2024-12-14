import { ProductivityRate } from '../types';

export const bundledRates: ProductivityRate[] = [
  {
    id: "BDL-1M",
    category: "Office Cleaning Bundle",
    task: "Standard Office Clean",
    tool: "Complete Cleaning Kit",
    unit: "m²",
    ratePerHour: 180,
  },
  {
    id: "BDL-2M",
    category: "Healthcare Bundle",
    task: "Hospital Room Complete Clean",
    tool: "Medical Grade Cleaning Kit",
    unit: "room",
    ratePerHour: 2.5,
  },
  {
    id: "BDL-3M",
    category: "Educational Bundle",
    task: "Classroom Full Service",
    tool: "Educational Facility Kit",
    unit: "room",
    ratePerHour: 3,
  },
  {
    id: "BDL-4M",
    category: "Retail Bundle",
    task: "Retail Space Maintenance",
    tool: "Retail Cleaning Kit",
    unit: "m²",
    ratePerHour: 150,
  }
];