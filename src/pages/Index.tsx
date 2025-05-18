
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskManagementPage } from '@/components/task-management/TaskManagementPage';
import { DatabaseNavigation } from '@/components/navigation/DatabaseNavigation';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { MainContent } from '@/components/layout/MainContent';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { useLocation } from 'react-router-dom';
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
import { 
  Home, 
  LayoutGrid, 
  Users, 
  Wrench, 
  Calendar, 
  FileText, 
  BarChart2, 
  Settings, 
  Globe 
} from "lucide-react";
import { OnCostsState } from '@/data/types/onCosts';

const Index = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState('sites');
  
  // Set the active tab based on the URL when the component mounts or URL changes
  React.useEffect(() => {
    // Extract the tab name from URL or use a default
    const pathParts = location.pathname.split('/');
    const tabFromPath = pathParts[1] || 'sites';
    setActiveTab(tabFromPath || 'sites');
  }, [location]);
  
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'sites', label: 'Site Manager', icon: LayoutGrid },
    { id: 'labor', label: 'Labor Costs', icon: Users },
    { id: 'equipment', label: 'Equipment', icon: Wrench },
    { id: 'roster', label: 'Roster', icon: Calendar },
    { id: 'contract', label: 'Contract', icon: FileText },
    { id: 'summary', label: 'Summary', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'overview', label: 'Overview', icon: Globe }
  ];

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
                {sidebarItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        tooltip={item.label} 
                        className={`flex items-center gap-3 ${isActive ? 'bg-primary/20 text-primary' : ''}`}
                        onClick={() => handleTabChange(item.id)}
                        isActive={isActive}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          
          <div className="flex-1 flex flex-col h-full overflow-auto bg-background">
            <div className="container p-6">
              <h1 className="text-3xl font-bold mb-6 text-primary spotify-animate-in">
                Commercial Cleaning Estimation Tool
              </h1>
              
              <DatabaseNavigation />
              
              <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
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
