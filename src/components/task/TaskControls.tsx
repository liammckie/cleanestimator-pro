import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolSelect } from '../ToolSelect';

interface TaskControlsProps {
  taskId: string;
  quantity: number;
  frequency: {
    timesPerWeek: number;
  };
  productivityOverride?: number;
  selectedTool?: string;
  unit: string;
  ratePerHour: number;
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  onProductivityOverride: (taskId: string, override: number) => void;
  onToolChange: (taskId: string, tool: string) => void;
}

export const TaskControls: React.FC<TaskControlsProps> = ({
  taskId,
  quantity,
  frequency,
  productivityOverride,
  selectedTool,
  unit,
  ratePerHour,
  onQuantityChange,
  onFrequencyChange,
  onProductivityOverride,
  onToolChange,
}) => {
  const getQuantityLabel = () => {
    switch (unit.toLowerCase()) {
      case 'm²':
      case 'square meter':
      case 'square meters':
        return 'Area (Square Meters)';
      case 'each':
      case 'item':
      case 'toilet':
      case 'urinal':
      case 'spot':
        return `Number of ${unit}s`;
      default:
        return `Quantity (${unit})`;
    }
  };

  const getProductivityLabel = () => {
    switch (unit.toLowerCase()) {
      case 'm²':
      case 'square meter':
      case 'square meters':
        return 'Square Meters per Hour';
      case 'each':
      case 'item':
      case 'toilet':
      case 'urinal':
      case 'spot':
        return `${unit}s per Hour`;
      default:
        return `${unit} per Hour`;
    }
  };

  return (
    <div className="space-y-2">
      <ToolSelect
        taskId={taskId}
        currentTool={selectedTool}
        onToolChange={onToolChange}
      />
      
      <div>
        <Label htmlFor={`quantity-${taskId}`}>
          {getQuantityLabel()}
        </Label>
        <Input
          id={`quantity-${taskId}`}
          type="number"
          value={quantity || ''}
          onChange={(e) => {
            const value = parseFloat(e.target.value) || 0;
            onQuantityChange(taskId, value);
          }}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`frequency-${taskId}`}>
          Times per Week
        </Label>
        <Select
          value={frequency?.timesPerWeek?.toString() || "1"}
          onValueChange={(value) => onFrequencyChange(taskId, parseInt(value))}
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
        <Label htmlFor={`productivity-${taskId}`}>
          {getProductivityLabel()}
        </Label>
        <Input
          id={`productivity-${taskId}`}
          type="number"
          value={productivityOverride || ratePerHour}
          onChange={(e) => {
            const value = parseFloat(e.target.value) || ratePerHour;
            onProductivityOverride(taskId, value);
          }}
          className="mt-1"
        />
      </div>
    </div>
  );
};