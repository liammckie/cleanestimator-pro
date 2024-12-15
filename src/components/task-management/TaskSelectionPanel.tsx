import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CleaningTask, SelectedTask } from '@/data/types/taskManagement';

interface TaskSelectionPanelProps {
  task: CleaningTask;
  selectedTask?: SelectedTask;
  onSelect: () => void;
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
}

export const TaskSelectionPanel: React.FC<TaskSelectionPanelProps> = ({
  task,
  selectedTask,
  onSelect,
  onQuantityChange,
  onFrequencyChange,
}) => {
  const isSelected = !!selectedTask;

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium">{task.taskName}</h3>
            <p className="text-sm text-muted-foreground">
              {task.productivityRate} {task.measurementUnit}
            </p>
          </div>
          <Button
            variant={isSelected ? "secondary" : "default"}
            onClick={onSelect}
          >
            {isSelected ? "Selected" : "Add Task"}
          </Button>
        </div>

        {isSelected && (
          <div className="space-y-4">
            <div>
              <Label>
                {task.measurementUnit === 'SQM/hour' ? 'Area (SQM)' : 'Unit Count'}
              </Label>
              <Input
                type="number"
                value={selectedTask.quantity || ''}
                onChange={(e) => onQuantityChange(task.id, Number(e.target.value))}
                placeholder={`Enter ${task.measurementUnit === 'SQM/hour' ? 'area' : 'units'}`}
              />
            </div>

            <div>
              <Label>Frequency (times per week)</Label>
              <Select
                value={selectedTask.frequency.timesPerWeek.toString()}
                onValueChange={(value) => onFrequencyChange(task.id, Number(value))}
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

            {selectedTask.manHours > 0 && (
              <div className="text-sm text-muted-foreground">
                <p>Monthly Hours: {selectedTask.manHours.toFixed(2)}</p>
                <p>Hours per Service: {(selectedTask.manHours / selectedTask.frequency.timesPerMonth).toFixed(2)}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};