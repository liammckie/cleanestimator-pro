import { ProductivityRate } from '../../types';

export interface HealthcareRates {
  patientRooms: ProductivityRate[];
  clinicalAreas: ProductivityRate[];
}

export const healthcareRates: HealthcareRates = {
  patientRooms: [
    {
      id: "HLT-1M",
      category: "Healthcare - Patient Rooms",
      task: "Standard patient room cleaning",
      tool: "Healthcare cleaning kit",
      unit: "room",
      ratePerHour: 4
    },
    {
      id: "HLT-2M",
      category: "Healthcare - Patient Rooms",
      task: "Terminal clean - patient room",
      tool: "Terminal cleaning kit",
      unit: "room",
      ratePerHour: 2
    }
  ],
  clinicalAreas: [
    {
      id: "HLT-3M",
      category: "Healthcare - Clinical Areas",
      task: "Clean treatment room",
      tool: "Medical grade cleaning equipment",
      unit: "room",
      ratePerHour: 3
    },
    {
      id: "HLT-4M",
      category: "Healthcare - Clinical Areas",
      task: "Clean operating theater",
      tool: "Specialized medical cleaning kit",
      unit: "room",
      ratePerHour: 1.5
    }
  ]
};