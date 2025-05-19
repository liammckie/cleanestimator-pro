
import React from 'react';
import { Button } from "@/components/ui/button";
import { X, Clock } from 'lucide-react';

interface PeriodicalTaskInputProps {
  task: {
    id: string;
    name: string;
    frequency: string;
    productivityRate?: {
      softFloor?: number;
      hardFloor?: number;
      toiletFixtures?: {
        pans?: number;
        basins?: number;
        ssUrinals?: number;
        ceramicUrinals?: number;
        showers?: number;
      };
    };
  };
  onRemove: (id: string) => void;
}

export const PeriodicalTaskInput: React.FC<PeriodicalTaskInputProps> = ({ 
  task, 
  onRemove 
}) => {
  return (
    <div className="flex items-center justify-between bg-background p-3 rounded-md border">
      <div className="flex items-center gap-2 flex-grow">
        <div>
          <span className="font-medium">{task.name}</span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {task.frequency}x per week
            </span>
            {task.productivityRate && (
              <>
                {task.productivityRate.softFloor && (
                  <span>Soft floor: {task.productivityRate.softFloor} SQM/hr</span>
                )}
                {task.productivityRate.hardFloor && (
                  <span>Hard floor: {task.productivityRate.hardFloor} SQM/hr</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onRemove(task.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
