import React, { createContext, useContext, useState, useCallback } from 'react';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
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
    siteName?: string;
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

  const handleTaskSelection = useCallback((taskId: string, isSelected: boolean) => {
    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) {
        console.warn(`Cannot add task: No rate found for ID ${taskId}`);
        return;
      }
      
      const newTask = {
        taskId,
        quantity: 0,
        timeRequired: 0,
        frequency: {
          timesPerWeek: 1,
          timesPerMonth: 4.33
        },
        selectedTool: rate.tool
      };

      setSelectedTasks(prev => {
        const updated = [...prev, newTask];
        onTasksChange(updated);
        return updated;
      });
    } else {
      setSelectedTasks(prev => {
        const updated = prev.filter(task => task.taskId !== taskId);
        onTasksChange(updated);
        return updated;
      });
    }
  }, [onTasksChange]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    setSelectedTasks(prev => {
      const updated = prev.map(task => {
        if (task.taskId === taskId) {
          const productivity = calculateTaskProductivity(
            taskId,
            quantity,
            task.selectedTool,
            task.frequency,
            task.quantity
          );
          return { 
            ...task, 
            quantity, 
            timeRequired: productivity?.timeRequired || 0 
          };
        }
        return task;
      });
      onTasksChange(updated);
      return updated;
    });
  }, [onTasksChange]);

  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number) => {
    setSelectedTasks(prev => {
      const updated = prev.map(task => {
        if (task.taskId === taskId) {
          const frequency = {
            timesPerWeek,
            timesPerMonth: timesPerWeek * 4.33
          };
          const productivity = calculateTaskProductivity(
            taskId,
            task.quantity,
            task.selectedTool,
            frequency,
            task.quantity
          );
          return { 
            ...task, 
            frequency, 
            timeRequired: productivity?.timeRequired || 0 
          };
        }
        return task;
      });
      onTasksChange(updated);
      return updated;
    });
  }, [onTasksChange]);

  const handleProductivityOverride = useCallback((taskId: string, override: number) => {
    setSelectedTasks(prev => {
      const updated = prev.map(task => {
        if (task.taskId === taskId) {
          const productivity = calculateTaskProductivity(
            taskId,
            task.quantity,
            task.selectedTool,
            task.frequency,
            task.quantity,
            override
          );
          return { 
            ...task, 
            productivityOverride: override,
            timeRequired: productivity?.timeRequired || 0 
          };
        }
        return task;
      });
      onTasksChange(updated);
      return updated;
    });
  }, [onTasksChange]);

  const handleToolChange = useCallback((taskId: string, tool: string) => {
    setSelectedTasks(prev => {
      const updated = prev.map(task => {
        if (task.taskId === taskId) {
          const productivity = calculateTaskProductivity(
            taskId,
            task.quantity,
            tool,
            task.frequency,
            task.quantity
          );
          return { 
            ...task, 
            selectedTool: tool,
            timeRequired: productivity?.timeRequired || 0 
          };
        }
        return task;
      });
      onTasksChange(updated);
      return updated;
    });
  }, [onTasksChange]);

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