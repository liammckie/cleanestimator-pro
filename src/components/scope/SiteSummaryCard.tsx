import React from 'react';
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface SiteSummaryCardProps {
  siteName: string;
  weeklyHours: number;
  monthlyHours: number;
}

export const SiteSummaryCard: React.FC<SiteSummaryCardProps> = ({
  siteName,
  weeklyHours,
  monthlyHours,
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">{siteName}</h3>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Weekly Hours:</span>
            <span>{weeklyHours.toFixed(1)} hours</span>
          </div>
          <div className="flex justify-between">
            <span>Monthly Hours:</span>
            <span>{monthlyHours.toFixed(1)} hours</span>
          </div>
        </div>
      </div>
    </Card>
  );
};