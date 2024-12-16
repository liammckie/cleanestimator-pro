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
    console.log('DEBUG: Task selection triggered:', {
      taskId,
      isSelected,
      siteId,
      siteName,
      currentTaskCount: selectedTasks.length
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

      setSelectedTasks(prevTasks => {
        console.log('DEBUG: Adding new task:', newTask);
        return [...prevTasks, newTask];
      });
      
      toast({
        title: "Task Added",
        description: `${rate.task} has been added to your scope.`
      });
    } else {
      setSelectedTasks(prevTasks => {
        console.log('DEBUG: Removing task:', taskId);
        return prevTasks.filter(task => task.taskId !== taskId);
      });
    }
  }, [selectedTasks, setSelectedTasks, defaultLaborRate]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    console.log('DEBUG: Quantity change triggered:', {
      taskId,
      quantity,
      currentTasks: selectedTasks
    });

    setSelectedTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.taskId === taskId) {
          const timeRequired = calculateTaskTime(
            taskId,
            quantity,
            task.selectedTool,
            task.frequency
          );
          
          console.log('DEBUG: Updated task time:', {
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
      });

      console.log('DEBUG: Tasks after quantity update:', updatedTasks);
      return updatedTasks;
    });
  }, [calculateTaskTime, selectedTasks]);

  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number) => {
    console.log('DEBUG: Frequency change triggered:', {
      taskId,
      timesPerWeek,
      currentTasks: selectedTasks
    });

    setSelectedTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
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
          
          console.log('DEBUG: Updated task frequency:', {
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
      });

      console.log('DEBUG: Tasks after frequency update:', updatedTasks);
      return updatedTasks;
    });
  }, [calculateTaskTime, selectedTasks]);

  return {
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange
  };
};