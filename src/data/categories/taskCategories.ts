import { TaskCategory } from '../types/productivity';

export const taskCategories: TaskCategory[] = [
  {
    id: 'general-cleaning',
    name: 'General Cleaning',
    subcategories: [
      {
        id: 'floor-care',
        name: 'Floor Care',
        tasks: [
          {
            id: 'vacuum-carpet',
            category: 'General Cleaning',
            subcategory: 'Floor Care',
            task: 'Vacuum carpet',
            tool: 'Commercial vacuum cleaner',
            unit: 'm²',
            ratePerHour: 280,
            defaultQuantity: 100,
            minimumQuantity: 10
          },
          {
            id: 'mop-hard-floor',
            category: 'General Cleaning',
            subcategory: 'Floor Care',
            task: 'Mop hard floor',
            tool: 'Commercial mop',
            unit: 'm²',
            ratePerHour: 300,
            defaultQuantity: 100,
            minimumQuantity: 10
          }
        ]
      },
      {
        id: 'surface-care',
        name: 'Surface Care',
        tasks: [
          {
            id: 'wipe-surfaces',
            category: 'General Cleaning',
            subcategory: 'Surface Care',
            task: 'Wipe and sanitize surfaces',
            tool: 'Microfiber cloths and sanitizer',
            unit: 'm²',
            ratePerHour: 150,
            defaultQuantity: 50,
            minimumQuantity: 5
          }
        ]
      }
    ]
  },
  {
    id: 'washroom',
    name: 'Washroom Services',
    subcategories: [
      {
        id: 'toilet-cleaning',
        name: 'Toilet Cleaning',
        tasks: [
          {
            id: 'clean-toilet',
            category: 'Washroom Services',
            subcategory: 'Toilet Cleaning',
            task: 'Clean and sanitize toilet',
            tool: 'Toilet cleaning kit',
            unit: 'unit',
            ratePerHour: 12,
            defaultQuantity: 1,
            minimumQuantity: 1
          }
        ]
      }
    ]
  }
];