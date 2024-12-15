import { SelectedTask } from '@/components/area/task/types';
import { toast } from '@/components/ui/use-toast';

export const validateTaskData = (task: SelectedTask, quantity: number): boolean => {
  if (!task || quantity < 0) {
    toast({
      title: "Invalid Input",
      description: "Please enter a valid quantity",
      variant: "destructive"
    });
    return false;
  }
  
  // Basic validation checks
  if (!task.taskId || !task.frequency) {
    toast({
      title: "Invalid Task",
      description: "Task data is incomplete",
      variant: "destructive"
    });
    return false;
  }
  
  // Validate frequency
  if (task.frequency.timesPerWeek < 1 || task.frequency.timesPerWeek > 7) {
    toast({
      title: "Invalid Frequency",
      description: "Frequency must be between 1 and 7 times per week",
      variant: "destructive"
    });
    return false;
  }

  // Validate labor rate
  if (!task.laborRate || task.laborRate <= 0) {
    toast({
      title: "Invalid Labor Rate",
      description: "Please set a valid labor rate",
      variant: "destructive"
    });
    return false;
  }
  
  return true;
};