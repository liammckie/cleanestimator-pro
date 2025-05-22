
import { Site } from "@/data/types/site";
import { SelectedTask } from "@/components/area/task/types";
import { WorkflowStepId } from "@/contexts/WorkflowContext";

// Define the structure of the workflow data stored in the database
export interface WorkflowProject {
  id: string;
  project_name: string;
  client_name: string;
  current_step: WorkflowStepId;
  created_at: string;
  updated_at: string;
  workflow_data?: any;
  created_by?: string;
}

// Type for the insert operation
export interface WorkflowInsert {
  project_name: string;
  client_name?: string;
  workflow_data: any;
  current_step: WorkflowStepId;
  created_by?: string;
}

// Type for the update operation
export interface WorkflowUpdate {
  project_name?: string;
  client_name?: string;
  workflow_data?: any;
  current_step?: WorkflowStepId;
  updated_at?: string;
  created_by?: string;
}
