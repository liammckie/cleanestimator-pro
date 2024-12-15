import { useCallback } from 'react';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';

export const useTaskTimes = () => {
  const calculateTaskTime = useCallback((
    taskId: string,
    quantity: number,
    selectedTool: string | undefined,
    frequency: { timesPerWeek: number; timesPerMonth: number }
  ) => {
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
  }, []);

  return { calculateTaskTime };
};