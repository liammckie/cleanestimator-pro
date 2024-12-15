import { CleaningTask } from '../types/tasks';

export const cleaningTasks: CleaningTask[] = [
  // Core Cleaning Tasks
  {
    id: 'vacuum-standard',
    category: 'Core Cleaning',
    taskName: 'Vacuuming',
    productivityRate: 400,
    measurementUnit: 'SQM/hour',
    notes: 'Standard carpet vacuuming',
    defaultTool: 'Vacuum Cleaner'
  },
  {
    id: 'toilet-cleaning',
    category: 'Core Cleaning',
    taskName: 'Toilet Cleaning',
    productivityRate: 50,
    measurementUnit: 'SQM/hour',
    notes: 'Includes disinfecting and wiping',
    defaultTool: 'Cleaning Kit'
  },
  // ... Add all other core cleaning tasks

  // Specialized Cleaning Tasks
  {
    id: 'snow-removal',
    category: 'Specialized Cleaning',
    taskName: 'Snow Removal',
    productivityRate: 150,
    measurementUnit: 'SQM/hour',
    notes: 'Seasonal task for exteriors',
    defaultTool: 'Snow Equipment'
  },
  // ... Add all other specialized cleaning tasks

  // Industry-Specific Tasks
  {
    id: 'infection-control',
    category: 'Industry-Specific',
    taskName: 'Infection Control',
    productivityRate: 80,
    measurementUnit: 'SQM/hour',
    notes: 'Healthcare-specific sanitization',
    defaultTool: 'Medical Grade Equipment'
  },
  // ... Add all other industry-specific tasks
];

export const getTasksByCategory = (category: string) => {
  return cleaningTasks.filter(task => task.category === category);
};

export const getTaskById = (taskId: string) => {
  return cleaningTasks.find(task => task.id === taskId);
};