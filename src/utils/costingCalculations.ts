import { Site } from '@/data/types/site';
import { OnCostsState } from '@/data/types/onCosts';
import { getProductivityRate } from '@/data/productivityRates';

export interface TaskCostBreakdown {
  taskId: string;
  siteName: string;
  timeRequired: number;
  monthlyCost: number;
}

export const calculateTaskCosts = (
  sites: Site[],
  laborRate: number,
  onCosts?: OnCostsState
): TaskCostBreakdown[] => {
  const taskCosts: TaskCostBreakdown[] = [];
  
  sites.forEach(site => {
    if (!site.area?.selectedTasks) return;
    
    site.area.selectedTasks.forEach(task => {
      if (!task.timeRequired) {
        console.log('Task has no time requirement:', task);
        return;
      }

      // Calculate monthly hours based on frequency and time required
      const monthlyHours = task.timeRequired * (task.frequency?.timesPerMonth || 4.33);
      
      // Calculate base labor cost
      const baseCost = monthlyHours * laborRate;
      
      // Calculate additional costs if onCosts are provided
      let totalCost = baseCost;
      if (onCosts) {
        const totalOnCostPercentage = Object.values(onCosts).reduce((total, category) => {
          return total + category.reduce((sum, cost) => {
            return sum + (cost.isEnabled ? cost.rate : 0);
          }, 0);
        }, 0);
        
        totalCost = baseCost * (1 + (totalOnCostPercentage / 100));
      }

      taskCosts.push({
        taskId: task.taskId,
        siteName: site.name,
        timeRequired: monthlyHours,
        monthlyCost: totalCost
      });

      console.log('Task cost calculated:', {
        taskId: task.taskId,
        monthlyHours,
        baseCost,
        totalCost,
        laborRate
      });
    });
  });

  return taskCosts;
};

export const calculateTotalMonthlyHours = (sites: Site[]): number => {
  return sites.reduce((total, site) => {
    if (!site.area?.selectedTasks) return total;
    
    return total + site.area.selectedTasks.reduce((siteTotal, task) => {
      const monthlyHours = (task.timeRequired || 0) * (task.frequency?.timesPerMonth || 4.33);
      console.log('Monthly hours for task:', {
        taskId: task.taskId,
        monthlyHours,
        timeRequired: task.timeRequired,
        frequency: task.frequency
      });
      return siteTotal + monthlyHours;
    }, 0);
  }, 0);
};

export const calculateEquipmentCosts = (equipmentCosts: { monthly: number }): number => {
  return equipmentCosts.monthly || 0;
};