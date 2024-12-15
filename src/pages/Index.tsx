import React, { useState } from 'react';
import { DynamicMenu } from '@/components/ui/dynamic-menu';
import { Tabs } from "@/components/ui/tabs";
import { SidebarProvider } from '@/components/ui/sidebar';
import { calculateCosts } from '@/utils/costCalculations';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { menuOptions } from '@/components/navigation/MenuOptions';
import { MainContent } from '@/components/layout/MainContent';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { TaskProvider } from '@/components/area/task/TaskContext';
import { AreaContainer } from '@/components/area/AreaContainer';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';

const OVERHEAD_PERCENTAGE = 0.15;

const Index = () => {
  const [sites, setSites] = useState([]);
  const [activeTab, setActiveTab] = useState('sites');
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

  const formattedMenuOptions = menuOptions.map(option => ({
    name: option.label,
    icon: option.icon as "layout" | "file-text" | "list" | "user" | "wrench" | "calendar" | "check-square" | "globe" | "settings",
    onClick: () => setActiveTab(option.id)
  }));

  const handleTasksChange = (tasks: any) => {
    console.log('Tasks changed:', tasks);
  };

  const handleAreaChange = (area: any) => {
    console.log('Area changed:', area);
  };

  const selectedTasks = sites.flatMap(site => 
    site.area?.selectedTasks?.map(task => ({
      ...task,
      siteName: site.name
    })) || []
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'scope':
        return <AreaContainer onAreaChange={handleAreaChange} />;
      default:
        return (
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
        );
    }
  };

  return (
    <SettingsProvider>
      <SidebarProvider>
        <TaskProvider onTasksChange={handleTasksChange}>
          <div className="min-h-screen flex w-full bg-background">
            <div className="flex-1">
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-primary mb-8">
                  Commercial Cleaning Estimation Tool
                </h1>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <div className="grid grid-cols-[250px,auto,250px] gap-6">
                    <DynamicMenu 
                      options={formattedMenuOptions} 
                      className="bg-card rounded-lg border border-border"
                    />
                    <div className="space-y-6">
                      <MainNavigation />
                      {renderContent()}
                    </div>
                    <ScopeOfWorkSidebar selectedTasks={selectedTasks} sites={sites} />
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </TaskProvider>
      </SidebarProvider>
    </SettingsProvider>
  );
};

export default Index;