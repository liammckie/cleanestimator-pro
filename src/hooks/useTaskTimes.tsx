
import { useCallback } from 'react';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import type { TaskFrequency } from '@/components/area/task/types';

export const calculateTaskTime = (
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
};

export const useTaskTimes = () => {
  console.log('TASK_TIME: useTaskTimes hook initialized');
  
  const calculateTaskTimeCallback = useCallback(calculateTaskTime, []);
  
  return { calculateTaskTime: calculateTaskTimeCallback };
};
