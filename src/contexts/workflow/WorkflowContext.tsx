import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { WorkflowContextType, WorkflowData, WorkflowStepId } from './types';
import { defaultWorkflowData } from './defaults';
import { findStepIndex, getStepByPath } from './workflowUtils';
import { saveWorkflow, loadWorkflow } from './workflowStorage';
import { useWorkflowSteps } from './useWorkflowSteps';

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<WorkflowStepId>('site-setup');
  const [workflowData, setWorkflowData] = useState<WorkflowData>(defaultWorkflowData);
  const [saveWorkflowId, setSaveWorkflowId] = useState<string | undefined>(undefined);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const steps = useWorkflowSteps(workflowData, currentStep);

  const nextStep = useCallback(() => {
    const currentIndex = findStepIndex(steps, currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStepId = steps[currentIndex + 1].id as WorkflowStepId;
      setCurrentStep(nextStepId);
      navigate(steps[currentIndex + 1].path);
    }
  }, [currentStep, steps, navigate]);

  const previousStep = useCallback(() => {
    const currentIndex = findStepIndex(steps, currentStep);
    if (currentIndex > 0) {
      const prevStepId = steps[currentIndex - 1].id as WorkflowStepId;
      setCurrentStep(prevStepId);
      navigate(steps[currentIndex - 1].path);
    }
  }, [currentStep, steps, navigate]);

  // This function now handles updating tasks along with site data
  const updateWorkflowData = useCallback((data: Partial<WorkflowData>) => {
    setWorkflowData(prev => {
      // Handle special case for adding/replacing selected tasks
      if (data.selectedTasks) {
        // Create unique task IDs to avoid duplicates
        const existingTaskIds = new Set(prev.selectedTasks.map(task => task.id));
        const newTasks = data.selectedTasks.filter(task => !existingTaskIds.has(task.id));
        
        return {
          ...prev,
          ...data,
          selectedTasks: [...prev.selectedTasks, ...newTasks]
        };
      }
      
      return {
        ...prev,
        ...data
      };
    });

    // Auto-save with debounce to avoid too many requests
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    
    const newTimeout = setTimeout(() => {
      saveProgress();
    }, 1000);
    
    setSaveTimeout(newTimeout);

    return () => {
      if (saveTimeout) clearTimeout(saveTimeout);
    };
  }, [saveTimeout]);

  const setWorkflowName = useCallback((name: string) => {
    setWorkflowData(prev => ({
      ...prev,
      projectName: name
    }));
  }, []);
  
  // Improved removeSite to also clean up associated tasks
  const removeSite = useCallback((siteId: string) => {
    setWorkflowData(prev => {
      // Filter out the site to remove
      const updatedSites = prev.sites.filter(site => site.id !== siteId);
      
      // Filter out tasks associated with the removed site
      const updatedTasks = prev.selectedTasks.filter(task => {
        // Keep tasks that are not associated with the site or don't have siteId property
        return !task.siteId || task.siteId !== siteId;
      });
      
      return {
        ...prev,
        sites: updatedSites,
        selectedTasks: updatedTasks
      };
    });
    
    // Auto-save after removing a site
    saveProgress();
  }, []);

  const saveProgress = async () => {
    try {
      const { id, error } = await saveWorkflow(saveWorkflowId, workflowData, currentStep);
      
      if (error) {
        // Handle RLS policy errors specifically
        if (error.code === '42501') {
          toast({
            title: "Permission denied",
            description: "You don't have permission to save workflows. Please check your database permissions.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Save failed",
            description: `Could not save your progress: ${error.message}`,
            variant: "destructive"
          });
        }
        return;
      }
      
      if (id && !saveWorkflowId) {
        setSaveWorkflowId(id);
        toast({
          title: "Workflow created",
          description: "Your progress has been saved."
        });
      } else if (id) {
        toast({
          title: "Progress saved",
          description: "Your workflow has been updated."
        });
      }
    } catch (error: any) {
      console.error('Exception in saveProgress:', error);
      toast({
        title: "Save failed",
        description: "An unexpected error occurred while saving your progress.",
        variant: "destructive"
      });
    }
  };

  const loadProgress = async (id: string) => {
    try {
      const { data, error } = await loadWorkflow(id);
      
      if (error) {
        // Handle RLS policy errors specifically
        if (error.code === '42501') {
          toast({
            title: "Permission denied",
            description: "You don't have permission to load this workflow. Please check your database permissions.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Load failed",
            description: `Could not load your workflow: ${error.message}`,
            variant: "destructive"
          });
        }
        return;
      }
      
      if (data) {
        setSaveWorkflowId(data.id);
        setWorkflowData(data.workflowData);
        setCurrentStep(data.currentStep);
        
        // Navigate to the correct step
        const stepToNavigate = steps.find(step => step.id === data.currentStep);
        if (stepToNavigate) {
          navigate(stepToNavigate.path);
        }
        
        toast({
          title: "Workflow loaded",
          description: `Loaded: ${data.projectName}`
        });
      }
    } catch (error: any) {
      console.error('Exception in loadProgress:', error);
      toast({
        title: "Load failed",
        description: "An unexpected error occurred while loading your workflow.",
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
  }, [steps]);

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
