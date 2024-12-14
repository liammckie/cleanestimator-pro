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
import { DynamicMenu, MenuOption } from '@/components/ui/dynamic-menu';
import { CostSummary } from '@/components/CostSummary';
import { calculateCosts } from '@/utils/costCalculations';

const OVERHEAD_PERCENTAGE = 0.15;

const Index = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [activeTab, setActiveTab] = useState('scope');
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
  
  const costBreakdown = calculateCosts(sites, totalHourlyRate);
  const monthlyRevenue = costBreakdown.totalMonthlyCost * 1.5;
  const overhead = monthlyRevenue * OVERHEAD_PERCENTAGE;

  const allSelectedTasks = sites.flatMap(site => 
    site.area.selectedTasks.map(task => ({
      ...task,
      siteName: site.name
    }))
  );

  const menuOptions: MenuOption[] = [
    { 
      id: 'scope', 
      label: 'Scope & Tasks', 
      icon: "list",
      onClick: () => setActiveTab('scope')
    },
    { 
      id: 'labor', 
      label: 'Labor Costs', 
      icon: "menu",
      onClick: () => setActiveTab('labor')
    },
    { 
      id: 'equipment', 
      label: 'Equipment', 
      icon: "grid",
      onClick: () => setActiveTab('equipment')
    },
    { 
      id: 'roster', 
      label: 'Roster', 
      icon: "menu",
      onClick: () => setActiveTab('roster')
    },
    { 
      id: 'summary', 
      label: 'Summary', 
      icon: "settings",
      onClick: () => setActiveTab('summary')
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ScopeOfWorkSidebar selectedTasks={allSelectedTasks} />
        <div className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-primary mb-8">
              Commercial Cleaning Estimation Tool
            </h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="grid grid-cols-[250px,1fr] gap-6">
                <DynamicMenu 
                  options={menuOptions} 
                  className="bg-card rounded-lg border border-border"
                />
                <div className="space-y-6">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="scope">Scope & Tasks</TabsTrigger>
                    <TabsTrigger value="labor">Labor Costs</TabsTrigger>
                    <TabsTrigger value="equipment">Equipment</TabsTrigger>
                    <TabsTrigger value="roster">Roster</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                  </TabsList>

                  <TabsContent value="scope" className="space-y-6">
                    <SiteManager onSitesChange={setSites} />
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

                  <TabsContent value="summary" className="space-y-6">
                    <ProfitLoss
                      revenue={monthlyRevenue}
                      laborCost={costBreakdown.totalMonthlyCost}
                      equipmentCost={equipmentCosts.monthly}
                      overhead={overhead}
                    />
                    
                    <div className="mt-6 text-sm text-muted-foreground">
                      <p>* Overhead calculated at {OVERHEAD_PERCENTAGE * 100}% of revenue</p>
                      {costBreakdown.totalMonthlyMinutes > 0 && (
                        <p>* Total time required: {Math.round(costBreakdown.totalMonthlyMinutes)} minutes</p>
                      )}
                      {laborCosts.employmentType === 'direct' && onCostsPerHour > 0 && (
                        <p>* On-costs per hour: ${onCostsPerHour.toFixed(2)}</p>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
