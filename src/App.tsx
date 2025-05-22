
import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CostProvider } from "./contexts/CostContext";
import { MainNavigation } from './components/navigation/MainNavigation';
import { MainContent } from './components/layout/MainContent';
import { RatesProvider } from './contexts/RatesContext';
import { RatesManagementPage } from './components/rates/RatesManagementPage';
import { TemplatesPage } from './components/templates/TemplatesPage';
import { TaskProvider } from './components/area/task/TaskContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { WorkflowProvider } from './contexts/WorkflowContext';
import { WorkflowLayout } from './components/workflow/WorkflowLayout';
import { SiteSetupStep } from './components/workflow/SiteSetupStep';
import { ScopeDefinitionStep } from './components/workflow/ScopeDefinitionStep';
import { TaskManagementStep } from './components/workflow/TaskManagementStep';
import { LaborCostsStep } from './components/workflow/LaborCostsStep';
import { EquipmentStep } from './components/workflow/EquipmentStep';
import { ContractStep } from './components/workflow/ContractStep';
import { SummaryStep } from './components/workflow/SummaryStep';
import { ReviewStep } from './components/workflow/ReviewStep';
import { WorkflowProjects } from './components/workflow/WorkflowProjects';
import { LoadWorkflow } from './components/workflow/LoadWorkflow';

function App() {
  const [sites, setSites] = useState([]);
  const [laborCosts, setLaborCosts] = useState({
    hourlyRate: 38,
    employmentType: 'direct' as 'direct' | 'contracted',
    onCosts: {
      statutoryOnCosts: [],
      employmentOnCosts: [],
      recruitmentOnCosts: [],
      overheadOnCosts: [],
      miscellaneousOnCosts: []
    }
  });
  const [equipmentCosts, setEquipmentCosts] = useState({});
  const [contractDetails, setContractDetails] = useState({});
  const [costBreakdown, setCostBreakdown] = useState({});
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [overhead, setOverhead] = useState(0);
  
  return (
    <Router>
      <SettingsProvider>
        <TaskProvider>
          <CostProvider>
            <RatesProvider>
              <Routes>
                {/* Legacy routes */}
                <Route path="/legacy" element={<>
                  <MainNavigation />
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
                </>} />
                <Route path="/rates" element={<RatesManagementPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                
                {/* Workflow routes */}
                <Route path="/" element={<Navigate to="/workflow/projects" replace />} />
                
                <Route path="/workflow/projects" element={
                  <WorkflowProvider>
                    <WorkflowProjects />
                  </WorkflowProvider>
                } />
                
                <Route path="/workflow/continue/:id" element={
                  <WorkflowProvider>
                    <LoadWorkflow />
                  </WorkflowProvider>
                } />
                
                <Route path="/workflow" element={
                  <WorkflowProvider>
                    <WorkflowLayout />
                  </WorkflowProvider>
                }>
                  <Route path="site-setup" element={<SiteSetupStep />} />
                  <Route path="scope" element={<ScopeDefinitionStep />} />
                  <Route path="tasks" element={<TaskManagementStep />} />
                  <Route path="labor" element={<LaborCostsStep />} />
                  <Route path="equipment" element={<EquipmentStep />} />
                  <Route path="contract" element={<ContractStep />} />
                  <Route path="summary" element={<SummaryStep />} />
                  <Route path="review" element={<ReviewStep />} />
                </Route>
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </RatesProvider>
          </CostProvider>
        </TaskProvider>
      </SettingsProvider>
    </Router>
  )
}

export default App
