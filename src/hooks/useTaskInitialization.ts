import { useState, useCallback, useEffect } from 'react';
import { SelectedTask, AreaData } from '@/components/area/task/types';
import { useTaskTimes } from './useTaskTimes';
import { TIME_CONSTANTS } from '@/utils/constants';

export const useTaskInitialization = (
  onTasksChange?: (area: AreaData) => void,
  defaultLaborRate: number = 38
) => {
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  const { calculateTaskTime } = useTaskTimes();
  
  const calculateTotalHours = useCallback(() => {
    if (!selectedTasks || selectedTasks.length === 0) {
      console.log('HOURS_CALC: No tasks selected, returning 0');
      return { totalWeeklyHours: 0, totalMonthlyHours: 0 };
    }

    console.log('HOURS_CALC: Starting total hours calculation for tasks:', 
      selectedTasks.map(task => ({
        taskId: task.taskId,
        timeRequired: task.timeRequired,
        frequency: task.frequency
      }))
    );

    const totalMonthlyHours = selectedTasks.reduce((total, task) => {
      const taskMonthlyHours = task.timeRequired * task.frequency.timesPerMonth;
      console.log('HOURS_CALC: Task monthly hours:', {
        taskId: task.taskId,
        timeRequired: task.timeRequired,
        frequency: task.frequency,
        monthlyHours: taskMonthlyHours
      });
      return total + taskMonthlyHours;
    }, 0);
    
    const totalWeeklyHours = totalMonthlyHours / TIME_CONSTANTS.WEEKS_PER_MONTH;
    
    console.log('HOURS_CALC: Calculation completed:', {
      totalWeeklyHours,
      totalMonthlyHours,
      taskCount: selectedTasks.length
    });

    return { totalWeeklyHours, totalMonthlyHours };
  }, [selectedTasks]);

  useEffect(() => {
    if (onTasksChange) {
      const { totalWeeklyHours, totalMonthlyHours } = calculateTotalHours();
      const totalLaborCost = selectedTasks.reduce((sum, task) => {
        const hourlyRate = task.laborRate || defaultLaborRate;
        const taskCost = task.timeRequired * hourlyRate * task.frequency.timesPerMonth;
        console.log('COST_CALC: Task labor cost:', {
          taskId: task.taskId,
          timeRequired: task.timeRequired,
          hourlyRate,
          frequency: task.frequency,
          taskCost
        });
        return sum + taskCost;
      }, 0);

      const areaData: AreaData = {
        squareMeters: 0,
        spaceType: '',
        industryType: '',
        selectedTasks: selectedTasks.map(task => ({
          taskId: task.taskId,
          quantity: task.quantity,
          timeRequired: task.timeRequired,
          frequency: task.frequency,
          productivityOverride: task.productivityOverride,
          selectedTool: task.selectedTool,
          laborRate: task.laborRate || defaultLaborRate
        })),
        totalTime: totalMonthlyHours,
        totalLaborCost
      };

      console.log('AREA_UPDATE: Updating area data:', {
        totalMonthlyHours,
        totalLaborCost,
        taskCount: selectedTasks.length
      });

      onTasksChange(areaData);
    }
  }, [selectedTasks, onTasksChange, defaultLaborRate, calculateTotalHours]);

  return {
    selectedTasks,
    setSelectedTasks,
    calculateTaskTime,
    calculateTotalHours
  };
};