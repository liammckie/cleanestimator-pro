export interface TaskFrequency {
  timesPerWeek: number;
  timesPerMonth: number;
}

export interface Task {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  unit: string;
  ratePerHour: number;
  defaultQuantity?: number;
  minimumQuantity?: number;
}

export interface SelectedTask {
  id: string;
  quantity: number;
  timeRequired: number;
  frequency: TaskFrequency;
  productivityOverride?: number;
  selectedTool?: string;
}

export interface TaskContextType {
  selectedTasks: SelectedTask[];
  addTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
  updateTaskQuantity: (taskId: string, quantity: number) => void;
  updateTaskFrequency: (taskId: string, frequency: TaskFrequency) => void;
  totalWeeklyHours: number;
  totalMonthlyHours: number;
}