
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, ListFilter, Layers } from 'lucide-react';
import { formatHours } from '@/utils/taskUtils';

interface TimeSummaryCardsProps {
  siteCount: number;
  weeklyHours: number;
  monthlyHours: number;
}

export const TimeSummaryCards: React.FC<TimeSummaryCardsProps> = ({ 
  siteCount,
  weeklyHours, 
  monthlyHours 
}) => {
  console.log('TimeSummaryCards mounted with:', {
    weeklyHours,
    monthlyHours
  });

  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="p-3 flex flex-col bg-primary/5 border-primary/10">
        <div className="flex items-center gap-1 mb-2">
          <Layers className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Sites</span>
        </div>
        <span className="font-semibold text-lg">{siteCount}</span>
      </Card>
      
      <Card className="p-3 flex flex-col bg-primary/5 border-primary/10">
        <div className="flex items-center gap-1 mb-2">
          <ListFilter className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Tasks</span>
        </div>
        <span className="font-semibold text-lg">5</span>
      </Card>
      
      <Card className="p-3 flex flex-col bg-blue-50 border-blue-100">
        <div className="flex items-center gap-1 mb-2">
          <Clock className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-xs font-medium text-blue-600">Weekly Hours</span>
        </div>
        <span className="font-semibold text-lg">{formatHours(weeklyHours)}h</span>
      </Card>
      
      <Card className="p-3 flex flex-col bg-blue-50 border-blue-100">
        <div className="flex items-center gap-1 mb-2">
          <Clock className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-xs font-medium text-blue-600">Monthly Hours</span>
        </div>
        <span className="font-semibold text-lg">{formatHours(monthlyHours)}h</span>
      </Card>
    </div>
  );
};
