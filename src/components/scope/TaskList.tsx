import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { ToolSelect } from '../ToolSelect';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { getRateById } from '@/data/rates/ratesManager';
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
      <div className="text-center p-8 text-muted-foreground">
        <p>No tasks selected. Add tasks from the task database to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedTasks.map((selectedTask) => {
        const taskDetails = getRateById(selectedTask.taskId);
        if (!taskDetails) return null;

        const productivity = calculateTaskProductivity(
          selectedTask.taskId,
          selectedTask.quantity,
          selectedTask.selectedTool,
          selectedTask.frequency,
          selectedTask.quantity
        );

        return (
          <Card key={`${selectedTask.taskId}-${selectedTask.siteId}`}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{taskDetails.task}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTask.siteName} - Base Rate: {taskDetails.ratePerHour} {taskDetails.unit}/hour
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveTask(selectedTask.taskId, selectedTask.siteId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Quantity ({taskDetails.unit})</Label>
                  <Input
                    type="number"
                    value={selectedTask.quantity || ''}
                    onChange={(e) => onQuantityChange(selectedTask.taskId, Number(e.target.value))}
                    placeholder={`Enter ${taskDetails.unit}`}
                  />
                </div>

                <div>
                  <Label>Tool</Label>
                  <ToolSelect
                    taskId={selectedTask.taskId}
                    currentTool={selectedTask.selectedTool || ''}
                    onToolChange={onToolChange}
                  />
                </div>

                <div>
                  <Label>Frequency (times per week)</Label>
                  <Select
                    value={selectedTask.frequency.timesPerWeek.toString()}
                    onValueChange={(value) => onFrequencyChange(selectedTask.taskId, Number(value))}
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

              {productivity && (
                <div className="mt-4 grid grid-cols-3 gap-4 bg-accent/50 p-4 rounded-lg">
                  <div>
                    <span className="text-sm text-muted-foreground">Time per service:</span>
                    <p className="font-medium">{(productivity.timeRequired * 60).toFixed(1)} minutes</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Monthly hours:</span>
                    <p className="font-medium">{(productivity.timeRequired * selectedTask.frequency.timesPerMonth).toFixed(1)} hours</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Productivity rate:</span>
                    <p className="font-medium">{productivity.adjustedRate.toFixed(2)} {taskDetails.unit}/hour</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};