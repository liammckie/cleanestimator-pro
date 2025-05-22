
/**
 * Common interfaces for the rates management system
 */

export type RateType = 'productivity' | 'labor' | 'oncost' | 'profit' | 'chargeout' | 'contractor';

export interface BaseRate {
  id: string;
  name: string;
  type: RateType;
  value: number;
  effectiveDate: Date;
  expiryDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductivityRate extends BaseRate {
  type: 'productivity';
  taskId: string;
  toolId?: string;
  industryType?: string;
  areaType?: string;
  unit: 'sqm/hour' | 'units/hour';
}

export interface LaborRate extends BaseRate {
  type: 'labor';
  awardLevel?: number;
  employmentType: 'full-time' | 'part-time' | 'casual' | 'contractor';
  shiftType?: string;
  isDefault?: boolean;
}

export interface OnCostRate extends BaseRate {
  type: 'oncost';
  category: 'statutory' | 'employment' | 'recruitment' | 'overhead' | 'miscellaneous';
  isMandatory?: boolean;
}

export interface ProfitRate extends BaseRate {
  type: 'profit';
  industryType?: string;
  clientType?: string;
  isDefault?: boolean;
}

export interface ChargeoutRate extends BaseRate {
  type: 'chargeout';
  taskId?: string;
  industryType?: string;
  clientType?: string;
  isMinimum?: boolean;
}

export interface ContractorRate extends BaseRate {
  type: 'contractor';
  contractorId?: string;
  taskType?: string;
  industryType?: string;
}
