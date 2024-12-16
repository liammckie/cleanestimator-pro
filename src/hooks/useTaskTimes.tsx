import { useCallback } from 'react';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { TaskFrequency } from '@/components/area/task/types';

export const calculateTaskTime = (
  taskId: string,
  quantity: number,
  selectedTool: string | undefined,
  frequency: TaskFrequency
): number => {
  console.log('DEBUG: calculateTaskTime called with:', {
    taskId,
    quantity,
    selectedTool,
    frequency
  });

  const productivity = calculateTaskProductivity(
    taskId,
    quantity,
    selectedTool,
    frequency,
    quantity
  );
  
  console.log('DEBUG: Task time calculation result:', {
    taskId,
    productivity
  });

  return productivity?.timeRequired || 0;
};

export const useTaskTimes = () => {
  const calculateTaskTimeCallback = useCallback(calculateTaskTime, []);
  return { calculateTaskTime: calculateTaskTimeCallback };
};