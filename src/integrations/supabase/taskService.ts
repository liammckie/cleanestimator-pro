
import { supabase } from './client';
import { CleaningTask } from '@/data/types/taskManagement';

// In a real implementation, this service would interact with a Supabase 'tasks' table
// For now, we'll use local storage since the 'tasks' table doesn't exist in Supabase yet

const LOCAL_STORAGE_KEY = 'cleaning-tasks';

export const fetchTasks = async (): Promise<CleaningTask[]> => {
  try {
    // Try to get tasks from localStorage
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      return JSON.parse(savedTasks) as CleaningTask[];
    }
    
    console.log('No tasks found in localStorage');
    return [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const insertTask = async (task: Omit<CleaningTask, 'id'>): Promise<CleaningTask | null> => {
  try {
    // Generate a UUID for the task
    const newTask: CleaningTask = {
      ...task,
      id: crypto.randomUUID()
    };
    
    // Get existing tasks
    const existingTasks = await fetchTasks();
    
    // Add new task
    const updatedTasks = [...existingTasks, newTask];
    
    // Save to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
    
    console.log('Task inserted successfully:', newTask);
    return newTask;
  } catch (error) {
    console.error('Error inserting task:', error);
    return null;
  }
};

// Additional methods can be added as needed
export const updateTask = async (id: string, updates: Partial<CleaningTask>): Promise<CleaningTask | null> => {
  try {
    const tasks = await fetchTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return null;
    }
    
    const updatedTask = { ...tasks[taskIndex], ...updates };
    tasks[taskIndex] = updatedTask;
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
};

export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    const tasks = await fetchTasks();
    const filteredTasks = tasks.filter(t => t.id !== id);
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredTasks));
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};
