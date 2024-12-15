import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { SiteManager } from '@/components/SiteManager';
import { LaborCosts } from '@/components/LaborCosts';
import { EquipmentCosts } from '@/components/EquipmentCosts';
import { RosterManager } from '@/components/roster/RosterManager';
import { ContractData } from '@/components/ContractData';
import { ContractForecast } from '@/components/ContractForecast';
import { CostSummary } from '@/components/CostSummary';
import { ProfitLoss } from '@/components/ProfitLoss';
import { AwardSettings } from '@/components/settings/AwardSettings';
import { useSettings } from '@/contexts/SettingsContext';
import { SiteOverview } from '@/components/overview/SiteOverview';
import { TaskManagementPage } from '@/components/task-management/TaskManagementPage';
import { ScopeOfWork } from '@/components/scope/ScopeOfWork';

interface MainContentProps {
  sites: any[];
  onSitesChange: (sites: any[]) => void;
  laborCosts: any;
  setLaborCosts: (costs: any) => void;
  equipmentCosts: any;
  setEquipmentCosts: (costs: any) => void;
  contractDetails: any;
  setContractDetails: (details: any) => void;
  costBreakdown: any;
  monthlyRevenue: number;
  overhead: number;
}

export const MainContent: React.FC<MainContentProps> = ({
  sites,
  onSitesChange,
  laborCosts,
  setLaborCosts,
  equipmentCosts,
  setEquipmentCosts,
  contractDetails,
  setContractDetails,
  costBreakdown,
  monthlyRevenue,
  overhead,
}) => {
  const { awardIncrease, setAwardIncrease } = useSettings();

  const handleAwardIncreaseChange = (increase: number) => {
    setAwardIncrease(increase);
    if (laborCosts.employmentType === 'direct') {
      setLaborCosts(prev => ({
        ...prev,
        hourlyRate: prev.hourlyRate * (1 + (increase / 100))
      }));
    }
  };

  const handleMarginChange = (margin: number) => {
    const totalCosts = costBreakdown.totalMonthlyCost + equipmentCosts.monthly + overhead;
    const newRevenue = totalCosts / (1 - (margin / 100));
    // Update contract details or other relevant state here
    console.log('New revenue based on margin:', newRevenue);
  };

  const handleUpdateSite = (siteId: string, tasks: any[]) => {
    const updatedSites = sites.map(site => 
      site.id === siteId ? { ...site, area: { ...site.area, selectedTasks: tasks } } : site
    );
    onSitesChange(updatedSites);
  };

  return (
    <>
      <TabsContent value="sites" className="space-y-6">
        <SiteManager onSitesChange={onSitesChange} />
      </TabsContent>

      <TabsContent value="scope" className="space-y-6">
        <ScopeOfWork sites={sites} onUpdateSite={handleUpdateSite} />
      </TabsContent>

      <TabsContent value="task-management" className="space-y-6">
        <TaskManagementPage />
      </TabsContent>

      <TabsContent value="labor" className="space-y-6">
        <LaborCosts onLaborCostChange={setLaborCosts} />
      </TabsContent>

      <TabsContent value="equipment" className="space-y-6">
        <EquipmentCosts onEquipmentCostChange={setEquipmentCosts} />
      </TabsContent>

      <TabsContent value="roster" className="space-y-6">
        <RosterManager />
        <CostSummary costs={costBreakdown} />
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
          onMarginChange={handleMarginChange}
        />
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <AwardSettings
          currentIncrease={awardIncrease}
          onAwardIncreaseChange={handleAwardIncreaseChange}
        />
      </TabsContent>

      <TabsContent value="overview" className="space-y-6">
        <SiteOverview sites={sites} />
      </TabsContent>
    </>
  );
};