
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

  // For financial tabs, we're using the parent tabs structure
  // and just rendering the appropriate content based on activeTab
  
  const renderContent = () => {
    switch (activeTab) {
      case "labor":
        return (
          <div className="space-y-6">
            <LaborCosts 
              onLaborCostChange={setLaborCosts}
            />
          </div>
        );
      case "contract":
        return (
          <div className="space-y-6">
            <ContractData onContractChange={setContractDetails} />
            <ContractForecast
              baseRevenue={monthlyRevenue}
              laborCost={costBreakdown.totalMonthlyCost}
              equipmentCost={equipmentCosts.monthly}
              overhead={overhead}
              contractLength={contractDetails.lengthYears}
              cpiIncreases={contractDetails.cpiIncreases}
            />
          </div>
        );
      case "summary":
        return (
          <div className="space-y-6">
            <ProfitLoss
              revenue={monthlyRevenue}
              laborCost={costBreakdown.totalMonthlyCost}
              equipmentCost={equipmentCosts.monthly}
              overhead={overhead}
              totalLaborHours={totalLaborHours}
              selectedTasks={taskCosts}
              onMarginChange={onMarginChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return renderContent();
};
