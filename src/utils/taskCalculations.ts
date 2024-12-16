import { SelectedTask } from '@/components/task/types';

export const calculateTaskTime = (task: SelectedTask, quantity: number): number => {
  console.log('TASK_MANAGEMENT Calculating time for task:', {
    taskId: task.id,
    quantity,
    frequency: task.frequency
  });

  if (!quantity || quantity <= 0) {
    console.log('TASK_MANAGEMENT Invalid quantity, returning 0');
    return 0;
  }

  // Basic calculation for now - can be enhanced with productivity rates
  const timeRequired = quantity / (task.productivityOverride || 1);
  
  console.log('TASK_MANAGEMENT Time calculated:', {
    taskId: task.id,
    timeRequired
  });
  
  return timeRequired;
};