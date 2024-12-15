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
            }
          ]
        }
      ]
    }
  ]
};