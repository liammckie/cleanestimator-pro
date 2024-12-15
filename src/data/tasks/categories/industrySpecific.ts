import { TaskGroup } from '../../types/productivity';

export const industrySpecific: TaskGroup = {
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
            },
            {
              id: 'warehouse-cleaning',
              category: 'Industry-Specific',
              subcategory: 'Industry-Specific',
              task: 'Warehouse Cleaning',
              tool: 'Industrial Cleaning Equipment',
              unit: 'SQM/hour',
              ratePerHour: 300,
              notes: 'Cleaning industrial storage spaces'
            },
            {
              id: 'kitchen-sanitization',
              category: 'Industry-Specific',
              subcategory: 'Industry-Specific',
              task: 'Kitchen Sanitization',
              tool: 'Commercial Kitchen Cleaning Kit',
              unit: 'SQM/hour',
              ratePerHour: 100,
              notes: 'For commercial kitchens and prep areas'
            },
            {
              id: 'office-deep-cleaning',
              category: 'Industry-Specific',
              subcategory: 'Industry-Specific',
              task: 'Office Deep Cleaning',
              tool: 'Deep Cleaning Equipment',
              unit: 'SQM/hour',
              ratePerHour: 150,
              notes: 'Quarterly or annual cleaning'
            },
            {
              id: 'parking-lot-cleaning',
              category: 'Industry-Specific',
              subcategory: 'Industry-Specific',
              task: 'Parking Lot Cleaning',
              tool: 'Outdoor Cleaning Equipment',
              unit: 'SQM/hour',
              ratePerHour: 200,
              notes: 'Sweeping and debris removal'
            }
          ]
        }
      ]
    }
  ]
};