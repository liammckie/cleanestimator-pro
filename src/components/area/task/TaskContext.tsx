import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTaskTimes } from '@/hooks/useTaskTimes';
import { validateTaskData } from '@/utils/taskValidation';
import { getRateById } from '@/data/rates/ratesManager';
import { toast } from '@/components/ui/use-toast';

interface TaskContextType {
  selectedTasks: Array<{
    taskId: string;
    siteId?: string;
    siteName?: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    productivityOverride?: number;
    selectedTool?: string;
  }>;
  handleTaskSelection: (taskId: string, isSelected: boolean, siteId?: string, siteName?: string) => void;
  handleQuantityChange: (taskId: string, quantity: number) => void;
  handleFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  handleProductivityOverride: (taskId: string, override: number) => void;
  handleToolChange: (taskId: string, tool: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);
const SELECTED_TASKS_KEY = 'selected-tasks-context';

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
  const [selectedTasks, setSelectedTasks] = useState<TaskContextType['selectedTasks']>(() => {
    const savedTasks = localStorage.getItem(SELECTED_TASKS_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const { calculateTaskTime } = useTaskTimes();

  useEffect(() => {
    localStorage.setItem(SELECTED_TASKS_KEY, JSON.stringify(selectedTasks));
    console.log('Tasks updated:', selectedTasks);
    onTasksChange(selectedTasks);
  }, [selectedTasks, onTasksChange]);

  const handleTaskSelection = useCallback((taskId: string, isSelected: boolean, siteId?: string, siteName?: string) => {
    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) {
        console.warn(`Cannot add task: No rate found for ID ${taskId}`);
        return;
      }
      
      const newTask = {
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

      setSelectedTasks(prev => {
        const updated = [...prev, newTask];
        console.log('Added new task:', { newTask, updated });
        return updated;
      });
    } else {
      setSelectedTasks(prev => {
        const updated = prev.filter(task => 
          !(task.taskId === taskId && task.siteId === siteId)
        );
        console.log('Removed task:', { taskId, siteId, updated });
        return updated;
      });
    }
  }, []);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const rate = getRateById(taskId);
        if (!validateTaskData(taskId, quantity, rate)) return task;
        
        const timeRequired = calculateTaskTime(
          taskId,
          quantity,
          task.selectedTool,
          task.frequency
        );
        
        console.log('Updated task quantity:', {
          taskId,
          quantity,
          timeRequired
        });

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

        console.log('Updated task frequency:', {
          taskId,
          frequency,
          timeRequired
        });

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
          productivityOverride: override,
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

        console.log('Updated tool selection:', {
          taskId,
          tool,
          timeRequired
        });

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