
export type TaskCategory = 'Core Cleaning' | 'Specialized Cleaning' | 'Industry-Specific Cleaning';
export type MeasurementUnit = 'SQM/hour' | 'Units/hour';

export interface CleaningTask {
  id: string;
  category: TaskCategory;
  taskName: string;
  productivityRate: number;
  measurementUnit: MeasurementUnit;
  /** Minimum quantity that can be charged for this task */
  minimumQuantity?: number;
  /** Charge per unit or square metre */
  chargeRate?: number;
  notes?: string;
  defaultTool?: string;
}

export interface SelectedTask extends CleaningTask {
  quantity: number;
  manHours: number;
  frequency: {
    timesPerWeek: number;
    timesPerMonth: number;
  };
  timeRequired: number;
  selectedTool?: string;
  taskId?: string;
  unitType?: 'sqm' | 'units';
  siteId?: string;
}

export interface TaskState {
  tasks: CleaningTask[];
  selectedTasks: string[];
}
