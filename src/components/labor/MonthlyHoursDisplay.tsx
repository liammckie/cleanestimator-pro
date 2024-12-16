import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface MonthlyHoursDisplayProps {
  totalWeeklyHours: number;
  totalMonthlyHours: number;
}

export const MonthlyHoursDisplay: React.FC<MonthlyHoursDisplayProps> = ({
  totalWeeklyHours = 0,
  totalMonthlyHours = 0
}) => {
  console.log('MonthlyHoursDisplay rendering with:', {
    totalWeeklyHours,
    totalMonthlyHours
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Hours Required</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold">{totalMonthlyHours.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">Monthly Hours</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{totalWeeklyHours.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">Weekly Hours</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};