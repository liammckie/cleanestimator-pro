import React, { useState } from 'react';
import { AreaInput } from '@/components/AreaInput';
import { LaborCosts } from '@/components/LaborCosts';
import { EquipmentCosts } from '@/components/EquipmentCosts';
import { ProfitLoss } from '@/components/ProfitLoss';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OnCostsState } from '@/data/types/onCosts';

const OVERHEAD_PERCENTAGE = 0.15;

const Index = () => {
  const [area, setArea] = useState({ 
    squareFeet: 0, 
    spaceType: 'office',
    selectedTasks: [],
    totalTime: 0
  });
  const [laborCosts, setLaborCosts] = useState<{ 
    hourlyRate: number;
    employmentType: 'contracted' | 'direct';
    awardLevel?: number;
    shiftType?: string;
    onCosts?: OnCostsState;
  }>({ 
    hourlyRate: 0,
    employmentType: 'contracted'
  });
  const [equipmentCosts, setEquipmentCosts] = useState({ monthly: 0 });

  const calculateTotalOnCosts = () => {
    if (laborCosts.employmentType !== 'direct' || !laborCosts.onCosts) return 0;

    const baseRate = laborCosts.hourlyRate;
    let totalOnCostPercentage = 0;

    Object.values(laborCosts.onCosts).forEach(category => {
      category.forEach(onCost => {
        if (onCost.isEnabled) {
          totalOnCostPercentage += onCost.rate;
        }
      });
    });

    return (baseRate * totalOnCostPercentage) / 100;
  };

  const onCostsPerHour = calculateTotalOnCosts();
  const totalHourlyRate = laborCosts.hourlyRate + onCostsPerHour;
  const laborCost = area.totalTime * totalHourlyRate;
  const monthlyRevenue = laborCost * 1.5;
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
            
            <Tabs defaultValue="scope" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="scope">Scope & Tasks</TabsTrigger>
                <TabsTrigger value="labor">Labor Costs</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="scope" className="space-y-6">
                <AreaInput onAreaChange={setArea} />
              </TabsContent>

              <TabsContent value="labor" className="space-y-6">
                <LaborCosts onLaborCostChange={setLaborCosts} />
              </TabsContent>

              <TabsContent value="equipment" className="space-y-6">
                <EquipmentCosts onEquipmentCostChange={setEquipmentCosts} />
              </TabsContent>

              <TabsContent value="summary" className="space-y-6">
                <ProfitLoss
                  revenue={monthlyRevenue}
                  laborCost={laborCost}
                  equipmentCost={equipmentCosts.monthly}
                  overhead={overhead}
                />
                
                <div className="mt-6 text-sm text-gray-600">
                  <p>* Overhead calculated at {OVERHEAD_PERCENTAGE * 100}% of revenue</p>
                  {area.totalTime > 0 && (
                    <p>* Total time required: {(area.totalTime * 60).toFixed(1)} minutes</p>
                  )}
                  {laborCosts.employmentType === 'direct' && onCostsPerHour > 0 && (
                    <p>* On-costs per hour: ${onCostsPerHour.toFixed(2)}</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;