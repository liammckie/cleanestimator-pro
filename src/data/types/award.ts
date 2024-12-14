export interface PayRates {
  standard: number;
  earlyLate: number;
  night: number;
  saturday: number;
  sunday: number;
  publicHoliday: number;
}

export interface AwardLevel {
  level: number;
  payRates: PayRates;
  description?: string;
}

export interface AllowanceBase {
  name: string;
  amount: number;
  description?: string;
  enabled: boolean;
}

export interface HourlyAllowance extends AllowanceBase {
  type: 'hourly';
}

export interface DailyAllowance extends AllowanceBase {
  type: 'daily';
  maxWeekly?: number;
}

export interface WeeklyAllowance extends AllowanceBase {
  type: 'weekly';
}

export interface KilometerAllowance extends AllowanceBase {
  type: 'perKm';
  vehicleType: 'motorVehicle' | 'motorCycle';
}

export type Allowance = HourlyAllowance | DailyAllowance | WeeklyAllowance | KilometerAllowance;

export type ShiftType = 'weekday' | 'earlyLate' | 'night' | 'saturday' | 'sunday' | 'publicHoliday';

export interface ShiftTiming {
  type: ShiftType;
  startTime?: string;
  endTime?: string;
  loading: number;
  description?: string;
}

export interface PayCalculation {
  basePayRate: number;
  totalPay: number;
  superannuation: number;
  allowancesTotal: number;
  total: number;
  grossWeeklyPay: number;
  totalAllowances: number;
  totalPenaltyRates: number;
  netPay: number;
  totalHours: number;
  breakdowns: {
    allowances: Record<string, number>;
    penalties: Record<string, number>;
  };
}

export interface EmployeeDetails {
  fullName: string;
  employeeId: string;
  employmentType: 'full-time' | 'part-time' | 'casual';
  classificationLevel: 1 | 2 | 3;
  ageCategory: 'under16' | '16' | '17' | '18' | '19' | '20' | 'adult';
  shiftType: 'rotating' | 'non-rotating';
}

export interface ShiftDetails {
  startTime: string;
  endTime: string;
  workDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  overtimeHours: number;
  publicHolidayWorked: boolean;
  overtimeType?: 'first2' | 'after2' | 'weekend' | 'publicHoliday';
}