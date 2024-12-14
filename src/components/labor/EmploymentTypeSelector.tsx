import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface EmploymentTypeSelectorProps {
  value: 'contracted' | 'direct';
  onChange: (value: 'contracted' | 'direct') => void;
}

export const EmploymentTypeSelector: React.FC<EmploymentTypeSelectorProps> = ({
  value,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label>Employment Type</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-col space-y-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="contracted" id="contracted" />
          <Label htmlFor="contracted">Contracted (All-Inclusive Rate)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="direct" id="direct" />
          <Label htmlFor="direct">Direct Employment (Award Rates)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};