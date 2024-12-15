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
              id: 'trash-sorting',
              category: 'Specialized Cleaning',
              subcategory: 'Specialized Cleaning',
              task: 'Trash Sorting and Recycling',
              tool: 'Waste Management Equipment',
              unit: 'SQM/hour',
              ratePerHour: 90,
              notes: 'Includes sorting recyclable materials'
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
              id: 'grout-cleaning',
              category: 'Specialized Cleaning',
              subcategory: 'Specialized Cleaning',
              task: 'Grout Cleaning',
              tool: 'Grout Cleaning Equipment',
              unit: 'SQM/hour',
              ratePerHour: 80,
              notes: 'Deep cleaning tile grout lines'
            },
            {
              id: 'pressure-cleaning',
              category: 'Specialized Cleaning',
              subcategory: 'Specialized Cleaning',
              task: 'High-Pressure Cleaning',
              tool: 'Pressure Washer',
              unit: 'SQM/hour',
              ratePerHour: 180,
              notes: 'For exteriors and stubborn stains'
            },
            {
              id: 'ceiling-cleaning',
              category: 'Specialized Cleaning',
              subcategory: 'Specialized Cleaning',
              task: 'Ceiling Cleaning',
              tool: 'Extended Cleaning Tools',
              unit: 'SQM/hour',
              ratePerHour: 70,
              notes: 'Removing dust and cobwebs'
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
            },
            {
              id: 'tool-cleaning',
              category: 'Specialized Cleaning',
              subcategory: 'Specialized Cleaning',
              task: 'Tool Cleaning',
              tool: 'Cleaning Equipment',
              unit: 'Units/hour',
              ratePerHour: 80,
              notes: 'Cleaning and maintaining tools'
            },
            {
              id: 'wall-washing',
              category: 'Specialized Cleaning',
              subcategory: 'Specialized Cleaning',
              task: 'Wall Washing',
              tool: 'Wall Cleaning Equipment',
              unit: 'SQM/hour',
              ratePerHour: 90,
              notes: 'Cleaning smudges and marks on walls'
            }
          ]
        }
      ]
    }
  ]
};