import { ProductivityRate } from '../types';

export const kitchenRates: ProductivityRate[] = [
  // Drains
  {
    id: 'KCD-1M',
    category: 'Kitchen Drains',
    task: 'Clean',
    tool: 'Descaler, brush, and cloth',
    unit: 'Each',
    ratePerHour: 15 // 60 min / 4 min per unit = 15 units per hour
  },
  {
    id: 'KCD-2M',
    category: 'Kitchen Drains',
    task: 'Clean and dry',
    tool: 'Chemical and cloth',
    unit: 'Each',
    ratePerHour: 80 // 60 min / 0.75 min per unit = 80 units per hour
  },
  {
    id: 'KCD-3M',
    category: 'Kitchen Drains',
    task: 'Clean and flush',
    tool: 'Chemical, brush, bucket, and cloth',
    unit: 'Each',
    ratePerHour: 20 // 60 min / 3 min per unit = 20 units per hour
  },
  {
    id: 'KCD-4M',
    category: 'Kitchen Drains',
    task: 'Disinfect',
    tool: 'Disinfectant and cloth',
    unit: 'Each',
    ratePerHour: 80 // 60 min / 0.75 min per unit = 80 units per hour
  },
  {
    id: 'KCD-5M',
    category: 'Kitchen Drains',
    task: 'Remove debris',
    tool: '36" / 914 mm ergonomic grabber device',
    unit: 'Each',
    ratePerHour: 68 // 60 min / 0.88 min per unit ≈ 68 units per hour
  },
  // Mats
  {
    id: 'KMC-1M',
    category: 'Kitchen Mats',
    task: 'Wash fatigue mats in place',
    tool: 'Brush, mop, and chemical',
    unit: 'm²',
    ratePerHour: 33.4 // 60 min / 17.95 min per 10m² * 10 ≈ 33.4 m² per hour
  },
  {
    id: 'KMC-2M',
    category: 'Kitchen Mats',
    task: 'Hand wash fatigue mats',
    tool: 'Brush, pressure washer, hose, chemical',
    unit: 'm²',
    ratePerHour: 22.3 // 60 min / 26.92 min per 10m² * 10 ≈ 22.3 m² per hour
  },
  // Tables and Chairs
  {
    id: 'KFS-1M',
    category: 'Kitchen Furniture',
    task: 'Clean dining tables',
    tool: 'Washing pad and squeegee',
    unit: 'm²',
    ratePerHour: 92.9 // 60 min / 6.46 min per 10m² * 10 ≈ 92.9 m² per hour
  },
  {
    id: 'KFS-2M',
    category: 'Kitchen Furniture',
    task: 'Damp wipe hard-surface chairs',
    tool: 'Chemical and cloth',
    unit: 'm²',
    ratePerHour: 2222.2 // 60 min / 0.27 min per 10m² * 10 ≈ 2222.2 m² per hour
  },
  // Microwave
  {
    id: 'KMR-1M',
    category: 'Kitchen Appliances',
    task: 'Clean microwave—light soil',
    tool: 'Chemical and cloth',
    unit: 'Each',
    ratePerHour: 30 // 60 min / 2 min per unit = 30 units per hour
  },
  // Dispensers
  {
    id: 'KMR-2M',
    category: 'Kitchen Dispensers',
    task: 'Restock napkin dispenser',
    tool: 'Napkins',
    unit: 'Each',
    ratePerHour: 80 // 60 min / 0.75 min per unit = 80 units per hour
  },
  {
    id: 'KMR-3M',
    category: 'Kitchen Dispensers',
    task: 'Restock roll paper towel',
    tool: 'Roll towels',
    unit: 'Each',
    ratePerHour: 150 // 60 min / 0.4 min per unit = 150 units per hour
  },
  // Coffee Area
  {
    id: 'KMR-4M',
    category: 'Kitchen Coffee Area',
    task: 'Spot clean coffee area',
    tool: 'Chemical and cloth',
    unit: 'Each',
    ratePerHour: 20 // 60 min / 3 min per unit = 20 units per hour
  },
  {
    id: 'KMR-5M',
    category: 'Kitchen Coffee Area',
    task: 'Wash coffee pot',
    tool: 'Soap and water',
    unit: 'Each',
    ratePerHour: 240 // 60 min / 0.25 min per unit = 240 units per hour
  },
  // Cabinets and Appliances
  {
    id: 'KMR-6M',
    category: 'Kitchen Cabinets',
    task: 'Wipe cabinets inside and out',
    tool: 'Chemical and cloth',
    unit: 'Each',
    ratePerHour: 38.5 // 60 min / 1.56 min per unit ≈ 38.5 units per hour
  },
  {
    id: 'KMR-7M',
    category: 'Kitchen Appliances',
    task: 'Wipe exterior front of microwave',
    tool: 'Chemical and cloth',
    unit: 'Each',
    ratePerHour: 120 // 60 min / 0.5 min per unit = 120 units per hour
  },
  {
    id: 'KMR-8M',
    category: 'Kitchen Appliances',
    task: 'Wipe exterior front of refrigerator',
    tool: 'Chemical and cloth',
    unit: 'Each',
    ratePerHour: 80 // 60 min / 0.75 min per unit = 80 units per hour
  },
  // Grout Floor
  {
    id: 'KFC-1M',
    category: 'Kitchen Floor',
    task: 'Clean floor with grout (line and prep)',
    tool: 'Dispense-and-vacuum machine and chemical',
    unit: 'm²',
    ratePerHour: 319.1 // 60 min / 1.88 min per 10m² * 10 ≈ 319.1 m² per hour
  },
  {
    id: 'KFC-2M',
    category: 'Kitchen Floor',
    task: 'Clean floor with grout (open area)',
    tool: 'Dispense-and-vacuum machine and chemical',
    unit: 'm²',
    ratePerHour: 483.9 // 60 min / 1.24 min per 10m² * 10 ≈ 483.9 m² per hour
  },
  {
    id: 'KFC-3M',
    category: 'Kitchen Floor',
    task: 'Clean floor with grout (open area with spreader)',
    tool: 'Dispense-and-vacuum machine and chemical with spreader tool',
    unit: 'm²',
    ratePerHour: 483.9 // 60 min / 1.24 min per 10m² * 10 ≈ 483.9 m² per hour
  }
];