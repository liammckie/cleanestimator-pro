
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Site } from '@/data/types/site';
import { SelectedTask } from '@/components/area/task/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { WorkflowInsert, WorkflowUpdate, WorkflowProject } from '@/utils/workflowTypes';

export type WorkflowStepId = 'site-setup' | 'scope-definition' | 'task-management' | 'labor-costs' | 'equipment' | 'contract' | 'summary' | 'review';

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

interface WorkflowContextType {
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

const defaultWorkflowData: WorkflowData = {
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

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<WorkflowStepId>('site-setup');
  const [workflowData, setWorkflowData] = useState<WorkflowData>(defaultWorkflowData);
  const [saveWorkflowId, setSaveWorkflowId] = useState<string | undefined>(undefined);
  
  const steps: WorkflowStep[] = [
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
      isComplete: !!workflowData.laborCosts.hourlyRate,
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
      isComplete: !!workflowData.contractDetails.lengthYears,
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
  ];

  const findStepIndex = (stepId: WorkflowStepId) => {
    return steps.findIndex(step => step.id === stepId);
  };

  const nextStep = () => {
    const currentIndex = findStepIndex(currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStepId = steps[currentIndex + 1].id as WorkflowStepId;
      setCurrentStep(nextStepId);
      navigate(steps[currentIndex + 1].path);
    }
  };

  const previousStep = () => {
    const currentIndex = findStepIndex(currentStep);
    if (currentIndex > 0) {
      const prevStepId = steps[currentIndex - 1].id as WorkflowStepId;
      setCurrentStep(prevStepId);
      navigate(steps[currentIndex - 1].path);
    }
  };

  const updateWorkflowData = (data: Partial<WorkflowData>) => {
    setWorkflowData(prev => ({
      ...prev,
      ...data
    }));

    // Auto-save whenever data is updated
    saveProgress();
  };

  const setWorkflowName = (name: string) => {
    setWorkflowData(prev => ({
      ...prev,
      projectName: name
    }));
  };
  
  const removeSite = (siteId: string) => {
    setWorkflowData(prev => ({
      ...prev,
      sites: prev.sites.filter(site => site.id !== siteId)
    }));
  };

  const saveProgress = async () => {
    try {
      if (!saveWorkflowId) {
        // Create new workflow
        const workflowInsert: WorkflowInsert = {
          project_name: workflowData.projectName || 'New Cleaning Project',
          client_name: workflowData.clientName || '',
          workflow_data: workflowData,
          current_step: currentStep
        };
        
        const { data, error } = await supabase
          .from('cleaning_workflows')
          .insert([workflowInsert])
          .select('id')
          .single();
          
        if (error) throw error;
        
        if (data?.id) {
          setSaveWorkflowId(data.id);
          toast({
            title: "Workflow created",
            description: "Your progress has been saved."
          });
        }
      } else {
        // Update existing workflow
        const workflowUpdate: WorkflowUpdate = {
          project_name: workflowData.projectName,
          client_name: workflowData.clientName || '',
          workflow_data: workflowData,
          current_step: currentStep,
          updated_at: new Date().toISOString()
        };
        
        const { error } = await supabase
          .from('cleaning_workflows')
          .update(workflowUpdate)
          .eq('id', saveWorkflowId);
          
        if (error) throw error;
        
        toast({
          title: "Progress saved",
          description: "Your workflow has been updated."
        });
      }
    } catch (error) {
      console.error('Error saving workflow:', error);
      toast({
        title: "Save failed",
        description: "Could not save your progress.",
        variant: "destructive"
      });
    }
  };

  const loadProgress = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('cleaning_workflows')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setSaveWorkflowId(data.id);
        
        // Handle the data loading properly by ensuring proper types
        const loadedData = data.workflow_data as WorkflowData;
        setWorkflowData(loadedData);
        
        // Ensure the current_step is cast as a WorkflowStepId
        setCurrentStep(data.current_step as WorkflowStepId);
        
        // Navigate to the correct step
        const stepToNavigate = steps.find(step => step.id === data.current_step);
        if (stepToNavigate) {
          navigate(stepToNavigate.path);
        }
        
        toast({
          title: "Workflow loaded",
          description: `Loaded: ${data.project_name}`
        });
      }
    } catch (error) {
      console.error('Error loading workflow:', error);
      toast({
        title: "Load failed",
        description: "Could not load your workflow.",
        variant: "destructive"
      });
    }
  };

  // Update the current step when path changes
  useEffect(() => {
    const path = window.location.pathname;
    const matchingStep = steps.find(step => step.path === path);
    if (matchingStep) {
      setCurrentStep(matchingStep.id);
    }
  }, []);

  return (
    <WorkflowContext.Provider value={{
      currentStep,
      setCurrentStep,
      steps,
      workflowData,
      updateWorkflowData,
      nextStep,
      previousStep,
      saveProgress,
      loadProgress,
      saveWorkflowId,
      setWorkflowName,
      removeSite
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
