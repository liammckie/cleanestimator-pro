
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { TaskContextType, SelectedTask } from './types';
import { useTaskTimes } from '@/hooks/useTaskTimes';
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
  console.log('TASK_FLOW: TaskProvider mounting with props:', {
    hasOnTasksChange: !!onTasksChange,
    defaultLaborRate
  });

  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>(() => {
    try {
      const savedTasks = localStorage.getItem('selectedTasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  });

  const { calculateTaskTime } = useTaskTimes();

  const {
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange
  } = useTaskOperations(selectedTasks, setSelectedTasks, calculateTaskTime, defaultLaborRate);

  const {
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride
  } = useTaskModifiers(selectedTasks, setSelectedTasks, calculateTaskTime);

  const calculateTotalHours = useCallback(() => {
    if (!selectedTasks || selectedTasks.length === 0) {
      console.log('HOURS_CALC: No tasks selected, returning 0');
      return { totalWeeklyHours: 0, totalMonthlyHours: 0 };
    }

    const totalMonthlyHours = selectedTasks.reduce((total, task) => {
      return total + (task.timeRequired * task.frequency.timesPerMonth);
    }, 0);

    const totalWeeklyHours = totalMonthlyHours / 4.33;

    console.log('TASK_FLOW: Hours calculation:', {
      totalWeeklyHours,
      totalMonthlyHours,
      selectedTasksCount: selectedTasks.length
    });

    return { totalWeeklyHours, totalMonthlyHours };
  }, [selectedTasks]);

  const { totalWeeklyHours, totalMonthlyHours } = useMemo(() => 
    calculateTotalHours(),
    [calculateTotalHours]
  );

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('selectedTasks', JSON.stringify(selectedTasks));
      console.log('TASK_FLOW: Tasks saved to localStorage:', {
        taskCount: selectedTasks.length
      });
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [selectedTasks]);

  // Forward the context's value to anyone consuming it
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

  console.log('TASK_FLOW: Context value updated:', {
    selectedTasksCount: selectedTasks.length,
    totalWeeklyHours,
    totalMonthlyHours
  });

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
    console.error('TASK_FLOW: useTaskContext called outside of TaskProvider');
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
