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
    console.log('HOURS_CALC Starting hours calculation');
    console.log('HOURS_CALC Selected tasks:', selectedTasks);
    
    if (!selectedTasks || selectedTasks.length === 0) {
      console.log('HOURS_CALC No tasks selected, returning 0');
      return { totalWeeklyHours: 0, totalMonthlyHours: 0 };
    }

    const totalMonthlyHours = selectedTasks.reduce((total, task, index) => {
      console.log('HOURS_CALC Processing task:', {
        index: index + 1,
        taskId: task.taskId,
        timeRequired: task.timeRequired,
        frequency: task.frequency,
        quantity: task.quantity
      });
      
      if (!task.timeRequired) {
        console.log('HOURS_CALC Task has no timeRequired:', task.taskId);
        return total;
      }

      const taskMonthlyHours = task.timeRequired;
      console.log('HOURS_CALC Monthly hours for task:', {
        taskId: task.taskId,
        hours: taskMonthlyHours
      });
      
      return total + taskMonthlyHours;
    }, 0);
    
    const totalWeeklyHours = totalMonthlyHours / TIME_CONSTANTS.WEEKS_PER_MONTH;
    
    console.log('HOURS_CALC Final calculation:', {
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

  // Wrap the task selection handler to add logging
  const handleTaskSelection = (taskId: string, isSelected: boolean, siteId?: string, siteName?: string) => {
    console.log('HOURS_CALC Task selection triggered:', {
      taskId,
      isSelected,
      siteId,
      siteName,
      currentTaskCount: selectedTasks.length
    });
    
    baseHandleTaskSelection(taskId, isSelected, siteId, siteName);
  };

  // Wrap quantity change handler to add logging
  const handleQuantityChange = (taskId: string, quantity: number) => {
    console.log('HOURS_CALC Quantity change triggered:', {
      taskId,
      quantity,
      currentTask: selectedTasks.find(t => t.taskId === taskId)
    });
    
    baseHandleQuantityChange(taskId, quantity);
  };

  // Wrap frequency change handler to add logging
  const handleFrequencyChange = (taskId: string, timesPerWeek: number) => {
    console.log('HOURS_CALC Frequency change triggered:', {
      taskId,
      timesPerWeek,
      currentTask: selectedTasks.find(t => t.taskId === taskId)
    });
    
    baseHandleFrequencyChange(taskId, timesPerWeek);
  };

  useEffect(() => {
    console.log('HOURS_CALC Tasks state changed:', {
      taskCount: selectedTasks.length,
      tasks: selectedTasks.map(task => ({
        taskId: task.taskId,
        quantity: task.quantity,
        timeRequired: task.timeRequired,
        frequency: task.frequency
      }))
    });
    
    if (selectedTasks.length > 0) {
      console.log('HOURS_CALC Recalculating hours for tasks');
      const newTotalHours = calculateTotalHours();
      console.log('HOURS_CALC New total hours calculated:', newTotalHours);
      setTotalHours(newTotalHours);
    } else {
      console.log('HOURS_CALC No tasks selected, resetting hours to 0');
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