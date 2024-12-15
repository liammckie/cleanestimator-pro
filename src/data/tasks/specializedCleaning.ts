import { TaskCategory } from '../types/cleaning';
import { v4 as uuidv4 } from 'uuid';

export const specializedCleaning: TaskCategory = {
  id: 'specialized-cleaning',
  name: 'Specialized Cleaning',
  description: 'Advanced cleaning tasks requiring special equipment or training',
  tasks: [
    {
      id: uuidv4(),
      name: 'Snow Removal',
      rate: 150,
      unit: 'SQM/hour',
      category: 'Specialized Cleaning',
      notes: 'Seasonal task for exteriors',
      defaultTool: 'Snow Removal Equipment'
    },
    {
      id: uuidv4(),
      name: 'Trash Sorting and Recycling',
      rate: 90,
      unit: 'SQM/hour',
      category: 'Specialized Cleaning',
      notes: 'Includes sorting recyclable materials',
      defaultTool: 'Recycling Bins'
    },
    {
      id: uuidv4(),
      name: 'Deep Cleaning',
      rate: 120,
      unit: 'SQM/hour',
      category: 'Specialized Cleaning',
      notes: 'For high-traffic or stained areas',
      defaultTool: 'Deep Cleaning Equipment'
    },
    {
      id: uuidv4(),
      name: 'Floor Polishing',
      rate: 200,
      unit: 'SQM/hour',
      category: 'Specialized Cleaning',
      notes: 'Polishing hardwood or tiled floors',
      defaultTool: 'Floor Polisher'
    },
    {
      id: uuidv4(),
      name: 'Grout Cleaning',
      rate: 80,
      unit: 'SQM/hour',
      category: 'Specialized Cleaning',
      notes: 'Deep cleaning tile grout lines',
      defaultTool: 'Grout Cleaning Tools'
    },
    {
      id: uuidv4(),
      name: 'High-Pressure Cleaning',
      rate: 180,
      unit: 'SQM/hour',
      category: 'Specialized Cleaning',
      notes: 'For exteriors and stubborn stains',
      defaultTool: 'Pressure Washer'
    },
    {
      id: uuidv4(),
      name: 'Ceiling Cleaning',
      rate: 70,
      unit: 'SQM/hour',
      category: 'Specialized Cleaning',
      notes: 'Removing dust and cobwebs',
      defaultTool: 'Extended Cleaning Tools'
    },
    {
      id: uuidv4(),
      name: 'Glass Cleaning',
      rate: 100,
      unit: 'SQM/hour',
      category: 'Specialized Cleaning',
      notes: 'Covers glass partitions and panels',
      defaultTool: 'Glass Cleaning Kit'
    },
    {
      id: uuidv4(),
      name: 'Tool Cleaning',
      rate: 80,
      unit: 'Units/hour',
      category: 'Specialized Cleaning',
      notes: 'Cleaning and maintaining tools',
      defaultTool: 'Tool Maintenance Kit'
    },
    {
      id: uuidv4(),
      name: 'Wall Washing',
      rate: 90,
      unit: 'SQM/hour',
      category: 'Specialized Cleaning',
      notes: 'Cleaning smudges and marks on walls',
      defaultTool: 'Wall Cleaning Equipment'
    }
  ]
};