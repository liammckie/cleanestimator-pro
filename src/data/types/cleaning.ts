export interface BaseCategory {
  id: string;
  name: string;
  description?: string;
}

export interface CleaningTask {
  id: string;
  name: string;
  rate: number;
  unit: 'SQM/hour' | 'Units/hour';
  category: string;
  notes?: string;
  defaultTool?: string;
}

export interface TaskCategory extends BaseCategory {
  tasks: CleaningTask[];
}

export interface TaskGroup extends BaseCategory {
  categories: TaskCategory[];
}