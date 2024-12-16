import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsProvider } from '@/contexts/SettingsContext';
import { CostProvider } from '@/contexts/CostContext';
import { TaskProvider } from '@/components/area/task/TaskContext';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';
import { MainContent } from '@/components/layout/MainContent';

const defaultSites = [];
const defaultLaborCosts = {
  weeklyHours: 0,
  monthlyHours: 0,
  annualHours: 0,
  laborCost: 0,
  totalMonthlyCost: 0
};

const Index = () => {
  const [sites, setSites] = React.useState(defaultSites);
  const [laborCosts, setLaborCosts] = React.useState(defaultLaborCosts);
  const [equipmentCosts, setEquipmentCosts] = React.useState({ monthly: 0 });
  const [contractDetails, setContractDetails] = React.useState({
    lengthYears: 1,
    cpiIncreases: true
  });
  const [overhead, setOverhead] = React.useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = React.useState(0);

  return (
    <SettingsProvider>
      <CostProvider>
        <TaskProvider defaultLaborRate={38}>
          <div className="flex min-h-screen">
            <Tabs defaultValue="sites" className="flex-1">
              <MainContent 
                sites={sites}
                onSitesChange={setSites}
                laborCosts={laborCosts}
                setLaborCosts={setLaborCosts}
                equipmentCosts={equipmentCosts}
                setEquipmentCosts={setEquipmentCosts}
                contractDetails={contractDetails}
                setContractDetails={setContractDetails}
                costBreakdown={laborCosts}
                monthlyRevenue={monthlyRevenue}
                overhead={overhead}
              />
            </Tabs>
            <ScopeOfWorkSidebar sites={sites} />
          </div>
        </TaskProvider>
      </CostProvider>
    </SettingsProvider>
  );
};

export default Index;