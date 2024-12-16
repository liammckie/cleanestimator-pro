import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { toast } from '@/components/ui/use-toast';
import { getTaskById } from '@/data/tasks/cleaningProductivityRates';

interface TaskFrequency {
  timesPerWeek: number;
  timesPerMonth: number;
}

export interface SelectedTask {
  taskId: string;
  quantity: number;
  timeRequired: number;
  frequency: TaskFrequency;
  siteName?: string;
  siteId?: string;
}

interface TaskContextType {
  selectedTasks: SelectedTask[];
  totalWeeklyHours: number;
  totalMonthlyHours: number;
  handleTaskSelection: (taskId: string, isSelected: boolean, siteId?: string, siteName?: string) => void;
  handleQuantityChange: (taskId: string, quantity: number) => void;
  handleFrequencyChange: (taskId: string, timesPerWeek: number) => void;
}

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

  const calculateTaskTime = (taskId: string, quantity: number, frequency: TaskFrequency): number => {
    const task = getTaskById(taskId);
    if (!task || quantity <= 0) return 0;

    const hoursPerService = quantity / task.productivityRate;
    return hoursPerService;
  };

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
        }
      };

      setSelectedTasks(prev => [...prev, newTask]);
      
      toast({
        title: "Task Added",
        description: `${task.taskName} has been added to your scope.`
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
          frequency
        );
        return { ...task, frequency, timeRequired };
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

  const contextValue = useMemo(() => ({
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    totalWeeklyHours,
    totalMonthlyHours
  }), [
    selectedTasks,
    totalWeeklyHours,
    totalMonthlyHours
  ]);

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