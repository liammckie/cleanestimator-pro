import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { SelectedTask } from '@/components/area/task/types';

interface TaskListProps {
  tasks: SelectedTask[];
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, freq: number) => void;
  onRemoveTask: (taskId: string) => void;
  getTaskName: (taskId: string) => string;
}

export const TaskList = ({
  tasks,
  onQuantityChange,
  onFrequencyChange,
  onRemoveTask,
  getTaskName
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <p>No tasks selected. Add tasks from the task database to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.taskId} className="p-4">
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{getTaskName(task.taskId)}</h3>
                <p className="text-sm text-muted-foreground">
                  {task.frequency.timesPerWeek}x per week
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveTask(task.taskId)}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={task.quantity || ''}
                  onChange={(e) => onQuantityChange(task.taskId, Number(e.target.value))}
                  min={0}
                />
              </div>

              <div className="space-y-2">
                <Label>Frequency (times per week)</Label>
                <Select
                  value={task.frequency.timesPerWeek.toString()}
                  onValueChange={(value) => onFrequencyChange(task.taskId, Number(value))}
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
                <p>Monthly hours: {task.timeRequired.toFixed(1)} hours</p>
                <p>Weekly hours: {(task.timeRequired / 4.33).toFixed(1)} hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};