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
  const [totalWeeklyHours, setTotalWeeklyHours] = useState(0);
  const [laborRate, setLaborRate] = useState(38);

  // Try to get task context, but provide fallback if not available
  let selectedTasks: any[] = [];
  try {
    const taskContext = useTaskContext();
    selectedTasks = taskContext?.selectedTasks || [];
    console.log('COST_CONTEXT: Retrieved tasks from context:', {
      taskCount: selectedTasks.length,
      tasks: selectedTasks.map(task => ({
        taskId: task.taskId,
        timeRequired: task.timeRequired,
        weeklyHours: task.timeRequired * task.frequency.timesPerWeek,
        monthlyHours: task.timeRequired * task.frequency.timesPerMonth
      }))
    });
  } catch (error) {
    console.log('COST_CONTEXT: Task context not available yet, using default values');
  }

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
    
    console.log('COST_CONTEXT: Updated calculations:', {
      weeklyHours,
      monthlyHours,
      laborRate,
      laborCost,
      selectedTasks: selectedTasks.length
    });
  }, [selectedTasks, laborRate]);

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