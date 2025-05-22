
import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { ContractData } from '@/components/ContractData';
import { ContractForecast } from '@/components/ContractForecast';
import { useCostContext } from '@/contexts/CostContext';

export const ContractStep: React.FC = () => {
  const { updateWorkflowData, workflowData } = useWorkflow();
  const { totalLaborCost } = useCostContext();
  
  // Calculate monthly revenue (placeholder for actual calculation)
  const monthlyRevenue = totalLaborCost * 1.25; // 25% margin
  
  const handleContractChange = (details: any) => {
    updateWorkflowData({ contractDetails: details });
  };
  
  return (
    <div className="space-y-6">
      <ContractData onContractChange={handleContractChange} />
      
      <ContractForecast
        baseRevenue={monthlyRevenue}
        laborCost={totalLaborCost}
        equipmentCost={workflowData.equipmentCosts?.monthly || 0}
        overhead={0} // This would need to be calculated or stored
        contractLength={workflowData.contractDetails?.lengthYears || 1}
        cpiIncreases={workflowData.contractDetails?.cpiIncreases || { yearOne: 0, yearTwo: 0, yearThree: 0 }}
      />
    </div>
  );
};
