import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { OnCostsState } from '@/data/types/onCosts';
import { Site } from '@/data/types/site';
import { MainNav } from '@/components/navigation/MainNav';
import { SitesView } from '@/views/SitesView';
import { ScopeView } from '@/views/ScopeView';
import { CostsView } from '@/views/CostsView';
import { RosterView } from '@/views/RosterView';

const Index = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [activeView, setActiveView] = useState('sites');
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
        <MainNav activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 w-full pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-8">
                <div className="max-w-5xl mx-auto">
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