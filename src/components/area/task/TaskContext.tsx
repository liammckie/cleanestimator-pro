import React, { createContext, useContext, useState, useEffect } from 'react';
import { AreaData, SelectedTask, TaskContextType } from './types';
import { useTaskManagement } from '@/hooks/useTaskManagement';
import { useTaskOperations } from '@/hooks/useTaskOperations';
import { useTaskModifiers } from '@/hooks/useTaskModifiers';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: React.ReactNode;
  onTasksChange?: (area: AreaData) => void;
  defaultLaborRate?: number;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ 
  children, 
  onTasksChange,
  defaultLaborRate = 38 
}) => {
  const { selectedTasks, setSelectedTasks, calculateTaskTime } = useTaskManagement(
    onTasksChange,
    defaultLaborRate
  );

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

  // Calculate total weekly and monthly hours whenever tasks change
  const calculateTotalHours = () => {
    const totalMonthlyHours = selectedTasks.reduce((total, task) => {
      return total + (task.timeRequired || 0);
    }, 0);
    
    const totalWeeklyHours = totalMonthlyHours / 4.33;
    
    console.log('Calculated hours:', { totalWeeklyHours, totalMonthlyHours });
    return { totalWeeklyHours, totalMonthlyHours };
  };

  const [totalHours, setTotalHours] = useState({ totalWeeklyHours: 0, totalMonthlyHours: 0 });

  useEffect(() => {
    const newTotalHours = calculateTotalHours();
    setTotalHours(newTotalHours);
    console.log('Updated total hours:', newTotalHours);
  }, [selectedTasks]);

  const value = {
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalWeeklyHours: totalHours.totalWeeklyHours,
    totalMonthlyHours: totalHours.totalMonthlyHours
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};