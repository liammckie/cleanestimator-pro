export interface Site {
  id: string;
  name: string;
  address?: string;
  area: {
    squareFeet: number;
    spaceType: string;
    selectedTasks: Array<{
      taskId: string;
      quantity: number;
      timeRequired: number;
      frequency: {
        timesPerWeek: number;
        timesPerMonth: number;
      };
      productivityOverride?: number;
    }>;
    totalTime: number;
  };
}