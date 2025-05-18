
import { CleaningTask } from '@/data/types/taskManagement';

const TASKS_KEY = 'cleaning-tasks';

export const loadTasks = (): CleaningTask[] => {
  try {
    const savedTasks = localStorage.getItem(TASKS_KEY);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
  } catch (error) {
    console.error('Error loading tasks from local storage:', error);
  }
  return [];
};

export const saveTasks = (tasks: CleaningTask[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to local storage:', error);
  }
};

export const addTask = (task: CleaningTask): CleaningTask[] => {
  const currentTasks = loadTasks();
  
  // Check if task with same id already exists
  const exists = currentTasks.some(t => t.id === task.id);
  if (!exists) {
    const updatedTasks = [...currentTasks, task];
    saveTasks(updatedTasks);
    return updatedTasks;
  }
  
  return currentTasks;
};

export const deleteTask = (taskId: string): CleaningTask[] => {
  const currentTasks = loadTasks();
  const updatedTasks = currentTasks.filter(task => task.id !== taskId);
  saveTasks(updatedTasks);
  return updatedTasks;
};

export const updateTask = (updatedTask: CleaningTask): CleaningTask[] => {
  const currentTasks = loadTasks();
  const updatedTasks = currentTasks.map(task => 
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(updatedTasks);
  return updatedTasks;
};
