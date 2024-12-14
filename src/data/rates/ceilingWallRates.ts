import { ProductivityRate } from '../types';

export const ceilingWallRates: ProductivityRate[] = [
  {
    id: "CEC-1M",
    category: "Ceiling Cleaning",
    task: "Clean",
    tool: "Extension pole, chemical, and onboard chemical dispenser",
    unit: "m²",
    ratePerHour: 63.7 // Converted from 10m² in 9.42 minutes
  },
  {
    id: "CEC-2M",
    category: "Ceiling Cleaning",
    task: "Wash",
    tool: "Microfiber sponge or cloth and ladder",
    unit: "m²",
    ratePerHour: 30.0 // Converted from 10m² in 20 minutes
  },
  {
    id: "CEC-3M",
    category: "Ceiling Cleaning",
    task: "Wash",
    tool: "Pole with triangular cleaning head and onboard chemical dispenser",
    unit: "m²",
    ratePerHour: 188.7 // Converted from 10m² in 3.18 minutes
  },
  {
    id: "CEC-4M",
    category: "Ceiling Cleaning",
    task: "Wash",
    tool: "Extension pole and heavy microfiber cleaning pad",
    unit: "m²",
    ratePerHour: 167.6 // Converted from 10m² in 3.58 minutes
  },
  {
    id: "WCL-1M",
    category: "Walls",
    task: "Wash",
    tool: "Rectangle sponge, bucket and wringer, chemical, and ladder",
    unit: "m²",
    ratePerHour: 18.6 // Converted from 10m² in 32.3 minutes
  },
  {
    id: "WCL-2M",
    category: "Walls",
    task: "Wash",
    tool: "14\" / 356 mm flat mop, dual-compartment bucket, chemical, and wringer cart",
    unit: "m²",
    ratePerHour: 370.4 // Converted from 10m² in 1.62 minutes
  },
  {
    id: "VCW-1M",
    category: "Carpeted Walls",
    task: "Vacuum",
    tool: "Hand-held vacuum",
    unit: "m²",
    ratePerHour: 68.0 // Converted from 10m² in 8.83 minutes
  },
  {
    id: "VCW-2M",
    category: "Carpeted Walls",
    task: "Vacuum",
    tool: "Backpack vacuum",
    unit: "m²",
    ratePerHour: 70.2 // Converted from 10m² in 8.55 minutes
  },
  {
    id: "VCW-3M",
    category: "Carpeted Walls",
    task: "Vacuum",
    tool: "Tank/canister vacuum",
    unit: "m²",
    ratePerHour: 53.1 // Converted from 10m² in 11.3 minutes
  },
  {
    id: "VCL-1M",
    category: "Vent Cleaning",
    task: "Dust",
    tool: "Backpack vacuum and high-dusting tool",
    unit: "m²",
    ratePerHour: 4.3 // Converted from 1m² in 13.82 minutes
  },
  {
    id: "VCL-2M",
    category: "Vent Cleaning",
    task: "Dust",
    tool: "Backpack vacuum and ladder",
    unit: "m²",
    ratePerHour: 3.4 // Converted from 1m² in 17.4 minutes
  },
  {
    id: "VCL-3M",
    category: "Vent Cleaning",
    task: "Dust",
    tool: "Duster, sleeve, and telescopic extension handle",
    unit: "m²",
    ratePerHour: 9.3 // Converted from 1m² in 6.46 minutes
  },
  {
    id: "VCL-4M",
    category: "Vent Cleaning",
    task: "Dust",
    tool: "Tank/canister vacuum and ladder",
    unit: "m²",
    ratePerHour: 2.3 // Converted from 1m² in 25.83 minutes
  },
  {
    id: "VCL-5M",
    category: "Vent Cleaning",
    task: "Damp wipe",
    tool: "Trigger sprayer, cloth, and ladder",
    unit: "m²",
    ratePerHour: 0.8 // Converted from 1m² in 71.04 minutes
  },
  {
    id: "LCL-1M",
    category: "Light Cleaning",
    task: "Damp wipe",
    tool: "Trigger sprayer, cloth, and ladder",
    unit: "m²",
    ratePerHour: 1.9 // Converted from 1m² in 32.2 minutes
  },
  {
    id: "LCL-2M",
    category: "Light Cleaning",
    task: "Dust",
    tool: "Backpack vacuum and high-dusting tool",
    unit: "m²",
    ratePerHour: 3.6 // Converted from 1m² in 16.5 minutes
  },
  {
    id: "LCL-3M",
    category: "Light Cleaning",
    task: "Dust",
    tool: "Duster and telescopic extension handle",
    unit: "m²",
    ratePerHour: 4.5 // Converted from 1m² in 13.45 minutes
  },
  {
    id: "LCL-4M",
    category: "Light Cleaning",
    task: "Dust",
    tool: "Backpack vacuum and ladder",
    unit: "m²",
    ratePerHour: 2.7 // Converted from 1m² in 21.88 minutes
  },
  {
    id: "LCL-5M",
    category: "Light Cleaning",
    task: "Dust with tank canister vacuum",
    tool: "Tank/canister vacuum and ladder",
    unit: "m²",
    ratePerHour: 1.6 // Converted from 1m² in 37.32 minutes
  },
  {
    id: "LCL-6M",
    category: "Light Cleaning",
    task: "Dust, clean out insects, and wipe cover inside and out",
    tool: "Duster, chemical, cloth, and ladder",
    unit: "m²",
    ratePerHour: 2.5 // Converted from 1m² in 24.22 minutes
  }
];