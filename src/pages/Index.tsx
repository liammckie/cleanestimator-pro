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
        
        <div className="flex-1 flex">
          {/* Sites Panel - Left */}
          <div className="w-[320px] min-w-[320px] border-r bg-primary/5">
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-xl font-semibold mb-6">Sites Overview</h2>
              <SiteManager onSitesChange={setSites} />
            </div>
          </div>

          {/* Scope Panel - Middle */}
          <div className="w-[400px] min-w-[400px] border-r bg-primary/5">
            <ScopeOfWorkSidebar selectedTasks={allSelectedTasks} />
          </div>

          {/* Main Content - Right */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[900px] mx-auto p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-center">
                  Commercial Cleaning Calculator
                </h1>
              </div>

              <Tabs defaultValue="labor" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="labor">Labor Costs</TabsTrigger>
                  <TabsTrigger value="equipment">Equipment</TabsTrigger>
                  <TabsTrigger value="roster">Roster</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>

                <div className="bg-card rounded-lg shadow-lg border p-6">
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
                      
                      <div className="mt-6 p-4 bg-muted rounded-lg text-sm space-y-2">
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
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
