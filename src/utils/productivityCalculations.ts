import { getRateById } from '@/data/rates/ratesManager';

export interface TaskProductivity {
  baseRate: number;
  adjustedRate: number;
  timeRequired: number;
  factors: {
    toolEfficiency: number;
    areaSize: number;
    frequency: number;
  };
}

export const calculateTaskProductivity = (
  taskId: string,
  quantity: number,
  selectedTool: string | undefined,
  frequency: { timesPerWeek: number; timesPerMonth: number },
  areaSize: number
): TaskProductivity | null => {
  const rate = getRateById(taskId);
  if (!rate) return null;

  const baseRate = rate.ratePerHour;
  if (!baseRate) return null;

  // Tool efficiency factor
  let toolEfficiency = 1;
  if (selectedTool) {
    const defaultTool = rate.tool.toLowerCase();
    const chosenTool = selectedTool.toLowerCase();

    if (chosenTool.includes('industrial') || chosenTool.includes('heavy duty')) {
      toolEfficiency = 1.2;
    } else if (chosenTool.includes('basic') || chosenTool.includes('manual')) {
      toolEfficiency = 0.8;
    }
  }

  // Area size factor
  const areaSizeFactor = calculateAreaSizeFactor(areaSize);

  // Frequency factor
  const frequencyFactor = calculateFrequencyFactor(frequency.timesPerWeek);

  // Calculate adjusted rate
  const adjustedRate = baseRate * toolEfficiency * areaSizeFactor * frequencyFactor;

  // Calculate time required in hours
  const timeRequired = quantity / adjustedRate;

  return {
    baseRate,
    adjustedRate,
    timeRequired,
    factors: {
      toolEfficiency,
      areaSize: areaSizeFactor,
      frequency: frequencyFactor
    }
  };
};

const calculateAreaSizeFactor = (areaSize: number): number => {
  if (areaSize <= 0) return 1;
  if (areaSize > 1000) return 1.15;
  if (areaSize > 500) return 1.1;
  if (areaSize > 250) return 1.05;
  return 1;
};

const calculateFrequencyFactor = (timesPerWeek: number): number => {
  if (timesPerWeek <= 0) return 1;
  if (timesPerWeek >= 5) return 1.15;
  if (timesPerWeek >= 3) return 1.1;
  return 1;
};

export const calculateTotalProductivity = (tasks: Array<{
  taskId: string;
  quantity: number;
  selectedTool?: string;
  frequency: { timesPerWeek: number; timesPerMonth: number };
}>): number => {
  return tasks.reduce((total, task) => {
    const productivity = calculateTaskProductivity(
      task.taskId,
      task.quantity,
      task.selectedTool,
      task.frequency,
      task.quantity
    );
    
    if (!productivity) return total;
    return total + productivity.timeRequired;
  }, 0);
};