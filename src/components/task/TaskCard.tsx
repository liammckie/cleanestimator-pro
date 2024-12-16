import React, { useCallback, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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

export const TaskCard = React.memo(({
  rate,
  selectedTask,
  onQuantityChange,
  onFrequencyChange,
  onRemoveTask,
}: TaskCardProps) => {
  const handleQuantityChange = useCallback((value: number) => {
    onQuantityChange(rate.id, value);
  }, [rate.id, onQuantityChange]);

  const handleFrequencyChange = useCallback((value: number) => {
    onFrequencyChange(rate.id, value);
  }, [rate.id, onFrequencyChange]);

  const handleRemove = useCallback(() => {
    onRemoveTask(rate.id);
  }, [rate.id, onRemoveTask]);

  const weeklyHours = useMemo(() => {
    return (selectedTask.timeRequired / TIME_CONSTANTS.WEEKS_PER_MONTH).toFixed(1);
  }, [selectedTask.timeRequired]);

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
            onClick={handleRemove}
            className="text-destructive hover:text-destructive/90"
          >
            <span className="sr-only">Remove task</span>
            ×
          </Button>
        </div>

        <div className="grid gap-4">
          <div>
            <Label>Quantity ({rate.unit})</Label>
            <Input
              type="number"
              value={selectedTask.quantity.toString()}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              min={0}
              className="bg-background"
            />
          </div>

          <TaskFrequencySelect
            value={selectedTask.frequency.timesPerWeek}
            onChange={handleFrequencyChange}
          />
        </div>

        <TaskTimeRequirements
          timeRequired={selectedTask.timeRequired}
          weeklyHours={parseFloat(weeklyHours)}
          ratePerHour={rate.ratePerHour}
          unit={rate.unit}
        />
      </CardContent>
    </Card>
  );
});

TaskCard.displayName = 'TaskCard';