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

  const calculateTotalMonthlyHours = () => {
    console.log('Calculating total hours from sites:', sites);
    return sites.reduce((total, site) => {
      const siteTasks = site.area?.selectedTasks || [];
      console.log(`Site ${site.name} tasks:`, siteTasks);
      return total + siteTasks.reduce((siteTotal: number, task: any) => {
        return siteTotal + (task.timeRequired || 0);
      }, 0);
    }, 0);
  };

  const getAllSelectedTasks = () => {
    console.log('Getting all selected tasks from sites:', sites);
    const tasks = sites.reduce((allTasks: any[], site) => {
      const siteTasks = site.area?.selectedTasks || [];
      return [...allTasks, ...siteTasks.map(task => ({
        ...task,
        siteName: site.name
      }))];
    }, []);
    console.log('All selected tasks:', tasks);
    return tasks;
  };

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
    console.log('New revenue based on margin:', newRevenue);
  };

  const handleUpdateSite = (siteId: string, tasks: any[]) => {
    console.log('Updating site tasks:', { siteId, tasks });
    const updatedSites = sites.map(site => 
      site.id === siteId ? { ...site, area: { ...site.area, selectedTasks: tasks } } : site
    );
    onSitesChange(updatedSites);
  };

  const totalMonthlyHours = calculateTotalMonthlyHours();
  const allSelectedTasks = getAllSelectedTasks();

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
        <LaborCosts 
          onLaborCostChange={setLaborCosts}
          totalMonthlyHours={totalMonthlyHours}
        />
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
          totalLaborHours={totalMonthlyHours}
          selectedTasks={allSelectedTasks}
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
