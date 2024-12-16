import React from 'react';

interface MonthlyHoursDisplayProps {
  totalWeeklyHours: number;
  totalMonthlyHours: number;
}

export const MonthlyHoursDisplay: React.FC<MonthlyHoursDisplayProps> = ({ 
  totalWeeklyHours = 0,
  totalMonthlyHours = 0
}) => {
  return (
    <div className="bg-accent/50 p-4 rounded-lg">
      <p className="text-sm text-muted-foreground mb-2">Hours Required</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-2xl font-bold">{(totalMonthlyHours || 0).toFixed(1)}</p>
          <p className="text-sm text-muted-foreground">Monthly Hours</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{(totalWeeklyHours || 0).toFixed(1)}</p>
          <p className="text-sm text-muted-foreground">Weekly Hours</p>
        </div>
      </div>
    </div>
  );
};