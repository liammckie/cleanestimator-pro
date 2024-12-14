export interface Employee {
  fullName: string;
  employeeId: string;
  employmentType: 'full-time' | 'part-time' | 'casual';
  classificationLevel: 1 | 2 | 3;
  ageCategory: 'under16' | '16' | '17' | '18' | '19' | '20' | 'adult';
  shiftType: 'rotating' | 'non-rotating';
}

export interface PayCalculation {
  grossWeeklyPay: number;
  totalAllowances: number;
  totalPenaltyRates: number;
  netPay: number;
  totalHours: number;
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