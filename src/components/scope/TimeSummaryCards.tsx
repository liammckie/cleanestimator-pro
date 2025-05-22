
import React, { memo } from 'react';
import { Card } from "@/components/ui/card";
import { Building, Clock } from "lucide-react";

interface TimeSummaryCardsProps {
  siteCount: number;
  weeklyHours: number;
  monthlyHours: number;
}

export const TimeSummaryCards: React.FC<TimeSummaryCardsProps> = memo(({
  siteCount,
  weeklyHours,
  monthlyHours
}) => {
  // Use useEffect to log only once during component mount
  React.useEffect(() => {
    console.log('TimeSummaryCards mounted with:', { weeklyHours, monthlyHours });
  }, []);
  
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-accent/50">
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium">Sites</p>
          </div>
          <p className="text-2xl font-bold mt-2">{siteCount}</p>
        </Card>
        
        <Card className="p-4 bg-accent/50">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium">Weekly Hours</p>
          </div>
          <p className="text-2xl font-bold mt-2">{weeklyHours.toFixed(1)}</p>
        </Card>
      </div>

      <Card className="p-4 bg-accent/50">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium">Monthly Hours</p>
        </div>
        <p className="text-2xl font-bold mt-2">{monthlyHours.toFixed(1)}</p>
      </Card>
    </>
  );
});

// Add display name for debugging
TimeSummaryCards.displayName = 'TimeSummaryCards';
