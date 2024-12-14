import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TaskHeaderProps {
  taskId: string;
  taskName: string;
  isSelected: boolean;
  onTaskSelection: (taskId: string, checked: boolean) => void;
  onRemoveTask: (taskId: string) => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({
  taskId,
  taskName,
  isSelected,
  onTaskSelection,
  onRemoveTask,
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => 
            onTaskSelection(taskId, checked as boolean)
          }
        />
        <span>{taskName}</span>
      </div>
      {isSelected && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemoveTask(taskId)}
          className="h-8 w-8 text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};