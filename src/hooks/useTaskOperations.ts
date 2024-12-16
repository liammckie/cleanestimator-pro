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
  console.log('TASK_OPERATIONS: Current tasks state:', {
    count: selectedTasks.length,
    tasks: selectedTasks.map(task => ({
      taskId: task.taskId,
      quantity: task.quantity,
      timeRequired: task.timeRequired,
      frequency: task.frequency
    }))
  });

  const handleTaskSelection = useCallback((
    taskId: string,
    isSelected: boolean,
    siteId?: string,
    siteName?: string
  ) => {
    console.log('TASK_SELECTION: Handling task selection:', {
      taskId,
      isSelected,
      siteId,
      siteName,
      currentTaskCount: selectedTasks.length
    });

    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) {
        console.error('TASK_SELECTION: Could not find rate for task:', taskId);
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
        console.log('TASK_SELECTION: Added new task:', {
          newTask,
          totalTasksAfterAdd: updated.length,
          allTasks: updated.map(t => ({
            taskId: t.taskId,
            quantity: t.quantity,
            timeRequired: t.timeRequired
          }))
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
        console.log('TASK_SELECTION: Removed task:', {
          taskId,
          remainingTasks: updated.length,
          allTasks: updated.map(t => ({
            taskId: t.taskId,
            quantity: t.quantity,
            timeRequired: t.timeRequired
          }))
        });
        return updated;
      });
    }
  }, [selectedTasks, setSelectedTasks, defaultLaborRate]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    console.log('TASK_QUANTITY: Updating quantity:', {
      taskId,
      newQuantity: quantity,
      currentTasks: selectedTasks.map(t => ({
        taskId: t.taskId,
        currentQuantity: t.quantity
      }))
    });
    
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTaskTime(
          taskId,
          quantity,
          task.selectedTool,
          task.frequency
        );
        
        console.log('TASK_QUANTITY: Updated task time:', {
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
  }, [calculateTaskTime, selectedTasks]);

  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number) => {
    console.log('TASK_FREQUENCY: Updating frequency:', {
      taskId,
      newTimesPerWeek: timesPerWeek,
      currentTask: selectedTasks.find(t => t.taskId === taskId)
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

        console.log('TASK_FREQUENCY: Updated task frequency:', {
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
  }, [calculateTaskTime, selectedTasks]);

  return {
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange
  };
};