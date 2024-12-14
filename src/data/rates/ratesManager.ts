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
    // Initialize rates by category
    this.ratesCache.set('carpet-maintenance', carpetMaintenanceRates.spotting.concat(
      carpetMaintenanceRates.vacuum,
      carpetMaintenanceRates.steam
    ));
    this.ratesCache.set('restroom', [...restroomRates.cleaning, ...restroomRates.maintenance]);
    this.ratesCache.set('specialist', [...specialistRates.medical, ...specialistRates.industrial]);
    this.ratesCache.set('healthcare', [...healthcareRates.patientRooms, ...healthcareRates.clinicalAreas]);
    this.ratesCache.set('kitchen', [...kitchenRates.commercial, ...kitchenRates.industrial]);
    this.ratesCache.set('windows', [...windowRates.interior, ...windowRates.exterior]);
    this.ratesCache.set('bundles', bundledRates);
  }

  public getRatesByCategory(category: string): ProductivityRate[] {
    return this.ratesCache.get(category) || [];
  }

  public getRateById(id: string): ProductivityRate | undefined {
    for (const rates of this.ratesCache.values()) {
      const rate = rates.find(r => r.id === id);
      if (rate) return rate;
    }
    return undefined;
  }

  public getAllRates(): ProductivityRate[] {
    const allRates: ProductivityRate[] = [];
    this.ratesCache.forEach(rates => allRates.push(...rates));
    return allRates;
  }

  public searchRates(query: string): ProductivityRate[] {
    const searchTerm = query.toLowerCase();
    return this.getAllRates().filter(rate => 
      rate.task.toLowerCase().includes(searchTerm) ||
      rate.tool.toLowerCase().includes(searchTerm) ||
      rate.category.toLowerCase().includes(searchTerm)
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