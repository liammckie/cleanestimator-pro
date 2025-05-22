
import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CostContext } from "./contexts/CostContext";
import { MainNavigation } from './components/navigation/MainNavigation';
import { MainContent } from './components/layout/MainContent';
import { RatesProvider } from './contexts/RatesContext';
import { RatesManagementPage } from './components/rates/RatesManagementPage';

function App() {
  const [laborRate, setLaborRate] = useState(38);
  const [equipmentCost, setEquipmentCost] = useState(0);
  const [consumablesCost, setConsumablesCost] = useState(0);
  const [overheadsCost, setOverheadsCost] = useState(0);
  
  return (
    <Router>
      <CostContext.Provider value={{
        laborRate,
        equipmentCost,
        consumablesCost,
        overheadsCost,
        updateLaborRate: setLaborRate,
        updateEquipmentCost: setEquipmentCost,
        updateConsumablesCost: setConsumablesCost,
        updateOverheadsCost: setOverheadsCost,
      }}>
        <RatesProvider>
          <MainNavigation />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/rates" element={<RatesManagementPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RatesProvider>
      </CostContext.Provider>
    </Router>
  )
}

export default App
