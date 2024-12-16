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
  console.log('TASK_OPERATIONS: Current selected tasks:', {
    count: selectedTasks.length,
    tasks: selectedTasks.map(task => ({
      taskId: task.taskId,
      quantity: task.quantity,
      timeRequired: task.timeRequired,
      weeklyHours: task.timeRequired * task.frequency.timesPerWeek,
      monthlyHours: task.timeRequired * task.frequency.timesPerMonth
    }))
  });

  const handleTaskSelection = useCallback((
    taskId: string,
    isSelected: boolean,
    siteId?: string,
    siteName?: string
  ) => {
    console.log('TASK_OPERATIONS: Task selection changed:', {
      taskId,
      isSelected,
      siteId,
      siteName
    });

    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) {
        console.error('Could not find rate for task:', taskId);
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

      setSelectedTasks(prev => {
        const updated = [...prev, newTask];
        console.log('TASK_OPERATIONS: Added new task:', {
          task: newTask,
          totalTasks: updated.length
        });
        return updated;
      });
      
      toast({
        title: "Task Added",
        description: `${rate.task} has been added to your scope.`
      });
    } else {
      setSelectedTasks(prev => {
        const updated = prev.filter(task => task.taskId !== taskId);
        console.log('TASK_OPERATIONS: Removed task:', {
          taskId,
          remainingTasks: updated.length
        });
        return updated;
      });
    }
  }, [setSelectedTasks, defaultLaborRate]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    console.log('TASK_OPERATIONS: Quantity changed:', { taskId, quantity });
    
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTaskTime(
          taskId,
          quantity,
          task.selectedTool,
          task.frequency
        );
        
        console.log('TASK_OPERATIONS: Updated task time:', {
          taskId,
          quantity,
          timeRequired,
          weeklyHours: timeRequired * task.frequency.timesPerWeek,
          monthlyHours: timeRequired * task.frequency.timesPerMonth
        });
        
        return {
          ...task,
          quantity,
          timeRequired
        };
      }
      return task;
    }));
  }, [calculateTaskTime]);

  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number) => {
    console.log('TASK_OPERATIONS: Frequency changed:', { taskId, timesPerWeek });
    
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

        console.log('TASK_OPERATIONS: Updated task frequency:', {
          taskId,
          frequency,
          timeRequired,
          weeklyHours: timeRequired * frequency.timesPerWeek,
          monthlyHours: timeRequired * frequency.timesPerMonth
        });

        return {
          ...task,
          frequency,
          timeRequired
        };
      }
      return task;
    }));
  }, [calculateTaskTime]);

  return {
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange
  };
};