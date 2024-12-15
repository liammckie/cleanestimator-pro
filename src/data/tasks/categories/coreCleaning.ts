import { TaskGroup } from '../../types/productivity';

export const coreCleaning: TaskGroup = {
  id: 'core-cleaning',
  name: 'Core Cleaning Tasks',
  description: 'Standard cleaning tasks for all facilities',
  categories: [
    {
      id: 'core-cleaning',
      name: 'Core Cleaning',
      description: 'Essential cleaning tasks',
      subcategories: [
        {
          id: 'core-cleaning',
          name: 'Core Cleaning',
          tasks: [
            {
              id: 'vacuum-standard',
              category: 'Core Cleaning',
              subcategory: 'Core Cleaning',
              task: 'Vacuuming',
              tool: 'Vacuum Cleaner',
              unit: 'SQM/hour',
              ratePerHour: 400,
              notes: 'Standard carpet vacuuming'
            },
            {
              id: 'toilet-cleaning',
              category: 'Core Cleaning',
              subcategory: 'Core Cleaning',
              task: 'Toilet Cleaning',
              tool: 'Cleaning Kit',
              unit: 'SQM/hour',
              ratePerHour: 50,
              notes: 'Includes disinfecting and wiping'
            },
            {
              id: 'window-washing',
              category: 'Core Cleaning',
              subcategory: 'Core Cleaning',
              task: 'Window Washing',
              tool: 'Window Cleaning Kit',
              unit: 'SQM/hour',
              ratePerHour: 100,
              notes: 'Covers inside and outside cleaning'
            },
            {
              id: 'mopping',
              category: 'Core Cleaning',
              subcategory: 'Core Cleaning',
              task: 'Mopping',
              tool: 'Mop',
              unit: 'SQM/hour',
              ratePerHour: 300,
              notes: 'For hard floors in offices and hallways'
            },
            {
              id: 'dusting',
              category: 'Core Cleaning',
              subcategory: 'Core Cleaning',
              task: 'Dusting',
              tool: 'Dusting Tools',
              unit: 'SQM/hour',
              ratePerHour: 350,
              notes: 'Includes surfaces, furniture, and blinds'
            },
            {
              id: 'stairwell-cleaning',
              category: 'Core Cleaning',
              subcategory: 'Core Cleaning',
              task: 'Stairwell Cleaning',
              tool: 'Cleaning Kit',
              unit: 'SQM/hour',
              ratePerHour: 200,
              notes: 'Includes mopping steps and handrails'
            }
          ]
        }
      ]
    }
  ]
};