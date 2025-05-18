
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskManagementPage } from '@/components/task-management/TaskManagementPage';
import { DatabaseNavigation } from '@/components/navigation/DatabaseNavigation';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { MainContent } from '@/components/layout/MainContent';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import { Home, LayoutGrid, Users, Wrench, Calendar, FileText, BarChart2, Settings, Globe } from "lucide-react";
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
    <SettingsProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <Sidebar className="border-r border-border">
            <SidebarHeader className="p-4">
              <h1 className="text-xl font-bold text-primary">CleanEstimator Pro</h1>
            </SidebarHeader>
            <SidebarRail />
            <SidebarContent className="pt-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Home" className="flex items-center gap-3">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Sites" className="flex items-center gap-3">
                    <LayoutGrid className="h-5 w-5" />
                    <span>Site Manager</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Labor" className="flex items-center gap-3">
                    <Users className="h-5 w-5" />
                    <span>Labor Costs</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Equipment" className="flex items-center gap-3">
                    <Wrench className="h-5 w-5" />
                    <span>Equipment</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Roster" className="flex items-center gap-3">
                    <Calendar className="h-5 w-5" />
                    <span>Roster</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Contract" className="flex items-center gap-3">
                    <FileText className="h-5 w-5" />
                    <span>Contract</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Summary" className="flex items-center gap-3">
                    <BarChart2 className="h-5 w-5" />
                    <span>Summary</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings" className="flex items-center gap-3">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Overview" className="flex items-center gap-3">
                    <Globe className="h-5 w-5" />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          
          <div className="flex-1 flex flex-col h-full overflow-auto bg-background">
            <div className="container p-6">
              <h1 className="text-3xl font-bold mb-6 text-primary">Commercial Cleaning Estimation Tool</h1>
              
              <DatabaseNavigation />
              
              <Tabs defaultValue="sites" className="mt-6">
                <TabsList className="w-full justify-start mb-6 bg-card rounded-lg p-1">
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
            </div>
          </div>
        </div>
      </SidebarProvider>
    </SettingsProvider>
  );
};

export default Index;
