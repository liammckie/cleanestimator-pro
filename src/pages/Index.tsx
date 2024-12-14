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
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex bg-primary">
          <div className="w-1/3 min-w-[400px] border-r border-primary/20">
            <ScopeOfWorkSidebar selectedTasks={allSelectedTasks} />
          </div>
          <main className="flex-1 overflow-auto p-6 flex justify-center">
            <div className="w-full max-w-[1200px]">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white">
                  Commercial Cleaning Estimation Tool
                </h1>
              </div>
              
              <Tabs defaultValue="scope" className="space-y-8">
                <TabsList className="grid w-full grid-cols-5 bg-primary/20">
                  <TabsTrigger 
                    value="scope"
                    className="data-[state=active]:bg-secondary data-[state=active]:text-primary text-white"
                  >
                    Scope & Tasks
                  </TabsTrigger>
                  <TabsTrigger 
                    value="labor"
                    className="data-[state=active]:bg-secondary data-[state=active]:text-primary text-white"
                  >
                    Labor Costs
                  </TabsTrigger>
                  <TabsTrigger 
                    value="equipment"
                    className="data-[state=active]:bg-secondary data-[state=active]:text-primary text-white"
                  >
                    Equipment
                  </TabsTrigger>
                  <TabsTrigger 
                    value="roster"
                    className="data-[state=active]:bg-secondary data-[state=active]:text-primary text-white"
                  >
                    Roster
                  </TabsTrigger>
                  <TabsTrigger 
                    value="summary"
                    className="data-[state=active]:bg-secondary data-[state=active]:text-primary text-white"
                  >
                    Summary
                  </TabsTrigger>
                </TabsList>

                <div className="bg-accent/5 rounded-lg p-8">
                  <TabsContent value="scope" className="space-y-8 mt-0">
                    <SiteManager onSitesChange={setSites} />
                  </TabsContent>

                  <TabsContent value="labor" className="space-y-8 mt-0">
                    <LaborCosts onLaborCostChange={setLaborCosts} />
                  </TabsContent>

                  <TabsContent value="equipment" className="space-y-8 mt-0">
                    <EquipmentCosts onEquipmentCostChange={setEquipmentCosts} />
                  </TabsContent>

                  <TabsContent value="roster" className="space-y-8 mt-0">
                    <RosterManager />
                  </TabsContent>

                  <TabsContent value="summary" className="space-y-8 mt-0">
                    <ProfitLoss
                      revenue={monthlyRevenue}
                      laborCost={laborCost}
                      equipmentCost={equipmentCosts.monthly}
                      overhead={overhead}
                    />
                    
                    <div className="mt-6 text-sm text-gray-400">
                      <p>* Overhead calculated at {OVERHEAD_PERCENTAGE * 100}% of revenue</p>
                      {totalTime > 0 && (
                        <p>* Total time required: {(totalTime * 60).toFixed(1)} minutes</p>
                      )}
                      {laborCosts.employmentType === 'direct' && onCostsPerHour > 0 && (
                        <p>* On-costs per hour: ${onCostsPerHour.toFixed(2)}</p>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;