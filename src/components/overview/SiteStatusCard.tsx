import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { Site } from '@/data/types/site';

interface SiteStatusCardProps {
  site: Site;
}

export const SiteStatusCard: React.FC<SiteStatusCardProps> = ({ site }) => {
  const weeklyHours = ((site?.area?.totalTime || 0) / 4.33).toFixed(1);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <span>{site?.name || 'Unnamed Site'}</span>
          <Badge variant="outline" className="ml-2">
            {site?.area?.industryType || 'Unknown Industry'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-primary mt-1" />
            <div>
              <p>{site?.address?.street || 'No street address'}</p>
              <p>
                {site?.address?.suburb || 'No suburb'}, {site?.address?.state || 'No state'} {site?.address?.postcode || ''}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Space Type</p>
              <p className="font-medium">{site?.area?.spaceType || 'Unknown'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Area</p>
              <p className="font-medium">{site?.area?.squareMeters || 0} m²</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Weekly Hours</p>
              <p className="font-medium flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {weeklyHours}h
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Tasks</p>
              <p className="font-medium">{site?.area?.selectedTasks?.length || 0}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};