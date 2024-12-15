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
  laborType?: 'contracted' | 'direct';
}

export interface TaskContextType {
  selectedTasks: SelectedTask[];
  handleTaskSelection: (taskId: string, isSelected: boolean, siteId?: string, siteName?: string) => void;
  handleQuantityChange: (taskId: string, quantity: number) => void;
  handleFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  handleProductivityOverride: (taskId: string, override: number) => void;
  handleToolChange: (taskId: string, tool: string) => void;
  handleLaborRateChange: (taskId: string, rate: number, type: 'contracted' | 'direct') => void;
}

export interface AreaData {
  squareMeters: number;
  spaceType: string;
  industryType: string;
  selectedTasks: SelectedTask[];
  totalTime: number;
  totalLaborCost: number;
}