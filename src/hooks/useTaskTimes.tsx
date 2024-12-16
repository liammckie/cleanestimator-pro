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
    
    console.log('DEBUG: Task time calculation result:', {
      taskId,
      productivity,
      timeRequired: productivity?.timeRequired || 0
    });

    return productivity?.timeRequired || 0;
  } catch (error) {
    console.error('DEBUG: Error calculating task time:', error);
    return 0;
  }
};

export const useTaskTimes = () => {
  const calculateTaskTimeCallback = useCallback(calculateTaskTime, []);
  
  console.log('DEBUG: useTaskTimes hook initialized');
  
  return { calculateTaskTime: calculateTaskTimeCallback };
};