
import React, { memo } from 'react';
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeDisplayProps {
  timeRequired: number;
  frequency: {
    timesPerWeek: number;
  };
}

export const TimeDisplay = memo(({ timeRequired, frequency }: TimeDisplayProps) => {
  // Add null checks and default values to prevent undefined errors
  const safeTimeRequired = timeRequired || 0;
  const safeTimesPerWeek = frequency?.timesPerWeek || 0;
  
  const timePerService = ((safeTimeRequired / (safeTimesPerWeek || 1)) / 4 * 60).toFixed(1);
  const monthlyTime = (safeTimeRequired * 60).toFixed(1);

  return (
    <Card className="p-3">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-4 w-4 text-primary" />
        <span className="font-medium">Time Requirements</span>
      </div>
      <div className="text-sm space-y-1">
        <p>Time per service: {timePerService} minutes</p>
        <p>Monthly time: {monthlyTime} minutes</p>
      </div>
    </Card>
  );
});

TimeDisplay.displayName = 'TimeDisplay';
