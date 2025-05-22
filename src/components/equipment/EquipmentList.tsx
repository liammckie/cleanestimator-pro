
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EquipmentItem } from '@/types/equipment';
import { calculateDepreciation } from '@/utils/depreciationCalculator';

interface EquipmentListProps {
  items: EquipmentItem[];
  onRemoveItem: (id: string) => void;
}

export const EquipmentList: React.FC<EquipmentListProps> = ({ items, onRemoveItem }) => {
  const totalMonthlyDepreciation = items.reduce((sum, item) => {
    const { monthlyDepreciation } = calculateDepreciation(item);
    return sum + monthlyDepreciation;
  }, 0);

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Equipment List</h3>
      <TooltipProvider>
        {items.map(item => {
          const { currentValue, monthlyDepreciation } = calculateDepreciation(item);
          
          return (
            <div key={item.id} className="flex items-center justify-between p-2 border rounded">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.name}</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Purchase Cost: ${item.cost}</p>
                      <p>Current Value: ${currentValue.toFixed(2)}</p>
                      <p>Monthly Depreciation: ${monthlyDepreciation.toFixed(2)}</p>
                      <p>Method: {item.depreciationType === 'diminishing-value' ? 'DV' : 'PC'}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-sm text-muted-foreground">
                  Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span>${currentValue.toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <span className="sr-only">Remove task</span>
                  ×
                </Button>
              </div>
            </div>
          );
        })}
      </TooltipProvider>
      {items.length > 0 && (
        <div className="flex justify-between pt-2 border-t font-medium">
          <span>Total Monthly Depreciation</span>
          <span>${totalMonthlyDepreciation.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};
