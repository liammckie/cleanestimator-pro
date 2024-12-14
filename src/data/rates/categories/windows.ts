import { ProductivityRate } from '../../types';

export interface WindowRates {
  interior: ProductivityRate[];
  exterior: ProductivityRate[];
}

export const windowRates: WindowRates = {
  interior: [
    {
      id: "WIN-1M",
      category: "Windows - Interior",
      task: "Clean interior windows - standard height",
      tool: "Window cleaning kit",
      unit: "m²",
      ratePerHour: 95
    },
    {
      id: "WIN-2M",
      category: "Windows - Interior",
      task: "Clean interior windows - high access",
      tool: "Extension pole kit",
      unit: "m²",
      ratePerHour: 65
    }
  ],
  exterior: [
    {
      id: "WIN-3M",
      category: "Windows - Exterior",
      task: "Clean exterior windows - ground level",
      tool: "Professional window cleaning kit",
      unit: "m²",
      ratePerHour: 75
    },
    {
      id: "WIN-4M",
      category: "Windows - Exterior",
      task: "Clean exterior windows - height access",
      tool: "Height access equipment",
      unit: "m²",
      ratePerHour: 45
    }
  ]
};