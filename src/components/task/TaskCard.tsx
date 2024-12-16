import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { ProductivityRate } from '@/data/types/productivity';
import { TaskFrequencySelect } from './TaskFrequencySelect';
import { TaskTimeRequirements } from './TaskTimeRequirements';

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
  return (
    <Card className="p-4">
      <CardContent className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{rate.task}</h3>
            <p className="text-sm text-muted-foreground">
              {selectedTask.frequency.timesPerWeek}x per week
            </p>
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
            />
          </div>

          <TaskFrequencySelect
            value={selectedTask.frequency.timesPerWeek.toString()}
            onValueChange={(value) => onFrequencyChange(rate.id, Number(value))}
          />
        </div>

        <TaskTimeRequirements
          timeRequired={selectedTask.timeRequired}
          weeklyHours={(selectedTask.timeRequired / 4.33).toFixed(1)}
          ratePerHour={rate.ratePerHour}
          unit={rate.unit}
        />
      </CardContent>
    </Card>
  );
};