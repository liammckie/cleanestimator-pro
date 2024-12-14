import { ProductivityRate } from '../data/types';
import { carpetMaintenanceRates } from '../data/rates/categories';

export const getRatesByCategory = (category: string): ProductivityRate[] => {
  switch (category) {
    case "Carpet Maintenance - Spraying and Spotting":
      return carpetMaintenanceRates.spotting;
    case "Carpet Maintenance - Vacuum":
      return carpetMaintenanceRates.vacuum;
    case "Carpet Maintenance - Steam Cleaning":
      return carpetMaintenanceRates.steam;
    default:
      return [];
  }
};

export const getAllRates = (): ProductivityRate[] => {
  return [
    ...carpetMaintenanceRates.spotting,
    ...carpetMaintenanceRates.vacuum,
    ...carpetMaintenanceRates.steam,
  ];
};