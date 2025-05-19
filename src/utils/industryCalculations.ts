
import { IndustryArea, TemplateTask } from '@/data/types/industryRates';

export interface TimeCalculation {
  timeRequired: number;
  rateUsed: number;
}

export const calculateAreaTime = (
  area: IndustryArea | undefined,
  measurement: number,
  floorType: 'soft' | 'hard' = 'soft'
): TimeCalculation | null => {
  if (!area || measurement <= 0) {
    return null;
  }

  // Get the appropriate rate based on floor type
  const rate = floorType === 'soft' 
    ? area.prodRateSoftFloor 
    : area.prodRateHardFloor;
    
  if (!rate || rate <= 0) {
    return null;
  }

  // Calculate time in hours: SQM / productivity rate
  const timeRequired = measurement / rate;
  
  return {
    timeRequired,
    rateUsed: rate
  };
};

export const calculateToiletFixtureTime = (
  area: IndustryArea | undefined,
  units: number = 1
): TimeCalculation | null => {
  if (!area?.toiletFixtures || units <= 0) {
    return null;
  }

  // Calculate total fixtures
  const fixtures = area.toiletFixtures;
  const totalFixtures = [
    fixtures.pans || 0,
    fixtures.basins || 0,
    fixtures.ssUrinals || 0,
    fixtures.ceramicUrinals || 0,
    fixtures.showers || 0
  ].reduce((a, b) => a + b, 0);

  if (totalFixtures <= 0) {
    return null;
  }

  // Each fixture takes approximately 5 minutes to clean
  // Convert to hours (5 minutes = 5/60 hours)
  const timePerFixture = 5 / 60;
  const timeRequired = totalFixtures * units * timePerFixture;
  
  return {
    timeRequired,
    rateUsed: totalFixtures
  };
};

export const calculateTaskTimes = (tasks: TemplateTask[]): TemplateTask[] => {
  return tasks.map(task => {
    // Skip calculation if no measurement provided
    if (task.measurement === undefined || task.measurement <= 0) {
      return task;
    }

    let timeRequired = 0;
    
    if (task.isArea && task.floorType) {
      // Create an area object from task data
      const area: IndustryArea = {
        areaName: task.areaType || task.name,
        prodRateSoftFloor: task.productivityRate?.softFloor || 0,
        prodRateHardFloor: task.productivityRate?.hardFloor || 0,
        toiletFixtures: task.productivityRate?.toiletFixtures
      };
      
      if (task.productivityRate?.toiletFixtures) {
        // This is a toilet area, calculate based on fixtures
        const calculation = calculateToiletFixtureTime(area, task.measurement);
        if (calculation) {
          timeRequired = calculation.timeRequired;
        }
      } else {
        // Regular area, calculate based on floor type and sqm
        const calculation = calculateAreaTime(area, task.measurement, task.floorType);
        if (calculation) {
          timeRequired = calculation.timeRequired;
        }
      }
    } else {
      // For custom tasks, assume 15 min per unit
      timeRequired = (task.measurement * 15) / 60;
    }

    return {
      ...task,
      timeRequired
    };
  });
};

export const calculateTotalTime = (tasks: TemplateTask[]): number => {
  return tasks.reduce((total, task) => {
    const frequency = parseInt(task.frequency || '1');
    return total + (task.timeRequired || 0) * frequency;
  }, 0);
};
