import React, { createContext, useContext, useMemo } from 'react';
import { TaskContextType } from './types';
import { useTaskInitialization } from '@/hooks/useTaskInitialization';
import { useTaskOperations } from '@/hooks/useTaskOperations';
import { useTaskModifiers } from '@/hooks/useTaskModifiers';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: React.ReactNode;
  onTasksChange?: (area: any) => void;
  defaultLaborRate?: number;
}

export const TaskProvider = React.memo(({ 
  children, 
  onTasksChange,
  defaultLaborRate = 38 
}: TaskProviderProps) => {
  console.log('TASK_CONTEXT: TaskProvider rendering');

  const {
    selectedTasks,
    setSelectedTasks,
    calculateTaskTime,
    calculateTotalHours
  } = useTaskInitialization(onTasksChange, defaultLaborRate);

  console.log('TASK_CONTEXT: Current selected tasks:', {
    count: selectedTasks.length,
    tasks: selectedTasks.map(task => ({
      taskId: task.taskId,
      quantity: task.quantity,
      timeRequired: task.timeRequired,
      frequency: task.frequency
    }))
  });

  const {
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange
  } = useTaskOperations(selectedTasks, setSelectedTasks, calculateTaskTime);

  const {
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride
  } = useTaskModifiers(selectedTasks, setSelectedTasks, calculateTaskTime);

  const { totalWeeklyHours, totalMonthlyHours } = calculateTotalHours();

  console.log('TASK_CONTEXT: Hours calculation:', {
    totalWeeklyHours,
    totalMonthlyHours,
    taskCount: selectedTasks.length
  });

  const contextValue = useMemo(() => ({
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalWeeklyHours,
    totalMonthlyHours
  }), [
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalWeeklyHours,
    totalMonthlyHours
  ]);

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
});

TaskProvider.displayName = 'TaskProvider';

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};