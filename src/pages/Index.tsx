import React from 'react';
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
  laborCost: 0
};

const Index = () => {
  const [sites, setSites] = React.useState(defaultSites);
  const [laborCosts, setLaborCosts] = React.useState(defaultLaborCosts);
  const [equipmentCosts, setEquipmentCosts] = React.useState([]);
  const [onCosts, setOnCosts] = React.useState([]);
  const [selectedIndustry, setSelectedIndustry] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [areaData, setAreaData] = React.useState({});
  const [taskData, setTaskData] = React.useState({});

  return (
    <SettingsProvider>
      <CostProvider>
        <TaskProvider defaultLaborRate={38}>
          <div className="flex min-h-screen">
            <MainContent 
              sites={sites}
              onSitesChange={setSites}
              laborCosts={laborCosts}
              setLaborCosts={setLaborCosts}
              equipmentCosts={equipmentCosts}
              setEquipmentCosts={setEquipmentCosts}
              onCosts={onCosts}
              setOnCosts={setOnCosts}
              selectedIndustry={selectedIndustry}
              setSelectedIndustry={setSelectedIndustry}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              areaData={areaData}
              setAreaData={setAreaData}
              taskData={taskData}
              setTaskData={setTaskData}
            />
            <ScopeOfWorkSidebar sites={sites} />
          </div>
        </TaskProvider>
      </CostProvider>
    </SettingsProvider>
  );
};

export default Index;