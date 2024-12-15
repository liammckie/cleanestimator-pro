import { ProductivityRate, TaskGroup } from '../types/productivity';
import { cleaningTasks } from '../tasks/cleaningTasks';

class RatesManager {
  private static instance: RatesManager;
  private ratesCache: Map<string, ProductivityRate[]> = new Map();
  private taskGroupsCache: TaskGroup[] = [];

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
      // Initialize task groups cache first
      this.taskGroupsCache = Array.isArray(cleaningTasks) ? cleaningTasks : [];

      // Flatten all tasks from groups, categories, and subcategories
      const allTasks: ProductivityRate[] = [];
      
      this.taskGroupsCache.forEach(group => {
        if (!group?.categories) return;
        
        group.categories.forEach(category => {
          if (!category?.subcategories) return;
          
          category.subcategories.forEach(subcategory => {
            if (!subcategory?.tasks) return;
            
            subcategory.tasks.forEach(task => {
              if (task) allTasks.push(task);
            });
          });
        });
      });

      // Initialize the rates cache with the flattened tasks
      this.ratesCache.set('all', allTasks);

      // Create category-specific caches
      this.taskGroupsCache.forEach(group => {
        if (!group?.categories) return;
        
        group.categories.forEach(category => {
          if (!category?.name) return;
          
          const categoryTasks = allTasks.filter(task => task.category === category.name);
          if (categoryTasks.length > 0) {
            this.ratesCache.set(category.name, categoryTasks);
          }
        });
      });
    } catch (error) {
      console.error('Error initializing rates:', error);
      this.ratesCache = new Map();
      this.taskGroupsCache = [];
    }
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
    return this.ratesCache.get('all') || [];
  }

  public getTaskGroups(): TaskGroup[] {
    return this.taskGroupsCache;
  }

  public searchRates(query: string): ProductivityRate[] {
    const searchTerm = query.toLowerCase();
    return this.getAllRates().filter(rate => 
      rate.task.toLowerCase().includes(searchTerm) ||
      rate.tool.toLowerCase().includes(searchTerm) ||
      rate.category.toLowerCase().includes(searchTerm) ||
      rate.subcategory.toLowerCase().includes(searchTerm)
    );
  }
}

export const ratesManager = RatesManager.getInstance();

export const getRatesByCategory = (category: string) => ratesManager.getRatesByCategory(category);
export const getRateById = (id: string) => ratesManager.getRateById(id);
export const getAllRates = () => ratesManager.getAllRates();
export const getTaskGroups = () => ratesManager.getTaskGroups();
export const searchRates = (query: string) => ratesManager.searchRates(query);