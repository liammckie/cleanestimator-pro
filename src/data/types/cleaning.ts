export interface CleaningTask {
  id: string;
  name: string;
  rate: number;
  unit: 'SQM/hour' | 'Units/hour';
  category: string;
  subcategory?: string;
  notes?: string;
  defaultTool?: string;
}

export interface TaskCategory {
  id: string;
  name: string;
  description: string;
  tasks: CleaningTask[];
}

export interface TaskGroup {
  id: string;
  name: string;
  description: string;
  categories: TaskCategory[];
}