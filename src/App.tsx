import { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MainContent } from './components/layout/MainContent';
import { TaskProvider } from './components/area/task/TaskContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Site } from './data/types/site';
import { Tabs } from "@/components/ui/tabs";
import './App.css';

function App() {
  const [sites, setSites] = useState<Site[]>([]);
  const [laborCosts, setLaborCosts] = useState({
    employmentType: 'direct',
    hourlyRate: 0,
    onCosts: {
      superannuation: 0,
      workersComp: 0,
      payrollTax: 0,
      insurance: 0
    }
  });
  const [equipmentCosts, setEquipmentCosts] = useState({
    monthly: 0,
    yearly: 0
  });
  const [contractDetails, setContractDetails] = useState({
    lengthYears: 1,
    cpiIncreases: true
  });
  const [costBreakdown, setCostBreakdown] = useState({
    totalMonthlyCost: 0,
    totalYearlyCost: 0
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [overhead, setOverhead] = useState(0);

  return (
    <ErrorBoundary>
      <SettingsProvider>
        <TaskProvider>
          <div className="min-h-screen flex w-full bg-background">
            <Tabs defaultValue="sites" className="w-full">
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
            </Tabs>
          </div>
        </TaskProvider>
      </SettingsProvider>
    </ErrorBoundary>
  );
}

export default App;