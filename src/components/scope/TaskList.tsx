
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { SelectedTask } from '@/components/area/task/types';

interface TaskListProps {
  selectedTasks: SelectedTask[];
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  onToolChange: (taskId: string, tool: string) => void;
  onRemoveTask: (taskId: string, siteId?: string) => void;
}

export const TaskList = ({
  selectedTasks,
  onQuantityChange,
  onFrequencyChange,
  onToolChange,
  onRemoveTask
}: TaskListProps) => {
  if (selectedTasks.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground glass-panel">
        <p>No tasks selected. Add tasks from the task database to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {selectedTasks.map((task) => (
        <Card key={task.taskId} className="vivid-card card-hover-effect border-border/50 overflow-hidden">
          <CardContent className="space-y-4 p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-primary">{task.taskId}</h3>
                <p className="text-sm text-muted-foreground">
                  {task.frequency.timesPerWeek}x per week
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveTask(task.taskId, task.siteId)}
                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Quantity</Label>
                <Input
                  type="number"
                  value={task.quantity || ''}
                  onChange={(e) => onQuantityChange(task.taskId, Number(e.target.value))}
                  min={0}
                  className="bg-background/60 border-border/70 focus-visible:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Frequency (times per week)</Label>
                <Select
                  value={task.frequency.timesPerWeek.toString()}
                  onValueChange={(value) => onFrequencyChange(task.taskId, Number(value))}
                >
                  <SelectTrigger className="bg-background/60 border-border/70 focus-visible:ring-primary/50">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {[1, 2, 3, 4, 5, 6, 7].map((freq) => (
                      <SelectItem key={freq} value={freq.toString()}>
                        {freq}x per week
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="vivid-highlight p-4 rounded-lg space-y-2">
              <h4 className="font-medium text-primary">Time Requirements</h4>
              <div className="text-sm space-y-1">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Monthly hours:</span>
                  <span className="font-semibold">{task.timeRequired.toFixed(1)} hours</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Weekly hours:</span>
                  <span className="font-semibold">{(task.timeRequired / 4.33).toFixed(1)} hours</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
