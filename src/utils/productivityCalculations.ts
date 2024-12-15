import { getRateById } from '@/data/rates/ratesManager';

export interface TaskProductivity {
  baseRate: number;
  adjustedRate: number;
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
  // Get the rate definition
  const rate = getRateById(taskId);
  if (!rate) {
    console.warn(`No rate found for task ID: ${taskId}`);
    return null;
  }

  // Base productivity rate from the task definition
  const baseRate = rate.ratePerHour || 0;
  if (baseRate <= 0) {
    console.warn(`Invalid base rate for task ID: ${taskId}`);
    return null;
  }

  // Tool efficiency factor
  let toolEfficiency = 1;
  if (selectedTool) {
    // Check if the selected tool matches or is an upgrade of the default tool
    const defaultTool = rate.tool.toLowerCase();
    const chosenTool = selectedTool.toLowerCase();

    if (chosenTool.includes('industrial') || chosenTool.includes('heavy duty')) {
      toolEfficiency = 1.2; // 20% more efficient
    } else if (chosenTool.includes('basic') || chosenTool.includes('manual')) {
      toolEfficiency = 0.8; // 20% less efficient
    } else if (chosenTool === defaultTool) {
      toolEfficiency = 1; // Same efficiency as default
    } else {
      // If tools are different but not clearly better/worse, assume standard efficiency
      toolEfficiency = 1;
    }
  }

  // Area size factor (economies of scale)
  const areaSizeFactor = calculateAreaSizeFactor(areaSize);

  // Frequency factor (improved efficiency with repetition)
  const frequencyFactor = calculateFrequencyFactor(frequency.timesPerWeek);

  // Calculate adjusted rate
  const adjustedRate = baseRate * toolEfficiency * areaSizeFactor * frequencyFactor;

  return {
    baseRate,
    adjustedRate,
    factors: {
      toolEfficiency,
      areaSize: areaSizeFactor,
      frequency: frequencyFactor
    }
  };
};

const calculateAreaSizeFactor = (areaSize: number): number => {
  if (areaSize <= 0) return 1;
  if (areaSize > 1000) return 1.15; // 15% more efficient for very large areas
  if (areaSize > 500) return 1.1;   // 10% more efficient for large areas
  if (areaSize > 250) return 1.05;  // 5% more efficient for medium areas
  return 1;
};

const calculateFrequencyFactor = (timesPerWeek: number): number => {
  if (timesPerWeek <= 0) return 1;
  if (timesPerWeek >= 5) return 1.15; // 15% more efficient for daily tasks
  if (timesPerWeek >= 3) return 1.1;  // 10% more efficient for frequent tasks
  return 1;
};

export const calculateTotalProductivity = (
  tasks: Array<{
    taskId: string;
    quantity: number;
    selectedTool?: string;
    frequency: { timesPerWeek: number; timesPerMonth: number };
  }>,
  areaSize: number
): number => {
  return tasks.reduce((total, task) => {
    const productivity = calculateTaskProductivity(
      task.taskId,
      task.quantity,
      task.selectedTool,
      task.frequency,
      areaSize
    );
    
    if (!productivity) return total;
    return total + (productivity.adjustedRate * task.quantity);
  }, 0);
};