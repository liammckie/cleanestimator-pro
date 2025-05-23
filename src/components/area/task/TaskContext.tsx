
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SelectedTask, TaskContextType } from './types';
import { useUnifiedTaskCalculations } from '@/hooks/useUnifiedTaskCalculations';
import { useWorkflow } from '@/contexts/WorkflowContext';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: React.ReactNode;
  initialTasks?: SelectedTask[];
  onTasksChange?: any;
  defaultLaborRate?: number;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ 
  children, 
  initialTasks = [],
  onTasksChange,
  defaultLaborRate = 38
}) => {
  console.log('TASK_FLOW: TaskProvider mounting with props:', {
    hasOnTasksChange: !!onTasksChange,
    defaultLaborRate
  });

  // Check for workflow context to integrate with it
  let workflowContext = null;
  try {
    workflowContext = useWorkflow();
  } catch (e) {
    // The provider is not inside a WorkflowProvider, which is fine
    console.log('TASK_FLOW: Not within WorkflowProvider context');
  }

  // Use the unified task calculations hook
  const {
    selectedTasks,
    setSelectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalWeeklyHours,
    totalMonthlyHours
  } = useUnifiedTaskCalculations(onTasksChange, defaultLaborRate);

  // Initialize with workflow tasks if available, otherwise use initialTasks
  useEffect(() => {
    if (workflowContext?.workflowData?.selectedTasks?.length > 0) {
      setSelectedTasks(workflowContext.workflowData.selectedTasks);
    } else if (initialTasks && initialTasks.length > 0) {
      setSelectedTasks(initialTasks);
    }
  }, []);

  // Load tasks from localStorage on mount
  useEffect(() => {
    if (!workflowContext) {
      const savedTasks = localStorage.getItem('selected-tasks');
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks);
          if (Array.isArray(parsedTasks) && parsedTasks.length > 0) {
            setSelectedTasks(parsedTasks);
          }
        } catch (error) {
          console.error('TASK_FLOW: Error parsing saved tasks:', error);
        }
      }
    }
  }, []);

  // Sync with workflow context if available
  useEffect(() => {
    if (workflowContext && selectedTasks.length > 0) {
      workflowContext.updateWorkflowData({ selectedTasks });
    }
  }, [selectedTasks, workflowContext]);

  // Handle template application event
  useEffect(() => {
    const handleTemplateApplication = (event: Event) => {
      const customEvent = event as CustomEvent<{
        taskId: string;
        quantity: number;
        frequency: number;
      }>;
      
      const { taskId, quantity, frequency } = customEvent.detail;
      
      handleQuantityChange(taskId, quantity);
      handleFrequencyChange(taskId, frequency);
      
      console.log('TASK_FLOW: Applied template to task:', {
        taskId,
        quantity,
        frequency
      });
    };

    window.addEventListener('apply-task-template', handleTemplateApplication);
    
    return () => {
      window.removeEventListener('apply-task-template', handleTemplateApplication);
    };
  }, [handleQuantityChange, handleFrequencyChange]);

  // Save tasks to localStorage when they change (if not in workflow context)
  useEffect(() => {
    console.log('TASK_FLOW: Context value updated:', {
      selectedTasksCount: selectedTasks.length,
      totalWeeklyHours,
      totalMonthlyHours
    });
    
    // Save to localStorage if not in workflow context
    if (!workflowContext) {
      localStorage.setItem('selected-tasks', JSON.stringify(selectedTasks));
      console.log('TASK_FLOW: Tasks saved to localStorage:', {
        taskCount: selectedTasks.length
      });
    }
  }, [selectedTasks, totalWeeklyHours, totalMonthlyHours]);

  const contextValue: TaskContextType = {
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalWeeklyHours,
    totalMonthlyHours
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
