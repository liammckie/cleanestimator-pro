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

  const calculateTotalHours = () => {
    console.log('Calculating total hours for tasks:', selectedTasks);
    
    const totalMonthlyHours = selectedTasks.reduce((total, task) => {
      // Log individual task calculation
      console.log('Processing task:', {
        taskId: task.taskId,
        timeRequired: task.timeRequired,
        frequency: task.frequency
      });
      
      if (!task.timeRequired) {
        console.log('Task has no timeRequired:', task.taskId);
        return total;
      }

      const taskMonthlyHours = task.timeRequired;
      console.log('Task monthly hours:', taskMonthlyHours);
      
      return total + taskMonthlyHours;
    }, 0);
    
    const totalWeeklyHours = totalMonthlyHours / TIME_CONSTANTS.WEEKS_PER_MONTH;
    
    console.log('Final hours calculation:', {
      totalWeeklyHours,
      totalMonthlyHours,
      selectedTasksCount: selectedTasks.length,
      taskDetails: selectedTasks.map(task => ({
        taskId: task.taskId,
        timeRequired: task.timeRequired,
        frequency: task.frequency
      }))
    });
    
    return { totalWeeklyHours, totalMonthlyHours };
  };

  const [totalHours, setTotalHours] = useState({ totalWeeklyHours: 0, totalMonthlyHours: 0 });

  useEffect(() => {
    if (selectedTasks.length > 0) {
      console.log('Selected tasks changed, recalculating hours:', selectedTasks);
      const newTotalHours = calculateTotalHours();
      console.log('New total hours:', newTotalHours);
      setTotalHours(newTotalHours);
    } else {
      console.log('No tasks selected, resetting hours to 0');
      setTotalHours({ totalWeeklyHours: 0, totalMonthlyHours: 0 });
    }
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