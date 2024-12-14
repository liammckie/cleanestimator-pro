import { Site } from '@/data/types/site';
import { Employee, Shift } from '@/data/types/roster';
import { OnCostsState } from '@/data/types/onCosts';

export interface CalculationStep {
  id: string;
  name: string;
  description: string;
  calculate: (data: CalculationData) => number;
}

export interface CalculationData {
  sites: Site[];
  laborRate: number;
  onCosts: OnCostsState;
  employees: Employee[];
  shifts: Shift[];
  equipmentCosts: number;
  overheadPercentage: number;
}

export const calculationSteps: CalculationStep[] = [
  {
    id: 'labor',
    name: 'Labor Costs',
    description: 'Calculate base labor costs including award rates and penalties',
    calculate: (data) => {
      const totalMonthlyMinutes = data.sites.reduce((total, site) => 
        total + (site.area.totalTime * 60), 0);
      const monthlyHours = totalMonthlyMinutes / 60;
      return monthlyHours * data.laborRate;
    }
  },
  {
    id: 'oncosts',
    name: 'On-Costs',
    description: 'Calculate statutory and optional on-costs',
    calculate: (data) => {
      const baseLaborCost = calculationSteps[0].calculate(data);
      let totalOnCostPercentage = 0;

      Object.values(data.onCosts).forEach(category => {
        category.forEach(onCost => {
          if (onCost.isEnabled) {
            totalOnCostPercentage += onCost.rate;
          }
        });
      });

      return (baseLaborCost * totalOnCostPercentage) / 100;
    }
  },
  {
    id: 'equipment',
    name: 'Equipment & Materials',
    description: 'Calculate equipment and material costs',
    calculate: (data) => {
      return data.equipmentCosts;
    }
  },
  {
    id: 'overhead',
    name: 'Overhead',
    description: 'Calculate overhead costs',
    calculate: (data) => {
      const subtotal = calculationSteps.slice(0, 3)
        .reduce((sum, step) => sum + step.calculate(data), 0);
      return subtotal * (data.overheadPercentage / 100);
    }
  }
];

export const calculateTotalCost = (data: CalculationData): number => {
  return calculationSteps.reduce((total, step) => total + step.calculate(data), 0);
};

export const generateRosterSuggestion = (data: CalculationData) => {
  const totalMonthlyMinutes = data.sites.reduce((total, site) => 
    total + (site.area.totalTime * 60), 0);
  const monthlyHours = totalMonthlyMinutes / 60;
  const weeklyHours = monthlyHours / 4.33;
  
  const FULL_TIME_HOURS = 38;
  const PART_TIME_MIN_HOURS = 15;
  
  const fullTimeEquivalent = weeklyHours / FULL_TIME_HOURS;
  const fullTimeStaff = Math.floor(fullTimeEquivalent);
  const remainingHours = (fullTimeEquivalent - fullTimeStaff) * FULL_TIME_HOURS;
  
  return {
    fullTimeStaff,
    partTimeStaff: remainingHours >= PART_TIME_MIN_HOURS ? 
      Math.ceil(remainingHours / 20) : 0,
    casualStaff: remainingHours > 0 && remainingHours < PART_TIME_MIN_HOURS ? 1 : 0,
    totalWeeklyHours: weeklyHours,
    totalMonthlyHours: monthlyHours
  };
};