import { useCallback } from 'react';
import { SelectedTask } from '@/components/area/task/types';
import { toast } from '@/components/ui/use-toast';
import { getRateById } from '@/data/rates/ratesManager';

export const useTaskOperations = (
  selectedTasks: SelectedTask[],
  setSelectedTasks: React.Dispatch<React.SetStateAction<SelectedTask[]>>,
  calculateTaskTime: any,
  defaultLaborRate: number = 38
) => {
  const handleTaskSelection = useCallback((
    taskId: string,
    isSelected: boolean,
    siteId?: string,
    siteName?: string
  ) => {
    console.log('TASK_OPERATIONS: Handling task selection:', {
      taskId,
      isSelected,
      siteId,
      siteName,
      currentTasks: selectedTasks
    });

    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) {
        console.error('TASK_OPERATIONS: Rate not found for task:', taskId);
        toast({
          title: "Error",
          description: `Could not find rate for task ${taskId}`,
          variant: "destructive",
        });
        return;
      }

      const newTask: SelectedTask = {
        taskId,
        siteId,
        siteName,
        quantity: rate.defaultQuantity || 0,
        timeRequired: 0,
        frequency: {
          timesPerWeek: 1,
          timesPerMonth: 4.33
        },
        selectedTool: rate.tool,
        laborRate: defaultLaborRate
      };

      setSelectedTasks(prev => {
        const taskExists = prev.some(task => task.taskId === taskId && task.siteId === siteId);
        if (taskExists) {
          console.log('TASK_OPERATIONS: Task already exists:', taskId);
          return prev;
        }
        
        const updated = [...prev, newTask];
        console.log('TASK_OPERATIONS: Added new task:', {
          newTask,
          updatedTasks: updated
        });
        return updated;
      });

      toast({
        title: "Task Added",
        description: `${rate.task} has been added to your scope.`
      });
    } else {
      setSelectedTasks(prev => {
        const updated = prev.filter(task => 
          !(task.taskId === taskId && task.siteId === siteId)
        );
        console.log('TASK_OPERATIONS: Removed task:', {
          taskId,
          remainingTasks: updated
        });
        return updated;
      });
    }
  }, [selectedTasks, setSelectedTasks, defaultLaborRate]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    console.log('TASK_OPERATIONS: Updating quantity:', {
      taskId,
      quantity,
      currentTasks: selectedTasks
    });
    
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTaskTime(
          taskId,
          quantity,
          task.selectedTool,
          task.frequency
        );
        
        return {
          ...task,
          quantity,
          timeRequired
        };
      }
      return task;
    }));
  }, [calculateTaskTime, selectedTasks]);

  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number) => {
    console.log('TASK_OPERATIONS: Updating frequency:', {
      taskId,
      timesPerWeek,
      currentTasks: selectedTasks
    });
    
    setSelectedTasks(prev => prev.map(task => {
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

        return {
          ...task,
          frequency,
          timeRequired
        };
      }
      return task;
    }));
  }, [calculateTaskTime, selectedTasks]);

  return {
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange
  };
};