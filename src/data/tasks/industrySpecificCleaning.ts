import { TaskCategory } from '../types/cleaning';
import { v4 as uuidv4 } from 'uuid';

export const industrySpecificCleaning: TaskCategory = {
  id: 'industry-specific',
  name: 'Industry-Specific Cleaning',
  description: 'Specialized cleaning tasks for specific industries',
  tasks: [
    {
      id: uuidv4(),
      name: 'Infection Control',
      rate: 80,
      unit: 'SQM/hour',
      category: 'Industry-Specific',
      subcategory: 'Healthcare',
      notes: 'Healthcare-specific sanitization',
      defaultTool: 'Medical Grade Sanitization Equipment'
    },
    {
      id: uuidv4(),
      name: 'Classroom Cleaning',
      rate: 200,
      unit: 'SQM/hour',
      category: 'Industry-Specific',
      subcategory: 'Education',
      notes: 'Education facilities cleaning',
      defaultTool: 'Classroom Cleaning Kit'
    },
    {
      id: uuidv4(),
      name: 'Retail Cleaning',
      rate: 250,
      unit: 'SQM/hour',
      category: 'Industry-Specific',
      subcategory: 'Retail/Grocery',
      notes: 'Covers shopping areas and entrances',
      defaultTool: 'Retail Cleaning Equipment'
    },
    {
      id: uuidv4(),
      name: 'Vehicle Cleaning',
      rate: 150,
      unit: 'SQM/hour',
      category: 'Industry-Specific',
      subcategory: 'Transportation',
      notes: 'Transportation hubs or fleets',
      defaultTool: 'Vehicle Cleaning Kit'
    },
    {
      id: uuidv4(),
      name: 'Hotel Room Cleaning',
      rate: 180,
      unit: 'SQM/hour',
      category: 'Industry-Specific',
      subcategory: 'Hospitality',
      notes: 'Accommodation turnover service',
      defaultTool: 'Hospitality Cleaning Kit'
    },
    {
      id: uuidv4(),
      name: 'Warehouse Cleaning',
      rate: 300,
      unit: 'SQM/hour',
      category: 'Industry-Specific',
      subcategory: 'Industrial',
      notes: 'Cleaning industrial storage spaces',
      defaultTool: 'Industrial Cleaning Equipment'
    },
    {
      id: uuidv4(),
      name: 'Kitchen Sanitization',
      rate: 100,
      unit: 'SQM/hour',
      category: 'Industry-Specific',
      subcategory: 'Commercial Kitchens',
      notes: 'For commercial kitchens and food prep areas',
      defaultTool: 'Commercial Kitchen Cleaning Kit'
    },
    {
      id: uuidv4(),
      name: 'Patient Room Disinfection',
      rate: 70,
      unit: 'SQM/hour',
      category: 'Industry-Specific',
      subcategory: 'Healthcare',
      notes: 'Hospitals and healthcare rooms',
      defaultTool: 'Medical Grade Disinfection Kit'
    },
    {
      id: uuidv4(),
      name: 'Office Deep Cleaning',
      rate: 150,
      unit: 'SQM/hour',
      category: 'Industry-Specific',
      subcategory: 'Corporate Offices',
      notes: 'Quarterly or annual cleaning',
      defaultTool: 'Deep Cleaning Equipment'
    },
    {
      id: uuidv4(),
      name: 'Parking Lot Cleaning',
      rate: 200,
      unit: 'SQM/hour',
      category: 'Industry-Specific',
      subcategory: 'Exteriors',
      notes: 'Sweeping and debris removal in parking spaces',
      defaultTool: 'Outdoor Cleaning Equipment'
    }
  ]
};