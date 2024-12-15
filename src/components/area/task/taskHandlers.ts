import { SelectedTask, TaskFrequency } from './types';
import { getRateById } from '@/data/rates/ratesManager';
import { validateTaskData } from '@/utils/taskValidation';
import { calculateTaskTime } from '@/hooks/useTaskTimes';

export const createNewTask = (
  taskId: string,
  siteId?: string,
  siteName?: string
): SelectedTask => {
  const rate = getRateById(taskId);
  return {
    taskId,
    siteId,
    siteName,
    quantity: 0,
    timeRequired: 0,
    frequency: {
      timesPerWeek: 1,
      timesPerMonth: 4.33
    },
    selectedTool: rate?.tool
  };
};

export const updateTaskTime = (
  task: SelectedTask,
  quantity: number,
  selectedTool: string | undefined,
  frequency: TaskFrequency
): number => {
  return calculateTaskTime(
    task.taskId,
    quantity,
    selectedTool,
    frequency
  );
};