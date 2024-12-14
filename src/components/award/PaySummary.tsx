import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PayCalculation } from '@/data/types/award';

interface PaySummaryProps {
  calculation: PayCalculation;
}

export const PaySummary: React.FC<PaySummaryProps> = ({ calculation }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pay Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Gross Weekly Pay:</span>
                <span className="font-semibold">${calculation.grossWeeklyPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Allowances:</span>
                <span className="font-semibold">${calculation.totalAllowances.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Penalty Rates:</span>
                <span className="font-semibold">${calculation.totalPenaltyRates.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Pay:</span>
                <span className="font-semibold">${calculation.netPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Hours:</span>
                <span className="font-semibold">{calculation.totalHours.toFixed(1)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};