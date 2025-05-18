
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PayCalculation } from '@/data/types/award';
import { calculateFullyLoadedRate, TOTAL_ONCOST_PERCENTAGE } from '@/data/award/cleaningAward';

interface PaySummaryProps {
  calculation: PayCalculation;
}

export const PaySummary: React.FC<PaySummaryProps> = ({ calculation }) => {
  const fullyLoadedRate = calculateFullyLoadedRate(calculation.basePayRate);
  const fullyLoadedTotal = calculation.totalHours * fullyLoadedRate;
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-primary">Pay Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="vivid-card card-hover-effect overflow-hidden border-border/50">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Base Pay Rate:</span>
                <span className="font-semibold text-foreground">${calculation.basePayRate.toFixed(2)}/hr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Hours Worked:</span>
                <span className="font-semibold text-foreground">{calculation.totalHours} hrs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Base Pay:</span>
                <span className="font-semibold text-foreground">${calculation.totalPay.toFixed(2)}</span>
              </div>
              
              {calculation.totalPenaltyRates > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Penalty Rates:</span>
                  <span className="font-semibold text-foreground">${calculation.totalPenaltyRates.toFixed(2)}</span>
                </div>
              )}
              
              {calculation.allowancesTotal > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Allowances:</span>
                  <span className="font-semibold text-foreground">${calculation.allowancesTotal.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Superannuation:</span>
                <span className="font-semibold text-foreground">${calculation.superannuation.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-primary">Total:</span>
                  <span className="text-lg">${calculation.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="vivid-card card-hover-effect overflow-hidden border-border/50">
          <CardContent className="pt-6">
            <h4 className="font-medium mb-3 text-primary">Fully Loaded Cost</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Base Hourly Rate:</span>
                <span className="text-foreground">${calculation.basePayRate.toFixed(2)}/hr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">On-costs ({TOTAL_ONCOST_PERCENTAGE}%):</span>
                <span className="text-foreground">${(calculation.basePayRate * TOTAL_ONCOST_PERCENTAGE / 100).toFixed(2)}/hr</span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span className="text-muted-foreground">Fully Loaded Rate:</span>
                <span className="text-foreground">${fullyLoadedRate.toFixed(2)}/hr</span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-primary">Fully Loaded Total:</span>
                  <span className="text-lg">${fullyLoadedTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
