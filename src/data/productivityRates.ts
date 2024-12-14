import { ProductivityRate } from './types';
import { carpetMaintenanceRates } from './rates/carpetSpottingRates';
import { carpetVacuumRates } from './rates/carpetVacuumRates';
import { carpetSteamRates } from './rates/carpetSteamRates';
import { ceilingWallRates } from './rates/ceilingWallRates';
import { kitchenRates } from './rates/kitchenRates';
import { restorativeRates } from './rates/restorativeRates';
import { restroomRates } from './rates/restroomRates';
import { furnitureRates } from './rates/furnitureRates';
import { specialistRates } from './rates/specialistRates';
import { stairwellRates, railingRates, escalatorRailRates } from './rates/stairwellRates';
import { toolCleaningRates } from './rates/toolCleaningRates';
import { dormRates } from './rates/dormRates';

export const getAllProductivityRates = (): ProductivityRate[] => {
  return [
    ...carpetMaintenanceRates,
    ...carpetVacuumRates,
    ...carpetSteamRates,
    ...ceilingWallRates,
    ...kitchenRates,
    ...restorativeRates,
    ...restroomRates,
    ...furnitureRates,
    ...specialistRates,
    ...stairwellRates,
    ...railingRates,
    ...escalatorRailRates,
    ...toolCleaningRates,
    ...dormRates
  ];
};

export const getProductivityRate = (taskId: string): ProductivityRate | undefined => {
  return getAllProductivityRates().find(rate => rate.id === taskId);
};

export const getProductivityRatesByCategory = (category: string): ProductivityRate[] => {
  return getAllProductivityRates().filter(rate => rate.category === category);
};