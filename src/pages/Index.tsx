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
    hourlyRate: 38,
    employmentType: 'contracted' as const,
    totalMonthlyHours: 0,
    taskCosts: []
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

  const handleAreaChange = (area: {
    squareMeters: number;
    spaceType: string;
    industryType: string;
    selectedTasks: Array<{
      taskId: string;
      quantity: number;
      timeRequired: number;
      frequency: {
        timesPerWeek: number;
        timesPerMonth: number;
      };
      productivityOverride?: number;
      selectedTool?: string;
    }>;
    totalTime: number;
  }) => {
    console.log('Area changed:', area);
    setLaborCosts(prev => ({
      ...prev,
      totalMonthlyHours: area.totalTime,
      taskCosts: area.selectedTasks
    }));
  };

  const costBreakdown = calculateCosts(sites, laborCosts.hourlyRate);
  const monthlyRevenue = costBreakdown.totalMonthlyCost * 1.5;
  const overhead = monthlyRevenue * OVERHEAD_PERCENTAGE;

  const formattedMenuOptions = menuOptions.map(option => ({
    name: option.label,
    icon: option.icon as "layout" | "file-text" | "list" | "user" | "wrench" | "calendar" | "check-square" | "globe" | "settings",
    onClick: () => setActiveTab(option.id)
  }));

  const handleTasksChange = (tasks: any) => {
    console.log('Tasks changed in Index:', tasks);
    // Update labor costs when tasks change
    setLaborCosts(prev => ({
      ...prev,
      totalMonthlyHours: tasks.reduce((sum: number, task: any) => sum + (task.timeRequired || 0), 0),
      taskCosts: tasks
    }));
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
        <TaskProvider onTasksChange={handleAreaChange}>
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
