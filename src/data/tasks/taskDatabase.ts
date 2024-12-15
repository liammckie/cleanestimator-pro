import { TaskGroup, TaskCategory } from '../types/cleaning';
import { coreCleaning } from './categories/coreCleaning';
import { specializedCleaning } from './categories/specializedCleaning';
import { industrySpecific } from './categories/industrySpecific';

export const cleaningTaskGroups: TaskGroup[] = [
  {
    id: 'cleaning-tasks',
    name: 'Cleaning Tasks',
    description: 'All cleaning task categories',
    categories: [
      coreCleaning as unknown as TaskCategory,
      specializedCleaning as unknown as TaskCategory,
      industrySpecific as unknown as TaskCategory
    ]
  }
];

export const getAllTasks = () => {
  return cleaningTaskGroups.flatMap(group => 
    group.categories.flatMap(category => 
      category.tasks
    )
  );
};

export const getTasksByCategory = (categoryId: string) => {
  const category = cleaningTaskGroups
    .flatMap(group => group.categories)
    .find(cat => cat.id === categoryId);
  
  return category?.tasks || [];
};

export const getTaskById = (taskId: string) => {
  return getAllTasks().find(task => task.id === taskId);
};