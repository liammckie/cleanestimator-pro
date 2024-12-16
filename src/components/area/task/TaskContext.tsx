import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { TaskContextType, SelectedTask } from './types';
import { useTaskTimes } from '@/hooks/useTaskTimes';
import { useTaskOperations } from '@/hooks/useTaskOperations';
import { useTaskModifiers } from '@/hooks/useTaskModifiers';
import { toast } from '@/components/ui/use-toast';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: React.ReactNode;
  onTasksChange?: (area: any) => void;
  defaultLaborRate?: number;
}

export const TaskProvider = React.memo(({ 
  children, 
  onTasksChange,
  defaultLaborRate = 38 
}: TaskProviderProps) => {
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>(() => {
    try {
      const savedTasks = localStorage.getItem('selectedTasks');
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
      console.log('TASK_FLOW: Loaded tasks from storage:', parsedTasks);
      return parsedTasks;
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  });

  const { calculateTaskTime } = useTaskTimes();

  const {
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange
  } = useTaskOperations(selectedTasks, setSelectedTasks, calculateTaskTime, defaultLaborRate);

  const {
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride
  } = useTaskModifiers(selectedTasks, setSelectedTasks, calculateTaskTime);

  const calculateTotalHours = useCallback(() => {
    if (!selectedTasks || selectedTasks.length === 0) {
      return { totalWeeklyHours: 0, totalMonthlyHours: 0 };
    }

    const totalMonthlyHours = selectedTasks.reduce((total, task) => {
      return total + (task.timeRequired * task.frequency.timesPerMonth);
    }, 0);

    const totalWeeklyHours = totalMonthlyHours / 4.33;

    console.log('TASK_FLOW: Hours calculation:', {
      totalWeeklyHours,
      totalMonthlyHours,
      selectedTasksCount: selectedTasks.length,
      tasks: selectedTasks
    });

    return { totalWeeklyHours, totalMonthlyHours };
  }, [selectedTasks]);

  const { totalWeeklyHours, totalMonthlyHours } = useMemo(() => 
    calculateTotalHours(),
    [calculateTotalHours]
  );

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('selectedTasks', JSON.stringify(selectedTasks));
      console.log('TASK_FLOW: Tasks saved to localStorage:', {
        taskCount: selectedTasks.length,
        tasks: selectedTasks
      });
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      toast({
        title: "Error",
        description: "Failed to save tasks to local storage",
        variant: "destructive",
      });
    }
  }, [selectedTasks]);

  // Update area data when tasks change
  useEffect(() => {
    if (onTasksChange) {
      const areaData = {
        squareMeters: selectedTasks.reduce((sum, task) => sum + (task.quantity || 0), 0),
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
        totalTime: totalMonthlyHours,
        totalLaborCost: selectedTasks.reduce((sum, task) => {
          const hourlyRate = task.laborRate || defaultLaborRate;
          return sum + (task.timeRequired * hourlyRate * task.frequency.timesPerMonth);
        }, 0)
      };

      console.log('TASK_FLOW: Updating area data:', {
        totalMonthlyHours,
        totalLaborCost: areaData.totalLaborCost,
        taskCount: selectedTasks.length,
        tasks: selectedTasks
      });

      onTasksChange(areaData);
    }
  }, [selectedTasks, totalMonthlyHours, onTasksChange, defaultLaborRate]);

  const contextValue = useMemo(() => ({
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalWeeklyHours,
    totalMonthlyHours
  }), [
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalWeeklyHours,
    totalMonthlyHours
  ]);

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
});

TaskProvider.displayName = 'TaskProvider';

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};