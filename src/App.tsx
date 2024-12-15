import React from 'react';
import { TaskProvider } from './components/area/task/TaskContext';
import { CostProvider } from './contexts/CostContext';
import { EquipmentCosts } from './components/EquipmentCosts';
import { LaborCosts } from './components/LaborCosts';
import { ProfitLoss } from './components/ProfitLoss';
import { FinancialTabs } from './components/financial/FinancialTabs';
import { ScopeOfWorkSidebar } from './components/ScopeOfWorkSidebar';
import { TaskManagementPage } from './components/task-management/TaskManagementPage';

function App() {
  return (
    <TaskProvider>
      <CostProvider>
        <div className="app-container">
          <EquipmentCosts onEquipmentCostChange={(costs) => console.log(costs)} />
          <LaborCosts onLaborCostChange={(costs) => console.log(costs)} />
          <ProfitLoss
            revenue={0}
            laborCost={0}
            equipmentCost={0}
            overhead={0}
            totalLaborHours={0}
            selectedTasks={[]}
            onMarginChange={(margin) => {
              console.log(margin);
              return margin; // Return the margin value instead of void
            }}
          />
          <FinancialTabs
            laborCosts={{ hourlyRate: 0 }}
            setLaborCosts={(costs) => console.log(costs)}
            monthlyRevenue={0}
            overhead={0}
            costBreakdown={{}}
            equipmentCosts={{ monthly: 0 }}
            contractDetails={{}}
            setContractDetails={(details) => console.log(details)}
            taskCosts={[]}
            onMarginChange={(margin) => {
              console.log(margin);
              return margin; // Return the margin value instead of void
            }}
          />
          <ScopeOfWorkSidebar selectedTasks={[]} />
          <TaskManagementPage />
        </div>
      </CostProvider>
    </TaskProvider>
  );
}

export default App;