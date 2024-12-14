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

interface BaseAllowance {
  name: string;
  amount: number;
  enabled: boolean;
}

export interface WeeklyAllowance extends BaseAllowance {
  type: AllowanceType.WEEKLY;
}

export interface HourlyAllowance extends BaseAllowance {
  type: AllowanceType.HOURLY;
}

export interface DailyAllowance extends BaseAllowance {
  type: AllowanceType.DAILY;
  maxWeekly: number;
}

export interface KilometerAllowance extends BaseAllowance {
  type: AllowanceType.PER_KM;
  vehicleType: VehicleType;
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