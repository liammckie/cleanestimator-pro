import React from 'react';

interface MonthlyHoursDisplayProps {
  totalWeeklyHours: number;
}

export const MonthlyHoursDisplay: React.FC<MonthlyHoursDisplayProps> = ({ totalWeeklyHours }) => {
  return (
    <div className="bg-accent/50 p-4 rounded-lg">
      <p className="text-sm text-muted-foreground mb-2">Monthly Hours Required</p>
      <p className="text-2xl font-bold">{(totalWeeklyHours * 4.33).toFixed(1)} hours</p>
      <p className="text-sm text-muted-foreground">Weekly Hours: {totalWeeklyHours.toFixed(1)}</p>
    </div>
  );
};