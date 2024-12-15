import React from 'react';
import { Tabs } from "@/components/ui/tabs";
import { TaskProvider } from './components/area/task/TaskContext';
import { CostProvider } from './contexts/CostContext';
import { EquipmentCosts } from './components/EquipmentCosts';
import { LaborCosts } from './components/LaborCosts';
import { ProfitLoss } from './components/ProfitLoss';
import { FinancialTabs } from './components/financial/FinancialTabs';
import { ScopeOfWorkSidebar } from './components/ScopeOfWorkSidebar';
import { TaskManagementPage } from './components/task-management/TaskManagementPage';
import { MainNavigation } from './components/navigation/MainNavigation';

function App() {
  return (
    <TaskProvider>
      <CostProvider>
        <div className="app-container min-h-screen bg-background">
          <Tabs defaultValue="equipment" className="w-full">
            <MainNavigation />
            <div className="container mx-auto p-6 space-y-8">
              <TabsContent value="equipment">
                <EquipmentCosts onEquipmentCostChange={(costs) => console.log(costs)} />
              </TabsContent>
              
              <TabsContent value="labor">
                <LaborCosts onLaborCostChange={(costs) => console.log(costs)} />
              </TabsContent>
              
              <TabsContent value="summary">
                <ProfitLoss
                  revenue={0}
                  laborCost={0}
                  equipmentCost={0}
                  overhead={0}
                  totalLaborHours={0}
                  selectedTasks={[]}
                  onMarginChange={(margin) => {
                    console.log(margin);
                    return margin;
                  }}
                />
              </TabsContent>
              
              <TabsContent value="financial">
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
                    return margin;
                  }}
                />
              </TabsContent>
              
              <TabsContent value="scope">
                <ScopeOfWorkSidebar selectedTasks={[]} />
              </TabsContent>
              
              <TabsContent value="task-management">
                <TaskManagementPage />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </CostProvider>
    </TaskProvider>
  );
}

export default App;