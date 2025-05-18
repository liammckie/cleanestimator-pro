import { Site } from '@/data/types/site';
import { OnCostsState } from '@/data/types/onCosts';
import { EmploymentType } from '@/data/types/award';
import { getHourlyRate, calculateFullyLoadedRate } from '@/data/award/cleaningAward';
import { calculateTotalMonthlyHours } from './costingCalculations';

export interface ContractOptions {
  engagement: 'contracted' | 'direct';
  contractedRate?: number;
  awardLevel?: number;
  shiftType?: string;
  onCosts?: OnCostsState;
  contractLengthYears: number;
  cpiIncreases: {
    yearOne: number;
    yearTwo: number;
    yearThree: number;
  };
  margin: number;
  equipmentCosts: { monthly: number };
}

export interface MonthlyPnL {
  revenue: number;
  laborCost: number;
  equipmentCost: number;
  overhead: number;
  profit: number;
  margin: number;
  totalHours: number;
  roster: {
    fullTimeStaff: number;
    partTimeStaff: number;
    casualStaff: number;
  };
}

export interface YearlyPnL {
  year: number;
  revenue: number;
  laborCost: number;
  equipmentCost: number;
  overhead: number;
  profit: number;
  margin: number;
}

export interface PnLResult {
  monthly: MonthlyPnL;
  yearly: YearlyPnL[];
}

const OVERHEAD_RATE = 0.15;
const WEEKS_PER_MONTH = 4.33;
const FULL_TIME_HOURS = 38;

const calculateRoster = (monthlyHours: number) => {
  const weeklyHours = monthlyHours / WEEKS_PER_MONTH;
  const fullTimeEquivalent = weeklyHours / FULL_TIME_HOURS;
  const fullTimeStaff = Math.floor(fullTimeEquivalent);
  const remainingHours = (fullTimeEquivalent - fullTimeStaff) * FULL_TIME_HOURS;
  return {
    fullTimeStaff,
    partTimeStaff: remainingHours >= 15 ? Math.ceil(remainingHours / 20) : 0,
    casualStaff: remainingHours > 0 && remainingHours < 15 ? 1 : 0,
    weeklyHours,
    monthlyHours
  };
};

const computeHourlyRate = (
  options: ContractOptions
): number => {
  if (options.engagement === 'contracted') {
    return options.contractedRate || 0;
  }

  const baseRate = getHourlyRate(
    options.awardLevel || 1,
    EmploymentType.PERMANENT,
    (options.shiftType || 'standard') as any
  );
  let rate = calculateFullyLoadedRate(baseRate);

  if (options.onCosts) {
    const extra = Object.values(options.onCosts).reduce((sum, category) => {
      return sum + category.reduce((s, item) => s + (item.isEnabled ? item.rate : 0), 0);
    }, 0);
    rate = rate * (1 + extra / 100);
  }
  return rate;
};

export const calculateContractPnL = (
  sites: Site[],
  options: ContractOptions
): PnLResult => {
  const monthlyHours = calculateTotalMonthlyHours(sites);
  const hourlyRate = computeHourlyRate(options);

  const monthlyLaborCost = monthlyHours * hourlyRate;
  const monthlyEquipmentCost = options.equipmentCosts.monthly || 0;

  const baseCosts = monthlyLaborCost + monthlyEquipmentCost;
  const revenue = baseCosts / (1 - options.margin / 100);
  const overhead = revenue * OVERHEAD_RATE;
  const profit = revenue - monthlyLaborCost - monthlyEquipmentCost - overhead;
  const achievedMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

  const roster = calculateRoster(monthlyHours);

  const yearly: YearlyPnL[] = [];
  const cpi = [0, options.cpiIncreases.yearOne, options.cpiIncreases.yearTwo, options.cpiIncreases.yearThree];

  for (let year = 1; year <= options.contractLengthYears; year++) {
    let multiplier = 1;
    for (let i = 1; i < year; i++) {
      multiplier *= 1 + (cpi[i] || 0) / 100;
    }

    const yearlyRevenue = revenue * 12 * multiplier;
    const yearlyLaborCost = monthlyLaborCost * 12 * multiplier;
    const yearlyEquipmentCost = monthlyEquipmentCost * 12;
    const yearlyOverhead = overhead * 12 * multiplier;
    const yearlyProfit = yearlyRevenue - yearlyLaborCost - yearlyEquipmentCost - yearlyOverhead;
    const yearlyMargin = yearlyRevenue > 0 ? (yearlyProfit / yearlyRevenue) * 100 : 0;

    yearly.push({
      year,
      revenue: yearlyRevenue,
      laborCost: yearlyLaborCost,
      equipmentCost: yearlyEquipmentCost,
      overhead: yearlyOverhead,
      profit: yearlyProfit,
      margin: yearlyMargin
    });
  }

  return {
    monthly: {
      revenue,
      laborCost: monthlyLaborCost,
      equipmentCost: monthlyEquipmentCost,
      overhead,
      profit,
      margin: achievedMargin,
      totalHours: monthlyHours,
      roster: {
        fullTimeStaff: roster.fullTimeStaff,
        partTimeStaff: roster.partTimeStaff,
        casualStaff: roster.casualStaff
      }
    },
    yearly
  };
};
