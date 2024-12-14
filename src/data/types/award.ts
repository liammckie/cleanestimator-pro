import { z } from "zod";

export interface AwardLevel {
  level: number;
  payRates: {
    standard: number;
    earlyLate: number;
    night: number;
    saturday: number;
    sunday: number;
    publicHoliday: number;
  }
}

export enum AllowanceType {
  WEEKLY = "weekly",
  HOURLY = "hourly",
  DAILY = "daily",
  PER_KM = "perKm"
}

export enum VehicleType {
  CAR = "car",
  MOTORCYCLE = "motorcycle"
}

export const ShiftTimingSchema = z.object({
  type: z.enum(['weekday', 'earlyLate', 'night', 'saturday', 'sunday', 'publicHoliday']),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  loading: z.number()
});

export type ShiftTiming = z.infer<typeof ShiftTimingSchema>;

export interface WeeklyAllowance {
  type: AllowanceType.WEEKLY;
  name: string;
  amount: number;
  enabled: boolean;
}

export interface HourlyAllowance {
  type: AllowanceType.HOURLY;
  name: string;
  amount: number;
  enabled: boolean;
}

export interface DailyAllowance {
  type: AllowanceType.DAILY;
  name: string;
  amount: number;
  maxWeekly: number;
  enabled: boolean;
}

export interface KilometerAllowance {
  type: AllowanceType.PER_KM;
  name: string;
  amount: number;
  vehicleType: VehicleType;
  enabled: boolean;
}

export type Allowance = WeeklyAllowance | HourlyAllowance | DailyAllowance | KilometerAllowance;

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
  id: string;
  name: string;
  level: number;
  employmentType: 'casual' | 'part-time' | 'full-time';
  allowances: Allowance[];
}