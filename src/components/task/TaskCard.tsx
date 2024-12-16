import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { ProductivityRate } from '@/data/types/productivity';
import { TaskFrequencySelect } from './TaskFrequencySelect';
import { TaskTimeRequirements } from './TaskTimeRequirements';
import { TIME_CONSTANTS } from '@/utils/constants';

interface TaskCardProps {
  rate: ProductivityRate;
  selectedTask: {
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    productivityOverride?: number;
    selectedTool?: string;
  };
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  onRemoveTask: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  rate,
  selectedTask,
  onQuantityChange,
  onFrequencyChange,
  onRemoveTask,
}) => {
  const weeklyHours = (selectedTask.timeRequired / TIME_CONSTANTS.WEEKS_PER_MONTH).toFixed(1);

  return (
    <Card className="p-4">
      <CardContent className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{rate.task}</h3>
            <p className="text-sm text-muted-foreground">{rate.tool}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveTask(rate.id)}
            className="text-destructive hover:text-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Quantity ({rate.unit})</Label>
            <Input
              type="number"
              value={selectedTask.quantity || ''}
              onChange={(e) => onQuantityChange(rate.id, Number(e.target.value))}
              min={0}
              className="bg-background"
            />
          </div>

          <TaskFrequencySelect
            value={selectedTask.frequency.timesPerWeek.toString()}
            onValueChange={(value) => onFrequencyChange(rate.id, Number(value))}
          />
        </div>

        <TaskTimeRequirements
          timeRequired={selectedTask.timeRequired}
          weeklyHours={weeklyHours}
          ratePerHour={rate.ratePerHour}
          unit={rate.unit}
        />
      </CardContent>
    </Card>
  );
};