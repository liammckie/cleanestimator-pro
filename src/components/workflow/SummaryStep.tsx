
import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { ProfitLoss } from '@/components/ProfitLoss';
import { useCostContext } from '@/contexts/CostContext';

export const SummaryStep: React.FC = () => {
  const { workflowData } = useWorkflow();
  const { totalLaborCost, totalWeeklyHours } = useCostContext();
  
  // Calculate monthly revenue (placeholder for actual calculation)
  const monthlyRevenue = totalLaborCost * 1.25; // 25% margin
  
  const handleMarginChange = (margin: number) => {
    // This would normally update state or trigger a calculation
    return monthlyRevenue * (1 + margin / 100);
  };
  
  return (
    <div>
      <ProfitLoss
        revenue={monthlyRevenue}
        laborCost={totalLaborCost}
        equipmentCost={workflowData.equipmentCosts?.monthly || 0}
        overhead={0} // This would need to be calculated or stored
        totalLaborHours={totalWeeklyHours * 4.33}
        selectedTasks={workflowData.selectedTasks as any}
        onMarginChange={handleMarginChange}
      />
    </div>
  );
};
