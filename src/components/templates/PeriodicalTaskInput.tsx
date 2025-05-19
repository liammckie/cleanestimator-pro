
import React from 'react';
import { Button } from "@/components/ui/button";
import { X, Clock } from 'lucide-react';

interface PeriodicalTaskInputProps {
  task: {
    id: string;
    name: string;
    frequency: string;
  };
  onRemove: (id: string) => void;
}

export const PeriodicalTaskInput: React.FC<PeriodicalTaskInputProps> = ({ 
  task, 
  onRemove 
}) => {
  return (
    <div className="flex items-center justify-between bg-background p-3 rounded-md border">
      <div className="flex items-center">
        <span className="font-medium">{task.name}</span>
        <span className="ml-3 text-xs flex items-center text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {task.frequency}x per week
        </span>
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
