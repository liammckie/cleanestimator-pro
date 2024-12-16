import React from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MainNavigation } from '../navigation/MainNavigation';
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
  const { 
    handleUpdateSite, 
    handleMarginChange,
    taskCosts
  } = useCostCalculations(sites, laborCosts, setLaborCosts);

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
    <div className="space-y-4">
      <MainNavigation />
      <div className="mt-4">
        <TabsContent value="sites">
          <SiteManager onSitesChange={onSitesChange} />
        </TabsContent>

        <TabsContent value="scope">
          <ScopeOfWork 
            sites={sites} 
            onUpdateSite={handleUpdateSite}
          />
        </TabsContent>

        <TabsContent value="task-management">
          <TaskManagementPage />
        </TabsContent>

        <TabsContent value="equipment">
          <EquipmentCosts onEquipmentCostChange={setEquipmentCosts} />
        </TabsContent>

        <TabsContent value="roster">
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

        <TabsContent value="settings">
          <AwardSettings
            currentIncrease={awardIncrease}
            onAwardIncreaseChange={handleAwardIncreaseChange}
          />
        </TabsContent>

        <TabsContent value="overview">
          <SiteOverview sites={sites} />
        </TabsContent>
      </div>
    </div>
  );
};