import { toast } from "@/components/ui/use-toast";
import { CleaningTask, SelectedTask } from "@/data/types/taskManagement";

export const calculateManHours = (
  task: CleaningTask,
  quantity: number,
  frequency: { timesPerWeek: number; timesPerMonth: number }
): number => {
  if (!quantity || quantity <= 0) {
    toast({
      title: "Invalid Quantity",
      description: "Please enter a valid quantity greater than 0.",
      variant: "destructive",
    });
    return 0;
  }

  const baseHours = task.measurementUnit === 'SQM/hour' 
    ? quantity / task.productivityRate 
    : quantity / task.productivityRate;

  // Calculate monthly hours based on frequency
  return baseHours * frequency.timesPerMonth;
};

export const validateTaskInput = (
  task: CleaningTask,
  quantity: number
): boolean => {
  if (!quantity || quantity <= 0) {
    toast({
      title: "Invalid Input",
      description: `Please enter a valid ${task.measurementUnit === 'SQM/hour' ? 'area' : 'unit count'} for ${task.taskName}`,
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const calculateTotalManHours = (tasks: SelectedTask[]): number => {
  return tasks.reduce((total, task) => total + task.manHours, 0);
};