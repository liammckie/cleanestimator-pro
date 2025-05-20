
import { OnCostsState } from '@/data/types/onCosts';

/**
 * Calculate the total on-cost percentage based on enabled items
 */
export const calculateTotalOnCostPercentage = (onCosts: OnCostsState): number => {
  let totalPercentage = 0;

  // Sum all enabled on-costs from each category
  Object.values(onCosts).forEach(categoryItems => {
    categoryItems.forEach(item => {
      if (item.isEnabled) {
        totalPercentage += item.rate;
      }
    });
  });

  return totalPercentage;
};

/**
 * Apply on-costs to a base hourly rate
 */
export const calculateRateWithOnCosts = (
  baseHourlyRate: number, 
  onCosts: OnCostsState
): number => {
  const totalOnCostPercentage = calculateTotalOnCostPercentage(onCosts);
  return baseHourlyRate * (1 + (totalOnCostPercentage / 100));
};

/**
 * Calculate the cost breakdown for a given base rate and on-costs
 */
export const calculateOnCostBreakdown = (
  baseRate: number,
  onCosts: OnCostsState
): {
  category: string;
  name: string;
  amount: number;
  percentage: number;
}[] => {
  const breakdown: {
    category: string;
    name: string;
    amount: number;
    percentage: number;
  }[] = [];

  Object.entries(onCosts).forEach(([category, items]) => {
    items.forEach(item => {
      if (item.isEnabled) {
        breakdown.push({
          category: item.category,
          name: item.name,
          amount: baseRate * (item.rate / 100),
          percentage: item.rate
        });
      }
    });
  });

  return breakdown;
};
