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

const frequencyOptions = [
  { label: 'Monthly', value: '0.25', timesPerMonth: 1 },
  { label: 'Fortnightly', value: '0.5', timesPerMonth: 2.17 },
  { label: 'Weekly', value: '1', timesPerMonth: 4.33 },
  { label: '2x Weekly', value: '2', timesPerMonth: 8.66 },
  { label: '3x Weekly', value: '3', timesPerMonth: 13 },
  { label: '4x Weekly', value: '4', timesPerMonth: 17.33 },
  { label: '5x Weekly', value: '5', timesPerMonth: 21.66 },
  { label: '6x Weekly', value: '6', timesPerMonth: 26 },
  { label: '7x Weekly', value: '7', timesPerMonth: 30.33 },
];

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

  const handleFrequencyUpdate = (taskId: string, frequencyValue: string) => {
    const timesPerWeek = parseFloat(frequencyValue);
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

  const calculateWeeklyHours = (timeRequired: number, frequency: { timesPerWeek: number }) => {
    return (timeRequired / TIME_CONSTANTS.WEEKS_PER_MONTH).toFixed(1);
  };

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

            const weeklyHours = calculateWeeklyHours(selectedTask.timeRequired, selectedTask.frequency);

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
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <Select
                        value={selectedTask.frequency.timesPerWeek.toString()}
                        onValueChange={(value) => handleFrequencyUpdate(rate.id, value)}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          className="bg-popover border border-border shadow-md z-[1000]"
                          style={{ 
                            minWidth: "200px",
                            maxHeight: "300px",
                            overflowY: "auto"
                          }}
                        >
                          {frequencyOptions.map((freq) => (
                            <SelectItem 
                              key={freq.value} 
                              value={freq.value}
                              className="cursor-pointer hover:bg-accent focus:bg-accent"
                            >
                              {freq.label}
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
                      <p>Weekly hours: {weeklyHours} hours</p>
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