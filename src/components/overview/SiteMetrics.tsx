import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface SiteMetricsProps {
  totalSites: number;
  totalArea: number;
  totalTasks: number;
  totalMonthlyHours: number;
}

export const SiteMetrics: React.FC<SiteMetricsProps> = ({
  totalSites,
  totalArea,
  totalTasks,
  totalMonthlyHours
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{totalSites}</div>
          <p className="text-sm text-muted-foreground">Total Sites</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{totalArea.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">Total Area (m²)</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{totalTasks}</div>
          <p className="text-sm text-muted-foreground">Total Tasks</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{totalMonthlyHours.toFixed(1)}</div>
          <p className="text-sm text-muted-foreground">Monthly Hours</p>
        </CardContent>
      </Card>
    </div>
  );
};