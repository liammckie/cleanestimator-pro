import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ListChecks } from "lucide-react";
import { CategorySelect } from '../CategorySelect';
import { getTaskGroups } from '@/data/rates/ratesManager';

interface CategoryPanelProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const CategoryPanel: React.FC<CategoryPanelProps> = ({ value, onValueChange }) => {
  const taskGroups = getTaskGroups();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label htmlFor="category" className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            Task Category
          </Label>
          <CategorySelect 
            value={value} 
            onValueChange={onValueChange}
            defaultTab="categories"
            groups={taskGroups}
          />
        </div>
      </CardContent>
    </Card>
  );
};