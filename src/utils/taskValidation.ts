import { SelectedTask } from '@/components/area/task/types';

export const validateTaskData = (task: SelectedTask, quantity: number): boolean => {
  if (!task || quantity < 0) return false;
  
  // Basic validation checks
  if (!task.taskId || !task.frequency) return false;
  
  // Validate frequency
  if (task.frequency.timesPerWeek < 1 || task.frequency.timesPerWeek > 7) return false;
  if (task.frequency.timesPerMonth < 1 || task.frequency.timesPerMonth > 31) return false;
  
  return true;
};