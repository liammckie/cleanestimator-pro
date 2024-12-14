import { ProductivityRate } from '../types';

export const carpetSteamRates: ProductivityRate[] = [
  {
    id: "BPC-1M",
    category: "Carpet Maintenance - Bonnet Pad Cleaning",
    task: "Bonnet Pad Cleaning",
    tool: "12\" / 305 mm",
    unit: "m²",
    ratePerHour: 57
  },
  {
    id: "BPC-2M",
    category: "Carpet Maintenance - Bonnet Pad Cleaning",
    task: "Bonnet Pad Cleaning",
    tool: "17\" / 432 mm",
    unit: "m²",
    ratePerHour: 81
  },
  {
    id: "BPC-3M",
    category: "Carpet Maintenance - Bonnet Pad Cleaning",
    task: "Bonnet Pad Cleaning",
    tool: "20\" / 508 mm",
    unit: "m²",
    ratePerHour: 95
  },
  {
    id: "BPC-4M",
    category: "Carpet Maintenance - Bonnet Pad Cleaning",
    task: "Bonnet Pad Cleaning",
    tool: "21\" / 533 mm",
    unit: "m²",
    ratePerHour: 100
  },
  // Cylindrical Brush Cleaning rates
  {
    id: "EBC-1M",
    category: "Carpet Maintenance - Cylindrical Brush Cleaning",
    task: "Cylindrical Brush Cleaning",
    tool: "10.5\" / 267 mm dual",
    unit: "m²",
    ratePerHour: 141
  },
  // ... continue with all other steam and bonnet rates
];