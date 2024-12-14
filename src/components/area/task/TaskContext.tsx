import React, { createContext, useContext, useState } from 'react';
import { getRateById } from '@/data/rates/ratesManager';

interface TaskContextType {
  selectedTasks: Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    productivityOverride?: number;
    selectedTool?: string;
  }>;
  handleTaskSelection: (taskId: string, isSelected: boolean) => void;
  handleQuantityChange: (taskId: string, quantity: number) => void;
  handleFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  handleProductivityOverride: (taskId: string, override: number) => void;
  handleToolChange: (taskId: string, tool: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{
  children: React.ReactNode;
  onTasksChange: (tasks: TaskContextType['selectedTasks']) => void;
}> = ({ children, onTasksChange }) => {
  const [selectedTasks, setSelectedTasks] = useState<TaskContextType['selectedTasks']>([]);

  const calculateTimeRequired = (
    taskId: string, 
    quantity: number, 
    frequency: { timesPerWeek: number; timesPerMonth: number }, 
    productivityOverride?: number
  ): number => {
    const rate = getRateById(taskId);
    if (!rate) return 0;
    
    const ratePerHour = productivityOverride || rate.ratePerHour;
    if (!ratePerHour || ratePerHour <= 0) return 0;
    
    const baseTime = quantity / ratePerHour;
    return baseTime * (frequency?.timesPerWeek || 1) * 4;
  };

  const handleTaskSelection = (taskId: string, isSelected: boolean) => {
    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) return;
      
      const newTask = {
        taskId,
        quantity: 0,
        timeRequired: 0,
        frequency: {
          timesPerWeek: 1,
          timesPerMonth: 4
        }
      };
      const updatedTasks = [...selectedTasks, newTask];
      setSelectedTasks(updatedTasks);
      onTasksChange(updatedTasks);
    } else {
      const updatedTasks = selectedTasks.filter(task => task.taskId !== taskId);
      setSelectedTasks(updatedTasks);
      onTasksChange(updatedTasks);
    }
  };

  const handleQuantityChange = (taskId: string, quantity: number) => {
    const updatedTasks = selectedTasks.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTimeRequired(
          taskId, 
          quantity, 
          task.frequency, 
          task.productivityOverride
        );
        return { ...task, quantity, timeRequired };
      }
      return task;
    });
    setSelectedTasks(updatedTasks);
    onTasksChange(updatedTasks);
  };

  const handleFrequencyChange = (taskId: string, timesPerWeek: number) => {
    const updatedTasks = selectedTasks.map(task => {
      if (task.taskId === taskId) {
        const frequency = {
          timesPerWeek,
          timesPerMonth: timesPerWeek * 4
        };
        const timeRequired = calculateTimeRequired(
          taskId, 
          task.quantity, 
          frequency, 
          task.productivityOverride
        );
        return { ...task, frequency, timeRequired };
      }
      return task;
    });
    setSelectedTasks(updatedTasks);
    onTasksChange(updatedTasks);
  };

  const handleProductivityOverride = (taskId: string, override: number) => {
    const updatedTasks = selectedTasks.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTimeRequired(
          taskId, 
          task.quantity, 
          task.frequency, 
          override
        );
        return { ...task, productivityOverride: override, timeRequired };
      }
      return task;
    });
    setSelectedTasks(updatedTasks);
    onTasksChange(updatedTasks);
  };

  const handleToolChange = (taskId: string, tool: string) => {
    const updatedTasks = selectedTasks.map(task => {
      if (task.taskId === taskId) {
        return { ...task, selectedTool: tool };
      }
      return task;
    });
    setSelectedTasks(updatedTasks);
    onTasksChange(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{
      selectedTasks,
      handleTaskSelection,
      handleQuantityChange,
      handleFrequencyChange,
      handleProductivityOverride,
      handleToolChange
    }}>
      {children}
    </TaskContext.Provider>
  );
};