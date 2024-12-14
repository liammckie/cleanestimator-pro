export interface PayRate {
  standard: number;
  earlyLate: number;
  night: number;
  saturday: number;
  sunday: number;
  publicHoliday: number;
}

export interface Allowance {
  name: string;
  amount: number;
  type: 'hourly' | 'daily' | 'weekly' | 'perKm';
  maxWeekly?: number;
}

export interface AwardLevel {
  level: number;
  payRates: PayRate;
}

export interface ShiftTiming {
  type: 'weekday' | 'earlyLate' | 'night' | 'saturday' | 'sunday' | 'publicHoliday';
  startTime?: string;
  endTime?: string;
  loading: number;
}