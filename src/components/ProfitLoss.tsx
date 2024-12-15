import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getProductivityRate } from '@/data/productivityRates';

interface ProfitLossProps {
  revenue: number;
  laborCost: number;
  equipmentCost: number;
  overhead: number;
  totalLaborHours: number;
  selectedTasks?: Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    siteName?: string;
  }>;
  onMarginChange?: (margin: number) => void;
}

export const ProfitLoss: React.FC<ProfitLossProps> = ({
  revenue,
  laborCost,
  equipmentCost,
  overhead,
  totalLaborHours,
  selectedTasks = [],
  onMarginChange
}) => {
  const [targetMargin, setTargetMargin] = useState(15);
  const totalCosts = laborCost + equipmentCost + overhead;
  const profit = revenue - totalCosts;
  const actualMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const effectiveHourlyRate = totalLaborHours > 0 ? laborCost / totalLaborHours : 0;
  
  // Calculate suggested revenue based on target margin
  const suggestedRevenue = totalCosts / (1 - (targetMargin / 100));
  const suggestedMonthlyRate = suggestedRevenue;
  const suggestedHourlyRate = totalLaborHours > 0 ? suggestedRevenue / totalLaborHours : 0;

  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMargin = parseFloat(e.target.value) || 0;
    setTargetMargin(newMargin);
    if (onMarginChange) {
      onMarginChange(newMargin);
    }
  };

  const getTaskName = (taskId: string) => {
    const rate = getProductivityRate(taskId);
    return rate?.task || 'Unknown Task';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Target Margin (%)</Label>
              <Input
                type="number"
                value={targetMargin}
                onChange={handleMarginChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Actual Margin</Label>
              <p className="text-2xl font-bold mt-1">{actualMargin.toFixed(1)}%</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Monthly Revenue</span>
              <span className="text-green-600 font-bold">${revenue.toFixed(2)}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Labor Hours</span>
                <span>{totalLaborHours.toFixed(1)} hours</span>
              </div>
              
              {/* Task Breakdown */}
              <div className="pl-4 space-y-1">
                {selectedTasks.map((task, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      {getTaskName(task.taskId)} ({task.timeRequired.toFixed(1)} hrs)
                    </span>
                    <span className="text-muted-foreground">
                      ${(task.timeRequired * effectiveHourlyRate).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Labor Cost (${effectiveHourlyRate.toFixed(2)}/hr)</span>
                <span className="text-red-600">-${laborCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Equipment & Supplies</span>
                <span className="text-red-600">-${equipmentCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Overhead</span>
                <span className="text-red-600">-${overhead.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center font-bold">
              <span>Net Profit</span>
              <span className={profit >= 0 ? "text-green-600" : "text-red-600"}>
                ${profit.toFixed(2)}
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Suggested Rates (Based on Target Margin)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Monthly Rate</Label>
                <p className="text-xl font-bold">${suggestedMonthlyRate.toFixed(2)}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Hourly Rate</Label>
                <p className="text-xl font-bold">${suggestedHourlyRate.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};