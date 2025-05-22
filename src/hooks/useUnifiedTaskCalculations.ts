import { useState, useCallback, useEffect } from 'react';
import { SelectedTask, AreaData, TaskFrequency } from '@/components/area/task/types';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { TIME_CONSTANTS } from '@/utils/constants';
import { toast } from '@/components/ui/use-toast';
import { getRateById } from '@/data/rates/ratesManager';
import { v4 as uuidv4 } from 'uuid';

/**
 * Unified hook for managing task calculations and operations
 */
export const useUnifiedTaskCalculations = (
  onTasksChange?: (area: AreaData) => void,
  defaultLaborRate: number = 38
) => {
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  
  /**
   * Calculate time required for a specific task
   */
  const calculateTaskTime = useCallback((
    taskId: string,
    quantity: number,
    selectedTool: string | undefined,
    frequency: TaskFrequency
  ): number => {
    console.log('TASK_TIME_CALC: Starting calculation for task:', {
      taskId,
      quantity,
      selectedTool,
      frequency,
      timestamp: new Date().toISOString()
    });

    try {
      const productivity = calculateTaskProductivity(
        taskId,
        quantity,
        selectedTool,
        frequency,
        quantity
      );
      
      const timeRequired = productivity?.timeRequired || 0;
      const weeklyHours = timeRequired * frequency.timesPerWeek;
      const monthlyHours = timeRequired * frequency.timesPerMonth;

      console.log('TASK_TIME_CALC: Calculation completed:', {
        taskId,
        timeRequired,
        weeklyHours,
        monthlyHours,
        productivity
      });

      return timeRequired;
    } catch (error) {
      console.error('TASK_TIME_CALC: Error calculating task time:', error);
      return 0;
    }
  }, []);
  
  /**
   * Calculate total hours for all tasks
   */
  const calculateTotalHours = useCallback(() => {
    if (!selectedTasks || selectedTasks.length === 0) {
      console.log('HOURS_CALC: No tasks selected, returning 0');
      return { totalWeeklyHours: 0, totalMonthlyHours: 0 };
    }

    console.log('HOURS_CALC: Starting total hours calculation for tasks:', 
      selectedTasks.map(task => ({
        taskId: task.taskId,
        timeRequired: task.timeRequired,
        frequency: task.frequency
      }))
    );

    const totalMonthlyHours = selectedTasks.reduce((total, task) => {
      const taskMonthlyHours = task.timeRequired * task.frequency.timesPerMonth;
      return total + taskMonthlyHours;
    }, 0);
    
    const totalWeeklyHours = totalMonthlyHours / TIME_CONSTANTS.WEEKS_PER_MONTH;
    
    console.log('HOURS_CALC: Calculation completed:', {
      totalWeeklyHours,
      totalMonthlyHours,
      taskCount: selectedTasks.length
    });

    return { totalWeeklyHours, totalMonthlyHours };
  }, [selectedTasks]);
  
  /**
   * Handle task selection
   */
  const handleTaskSelection = useCallback((
    taskId: string,
    isSelected: boolean,
    siteId?: string,
    siteName?: string
  ) => {
    console.log('TASK_OPERATIONS: Handling task selection:', {
      taskId,
      isSelected,
      siteId,
      siteName,
      currentTaskCount: selectedTasks.length
    });

    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) {
        console.error('TASK_OPERATIONS: Rate not found for task:', taskId);
        toast({
          title: "Error",
          description: `Could not find rate for task ${taskId}`,
          variant: "destructive",
        });
        return;
      }

      const newTask: SelectedTask = {
        id: uuidv4(), // Add required id property
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
        name: rate.task,
        defaultTool: rate.tool
      };

      setSelectedTasks(prev => {
        const updated = [...prev, newTask];
        console.log('TASK_OPERATIONS: Added new task:', {
          newTask,
          totalTasksAfterAdd: updated.length
        });
        return updated;
      });
      
      toast({
        title: "Task Added",
        description: `${rate.task} has been added to your scope.`
      });
    } else {
      setSelectedTasks(prev => {
        const updated = prev.filter(task => 
          task.taskId !== taskId || 
          (siteId && task.siteId !== siteId)
        );
        console.log('TASK_OPERATIONS: Removed task:', {
          taskId,
          remainingTasks: updated.length
        });
        return updated;
      });
    }
  }, [selectedTasks, defaultLaborRate]);

  /**
   * Handle quantity changes
   */
  const handleQuantityChange = useCallback((taskId: string, quantity: number, siteId?: string) => {
    console.log('TASK_OPERATIONS: Updating quantity:', {
      taskId,
      newQuantity: quantity,
      siteId
    });
    
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId && (!siteId || task.siteId === siteId)) {
        const timeRequired = calculateTaskTime(
          taskId,
          quantity,
          task.selectedTool,
          task.frequency
        );
        
        console.log('TASK_OPERATIONS: Updated task time:', {
          taskId,
          quantity,
          timeRequired,
          weeklyHours: timeRequired * task.frequency.timesPerWeek,
          monthlyHours: timeRequired * task.frequency.timesPerMonth
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

  /**
   * Handle frequency changes
   */
  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number, siteId?: string) => {
    console.log('TASK_OPERATIONS: Updating frequency:', {
      taskId,
      newTimesPerWeek: timesPerWeek,
      siteId
    });
    
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId && (!siteId || task.siteId === siteId)) {
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

        console.log('TASK_OPERATIONS: Updated task frequency:', {
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

  /**
   * Handle tool changes
   */
  const handleToolChange = useCallback((taskId: string, tool: string, siteId?: string) => {
    setSelectedTasks((prev) => prev.map(task => {
      if (task.taskId === taskId && (!siteId || task.siteId === siteId)) {
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

  /**
   * Handle labor rate changes
   */
  const handleLaborRateChange = useCallback((taskId: string, rate: number, siteId?: string) => {
    setSelectedTasks((prev) => prev.map(task => {
      if (task.taskId === taskId && (!siteId || task.siteId === siteId)) {
        return {
          ...task,
          laborRate: rate
        };
      }
      return task;
    }));
  }, []);

  /**
   * Handle productivity override
   */
  const handleProductivityOverride = useCallback((taskId: string, override: number, siteId?: string) => {
    setSelectedTasks((prev) => prev.map(task => {
      if (task.taskId === taskId && (!siteId || task.siteId === siteId)) {
        return {
          ...task,
          productivityOverride: override
        };
      }
      return task;
    }));
    
    toast({
      title: "Productivity Updated",
      description: "Task productivity rate has been updated."
    });
  }, []);

  // Update area data whenever tasks change
  useEffect(() => {
    if (onTasksChange) {
      const { totalWeeklyHours, totalMonthlyHours } = calculateTotalHours();
      const totalLaborCost = selectedTasks.reduce((sum, task) => {
        const hourlyRate = task.laborRate || defaultLaborRate;
        const taskCost = task.timeRequired * hourlyRate * task.frequency.timesPerMonth;
        return sum + taskCost;
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
        totalTime: totalMonthlyHours,
        totalLaborCost
      };

      console.log('AREA_UPDATE: Updating area data:', {
        totalMonthlyHours,
        totalLaborCost,
        taskCount: selectedTasks.length
      });

      onTasksChange(areaData);
    }
  }, [selectedTasks, onTasksChange, defaultLaborRate, calculateTotalHours]);

  // Calculate current total hours
  const { totalWeeklyHours, totalMonthlyHours } = calculateTotalHours();

  return {
    selectedTasks,
    setSelectedTasks,
    calculateTaskTime,
    calculateTotalHours,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalWeeklyHours,
    totalMonthlyHours
  };
};
