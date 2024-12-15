import { TaskGroup } from '../../types/productivity';

export const specializedCleaning: TaskGroup = {
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
};