import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CategorySelect } from '../CategorySelect';

interface IndustryPanelProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const IndustryPanel: React.FC<IndustryPanelProps> = ({ value, onValueChange }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label htmlFor="industry">Industry Type</Label>
          <CategorySelect 
            value={value} 
            onValueChange={onValueChange}
            defaultTab="industries"
          />
        </div>
      </CardContent>
    </Card>
  );
};