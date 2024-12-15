import { toast } from "@/components/ui/use-toast";
import { ProductivityRate } from '@/data/types/productivity';

export const validateTaskData = (
  taskId: string,
  quantity: number,
  rate?: ProductivityRate
) => {
  if (!rate) {
    console.error('No productivity rate found for task:', taskId);
    toast({
      title: "Task Error",
      description: "Could not find productivity rate for task",
      variant: "destructive"
    });
    return false;
  }

  if (!quantity || quantity <= 0) {
    console.error('Invalid quantity for task:', taskId);
    toast({
      title: "Invalid Input",
      description: "Please enter a valid quantity greater than 0",
      variant: "destructive"
    });
    return false;
  }

  return true;
};