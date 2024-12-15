import { CleaningTask } from '../data/types/cleaning';

export const calculateTaskTime = (
  task: CleaningTask,
  quantity: number,
  frequency: { timesPerWeek: number; timesPerMonth: number }
): number => {
  if (!task || quantity <= 0) return 0;
  
  const timePerUnit = 1 / task.rate; // Hours per unit
  const timePerService = timePerUnit * quantity;
  const monthlyTime = timePerService * frequency.timesPerWeek * 4.33; // Average weeks per month
  
  return monthlyTime;
};

export const validateTaskQuantity = (
  task: CleaningTask,
  quantity: number
): boolean => {
  if (!task || quantity <= 0) return false;
  return true;
};

export const formatTaskRate = (task: CleaningTask): string => {
  return `${task.rate} ${task.unit}`;
};