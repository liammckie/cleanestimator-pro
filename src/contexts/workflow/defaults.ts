
import { WorkflowData } from './types';

export const defaultWorkflowData: WorkflowData = {
  sites: [],
  laborCosts: {
    hourlyRate: 38,
    employmentType: 'contracted',
  },
  equipmentCosts: {},
  contractDetails: {
    lengthYears: 1,
    cpiIncreases: { yearOne: 0, yearTwo: 0, yearThree: 0 }
  },
  selectedTasks: [],
  projectName: 'New Cleaning Project',
  clientName: '',
  createdBy: '',
};
