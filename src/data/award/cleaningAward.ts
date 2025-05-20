
import { AwardLevel, AllowanceType, VehicleType, ShiftTiming, PayCalculation, Allowance, EmploymentType } from '../types/award';

export const cleaningAwardLevels: AwardLevel[] = [
  {
    level: 1,
    description: "Grade 1",
    baseRate: 28.45,
    payRates: {
      standard: 28.45,
      earlyLate: 32.72,
      night: 32.72,
      saturday: 39.83,
      sunday: 51.21,
      publicHoliday: 71.13
    }
  },
  {
    level: 2,
    description: "Grade 2",
    baseRate: 29.04,
    payRates: {
      standard: 29.04,
      earlyLate: 33.40,
      night: 33.40,
      saturday: 40.66,
      sunday: 52.28,
      publicHoliday: 72.60
    }
  },
  {
    level: 3,
    description: "Grade 3",
    baseRate: 30.09,
    payRates: {
      standard: 30.09,
      earlyLate: 34.60,
      night: 34.60,
      saturday: 42.13,
      sunday: 54.17,
      publicHoliday: 75.23
    }
  }
];

export const casualRates = {
  1: { // Grade 1
    standard: 35.56,    // 28.45 × 1.25
    earlyLate: 40.90,   // 28.45 × 1.25 × 1.15
    night: 40.90,       // 28.45 × 1.25 × 1.15
    saturday: 49.79,    // 28.45 × 1.25 × 1.40
    sunday: 64.01,      // 28.45 × 1.25 × 1.80
    publicHoliday: 78.24 // 28.45 × 2.75
  },
  2: { // Grade 2
    standard: 36.30,    // 29.04 × 1.25
    earlyLate: 41.75,   // 29.04 × 1.25 × 1.15
    night: 41.75,       // 29.04 × 1.25 × 1.15
    saturday: 50.83,    // 29.04 × 1.25 × 1.40
    sunday: 65.35,      // 29.04 × 1.25 × 1.80
    publicHoliday: 79.86 // 29.04 × 2.75
  },
  3: { // Grade 3
    standard: 37.61,    // 30.09 × 1.25
    earlyLate: 43.25,   // 30.09 × 1.25 × 1.15
    night: 43.25,       // 30.09 × 1.25 × 1.15
    saturday: 52.66,    // 30.09 × 1.25 × 1.40
    sunday: 67.71,      // 30.09 × 1.25 × 1.80
    publicHoliday: 82.75 // 30.09 × 2.75
  }
};

export const cleaningAllowances: Allowance[] = [
  {
    name: 'First Aid',
    amount: 0.51,
    type: AllowanceType.HOURLY,
    enabled: false,
    description: "For designated and certified first aider"
  },
  {
    name: 'Toilet Cleaning',
    amount: 2.02,
    type: AllowanceType.PER_SHIFT,
    enabled: false,
    conditions: "Where primary duty includes cleaning toilets"
  },
  {
    name: 'Leading Hand (3-10 staff)',
    amount: 0.68,
    type: AllowanceType.HOURLY,
    enabled: false,
    description: "For supervisor or leading hand with 3-10 staff"
  },
  {
    name: 'Leading Hand (11-20 staff)',
    amount: 0.95,
    type: AllowanceType.HOURLY,
    enabled: false,
    description: "For supervisor or leading hand with 11-20 staff"
  },
  {
    name: 'Leading Hand (21+ staff)',
    amount: 1.22,
    type: AllowanceType.HOURLY,
    enabled: false,
    description: "For supervisor or leading hand with 21+ staff"
  },
  {
    name: 'Meal Allowance',
    amount: 16.94,
    type: AllowanceType.PER_OCCASION,
    enabled: false,
    conditions: "If shift > 9.5 hrs without prior notice"
  },
  {
    name: 'Broken Shift',
    amount: 4.35,
    type: AllowanceType.DAILY,
    maxWeekly: 21.73,
    enabled: false
  },
  {
    name: 'Cold Places',
    amount: 0.64,
    type: AllowanceType.HOURLY,
    enabled: false
  },
  {
    name: 'Hot Places (46-54°C)',
    amount: 0.64,
    type: AllowanceType.HOURLY,
    enabled: false
  },
  {
    name: 'Hot Places (>54°C)',
    amount: 0.77,
    type: AllowanceType.HOURLY,
    enabled: false
  },
  {
    name: 'Vehicle (car)',
    amount: 0.99,
    type: AllowanceType.PER_KM,
    vehicleType: VehicleType.CAR,
    enabled: false
  },
  {
    name: 'Vehicle (motorcycle)',
    amount: 0.33,
    type: AllowanceType.PER_KM,
    vehicleType: VehicleType.MOTORCYCLE,
    enabled: false
  }
];

export const shiftTimings: ShiftTiming[] = [
  {
    type: 'weekday',
    startTime: '06:00',
    endTime: '18:00',
    loading: 0,
    description: "Mon-Fri (Day)"
  },
  {
    type: 'earlyLate',
    loading: 0.15,
    description: "Mon-Fri (Evening/Night) - +15%"
  },
  {
    type: 'night',
    startTime: '00:00',
    endTime: '08:00',
    loading: 0.25,
    description: "Night Shift - +25%"
  },
  {
    type: 'saturday',
    loading: 0.40,
    description: "Saturday - +40%"
  },
  {
    type: 'sunday',
    loading: 0.80,
    description: "Sunday - +80%"
  },
  {
    type: 'publicHoliday',
    loading: 1.50,
    description: "Public Holiday - +150%"
  }
];

