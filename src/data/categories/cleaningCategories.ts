import { Category } from '../types/productivity';

export const cleaningCategories: Category[] = [
  {
    id: 'floor-care',
    name: 'Floor Care',
    subcategories: [
      {
        id: 'carpet-maintenance',
        name: 'Carpet Maintenance',
        tasks: [
          {
            id: 'carpet-vacuum-light',
            category: 'Floor Care',
            subcategory: 'Carpet Maintenance',
            task: 'Vacuum carpet - light soil',
            tool: 'Commercial vacuum cleaner',
            unit: 'm²',
            ratePerHour: 280,
            defaultQuantity: 100,
            minimumQuantity: 10
          },
          {
            id: 'carpet-vacuum-heavy',
            category: 'Floor Care',
            subcategory: 'Carpet Maintenance',
            task: 'Vacuum carpet - heavy soil',
            tool: 'Heavy duty vacuum cleaner',
            unit: 'm²',
            ratePerHour: 180,
            defaultQuantity: 100,
            minimumQuantity: 10
          }
        ]
      },
      {
        id: 'hard-floor',
        name: 'Hard Floor Maintenance',
        tasks: [
          {
            id: 'floor-sweep',
            category: 'Floor Care',
            subcategory: 'Hard Floor Maintenance',
            task: 'Sweep floor',
            tool: 'Commercial broom',
            unit: 'm²',
            ratePerHour: 400,
            defaultQuantity: 100,
            minimumQuantity: 10
          },
          {
            id: 'floor-mop',
            category: 'Floor Care',
            subcategory: 'Hard Floor Maintenance',
            task: 'Mop floor',
            tool: 'Commercial mop',
            unit: 'm²',
            ratePerHour: 300,
            defaultQuantity: 100,
            minimumQuantity: 10
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
            id: 'toilet-clean-standard',
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