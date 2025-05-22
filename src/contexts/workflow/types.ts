
import { Site } from '@/data/types/site';
import { SelectedTask } from '@/components/area/task/types';

export type WorkflowStepId = 'projects' | 'site-setup' | 'scope-definition' | 'task-management' | 'labor-costs' | 'equipment' | 'contract' | 'summary' | 'review';

export interface WorkflowStep {
  id: WorkflowStepId;
  label: string;
  description: string;
  path: string;
  isComplete: boolean;
  isActive: boolean;
}

export interface WorkflowData {
  sites: Site[];
  laborCosts: {
    hourlyRate: number;
    employmentType: 'direct' | 'contracted';
    onCosts?: any;
  };
  equipmentCosts: any;
  contractDetails: any;
  selectedTasks: SelectedTask[];
  projectName?: string;
  clientName?: string;
  createdBy?: string;
}

export interface WorkflowContextType {
  currentStep: WorkflowStepId;
  setCurrentStep: (stepId: WorkflowStepId) => void;
  steps: WorkflowStep[];
  workflowData: WorkflowData;
  updateWorkflowData: (data: Partial<WorkflowData>) => void;
  nextStep: () => void;
  previousStep: () => void;
  saveProgress: () => Promise<void>;
  loadProgress: (id: string) => Promise<void>;
  saveWorkflowId?: string;
  setWorkflowName: (name: string) => void;
  removeSite: (siteId: string) => void;
}
