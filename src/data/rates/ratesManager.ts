import { ProductivityRate } from '../types/productivity';
import { carpetMaintenanceRates } from './categories/carpetMaintenance';
import { restroomRates } from './categories/restroom';
import { specialistRates } from './categories/specialist';
import { healthcareRates } from './categories/healthcare';
import { kitchenRates } from './categories/kitchen';
import { windowRates } from './categories/windows';
import { bundledRates } from './bundledRates';

class RatesManager {
  private static instance: RatesManager;
  private ratesCache: Map<string, ProductivityRate[]> = new Map();

  private constructor() {
    this.initializeRates();
  }

  public static getInstance(): RatesManager {
    if (!RatesManager.instance) {
      RatesManager.instance = new RatesManager();
    }
    return RatesManager.instance;
  }

  private initializeRates() {
    try {
      const initializeCategory = (category: string, rates: ProductivityRate[]) => {
        if (Array.isArray(rates)) {
          this.ratesCache.set(category, rates.map(rate => ({
            ...rate,
            subcategory: rate.subcategory || rate.category // Ensure subcategory exists
          })));
        } else {
          console.warn(`Invalid rates format for category: ${category}`);
          this.ratesCache.set(category, []);
        }
      };

      // Initialize each category with proper type checking
      initializeCategory('carpet-maintenance', [
        ...(Array.isArray(carpetMaintenanceRates.spotting) ? carpetMaintenanceRates.spotting : []),
        ...(Array.isArray(carpetMaintenanceRates.vacuum) ? carpetMaintenanceRates.vacuum : []),
        ...(Array.isArray(carpetMaintenanceRates.steam) ? carpetMaintenanceRates.steam : [])
      ]);

      initializeCategory('restroom', [
        ...(Array.isArray(restroomRates.cleaning) ? restroomRates.cleaning : []),
        ...(Array.isArray(restroomRates.maintenance) ? restroomRates.maintenance : [])
      ]);

      initializeCategory('specialist', [
        ...(Array.isArray(specialistRates.medical) ? specialistRates.medical : []),
        ...(Array.isArray(specialistRates.industrial) ? specialistRates.industrial : [])
      ]);

      initializeCategory('healthcare', [
        ...(Array.isArray(healthcareRates.patientRooms) ? healthcareRates.patientRooms : []),
        ...(Array.isArray(healthcareRates.clinicalAreas) ? healthcareRates.clinicalAreas : [])
      ]);

      initializeCategory('kitchen', [
        ...(Array.isArray(kitchenRates.commercial) ? kitchenRates.commercial : []),
        ...(Array.isArray(kitchenRates.industrial) ? kitchenRates.industrial : [])
      ]);

      initializeCategory('windows', [
        ...(Array.isArray(windowRates.interior) ? windowRates.interior : []),
        ...(Array.isArray(windowRates.exterior) ? windowRates.exterior : [])
      ]);

      initializeCategory('bundles', Array.isArray(bundledRates) ? bundledRates : []);
    } catch (error) {
      console.error('Error initializing rates:', error);
      this.ratesCache = new Map();
    }
  }

  public getRatesByCategory(category: string): ProductivityRate[] {
    return this.ratesCache.get(category) || [];
  }

  public getRateById(id: string): ProductivityRate | undefined {
    for (const rates of this.ratesCache.values()) {
      const rate = rates.find(r => r && r.id === id);
      if (rate) return rate;
    }
    return undefined;
  }

  public getAllRates(): ProductivityRate[] {
    const allRates: ProductivityRate[] = [];
    this.ratesCache.forEach(rates => {
      if (Array.isArray(rates)) {
        allRates.push(...rates);
      }
    });
    return allRates;
  }

  public searchRates(query: string): ProductivityRate[] {
    const searchTerm = query.toLowerCase();
    return this.getAllRates().filter(rate => 
      rate &&
      (rate.task.toLowerCase().includes(searchTerm) ||
      rate.tool.toLowerCase().includes(searchTerm) ||
      rate.category.toLowerCase().includes(searchTerm))
    );
  }

  public getBundledRates(): ProductivityRate[] {
    return this.ratesCache.get('bundles') || [];
  }
}

export const ratesManager = RatesManager.getInstance();

export const getRatesByCategory = (category: string) => ratesManager.getRatesByCategory(category);
export const getRateById = (id: string) => ratesManager.getRateById(id);
export const getAllRates = () => ratesManager.getAllRates();
export const searchRates = (query: string) => ratesManager.searchRates(query);
export const getBundledRates = () => ratesManager.getBundledRates();