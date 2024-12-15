import { TaskGroup } from '../types/productivity';

export const taskGroups: TaskGroup[] = [
  {
    id: 'core-cleaning',
    name: 'Core Cleaning Tasks',
    description: 'Standard tasks used across all facilities',
    categories: [
      {
        id: 'carpet-maintenance',
        name: 'Carpet Maintenance',
        subcategories: [
          {
            id: 'vacuum',
            name: 'Vacuum',
            tasks: [
              {
                id: 'vacuum-standard',
                category: 'Carpet Maintenance',
                subcategory: 'Vacuum',
                task: 'Vacuum carpet - standard soil',
                tool: 'Commercial vacuum cleaner',
                unit: 'm²',
                ratePerHour: 280,
                defaultQuantity: 100,
                minimumQuantity: 10
              }
            ]
          },
          {
            id: 'steam-bonnet',
            name: 'Steam Bonnet',
            tasks: [
              {
                id: 'steam-clean-standard',
                category: 'Carpet Maintenance',
                subcategory: 'Steam Bonnet',
                task: 'Steam clean carpet',
                tool: 'Commercial steam cleaner',
                unit: 'm²',
                ratePerHour: 120,
                defaultQuantity: 50,
                minimumQuantity: 5
              }
            ]
          }
        ]
      },
      // Additional core cleaning categories will be added here
    ]
  },
  {
    id: 'specialized-cleaning',
    name: 'Specialized Cleaning',
    description: 'Tasks requiring special tools or periodic maintenance',
    categories: [
      {
        id: 'deep-cleaning',
        name: 'Deep Cleaning',
        subcategories: [
          {
            id: 'restorative',
            name: 'Restorative Cleaning',
            tasks: [
              {
                id: 'deep-extraction',
                category: 'Deep Cleaning',
                subcategory: 'Restorative Cleaning',
                task: 'Deep extraction cleaning',
                tool: 'Industrial extractor',
                unit: 'm²',
                ratePerHour: 80,
                defaultQuantity: 50,
                minimumQuantity: 10
              }
            ]
          }
        ]
      }
      // Additional specialized cleaning categories will be added here
    ]
  },
  {
    id: 'industry-specific',
    name: 'Industry-Specific Cleaning',
    description: 'Specific to industries with unique cleaning needs',
    categories: [
      {
        id: 'healthcare',
        name: 'Healthcare',
        subcategories: [
          {
            id: 'infection-control',
            name: 'Infection Control',
            tasks: [
              {
                id: 'terminal-clean',
                category: 'Healthcare',
                subcategory: 'Infection Control',
                task: 'Terminal clean - patient room',
                tool: 'Healthcare cleaning kit',
                unit: 'room',
                ratePerHour: 2,
                defaultQuantity: 1,
                minimumQuantity: 1
              }
            ]
          }
        ]
      }
      // Additional industry-specific categories will be added here
    ]
  }
];