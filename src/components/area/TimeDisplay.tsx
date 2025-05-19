
import React from 'react';
import { useTaskContext } from './task/TaskContext';
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeDisplayProps {
  selectedTasks: Array<{
    timeRequired: number;
  }>;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ selectedTasks }) => {
  const { totalMonthlyHours } = useTaskContext();
  
  // Add null check
  const safeMonthlyHours = totalMonthlyHours || 0;
  
  if (selectedTasks.length === 0 && safeMonthlyHours === 0) return null;

  // Calculate hours and minutes from total monthly hours
  const hours = Math.floor(safeMonthlyHours);
  const minutes = Math.round((safeMonthlyHours - hours) * 60);

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Total Monthly Time Required</h3>
        </div>
        <div className="bg-accent/30 p-3 rounded-md mt-2">
          <p className="text-lg font-semibold">{hours} hours{minutes > 0 ? ` ${minutes} minutes` : ''}</p>
          <p className="text-sm text-muted-foreground mt-1">Based on {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''}</p>
        </div>
      </CardContent>
    </Card>
  );
};
