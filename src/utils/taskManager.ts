import { ProductivityRate, TaskSelection, Category } from '../data/types/productivity';
import { cleaningCategories } from '../data/categories/cleaningCategories';

export const findTaskById = (taskId: string): ProductivityRate | undefined => {
  for (const category of cleaningCategories) {
    for (const subcategory of category.subcategories) {
      const task = subcategory.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
  }
  return undefined;
};

export const calculateTaskTime = (
  task: TaskSelection,
  rate: ProductivityRate
): number => {
  if (!rate || !task.quantity || task.quantity <= 0) return 0;
  
  const timePerUnit = 1 / rate.ratePerHour; // Hours per unit
  const timePerService = timePerUnit * task.quantity;
  const monthlyTime = timePerService * task.frequency.timesPerWeek * 4.33; // Average weeks per month
  
  return monthlyTime;
};

export const validateTaskSelection = (
  task: TaskSelection,
  rate: ProductivityRate
): boolean => {
  if (!rate || !task) return false;
  
  if (rate.minimumQuantity && task.quantity < rate.minimumQuantity) return false;
  if (rate.maximumQuantity && task.quantity > rate.maximumQuantity) return false;
  if (task.frequency.timesPerWeek < 1 || task.frequency.timesPerWeek > 7) return false;
  
  return true;
};

export const getDefaultTaskSelection = (rate: ProductivityRate): TaskSelection => {
  return {
    taskId: rate.id,
    quantity: rate.defaultQuantity || 1,
    frequency: {
      timesPerWeek: 1,
      timesPerMonth: 4.33
    },
    selectedTool: rate.tool
  };
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  return cleaningCategories.find(c => c.id === categoryId);
};