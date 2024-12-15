import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTaskTimes } from '@/hooks/useTaskTimes';
import { validateTaskData } from '@/utils/taskValidation';
import { getRateById } from '@/data/rates/ratesManager';
import { toast } from '@/components/ui/use-toast';
import { TaskContextType, SelectedTask, AreaData } from './types';

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
  const { calculateTaskTime } = useTaskTimes();

  const calculateTotalLaborCost = useCallback((tasks: SelectedTask[]): number => {
    return tasks.reduce((total, task) => {
      const hourlyRate = task.laborRate || defaultLaborRate;
      const monthlyHours = task.timeRequired;
      return total + (hourlyRate * monthlyHours);
    }, 0);
  }, [defaultLaborRate]);

  useEffect(() => {
    if (onTasksChange) {
      const totalTime = selectedTasks.reduce((sum, task) => sum + (task.timeRequired || 0), 0);
      const totalLaborCost = calculateTotalLaborCost(selectedTasks);
      
      const areaData: AreaData = {
        squareMeters: 0, // This should come from area input
        spaceType: '',
        industryType: '',
        selectedTasks,
        totalTime,
        totalLaborCost
      };
      
      onTasksChange(areaData);
    }
  }, [selectedTasks, onTasksChange, calculateTotalLaborCost]);

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
        selectedTool: rate.tool,
        laborRate: defaultLaborRate,
        laborType: 'contracted'
      };

      setSelectedTasks(prev => [...prev, newTask]);
    } else {
      setSelectedTasks(prev => prev.filter(task => task.taskId !== taskId));
    }
  }, [defaultLaborRate]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        if (!validateTaskData(task, quantity)) return task;
        
        const timeRequired = calculateTaskTime(
          taskId,
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
          taskId,
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

  const handleLaborRateChange = useCallback((taskId: string, rate: number, type: 'contracted' | 'direct') => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        return {
          ...task,
          laborRate: rate,
          laborType: type
        };
      }
      return task;
    }));
  }, []);

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
          taskId,
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
    handleToolChange,
    handleLaborRateChange
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