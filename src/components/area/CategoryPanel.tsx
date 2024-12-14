import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CategorySelect } from '../CategorySelect';

interface CategoryPanelProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const CategoryPanel: React.FC<CategoryPanelProps> = ({ value, onValueChange }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label htmlFor="category">Task Category</Label>
          <CategorySelect 
            value={value} 
            onValueChange={onValueChange}
            defaultTab="categories"
          />
        </div>
      </CardContent>
    </Card>
  );
};