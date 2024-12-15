import React, { useState } from 'react';
import { DynamicMenu } from '@/components/ui/dynamic-menu';
import { Tabs } from "@/components/ui/tabs";
import { SidebarProvider } from '@/components/ui/sidebar';
import { calculateCosts } from '@/utils/costCalculations';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { getMenuOptions } from '@/components/navigation/MenuOptions';
import { MainContent } from '@/components/layout/MainContent';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { TaskStack } from '@/components/task/TaskStack';

const OVERHEAD_PERCENTAGE = 0.15;

const Index = () => {
  const [sites, setSites] = useState([]);
  const [activeTab, setActiveTab] = useState('scope');
  const [laborCosts, setLaborCosts] = useState({ 
    hourlyRate: 0,
    employmentType: 'contracted' as const
  });
  const [equipmentCosts, setEquipmentCosts] = useState({ monthly: 0 });
  const [contractDetails, setContractDetails] = useState({
    lengthYears: 1,
    cpiIncreases: {
      yearOne: 0,
      yearTwo: 0,
      yearThree: 0,
    },
  });

  const costBreakdown = calculateCosts(sites, laborCosts.hourlyRate);
  const monthlyRevenue = costBreakdown.totalMonthlyCost * 1.5;
  const overhead = monthlyRevenue * OVERHEAD_PERCENTAGE;

  const menuOptions = getMenuOptions(setActiveTab);

  return (
    <SettingsProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <TaskStack />
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
                    <MainNavigation />
                    <MainContent
                      sites={sites}
                      onSitesChange={setSites}
                      laborCosts={laborCosts}
                      setLaborCosts={setLaborCosts}
                      equipmentCosts={equipmentCosts}
                      setEquipmentCosts={setEquipmentCosts}
                      contractDetails={contractDetails}
                      setContractDetails={setContractDetails}
                      costBreakdown={costBreakdown}
                      monthlyRevenue={monthlyRevenue}
                      overhead={overhead}
                    />
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </SettingsProvider>
  );
};

export default Index;