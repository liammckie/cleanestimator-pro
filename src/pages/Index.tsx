import React, { useState } from 'react';
import { Tabs } from "@/components/ui/tabs";
import { SidebarProvider } from '@/components/ui/sidebar';
import { calculateCosts } from '@/utils/costCalculations';
import { menuOptions } from '@/components/navigation/MenuOptions';
import { MainContent } from '@/components/layout/MainContent';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { TaskProvider } from '@/components/area/task/TaskContext';
import { AppLayout } from '@/components/layout/AppLayout';

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

  const costBreakdown = calculateCosts(sites, laborCosts.hourlyRate);
  const monthlyRevenue = costBreakdown.totalMonthlyCost * 1.5;
  const overhead = monthlyRevenue * OVERHEAD_PERCENTAGE;

  const formattedMenuOptions = menuOptions.map(option => ({
    name: option.label,
    icon: option.icon as "layout" | "file-text" | "list" | "user" | "wrench" | "calendar" | "check-square" | "globe" | "settings",
    onClick: () => setActiveTab(option.id)
  }));

  const selectedTasks = sites.flatMap(site => 
    site.area?.selectedTasks?.map(task => ({
      ...task,
      siteName: site.name
    })) || []
  );

  return (
    <SettingsProvider>
      <SidebarProvider>
        <TaskProvider>
          <div className="min-h-screen bg-background">
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold text-primary py-8">
                Commercial Cleaning Estimation Tool
              </h1>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <AppLayout
                  menuOptions={formattedMenuOptions}
                  selectedTasks={selectedTasks}
                  sites={sites}
                >
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
                </AppLayout>
              </Tabs>
            </div>
          </div>
        </TaskProvider>
      </SidebarProvider>
    </SettingsProvider>
  );
};

export default Index;