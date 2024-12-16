import React, { createContext, useContext, useState, useEffect } from 'react';
import { AreaData, SelectedTask, TaskContextType } from './types';
import { useTaskManagement } from '@/hooks/useTaskManagement';
import { useTaskOperations } from '@/hooks/useTaskOperations';
import { useTaskModifiers } from '@/hooks/useTaskModifiers';
import { TIME_CONSTANTS } from '@/utils/constants';
import { toast } from '@/components/ui/use-toast';

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
    try {
      const totalMonthlyHours = selectedTasks.reduce((total, task) => {
        if (!task?.timeRequired) {
          console.warn('Task missing time required:', task);
          return total;
        }
        
        const taskMonthlyHours = task.timeRequired;
        console.log('Task hours calculation:', {
          taskId: task.taskId,
          timeRequired: task.timeRequired,
          frequency: task.frequency,
          monthlyHours: taskMonthlyHours
        });
        
        return total + taskMonthlyHours;
      }, 0);
      
      const totalWeeklyHours = totalMonthlyHours / TIME_CONSTANTS.WEEKS_PER_MONTH;
      
      console.log('Total hours calculation:', {
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
    } catch (error) {
      console.error('Error calculating total hours:', error);
      toast({
        title: "Error",
        description: "Failed to calculate total hours. Please check the console for details.",
        variant: "destructive"
      });
      return { totalWeeklyHours: 0, totalMonthlyHours: 0 };
    }
  };

  const [totalHours, setTotalHours] = useState({ totalWeeklyHours: 0, totalMonthlyHours: 0 });

  useEffect(() => {
    const newTotalHours = calculateTotalHours();
    console.log('Updating total hours:', newTotalHours);
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