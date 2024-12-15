export interface CleaningTask {
  id: string;
  category: 'Core Cleaning' | 'Specialized Cleaning' | 'Industry-Specific';
  taskName: string;
  productivityRate: number;
  measurementUnit: 'SQM/hour' | 'Units/hour';
  notes: string;
  defaultTool?: string;
}

export interface TaskCategory {
  id: string;
  name: string;
  description: string;
  tasks: CleaningTask[];
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