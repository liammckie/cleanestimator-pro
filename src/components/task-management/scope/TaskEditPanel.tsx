
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SelectedTask } from '@/components/area/task/types';

interface TaskEditPanelProps {
  task: SelectedTask;
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  onRemoveTask: (taskId: string) => void;
}

export const TaskEditPanel: React.FC<TaskEditPanelProps> = ({
  task,
  onQuantityChange,
  onFrequencyChange,
  onRemoveTask,
}) => {
  const { toast } = useToast();
  const taskId = task.taskId;
  const taskName = task.name || 'Task';
  
  const handleRemove = () => {
    onRemoveTask(taskId);
    toast({
      title: "Task Removed",
      description: `${taskName} has been removed from the scope.`,
    });
  };

  const monthlyHours = task.timeRequired * task.frequency.timesPerMonth;

  return (
    <Card className="w-full mb-4">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium">{taskName}</h3>
            <p className="text-sm text-muted-foreground">
              Task ID: {taskId}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="text-destructive hover:text-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4">
          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              value={task.quantity || ''}
              onChange={(e) => onQuantityChange(taskId, Number(e.target.value))}
              placeholder="Enter quantity"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Frequency (times per week)</Label>
            <Select
              value={task.frequency.timesPerWeek.toString()}
              onValueChange={(value) => onFrequencyChange(taskId, Number(value))}
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

          <div className="bg-accent/50 p-4 rounded-lg space-y-2">
            <h4 className="font-medium">Time Requirements</h4>
            <div className="text-sm space-y-1">
              <p>Time per service: {((task.timeRequired * 60)).toFixed(1)} minutes</p>
              <p>Monthly hours: {monthlyHours.toFixed(1)} hours</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
