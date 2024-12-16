import { useCallback } from 'react';
import { SelectedTask } from '@/components/area/task/types';
import { toast } from '@/components/ui/use-toast';
import { getRateById } from '@/data/rates/ratesManager';
import { validateTaskData } from '@/utils/taskValidation';
import { TIME_CONSTANTS } from '@/utils/constants';
import { FREQUENCY_OPTIONS } from '@/constants/frequencyOptions';

export const useTaskOperations = (
  selectedTasks: SelectedTask[],
  setSelectedTasks: (tasks: SelectedTask[] | ((prev: SelectedTask[]) => SelectedTask[])) => void,
  calculateTaskTime: any,
  defaultLaborRate: number = 38
) => {
  const handleTaskSelection = useCallback((
    taskId: string,
    isSelected: boolean,
    siteId?: string,
    siteName?: string
  ) => {
    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) {
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
          timesPerMonth: TIME_CONSTANTS.WEEKS_PER_MONTH
        },
        selectedTool: rate.tool,
        laborRate: defaultLaborRate
      };

      setSelectedTasks(prev => [...prev, newTask]);
      
      toast({
        title: "Task Added",
        description: `${rate.task} has been added to your scope.`
      });
    } else {
      setSelectedTasks(prev => prev.filter(task => task.taskId !== taskId));
      
      toast({
        title: "Task Removed",
        description: "Task has been removed from the scope."
      });
    }
  }, [setSelectedTasks, defaultLaborRate]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        if (!validateTaskData(task, quantity)) return task;
        
        const timeRequired = calculateTaskTime(
          taskId,
          quantity,
          task.selectedTool,
          task.frequency
        );
        
        console.log('Task time calculation:', {
          taskId,
          quantity,
          timeRequired,
          frequency: task.frequency
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
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const frequencyOption = FREQUENCY_OPTIONS.find(opt => parseFloat(opt.value) === timesPerWeek);
        
        if (!frequencyOption) {
          console.error('Invalid frequency value:', timesPerWeek);
          return task;
        }

        const frequency = {
          timesPerWeek,
          timesPerMonth: frequencyOption.timesPerMonth
        };
        
        const timeRequired = calculateTaskTime(
          taskId,
          task.quantity,
          task.selectedTool,
          frequency
        );
        
        console.log('Frequency update:', {
          taskId,
          frequency,
          timeRequired,
          timesPerWeek,
          timesPerMonth: frequencyOption.timesPerMonth
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