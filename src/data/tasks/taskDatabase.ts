import { TaskGroup } from '../types/cleaning';
import { coreCleaning } from './categories/coreCleaning';
import { specializedCleaning } from './categories/specializedCleaning';
import { industrySpecific } from './categories/industrySpecific';

export const cleaningTasks: TaskGroup[] = [
  {
    id: 'cleaning-tasks',
    name: 'Cleaning Tasks',
    description: 'All cleaning task categories',
    categories: [
      coreCleaning,
      specializedCleaning,
      industrySpecific
    ]
  }
];

export const getAllTasks = () => {
  return cleaningTasks.flatMap(group => 
    group.categories.flatMap(category => 
      category.tasks
    )
  );
};

export const getTasksByCategory = (categoryId: string) => {
  const category = cleaningTasks
    .flatMap(group => group.categories)
    .find(cat => cat.id === categoryId);
  
  return category?.tasks || [];
};

export const getTaskById = (taskId: string) => {
  return getAllTasks().find(task => task.id === taskId);
};