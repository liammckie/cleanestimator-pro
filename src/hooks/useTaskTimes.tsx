import { useCallback } from 'react';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { TaskFrequency } from '@/components/area/task/types';

export const calculateTaskTime = (
  taskId: string,
  quantity: number,
  selectedTool: string | undefined,
  frequency: TaskFrequency
): number => {
  console.log('TASK_FLOW: calculateTaskTime called with:', {
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
    
    console.log('TASK_FLOW: Task time calculation result:', {
      taskId,
      productivity,
      timeRequired: productivity?.timeRequired || 0
    });

    return productivity?.timeRequired || 0;
  } catch (error) {
    console.error('TASK_FLOW: Error calculating task time:', error);
    return 0;
  }
};

export const useTaskTimes = () => {
  console.log('TASK_FLOW: useTaskTimes hook initialized');
  
  const calculateTaskTimeCallback = useCallback(calculateTaskTime, []);
  
  return { calculateTaskTime: calculateTaskTimeCallback };
};