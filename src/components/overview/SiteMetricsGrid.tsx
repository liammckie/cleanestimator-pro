import React from 'react';
import { Card } from "@/components/ui/card";
import { Building, Clock, CalendarDays, BarChart2, Users } from "lucide-react";

interface SiteMetricsGridProps {
  sites: Array<any>;
}

export const SiteMetricsGrid: React.FC<SiteMetricsGridProps> = ({ sites }) => {
  const totalArea = sites.reduce((sum, site) => sum + site.area.squareMeters, 0);
  const totalTasks = sites.reduce((sum, site) => sum + site.area.selectedTasks.length, 0);
  const totalMonthlyTime = sites.reduce((sum, site) => sum + site.area.totalTime, 0);
  const weeklyHours = totalMonthlyTime / 4.33;

  const metrics = [
    {
      label: 'Total Sites',
      value: sites.length,
      icon: Building,
      suffix: 'sites'
    },
    {
      label: 'Weekly Hours',
      value: weeklyHours.toFixed(1),
      icon: Clock,
      suffix: 'hours'
    },
    {
      label: 'Monthly Hours',
      value: totalMonthlyTime.toFixed(1),
      icon: CalendarDays,
      suffix: 'hours'
    },
    {
      label: 'Total Area',
      value: totalArea.toLocaleString(),
      icon: BarChart2,
      suffix: 'm²'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center space-x-2">
            <metric.icon className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
          </div>
          <p className="text-2xl font-bold mt-2">
            {metric.value} <span className="text-sm font-normal text-muted-foreground">{metric.suffix}</span>
          </p>
        </Card>
      ))}
    </div>
  );
};