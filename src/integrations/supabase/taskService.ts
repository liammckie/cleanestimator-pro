import { supabase } from './client';
import { CleaningTask } from '@/data/types/taskManagement';

const TABLE = 'tasks';

export const fetchTasks = async (): Promise<CleaningTask[]> => {
  const { data, error } = await supabase.from(TABLE).select('*');
  if (error) {
    console.error('Error fetching tasks:', error.message);
    return [];
  }
  return (data as CleaningTask[]) || [];
};

export const insertTask = async (task: Omit<CleaningTask, 'id'>): Promise<CleaningTask | null> => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(task)
    .select()
    .single();
  if (error) {
    console.error('Error inserting task:', error.message);
    return null;
  }
  return data as CleaningTask;
};
