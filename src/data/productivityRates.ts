export interface ProductivityRate {
  id: string;
  category: string;
  task: string;
  tool: string;
  unit: string;
  minutes: number;
  seconds: number;
}

export const carpetMaintenanceRates: ProductivityRate[] = [
  {
    id: "SSP-1M",
    category: "Carpet Maintenance - Spraying and Spotting",
    task: "Spot removal—difficult",
    tool: "Spotting chemical, blotting cloth, bone tool, and self-contained small extractor",
    unit: "Spot",
    minutes: 7.75,
    seconds: 465
  },
  {
    id: "SSP-2M",
    category: "Carpet Maintenance - Spraying and Spotting",
    task: "Spot removal—simple",
    tool: "Spotting chemical, blotting cloth, and bone tool",
    unit: "Spot",
    minutes: 5,
    seconds: 300
  },
  // ... remaining carpet maintenance rates
];

export const getProductivityRate = (taskId: string): ProductivityRate | undefined => {
  return carpetMaintenanceRates.find(rate => rate.id === taskId);
};