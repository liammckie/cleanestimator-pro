import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployeeDetails } from './EmployeeDetails';
import { PayCalculator } from './PayCalculator';
import { AllowancesSelector } from './AllowancesSelector';
import { PaySummary } from './PaySummary';
import { useToast } from "@/hooks/use-toast";
import { EmployeeDetails as IEmployeeDetails, PayCalculation } from '@/data/types/award';

export const AwardEngine = () => {
  const { toast } = useToast();
  const [calculation, setCalculation] = React.useState<PayCalculation>({
    basePayRate: 0,
    totalPay: 0,
    superannuation: 0,
    allowancesTotal: 0,
    total: 0,
    breakdowns: {
      allowances: {},
      penalties: {}
    }
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