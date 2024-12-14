import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployeeDetails } from './EmployeeDetails';
import { PayCalculator } from './PayCalculator';
import { AllowancesSelector } from './AllowancesSelector';
import { PaySummary } from './PaySummary';
import { useToast } from "@/hooks/use-toast";
import { Employee, PayCalculation } from '@/data/types/award';

export const AwardEngine = () => {
  const { toast } = useToast();
  const [calculation, setCalculation] = React.useState<PayCalculation>({
    grossWeeklyPay: 0,
    totalAllowances: 0,
    totalPenaltyRates: 0,
    netPay: 0,
    totalHours: 0
  });

  const handleCalculationUpdate = (newCalculation: PayCalculation) => {
    setCalculation(newCalculation);
    toast({
      title: "Calculation Updated",
      description: "Pay calculation has been updated with the latest inputs.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cleaning Award Pay Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <EmployeeDetails />
          <PayCalculator onCalculationUpdate={handleCalculationUpdate} />
          <AllowancesSelector onAllowancesUpdate={handleCalculationUpdate} />
          <PaySummary calculation={calculation} />
        </CardContent>
      </Card>
    </div>
  );
};