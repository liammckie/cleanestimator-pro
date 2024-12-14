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
      task: "Clean interior windows",
      tool: "Window cleaning kit",
      unit: "m²",
      ratePerHour: 100
    }
  ],
  exterior: [
    {
      id: "WIN-2M",
      category: "Windows - Exterior",
      task: "Clean exterior windows",
      tool: "Height access equipment",
      unit: "m²",
      ratePerHour: 75
    }
  ]
};