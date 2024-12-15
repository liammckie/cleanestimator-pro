import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductivityRate } from '@/data/productivityRates';
import { TaskCostBreakdown } from '@/utils/costingCalculations';

interface ProfitLossProps {
  revenue: number;
  laborCost: number;
  equipmentCost: number;
  overhead: number;
  totalLaborHours: number;
  selectedTasks?: TaskCostBreakdown[];
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
  const totalCosts = laborCost + equipmentCost + overhead;
  const profit = revenue - totalCosts;
  const actualMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const effectiveHourlyRate = totalLaborHours > 0 ? laborCost / totalLaborHours : 0;

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
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-accent/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <p className="text-2xl font-bold">${revenue.toFixed(2)}</p>
            </div>
            <div className="bg-accent/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Costs</p>
              <p className="text-2xl font-bold">${totalCosts.toFixed(2)}</p>
            </div>
            <div className="bg-accent/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Net Profit</p>
              <p className="text-2xl font-bold">${profit.toFixed(2)}</p>
            </div>
            <div className="bg-accent/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Profit Margin</p>
              <p className="text-2xl font-bold">{actualMargin.toFixed(1)}%</p>
            </div>
          </div>

          <Separator />

          {/* Labor Details */}
          <div>
            <h3 className="font-medium mb-2">Labor Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Labor Hours</span>
                <span>{totalLaborHours.toFixed(1)} hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Effective Hourly Rate</span>
                <span>${effectiveHourlyRate.toFixed(2)}/hr</span>
              </div>
              <div className="flex justify-between items-center font-medium">
                <span>Total Labor Cost</span>
                <span>${laborCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Task Breakdown */}
          {selectedTasks.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Task Breakdown</h3>
                <div className="space-y-2">
                  {selectedTasks.map((task, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div>
                        <span>{getTaskName(task.taskId)}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({task.timeRequired.toFixed(1)} hrs - {task.siteName})
                        </span>
                      </div>
                      <span>${task.monthlyCost.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Other Costs */}
          <div>
            <h3 className="font-medium mb-2">Additional Costs</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Equipment & Supplies</span>
                <span>${equipmentCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Overhead</span>
                <span>${overhead.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Total Summary */}
          <div className="pt-2">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total Monthly Revenue</span>
              <span>${revenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
              <span>Profit Margin</span>
              <span>{actualMargin.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
