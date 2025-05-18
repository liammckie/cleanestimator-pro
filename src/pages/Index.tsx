
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskManagementPage } from '@/components/task-management/TaskManagementPage';
import { DatabaseNavigation } from '@/components/navigation/DatabaseNavigation';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { MainContent } from '@/components/layout/MainContent';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { OnCostsState } from '@/data/types/onCosts';

const Index = () => {
  // We'll need to provide initial state values for the MainContent component
  const [sites, setSites] = React.useState([]);
  
  // Create proper onCosts structure matching OnCostsState type
  const defaultOnCosts: OnCostsState = {
    statutoryOnCosts: [
      { name: 'Superannuation', rate: 11, isEnabled: true, category: 'statutory', isMandatory: true },
      { name: 'Workers Compensation', rate: 5, isEnabled: true, category: 'statutory', isMandatory: true },
      { name: 'Payroll Tax', rate: 4.85, isEnabled: true, category: 'statutory', isMandatory: true },
      { name: 'Leave Entitlements', rate: 12.5, isEnabled: true, category: 'statutory', isMandatory: true },
    ],
    employmentOnCosts: [],
    recruitmentOnCosts: [],
    overheadOnCosts: [],
    miscellaneousOnCosts: []
  };
  
  const [laborCosts, setLaborCosts] = React.useState({
    hourlyRate: 38,
    employmentType: 'direct' as 'direct' | 'contracted',
    onCosts: defaultOnCosts
  });
  
  const [equipmentCosts, setEquipmentCosts] = React.useState({});
  const [contractDetails, setContractDetails] = React.useState({});
  const [costBreakdown, setCostBreakdown] = React.useState({});
  const [monthlyRevenue, setMonthlyRevenue] = React.useState(0);
  const [overhead, setOverhead] = React.useState(0);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <h1 className="text-xl font-bold">CleanEstimator Pro</h1>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <div className="container mx-auto py-8 space-y-4 flex-1">
          <h1 className="text-3xl font-bold mb-8">Commercial Cleaning Estimation Tool</h1>
          
          <DatabaseNavigation />
          
          <SettingsProvider>
            <Tabs defaultValue="sites">
              <TabsList className="w-full justify-start border-b">
                <MainNavigation />
              </TabsList>
              
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
              
              <TabsContent value="task-management" className="space-y-6">
                <TaskManagementPage />
              </TabsContent>
            </Tabs>
          </SettingsProvider>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
