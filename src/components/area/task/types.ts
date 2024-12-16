import { ProductivityRate } from '@/data/types/productivity';

export interface AreaData {
  squareMeters: number;
  spaceType: string;
  industryType: string;
  selectedTasks: SelectedTask[];
  totalTime: number;
  totalLaborCost: number;
}

export interface SelectedTask {
  taskId: string;
  siteId?: string;
  siteName?: string;
  quantity: number;
  timeRequired: number;
  frequency: {
    timesPerWeek: number;
    timesPerMonth: number;
  };
  selectedTool?: string;
  productivityOverride?: number;
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