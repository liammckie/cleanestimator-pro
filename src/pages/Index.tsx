import React, { useState } from 'react';
import { DynamicMenu } from '@/components/ui/dynamic-menu';
import { Tabs } from "@/components/ui/tabs";
import { calculateCosts } from '@/utils/costCalculations';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { menuOptions } from '@/components/navigation/MenuOptions';
import { MainContent } from '@/components/layout/MainContent';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { TaskProvider } from '@/components/area/task/TaskContext';
import { AreaContainer } from '@/components/area/AreaContainer';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';
import { AreaData } from '@/components/area/task/types';

const OVERHEAD_PERCENTAGE = 0.15;

// Separate the main content into its own component to prevent unnecessary rerenders
const TaskManagementContent = React.memo(({ 
  activeTab, 
  onAreaChange 
}: { 
  activeTab: string;
  onAreaChange: (area: AreaData) => void;
}) => {
  return activeTab === 'scope' ? (
    <AreaContainer onAreaChange={onAreaChange} />
  ) : null;
});

TaskManagementContent.displayName = 'TaskManagementContent';

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

  const handleAreaChange = React.useCallback((area: AreaData) => {
    console.log('Area changed:', area);
    setLaborCosts(prev => ({
      ...prev,
      totalMonthlyHours: area.totalTime,
      taskCosts: area.selectedTasks
    }));
  }, []);

  const costBreakdown = React.useMemo(() => 
    calculateCosts(sites, laborCosts.hourlyRate),
    [sites, laborCosts.hourlyRate]
  );

  const monthlyRevenue = costBreakdown.totalMonthlyCost * 1.5;
  const overhead = monthlyRevenue * OVERHEAD_PERCENTAGE;

  const formattedMenuOptions = React.useMemo(() => 
    menuOptions.map(option => ({
      name: option.label,
      icon: option.icon as "layout" | "file-text" | "list" | "user" | "wrench" | "calendar" | "check-square" | "globe" | "settings",
      onClick: () => setActiveTab(option.id)
    })), 
    []
  );

  const selectedTasks = React.useMemo(() => 
    sites.flatMap(site => 
      site.area?.selectedTasks?.map(task => ({
        ...task,
        siteName: site.name
      })) || []
    ),
    [sites]
  );

  const renderMainContent = () => {
    if (activeTab === 'scope') {
      return (
        <TaskManagementContent 
          activeTab={activeTab} 
          onAreaChange={handleAreaChange}
        />
      );
    }
    
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
  };

  return (
    <SettingsProvider>
      <TaskProvider onTasksChange={handleAreaChange}>
        <div className="min-h-screen flex w-full bg-background">
          <div className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold text-primary mb-8">
                Commercial Cleaning Estimation Tool
              </h1>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex">
                  <DynamicMenu 
                    options={formattedMenuOptions} 
                    className="w-[250px] shrink-0 bg-card rounded-lg border border-border"
                  />
                  <div className="flex flex-1">
                    <div className="flex-1 px-6">
                      <MainNavigation />
                      {renderMainContent()}
                    </div>
                    <ScopeOfWorkSidebar 
                      selectedTasks={selectedTasks} 
                      sites={sites} 
                    />
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </TaskProvider>
    </SettingsProvider>
  );
};

export default Index;