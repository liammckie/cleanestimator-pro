import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTaskTimes } from '@/hooks/useTaskTimes';
import { validateTaskData } from '@/utils/taskValidation';
import { getRateById } from '@/data/rates/ratesManager';
import { toast } from '@/components/ui/use-toast';
import { TaskContextType, SelectedTask } from './types';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{
  children: React.ReactNode;
  onTasksChange?: (tasks: SelectedTask[]) => void;
}> = ({ children, onTasksChange }) => {
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  const { calculateTaskTime } = useTaskTimes();

  useEffect(() => {
    console.log('Tasks updated:', selectedTasks);
    onTasksChange?.(selectedTasks);
  }, [selectedTasks, onTasksChange]);

  const handleTaskSelection = useCallback((taskId: string, isSelected: boolean, siteId?: string, siteName?: string) => {
    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) {
        toast({
          title: "Error",
          description: `Could not find rate for task ${taskId}`,
          variant: "destructive",
        });
        return;
      }

      const newTask: SelectedTask = {
        taskId,
        siteId,
        siteName,
        quantity: 0,
        timeRequired: 0,
        frequency: {
          timesPerWeek: 1,
          timesPerMonth: 4.33
        },
        selectedTool: rate.tool
      };

      setSelectedTasks(prev => [...prev, newTask]);
    } else {
      setSelectedTasks(prev => prev.filter(task => task.taskId !== taskId));
    }
  }, []);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        if (!validateTaskData(task, quantity)) return task;
        
        const timeRequired = calculateTaskTime(
          task.taskId,
          quantity,
          task.selectedTool,
          task.frequency
        );
        
        return {
          ...task,
          quantity,
          timeRequired
        };
      }
      return task;
    }));
  }, [calculateTaskTime]);

  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const frequency = {
          timesPerWeek,
          timesPerMonth: timesPerWeek * 4.33
        };
        
        const timeRequired = calculateTaskTime(
          task.taskId,
          task.quantity,
          task.selectedTool,
          frequency
        );
        
        return {
          ...task,
          frequency,
          timeRequired
        };
      }
      return task;
    }));
  }, [calculateTaskTime]);

  const handleProductivityOverride = useCallback((taskId: string, override: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        return {
          ...task,
          productivityOverride: override
        };
      }
      return task;
    }));
  }, []);

  const handleToolChange = useCallback((taskId: string, tool: string) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTaskTime(
          task.taskId,
          task.quantity,
          tool,
          task.frequency
        );
        
        return {
          ...task,
          selectedTool: tool,
          timeRequired
        };
      }
      return task;
    }));
  }, [calculateTaskTime]);

  const value = {
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleProductivityOverride,
    handleToolChange
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