
import { SelectedTask, TaskFrequency } from '@/components/area/task/types';
import { getRateById } from '@/data/rates/ratesManager';

/**
 * Create a consistent task object from minimal data
 */
export const createTaskObject = (
  taskId: string,
  siteId?: string,
  siteName?: string,
): SelectedTask => {
  const rateDetails = getRateById(taskId);
  
  return {
    id: taskId,
    taskId,
    siteId,
    siteName,
    taskName: rateDetails?.task || `Task ${taskId.slice(0, 8)}...`,
    quantity: 0,
    timeRequired: 0,
    frequency: {
      timesPerWeek: 1,
      timesPerMonth: 4.33
    },
    laborRate: 38, // Default labor rate
    selectedTool: rateDetails?.tool,
    defaultTool: rateDetails?.tool,
  };
};

/**
 * Format weekly hours for display
 */
export const formatHours = (hours: number): string => {
  return hours.toFixed(2);
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Calculate monthly hours from weekly hours
 */
export const calculateMonthlyHours = (weeklyHours: number): number => {
  return weeklyHours * 4.33;
};

/**
 * Calculate weekly hours from monthly hours
 */
export const calculateWeeklyHours = (monthlyHours: number): number => {
  return monthlyHours / 4.33;
};

/**
 * Parse frequency input which might be a number or an object
 */
export const parseFrequency = (frequency: TaskFrequency | number): TaskFrequency => {
  if (typeof frequency === 'number') {
    return {
      timesPerWeek: frequency,
      timesPerMonth: frequency * 4.33
    };
  }
  return frequency;
};

/**
 * Calculate total monthly cost for a task
 */
export const calculateTaskMonthlyCost = (task: SelectedTask): number => {
  const hourlyRate = task.laborRate || 38;
  return task.timeRequired * hourlyRate * task.frequency.timesPerMonth;
};
