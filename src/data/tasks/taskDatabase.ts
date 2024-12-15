import { TaskGroup } from '../types/cleaning';
import { coreCleaning } from './coreCleaning';
import { specializedCleaning } from './specializedCleaning';
import { industrySpecificCleaning } from './industrySpecificCleaning';

export const taskGroups: TaskGroup[] = [
  {
    id: 'cleaning-tasks',
    name: 'Cleaning Tasks',
    description: 'All cleaning task categories',
    categories: [
      coreCleaning,
      specializedCleaning,
      industrySpecificCleaning
    ]
  }
];

export const getAllTasks = () => {
  return taskGroups.flatMap(group => 
    group.categories.flatMap(category => 
      category.tasks
    )
  );
};

export const getTasksByCategory = (categoryId: string) => {
  const category = taskGroups
    .flatMap(group => group.categories)
    .find(cat => cat.id === categoryId);
  
  return category?.tasks || [];
};

export const getTaskById = (taskId: string) => {
  return getAllTasks().find(task => task.id === taskId);
};