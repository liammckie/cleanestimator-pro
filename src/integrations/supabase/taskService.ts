
import { supabase } from './client';
import { CleaningTask } from '@/data/types/taskManagement';

// In a real implementation, this service would interact with a Supabase 'tasks' table
// For now, we'll use local storage since the 'tasks' table doesn't exist in Supabase yet

const LOCAL_STORAGE_KEY = 'cleaning-tasks';

const mapRowToTask = (row: any): CleaningTask => ({
  id: row.id,
  category: row.category,
  taskName: row.task_name,
  productivityRate: row.productivity_rate,
  measurementUnit: row.measurement_unit,
  minimumQuantity: row.minimum_quantity ?? undefined,
  chargeRate: row.charge_rate ?? undefined,
  notes: row.notes ?? undefined,
  defaultTool: row.default_tool ?? undefined,
});

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
  }\
};
