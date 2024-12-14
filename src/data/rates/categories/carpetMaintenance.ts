import { ProductivityRate } from '../../types';

export interface CarpetMaintenanceRates {
  spotting: ProductivityRate[];
  vacuum: ProductivityRate[];
  steam: ProductivityRate[];
}

export const carpetMaintenanceRates: CarpetMaintenanceRates = {
  spotting: [
    {
      id: "CMS-1M",
      category: "Carpet Maintenance - Spraying and Spotting",
      task: "Spot clean carpet",
      tool: "Spray bottle and brush",
      unit: "m²",
      ratePerHour: 50
    },
    {
      id: "CMS-2M",
      category: "Carpet Maintenance - Spraying and Spotting",
      task: "Deep spot treatment",
      tool: "Professional spot cleaning kit",
      unit: "m²",
      ratePerHour: 35
    }
  ],
  vacuum: [
    {
      id: "CMV-1M",
      category: "Carpet Vacuuming",
      task: "Vacuum carpet - light soil",
      tool: "Commercial vacuum cleaner",
      unit: "m²",
      ratePerHour: 280
    },
    {
      id: "CMV-2M",
      category: "Carpet Vacuuming",
      task: "Vacuum carpet - heavy soil",
      tool: "Heavy duty vacuum cleaner",
      unit: "m²",
      ratePerHour: 180
    }
  ],
  steam: [
    {
      id: "CMST-1M",
      category: "Carpet Steam Cleaning",
      task: "Steam clean carpet - standard",
      tool: "Commercial steam cleaner",
      unit: "m²",
      ratePerHour: 120
    },
    {
      id: "CMST-2M",
      category: "Carpet Steam Cleaning",
      task: "Steam clean carpet - heavy soil",
      tool: "Industrial steam cleaner",
      unit: "m²",
      ratePerHour: 80
    }
  ]
};