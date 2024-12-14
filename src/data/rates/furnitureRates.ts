import { ProductivityRate } from '../types';

export const furnitureRates: ProductivityRate[] = [
  // Upholstered Furniture
  {
    id: "UFC-1M",
    category: "Upholstered Furniture",
    task: "Shampoo",
    tool: "Portable machine",
    unit: "m²",
    ratePerHour: 11.19 // 60 min / 10.72 min per 2m² * 2
  },
  {
    id: "UFC-2M",
    category: "Upholstered Furniture",
    task: "Vacuum",
    tool: "Hand-held vacuum",
    unit: "m²",
    ratePerHour: 66.3 // 60 min / 1.81 min per 2m² * 2
  },
  {
    id: "UFC-3M",
    category: "Upholstered Furniture",
    task: "Vacuum",
    tool: "Backpack vacuum",
    unit: "m²",
    ratePerHour: 66.3
  },
  {
    id: "UFC-4M",
    category: "Upholstered Furniture",
    task: "Vacuum",
    tool: "Tank/canister vacuum",
    unit: "m²",
    ratePerHour: 54.55 // 60 min / 2.2 min per 2m² * 2
  },
  // Hard Surface Furniture
  {
    id: "UFH-1M",
    category: "Hard Surface Furniture",
    task: "Clean",
    tool: "Spray bottle, chemical, and cloth",
    unit: "m²",
    ratePerHour: 75 // 60 min / 1.6 min per 2m² * 2
  },
  {
    id: "UFH-2M",
    category: "Hard Surface Furniture",
    task: "Disinfect",
    tool: "Spray bottle, chemical, and cloth",
    unit: "m²",
    ratePerHour: 75
  },
  {
    id: "UFH-3M",
    category: "Hard Surface Furniture",
    task: "Dust",
    tool: "Telescopic duster and sleeve",
    unit: "m²",
    ratePerHour: 250 // 60 min / 0.48 min per 2m² * 2
  },
  {
    id: "UFH-4M",
    category: "Hard Surface Furniture",
    task: "Polish",
    tool: "Spray bottle, chemical, and cloth",
    unit: "m²",
    ratePerHour: 62.18 // 60 min / 1.93 min per 2m² * 2
  }
];