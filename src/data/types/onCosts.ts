export interface OnCost {
  name: string;
  rate: number;
  isEnabled: boolean;
  category: 'statutory' | 'employment' | 'recruitment' | 'overhead' | 'miscellaneous';
  isMandatory?: boolean;
}

export interface OnCostsState {
  statutoryOnCosts: OnCost[];
  employmentOnCosts: OnCost[];
  recruitmentOnCosts: OnCost[];
  overheadOnCosts: OnCost[];
  miscellaneousOnCosts: OnCost[];
}