import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, SelectedTask, TaskContextType, TaskFrequency } from './types';
import { calculateTaskTime } from '@/utils/taskCalculations';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  const [totalWeeklyHours, setTotalWeeklyHours] = useState(0);
  const [totalMonthlyHours, setTotalMonthlyHours] = useState(0);

  const addTask = (task: Task) => {
    console.log('TASK_MANAGEMENT Adding task:', task);
    
    const newTask: SelectedTask = {
      id: task.id,
      quantity: task.defaultQuantity || 0,
      timeRequired: 0,
      frequency: {
        timesPerWeek: 1,
        timesPerMonth: 4.33
      }
    };

    setSelectedTasks(prev => {
      console.log('TASK_MANAGEMENT Previous tasks:', prev);
      return [...prev, newTask];
    });
  };

  const removeTask = (taskId: string) => {
    console.log('TASK_MANAGEMENT Removing task:', taskId);
    setSelectedTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const updateTaskQuantity = (taskId: string, quantity: number) => {
    console.log('TASK_MANAGEMENT Updating quantity:', { taskId, quantity });
    setSelectedTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const timeRequired = calculateTaskTime(task, quantity);
        return { ...task, quantity, timeRequired };
      }
      return task;
    }));
  };

  const updateTaskFrequency = (taskId: string, frequency: TaskFrequency) => {
    console.log('TASK_MANAGEMENT Updating frequency:', { taskId, frequency });
    setSelectedTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const timeRequired = calculateTaskTime(task, task.quantity);
        return { ...task, frequency, timeRequired };
      }
      return task;
    }));
  };

  useEffect(() => {
    console.log('TASK_MANAGEMENT Calculating total hours for tasks:', selectedTasks);
    
    const weekly = selectedTasks.reduce((total, task) => {
      return total + (task.timeRequired * task.frequency.timesPerWeek);
    }, 0);
    
    const monthly = selectedTasks.reduce((total, task) => {
      return total + (task.timeRequired * task.frequency.timesPerMonth);
    }, 0);

    console.log('TASK_MANAGEMENT Hours calculated:', { weekly, monthly });
    
    setTotalWeeklyHours(weekly);
    setTotalMonthlyHours(monthly);
  }, [selectedTasks]);

  return (
    <TaskContext.Provider value={{
      selectedTasks,
      addTask,
      removeTask,
      updateTaskQuantity,
      updateTaskFrequency,
      totalWeeklyHours,
      totalMonthlyHours
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};