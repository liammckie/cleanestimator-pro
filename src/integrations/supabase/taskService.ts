import { supabase } from './client';
import { CleaningTask } from '@/data/types/taskManagement';

const TABLE = 'tasks';

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
  const { data, error } = await supabase.from(TABLE).select('*');
  if (error) {
    console.error('Error fetching tasks:', error.message);
    return [];
  }
  return data ? (data as any[]).map(mapRowToTask) : [];
};

export const insertTask = async (task: Omit<CleaningTask, 'id'>): Promise<CleaningTask | null> => {
  const payload = {
    category: task.category,
    task_name: task.taskName,
    productivity_rate: task.productivityRate,
    measurement_unit: task.measurementUnit,
    minimum_quantity: task.minimumQuantity ?? null,
    charge_rate: task.chargeRate ?? null,
    notes: task.notes ?? null,
    default_tool: task.defaultTool ?? null,
  };

  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();
  if (error) {
    console.error('Error inserting task:', error.message);
    return null;
  }
  return data ? mapRowToTask(data) : null;
};
