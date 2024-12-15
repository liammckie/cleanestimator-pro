import { useState, useCallback, useEffect } from 'react';
import { SelectedTask, AreaData } from '@/components/area/task/types';
import { useTaskTimes } from './useTaskTimes';
import { toast } from '@/components/ui/use-toast';
import { validateTaskData } from '@/utils/taskValidation';
import { getRateById } from '@/data/rates/ratesManager';

/**
 * Custom hook for managing task-related state and operations
 * @param onTasksChange Callback function when tasks are updated
 * @param defaultLaborRate Default labor rate for new tasks
 * @returns Object containing task state and management functions
 */
export const useTaskManagement = (
  onTasksChange?: (area: AreaData) => void,
  defaultLaborRate: number = 38
) => {
  // Main state for selected tasks
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  const { calculateTaskTime } = useTaskTimes();

  // Update area data whenever tasks change
  useEffect(() => {
    if (onTasksChange) {
      const totalTime = selectedTasks.reduce((sum, task) => sum + (task.timeRequired || 0), 0);
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
        totalTime,
        totalLaborCost
      };

      console.log('Updating area data:', areaData);
      onTasksChange(areaData);
    }
  }, [selectedTasks, onTasksChange, defaultLaborRate]);

  return {
    selectedTasks,
    setSelectedTasks,
    calculateTaskTime
  };
};