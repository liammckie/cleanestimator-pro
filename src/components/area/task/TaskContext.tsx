import React, { createContext, useContext, useState, useCallback } from 'react';
import { getRateById } from '@/data/rates/ratesManager';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';

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

  const calculateTimeRequired = useCallback((
    taskId: string, 
    quantity: number, 
    frequency: { timesPerWeek: number; timesPerMonth: number },
    selectedTool?: string,
    productivityOverride?: number
  ): number => {
    const rate = getRateById(taskId);
    if (!rate) {
      console.warn(`No rate found for task ID: ${taskId}`);
      return 0;
    }

    // Calculate productivity with all factors
    const productivity = calculateTaskProductivity(
      taskId,
      quantity,
      selectedTool,
      frequency,
      quantity // Using quantity as area size for now
    );

    if (!productivity) return 0;

    const effectiveRate = productivityOverride || productivity.adjustedRate;
    if (!effectiveRate || effectiveRate <= 0) return 0;

    // Calculate time in minutes per month
    const timePerUnit = 60 / effectiveRate; // Convert hourly rate to minutes per unit
    const timeForQuantity = timePerUnit * quantity;
    const timePerMonth = timeForQuantity * frequency.timesPerWeek * 4; // 4 weeks per month

    return timePerMonth;
  }, []);

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
          timesPerMonth: 4
        },
        selectedTool: rate.tool // Use default tool from rate
      };

      const updatedTasks = [...selectedTasks, newTask];
      setSelectedTasks(updatedTasks);
      onTasksChange(updatedTasks);
    } else {
      const updatedTasks = selectedTasks.filter(task => task.taskId !== taskId);
      setSelectedTasks(updatedTasks);
      onTasksChange(updatedTasks);
    }
  }, [selectedTasks, onTasksChange]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    const updatedTasks = selectedTasks.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTimeRequired(
          taskId,
          quantity,
          task.frequency,
          task.selectedTool,
          task.productivityOverride
        );
        return { ...task, quantity, timeRequired };
      }
      return task;
    });
    setSelectedTasks(updatedTasks);
    onTasksChange(updatedTasks);
  }, [selectedTasks, calculateTimeRequired, onTasksChange]);

  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number) => {
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
          task.selectedTool,
          task.productivityOverride
        );
        return { ...task, frequency, timeRequired };
      }
      return task;
    });
    setSelectedTasks(updatedTasks);
    onTasksChange(updatedTasks);
  }, [selectedTasks, calculateTimeRequired, onTasksChange]);

  const handleProductivityOverride = useCallback((taskId: string, override: number) => {
    const updatedTasks = selectedTasks.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTimeRequired(
          taskId,
          task.quantity,
          task.frequency,
          task.selectedTool,
          override
        );
        return { ...task, productivityOverride: override, timeRequired };
      }
      return task;
    });
    setSelectedTasks(updatedTasks);
    onTasksChange(updatedTasks);
  }, [selectedTasks, calculateTimeRequired, onTasksChange]);

  const handleToolChange = useCallback((taskId: string, tool: string) => {
    const updatedTasks = selectedTasks.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTimeRequired(
          taskId,
          task.quantity,
          task.frequency,
          tool,
          task.productivityOverride
        );
        return { ...task, selectedTool: tool, timeRequired };
      }
      return task;
    });
    setSelectedTasks(updatedTasks);
    onTasksChange(updatedTasks);
  }, [selectedTasks, calculateTimeRequired, onTasksChange]);

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