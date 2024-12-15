export type TaskCategory = 'Core Cleaning' | 'Specialized Cleaning' | 'Industry-Specific Cleaning';

export interface CleaningTask {
  id: string;
  category: TaskCategory;
  taskName: string;
  productivityRate: number;
  measurementUnit: 'SQM/hour' | 'Units/hour';
  notes?: string;
  defaultTool?: string;
}

export interface TaskState {
  tasks: CleaningTask[];
  selectedTasks: string[]; // Array of task IDs
}