
import { WorkflowStep, WorkflowStepId } from './types';

export const findStepIndex = (steps: WorkflowStep[], stepId: WorkflowStepId): number => {
  return steps.findIndex(step => step.id === stepId);
};

export const getStepById = (steps: WorkflowStep[], stepId: WorkflowStepId): WorkflowStep | undefined => {
  return steps.find(step => step.id === stepId);
};

export const getStepByPath = (steps: WorkflowStep[], path: string): WorkflowStep | undefined => {
  return steps.find(step => step.path === path);
};
