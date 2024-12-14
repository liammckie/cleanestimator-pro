import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Site } from '@/data/types/site';

interface SiteCounterProps {
  sites: Site[];
}

export const SiteCounter: React.FC<SiteCounterProps> = ({ sites }) => {
  return (
    <Card className="fixed left-4 top-4 w-64">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Sites Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Total Sites: <span className="font-bold">{sites.length}</span>
        </p>
        <div className="mt-2 space-y-1">
          {sites.map((site) => (
            <p key={site.id} className="text-sm truncate">
              • {site.name}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};