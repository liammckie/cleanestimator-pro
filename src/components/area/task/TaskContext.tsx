import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { toast } from '@/components/ui/use-toast';
import { getTaskById } from '@/data/tasks/cleaningProductivityRates';
import { TaskContextType, SelectedTask } from './types';
import { calculateTaskTime } from '@/hooks/useTaskTimes';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: React.ReactNode;
  onTasksChange?: (data: any) => void;
  defaultLaborRate?: number;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({
  children,
  onTasksChange,
  defaultLaborRate = 38
}) => {
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>(() => {
    try {
      const savedTasks = localStorage.getItem('selectedTasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  });

  const handleTaskSelection = (taskId: string, isSelected: boolean, siteId?: string, siteName?: string) => {
    if (isSelected) {
      const task = getTaskById(taskId);
      if (!task) {
        toast({
          title: "Error",
          description: "Task not found",
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
        selectedTool: task.defaultTool,
        laborRate: defaultLaborRate
      };

      setSelectedTasks(prev => [...prev, newTask]);
      
      toast({
        title: "Task Added",
        description: `${task.name} has been added to your scope.`
      });
    } else {
      setSelectedTasks(prev => 
        prev.filter(task => !(task.taskId === taskId && task.siteId === siteId))
      );
    }
  };

  const handleQuantityChange = (taskId: string, quantity: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTaskTime(
          taskId,
          quantity,
          task.selectedTool,
          task.frequency
        );
        return { ...task, quantity, timeRequired };
      }
      return task;
    }));
  };

  const handleFrequencyChange = (taskId: string, timesPerWeek: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const frequency = {
          timesPerWeek,
          timesPerMonth: timesPerWeek * 4.33
        };
        const timeRequired = calculateTaskTime(
          taskId,
          task.quantity,
          task.selectedTool,
          frequency
        );
        return { ...task, frequency, timeRequired };
      }
      return task;
    }));
  };

  const handleToolChange = (taskId: string, tool: string) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTaskTime(
          taskId,
          task.quantity,
          tool,
          task.frequency
        );
        return { ...task, selectedTool: tool, timeRequired };
      }
      return task;
    }));
  };

  const handleLaborRateChange = (taskId: string, rate: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        return { ...task, laborRate: rate };
      }
      return task;
    }));
  };

  const handleProductivityOverride = (taskId: string, override: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTaskTime(
          taskId,
          task.quantity,
          task.selectedTool,
          task.frequency
        );
        return { ...task, productivityOverride: override, timeRequired };
      }
      return task;
    }));
  };

  const { totalWeeklyHours, totalMonthlyHours } = useMemo(() => {
    const monthlyHours = selectedTasks.reduce((total, task) => 
      total + (task.timeRequired * task.frequency.timesPerMonth), 0);
    
    return {
      totalMonthlyHours: monthlyHours,
      totalWeeklyHours: monthlyHours / 4.33
    };
  }, [selectedTasks]);

  useEffect(() => {
    localStorage.setItem('selectedTasks', JSON.stringify(selectedTasks));
    
    if (onTasksChange) {
      onTasksChange({
        selectedTasks,
        totalMonthlyHours,
        totalLaborCost: totalMonthlyHours * defaultLaborRate
      });
    }
  }, [selectedTasks, totalMonthlyHours, onTasksChange, defaultLaborRate]);

  const contextValue = {
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalWeeklyHours,
    totalMonthlyHours
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};