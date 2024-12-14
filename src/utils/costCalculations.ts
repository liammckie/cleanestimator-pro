import { Site } from '@/data/types/site';
import { getProductivityRate } from '@/data/productivityRates';

export interface CostBreakdown {
  totalMonthlyMinutes: number;
  suggestedMonthlyHours: number;
  suggestedWeeklyHours: number;
  laborCostPerHour: number;
  totalMonthlyCost: number;
  rosterSuggestion: {
    fullTimeStaff: number;
    partTimeStaff: number;
    casualStaff: number;
  };
}

const HOURS_PER_WEEK = 38; // Standard full-time hours
const WEEKS_PER_MONTH = 4.33;

export const calculateCosts = (
  sites: Site[],
  laborRate: number
): CostBreakdown => {
  // Calculate total minutes across all sites
  const totalMonthlyMinutes = sites.reduce((total, site) => {
    return total + (site.area.totalTime * 60);
  }, 0);

  const suggestedMonthlyHours = totalMonthlyMinutes / 60;
  const suggestedWeeklyHours = suggestedMonthlyHours / WEEKS_PER_MONTH;

  // Calculate staff requirements
  const fullTimeEquivalent = suggestedWeeklyHours / HOURS_PER_WEEK;
  
  // Calculate suggested staff mix
  const fullTimeStaff = Math.floor(fullTimeEquivalent);
  const remainingHours = (fullTimeEquivalent - fullTimeStaff) * HOURS_PER_WEEK;
  const partTimeStaff = remainingHours > 15 ? Math.ceil(remainingHours / 20) : 0;
  const casualStaff = remainingHours > 0 && remainingHours <= 15 ? 1 : 0;

  return {
    totalMonthlyMinutes,
    suggestedMonthlyHours,
    suggestedWeeklyHours,
    laborCostPerHour: laborRate,
    totalMonthlyCost: suggestedMonthlyHours * laborRate,
    rosterSuggestion: {
      fullTimeStaff,
      partTimeStaff,
      casualStaff
    }
  };
};

export const calculateTaskTime = (
  taskId: string,
  quantity: number,
  frequency: { timesPerWeek: number; timesPerMonth: number },
  productivityOverride?: number
): number => {
  const rate = getProductivityRate(taskId);
  if (!rate) return 0;

  const ratePerHour = productivityOverride || rate.ratePerHour;
  const baseTime = quantity / ratePerHour; // Hours per service
  return baseTime * frequency.timesPerWeek * WEEKS_PER_MONTH; // Monthly hours
};