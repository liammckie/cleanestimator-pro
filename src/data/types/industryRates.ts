
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

export interface TemplateTask {
  id: string;
  name: string;
  frequency: string;
  isArea: boolean;
  areaType?: string;
  floorType?: 'soft' | 'hard';
  measurement?: number;
  unitType: 'sqm' | 'units';
  timeRequired?: number;
  toiletFixtures?: {
    pans?: number;
    basins?: number;
    ssUrinals?: number;
    ceramicUrinals?: number;
    showers?: number;
  };
}

export interface SavedIndustryTemplate {
  id: string;
  name: string;
  industry: string;
  tasks: TemplateTask[];
  totalTime: number;
  createdAt: string;
}
