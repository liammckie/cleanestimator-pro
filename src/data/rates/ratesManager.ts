import { ProductivityRate } from '../types/productivity';
import { taskCategories } from '../categories/taskCategories';

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
      // Flatten all tasks from categories and subcategories
      const allTasks: ProductivityRate[] = [];
      
      taskCategories.forEach(category => {
        category.subcategories.forEach(subcategory => {
          subcategory.tasks.forEach(task => {
            allTasks.push({
              ...task,
              subcategory: task.subcategory || subcategory.name
            });
          });
        });
      });

      // Initialize the rates cache with the flattened tasks
      this.ratesCache.set('all', allTasks);

      // Also create category-specific caches
      taskCategories.forEach(category => {
        const categoryTasks = allTasks.filter(task => task.category === category.name);
        if (categoryTasks.length > 0) {
          this.ratesCache.set(category.name, categoryTasks);
        }
      });
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
    return this.ratesCache.get('all') || [];
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
}

export const ratesManager = RatesManager.getInstance();

export const getRatesByCategory = (category: string) => ratesManager.getRatesByCategory(category);
export const getRateById = (id: string) => ratesManager.getRateById(id);
export const getAllRates = () => ratesManager.getAllRates();
export const searchRates = (query: string) => ratesManager.searchRates(query);