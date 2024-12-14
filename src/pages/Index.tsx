import React, { useState } from 'react';
import { LaborCosts } from '@/components/LaborCosts';
import { EquipmentCosts } from '@/components/EquipmentCosts';
import { ProfitLoss } from '@/components/ProfitLoss';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { OnCostsState } from '@/data/types/onCosts';
import { Site } from '@/data/types/site';
import { SiteManager } from '@/components/SiteManager';
import { RosterManager } from '@/components/roster/RosterManager';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Building2, ClipboardList, Calculator, Users } from 'lucide-react';

type View = 'sites' | 'scope' | 'costs' | 'roster';

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
  const [activeView, setActiveView] = useState<View>('sites');

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
  const overhead = monthlyRevenue * 0.15;

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
        
        {/* Navigation Buttons */}
        <div className="bg-white border-b">
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <div className="flex justify-center gap-4">
              <Button
                variant={activeView === 'sites' ? 'default' : 'outline'}
                onClick={() => setActiveView('sites')}
                className="flex items-center gap-2 min-w-[160px] justify-center"
              >
                <Building2 className="h-4 w-4" />
                Sites
              </Button>
              <Button
                variant={activeView === 'scope' ? 'default' : 'outline'}
                onClick={() => setActiveView('scope')}
                className="flex items-center gap-2 min-w-[160px] justify-center"
              >
                <ClipboardList className="h-4 w-4" />
                Scope of Work
              </Button>
              <Button
                variant={activeView === 'costs' ? 'default' : 'outline'}
                onClick={() => setActiveView('costs')}
                className="flex items-center gap-2 min-w-[160px] justify-center"
              >
                <Calculator className="h-4 w-4" />
                Cost Calculator
              </Button>
              <Button
                variant={activeView === 'roster' ? 'default' : 'outline'}
                onClick={() => setActiveView('roster')}
                className="flex items-center gap-2 min-w-[160px] justify-center"
              >
                <Users className="h-4 w-4" />
                Roster
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full">
          <div className="max-w-[1920px] mx-auto p-6 h-full">
            {activeView === 'sites' && (
              <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-12rem)]">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Sites Overview</h2>
                  <SiteManager onSitesChange={setSites} />
                </div>
              </div>
            )}

            {activeView === 'scope' && (
              <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-12rem)]">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Scope of Work</h2>
                  <ScopeOfWorkSidebar selectedTasks={allSelectedTasks} />
                </div>
              </div>
            )}

            {activeView === 'costs' && (
              <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-12rem)]">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Cost Calculator</h2>
                  <div className="grid gap-6">
                    <LaborCosts onLaborCostChange={setLaborCosts} />
                    <EquipmentCosts onEquipmentCostChange={setEquipmentCosts} />
                    <ProfitLoss
                      revenue={monthlyRevenue}
                      laborCost={laborCost}
                      equipmentCost={equipmentCosts.monthly}
                      overhead={overhead}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeView === 'roster' && (
              <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-12rem)]">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Roster Management</h2>
                  <RosterManager />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;