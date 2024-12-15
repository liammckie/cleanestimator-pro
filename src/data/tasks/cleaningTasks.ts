import { TaskGroup } from '../types/productivity';
import { coreCleaning } from './categories/coreCleaning';
import { specializedCleaning } from './categories/specializedCleaning';
import { industrySpecific } from './categories/industrySpecific';

export const cleaningTasks: TaskGroup[] = [
  coreCleaning,
  specializedCleaning,
  industrySpecific
];