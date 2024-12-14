import React, { useState } from 'react';
import { LaborCosts } from '@/components/LaborCosts';
import { EquipmentCosts } from '@/components/EquipmentCosts';
import { ProfitLoss } from '@/components/ProfitLoss';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OnCostsState } from '@/data/types/onCosts';
import { Site } from '@/data/types/site';
import { SiteManager } from '@/components/SiteManager';
import { RosterManager } from '@/components/roster/RosterManager';
import { Header } from '@/components/Header';

const OVERHEAD_PERCENTAGE = 0.15;

const Index = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [laborCosts, setLaborCosts] = useState<{ 
    hourlyRate: number;
    employmentType: 'contracted' | 'direct';
    awardLevel?: number;
    shiftType?: string;
    onCosts?: OnCostsState;
  }>({ 
    hourlyRate: 0,
    employmentType: 'contracted'
  });
  const [equipmentCosts, setEquipmentCosts] = useState({ monthly: 0 });

  const calculateTotalOnCosts = () => {
    if (laborCosts.employmentType !== 'direct' || !laborCosts.onCosts) return 0;

    const baseRate = laborCosts.hourlyRate;
    let totalOnCostPercentage = 0;

    Object.values(laborCosts.onCosts).forEach(category => {
      category.forEach(onCost => {
        if (onCost.isEnabled) {
          totalOnCostPercentage += onCost.rate;
        }
      });
    });

    return (baseRate * totalOnCostPercentage) / 100;
  };

  const onCostsPerHour = calculateTotalOnCosts();
  const totalHourlyRate = laborCosts.hourlyRate + onCostsPerHour;
  
  const totalTime = sites.reduce((sum, site) => sum + site.area.totalTime, 0);
  const laborCost = totalTime * totalHourlyRate;
  const monthlyRevenue = laborCost * 1.5;
  const overhead = monthlyRevenue * OVERHEAD_PERCENTAGE;

  const allSelectedTasks = sites.flatMap(site => 
    site.area.selectedTasks.map(task => ({
      ...task,
      siteName: site.name
    }))
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 p-4">
          {/* Panel 1 - Sites */}
          <div className="bg-white rounded-lg shadow-lg p-4 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Sites Overview</h2>
            <SiteManager onSitesChange={setSites} />
          </div>

          {/* Panel 2 - Scope of Work */}
          <div className="bg-white rounded-lg shadow-lg p-4 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Scope of Work</h2>
            <ScopeOfWorkSidebar selectedTasks={allSelectedTasks} />
          </div>

          {/* Panel 3 - Costs Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-4 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Cost Calculator</h2>
            <Tabs defaultValue="labor" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="labor">Labor</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="labor" className="mt-0">
                <LaborCosts onLaborCostChange={setLaborCosts} />
              </TabsContent>

              <TabsContent value="equipment" className="mt-0">
                <EquipmentCosts onEquipmentCostChange={setEquipmentCosts} />
              </TabsContent>

              <TabsContent value="summary" className="mt-0">
                <ProfitLoss
                  revenue={monthlyRevenue}
                  laborCost={laborCost}
                  equipmentCost={equipmentCosts.monthly}
                  overhead={overhead}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Panel 4 - Roster */}
          <div className="bg-white rounded-lg shadow-lg p-4 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Roster Management</h2>
            <RosterManager />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;