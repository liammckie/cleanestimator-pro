import { AwardLevel, Allowance, ShiftTiming } from '../types/award';

export const cleaningAwardLevels: AwardLevel[] = [
  {
    level: 1,
    payRates: {
      standard: 31.21,
      earlyLate: 34.96,
      night: 38.70,
      saturday: 43.70,
      sunday: 56.18,
      publicHoliday: 68.67
    }
  },
  {
    level: 2,
    payRates: {
      standard: 32.25,
      earlyLate: 36.12,
      night: 39.99,
      saturday: 45.15,
      sunday: 58.05,
      publicHoliday: 70.95
    }
  },
  {
    level: 3,
    payRates: {
      standard: 33.96,
      earlyLate: 38.04,
      night: 42.11,
      saturday: 47.55,
      sunday: 61.13,
      publicHoliday: 74.72
    }
  }
];

export const cleaningAllowances: Allowance[] = [
  {
    name: 'First Aid',
    amount: 15.56,
    type: 'weekly'
  },
  {
    name: 'Height (up to 22nd floor)',
    amount: 1.02,
    type: 'hourly'
  },
  {
    name: 'Height (above 22nd floor)',
    amount: 2.10,
    type: 'hourly'
  },
  {
    name: 'Broken Shift',
    amount: 4.35,
    type: 'daily',
    maxWeekly: 21.73
  },
  {
    name: 'Cold Places',
    amount: 0.64,
    type: 'hourly'
  },
  {
    name: 'Hot Places (46-54°C)',
    amount: 0.64,
    type: 'hourly'
  },
  {
    name: 'Hot Places (>54°C)',
    amount: 0.77,
    type: 'hourly'
  },
  {
    name: 'Toilet Cleaning',
    amount: 3.41,
    type: 'daily',
    maxWeekly: 16.76
  },
  {
    name: 'Vehicle (car)',
    amount: 0.99,
    type: 'perKm'
  },
  {
    name: 'Vehicle (motorcycle)',
    amount: 0.33,
    type: 'perKm'
  }
];

export const shiftTimings: ShiftTiming[] = [
  {
    type: 'weekday',
    startTime: '06:00',
    endTime: '18:00',
    loading: 0
  },
  {
    type: 'earlyLate',
    loading: 0.15
  },
  {
    type: 'night',
    startTime: '00:00',
    endTime: '08:00',
    loading: 0.25
  },
  {
    type: 'saturday',
    loading: 0.5
  },
  {
    type: 'sunday',
    loading: 1.0
  },
  {
    type: 'publicHoliday',
    loading: 1.5
  }
];

export const SUPERANNUATION_RATE = 0.115; // 11.5%

export const calculatePayRate = (
  level: number,
  shiftType: ShiftTiming['type'],
  hours: number,
  allowances: string[],
  distance?: number
): {
  basePayRate: number;
  totalPay: number;
  superannuation: number;
  allowancesTotal: number;
  total: number;
} => {
  const awardLevel = cleaningAwardLevels.find(l => l.level === level);
  if (!awardLevel) throw new Error('Invalid level');

  const basePayRate = awardLevel.payRates[shiftType];
  const basePay = basePayRate * hours;
  
  // Calculate allowances
  const allowancesTotal = allowances.reduce((total, allowanceName) => {
    const allowance = cleaningAllowances.find(a => a.name === allowanceName);
    if (!allowance) return total;

    switch (allowance.type) {
      case 'hourly':
        return total + (allowance.amount * hours);
      case 'daily':
        return total + allowance.amount;
      case 'weekly':
        return total + (allowance.amount / 5); // Assuming 5-day work week
      case 'perKm':
        return total + (allowance.amount * (distance || 0));
      default:
        return total;
    }
  }, 0);

  const superannuation = basePay * SUPERANNUATION_RATE;
  const total = basePay + allowancesTotal + superannuation;

  return {
    basePayRate,
    totalPay: basePay,
    superannuation,
    allowancesTotal,
    total
  };
};