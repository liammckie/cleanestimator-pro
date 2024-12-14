import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EquipmentCostsProps {
  onEquipmentCostChange: (costs: { monthly: number }) => void;
}

export const EquipmentCosts: React.FC<EquipmentCostsProps> = ({ onEquipmentCostChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onEquipmentCostChange({
      monthly: value,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Equipment & Supplies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyEquipment">Monthly Equipment Cost ($)</Label>
            <Input
              id="monthlyEquipment"
              type="number"
              placeholder="Enter monthly equipment cost"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};