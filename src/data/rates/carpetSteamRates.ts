import { ProductivityRate } from '../types';

export const carpetSteamRates: ProductivityRate[] = [
  // Bonnet Pad Cleaning rates
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
  {
    id: "EBC-2M",
    category: "Carpet Maintenance - Cylindrical Brush Cleaning",
    task: "Cylindrical Brush Cleaning",
    tool: "14\" / 356 mm dual",
    unit: "m²",
    ratePerHour: 188
  },
  {
    id: "EBC-3M",
    category: "Carpet Maintenance - Cylindrical Brush Cleaning",
    task: "Cylindrical Brush Cleaning",
    tool: "15\" / 381 mm dual",
    unit: "m²",
    ratePerHour: 202
  },
  {
    id: "EBC-4M",
    category: "Carpet Maintenance - Cylindrical Brush Cleaning",
    task: "Cylindrical Brush Cleaning",
    tool: "16\" / 406 mm dual",
    unit: "m²",
    ratePerHour: 216
  },
  {
    id: "EBC-5M",
    category: "Carpet Maintenance - Cylindrical Brush Cleaning",
    task: "Cylindrical Brush Cleaning",
    tool: "15\" / 381 mm triple",
    unit: "m²",
    ratePerHour: 1086
  },
  {
    id: "EBC-6M",
    category: "Carpet Maintenance - Cylindrical Brush Cleaning",
    task: "Cylindrical Brush Cleaning",
    tool: "20\" / 508 mm triple",
    unit: "m²",
    ratePerHour: 1598
  },
  // Extraction Cleaning rates
  {
    id: "EXT-1M",
    category: "Carpet Maintenance - Extraction Cleaning",
    task: "Extraction Cleaning with Portable Extractor, Hose, and Wand",
    tool: "12\" / 305 mm",
    unit: "m²",
    ratePerHour: 46
  },
  {
    id: "EXT-2M",
    category: "Carpet Maintenance - Extraction Cleaning",
    task: "Extraction Cleaning with Portable Extractor, Hose, and Wand",
    tool: "15\" / 381 mm",
    unit: "m²",
    ratePerHour: 58
  },
  {
    id: "EXT-3M",
    category: "Carpet Maintenance - Extraction Cleaning",
    task: "Extraction Cleaning with Portable Extractor, Hose, and Wand",
    tool: "12\" / 305 mm power",
    unit: "m²",
    ratePerHour: 60
  },
  {
    id: "EXT-4M",
    category: "Carpet Maintenance - Extraction Cleaning",
    task: "Extraction Cleaning with Portable Extractor, Hose, and Wand",
    tool: "14\" / 356 mm power",
    unit: "m²",
    ratePerHour: 71
  },
  {
    id: "EXT-5M",
    category: "Carpet Maintenance - Extraction Cleaning",
    task: "Extraction Cleaning with Portable Extractor, Hose, and Wand",
    tool: "17\" / 432 mm turbo",
    unit: "m²",
    ratePerHour: 118
  },
  // Scrub with Chemical Solution rates
  {
    id: "SBS-1M",
    category: "Carpet Maintenance - Scrub with Chemical Solution",
    task: "Scrub with Chemical Solution (Self-Propelled)",
    tool: "12\" / 305 mm",
    unit: "m²",
    ratePerHour: 40
  },
  {
    id: "SBS-2M",
    category: "Carpet Maintenance - Scrub with Chemical Solution",
    task: "Scrub with Chemical Solution (Self-Propelled)",
    tool: "15\" / 381 mm",
    unit: "m²",
    ratePerHour: 64
  },
  {
    id: "SBS-3M",
    category: "Carpet Maintenance - Scrub with Chemical Solution",
    task: "Scrub with Chemical Solution (Self-Propelled)",
    tool: "17\" / 432 mm",
    unit: "m²",
    ratePerHour: 105
  },
  {
    id: "SBS-4M",
    category: "Carpet Maintenance - Scrub with Chemical Solution",
    task: "Scrub with Chemical Solution (Self-Propelled)",
    tool: "20\" / 508 mm",
    unit: "m²",
    ratePerHour: 121
  },
  {
    id: "SBS-5M",
    category: "Carpet Maintenance - Scrub with Chemical Solution",
    task: "Scrub with Chemical Solution (Machine Propelled)",
    tool: "20\" / 508 mm",
    unit: "m²",
    ratePerHour: 859
  },
  {
    id: "SBS-6M",
    category: "Carpet Maintenance - Scrub with Chemical Solution",
    task: "Scrub with Chemical Solution (Machine Propelled)",
    tool: "24\" / 610 mm",
    unit: "m²",
    ratePerHour: 1087
  },
  {
    id: "SBS-7M",
    category: "Carpet Maintenance - Scrub with Chemical Solution",
    task: "Scrub with Chemical Solution (Machine Propelled)",
    tool: "27\" / 686 mm",
    unit: "m²",
    ratePerHour: 1205
  },
  {
    id: "SBS-8M",
    category: "Carpet Maintenance - Scrub with Chemical Solution",
    task: "Scrub with Chemical Solution (Machine Propelled)",
    tool: "30\" / 762 mm",
    unit: "m²",
    ratePerHour: 1310
  },
  // Clean with Self-Contained Unit rates
  {
    id: "CSC-1M",
    category: "Carpet Maintenance - Clean with Self-Contained Unit",
    task: "Clean with Self-Contained Unit with Chemical Solution (Self-Propelled)",
    tool: "11\" / 279 mm",
    unit: "m²",
    ratePerHour: 40
  },
  {
    id: "CSC-2M",
    category: "Carpet Maintenance - Clean with Self-Contained Unit",
    task: "Clean with Self-Contained Unit with Chemical Solution (Self-Propelled)",
    tool: "16\" / 406 mm",
    unit: "m²",
    ratePerHour: 64
  },
  {
    id: "CSC-3M",
    category: "Carpet Maintenance - Clean with Self-Contained Unit",
    task: "Clean with Self-Contained Unit with Chemical Solution (Self-Propelled)",
    tool: "18\" / 457 mm",
    unit: "m²",
    ratePerHour: 105
  },
  {
    id: "CSC-4M",
    category: "Carpet Maintenance - Clean with Self-Contained Unit",
    task: "Clean with Self-Contained Unit with Chemical Solution (Self-Propelled)",
    tool: "20\" / 508 mm",
    unit: "m²",
    ratePerHour: 121
  },
  {
    id: "CSC-5M",
    category: "Carpet Maintenance - Clean with Self-Contained Unit",
    task: "Clean with Self-Contained Unit with Chemical Solution (Machine Propelled)",
    tool: "16\" / 406 mm",
    unit: "m²",
    ratePerHour: 147
  },
  {
    id: "CSC-6M",
    category: "Carpet Maintenance - Clean with Self-Contained Unit",
    task: "Clean with Self-Contained Unit with Chemical Solution (Machine Propelled)",
    tool: "17\" / 432 mm",
    unit: "m²",
    ratePerHour: 1088
  },
  {
    id: "CSC-7M",
    category: "Carpet Maintenance - Clean with Self-Contained Unit",
    task: "Clean with Self-Contained Unit with Chemical Solution (Machine Propelled)",
    tool: "18\" / 457 mm",
    unit: "m²",
    ratePerHour: 1206
  },
  {
    id: "CSC-8M",
    category: "Carpet Maintenance - Clean with Self-Contained Unit",
    task: "Clean with Self-Contained Unit with Chemical Solution (Machine Propelled)",
    tool: "20\" / 508 mm",
    unit: "m²",
    ratePerHour: 1310
  }
];