import React from 'react';
import { Label } from "@/components/ui/label";
import { CategorySelect } from '../CategorySelect';

interface IndustrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const IndustrySelect: React.FC<IndustrySelectProps> = ({ value, onValueChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="industry">Industry Type</Label>
      <CategorySelect 
        value={value} 
        onValueChange={onValueChange}
        defaultTab="industries"
      />
    </div>
  );
};