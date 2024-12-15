export interface ProductivityRate {
  id: string;
  category: string;
  subcategory?: string; // Made optional to maintain compatibility
  task: string;
  tool: string;
  unit: string;
  ratePerHour: number;
  defaultQuantity?: number;
  minimumQuantity?: number;
  maximumQuantity?: number;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
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