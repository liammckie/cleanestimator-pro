
import React, { memo } from 'react';
import { Card } from "@/components/ui/card";
import { Activity, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductivityFactors {
  toolEfficiency: number;
  areaSize: number;
  frequency: number;
}

interface ProductivityCardProps {
  productivity: {
    baseRate: number;
    adjustedRate: number;
    factors: ProductivityFactors;
  };
}

export const ProductivityCard = memo(({ productivity }: ProductivityCardProps) => {
  return (
    <Card className="p-3 bg-slate-50">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="h-4 w-4 text-blue-500" />
        <span className="font-medium">Productivity Analysis</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Base rate is adjusted based on tool efficiency, area size, and frequency factors</p>
          </TooltipContent>
        </Tooltip>
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
});

ProductivityCard.displayName = 'ProductivityCard';
