export interface ProductivityRate {
  id: string;
  category: string;
  taskName: string;
  productivityRate: number;
  measurementUnit: string;
  notes: string;
}

export const cleaningProductivityRates: ProductivityRate[] = [
  {
    id: 'vacuum-1',
    category: 'Core Cleaning',
    taskName: 'Vacuuming',
    productivityRate: 400,
    measurementUnit: 'SQM/hour',
    notes: 'Standard carpet vacuuming'
  },
  {
    id: 'mop-1',
    category: 'Core Cleaning',
    taskName: 'Mopping',
    productivityRate: 300,
    measurementUnit: 'SQM/hour',
    notes: 'Hard floors in offices and hallways'
  },
  // ... Add all other tasks following the same pattern
];

export const getTasksByCategory = (category: string): ProductivityRate[] => {
  return cleaningProductivityRates.filter(task => task.category === category);
};

export const getTaskById = (id: string): ProductivityRate | undefined => {
  return cleaningProductivityRates.find(task => task.id === id);
};