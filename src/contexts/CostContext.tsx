import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTaskContext } from '@/components/area/task/TaskContext';

interface CostContextType {
  totalLaborCost: number;
  totalEquipmentCost: number;
  totalWeeklyHours: number;
  updateLaborCost: (cost: number) => void;
  updateEquipmentCost: (cost: number) => void;
}

const CostContext = createContext<CostContextType | undefined>(undefined);

export const CostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedTasks } = useTaskContext();
  const [totalLaborCost, setTotalLaborCost] = useState(0);
  const [totalEquipmentCost, setTotalEquipmentCost] = useState(0);
  const [totalWeeklyHours, setTotalWeeklyHours] = useState(0);

  useEffect(() => {
    // Calculate total weekly hours from selected tasks
    const weeklyHours = selectedTasks.reduce((total, task) => {
      const monthlyHours = task.timeRequired || 0;
      return total + (monthlyHours / 4.33); // Convert monthly to weekly
    }, 0);
    
    setTotalWeeklyHours(weeklyHours);
    console.log('Updated total weekly hours:', weeklyHours);
  }, [selectedTasks]);

  const updateLaborCost = (cost: number) => {
    setTotalLaborCost(cost);
  };

  const updateEquipmentCost = (cost: number) => {
    setTotalEquipmentCost(cost);
  };

  return (
    <CostContext.Provider value={{
      totalLaborCost,
      totalEquipmentCost,
      totalWeeklyHours,
      updateLaborCost,
      updateEquipmentCost,
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