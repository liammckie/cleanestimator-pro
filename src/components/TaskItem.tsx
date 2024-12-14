import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { getProductivityRate } from '@/data/productivityRates';
import { Trash2 } from "lucide-react";
import { ToolSelect } from './ToolSelect';

interface TaskItemProps {
  rate: {
    id: string;
    task: string;
    tool: string;
    unit: string;
    ratePerHour: number;
  };
  selectedTask: {
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    productivityOverride?: number;
    selectedTool?: string;
  } | undefined;
  onTaskSelection: (taskId: string, checked: boolean) => void;
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  onProductivityOverride: (taskId: string, override: number) => void;
  onRemoveTask: (taskId: string) => void;
  onToolChange: (taskId: string, tool: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  rate,
  selectedTask,
  onTaskSelection,
  onQuantityChange,
  onFrequencyChange,
  onProductivityOverride,
  onRemoveTask,
  onToolChange,
}) => {
  const getQuantityLabel = () => {
    switch (rate.unit.toLowerCase()) {
      case 'm²':
      case 'square meter':
      case 'square meters':
        return 'Area (Square Meters)';
      case 'each':
      case 'item':
      case 'toilet':
      case 'urinal':
      case 'spot':
        return `Number of ${rate.unit}s`;
      default:
        return `Quantity (${rate.unit})`;
    }
  };

  const getProductivityLabel = () => {
    switch (rate.unit.toLowerCase()) {
      case 'm²':
      case 'square meter':
      case 'square meters':
        return 'Square Meters per Hour';
      case 'each':
      case 'item':
      case 'toilet':
      case 'urinal':
      case 'spot':
        return `${rate.unit}s per Hour`;
      default:
        return `${rate.unit} per Hour`;
    }
  };

  return (
    <div key={rate.id} className="flex flex-col gap-2 p-2 border rounded">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={!!selectedTask}
            onCheckedChange={(checked) => 
              onTaskSelection(rate.id, checked as boolean)
            }
          />
          <span>{rate.task}</span>
        </div>
        {selectedTask && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveTask(rate.id)}
            className="h-8 w-8 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      {selectedTask && (
        <div className="ml-6 space-y-2">
          <ToolSelect
            taskId={rate.id}
            currentTool={selectedTask.selectedTool || rate.tool}
            onToolChange={onToolChange}
          />
          <div>
            <Label htmlFor={`quantity-${rate.id}`}>
              {getQuantityLabel()}
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
          <div>
            <Label htmlFor={`productivity-${rate.id}`}>
              {getProductivityLabel()}
            </Label>
            <Input
              id={`productivity-${rate.id}`}
              type="number"
              value={selectedTask.productivityOverride || rate.ratePerHour}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || rate.ratePerHour;
                onProductivityOverride(rate.id, value);
              }}
              className="mt-1"
            />
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
