import React from 'react';
import { LaborCosts } from '@/components/LaborCosts';
import { EquipmentCosts } from '@/components/EquipmentCosts';
import { ProfitLoss } from '@/components/ProfitLoss';

interface CostsViewProps {
  onLaborCostChange: (costs: any) => void;
  onEquipmentCostChange: (costs: { monthly: number }) => void;
  monthlyRevenue: number;
  laborCost: number;
  equipmentCosts: { monthly: number };
  overhead: number;
}

export const CostsView: React.FC<CostsViewProps> = ({
  onLaborCostChange,
  onEquipmentCostChange,
  monthlyRevenue,
  laborCost,
  equipmentCosts,
  overhead
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Cost Calculator</h1>
      </div>
      <div className="grid gap-8">
        <LaborCosts onLaborCostChange={onLaborCostChange} />
        <EquipmentCosts onEquipmentCostChange={onEquipmentCostChange} />
        <ProfitLoss
          revenue={monthlyRevenue}
          laborCost={laborCost}
          equipmentCost={equipmentCosts.monthly}
          overhead={overhead}
        />
      </div>
    </div>
  );
};