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

  useEffect(() => {
    if (onTasksChange) {
      const totalTime = selectedTasks.reduce((sum, task) => sum + (task.timeRequired || 0), 0);
      const totalLaborCost = selectedTasks.reduce((sum, task) => {
        const hourlyRate = task.laborRate || defaultLaborRate;
        return sum + (task.timeRequired * hourlyRate);
      }, 0);

      const areaData: AreaData = {
        squareMeters: 0,
        spaceType: '',
        industryType: '',
        selectedTasks: selectedTasks.map(task => ({
          taskId: task.taskId,
          quantity: task.quantity,
          timeRequired: task.timeRequired,
          frequency: task.frequency,
          productivityOverride: task.productivityOverride,
          selectedTool: task.selectedTool,
          laborRate: task.laborRate || defaultLaborRate
        })),
        totalTime,
        totalLaborCost
      };

      console.log('Updating area data:', areaData);
      onTasksChange(areaData);
    }
  }, [selectedTasks, onTasksChange, defaultLaborRate]);

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
        laborRate: defaultLaborRate
      };

      setSelectedTasks(prev => [...prev, newTask]);
      
      toast({
        title: "Task Added",
        description: `${rate.task} has been added to your scope.`
      });
    } else {
      setSelectedTasks(prev => prev.filter(task => task.taskId !== taskId));
      
      toast({
        title: "Task Removed",
        description: "Task has been removed from the scope."
      });
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

  const handleLaborRateChange = useCallback((taskId: string, rate: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        return {
          ...task,
          laborRate: rate
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

  const handleProductivityOverride = useCallback((taskId: string, override: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTaskTime(
          taskId,
          task.quantity,
          task.selectedTool,
          task.frequency
        );
        
        return {
          ...task,
          productivityOverride: override,
          timeRequired
        };
      }
      return task;
    }));
    
    toast({
      title: "Productivity Updated",
      description: "Task productivity rate has been updated."
    });
  }, [calculateTaskTime]);

  const value = {
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride
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
