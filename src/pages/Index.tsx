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
      <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
        <Header />
        
        {/* Modern Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1920px] mx-auto px-8">
            <div className="flex justify-center items-center h-16 gap-2">
              <div className="grid grid-cols-4 gap-2 w-full max-w-4xl">
                <Button
                  variant={activeView === 'sites' ? 'default' : 'outline'}
                  onClick={() => setActiveView('sites')}
                  className={`h-12 w-full transition-all ${
                    activeView === 'sites' 
                      ? 'bg-primary shadow-md' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Building2 className="mr-2 h-5 w-5" />
                  <span className="font-medium">Sites</span>
                </Button>

                <Button
                  variant={activeView === 'scope' ? 'default' : 'outline'}
                  onClick={() => setActiveView('scope')}
                  className={`h-12 w-full transition-all ${
                    activeView === 'scope' 
                      ? 'bg-primary shadow-md' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <ClipboardList className="mr-2 h-5 w-5" />
                  <span className="font-medium">Scope</span>
                </Button>

                <Button
                  variant={activeView === 'costs' ? 'default' : 'outline'}
                  onClick={() => setActiveView('costs')}
                  className={`h-12 w-full transition-all ${
                    activeView === 'costs' 
                      ? 'bg-primary shadow-md' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  <span className="font-medium">Costs</span>
                </Button>

                <Button
                  variant={activeView === 'roster' ? 'default' : 'outline'}
                  onClick={() => setActiveView('roster')}
                  className={`h-12 w-full transition-all ${
                    activeView === 'roster' 
                      ? 'bg-primary shadow-md' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Users className="mr-2 h-5 w-5" />
                  <span className="font-medium">Roster</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Area with Modern Styling */}
        <main className="flex-1 w-full bg-[#F5F7FA]">
          <div className="max-w-[1920px] mx-auto p-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-12rem)]">
              {activeView === 'sites' && (
                <div className="p-8">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sites Overview</h1>
                  <SiteManager onSitesChange={setSites} />
                </div>
              )}

              {activeView === 'scope' && (
                <div className="p-8">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-6">Scope of Work</h1>
                  <ScopeOfWorkSidebar 
                    selectedTasks={sites.flatMap(site => 
                      site.area.selectedTasks.map(task => ({
                        ...task,
                        siteName: site.name
                      }))
                    )} 
                  />
                </div>
              )}

              {activeView === 'costs' && (
                <div className="p-8">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-6">Cost Calculator</h1>
                  <div className="grid gap-8">
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
              )}

              {activeView === 'roster' && (
                <div className="p-8">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-6">Roster Management</h1>
                  <RosterManager />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;