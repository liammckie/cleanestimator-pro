import { useState, useCallback, useEffect } from 'react';
import { SelectedTask, AreaData } from '@/components/area/task/types';
import { useTaskTimes } from './useTaskTimes';
import { TIME_CONSTANTS } from '@/utils/constants';

export const useTaskInitialization = (
  onTasksChange?: (area: AreaData) => void,
  defaultLaborRate: number = 38
) => {
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  const { calculateTaskTime } = useTaskTimes();
  
  const calculateTotalHours = useCallback(() => {
    if (!selectedTasks || selectedTasks.length === 0) {
      return { totalWeeklyHours: 0, totalMonthlyHours: 0 };
    }

    const totalMonthlyHours = selectedTasks.reduce((total, task) => 
      total + (task.timeRequired || 0), 0);
    
    const totalWeeklyHours = totalMonthlyHours / TIME_CONSTANTS.WEEKS_PER_MONTH;
    
    return { totalWeeklyHours, totalMonthlyHours };
  }, [selectedTasks]);

  useEffect(() => {
    if (onTasksChange) {
      const { totalWeeklyHours, totalMonthlyHours } = calculateTotalHours();
      const totalLaborCost = selectedTasks.reduce((sum, task) => {
        const hourlyRate = task.laborRate || defaultLaborRate;
        return sum + (task.timeRequired * hourlyRate);
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

      onTasksChange(areaData);
    }
  }, [selectedTasks, onTasksChange, defaultLaborRate, calculateTotalHours]);

  return {
    selectedTasks,
    setSelectedTasks,
    calculateTaskTime,
    calculateTotalHours
  };
};