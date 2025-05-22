
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTaskContext } from '@/components/area/task/TaskContext';

interface CostContextType {
  totalLaborCost: number;
  totalEquipmentCost: number;
  totalWeeklyHours: number;
  laborRate: number;
  updateLaborCost: (cost: number) => void;
  updateEquipmentCost: (cost: number) => void;
  updateLaborRate: (rate: number) => void;
}

const CostContext = createContext<CostContextType | undefined>(undefined);

export const CostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalLaborCost, setTotalLaborCost] = useState(0);
  const [totalEquipmentCost, setTotalEquipmentCost] = useState(0);
  const [laborRate, setLaborRate] = useState(38);
  
  // Get task data from the shared TaskContext
  const { selectedTasks, totalWeeklyHours, totalMonthlyHours } = useTaskContext();

  useEffect(() => {
    // Calculate labor costs from tasks and rates
    if (selectedTasks && selectedTasks.length > 0) {
      const laborCost = selectedTasks.reduce((total, task) => {
        const taskRate = task.laborRate || laborRate;
        const monthlyHours = task.timeRequired * task.frequency.timesPerMonth;
        return total + (monthlyHours * taskRate);
      }, 0);
      
      setTotalLaborCost(laborCost);
      
      console.log('COST_CONTEXT: Updated calculations:', {
        laborCost,
        totalWeeklyHours,
        totalMonthlyHours,
        selectedTasksCount: selectedTasks.length
      });
    }
  }, [selectedTasks, laborRate, totalWeeklyHours, totalMonthlyHours]);

  const updateLaborCost = (cost: number) => {
    console.log('COST_CONTEXT: Updating labor cost:', cost);
    setTotalLaborCost(cost);
  };

  const updateEquipmentCost = (cost: number) => {
    console.log('COST_CONTEXT: Updating equipment cost:', cost);
    setTotalEquipmentCost(cost);
  };

  const updateLaborRate = (rate: number) => {
    console.log('COST_CONTEXT: Updating labor rate:', rate);
    setLaborRate(rate);
  };

  return (
    <CostContext.Provider value={{
      totalLaborCost,
      totalEquipmentCost,
      totalWeeklyHours,
      laborRate,
      updateLaborCost,
      updateEquipmentCost,
      updateLaborRate,
    }}>
      {children}
    </CostContext.Provider>
  );
};

export const useCostContext = () => {
  const context = useContext(CostContext);
  if (context === undefined) {
    throw new Error('useCostContext must be used within a CostProvider');
  }
  return context;
};
