import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Site } from '@/data/types/site';
import { SiteMetrics } from './SiteMetrics';
import { SiteTaskList } from './SiteTaskList';

interface SiteOverviewProps {
  sites: Site[];
}

export const SiteOverview: React.FC<SiteOverviewProps> = ({ sites }) => {
  const totalArea = sites.reduce((sum, site) => sum + site.area.squareMeters, 0);
  const totalTasks = sites.reduce((sum, site) => sum + site.area.selectedTasks.length, 0);
  const totalMonthlyHours = sites.reduce((sum, site) => sum + site.area.totalTime, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <SiteMetrics 
            totalSites={sites.length}
            totalArea={totalArea}
            totalTasks={totalTasks}
            totalMonthlyHours={totalMonthlyHours}
          />
        </CardContent>
      </Card>

      {sites.map((site) => (
        <Card key={site.id}>
          <CardHeader>
            <CardTitle>{site.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                <p>{site.address.street}</p>
                <p>{site.address.suburb}, {site.address.state} {site.address.postcode}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Area Details</h3>
                <p>{site.area.squareMeters} m²</p>
                <p>Type: {site.area.spaceType}</p>
                <p>Industry: {site.area.industryType}</p>
              </div>
            </div>
            <SiteTaskList tasks={site.area.selectedTasks} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};