
export interface TaskFrequency {
  timesPerWeek: number;
  timesPerMonth: number;
}

export interface SelectedTask {
  id: string;
  quantity: number;
  timeRequired: number;
  taskId?: string; // For backward compatibility
  frequency: TaskFrequency;
  productivityOverride?: number;
  siteId?: string; // Track which site this task belongs to
  taskName?: string; // Store task name for better UI display
}

export interface Task {
  id: string;
  taskName?: string;
  category?: string;
  description?: string;
  defaultQuantity?: number;
  defaultTime?: number;
  unitOfMeasure?: string;
  taskType?: string;
  // Add other properties as needed
}

export interface TaskContextType {
  selectedTasks: SelectedTask[];
  handleTaskSelection: (taskId: string, selected: boolean, siteId?: string, taskName?: string) => void;
  handleQuantityChange: (taskId: string, quantity: number) => void;
  handleFrequencyChange: (taskId: string, frequency: TaskFrequency | number) => void;
  handleToolChange?: (taskId: string, toolType: string) => void;
  handleLaborRateChange?: (taskId: string, laborRate: number) => void;
  handleProductivityOverride?: (taskId: string, productivityRate: number) => void;
  totalWeeklyHours: number;
  totalMonthlyHours: number;
}
