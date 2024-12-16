export interface TaskFrequency {
  timesPerWeek: number;
  timesPerMonth: number;
}

export interface SelectedTask {
  taskId: string;
  siteId?: string;
  siteName?: string;
  quantity: number;
  timeRequired: number;
  frequency: TaskFrequency;
  productivityOverride?: number;
  selectedTool?: string;
  laborRate?: number;
}

export interface TaskContextType {
  selectedTasks: SelectedTask[];
  handleTaskSelection: (taskId: string, isSelected: boolean, siteId?: string, siteName?: string) => void;
  handleQuantityChange: (taskId: string, quantity: number) => void;
  handleFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  handleToolChange: (taskId: string, tool: string) => void;
  handleLaborRateChange: (taskId: string, rate: number) => void;
  handleProductivityOverride: (taskId: string, override: number) => void;
  totalWeeklyHours: number;
  totalMonthlyHours: number;
}

export interface AreaData {
  squareMeters: number;
  spaceType: string;
  industryType: string;
  selectedTasks: Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: TaskFrequency;
    productivityOverride?: number;
    selectedTool?: string;
    laborRate?: number;
  }>;
  totalTime: number;
  totalLaborCost: number;
}