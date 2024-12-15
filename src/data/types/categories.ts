export interface BaseCategory {
  id: string;
  name: string;
  description?: string;
}

export interface CleaningTask {
  id: string;
  category: string;
  subcategory: string;
  task: string;
  tool: string;
  unit: string;
  ratePerHour: number;
  defaultQuantity?: number;
  minimumQuantity?: number;
  maximumQuantity?: number;
  notes?: string;
}

export interface TaskSubcategory extends BaseCategory {
  tasks: CleaningTask[];
}

export interface TaskCategory extends BaseCategory {
  subcategories: TaskSubcategory[];
}

export interface CategoryGroup extends BaseCategory {
  categories: TaskCategory[];
}

export type CategoryType = 'core' | 'specialized' | 'industry-specific';

export interface CategorySelection {
  groupId: string;
  categoryId: string;
  subcategoryId: string;
  taskId: string;
}

export interface CategoryState {
  selectedCategory?: CategorySelection;
  searchQuery: string;
}