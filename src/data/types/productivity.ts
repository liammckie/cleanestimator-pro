export interface ProductivityRate {
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
}

export interface TaskCategory {
  id: string;
  name: string;
  description?: string;
  subcategories: TaskSubcategory[];
}

export interface TaskSubcategory {
  id: string;
  name: string;
  description?: string;
  tasks: ProductivityRate[];
}

export interface TaskGroup {
  id: string;
  name: string;
  description: string;
  categories: TaskCategory[];
}

export interface TaskSelection {
  taskId: string;
  quantity: number;
  frequency: {
    timesPerWeek: number;
    timesPerMonth: number;
  };
  selectedTool?: string;
  productivityOverride?: number;
}

export interface Category {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
    tasks: Array<{
      id: string;
      category: string;
      subcategory: string;
      task: string;
      tool: string;
      unit: string;
      ratePerHour: number;
      defaultQuantity: number;
      minimumQuantity: number;
    }>;
  }[];
}