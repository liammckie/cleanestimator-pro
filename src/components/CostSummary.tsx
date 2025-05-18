
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CostBreakdown } from '@/utils/costCalculations';

interface CostSummaryProps {
  costs: CostBreakdown;
}

export const CostSummary: React.FC<CostSummaryProps> = ({ costs }) => {
  // Ensure costs properties are not undefined before using them
  const totalMonthlyHours = costs?.suggestedMonthlyHours || 0;
  const totalMonthlyMinutes = costs?.totalMonthlyMinutes || 0;
  const weeklyHours = costs?.suggestedWeeklyHours || 0;
  const laborRate = costs?.laborCostPerHour || 0;
  const monthlyCost = costs?.totalMonthlyCost || 0;
  
  return (
    <Card className="w-full vivid-card">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="text-primary">Labor Requirements Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 vivid-highlight rounded-lg">
              <h3 className="font-medium text-sm text-muted-foreground">Monthly Time</h3>
              <p className="text-2xl font-bold">{Math.round(totalMonthlyHours)} hours</p>
              <p className="text-sm text-muted-foreground">({Math.round(totalMonthlyMinutes)} minutes)</p>
            </div>
            <div className="p-4 vivid-highlight rounded-lg">
              <h3 className="font-medium text-sm text-muted-foreground">Weekly Time</h3>
              <p className="text-2xl font-bold">{Math.round(weeklyHours)} hours</p>
            </div>
          </div>

          <div className="border-t border-border/40 pt-4">
            <h3 className="font-medium mb-2 text-primary">Labor Cost Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Base Labor Rate</span>
                <span>${laborRate.toFixed(2)}/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Hours</span>
                <span>{Math.round(totalMonthlyHours)} hours</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Monthly Labor Cost</span>
                <span className="text-primary">${monthlyCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 pt-4">
            <h3 className="font-medium mb-2 text-primary">Suggested Staffing</h3>
            <div className="space-y-2">
              {costs?.rosterSuggestion?.fullTimeStaff > 0 && (
                <p>Full-time staff: {costs.rosterSuggestion.fullTimeStaff}</p>
              )}
              {costs?.rosterSuggestion?.partTimeStaff > 0 && (
                <p>Part-time staff: {costs.rosterSuggestion.partTimeStaff}</p>
              )}
              {costs?.rosterSuggestion?.casualStaff > 0 && (
                <p>Casual staff: {costs.rosterSuggestion.casualStaff}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
