import { EquipmentItem, DepreciationCalculation } from '@/types/equipment';

export const calculateDepreciation = (item: EquipmentItem): DepreciationCalculation => {
  const currentDate = new Date();
  const purchaseDate = new Date(item.purchaseDate);
  const ageInYears = (currentDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
  
  // ATO base depreciation rate (200% of prime cost rate)
  const baseRate = (2 / item.lifespan) * 100;
  
  if (item.depreciationType === 'diminishing-value') {
    // Diminishing Value method (DV)
    const currentValue = Math.max(
      item.cost * Math.pow((1 - baseRate/100), ageInYears),
      item.salvageValue
    );
    const monthlyDepreciation = (currentValue - item.salvageValue) / (item.lifespan * 12);
    
    return { currentValue, monthlyDepreciation };
  } else {
    // Prime Cost method (PC)
    const yearlyDepreciation = (item.cost - item.salvageValue) / item.lifespan;
    const totalDepreciation = Math.min(yearlyDepreciation * ageInYears, item.cost - item.salvageValue);
    const currentValue = item.cost - totalDepreciation;
    const monthlyDepreciation = yearlyDepreciation / 12;
    
    return { currentValue, monthlyDepreciation };
  }
};