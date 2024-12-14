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
      <div className="min-h-screen flex flex-col bg-primary">
        <Header />
        <div className="flex-1 flex">
          {/* Site Overview - Left Panel */}
          <div className="w-[300px] min-w-[300px] bg-primary border-r border-primary/20 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Sites Overview</h2>
              <SiteManager onSitesChange={setSites} />
            </div>
          </div>

          {/* Scope of Work - Middle Panel */}
          <div className="w-[400px] min-w-[400px] bg-primary border-r border-primary/20">
            <ScopeOfWorkSidebar selectedTasks={allSelectedTasks} />
          </div>

          {/* Main Content - Right Panel */}
          <main className="flex-1 overflow-y-auto bg-primary p-6">
            <div className="max-w-[900px] mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white text-center">
                  Commercial Cleaning Estimation Tool
                </h1>
              </div>

              <Tabs defaultValue="labor" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-accent/5">
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

                <div className="bg-accent/5 rounded-lg p-6 shadow-lg">
                  <TabsContent value="labor" className="mt-0">
                    <LaborCosts onLaborCostChange={setLaborCosts} />
                  </TabsContent>

                  <TabsContent value="equipment" className="mt-0">
                    <EquipmentCosts onEquipmentCostChange={setEquipmentCosts} />
                  </TabsContent>

                  <TabsContent value="roster" className="mt-0">
                    <RosterManager />
                  </TabsContent>

                  <TabsContent value="summary" className="mt-0">
                    <div className="space-y-6">
                      <ProfitLoss
                        revenue={monthlyRevenue}
                        laborCost={laborCost}
                        equipmentCost={equipmentCosts.monthly}
                        overhead={overhead}
                      />
                      
                      <div className="mt-6 p-4 bg-primary/20 rounded-lg text-sm text-gray-300 space-y-2">
                        <p>• Overhead calculated at {OVERHEAD_PERCENTAGE * 100}% of revenue</p>
                        {totalTime > 0 && (
                          <p>• Total time required: {(totalTime * 60).toFixed(1)} minutes</p>
                        )}
                        {laborCosts.employmentType === 'direct' && onCostsPerHour > 0 && (
                          <p>• On-costs per hour: ${onCostsPerHour.toFixed(2)}</p>
                        )}
                      </div>
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