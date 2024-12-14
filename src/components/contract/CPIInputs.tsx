import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CPIInputsProps {
  contractLength: number;
  values: {
    yearOne: number;
    yearTwo: number;
    yearThree: number;
  };
  onChange: (year: 'yearOne' | 'yearTwo' | 'yearThree', value: number) => void;
}

export const CPIInputs: React.FC<CPIInputsProps> = ({ 
  contractLength, 
  values, 
  onChange 
}) => {
  return (
    <div className="space-y-4">
      <Label>CPI Increases (%)</Label>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="yearOne">Year One</Label>
          <Input
            id="yearOne"
            type="number"
            step="0.1"
            value={values.yearOne}
            onChange={(e) => onChange('yearOne', parseFloat(e.target.value) || 0)}
            placeholder="Enter Year 1 CPI increase"
          />
        </div>
        {contractLength >= 2 && (
          <div className="space-y-2">
            <Label htmlFor="yearTwo">Year Two</Label>
            <Input
              id="yearTwo"
              type="number"
              step="0.1"
              value={values.yearTwo}
              onChange={(e) => onChange('yearTwo', parseFloat(e.target.value) || 0)}
              placeholder="Enter Year 2 CPI increase"
            />
          </div>
        )}
        {contractLength >= 3 && (
          <div className="space-y-2">
            <Label htmlFor="yearThree">Year Three</Label>
            <Input
              id="yearThree"
              type="number"
              step="0.1"
              value={values.yearThree}
              onChange={(e) => onChange('yearThree', parseFloat(e.target.value) || 0)}
              placeholder="Enter Year 3 CPI increase"
            />
          </div>
        )}
      </div>
    </div>
  );
};