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
  console.log('TASK_FLOW: useTaskOperations initialized');

  const handleTaskSelection = useCallback((
    taskId: string,
    isSelected: boolean,
    siteId?: string,
    siteName?: string
  ) => {
    console.log('TASK_FLOW: handleTaskSelection called:', {
      taskId,
      isSelected,
      siteId,
      siteName
    });

    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) {
        console.error('TASK_FLOW: Could not find rate for task:', taskId);
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
        console.log('TASK_FLOW: Adding new task:', {
          newTask,
          previousTasks: prevTasks
        });
        return [...prevTasks, newTask];
      });
      
      toast({
        title: "Task Added",
        description: `${rate.task} has been added to your scope.`
      });
    } else {
      setSelectedTasks(prevTasks => {
        console.log('TASK_FLOW: Removing task:', {
          taskId,
          previousTasks: prevTasks
        });
        return prevTasks.filter(task => task.taskId !== taskId);
      });
    }
  }, [selectedTasks, setSelectedTasks, defaultLaborRate]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    console.log('TASK_FLOW: handleQuantityChange called:', {
      taskId,
      quantity
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
          
          console.log('TASK_FLOW: Updated task time:', {
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

      console.log('TASK_FLOW: Tasks after quantity update:', updatedTasks);
      return updatedTasks;
    });
  }, [calculateTaskTime]);

  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number) => {
    console.log('TASK_FLOW: handleFrequencyChange called:', {
      taskId,
      timesPerWeek
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
          
          console.log('TASK_FLOW: Updated task frequency:', {
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

      console.log('TASK_FLOW: Tasks after frequency update:', updatedTasks);
      return updatedTasks;
    });
  }, [calculateTaskTime]);

  return {
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange
  };
};