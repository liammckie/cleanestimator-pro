
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CleaningTask } from '@/data/types/taskManagement';
import { SelectedTask } from '@/components/area/task/types';

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
        <div className="flex items-center space-x-3 mb-4">
          <Checkbox 
            id={`task-${task.id}`}
            checked={isSelected}
            onCheckedChange={onSelect}
          />
          <Label htmlFor={`task-${task.id}`} className="text-base font-medium cursor-pointer">
            {task.taskName}
          </Label>
          <span className="text-sm text-muted-foreground ml-auto">
            {task.measurementUnit}
          </span>
        </div>
        
        {isSelected && (
          <div className="space-y-4 pl-7 mt-2">
            <div className="grid gap-2">
              <Label htmlFor={`quantity-${task.id}`}>
                {task.measurementUnit === 'SQM/hour' ? 'Area (SQM)' : 'Units'}
              </Label>
              <Input
                id={`quantity-${task.id}`}
                type="number"
                value={selectedTask.quantity || ''}
                onChange={(e) => onQuantityChange(task.id, Number(e.target.value))}
                placeholder="Enter quantity"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor={`frequency-${task.id}`}>Frequency (times per week)</Label>
              <Select 
                value={selectedTask.frequency?.timesPerWeek?.toString() || '1'}
                onValueChange={(value) => onFrequencyChange(task.id, Number(value))}
              >
                <SelectTrigger id={`frequency-${task.id}`}>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1x per week</SelectItem>
                  <SelectItem value="2">2x per week</SelectItem>
                  <SelectItem value="3">3x per week</SelectItem>
                  <SelectItem value="5">5x per week</SelectItem>
                  <SelectItem value="7">7x per week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        <div className="text-sm text-muted-foreground mt-2">
          <p>Rate: {task.productivityRate} {task.measurementUnit}</p>
          {task.notes && <p className="mt-1">{task.notes}</p>}
        </div>
      </CardContent>
    </Card>
  );
};
