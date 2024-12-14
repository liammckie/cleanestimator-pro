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
import { Building2, ClipboardList, Calculator, Users, ArrowRight } from 'lucide-react';

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

  const getNextView = (currentView: View): View => {
    const views: View[] = ['sites', 'scope', 'costs', 'roster'];
    const currentIndex = views.indexOf(currentView);
    return views[currentIndex + 1] || currentView;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 flex flex-col items-center bg-[#F5F7FA]">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {/* Progress Indicator */}
            <div className="mb-8 flex justify-center">
              <div className="flex items-center gap-4 max-w-3xl w-full justify-between">
                {['sites', 'scope', 'costs', 'roster'].map((step, index) => (
                  <React.Fragment key={step}>
                    <div 
                      className={`flex items-center ${
                        activeView === step 
                          ? 'text-primary font-semibold' 
                          : 'text-gray-400'
                      }`}
                    >
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${activeView === step 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-400'}
                      `}>
                        {index + 1}
                      </div>
                      <span className="ml-2 capitalize hidden sm:inline">{step}</span>
                    </div>
                    {index < 3 && (
                      <div className={`w-16 sm:w-24 h-0.5 ${
                        index < ['sites', 'scope', 'costs', 'roster'].indexOf(activeView)
                          ? 'bg-primary'
                          : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-12rem)]">
              <div className="p-8">
                {activeView === 'sites' && (
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-semibold text-gray-900">Site Details</h1>
                      {sites.length > 0 && (
                        <Button
                          onClick={() => setActiveView('scope')}
                          className="flex items-center gap-2"
                        >
                          Next: Scope of Work
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <SiteManager onSitesChange={setSites} />
                  </div>
                )}

                {activeView === 'scope' && (
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-semibold text-gray-900">Scope of Work</h1>
                      <Button
                        onClick={() => setActiveView('costs')}
                        className="flex items-center gap-2"
                      >
                        Next: Cost Calculator
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <ScopeOfWorkSidebar selectedTasks={allSelectedTasks} />
                  </div>
                )}

                {activeView === 'costs' && (
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-semibold text-gray-900">Cost Calculator</h1>
                      <Button
                        onClick={() => setActiveView('roster')}
                        className="flex items-center gap-2"
                      >
                        Next: Roster Management
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
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
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-semibold text-gray-900">Roster Management</h1>
                    </div>
                    <RosterManager />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;