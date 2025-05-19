
export interface IndustryProductivityRate {
  id: string;
  industryType: string;
  areaName: string;
  prodRateSoftFloor: number;
  prodRateHardFloor: number;
  pansMin?: number;
  basinMin?: number;
  ssUrinalMin?: number;
  ceramicUrinalMin?: number;
  showerMin?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IndustryArea {
  areaName: string;
  prodRateSoftFloor: number;
  prodRateHardFloor: number;
  toiletFixtures?: {
    pans?: number;
    basins?: number;
    ssUrinals?: number;
    ceramicUrinals?: number;
    showers?: number;
  };
}

export interface IndustryTemplate {
  industryType: string;
  areas: IndustryArea[];
}
