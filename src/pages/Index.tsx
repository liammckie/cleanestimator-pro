import React, { useState } from 'react';
import { AreaInput } from '@/components/AreaInput';
import { LaborCosts } from '@/components/LaborCosts';
import { EquipmentCosts } from '@/components/EquipmentCosts';
import { ProfitLoss } from '@/components/ProfitLoss';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const OVERHEAD_PERCENTAGE = 0.15; // 15% overhead

const Index = () => {
  const [area, setArea] = useState({ 
    squareFeet: 0, 
    spaceType: 'office',
    selectedTasks: [],
    totalTime: 0
  });
  const [laborCosts, setLaborCosts] = useState({ hourlyRate: 0 });
  const [equipmentCosts, setEquipmentCosts] = useState({ monthly: 0 });

  // Calculate costs based on total time from all tasks
  const laborCost = area.totalTime * laborCosts.hourlyRate;
  const monthlyRevenue = laborCost * 1.5; // 50% markup for example
  const overhead = monthlyRevenue * OVERHEAD_PERCENTAGE;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ScopeOfWorkSidebar selectedTasks={area.selectedTasks} />
        <div className="flex-1 bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-primary mb-8">
              Commercial Cleaning Estimation Tool
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <AreaInput onAreaChange={setArea} />
              <LaborCosts onLaborCostChange={setLaborCosts} />
              <EquipmentCosts onEquipmentCostChange={setEquipmentCosts} />
            </div>

            <div className="mt-8">
              <ProfitLoss
                revenue={monthlyRevenue}
                laborCost={laborCost}
                equipmentCost={equipmentCosts.monthly}
                overhead={overhead}
              />
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>* Overhead calculated at {OVERHEAD_PERCENTAGE * 100}% of revenue</p>
              {area.totalTime > 0 && (
                <p>* Total time required: {(area.totalTime * 60).toFixed(1)} minutes</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;