
import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { LaborCosts } from '@/components/LaborCosts';

export const LaborCostsStep: React.FC = () => {
  const { updateWorkflowData, workflowData } = useWorkflow();
  
  const handleLaborCostsChange = (costs: any) => {
    updateWorkflowData({ laborCosts: costs });
  };
  
  return (
    <div>
      <LaborCosts onLaborCostChange={handleLaborCostsChange} />
    </div>
  );
};
