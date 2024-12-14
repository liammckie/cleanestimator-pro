import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CostBreakdown } from '@/utils/costCalculations';

interface CostSummaryProps {
  costs: CostBreakdown;
}

export const CostSummary: React.FC<CostSummaryProps> = ({ costs }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Labor Requirements Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Monthly Time</h3>
              <p className="text-2xl font-bold">{Math.round(costs.suggestedMonthlyHours)} hours</p>
              <p className="text-sm text-muted-foreground">({Math.round(costs.totalMonthlyMinutes)} minutes)</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Weekly Time</h3>
              <p className="text-2xl font-bold">{Math.round(costs.suggestedWeeklyHours)} hours</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Suggested Staffing</h3>
            <div className="space-y-2">
              {costs.rosterSuggestion.fullTimeStaff > 0 && (
                <p>Full-time staff: {costs.rosterSuggestion.fullTimeStaff}</p>
              )}
              {costs.rosterSuggestion.partTimeStaff > 0 && (
                <p>Part-time staff: {costs.rosterSuggestion.partTimeStaff}</p>
              )}
              {costs.rosterSuggestion.casualStaff > 0 && (
                <p>Casual staff: {costs.rosterSuggestion.casualStaff}</p>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Cost Projection</h3>
            <div className="space-y-2">
              <p>Labor rate: ${costs.laborCostPerHour.toFixed(2)}/hour</p>
              <p className="font-bold">Monthly cost: ${costs.totalMonthlyCost.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};