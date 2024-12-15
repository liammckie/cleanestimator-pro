export interface ProductivityRate {
  id: string;
  category: string;
  subcategory?: string;
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
  subcategories: TaskSubcategory[];
}

export interface TaskSubcategory {
  id: string;
  name: string;
  tasks: ProductivityRate[];
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