import React, { memo } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolSelect } from '../ToolSelect';
import { FREQUENCY_OPTIONS } from '@/constants/frequencyOptions';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

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

export const TaskControls = memo(({
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
}: TaskControlsProps) => {
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
    <div className="space-y-4">
      <ToolSelect
        taskId={taskId}
        currentTool={selectedTool}
        onToolChange={onToolChange}
      />
      
      <div>
        <div className="flex items-center gap-2">
          <Label htmlFor={`quantity-${taskId}`}>
            {getQuantityLabel()}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter the total quantity or area to be cleaned</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
        <div className="flex items-center gap-2">
          <Label htmlFor={`frequency-${taskId}`}>
            Service Frequency
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select how often this task needs to be performed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select
          value={frequency?.timesPerWeek?.toString() || "1"}
          onValueChange={(value) => onFrequencyChange(taskId, parseFloat(value))}
        >
          <SelectTrigger id={`frequency-${taskId}`} className="w-full">
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
            {FREQUENCY_OPTIONS.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="cursor-pointer hover:bg-accent focus:bg-accent"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Label htmlFor={`productivity-${taskId}`}>
            {getProductivityLabel()}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Override the default productivity rate if needed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
});

TaskControls.displayName = 'TaskControls';