import React, { createContext, useContext, useState, useEffect } from 'react';
import { AreaData, SelectedTask, TaskContextType } from './types';
import { useTaskManagement } from '@/hooks/useTaskManagement';
import { useTaskOperations } from '@/hooks/useTaskOperations';
import { useTaskModifiers } from '@/hooks/useTaskModifiers';
import { TIME_CONSTANTS } from '@/utils/constants';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: React.ReactNode;
  onTasksChange?: (area: AreaData) => void;
  defaultLaborRate?: number;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ 
  children, 
  onTasksChange,
  defaultLaborRate = 38 
}) => {
  // Initialize with an empty array explicitly
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  
  const { calculateTaskTime } = useTaskManagement(
    onTasksChange,
    defaultLaborRate
  );

  const {
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange
  } = useTaskOperations(selectedTasks, setSelectedTasks, calculateTaskTime, defaultLaborRate);

  const {
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride
  } = useTaskModifiers(selectedTasks, setSelectedTasks, calculateTaskTime);

  const calculateTotalHours = () => {
    console.log('[HOURS_CALC] Starting hours calculation');
    console.log('[HOURS_CALC] Number of selected tasks:', selectedTasks.length);
    
    if (!selectedTasks || selectedTasks.length === 0) {
      console.log('[HOURS_CALC] No tasks selected, returning 0');
      return { totalWeeklyHours: 0, totalMonthlyHours: 0 };
    }

    const totalMonthlyHours = selectedTasks.reduce((total, task, index) => {
      console.log(`[HOURS_CALC] Processing task ${index + 1}:`, {
        taskId: task.taskId,
        timeRequired: task.timeRequired,
        frequency: task.frequency,
        quantity: task.quantity
      });
      
      if (!task.timeRequired) {
        console.log(`[HOURS_CALC] Task ${task.taskId} has no timeRequired`);
        return total;
      }

      const taskMonthlyHours = task.timeRequired;
      console.log(`[HOURS_CALC] Task ${task.taskId} monthly hours:`, taskMonthlyHours);
      
      return total + taskMonthlyHours;
    }, 0);
    
    const totalWeeklyHours = totalMonthlyHours / TIME_CONSTANTS.WEEKS_PER_MONTH;
    
    console.log('[HOURS_CALC] Final calculation:', {
      totalWeeklyHours,
      totalMonthlyHours,
      selectedTasksCount: selectedTasks.length,
      taskDetails: selectedTasks.map(task => ({
        taskId: task.taskId,
        timeRequired: task.timeRequired,
        frequency: task.frequency
      }))
    });
    
    return { totalWeeklyHours, totalMonthlyHours };
  };

  const [totalHours, setTotalHours] = useState({ totalWeeklyHours: 0, totalMonthlyHours: 0 });

  useEffect(() => {
    console.log('[HOURS_CALC] Tasks changed, current tasks:', selectedTasks.length);
    
    if (selectedTasks.length > 0) {
      console.log('[HOURS_CALC] Recalculating hours due to tasks change');
      const newTotalHours = calculateTotalHours();
      console.log('[HOURS_CALC] New total hours:', newTotalHours);
      setTotalHours(newTotalHours);
    } else {
      console.log('[HOURS_CALC] No tasks selected, resetting hours to 0');
      setTotalHours({ totalWeeklyHours: 0, totalMonthlyHours: 0 });
    }
  }, [selectedTasks]);

  const value = {
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange,
    handleLaborRateChange,
    handleProductivityOverride,
    totalWeeklyHours: totalHours.totalWeeklyHours,
    totalMonthlyHours: totalHours.totalMonthlyHours
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};