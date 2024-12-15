export interface Site {
  id: string;
  name: string;
  client: string;
  address: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  area: {
    squareMeters: number;
    spaceType: string;
    industryType: string;
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