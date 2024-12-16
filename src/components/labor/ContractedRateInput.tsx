import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContractedRateInputProps {
  contractedRate: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContractedRateInput: React.FC<ContractedRateInputProps> = ({
  contractedRate,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="contracted-rate">Hourly Rate ($)</Label>
      <Input
        id="contracted-rate"
        name="contracted-rate"
        type="number"
        value={contractedRate}
        placeholder="Enter hourly rate"
        onChange={onChange}
      />
    </div>
  );
};