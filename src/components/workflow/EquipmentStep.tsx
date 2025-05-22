
import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { EquipmentCosts } from '@/components/EquipmentCosts';

export const EquipmentStep: React.FC = () => {
  const { updateWorkflowData } = useWorkflow();
  
  const handleEquipmentCostsChange = (costs: any) => {
    updateWorkflowData({ equipmentCosts: costs });
  };
  
  return (
    <div>
      <EquipmentCosts onEquipmentCostChange={handleEquipmentCostsChange} />
    </div>
  );
};
