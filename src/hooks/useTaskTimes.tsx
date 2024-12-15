import { useCallback } from 'react';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { TaskFrequency } from '@/components/area/task/types';

export const calculateTaskTime = (
  taskId: string,
  quantity: number,
  selectedTool: string | undefined,
  frequency: TaskFrequency
): number => {
  const productivity = calculateTaskProductivity(
    taskId,
    quantity,
    selectedTool,
    frequency,
    quantity
  );
  
  console.log('Task time calculation:', {
    taskId,
    quantity,
    selectedTool,
    frequency,
    productivity
  });

  return productivity?.timeRequired || 0;
};

export const useTaskTimes = () => {
  const calculateTaskTimeCallback = useCallback(calculateTaskTime, []);

  return { calculateTaskTime: calculateTaskTimeCallback };
};