
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LaborCosts } from '@/components/LaborCosts';
import { ProfitLoss } from '@/components/ProfitLoss';
import { ContractData } from '@/components/ContractData';
import { ContractForecast } from '@/components/ContractForecast';
import { TaskCostBreakdown } from '@/utils/costingCalculations';

interface FinancialTabsProps {
  laborCosts: any;
  setLaborCosts: (costs: any) => void;
  monthlyRevenue: number;
  overhead: number;
  costBreakdown: any;
  equipmentCosts: any;
  contractDetails: any;
  setContractDetails: (details: any) => void;
  taskCosts: TaskCostBreakdown[];
  onMarginChange: (margin: number) => number;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export const FinancialTabs: React.FC<FinancialTabsProps> = ({
  laborCosts,
  setLaborCosts,
  monthlyRevenue,
  overhead,
  costBreakdown,
  equipmentCosts,
  contractDetails,
  setContractDetails,
  taskCosts,
  onMarginChange,
  activeTab = "labor",
  onTabChange,
}) => {
  // Calculate total labor hours from task costs
  const totalLaborHours = taskCosts.reduce((total, task) => total + task.timeRequired, 0);

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsContent value="labor" className="space-y-6">
        <LaborCosts 
          onLaborCostChange={setLaborCosts}
        />
      </TabsContent>

      <TabsContent value="contract" className="space-y-6">
        <ContractData onContractChange={setContractDetails} />
        <ContractForecast
          baseRevenue={monthlyRevenue}
          laborCost={costBreakdown.totalMonthlyCost}
          equipmentCost={equipmentCosts.monthly}
          overhead={overhead}
          contractLength={contractDetails.lengthYears}
          cpiIncreases={contractDetails.cpiIncreases}
        />
      </TabsContent>

      <TabsContent value="summary" className="space-y-6">
        <ProfitLoss
          revenue={monthlyRevenue}
          laborCost={costBreakdown.totalMonthlyCost}
          equipmentCost={equipmentCosts.monthly}
          overhead={overhead}
          totalLaborHours={totalLaborHours}
          selectedTasks={taskCosts}
          onMarginChange={onMarginChange}
        />
      </TabsContent>
    </Tabs>
  );
};
