import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContractLengthProps {
  value: number;
  onChange: (value: number) => void;
}

export const ContractLength: React.FC<ContractLengthProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="contractLength">Contract Length</Label>
      <Select
        value={value.toString()}
        onValueChange={(val) => onChange(parseInt(val))}
      >
        <SelectTrigger id="contractLength">
          <SelectValue placeholder="Select contract length" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 Year</SelectItem>
          <SelectItem value="2">2 Years</SelectItem>
          <SelectItem value="3">3 Years</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};