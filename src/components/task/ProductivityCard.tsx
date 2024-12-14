import React from 'react';
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface ProductivityCardProps {
  productivity: {
    baseRate: number;
    adjustedRate: number;
    factors: {
      toolEfficiency: number;
      areaSize: number;
      frequency: number;
    };
  };
}

export const ProductivityCard: React.FC<ProductivityCardProps> = ({ productivity }) => {
  return (
    <Card className="p-3 bg-slate-50">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="h-4 w-4 text-blue-500" />
        <span className="font-medium">Productivity Analysis</span>
      </div>
      <div className="text-sm space-y-1">
        <p>Base Rate: {productivity.baseRate.toFixed(2)} units/hour</p>
        <p>Adjusted Rate: {productivity.adjustedRate.toFixed(2)} units/hour</p>
        <p className="text-muted-foreground">
          Factors: Tool ({(productivity.factors.toolEfficiency * 100).toFixed()}%),
          Area ({(productivity.factors.areaSize * 100).toFixed()}%),
          Frequency ({(productivity.factors.frequency * 100).toFixed()}%)
        </p>
      </div>
    </Card>
  );
};