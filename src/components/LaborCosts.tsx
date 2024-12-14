import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LaborCostsProps {
  onLaborCostChange: (costs: { hourlyRate: number }) => void;
}

export const LaborCosts: React.FC<LaborCostsProps> = ({ onLaborCostChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onLaborCostChange({
      hourlyRate: value,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Labor Costs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
            <Input
              id="hourlyRate"
              type="number"
              placeholder="Enter hourly rate"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};