export const standardOnCosts = [
  { name: "Superannuation Guarantee", percentage: 12.0 },
  { name: "Workers' Compensation Insurance", percentage: 2.5 },
  { name: "Payroll Tax", percentage: 4.85 },
  { name: "Portable Long Service Leave", percentage: 1.8 },
  { name: "Annual Leave & Loading", percentage: 8.44 },
  { name: "Sick/Personal Leave Provision", percentage: 3.85 },
  { name: "Uniform & PPE", percentage: 0.5 },
  { name: "Recruitment & Training", percentage: 1.5 },
  { name: "Admin & Payroll Costs", percentage: 2.0 },
];

export const TOTAL_ONCOST_PERCENTAGE = 37.44; // Updated sum of all percentages
export const SUPERANNUATION_RATE = 0.12; // 12.0%
export const CASUAL_LOADING = 0.25; // 25%

export const calculatePayRate = (
  level: number,
  employmentType: EmploymentType,
  shiftType: ShiftTiming['type'],
  hours: number,
  allowances: string[],
  distance?: number
): PayCalculation => {
  const awardLevel = cleaningAwardLevels.find(l => l.level === level);
  if (!awardLevel) throw new Error('Invalid level');

  let basePayRate, totalPay;
  
  if (employmentType === EmploymentType.PERMANENT) {
    basePayRate = awardLevel.payRates[shiftType];
    totalPay = basePayRate * hours;
  } else {
    // Casual rate calculation
    const casualRate = casualRates[level as keyof typeof casualRates][shiftType as keyof (typeof casualRates)[1]];
    basePayRate = casualRate;
    totalPay = basePayRate * hours;
  }
  
  const allowancesTotal = allowances.reduce((total, allowanceName) => {
    const allowance = cleaningAllowances.find(a => a.name === allowanceName);
    if (!allowance) return total;

    switch (allowance.type) {
      case AllowanceType.HOURLY:
        return total + (allowance.amount * hours);
      case AllowanceType.DAILY:
        return total + allowance.amount;
      case AllowanceType.WEEKLY:
        return total + (allowance.amount / 5); // Assuming 5-day work week
      case AllowanceType.PER_KM:
        return total + (allowance.amount * (distance || 0));
      case AllowanceType.PER_SHIFT:
        return total + allowance.amount;
      case AllowanceType.PER_OCCASION:
        return total + allowance.amount;
      default:
        return total;
    }
  }, 0);

  const superannuation = totalPay * SUPERANNUATION_RATE;
  const grossWeeklyPay = totalPay * 5; // Assuming 5-day work week
  const totalAllowances = allowancesTotal;
  
  // Calculate penalty rates differently
  const standardRate = awardLevel.baseRate;
  const penaltyAmount = basePayRate - standardRate;
  const totalPenaltyRates = penaltyAmount * hours;
  
  const netPay = totalPay + allowancesTotal;
  const totalHours = hours;

  // Build breakdowns
  const breakdowns = {
    allowances: {} as Record<string, number>,
    penalties: {} as Record<string, number>
  };

  // Add allowance breakdowns
  allowances.forEach(name => {
    const allowance = cleaningAllowances.find(a => a.name === name);
    if (allowance) {
      let amount = 0;
      switch (allowance.type) {
        case AllowanceType.HOURLY:
          amount = allowance.amount * hours;
          break;
        case AllowanceType.DAILY:
          amount = allowance.amount;
          break;
        case AllowanceType.WEEKLY:
          amount = allowance.amount / 5;
          break;
        case AllowanceType.PER_KM:
          amount = allowance.amount * (distance || 0);
          break;
        case AllowanceType.PER_SHIFT:
          amount = allowance.amount;
          break;
        case AllowanceType.PER_OCCASION:
          amount = allowance.amount;
          break;
      }
      breakdowns.allowances[name] = amount;
    }
  });

  // Add penalty breakdown
  breakdowns.penalties[shiftType] = totalPenaltyRates;

  return {
    basePayRate,
    totalPay,
    superannuation,
    allowancesTotal,
    total: totalPay + allowancesTotal + superannuation,
    grossWeeklyPay,
    totalAllowances,
    totalPenaltyRates,
    netPay,
    totalHours,
    breakdowns
  };
};

// Helper function to get the correct rate based on level, employment type, and shift type
export const getHourlyRate = (
  level: number,
  employmentType: EmploymentType,
  shiftType: ShiftTiming['type']
): number => {
  if (employmentType === EmploymentType.PERMANENT) {
    const awardLevel = cleaningAwardLevels.find(l => l.level === level);
    return awardLevel?.payRates[shiftType] || 0;
  } else {
    // Casual rates
    const casualRate = casualRates[level as keyof typeof casualRates]?.[shiftType as keyof (typeof casualRates)[1]];
    return casualRate || 0;
  }
};

// Calculate fully loaded cost with on-costs
export const calculateFullyLoadedRate = (baseRate: number): number => {
  return baseRate * (1 + (TOTAL_ONCOST_PERCENTAGE / 100));
};
