import React, { createContext, useContext, useState, useEffect } from 'react';
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

export const TaskProvider: React.FC<TaskProviderProps> = ({ 
  children, 
  onTasksChange,
  defaultLaborRate = 38 
}) => {
  console.log('DEBUG: TaskProvider rendering');
  
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

  const calculateTotalHours = () => {
    console.log('DEBUG: Starting hours calculation');
    console.log('DEBUG: Selected tasks:', selectedTasks);
    
    if (!selectedTasks || selectedTasks.length === 0) {
      console.log('DEBUG: No tasks selected, returning 0');
      return { totalWeeklyHours: 0, totalMonthlyHours: 0 };
    }

    const totalMonthlyHours = selectedTasks.reduce((total, task) => {
      console.log('DEBUG: Processing task:', task);
      return total + (task.timeRequired || 0);
    }, 0);
    
    const totalWeeklyHours = totalMonthlyHours / TIME_CONSTANTS.WEEKS_PER_MONTH;
    
    console.log('DEBUG: Final calculation:', {
      totalWeeklyHours,
      totalMonthlyHours,
      selectedTasksCount: selectedTasks.length
    });
    
    return { totalWeeklyHours, totalMonthlyHours };
  };

  const handleTaskSelection = (taskId: string, isSelected: boolean, siteId?: string, siteName?: string) => {
    console.log('DEBUG: Task selection triggered:', {
      taskId,
      isSelected,
      siteId,
      siteName
    });
    baseHandleTaskSelection(taskId, isSelected, siteId, siteName);
  };

  const handleQuantityChange = (taskId: string, quantity: number) => {
    console.log('DEBUG: Quantity change triggered:', {
      taskId,
      quantity
    });
    baseHandleQuantityChange(taskId, quantity);
  };

  const handleFrequencyChange = (taskId: string, timesPerWeek: number) => {
    console.log('DEBUG: Frequency change triggered:', {
      taskId,
      timesPerWeek
    });
    baseHandleFrequencyChange(taskId, timesPerWeek);
  };

  const [totalHours, setTotalHours] = useState({ totalWeeklyHours: 0, totalMonthlyHours: 0 });

  useEffect(() => {
    console.log('DEBUG: Tasks state changed:', selectedTasks);
    const newTotalHours = calculateTotalHours();
    setTotalHours(newTotalHours);
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