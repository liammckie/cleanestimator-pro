
import { IndustryProductivityRate, IndustryTemplate } from './types/industryRates';

// This is a subset of the data provided in the image
export const industryProductivityRates: IndustryProductivityRate[] = [
  {
    id: "98606c8b-56f9-40c3-9652-8aa42ed06776",
    industryType: "Childcare",
    areaName: "Foyer",
    prodRateSoftFloor: 400,
    prodRateHardFloor: 350,
    createdAt: "2025-05-18 08:19:15.895103+00",
    updatedAt: "2025-05-18 08:19:15.895103+00"
  },
  {
    id: "d0ef02eb-1feb-48ab-8295-1e9ac442091c",
    industryType: "Childcare",
    areaName: "Reception",
    prodRateSoftFloor: 400,
    prodRateHardFloor: 350,
    createdAt: "2025-05-18 08:19:15.895103+00",
    updatedAt: "2025-05-18 08:19:15.895103+00"
  },
  {
    id: "3d9d4695-ec47-4982-b330-12a85ac18ce0",
    industryType: "Childcare",
    areaName: "Meeting Room",
    prodRateSoftFloor: 500,
    prodRateHardFloor: 450,
    createdAt: "2025-05-18 08:19:15.895103+00",
    updatedAt: "2025-05-18 08:19:15.895103+00"
  },
  {
    id: "69ce351c-502c-4e39-b0e8-e15e1599014b",
    industryType: "Childcare",
    areaName: "Toilets",
    prodRateSoftFloor: 0,
    prodRateHardFloor: 0,
    pansMin: 3,
    basinMin: 2,
    ssUrinalMin: 5,
    ceramicUrinalMin: 3,
    showerMin: 6,
    createdAt: "2025-05-18 08:19:15.895103+00",
    updatedAt: "2025-05-18 08:19:15.895103+00"
  },
  // Add more data as needed from the provided list
  {
    id: "630f9b45-65bd-4a6f-b8bd-cd0c69a1ca95",
    industryType: "College",
    areaName: "Music Room",
    prodRateSoftFloor: 500,
    prodRateHardFloor: 450,
    createdAt: "2025-05-18 08:19:15.895103+00",
    updatedAt: "2025-05-18 08:19:15.895103+00"
  },
  {
    id: "c8e1427e-33e4-40c7-bebf-fdb7bc208be2",
    industryType: "College",
    areaName: "Toilets",
    prodRateSoftFloor: 0,
    prodRateHardFloor: 0,
    pansMin: 2,
    basinMin: 2,
    ssUrinalMin: 5,
    ceramicUrinalMin: 3,
    showerMin: 6,
    createdAt: "2025-05-18 08:19:15.895103+00",
    updatedAt: "2025-05-18 08:19:15.895103+00"
  },
  {
    id: "5b56864d-097f-46f1-9f99-5cf743dc5d88",
    industryType: "Council",
    areaName: "Change Room",
    prodRateSoftFloor: 250,
    prodRateHardFloor: 250,
    createdAt: "2025-05-18 08:19:15.895103+00",
    updatedAt: "2025-05-18 08:19:15.895103+00"
  }
];

// Helper functions to work with the data
export const getIndustryTypes = (): string[] => {
  return [...new Set(industryProductivityRates.map(rate => rate.industryType))].sort();
};

export const getAreasByIndustry = (industryType: string): IndustryArea[] => {
  return industryProductivityRates
    .filter(rate => rate.industryType === industryType)
    .map(rate => ({
      areaName: rate.areaName,
      prodRateSoftFloor: rate.prodRateSoftFloor,
      prodRateHardFloor: rate.prodRateHardFloor,
      toiletFixtures: rate.pansMin ? {
        pans: rate.pansMin,
        basins: rate.basinMin,
        ssUrinals: rate.ssUrinalMin,
        ceramicUrinals: rate.ceramicUrinalMin,
        showers: rate.showerMin
      } : undefined
    }));
};

export const getIndustryTemplate = (industryType: string): IndustryTemplate => {
  return {
    industryType,
    areas: getAreasByIndustry(industryType)
  };
};
