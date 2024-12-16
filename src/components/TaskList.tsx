import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2 } from "lucide-react";
import { ProductivityRate } from '@/data/types/productivity';
import { TaskSearchInput } from './task/TaskSearchInput';
import { TaskFrequencySelect } from './task/TaskFrequencySelect';
import { TaskTimeRequirements } from './task/TaskTimeRequirements';
import { TIME_CONSTANTS } from '@/utils/constants';
import { getRatesByCategory } from '@/data/rates/ratesManager';

interface TaskListProps {
  category: string;
  selectedTasks: Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    productivityOverride?: number;
    selectedTool?: string;
  }>;
  onTaskSelection: (taskId: string, isSelected: boolean) => void;
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  onProductivityOverride: (taskId: string, override: number) => void;
  onRemoveTask: (taskId: string) => void;
  onToolChange: (taskId: string, tool: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  category,
  selectedTasks = [],
  onTaskSelection,
  onQuantityChange,
  onFrequencyChange,
  onProductivityOverride,
  onRemoveTask,
  onToolChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const productivityRates = getRatesByCategory(category) || [];

  const filteredRates = productivityRates
    .filter(rate => rate && rate.category === category)
    .filter(rate => {
      if (!rate) return false;
      const query = searchQuery.toLowerCase();
      return (
        rate.task.toLowerCase().includes(query) ||
        rate.tool.toLowerCase().includes(query)
      );
    });

  if (selectedTasks.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No tasks found for the selected category.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <TaskSearchInput 
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className="grid gap-4">
        {filteredRates.map((rate: ProductivityRate) => {
          const selectedTask = selectedTasks.find(task => task.taskId === rate.id);
          if (!selectedTask) return null;

          const weeklyHours = (selectedTask.timeRequired / TIME_CONSTANTS.WEEKS_PER_MONTH).toFixed(1);

          return (
            <Card key={rate.id} className="p-4">
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
        })}
      </div>
    </div>
  );
};