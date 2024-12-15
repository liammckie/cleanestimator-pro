import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TaskEditFormProps {
  task: {
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
  };
  onQuantityChange: (taskId: string, value: number) => void;
  onFrequencyChange: (taskId: string, value: number) => void;
}

export const TaskEditForm: React.FC<TaskEditFormProps> = ({
  task,
  onQuantityChange,
  onFrequencyChange,
}) => {
  return (
    <div className="space-y-3">
      <div>
        <Label>Quantity (SQM)</Label>
        <Input
          type="number"
          value={task.quantity || ''}
          onChange={(e) => onQuantityChange(task.taskId, Number(e.target.value))}
          className="mt-1"
        />
      </div>

      <div>
        <Label>Frequency (times per week)</Label>
        <Select
          value={task.frequency.timesPerWeek.toString()}
          onValueChange={(value) => onFrequencyChange(task.taskId, Number(value))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7].map((freq) => (
              <SelectItem key={freq} value={freq.toString()}>
                {freq}x per week
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="p-3 bg-accent/50">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="font-medium">Time Requirements</span>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Time per service:</span>
            <span>{((task.timeRequired * 60) / task.frequency.timesPerWeek / 4.33).toFixed(1)} mins</span>
          </div>
          <div className="flex justify-between">
            <span>Monthly hours:</span>
            <span>{task.timeRequired.toFixed(1)} hrs</span>
          </div>
        </div>
      </Card>
    </div>
  );
};