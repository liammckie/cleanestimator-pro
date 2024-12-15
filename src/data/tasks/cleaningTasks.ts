import { Task, TaskGroup } from '../types/productivity';

export const cleaningTasks: TaskGroup[] = [
  {
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
  },
  {
    id: 'specialized-cleaning',
    name: 'Specialized Cleaning',
    description: 'Advanced cleaning tasks requiring special equipment or training',
    categories: [
      {
        id: 'specialized-cleaning',
        name: 'Specialized Cleaning',
        description: 'Specialized cleaning services',
        subcategories: [
          {
            id: 'specialized-cleaning',
            name: 'Specialized Cleaning',
            tasks: [
              {
                id: 'snow-removal',
                category: 'Specialized Cleaning',
                subcategory: 'Specialized Cleaning',
                task: 'Snow Removal',
                tool: 'Snow Equipment',
                unit: 'SQM/hour',
                ratePerHour: 150,
                notes: 'Seasonal task for exteriors'
              },
              {
                id: 'trash-removal',
                category: 'Specialized Cleaning',
                subcategory: 'Specialized Cleaning',
                task: 'Trash Removal',
                tool: 'Waste Management Equipment',
                unit: 'SQM/hour',
                ratePerHour: 90,
                notes: 'Includes sorting and recycling'
              },
              {
                id: 'deep-cleaning',
                category: 'Specialized Cleaning',
                subcategory: 'Specialized Cleaning',
                task: 'Deep Cleaning',
                tool: 'Deep Cleaning Equipment',
                unit: 'SQM/hour',
                ratePerHour: 120,
                notes: 'For high-traffic or stained areas'
              },
              {
                id: 'floor-polishing',
                category: 'Specialized Cleaning',
                subcategory: 'Specialized Cleaning',
                task: 'Floor Polishing',
                tool: 'Floor Polisher',
                unit: 'SQM/hour',
                ratePerHour: 200,
                notes: 'Polishing hardwood or tiled floors'
              },
              {
                id: 'glass-cleaning',
                category: 'Specialized Cleaning',
                subcategory: 'Specialized Cleaning',
                task: 'Glass Cleaning',
                tool: 'Glass Cleaning Kit',
                unit: 'SQM/hour',
                ratePerHour: 100,
                notes: 'Covers glass partitions and panels'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'industry-specific',
    name: 'Industry-Specific Cleaning',
    description: 'Specialized cleaning tasks for specific industries',
    categories: [
      {
        id: 'industry-specific',
        name: 'Industry-Specific',
        description: 'Industry-specific cleaning tasks',
        subcategories: [
          {
            id: 'industry-specific',
            name: 'Industry-Specific',
            tasks: [
              {
                id: 'infection-control',
                category: 'Industry-Specific',
                subcategory: 'Industry-Specific',
                task: 'Infection Control',
                tool: 'Medical Grade Equipment',
                unit: 'SQM/hour',
                ratePerHour: 80,
                notes: 'Healthcare-specific sanitization'
              },
              {
                id: 'classroom-cleaning',
                category: 'Industry-Specific',
                subcategory: 'Industry-Specific',
                task: 'Classroom Cleaning',
                tool: 'Standard Cleaning Kit',
                unit: 'SQM/hour',
                ratePerHour: 200,
                notes: 'Education facilities cleaning'
              },
              {
                id: 'retail-cleaning',
                category: 'Industry-Specific',
                subcategory: 'Industry-Specific',
                task: 'Retail Cleaning',
                tool: 'Commercial Cleaning Kit',
                unit: 'SQM/hour',
                ratePerHour: 250,
                notes: 'Covers shopping areas and entrances'
              },
              {
                id: 'vehicle-cleaning',
                category: 'Industry-Specific',
                subcategory: 'Industry-Specific',
                task: 'Vehicle Cleaning',
                tool: 'Vehicle Cleaning Kit',
                unit: 'SQM/hour',
                ratePerHour: 150,
                notes: 'Transportation hubs or fleets'
              }
            ]
          }
        ]
      }
    ]
  }
];