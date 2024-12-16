import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { AreaData, SelectedTask, TaskContextType } from './types';
import { useTaskManagement } from '@/hooks/useTaskManagement';
import { useTaskOperations } from '@/hooks/useTaskOperations';
import { useTaskModifiers } from '@/hooks/useTaskModifiers';
import { TIME_CONSTANTS } from '@/utils/constants';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: React.ReactNode;
  onTasksChange?: (area: AreaData) => void;
  defaultLaborRate?: number;
}

export const TaskProvider: React.FC<TaskProviderProps> = React.memo(({ 
  children, 
  onTasksChange,
  defaultLaborRate = 38 
}) => {
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  
  const { calculateTaskTime } = useTaskManagement(
    onTasksChange,
    defaultLaborRate
  );

  const {
    handleTaskSelection: baseHandleTaskSelection,
    handleQuantityChange: baseHandleQuantityChange,
    handleFrequencyChange: baseHandleFrequencyChange
  } = useTaskOperations(selectedTasks, setSelectedTasks, calculateTaskTime, defaultLaborRate);

  const {
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride
  } = useTaskModifiers(selectedTasks, setSelectedTasks, calculateTaskTime);

  const calculateTotalHours = useCallback(() => {
    if (!selectedTasks || selectedTasks.length === 0) {
      return { totalWeeklyHours: 0, totalMonthlyHours: 0 };
    }

    const totalMonthlyHours = selectedTasks.reduce((total, task) => {
      return total + (task.timeRequired || 0);
    }, 0);
    
    const totalWeeklyHours = totalMonthlyHours / TIME_CONSTANTS.WEEKS_PER_MONTH;
    
    return { totalWeeklyHours, totalMonthlyHours };
  }, [selectedTasks]);

  const handleTaskSelection = useCallback((taskId: string, isSelected: boolean, siteId?: string, siteName?: string) => {
    baseHandleTaskSelection(taskId, isSelected, siteId, siteName);
  }, [baseHandleTaskSelection]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    baseHandleQuantityChange(taskId, quantity);
  }, [baseHandleQuantityChange]);

  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number) => {
    baseHandleFrequencyChange(taskId, timesPerWeek);
  }, [baseHandleFrequencyChange]);

  const [totalHours, setTotalHours] = useState({ totalWeeklyHours: 0, totalMonthlyHours: 0 });

  useEffect(() => {
    const newTotalHours = calculateTotalHours();
    setTotalHours(newTotalHours);
  }, [selectedTasks, calculateTotalHours]);

  const contextValue = useMemo(() => ({
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalWeeklyHours: totalHours.totalWeeklyHours,
    totalMonthlyHours: totalHours.totalMonthlyHours
  }), [
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalHours.totalWeeklyHours,
    totalHours.totalMonthlyHours
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