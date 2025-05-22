
import { useMemo } from 'react';
import { WorkflowData, WorkflowStep, WorkflowStepId } from './types';

export const useWorkflowSteps = (workflowData: WorkflowData, currentStep: WorkflowStepId): WorkflowStep[] => {
  const steps: WorkflowStep[] = useMemo(() => [
    {
      id: 'site-setup',
      label: 'Site Setup',
      description: 'Add client and site details',
      path: '/workflow/site-setup',
      isComplete: workflowData.sites.length > 0,
      isActive: currentStep === 'site-setup'
    },
    {
      id: 'scope-definition',
      label: 'Scope Definition',
      description: 'Define the scope of work',
      path: '/workflow/scope',
      isComplete: false,
      isActive: currentStep === 'scope-definition'
    },
    {
      id: 'task-management',
      label: 'Task Management',
      description: 'Select and configure tasks',
      path: '/workflow/tasks',
      isComplete: workflowData.selectedTasks.length > 0,
      isActive: currentStep === 'task-management'
    },
    {
      id: 'labor-costs',
      label: 'Labor Costs',
      description: 'Configure labor rates and costs',
      path: '/workflow/labor',
      // Only mark as complete if hourly rate is set AND employmentType is set
      isComplete: !!workflowData.laborCosts.hourlyRate && 
                  (workflowData.laborCosts.employmentType === 'direct' || 
                   workflowData.laborCosts.employmentType === 'contracted') &&
                  !!workflowData.laborCosts.onCosts,
      isActive: currentStep === 'labor-costs'
    },
    {
      id: 'equipment',
      label: 'Equipment',
      description: 'Add equipment and supplies',
      path: '/workflow/equipment',
      isComplete: Object.keys(workflowData.equipmentCosts).length > 0,
      isActive: currentStep === 'equipment'
    },
    {
      id: 'contract',
      label: 'Contract Details',
      description: 'Set contract length and terms',
      path: '/workflow/contract',
      // Check for complete contract details including CPI increases
      isComplete: !!workflowData.contractDetails.lengthYears && 
                  !!workflowData.contractDetails.cpiIncreases &&
                  (workflowData.contractDetails.lengthYears === 1 || 
                   (workflowData.contractDetails.cpiIncreases.yearOne !== undefined)),
      isActive: currentStep === 'contract'
    },
    {
      id: 'summary',
      label: 'Financial Summary',
      description: 'Review profit and loss',
      path: '/workflow/summary',
      isComplete: false,
      isActive: currentStep === 'summary'
    },
    {
      id: 'review',
      label: 'Final Review',
      description: 'Review full estimate',
      path: '/workflow/review',
      isComplete: false,
      isActive: currentStep === 'review'
    }
  ], [workflowData, currentStep]);

  return steps;
};
