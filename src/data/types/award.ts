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
  description?: string;  // Added for better documentation
}

export interface AllowanceBase {
  name: string;
  amount: number;
  description?: string;  // Added for better documentation
  enabled: boolean;      // Added to track if allowance is active
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
  description?: string;  // Added for better documentation
}

export interface PayCalculation {
  basePayRate: number;
  totalPay: number;
  superannuation: number;
  allowancesTotal: number;
  total: number;
  breakdowns?: {
    allowances: Record<string, number>;
    penalties: Record<string, number>;
  };
}

export interface Allowances {
  brokenShift: boolean;
  coldPlaces: boolean;
  firstAid: boolean;
  heightUnder22: boolean;
  heightAbove22: boolean;
  hotPlaces46: boolean;
  hotPlaces54: boolean;
  leadingHand: boolean;
  mealAllowance: boolean;
  refuseCollection: boolean;
  toiletCleaning: boolean;
  motorVehicle: boolean;
  motorCycle: boolean;
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