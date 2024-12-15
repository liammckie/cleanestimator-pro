import React, { createContext, useContext } from 'react';
import { TaskContextType, AreaData } from './types';
import { useTaskManagement } from '@/hooks/useTaskManagement';
import { useTaskOperations } from '@/hooks/useTaskOperations';
import { useTaskModifiers } from '@/hooks/useTaskModifiers';

/**
 * Context for managing task-related state and operations throughout the application
 */
const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: React.ReactNode;
  onTasksChange?: (area: AreaData) => void;
  defaultLaborRate?: number;
}

/**
 * Provider component that makes task context available to child components
 */
export const TaskProvider: React.FC<TaskProviderProps> = ({ 
  children, 
  onTasksChange,
  defaultLaborRate = 38 
}) => {
  // Initialize task management hooks
  const { selectedTasks, setSelectedTasks, calculateTaskTime } = useTaskManagement(
    onTasksChange,
    defaultLaborRate
  );

  // Initialize task operation hooks
  const {
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange
  } = useTaskOperations(selectedTasks, setSelectedTasks, calculateTaskTime, defaultLaborRate);

  // Initialize task modifier hooks
  const {
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride
  } = useTaskModifiers(selectedTasks, setSelectedTasks, calculateTaskTime);

  // Combine all values for context
  const value = {
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

/**
 * Custom hook to use the task context
 * @throws Error if used outside of TaskProvider
 * @returns TaskContextType object containing task state and operations
 */
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};