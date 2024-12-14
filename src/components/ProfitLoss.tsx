import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfitLossProps {
  revenue: number;
  laborCost: number;
  equipmentCost: number;
  overhead: number;
}

export const ProfitLoss: React.FC<ProfitLossProps> = ({
  revenue,
  laborCost,
  equipmentCost,
  overhead
}) => {
  const totalCosts = laborCost + equipmentCost + overhead;
  const profit = revenue - totalCosts;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profit & Loss Statement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Revenue</span>
            <span className="text-green-600">${revenue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Labor Cost</span>
            <span className="text-red-600">-${laborCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Equipment & Supplies</span>
            <span className="text-red-600">-${equipmentCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Overhead</span>
            <span className="text-red-600">-${overhead.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold">
              <span>Net Profit</span>
              <span className={profit >= 0 ? "text-green-600" : "text-red-600"}>
                ${profit.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Profit Margin</span>
              <span>{profitMargin.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};