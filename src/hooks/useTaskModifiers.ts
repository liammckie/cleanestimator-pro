import { useCallback } from 'react';
import { SelectedTask } from '@/components/area/task/types';
import { toast } from '@/components/ui/use-toast';

/**
 * Custom hook for task modification operations (tool, labor rate, productivity)
 * @param selectedTasks Current selected tasks array
 * @param setSelectedTasks Function to update selected tasks
 * @param calculateTaskTime Function to calculate task time
 * @returns Object containing task modifier functions
 */
export const useTaskModifiers = (
  selectedTasks: SelectedTask[],
  setSelectedTasks: (tasks: SelectedTask[] | ((prev: SelectedTask[]) => SelectedTask[])) => void,
  calculateTaskTime: any
) => {
  // Handle tool changes
  const handleToolChange = useCallback((taskId: string, tool: string) => {
    setSelectedTasks((prev: SelectedTask[]): SelectedTask[] => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTaskTime(
          taskId,
          task.quantity,
          tool,
          task.frequency
        );
        
        return {
          ...task,
          selectedTool: tool,
          timeRequired
        };
      }
      return task;
    }));
  }, [calculateTaskTime, setSelectedTasks]);

  // Handle labor rate changes
  const handleLaborRateChange = useCallback((taskId: string, rate: number) => {
    setSelectedTasks((prev: SelectedTask[]): SelectedTask[] => prev.map(task => {
      if (task.taskId === taskId) {
        return {
          ...task,
          laborRate: rate
        };
      }
      return task;
    }));
  }, [setSelectedTasks]);

  // Handle productivity override
  const handleProductivityOverride = useCallback((taskId: string, override: number) => {
    setSelectedTasks((prev: SelectedTask[]): SelectedTask[] => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTaskTime(
          taskId,
          task.quantity,
          task.selectedTool,
          task.frequency
        );
        
        return {
          ...task,
          productivityOverride: override,
          timeRequired
        };
      }
      return task;
    }));
    
    toast({
      title: "Productivity Updated",
      description: "Task productivity rate has been updated."
    });
  }, [calculateTaskTime, setSelectedTasks]);

  return {
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride
  };
};