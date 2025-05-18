
// Additional task type definitions for our application

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskWithMetadata extends Task {
  metadata: Record<string, any>;
}

export interface TaskCategory {
  id: string;
  name: string;
  description?: string;
}
