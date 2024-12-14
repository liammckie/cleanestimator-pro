import { ProductivityRate } from '../types';

export const specialistRates: ProductivityRate[] = [
  // Light-Duty Tasks
  {
    id: "LDT-1M",
    category: "Specialist - Light-Duty",
    task: "Spot clean—empty trash and reline can, spot wipe, spot dust, and pick up debris from floor",
    tool: "Trash barrel, liners, duster, duster sleeve, chemical, cloth, and grabber device",
    unit: "m²",
    ratePerHour: 1538.46 // 60 min / 3.9 min per 100m² * 100
  },
  {
    id: "LDT-2M",
    category: "Specialist - Light-Duty",
    task: "Routine clean—empty trash and reline can, wipe, dust, and pick up debris from floor",
    tool: "Trash barrel, liners, duster, duster sleeve, chemical, cloth, and grabber device",
    unit: "m²",
    ratePerHour: 1212.12 // 60 min / 4.95 min per 100m² * 100
  },
  {
    id: "LDT-3M",
    category: "Specialist - Light-Duty",
    task: "Detail clean—empty trash and reline can, detail wipe, detail dust, and pick up debris from floor",
    tool: "Trash barrel, liners, duster, duster sleeve, chemical, cloth, and grabber device",
    unit: "m²",
    ratePerHour: 530.97 // 60 min / 11.3 min per 100m² * 100
  },
  {
    id: "LDT-4M",
    category: "Specialist - Light-Duty",
    task: "Empty desk-side trash can and reline with liner and tie knot",
    tool: "Trash barrel and liners",
    unit: "Each",
    ratePerHour: 120 // 60 min / 0.5 min per unit
  },
  // Specialist Vacuuming
  {
    id: "VAS-1M",
    category: "Specialist - Vacuuming",
    task: "Spot vacuum",
    tool: "Backpack vacuum with 14\" / 356 mm tool, extension cord, trash liner, and microfiber",
    unit: "m²",
    ratePerHour: 1538.46
  },
  {
    id: "VAS-2M",
    category: "Specialist - Vacuuming",
    task: "Routine vacuum",
    tool: "Backpack vacuum with 14\" / 356 mm tool, extension cord, trash liner, and microfiber",
    unit: "m²",
    ratePerHour: 1212.12
  },
  {
    id: "VAS-3M",
    category: "Specialist - Vacuuming",
    task: "Detail vacuum",
    tool: "Backpack vacuum with 14\" / 356 mm tool, extension cord, trash liner, and microfiber",
    unit: "m²",
    ratePerHour: 530.97
  },
  {
    id: "VAS-4M",
    category: "Specialist - Vacuuming",
    task: "Spot vacuum",
    tool: "Battery backpack vacuum with 14\" / 356 mm tool, trash liner, and microfiber",
    unit: "m²",
    ratePerHour: 2197.8 // 60 min / 2.73 min per 100m² * 100
  },
  {
    id: "VAS-5M",
    category: "Specialist - Vacuuming",
    task: "Routine vacuum",
    tool: "Battery backpack vacuum with 14\" / 356 mm tool, trash liner, and microfiber",
    unit: "m²",
    ratePerHour: 1734.1 // 60 min / 3.46 min per 100m² * 100
  },
  {
    id: "VAS-6M",
    category: "Specialist - Vacuuming",
    task: "Detail vacuum",
    tool: "Battery backpack vacuum with 14\" / 356 mm tool, trash liner, and microfiber",
    unit: "m²",
    ratePerHour: 757.58 // 60 min / 7.92 min per 100m² * 100
  },
  // Specialist Restroom
  {
    id: "RRA-1M",
    category: "Specialist - Restroom",
    task: "Spot clean—empty trash, flush, spot wipe, disinfect, spot mop, and check dispensers",
    tool: "Carry tray, chemical, cloths, disinfectant, liners, consumable products, and mop with chemical on board",
    unit: "fixtures",
    ratePerHour: 40 // 60 min / 15 min per 10 fixtures * 10
  },
  {
    id: "RRA-2M",
    category: "Specialist - Restroom",
    task: "Routine cleaning—empty trash, flush, wipe, disinfect, mop, and refill dispensers",
    tool: "Cart, chemical, cloths, disinfectant, liners, consumable products, microfiber mop, and dual-chamber bucket",
    unit: "fixtures",
    ratePerHour: 26.67 // 60 min / 22.5 min per 10 fixtures * 10
  },
  {
    id: "RRA-3M",
    category: "Specialist - Restroom",
    task: "Detail cleaning—empty trash, flush, wipe, disinfect, mop, refill dispensers, dust, and remove mineral buildup",
    tool: "Cart, chemical, cloths, disinfectant, liners, consumable products, duster, microfiber mop, and dual-chamber bucket",
    unit: "fixtures",
    ratePerHour: 20 // 60 min / 30 min per 10 fixtures * 10
  },
  {
    id: "RRA-4M",
    category: "Specialist - Restroom",
    task: "Detail clean toilets, urinals, and sinks",
    tool: "Spray-and-vacuum machine",
    unit: "fixtures",
    ratePerHour: 60 // 60 min / 10 min per 10 fixtures * 10
  },
  {
    id: "RRA-5M",
    category: "Specialist - Restroom",
    task: "Place wet floor signs and prop open door",
    tool: "Wet floor signs and doorstop",
    unit: "Per restroom",
    ratePerHour: 120 // 60 min / 0.5 min per unit
  }
];