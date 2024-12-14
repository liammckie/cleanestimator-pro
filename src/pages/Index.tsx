import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { OnCostsState } from '@/data/types/onCosts';
import { Site } from '@/data/types/site';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { SitesView } from '@/views/SitesView';
import { ScopeView } from '@/views/ScopeView';
import { CostsView } from '@/views/CostsView';
import { RosterView } from '@/views/RosterView';

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

  const renderView = () => {
    switch (activeView) {
      case 'sites':
        return <SitesView onSitesChange={setSites} />;
      case 'scope':
        return <ScopeView selectedTasks={allSelectedTasks} />;
      case 'costs':
        return (
          <CostsView
            onLaborCostChange={setLaborCosts}
            onEquipmentCostChange={setEquipmentCosts}
            monthlyRevenue={monthlyRevenue}
            laborCost={laborCost}
            equipmentCosts={equipmentCosts}
            overhead={overhead}
          />
        );
      case 'roster':
        return <RosterView />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 w-full">
          <div className="max-w-[1400px] mx-auto px-6 py-8 w-full">
            <div className="mb-8">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                  {['sites', 'scope', 'costs', 'roster'].map((step, index) => (
                    <Button
                      key={step}
                      variant={activeView === step ? "default" : "outline"}
                      onClick={() => setActiveView(step as View)}
                      className="w-full mx-2 first:ml-0 last:mr-0"
                    >
                      <span className="capitalize">{step}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-8">
                <div className="max-w-3xl mx-auto">
                  {renderView()}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;