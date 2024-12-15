import { CleaningTask } from '@/data/types/taskManagement';

const TASKS_STORAGE_KEY = 'cleaning-tasks';

export const loadTasks = (): CleaningTask[] => {
  try {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

export const saveTasks = (tasks: CleaningTask[]): void => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const groupTasksByCategory = (tasks: CleaningTask[]): Record<string, CleaningTask[]> => {
  return tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, CleaningTask[]>);
};