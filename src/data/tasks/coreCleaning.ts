import { TaskCategory } from '../types/cleaning';
import { v4 as uuidv4 } from 'uuid';

export const coreCleaning: TaskCategory = {
  id: 'core-cleaning',
  name: 'Core Cleaning',
  description: 'Essential cleaning tasks for all facilities',
  tasks: [
    {
      id: uuidv4(),
      name: 'Vacuuming',
      rate: 400,
      unit: 'SQM/hour',
      category: 'Core Cleaning',
      notes: 'Standard carpet vacuuming',
      defaultTool: 'Commercial Vacuum Cleaner'
    },
    {
      id: uuidv4(),
      name: 'Toilet Cleaning',
      rate: 50,
      unit: 'SQM/hour',
      category: 'Core Cleaning',
      notes: 'Includes disinfecting and wiping',
      defaultTool: 'Bathroom Cleaning Kit'
    },
    {
      id: uuidv4(),
      name: 'Window Washing',
      rate: 100,
      unit: 'SQM/hour',
      category: 'Core Cleaning',
      notes: 'Covers inside and outside cleaning',
      defaultTool: 'Window Cleaning Kit'
    },
    {
      id: uuidv4(),
      name: 'Mopping',
      rate: 300,
      unit: 'SQM/hour',
      category: 'Core Cleaning',
      notes: 'For hard floors in offices and hallways',
      defaultTool: 'Commercial Mop'
    },
    {
      id: uuidv4(),
      name: 'Dusting',
      rate: 350,
      unit: 'SQM/hour',
      category: 'Core Cleaning',
      notes: 'Includes surfaces, furniture, and blinds',
      defaultTool: 'Dusting Kit'
    },
    {
      id: uuidv4(),
      name: 'Stairwell Cleaning',
      rate: 200,
      unit: 'SQM/hour',
      category: 'Core Cleaning',
      notes: 'Includes mopping steps and handrails',
      defaultTool: 'Stairwell Cleaning Kit'
    },
    {
      id: uuidv4(),
      name: 'Furniture Cleaning',
      rate: 250,
      unit: 'SQM/hour',
      category: 'Core Cleaning',
      notes: 'Dusting and wiping furniture surfaces',
      defaultTool: 'Furniture Cleaning Kit'
    },
    {
      id: uuidv4(),
      name: 'Drinking Fountain Cleaning',
      rate: 120,
      unit: 'SQM/hour',
      category: 'Core Cleaning',
      notes: 'Sanitizing and polishing',
      defaultTool: 'Sanitization Kit'
    },
    {
      id: uuidv4(),
      name: 'Trash Removal',
      rate: 200,
      unit: 'SQM/hour',
      category: 'Core Cleaning',
      notes: 'Emptying and replacing trash bags',
      defaultTool: 'Waste Management Cart'
    },
    {
      id: uuidv4(),
      name: 'Carpet Spot Cleaning',
      rate: 150,
      unit: 'SQM/hour',
      category: 'Core Cleaning',
      notes: 'Spot treatment for stains',
      defaultTool: 'Spot Cleaning Kit'
    }
  ]
};