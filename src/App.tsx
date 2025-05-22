
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
      <TaskProvider>
        <SettingsProvider>
          <CostProvider>
            <RatesProvider>
              <MainNavigation />
              <Routes>
                <Route path="/" element={
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
                } />
                <Route path="/rates" element={<RatesManagementPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </RatesProvider>
          </CostProvider>
        </SettingsProvider>
      </TaskProvider>
    </Router>
  )
}

export default App
