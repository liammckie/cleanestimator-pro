import { CategoryGroup, CleaningTask, TaskCategory, TaskSubcategory } from '../types/categories';

class CategoriesManager {
  private static instance: CategoriesManager;
  private categoriesCache: Map<string, CategoryGroup> = new Map();

  private constructor() {
    this.initializeCategories();
  }

  public static getInstance(): CategoriesManager {
    if (!CategoriesManager.instance) {
      CategoriesManager.instance = new CategoriesManager();
    }
    return CategoriesManager.instance;
  }

  private initializeCategories() {
    // Initialize categories from your data sources
    // This will be populated when the application loads
  }

  public getGroupById(groupId: string): CategoryGroup | undefined {
    return this.categoriesCache.get(groupId);
  }

  public getAllGroups(): CategoryGroup[] {
    return Array.from(this.categoriesCache.values());
  }

  public searchTasks(query: string): CleaningTask[] {
    const allTasks: CleaningTask[] = [];
    this.categoriesCache.forEach(group => {
      group.categories.forEach(category => {
        category.subcategories.forEach(subcategory => {
          allTasks.push(...subcategory.tasks);
        });
      });
    });

    const searchTerm = query.toLowerCase();
    return allTasks.filter(task => 
      task.task.toLowerCase().includes(searchTerm) ||
      task.category.toLowerCase().includes(searchTerm) ||
      task.subcategory.toLowerCase().includes(searchTerm)
    );
  }

  public addTask(
    groupId: string,
    categoryId: string,
    subcategoryId: string,
    task: CleaningTask
  ): boolean {
    const group = this.categoriesCache.get(groupId);
    if (!group) return false;

    const category = group.categories.find(c => c.id === categoryId);
    if (!category) return false;

    const subcategory = category.subcategories.find(s => s.id === subcategoryId);
    if (!subcategory) return false;

    subcategory.tasks.push(task);
    return true;
  }

  public removeTask(
    groupId: string,
    categoryId: string,
    subcategoryId: string,
    taskId: string
  ): boolean {
    const group = this.categoriesCache.get(groupId);
    if (!group) return false;

    const category = group.categories.find(c => c.id === categoryId);
    if (!category) return false;

    const subcategory = category.subcategories.find(s => s.id === subcategoryId);
    if (!subcategory) return false;

    const taskIndex = subcategory.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return false;

    subcategory.tasks.splice(taskIndex, 1);
    return true;
  }
}

export const categoriesManager = CategoriesManager.getInstance();

export const getAllGroups = () => categoriesManager.getAllGroups();
export const getGroupById = (groupId: string) => categoriesManager.getGroupById(groupId);
export const searchTasks = (query: string) => categoriesManager.searchTasks(query);
export const addTask = (groupId: string, categoryId: string, subcategoryId: string, task: CleaningTask) =>
  categoriesManager.addTask(groupId, categoryId, subcategoryId, task);
export const removeTask = (groupId: string, categoryId: string, subcategoryId: string, taskId: string) =>
  categoriesManager.removeTask(groupId, categoryId, subcategoryId, taskId);