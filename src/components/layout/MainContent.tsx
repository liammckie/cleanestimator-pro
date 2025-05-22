
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useTaskContext } from '@/components/area/task/TaskContext';

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
  const { selectedTasks } = useTaskContext();
  const [activeTab, setActiveTab] = useState('sites');
  
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

  // Determine if the current tab is a financial tab
  const isFinancialTab = ['labor', 'contract', 'summary'].includes(activeTab);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="sites">Sites</TabsTrigger>
        <TabsTrigger value="scope">Scope</TabsTrigger>
        <TabsTrigger value="task-management">Task Management</TabsTrigger>
        <TabsTrigger value="labor">Labor</TabsTrigger>
        <TabsTrigger value="contract">Contract</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="equipment">Equipment</TabsTrigger>
        <TabsTrigger value="roster">Roster</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="overview">Overview</TabsTrigger>
      </TabsList>

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

      {isFinancialTab && (
        <TabsContent value={activeTab}>
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
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </TabsContent>
      )}

      <TabsContent value="equipment" className="space-y-6">
        <EquipmentCosts onEquipmentCostChange={setEquipmentCosts} />
      </TabsContent>

      <TabsContent value="roster" className="space-y-6">
        <RosterManager />
        <CostSummary costs={costBreakdown} />
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
    </Tabs>
  );
};
