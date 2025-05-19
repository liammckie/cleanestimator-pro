
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CostBreakdown } from '@/utils/costCalculations';

interface CostSummaryProps {
  costs: CostBreakdown;
}

export const CostSummary: React.FC<CostSummaryProps> = ({ costs }) => {
  // Ensure costs object exists and provide defaults for all properties
  const safeProps = {
    totalMonthlyMinutes: costs?.totalMonthlyMinutes || 0,
    suggestedMonthlyHours: costs?.suggestedMonthlyHours || 0,
    suggestedWeeklyHours: costs?.suggestedWeeklyHours || 0,
    laborCostPerHour: costs?.laborCostPerHour || 0,
    totalMonthlyCost: costs?.totalMonthlyCost || 0,
    rosterSuggestion: costs?.rosterSuggestion || {
      fullTimeStaff: 0,
      partTimeStaff: 0,
      casualStaff: 0
    }
  };

  console.log('CostSummary rendering with props:', safeProps);
  
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
              <p className="text-2xl font-bold">{Math.round(safeProps.suggestedMonthlyHours)} hours</p>
              <p className="text-sm text-muted-foreground">({Math.round(safeProps.totalMonthlyMinutes)} minutes)</p>
            </div>
            <div className="p-4 vivid-highlight rounded-lg">
              <h3 className="font-medium text-sm text-muted-foreground">Weekly Time</h3>
              <p className="text-2xl font-bold">{Math.round(safeProps.suggestedWeeklyHours)} hours</p>
            </div>
          </div>

          <div className="border-t border-border/40 pt-4">
            <h3 className="font-medium mb-2 text-primary">Labor Cost Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Base Labor Rate</span>
                <span>${safeProps.laborCostPerHour.toFixed(2)}/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Hours</span>
                <span>{Math.round(safeProps.suggestedMonthlyHours)} hours</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Monthly Labor Cost</span>
                <span className="text-primary">${safeProps.totalMonthlyCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 pt-4">
            <h3 className="font-medium mb-2 text-primary">Suggested Staffing</h3>
            <div className="space-y-2">
              {safeProps.rosterSuggestion.fullTimeStaff > 0 && (
                <p>Full-time staff: {safeProps.rosterSuggestion.fullTimeStaff}</p>
              )}
              {safeProps.rosterSuggestion.partTimeStaff > 0 && (
                <p>Part-time staff: {safeProps.rosterSuggestion.partTimeStaff}</p>
              )}
              {safeProps.rosterSuggestion.casualStaff > 0 && (
                <p>Casual staff: {safeProps.rosterSuggestion.casualStaff}</p>
              )}
              {(safeProps.rosterSuggestion.fullTimeStaff === 0 && 
                safeProps.rosterSuggestion.partTimeStaff === 0 && 
                safeProps.rosterSuggestion.casualStaff === 0) && (
                <p className="text-muted-foreground">No staffing data available</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
