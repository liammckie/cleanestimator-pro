import { useCallback } from 'react';
import { SelectedTask } from '@/components/area/task/types';
import { toast } from '@/components/ui/use-toast';
import { getRateById } from '@/data/rates/ratesManager';
import { validateTaskData } from '@/utils/taskValidation';

export const useTaskOperations = (
  selectedTasks: SelectedTask[],
  setSelectedTasks: (tasks: SelectedTask[]) => void,
  calculateTaskTime: any,
  defaultLaborRate: number = 38
) => {
  const handleTaskSelection = useCallback((
    taskId: string,
    isSelected: boolean,
    siteId?: string,
    siteName?: string
  ) => {
    console.log('DEBUG: useTaskOperations - handleTaskSelection:', {
      taskId,
      isSelected,
      siteId,
      siteName
    });

    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) {
        console.error('DEBUG: Could not find rate for task:', taskId);
        toast({
          title: "Error",
          description: `Could not find rate for task ${taskId}`,
          variant: "destructive",
        });
        return;
      }

      console.log('DEBUG: Found rate for task:', rate);

      const newTask: SelectedTask = {
        taskId,
        siteId,
        siteName,
        quantity: 0,
        timeRequired: 0,
        frequency: {
          timesPerWeek: 1,
          timesPerMonth: 4.33
        },
        selectedTool: rate.tool,
        laborRate: defaultLaborRate
      };

      setSelectedTasks((prev: SelectedTask[]): SelectedTask[] => {
        console.log('DEBUG: Adding new task to selected tasks:', newTask);
        return [...prev, newTask];
      });
      
      toast({
        title: "Task Added",
        description: `${rate.task} has been added to your scope.`
      });
    } else {
      setSelectedTasks((prev: SelectedTask[]): SelectedTask[] => {
        console.log('DEBUG: Removing task from selected tasks:', taskId);
        return prev.filter(task => task.taskId !== taskId);
      });
    }
  }, [setSelectedTasks, defaultLaborRate]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    console.log('DEBUG: useTaskOperations - handleQuantityChange:', {
      taskId,
      quantity
    });

    setSelectedTasks((prev: SelectedTask[]): SelectedTask[] => prev.map(task => {
      if (task.taskId === taskId) {
        if (!validateTaskData(task, quantity)) {
          console.log('DEBUG: Task data validation failed');
          return task;
        }
        
        const timeRequired = calculateTaskTime(
          taskId,
          quantity,
          task.selectedTool,
          task.frequency
        );
        
        console.log('DEBUG: Updating task with new quantity:', {
          taskId,
          quantity,
          timeRequired
        });

        return {
          ...task,
          quantity,
          timeRequired
        };
      }
      return task;
    }));
  }, [calculateTaskTime, setSelectedTasks]);

  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number) => {
    console.log('DEBUG: useTaskOperations - handleFrequencyChange:', {
      taskId,
      timesPerWeek
    });

    setSelectedTasks((prev: SelectedTask[]): SelectedTask[] => prev.map(task => {
      if (task.taskId === taskId) {
        const frequency = {
          timesPerWeek,
          timesPerMonth: timesPerWeek * 4.33
        };
        
        const timeRequired = calculateTaskTime(
          taskId,
          task.quantity,
          task.selectedTool,
          frequency
        );
        
        console.log('DEBUG: Updating task with new frequency:', {
          taskId,
          frequency,
          timeRequired
        });

        return {
          ...task,
          frequency,
          timeRequired
        };
      }
      return task;
    }));
  }, [calculateTaskTime, setSelectedTasks]);

  return {
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange
  };
};