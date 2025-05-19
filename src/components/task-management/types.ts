
import { CleaningTask } from '@/data/types/taskManagement';

export interface SelectedTask extends CleaningTask {
  quantity: number;
  frequency: {
    timesPerWeek: number;
    timesPerMonth: number;
  };
  timeRequired: number;
  selectedTool?: string;
  taskId?: string;
  unitType?: 'sqm' | 'units';
}

export interface TaskProductivity {
  timeRequired: number;
  adjustedRate: number;
}
