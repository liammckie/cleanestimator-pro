import React, { useState } from 'react';
import { TaskItem } from './TaskItem';
import { getRatesByCategory } from '@/data/rates/ratesManager';
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ProductivityRate } from '@/data/types/productivity';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { TIME_CONSTANTS } from '@/utils/constants';

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
  const { toast } = useToast();
  const productivityRates = getRatesByCategory(category) || [];

  const handleQuantityUpdate = (taskId: string, quantity: number) => {
    console.log('Updating quantity:', { taskId, quantity });
    onQuantityChange(taskId, quantity);
  };

  const handleFrequencyUpdate = (taskId: string, timesPerWeek: number) => {
    console.log('Updating frequency:', { 
      taskId, 
      timesPerWeek,
      monthlyTimes: timesPerWeek * TIME_CONSTANTS.WEEKS_PER_MONTH 
    });
    onFrequencyChange(taskId, timesPerWeek);
  };

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

  const handleRemove = (taskId: string) => {
    onRemoveTask(taskId);
    toast({
      title: "Task Removed",
      description: "Task has been removed from the scope of work.",
    });
  };

  if (!category) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please select a category to view available tasks.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      <div className="grid gap-4">
        {filteredRates.length > 0 ? (
          filteredRates.map((rate: ProductivityRate) => {
            const selectedTask = selectedTasks.find(task => task.taskId === rate.id);
            
            if (!selectedTask) return null;

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
                        onChange={(e) => handleQuantityUpdate(rate.id, Number(e.target.value))}
                        min={0}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Frequency (times per week)</Label>
                      <Select
                        value={selectedTask.frequency.timesPerWeek.toString()}
                        onValueChange={(value) => handleFrequencyUpdate(rate.id, Number(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
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
                  </div>

                  <div className="bg-accent/50 p-4 rounded-lg space-y-2">
                    <h4 className="font-medium">Time Requirements</h4>
                    <div className="text-sm space-y-1">
                      <p>Time per service: {((selectedTask.timeRequired * TIME_CONSTANTS.MINUTES_PER_HOUR) / selectedTask.frequency.timesPerWeek / TIME_CONSTANTS.WEEKS_PER_MONTH).toFixed(1)} minutes</p>
                      <p>Monthly hours: {selectedTask.timeRequired.toFixed(1)} hours</p>
                      <p>Productivity rate: {rate.ratePerHour.toFixed(2)} {rate.unit}/hour</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Alert>
            <AlertDescription>
              No tasks found for the selected category.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};
