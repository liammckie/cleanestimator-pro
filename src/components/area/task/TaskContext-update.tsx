
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SelectedTask, TaskContextType } from './types';
import { useUnifiedTaskCalculations } from '@/hooks/useUnifiedTaskCalculations';

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

  // Initialize with initial tasks if provided
  useEffect(() => {
    if (initialTasks && initialTasks.length > 0) {
      setSelectedTasks(initialTasks);
    }
  }, []);

  // Load tasks from localStorage on mount
  useEffect(() => {
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
  }, []);

  // Save tasks to localStorage when they change
  useEffect(() => {
    console.log('TASK_FLOW: Context value updated:', {
      selectedTasksCount: selectedTasks.length,
      totalWeeklyHours,
      totalMonthlyHours
    });
    
    // Save to localStorage
    localStorage.setItem('selected-tasks', JSON.stringify(selectedTasks));
    console.log('TASK_FLOW: Tasks saved to localStorage:', {
      taskCount: selectedTasks.length
    });
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
