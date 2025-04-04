
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pay Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Pay Rate:</span>
                <span className="font-semibold">${calculation.basePayRate.toFixed(2)}/hr</span>
              </div>
              <div className="flex justify-between">
                <span>Hours Worked:</span>
                <span className="font-semibold">{calculation.totalHours} hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Total Base Pay:</span>
                <span className="font-semibold">${calculation.totalPay.toFixed(2)}</span>
              </div>
              
              {calculation.totalPenaltyRates > 0 && (
                <div className="flex justify-between">
                  <span>Penalty Rates:</span>
                  <span className="font-semibold">${calculation.totalPenaltyRates.toFixed(2)}</span>
                </div>
              )}
              
              {calculation.allowancesTotal > 0 && (
                <div className="flex justify-between">
                  <span>Total Allowances:</span>
                  <span className="font-semibold">${calculation.allowancesTotal.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Superannuation:</span>
                <span className="font-semibold">${calculation.superannuation.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${calculation.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">Fully Loaded Cost</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Hourly Rate:</span>
                <span>${calculation.basePayRate.toFixed(2)}/hr</span>
              </div>
              <div className="flex justify-between">
                <span>On-costs ({TOTAL_ONCOST_PERCENTAGE}%):</span>
                <span>${(calculation.basePayRate * TOTAL_ONCOST_PERCENTAGE / 100).toFixed(2)}/hr</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Fully Loaded Rate:</span>
                <span>${fullyLoadedRate.toFixed(2)}/hr</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Fully Loaded Total:</span>
                  <span>${fullyLoadedTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
