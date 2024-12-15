import React, { createContext, useContext, useState, useEffect } from 'react';
import { SelectedTask } from '@/components/area/task/types';
import { useTaskContext } from '@/components/area/task/TaskContext';
import { OnCostsState } from '@/data/types/onCosts';

interface CostContextType {
  laborCosts: {
    hourlyRate: number;
    totalMonthlyHours: number;
    totalWeeklyHours: number;
    totalMonthlyCost: number;
  };
  equipmentCosts: {
    monthly: number;
  };
  updateLaborRate: (rate: number) => void;
  updateEquipmentCosts: (costs: { monthly: number }) => void;
  onCosts?: OnCostsState;
}

const CostContext = createContext<CostContextType | undefined>(undefined);

export const CostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedTasks } = useTaskContext();
  const [laborRate, setLaborRate] = useState(38); // Default rate
  const [equipmentCosts, setEquipmentCosts] = useState({ monthly: 0 });
  const [laborCosts, setLaborCosts] = useState({
    hourlyRate: laborRate,
    totalMonthlyHours: 0,
    totalWeeklyHours: 0,
    totalMonthlyCost: 0
  });

  // Calculate total hours and costs whenever tasks or rates change
  useEffect(() => {
    const totalMonthlyHours = selectedTasks.reduce((total, task) => {
      return total + (task.timeRequired || 0);
    }, 0);

    const totalWeeklyHours = totalMonthlyHours / 4.33;
    const totalMonthlyCost = totalMonthlyHours * laborRate;

    console.log('Cost calculations updated:', {
      totalMonthlyHours,
      totalWeeklyHours,
      totalMonthlyCost,
      laborRate
    });

    setLaborCosts({
      hourlyRate: laborRate,
      totalMonthlyHours,
      totalWeeklyHours,
      totalMonthlyCost
    });
  }, [selectedTasks, laborRate]);

  const updateLaborRate = (rate: number) => {
    setLaborRate(rate);
  };

  const updateEquipmentCosts = (costs: { monthly: number }) => {
    setEquipmentCosts(costs);
    console.log('Equipment costs updated:', costs);
  };

  return (
    <CostContext.Provider 
      value={{
        laborCosts,
        equipmentCosts,
        updateLaborRate,
        updateEquipmentCosts
      }}
    >
      {children}
    </CostContext.Provider>
  );
};

export const useCostContext = () => {
  const context = useContext(CostContext);
  if (!context) {
    throw new Error('useCostContext must be used within a CostProvider');
  }
  return context;
};