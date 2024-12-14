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
): TaskProductivity => {
  const rate = getRateById(taskId);
  if (!rate) {
    return {
      baseRate: 0,
      adjustedRate: 0,
      factors: { toolEfficiency: 1, areaSize: 1, frequency: 1 }
    };
  }

  // Base productivity rate from the task definition
  const baseRate = rate.ratePerHour;

  // Tool efficiency factor (can be adjusted based on selected tool)
  let toolEfficiency = 1;
  if (selectedTool) {
    // Adjust efficiency based on tool type
    switch (selectedTool.toLowerCase()) {
      case 'industrial':
      case 'heavy duty':
        toolEfficiency = 1.2; // 20% more efficient
        break;
      case 'manual':
      case 'basic':
        toolEfficiency = 0.8; // 20% less efficient
        break;
      default:
        toolEfficiency = 1;
    }
  }

  // Area size factor (economies of scale)
  const areaSizeFactor = areaSize > 1000 ? 1.1 : areaSize > 500 ? 1.05 : 1;

  // Frequency factor (improved efficiency with repetition)
  const frequencyFactor = frequency.timesPerWeek > 3 ? 1.1 : 1;

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
    return total + productivity.adjustedRate * task.quantity;
  }, 0);
};