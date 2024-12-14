export interface EquipmentItem {
  id: string;
  name: string;
  cost: number;
  purchaseDate: string;
  lifespan: number;
  depreciationType: 'diminishing-value' | 'prime-cost';
  salvageValue: number;
}

export interface DepreciationCalculation {
  currentValue: number;
  monthlyDepreciation: number;
}