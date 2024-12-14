import { ProductivityRate } from './types';
import { carpetMaintenanceRates } from './rates/carpetSpottingRates';
import { carpetVacuumRates } from './rates/carpetVacuumRates';
import { carpetSteamRates } from './rates/carpetSteamRates';
import { ceilingWallRates } from './rates/ceilingWallRates';

export const getAllProductivityRates = (): ProductivityRate[] => {
  return [
    ...carpetMaintenanceRates,
    ...carpetVacuumRates,
    ...carpetSteamRates,
    ...ceilingWallRates
  ];
};

export const getProductivityRate = (taskId: string): ProductivityRate | undefined => {
  return getAllProductivityRates().find(rate => rate.id === taskId);
};

export const getProductivityRatesByCategory = (category: string): ProductivityRate[] => {
  return getAllProductivityRates().filter(rate => rate.category === category);
};