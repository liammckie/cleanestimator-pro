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
  const { selectedTasks } = useTaskContext();
  const [totalLaborCost, setTotalLaborCost] = useState(0);
  const [totalEquipmentCost, setTotalEquipmentCost] = useState(0);
  const [totalWeeklyHours, setTotalWeeklyHours] = useState(0);
  const [laborRate, setLaborRate] = useState(38); // Default labor rate

  useEffect(() => {
    // Calculate total weekly hours and costs from selected tasks
    const weeklyHours = selectedTasks.reduce((total, task) => {
      const monthlyHours = task.timeRequired || 0;
      return total + (monthlyHours / 4.33); // Convert monthly to weekly
    }, 0);
    
    const monthlyHours = weeklyHours * 4.33;
    const laborCost = monthlyHours * laborRate;
    
    setTotalWeeklyHours(weeklyHours);
    setTotalLaborCost(laborCost);
    
    console.log('Updated calculations:', {
      weeklyHours,
      monthlyHours,
      laborRate,
      laborCost
    });
  }, [selectedTasks, laborRate]);

  const updateLaborCost = (cost: number) => {
    setTotalLaborCost(cost);
  };

  const updateEquipmentCost = (cost: number) => {
    setTotalEquipmentCost(cost);
  };

  const updateLaborRate = (rate: number) => {
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