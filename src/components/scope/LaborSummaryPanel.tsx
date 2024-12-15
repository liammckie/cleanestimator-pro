import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, CalendarDays } from "lucide-react";

interface LaborSummaryPanelProps {
  dailyHours: number;
  weeklyHours: number;
  monthlyHours: number;
  siteName?: string;
}

export const LaborSummaryPanel: React.FC<LaborSummaryPanelProps> = ({
  dailyHours,
  weeklyHours,
  monthlyHours,
  siteName
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Labor Summary {siteName && `- ${siteName}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-2 bg-accent/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Daily Hours</span>
            </div>
            <span className="font-semibold">{dailyHours.toFixed(1)}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-accent/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Weekly Hours</span>
            </div>
            <span className="font-semibold">{weeklyHours.toFixed(1)}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-accent/50 rounded-lg">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>Monthly Hours</span>
            </div>
            <span className="font-semibold">{monthlyHours.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};