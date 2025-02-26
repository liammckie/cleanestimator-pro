
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { SiteManager } from '@/components/SiteManager';
import { EquipmentCosts } from '@/components/EquipmentCosts';
import { RosterManager } from '@/components/roster/RosterManager';
import { CostSummary } from '@/components/CostSummary';
import { AwardSettings } from '@/components/settings/AwardSettings';
import { useSettings } from '@/contexts/SettingsContext';
import { SiteOverview } from '@/components/overview/SiteOverview';
import { TaskManagementPage } from '@/components/task-management/TaskManagementPage';
import { ScopeOfWork } from '@/components/scope/ScopeOfWork';
import { FinancialTabs } from '@/components/financial/FinancialTabs';
import { useCostCalculations } from '@/hooks/useCostCalculations';
import { OnCostsState } from '@/data/types/onCosts';

interface MainContentProps {
  sites: any[];
  onSitesChange: (sites: any[]) => void;
  laborCosts: {
    hourlyRate: number;
    employmentType: 'direct' | 'contracted';
    onCosts?: OnCostsState;
  };
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
  const { 
    handleUpdateSite, 
    handleMarginChange,
    taskCosts
  } = useCostCalculations(sites, {
    hourlyRate: laborCosts.hourlyRate,
    onCosts: laborCosts.onCosts
  }, setLaborCosts);

  const handleAwardIncreaseChange = (increase: number) => {
    setAwardIncrease(increase);
    if (laborCosts.employmentType === 'direct') {
      setLaborCosts(prev => ({
        ...prev,
        hourlyRate: prev.hourlyRate * (1 + (increase / 100))
      }));
    }
  };

  return (
    <>
      <TabsContent value="sites" className="space-y-6">
        <SiteManager onSitesChange={onSitesChange} />
      </TabsContent>

      <TabsContent value="scope" className="space-y-6">
        <ScopeOfWork 
          sites={sites} 
          onUpdateSite={handleUpdateSite}
        />
      </TabsContent>

      <TabsContent value="task-management" className="space-y-6">
        <TaskManagementPage />
      </TabsContent>

      <TabsContent value="equipment" className="space-y-6">
        <EquipmentCosts onEquipmentCostChange={setEquipmentCosts} />
      </TabsContent>

      <TabsContent value="roster" className="space-y-6">
        <RosterManager />
        <CostSummary costs={costBreakdown} />
      </TabsContent>

      <FinancialTabs
        laborCosts={laborCosts}
        setLaborCosts={setLaborCosts}
        monthlyRevenue={monthlyRevenue}
        overhead={overhead}
        costBreakdown={costBreakdown}
        equipmentCosts={equipmentCosts}
        contractDetails={contractDetails}
        setContractDetails={setContractDetails}
        taskCosts={taskCosts}
        onMarginChange={handleMarginChange}
      />

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
