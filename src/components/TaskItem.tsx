import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { getProductivityRate } from '@/data/productivityRates';

interface TaskItemProps {
  rate: {
    id: string;
    task: string;
    tool: string;
    unit: string;
  };
  selectedTask: {
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
  } | undefined;
  onTaskSelection: (taskId: string, checked: boolean) => void;
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  rate,
  selectedTask,
  onTaskSelection,
  onQuantityChange,
  onFrequencyChange,
}) => {
  return (
    <div key={rate.id} className="flex flex-col gap-2 p-2 border rounded">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={!!selectedTask}
          onCheckedChange={(checked) => 
            onTaskSelection(rate.id, checked as boolean)
          }
        />
        <span>{rate.task} ({rate.tool})</span>
      </div>
      {selectedTask && (
        <div className="ml-6 space-y-2">
          <div>
            <Label htmlFor={`quantity-${rate.id}`}>
              {rate.unit === 'spot' ? 'Number of Spots' : `Quantity (${rate.unit})`}
            </Label>
            <Input
              id={`quantity-${rate.id}`}
              type="number"
              value={selectedTask.quantity || ''}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                onQuantityChange(rate.id, value);
              }}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor={`frequency-${rate.id}`}>
              Times per Week
            </Label>
            <Select
              value={selectedTask.frequency?.timesPerWeek?.toString() || "1"}
              onValueChange={(value) => onFrequencyChange(rate.id, parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7].map((freq) => (
                  <SelectItem key={freq} value={freq.toString()}>
                    {freq} {freq === 1 ? 'time' : 'times'} per week
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedTask.timeRequired > 0 && (
            <div className="text-sm text-gray-600 mt-1">
              <p>Time per service: {((selectedTask.timeRequired / (selectedTask.frequency?.timesPerWeek || 1)) / 4 * 60).toFixed(1)} minutes</p>
              <p>Monthly time: {(selectedTask.timeRequired * 60).toFixed(1)} minutes</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};