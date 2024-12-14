import { ProductivityRate } from '../types';

export const restroomRates: ProductivityRate[] = [
  // Basic Operations
  {
    id: "RPO-1M",
    category: "Restroom Cleaning",
    task: "Disinfect toilet",
    tool: "Toilet brush, spray bottle, disinfectant, and cloth",
    unit: "Toilet",
    ratePerHour: 240 // 60 min / 0.25 min per unit
  },
  {
    id: "RPO-2M",
    category: "Restroom Cleaning",
    task: "Disinfect toilet",
    tool: "Ergonomic-handle toilet brush, spray bottle, disinfectant, and cloth",
    unit: "Toilet",
    ratePerHour: 272.73 // 60 min / 0.22 min per unit
  },
  {
    id: "RPO-3M",
    category: "Restroom Cleaning",
    task: "Disinfect toilet",
    tool: "Standard toilet brush, spray bottle, disinfectant, and cloth",
    unit: "Toilet",
    ratePerHour: 240 // 60 min / 0.25 min per unit
  },
  {
    id: "RPO-4M",
    category: "Restroom Cleaning",
    task: "Disinfect toilet",
    tool: "Heavy-duty toilet brush, spray bottle, disinfectant, and cloth",
    unit: "Toilet",
    ratePerHour: 272.73 // 60 min / 0.22 min per unit
  },
  
  // Regular Cleaning
  {
    id: "RCL-1M",
    category: "Restroom Cleaning",
    task: "Empty feminine hygiene dispenser and replace bag",
    tool: "Grabber device and replacement bag",
    unit: "Each",
    ratePerHour: 222.22 // 60 min / 0.27 min per unit
  },
  {
    id: "RCL-2M",
    category: "Restroom Cleaning",
    task: "Empty trash can and replace liner",
    tool: "Trash can liner",
    unit: "Each",
    ratePerHour: 150 // 60 min / 0.4 min per unit
  },
  {
    id: "RCL-3M",
    category: "Restroom Cleaning",
    task: "Wipe down surfaces",
    tool: "Cleaning cloth and disinfectant",
    unit: "m²",
    ratePerHour: 30 // 60 min / 2 min per unit
  },
  
  // Deep Cleaning
  {
    id: "RDC-1M",
    category: "Restroom Deep Clean",
    task: "Dissolve hard water—sink",
    tool: "Brush, chemical, and cloth",
    unit: "Each",
    ratePerHour: 30.77 // 60 min / 1.95 min per unit
  },
  {
    id: "RDC-2M",
    category: "Restroom Deep Clean",
    task: "Deep clean toilet",
    tool: "Toilet brush, chemical, and cloth",
    unit: "Toilet",
    ratePerHour: 60 // 60 min / 1 min per unit
  },
  {
    id: "RDC-3M",
    category: "Restroom Deep Clean",
    task: "Deep clean urinal",
    tool: "Urinal brush, chemical, and cloth",
    unit: "Urinal",
    ratePerHour: 60 // 60 min / 1 min per unit
  },
  
  // Disinfection
  {
    id: "DIS-1M",
    category: "Restroom Disinfection",
    task: "Damp wipe surface with disinfectant",
    tool: "Cleaning cloth or disposable wipe and disinfectant",
    unit: "m²",
    ratePerHour: 29 // 60 min / 2.07 min per unit
  },
  {
    id: "DIS-2M",
    category: "Restroom Disinfection",
    task: "Disinfect high-touch surfaces",
    tool: "Disinfectant spray and cloth",
    unit: "m²",
    ratePerHour: 25 // 60 min / 2.4 min per unit
  },
  {
    id: "DIS-3M",
    category: "Restroom Disinfection",
    task: "Disinfect door handles",
    tool: "Disinfectant spray and cloth",
    unit: "Each",
    ratePerHour: 20 // 60 min / 3 min per unit
  }
];
