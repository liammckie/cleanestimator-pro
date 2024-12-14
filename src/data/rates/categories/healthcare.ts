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
      task: "Patient room terminal clean",
      tool: "Healthcare cleaning kit",
      unit: "room",
      ratePerHour: 3
    }
  ],
  clinicalAreas: [
    {
      id: "HLT-2M",
      category: "Healthcare - Clinical Areas",
      task: "Treatment room cleaning",
      tool: "Medical grade cleaning equipment",
      unit: "room",
      ratePerHour: 4
    }
  ]
};